import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleStatChangeSubReasonDTO } from '../src/service/dto/vehicle-stat-change-sub-reason.dto';
import { VehicleStatChangeSubReasonService } from '../src/service/vehicle-stat-change-sub-reason.service';

describe('VehicleStatChangeSubReason Controller', () => {
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
      .overrideProvider(VehicleStatChangeSubReasonService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-stat-change-sub-reasons ', async () => {
    const getEntities: VehicleStatChangeSubReasonDTO[] = (
      await request(app.getHttpServer()).get('/api/vehicle-stat-change-sub-reasons').expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-stat-change-sub-reasons by id', async () => {
    const getEntity: VehicleStatChangeSubReasonDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-stat-change-sub-reasons/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-stat-change-sub-reasons', async () => {
    const createdEntity: VehicleStatChangeSubReasonDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-stat-change-sub-reasons').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-stat-change-sub-reasons', async () => {
    const updatedEntity: VehicleStatChangeSubReasonDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-stat-change-sub-reasons').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-stat-change-sub-reasons from id', async () => {
    const updatedEntity: VehicleStatChangeSubReasonDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-stat-change-sub-reasons/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-stat-change-sub-reasons', async () => {
    const deletedEntity: VehicleStatChangeSubReasonDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-stat-change-sub-reasons/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
