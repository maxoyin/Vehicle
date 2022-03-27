import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleStatChangeSubReasonController } from '../web/rest/vehicle-stat-change-sub-reason.controller';
import { VehicleStatChangeSubReasonRepository } from '../repository/vehicle-stat-change-sub-reason.repository';
import { VehicleStatChangeSubReasonService } from '../service/vehicle-stat-change-sub-reason.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleStatChangeSubReasonRepository])],
  controllers: [VehicleStatChangeSubReasonController],
  providers: [VehicleStatChangeSubReasonService],
  exports: [VehicleStatChangeSubReasonService],
})
export class VehicleStatChangeSubReasonModule {}
