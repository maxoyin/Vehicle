import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleMovementChecklistDTO } from '../src/service/dto/vehicle-movement-checklist.dto';
import { VehicleMovementChecklistService } from '../src/service/vehicle-movement-checklist.service';

describe('VehicleMovementChecklist Controller', () => {
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
      .overrideProvider(VehicleMovementChecklistService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-movement-checklists ', async () => {
    const getEntities: VehicleMovementChecklistDTO[] = (
      await request(app.getHttpServer()).get('/api/vehicle-movement-checklists').expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-movement-checklists by id', async () => {
    const getEntity: VehicleMovementChecklistDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-movement-checklists/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-movement-checklists', async () => {
    const createdEntity: VehicleMovementChecklistDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-movement-checklists').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movement-checklists', async () => {
    const updatedEntity: VehicleMovementChecklistDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-movement-checklists').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-movement-checklists from id', async () => {
    const updatedEntity: VehicleMovementChecklistDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-movement-checklists/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-movement-checklists', async () => {
    const deletedEntity: VehicleMovementChecklistDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-movement-checklists/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
