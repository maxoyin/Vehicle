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
import { VehicleTrimDTO } from '../../service/dto/vehicle-trim.dto';
import { VehicleTrimService } from '../../service/vehicle-trim.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-trims')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-trims')
export class VehicleTrimController {
  logger = new Logger('VehicleTrimController');

  constructor(private readonly vehicleTrimEntityService: VehicleTrimService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleTrimDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleTrimDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleTrimEntityService.findAndCount({
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
    type: VehicleTrimDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleTrimDTO> {
    return await this.vehicleTrimEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleTrimEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleTrimDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleTrimEntityDTO: VehicleTrimDTO): Promise<VehicleTrimDTO> {
    const created = await this.vehicleTrimEntityService.save(vehicleTrimEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleTrim', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleTrimEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleTrimDTO,
  })
  async put(@Req() req: Request, @Body() vehicleTrimEntityDTO: VehicleTrimDTO): Promise<VehicleTrimDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleTrim', vehicleTrimEntityDTO.id);
    return await this.vehicleTrimEntityService.update(vehicleTrimEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleTrimEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleTrimDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleTrimEntityDTO: VehicleTrimDTO): Promise<VehicleTrimDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleTrim', vehicleTrimEntityDTO.id);
    return await this.vehicleTrimEntityService.update(vehicleTrimEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleTrimEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleTrim', id);
    return await this.vehicleTrimEntityService.deleteById(id);
  }
}
