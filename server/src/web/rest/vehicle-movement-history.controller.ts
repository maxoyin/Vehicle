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
import { VehicleMovementHistoryDTO } from '../../service/dto/vehicle-movement-history.dto';
import { VehicleMovementHistoryService } from '../../service/vehicle-movement-history.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-movement-histories')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-movement-histories')
export class VehicleMovementHistoryController {
  logger = new Logger('VehicleMovementHistoryController');

  constructor(private readonly vehicleMovementHistoryEntityService: VehicleMovementHistoryService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleMovementHistoryDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleMovementHistoryDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleMovementHistoryEntityService.findAndCount({
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
    type: VehicleMovementHistoryDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleMovementHistoryDTO> {
    return await this.vehicleMovementHistoryEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleMovementHistoryEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleMovementHistoryDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleMovementHistoryEntityDTO: VehicleMovementHistoryDTO): Promise<VehicleMovementHistoryDTO> {
    const created = await this.vehicleMovementHistoryEntityService.save(vehicleMovementHistoryEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementHistory', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementHistoryEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementHistoryDTO,
  })
  async put(@Req() req: Request, @Body() vehicleMovementHistoryEntityDTO: VehicleMovementHistoryDTO): Promise<VehicleMovementHistoryDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementHistory', vehicleMovementHistoryEntityDTO.id);
    return await this.vehicleMovementHistoryEntityService.update(vehicleMovementHistoryEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleMovementHistoryEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleMovementHistoryDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleMovementHistoryEntityDTO: VehicleMovementHistoryDTO): Promise<VehicleMovementHistoryDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleMovementHistory', vehicleMovementHistoryEntityDTO.id);
    return await this.vehicleMovementHistoryEntityService.update(vehicleMovementHistoryEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleMovementHistoryEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleMovementHistory', id);
    return await this.vehicleMovementHistoryEntityService.deleteById(id);
  }
}
