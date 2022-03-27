import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SimNetworkDTO } from '../src/service/dto/sim-network.dto';
import { SimNetworkService } from '../src/service/sim-network.service';

describe('SimNetwork Controller', () => {
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
      .overrideProvider(SimNetworkService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all sim-networks ', async () => {
    const getEntities: SimNetworkDTO[] = (await request(app.getHttpServer()).get('/api/sim-networks').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET sim-networks by id', async () => {
    const getEntity: SimNetworkDTO = (
      await request(app.getHttpServer())
        .get('/api/sim-networks/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create sim-networks', async () => {
    const createdEntity: SimNetworkDTO = (await request(app.getHttpServer()).post('/api/sim-networks').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update sim-networks', async () => {
    const updatedEntity: SimNetworkDTO = (await request(app.getHttpServer()).put('/api/sim-networks').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update sim-networks from id', async () => {
    const updatedEntity: SimNetworkDTO = (
      await request(app.getHttpServer())
        .put('/api/sim-networks/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE sim-networks', async () => {
    const deletedEntity: SimNetworkDTO = (
      await request(app.getHttpServer())
        .delete('/api/sim-networks/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
