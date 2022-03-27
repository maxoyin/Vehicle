import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleStatusDTO } from '../src/service/dto/vehicle-status.dto';
import { VehicleStatusService } from '../src/service/vehicle-status.service';

describe('VehicleStatus Controller', () => {
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
      .overrideProvider(VehicleStatusService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-statuses ', async () => {
    const getEntities: VehicleStatusDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-statuses').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-statuses by id', async () => {
    const getEntity: VehicleStatusDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-statuses/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-statuses', async () => {
    const createdEntity: VehicleStatusDTO = (await request(app.getHttpServer()).post('/api/vehicle-statuses').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-statuses', async () => {
    const updatedEntity: VehicleStatusDTO = (await request(app.getHttpServer()).put('/api/vehicle-statuses').send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-statuses from id', async () => {
    const updatedEntity: VehicleStatusDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-statuses/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-statuses', async () => {
    const deletedEntity: VehicleStatusDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-statuses/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
