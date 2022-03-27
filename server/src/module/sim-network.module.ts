import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimNetworkController } from '../web/rest/sim-network.controller';
import { SimNetworkRepository } from '../repository/sim-network.repository';
import { SimNetworkService } from '../service/sim-network.service';

@Module({
  imports: [TypeOrmModule.forFeature([SimNetworkRepository])],
  controllers: [SimNetworkController],
  providers: [SimNetworkService],
  exports: [SimNetworkService],
})
export class SimNetworkModule {}
