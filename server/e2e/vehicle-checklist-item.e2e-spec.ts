import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleChecklistItemDTO } from '../src/service/dto/vehicle-checklist-item.dto';
import { VehicleChecklistItemService } from '../src/service/vehicle-checklist-item.service';

describe('VehicleChecklistItem Controller', () => {
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
      .overrideProvider(VehicleChecklistItemService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-checklist-items ', async () => {
    const getEntities: VehicleChecklistItemDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-checklist-items').expect(200))
      .body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-checklist-items by id', async () => {
    const getEntity: VehicleChecklistItemDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-checklist-items/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-checklist-items', async () => {
    const createdEntity: VehicleChecklistItemDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-checklist-items').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-checklist-items', async () => {
    const updatedEntity: VehicleChecklistItemDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-checklist-items').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-checklist-items from id', async () => {
    const updatedEntity: VehicleChecklistItemDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-checklist-items/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-checklist-items', async () => {
    const deletedEntity: VehicleChecklistItemDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-checklist-items/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
