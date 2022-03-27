import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AssestClassDTO } from '../../service/dto/assest-class.dto';
import { AssestClassService } from '../../service/assest-class.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/assest-classes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('assest-classes')
export class AssestClassController {
  logger = new Logger('AssestClassController');

  constructor(private readonly assestClassEntityService: AssestClassService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AssestClassDTO,
  })
  async getAll(@Req() req: Request): Promise<AssestClassDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.assestClassEntityService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: AssestClassDTO,
  })
  async getOne(@Param('id') id: number): Promise<AssestClassDTO> {
    return await this.assestClassEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create assestClassEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AssestClassDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() assestClassEntityDTO: AssestClassDTO): Promise<AssestClassDTO> {
    const created = await this.assestClassEntityService.save(assestClassEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AssestClass', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update assestClassEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AssestClassDTO,
  })
  async put(@Req() req: Request, @Body() assestClassEntityDTO: AssestClassDTO): Promise<AssestClassDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AssestClass', assestClassEntityDTO.id);
    return await this.assestClassEntityService.update(assestClassEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update assestClassEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AssestClassDTO,
  })
  async putId(@Req() req: Request, @Body() assestClassEntityDTO: AssestClassDTO): Promise<AssestClassDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AssestClass', assestClassEntityDTO.id);
    return await this.assestClassEntityService.update(assestClassEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete assestClassEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AssestClass', id);
    return await this.assestClassEntityService.deleteById(id);
  }
}
