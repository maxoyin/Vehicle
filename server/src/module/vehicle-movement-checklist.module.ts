import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleMovementChecklistController } from '../web/rest/vehicle-movement-checklist.controller';
import { VehicleMovementChecklistRepository } from '../repository/vehicle-movement-checklist.repository';
import { VehicleMovementChecklistService } from '../service/vehicle-movement-checklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleMovementChecklistRepository])],
  controllers: [VehicleMovementChecklistController],
  providers: [VehicleMovementChecklistService],
  exports: [VehicleMovementChecklistService],
})
export class VehicleMovementChecklistModule {}
