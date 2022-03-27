import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleStatusChangeReasonController } from '../web/rest/vehicle-status-change-reason.controller';
import { VehicleStatusChangeReasonRepository } from '../repository/vehicle-status-change-reason.repository';
import { VehicleStatusChangeReasonService } from '../service/vehicle-status-change-reason.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleStatusChangeReasonRepository])],
  controllers: [VehicleStatusChangeReasonController],
  providers: [VehicleStatusChangeReasonService],
  exports: [VehicleStatusChangeReasonService],
})
export class VehicleStatusChangeReasonModule {}
