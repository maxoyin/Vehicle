import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleMovementHistoryController } from '../web/rest/vehicle-movement-history.controller';
import { VehicleMovementHistoryRepository } from '../repository/vehicle-movement-history.repository';
import { VehicleMovementHistoryService } from '../service/vehicle-movement-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleMovementHistoryRepository])],
  controllers: [VehicleMovementHistoryController],
  providers: [VehicleMovementHistoryService],
  exports: [VehicleMovementHistoryService],
})
export class VehicleMovementHistoryModule {}
