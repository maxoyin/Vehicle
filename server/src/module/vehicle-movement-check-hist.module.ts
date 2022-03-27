import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleMovementCheckHistController } from '../web/rest/vehicle-movement-check-hist.controller';
import { VehicleMovementCheckHistRepository } from '../repository/vehicle-movement-check-hist.repository';
import { VehicleMovementCheckHistService } from '../service/vehicle-movement-check-hist.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleMovementCheckHistRepository])],
  controllers: [VehicleMovementCheckHistController],
  providers: [VehicleMovementCheckHistService],
  exports: [VehicleMovementCheckHistService],
})
export class VehicleMovementCheckHistModule {}
