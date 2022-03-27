import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleManufacturerDTO } from '../src/service/dto/vehicle-manufacturer.dto';
import { VehicleManufacturerService } from '../src/service/vehicle-manufacturer.service';

describe('VehicleManufacturer Controller', () => {
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
      .overrideProvider(VehicleManufacturerService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-manufacturers ', async () => {
    const getEntities: VehicleManufacturerDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-manufacturers').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-manufacturers by id', async () => {
    const getEntity: VehicleManufacturerDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-manufacturers/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-manufacturers', async () => {
    const createdEntity: VehicleManufacturerDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-manufacturers').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-manufacturers', async () => {
    const updatedEntity: VehicleManufacturerDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-manufacturers').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-manufacturers from id', async () => {
    const updatedEntity: VehicleManufacturerDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-manufacturers/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-manufacturers', async () => {
    const deletedEntity: VehicleManufacturerDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-manufacturers/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
