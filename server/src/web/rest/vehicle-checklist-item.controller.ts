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
import { VehicleChecklistItemDTO } from '../../service/dto/vehicle-checklist-item.dto';
import { VehicleChecklistItemService } from '../../service/vehicle-checklist-item.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-checklist-items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-checklist-items')
export class VehicleChecklistItemController {
  logger = new Logger('VehicleChecklistItemController');

  constructor(private readonly vehicleChecklistItemEntityService: VehicleChecklistItemService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleChecklistItemDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleChecklistItemDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleChecklistItemEntityService.findAndCount({
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
    type: VehicleChecklistItemDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleChecklistItemDTO> {
    return await this.vehicleChecklistItemEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleChecklistItemEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleChecklistItemDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleChecklistItemEntityDTO: VehicleChecklistItemDTO): Promise<VehicleChecklistItemDTO> {
    const created = await this.vehicleChecklistItemEntityService.save(vehicleChecklistItemEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleChecklistItem', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleChecklistItemEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleChecklistItemDTO,
  })
  async put(@Req() req: Request, @Body() vehicleChecklistItemEntityDTO: VehicleChecklistItemDTO): Promise<VehicleChecklistItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleChecklistItem', vehicleChecklistItemEntityDTO.id);
    return await this.vehicleChecklistItemEntityService.update(vehicleChecklistItemEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleChecklistItemEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleChecklistItemDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleChecklistItemEntityDTO: VehicleChecklistItemDTO): Promise<VehicleChecklistItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleChecklistItem', vehicleChecklistItemEntityDTO.id);
    return await this.vehicleChecklistItemEntityService.update(vehicleChecklistItemEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleChecklistItemEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleChecklistItem', id);
    return await this.vehicleChecklistItemEntityService.deleteById(id);
  }
}
