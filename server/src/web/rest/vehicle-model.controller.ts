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
import { VehicleModelDTO } from '../../service/dto/vehicle-model.dto';
import { VehicleModelService } from '../../service/vehicle-model.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-models')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-models')
export class VehicleModelController {
  logger = new Logger('VehicleModelController');

  constructor(private readonly vehicleModelEntityService: VehicleModelService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleModelDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleModelDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleModelEntityService.findAndCount({
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
    type: VehicleModelDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleModelDTO> {
    return await this.vehicleModelEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleModelEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleModelDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleModelEntityDTO: VehicleModelDTO): Promise<VehicleModelDTO> {
    const created = await this.vehicleModelEntityService.save(vehicleModelEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleModel', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleModelEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleModelDTO,
  })
  async put(@Req() req: Request, @Body() vehicleModelEntityDTO: VehicleModelDTO): Promise<VehicleModelDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleModel', vehicleModelEntityDTO.id);
    return await this.vehicleModelEntityService.update(vehicleModelEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleModelEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleModelDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleModelEntityDTO: VehicleModelDTO): Promise<VehicleModelDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleModel', vehicleModelEntityDTO.id);
    return await this.vehicleModelEntityService.update(vehicleModelEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleModelEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleModel', id);
    return await this.vehicleModelEntityService.deleteById(id);
  }
}
