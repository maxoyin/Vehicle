import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from '../web/rest/vehicle.controller';
import { VehicleRepository } from '../repository/vehicle.repository';
import { VehicleService } from '../service/vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRepository])],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
