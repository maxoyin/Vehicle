import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleMovementCheckHistDTO } from '../src/service/dto/vehicle-movement-check-hist.dto';
import { VehicleMovementCheckHistService } from '../src/service/vehicle-movement-check-hist.service';

describe('VehicleMovementCheckHist Controller', () => {
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
      .overrideProvider(VehicleMovementCheckHistService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-movement-check-hists ', async () => {
    const getEntities: VehicleMovementCheckHistDTO[] = (
      await request(app.getHttpServer()).get('/api/vehicle-movement-check-hists').expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-movement-check-hists by id', async () => {
    const getEntity: VehicleMovementCheckHistDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-movement-check-hists/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-movement-check-hists', async () => {
    const createdEntity: VehicleMovementCheckHistDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-movement-check-hists').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movement-check-hists', async () => {
    const updatedEntity: VehicleMovementCheckHistDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-movement-check-hists').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movement-check-hists from id', async () => {
    const updatedEntity: VehicleMovementCheckHistDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-movement-check-hists/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-movement-check-hists', async () => {
    const deletedEntity: VehicleMovementCheckHistDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-movement-check-hists/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
