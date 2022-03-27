import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleChecklistItemController } from '../web/rest/vehicle-checklist-item.controller';
import { VehicleChecklistItemRepository } from '../repository/vehicle-checklist-item.repository';
import { VehicleChecklistItemService } from '../service/vehicle-checklist-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleChecklistItemRepository])],
  controllers: [VehicleChecklistItemController],
  providers: [VehicleChecklistItemService],
  exports: [VehicleChecklistItemService],
})
export class VehicleChecklistItemModule {}
