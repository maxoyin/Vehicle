import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModelController } from '../web/rest/vehicle-model.controller';
import { VehicleModelRepository } from '../repository/vehicle-model.repository';
import { VehicleModelService } from '../service/vehicle-model.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleModelRepository])],
  controllers: [VehicleModelController],
  providers: [VehicleModelService],
  exports: [VehicleModelService],
})
export class VehicleModelModule {}
