import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleTrimDTO } from '../src/service/dto/vehicle-trim.dto';
import { VehicleTrimService } from '../src/service/vehicle-trim.service';

describe('VehicleTrim Controller', () => {
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
      .overrideProvider(VehicleTrimService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-trims ', async () => {
    const getEntities: VehicleTrimDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-trims').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-trims by id', async () => {
    const getEntity: VehicleTrimDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-trims/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-trims', async () => {
    const createdEntity: VehicleTrimDTO = (await request(app.getHttpServer()).post('/api/vehicle-trims').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-trims', async () => {
    const updatedEntity: VehicleTrimDTO = (await request(app.getHttpServer()).put('/api/vehicle-trims').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-trims from id', async () => {
    const updatedEntity: VehicleTrimDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-trims/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-trims', async () => {
    const deletedEntity: VehicleTrimDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-trims/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
