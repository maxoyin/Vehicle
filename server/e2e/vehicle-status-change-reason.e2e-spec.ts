import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleStatusChangeReasonDTO } from '../src/service/dto/vehicle-status-change-reason.dto';
import { VehicleStatusChangeReasonService } from '../src/service/vehicle-status-change-reason.service';

describe('VehicleStatusChangeReason Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(VehicleStatusChangeReasonService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-status-change-reasons ', async () => {
    const getEntities: VehicleStatusChangeReasonDTO[] = (
      await request(app.getHttpServer()).get('/api/vehicle-status-change-reasons').expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-status-change-reasons by id', async () => {
    const getEntity: VehicleStatusChangeReasonDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-status-change-reasons/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-status-change-reasons', async () => {
    const createdEntity: VehicleStatusChangeReasonDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-status-change-reasons').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-status-change-reasons', async () => {
    const updatedEntity: VehicleStatusChangeReasonDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-status-change-reasons').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-status-change-reasons from id', async () => {
    const updatedEntity: VehicleStatusChangeReasonDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-status-change-reasons/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-status-change-reasons', async () => {
    const deletedEntity: VehicleStatusChangeReasonDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-status-change-reasons/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
