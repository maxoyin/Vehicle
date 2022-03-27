import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleStatusController } from '../web/rest/vehicle-status.controller';
import { VehicleStatusRepository } from '../repository/vehicle-status.repository';
import { VehicleStatusService } from '../service/vehicle-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleStatusRepository])],
  controllers: [VehicleStatusController],
  providers: [VehicleStatusService],
  exports: [VehicleStatusService],
})
export class VehicleStatusModule {}
