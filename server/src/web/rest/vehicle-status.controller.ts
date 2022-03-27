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
import { VehicleStatusDTO } from '../../service/dto/vehicle-status.dto';
import { VehicleStatusService } from '../../service/vehicle-status.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-statuses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-statuses')
export class VehicleStatusController {
  logger = new Logger('VehicleStatusController');

  constructor(private readonly vehicleStatusEntityService: VehicleStatusService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleStatusDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleStatusDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleStatusEntityService.findAndCount({
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
    type: VehicleStatusDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleStatusDTO> {
    return await this.vehicleStatusEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleStatusEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleStatusDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleStatusEntityDTO: VehicleStatusDTO): Promise<VehicleStatusDTO> {
    const created = await this.vehicleStatusEntityService.save(vehicleStatusEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatus', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleStatusEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleStatusDTO,
  })
  async put(@Req() req: Request, @Body() vehicleStatusEntityDTO: VehicleStatusDTO): Promise<VehicleStatusDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatus', vehicleStatusEntityDTO.id);
    return await this.vehicleStatusEntityService.update(vehicleStatusEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleStatusEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleStatusDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleStatusEntityDTO: VehicleStatusDTO): Promise<VehicleStatusDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatus', vehicleStatusEntityDTO.id);
    return await this.vehicleStatusEntityService.update(vehicleStatusEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleStatusEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleStatus', id);
    return await this.vehicleStatusEntityService.deleteById(id);
  }
}
