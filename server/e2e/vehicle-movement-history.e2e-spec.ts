import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleMovementHistoryDTO } from '../src/service/dto/vehicle-movement-history.dto';
import { VehicleMovementHistoryService } from '../src/service/vehicle-movement-history.service';

describe('VehicleMovementHistory Controller', () => {
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
      .overrideProvider(VehicleMovementHistoryService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-movement-histories ', async () => {
    const getEntities: VehicleMovementHistoryDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-movement-histories').expect(200))
      .body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-movement-histories by id', async () => {
    const getEntity: VehicleMovementHistoryDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-movement-histories/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-movement-histories', async () => {
    const createdEntity: VehicleMovementHistoryDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-movement-histories').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movement-histories', async () => {
    const updatedEntity: VehicleMovementHistoryDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-movement-histories').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movement-histories from id', async () => {
    const updatedEntity: VehicleMovementHistoryDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-movement-histories/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-movement-histories', async () => {
    const deletedEntity: VehicleMovementHistoryDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-movement-histories/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
