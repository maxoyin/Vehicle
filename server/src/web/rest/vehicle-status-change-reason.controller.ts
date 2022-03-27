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
import { VehicleStatusChangeReasonDTO } from '../../service/dto/vehicle-status-change-reason.dto';
import { VehicleStatusChangeReasonService } from '../../service/vehicle-status-change-reason.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-status-change-reasons')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-status-change-reasons')
export class VehicleStatusChangeReasonController {
  logger = new Logger('VehicleStatusChangeReasonController');

  constructor(private readonly vehicleStatusChangeReasonEntityService: VehicleStatusChangeReasonService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleStatusChangeReasonDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleStatusChangeReasonDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleStatusChangeReasonEntityService.findAndCount({
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
    type: VehicleStatusChangeReasonDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleStatusChangeReasonDTO> {
    return await this.vehicleStatusChangeReasonEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleStatusChangeReasonEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleStatusChangeReasonDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() vehicleStatusChangeReasonEntityDTO: VehicleStatusChangeReasonDTO
  ): Promise<VehicleStatusChangeReasonDTO> {
    const created = await this.vehicleStatusChangeReasonEntityService.save(vehicleStatusChangeReasonEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatusChangeReason', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleStatusChangeReasonEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleStatusChangeReasonDTO,
  })
  async put(
    @Req() req: Request,
    @Body() vehicleStatusChangeReasonEntityDTO: VehicleStatusChangeReasonDTO
  ): Promise<VehicleStatusChangeReasonDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatusChangeReason', vehicleStatusChangeReasonEntityDTO.id);
    return await this.vehicleStatusChangeReasonEntityService.update(vehicleStatusChangeReasonEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleStatusChangeReasonEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleStatusChangeReasonDTO,
  })
  async putId(
    @Req() req: Request,
    @Body() vehicleStatusChangeReasonEntityDTO: VehicleStatusChangeReasonDTO
  ): Promise<VehicleStatusChangeReasonDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatusChangeReason', vehicleStatusChangeReasonEntityDTO.id);
    return await this.vehicleStatusChangeReasonEntityService.update(vehicleStatusChangeReasonEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleStatusChangeReasonEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleStatusChangeReason', id);
    return await this.vehicleStatusChangeReasonEntityService.deleteById(id);
  }
}
