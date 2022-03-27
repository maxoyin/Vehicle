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
import { VehicleMovementDTO } from '../../service/dto/vehicle-movement.dto';
import { VehicleMovementService } from '../../service/vehicle-movement.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-movements')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-movements')
export class VehicleMovementController {
  logger = new Logger('VehicleMovementController');

  constructor(private readonly vehicleMovementEntityService: VehicleMovementService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleMovementDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleMovementDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleMovementEntityService.findAndCount({
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
    type: VehicleMovementDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleMovementDTO> {
    return await this.vehicleMovementEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleMovementEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleMovementDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleMovementEntityDTO: VehicleMovementDTO): Promise<VehicleMovementDTO> {
    const created = await this.vehicleMovementEntityService.save(vehicleMovementEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovement', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementDTO,
  })
  async put(@Req() req: Request, @Body() vehicleMovementEntityDTO: VehicleMovementDTO): Promise<VehicleMovementDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovement', vehicleMovementEntityDTO.id);
    return await this.vehicleMovementEntityService.update(vehicleMovementEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleMovementEntityDTO: VehicleMovementDTO): Promise<VehicleMovementDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovement', vehicleMovementEntityDTO.id);
    return await this.vehicleMovementEntityService.update(vehicleMovementEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleMovementEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleMovement', id);
    return await this.vehicleMovementEntityService.deleteById(id);
  }
}
