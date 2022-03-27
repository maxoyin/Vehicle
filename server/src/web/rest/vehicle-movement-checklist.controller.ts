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
import { VehicleMovementChecklistDTO } from '../../service/dto/vehicle-movement-checklist.dto';
import { VehicleMovementChecklistService } from '../../service/vehicle-movement-checklist.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-movement-checklists')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-movement-checklists')
export class VehicleMovementChecklistController {
  logger = new Logger('VehicleMovementChecklistController');

  constructor(private readonly vehicleMovementChecklistEntityService: VehicleMovementChecklistService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleMovementChecklistDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleMovementChecklistDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleMovementChecklistEntityService.findAndCount({
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
    type: VehicleMovementChecklistDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleMovementChecklistDTO> {
    return await this.vehicleMovementChecklistEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleMovementChecklistEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleMovementChecklistDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() vehicleMovementChecklistEntityDTO: VehicleMovementChecklistDTO
  ): Promise<VehicleMovementChecklistDTO> {
    const created = await this.vehicleMovementChecklistEntityService.save(vehicleMovementChecklistEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementChecklist', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementChecklistEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementChecklistDTO,
  })
  async put(
    @Req() req: Request,
    @Body() vehicleMovementChecklistEntityDTO: VehicleMovementChecklistDTO
  ): Promise<VehicleMovementChecklistDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementChecklist', vehicleMovementChecklistEntityDTO.id);
    return await this.vehicleMovementChecklistEntityService.update(vehicleMovementChecklistEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementChecklistEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementChecklistDTO,
  })
  async putId(
    @Req() req: Request,
    @Body() vehicleMovementChecklistEntityDTO: VehicleMovementChecklistDTO
  ): Promise<VehicleMovementChecklistDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementChecklist', vehicleMovementChecklistEntityDTO.id);
    return await this.vehicleMovementChecklistEntityService.update(vehicleMovementChecklistEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleMovementChecklistEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleMovementChecklist', id);
    return await this.vehicleMovementChecklistEntityService.deleteById(id);
  }
}
