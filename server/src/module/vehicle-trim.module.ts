import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTrimController } from '../web/rest/vehicle-trim.controller';
import { VehicleTrimRepository } from '../repository/vehicle-trim.repository';
import { VehicleTrimService } from '../service/vehicle-trim.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleTrimRepository])],
  controllers: [VehicleTrimController],
  providers: [VehicleTrimService],
  exports: [VehicleTrimService],
})
export class VehicleTrimModule {}
