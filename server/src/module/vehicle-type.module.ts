import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeController } from '../web/rest/vehicle-type.controller';
import { VehicleTypeRepository } from '../repository/vehicle-type.repository';
import { VehicleTypeService } from '../service/vehicle-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleTypeRepository])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService],
  exports: [VehicleTypeService],
})
export class VehicleTypeModule {}
