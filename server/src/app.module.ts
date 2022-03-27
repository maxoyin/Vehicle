import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SimNetworkModule } from './module/sim-network.module';
import { AssestClassModule } from './module/assest-class.module';
import { VehicleTypeModule } from './module/vehicle-type.module';
import { VehicleManufacturerModule } from './module/vehicle-manufacturer.module';
import { VehicleModelModule } from './module/vehicle-model.module';
import { VehicleTrimModule } from './module/vehicle-trim.module';
import { VehicleStatusModule } from './module/vehicle-status.module';
import { VehicleStatusChangeReasonModule } from './module/vehicle-status-change-reason.module';
import { VehicleStatChangeSubReasonModule } from './module/vehicle-stat-change-sub-reason.module';
import { VehicleModule } from './module/vehicle.module';
import { VehicleChecklistItemModule } from './module/vehicle-checklist-item.module';
import { VehicleMovementModule } from './module/vehicle-movement.module';
import { VehicleMovementChecklistModule } from './module/vehicle-movement-checklist.module';
import { VehicleMovementHistoryModule } from './module/vehicle-movement-history.module';
import { VehicleMovementCheckHistModule } from './module/vehicle-movement-check-hist.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    AuthModule,
    SimNetworkModule,
    AssestClassModule,
    VehicleTypeModule,
    VehicleManufacturerModule,
    VehicleModelModule,
    VehicleTrimModule,
    VehicleStatusModule,
    VehicleStatusChangeReasonModule,
    VehicleStatChangeSubReasonModule,
    VehicleModule,
    VehicleChecklistItemModule,
    VehicleMovementModule,
    VehicleMovementChecklistModule,
    VehicleMovementHistoryModule,
    VehicleMovementCheckHistModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ],
})
export class AppModule {}
