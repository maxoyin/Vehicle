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
import { VehicleManufacturerDTO } from '../../service/dto/vehicle-manufacturer.dto';
import { VehicleManufacturerService } from '../../service/vehicle-manufacturer.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-manufacturers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-manufacturers')
export class VehicleManufacturerController {
  logger = new Logger('VehicleManufacturerController');

  constructor(private readonly vehicleManufacturerEntityService: VehicleManufacturerService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleManufacturerDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleManufacturerDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleManufacturerEntityService.findAndCount({
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
    type: VehicleManufacturerDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleManufacturerDTO> {
    return await this.vehicleManufacturerEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleManufacturerEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleManufacturerDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleManufacturerEntityDTO: VehicleManufacturerDTO): Promise<VehicleManufacturerDTO> {
    const created = await this.vehicleManufacturerEntityService.save(vehicleManufacturerEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleManufacturer', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleManufacturerEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleManufacturerDTO,
  })
  async put(@Req() req: Request, @Body() vehicleManufacturerEntityDTO: VehicleManufacturerDTO): Promise<VehicleManufacturerDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleManufacturer', vehicleManufacturerEntityDTO.id);
    return await this.vehicleManufacturerEntityService.update(vehicleManufacturerEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleManufacturerEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleManufacturerDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleManufacturerEntityDTO: VehicleManufacturerDTO): Promise<VehicleManufacturerDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleManufacturer', vehicleManufacturerEntityDTO.id);
    return await this.vehicleManufacturerEntityService.update(vehicleManufacturerEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleManufacturerEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleManufacturer', id);
    return await this.vehicleManufacturerEntityService.deleteById(id);
  }
}
