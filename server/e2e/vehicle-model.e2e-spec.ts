import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleModelDTO } from '../src/service/dto/vehicle-model.dto';
import { VehicleModelService } from '../src/service/vehicle-model.service';

describe('VehicleModel Controller', () => {
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
      .overrideProvider(VehicleModelService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-models ', async () => {
    const getEntities: VehicleModelDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-models').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-models by id', async () => {
    const getEntity: VehicleModelDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-models/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-models', async () => {
    const createdEntity: VehicleModelDTO = (await request(app.getHttpServer()).post('/api/vehicle-models').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-models', async () => {
    const updatedEntity: VehicleModelDTO = (await request(app.getHttpServer()).put('/api/vehicle-models').send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-models from id', async () => {
    const updatedEntity: VehicleModelDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-models/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-models', async () => {
    const deletedEntity: VehicleModelDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-models/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
