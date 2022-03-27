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
import { SimNetworkDTO } from '../../service/dto/sim-network.dto';
import { SimNetworkService } from '../../service/sim-network.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/sim-networks')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('sim-networks')
export class SimNetworkController {
  logger = new Logger('SimNetworkController');

  constructor(private readonly simNetworkEntityService: SimNetworkService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SimNetworkDTO,
  })
  async getAll(@Req() req: Request): Promise<SimNetworkDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.simNetworkEntityService.findAndCount({
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
    type: SimNetworkDTO,
  })
  async getOne(@Param('id') id: number): Promise<SimNetworkDTO> {
    return await this.simNetworkEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create simNetworkEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SimNetworkDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() simNetworkEntityDTO: SimNetworkDTO): Promise<SimNetworkDTO> {
    const created = await this.simNetworkEntityService.save(simNetworkEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SimNetwork', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update simNetworkEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SimNetworkDTO,
  })
  async put(@Req() req: Request, @Body() simNetworkEntityDTO: SimNetworkDTO): Promise<SimNetworkDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SimNetwork', simNetworkEntityDTO.id);
    return await this.simNetworkEntityService.update(simNetworkEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update simNetworkEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SimNetworkDTO,
  })
  async putId(@Req() req: Request, @Body() simNetworkEntityDTO: SimNetworkDTO): Promise<SimNetworkDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SimNetwork', simNetworkEntityDTO.id);
    return await this.simNetworkEntityService.update(simNetworkEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete simNetworkEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'SimNetwork', id);
    return await this.simNetworkEntityService.deleteById(id);
  }
}
