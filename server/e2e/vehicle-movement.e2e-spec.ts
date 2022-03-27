import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleMovementDTO } from '../src/service/dto/vehicle-movement.dto';
import { VehicleMovementService } from '../src/service/vehicle-movement.service';

describe('VehicleMovement Controller', () => {
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
      .overrideProvider(VehicleMovementService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-movements ', async () => {
    const getEntities: VehicleMovementDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-movements').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-movements by id', async () => {
    const getEntity: VehicleMovementDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-movements/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-movements', async () => {
    const createdEntity: VehicleMovementDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-movements').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movements', async () => {
    const updatedEntity: VehicleMovementDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-movements').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movements from id', async () => {
    const updatedEntity: VehicleMovementDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-movements/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-movements', async () => {
    const deletedEntity: VehicleMovementDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-movements/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
