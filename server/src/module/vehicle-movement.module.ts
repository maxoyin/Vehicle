import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleMovementController } from '../web/rest/vehicle-movement.controller';
import { VehicleMovementRepository } from '../repository/vehicle-movement.repository';
import { VehicleMovementService } from '../service/vehicle-movement.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleMovementRepository])],
  controllers: [VehicleMovementController],
  providers: [VehicleMovementService],
  exports: [VehicleMovementService],
})
export class VehicleMovementModule {}
