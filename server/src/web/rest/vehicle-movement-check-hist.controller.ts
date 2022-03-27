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
import { VehicleMovementCheckHistDTO } from '../../service/dto/vehicle-movement-check-hist.dto';
import { VehicleMovementCheckHistService } from '../../service/vehicle-movement-check-hist.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-movement-check-hists')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-movement-check-hists')
export class VehicleMovementCheckHistController {
  logger = new Logger('VehicleMovementCheckHistController');

  constructor(private readonly vehicleMovementCheckHistEntityService: VehicleMovementCheckHistService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleMovementCheckHistDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleMovementCheckHistDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleMovementCheckHistEntityService.findAndCount({
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
    type: VehicleMovementCheckHistDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleMovementCheckHistDTO> {
    return await this.vehicleMovementCheckHistEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleMovementCheckHistEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleMovementCheckHistDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() vehicleMovementCheckHistEntityDTO: VehicleMovementCheckHistDTO
  ): Promise<VehicleMovementCheckHistDTO> {
    const created = await this.vehicleMovementCheckHistEntityService.save(vehicleMovementCheckHistEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementCheckHist', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementCheckHistEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementCheckHistDTO,
  })
  async put(
    @Req() req: Request,
    @Body() vehicleMovementCheckHistEntityDTO: VehicleMovementCheckHistDTO
  ): Promise<VehicleMovementCheckHistDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementCheckHist', vehicleMovementCheckHistEntityDTO.id);
    return await this.vehicleMovementCheckHistEntityService.update(vehicleMovementCheckHistEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementCheckHistEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementCheckHistDTO,
  })
  async putId(
    @Req() req: Request,
    @Body() vehicleMovementCheckHistEntityDTO: VehicleMovementCheckHistDTO
  ): Promise<VehicleMovementCheckHistDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementCheckHist', vehicleMovementCheckHistEntityDTO.id);
    return await this.vehicleMovementCheckHistEntityService.update(vehicleMovementCheckHistEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleMovementCheckHistEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleMovementCheckHist', id);
    return await this.vehicleMovementCheckHistEntityService.deleteById(id);
  }
}
