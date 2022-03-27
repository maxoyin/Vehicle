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
import { VehicleStatChangeSubReasonDTO } from '../../service/dto/vehicle-stat-change-sub-reason.dto';
import { VehicleStatChangeSubReasonService } from '../../service/vehicle-stat-change-sub-reason.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-stat-change-sub-reasons')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-stat-change-sub-reasons')
export class VehicleStatChangeSubReasonController {
  logger = new Logger('VehicleStatChangeSubReasonController');

  constructor(private readonly vehicleStatChangeSubReasonEntityService: VehicleStatChangeSubReasonService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleStatChangeSubReasonDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleStatChangeSubReasonDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleStatChangeSubReasonEntityService.findAndCount({
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
    type: VehicleStatChangeSubReasonDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleStatChangeSubReasonDTO> {
    return await this.vehicleStatChangeSubReasonEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleStatChangeSubReasonEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleStatChangeSubReasonDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() vehicleStatChangeSubReasonEntityDTO: VehicleStatChangeSubReasonDTO
  ): Promise<VehicleStatChangeSubReasonDTO> {
    const created = await this.vehicleStatChangeSubReasonEntityService.save(vehicleStatChangeSubReasonEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatChangeSubReason', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleStatChangeSubReasonEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleStatChangeSubReasonDTO,
  })
  async put(
    @Req() req: Request,
    @Body() vehicleStatChangeSubReasonEntityDTO: VehicleStatChangeSubReasonDTO
  ): Promise<VehicleStatChangeSubReasonDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatChangeSubReason', vehicleStatChangeSubReasonEntityDTO.id);
    return await this.vehicleStatChangeSubReasonEntityService.update(vehicleStatChangeSubReasonEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleStatChangeSubReasonEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleStatChangeSubReasonDTO,
  })
  async putId(
    @Req() req: Request,
    @Body() vehicleStatChangeSubReasonEntityDTO: VehicleStatChangeSubReasonDTO
  ): Promise<VehicleStatChangeSubReasonDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleStatChangeSubReason', vehicleStatChangeSubReasonEntityDTO.id);
    return await this.vehicleStatChangeSubReasonEntityService.update(vehicleStatChangeSubReasonEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleStatChangeSubReasonEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleStatChangeSubReason', id);
    return await this.vehicleStatChangeSubReasonEntityService.deleteById(id);
  }
}
