import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AssestClassDTO } from '../src/service/dto/assest-class.dto';
import { AssestClassService } from '../src/service/assest-class.service';

describe('AssestClass Controller', () => {
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
      .overrideProvider(AssestClassService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all assest-classes ', async () => {
    const getEntities: AssestClassDTO[] = (await request(app.getHttpServer()).get('/api/assest-classes').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET assest-classes by id', async () => {
    const getEntity: AssestClassDTO = (
      await request(app.getHttpServer())
        .get('/api/assest-classes/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create assest-classes', async () => {
    const createdEntity: AssestClassDTO = (await request(app.getHttpServer()).post('/api/assest-classes').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update assest-classes', async () => {
    const updatedEntity: AssestClassDTO = (await request(app.getHttpServer()).put('/api/assest-classes').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update assest-classes from id', async () => {
    const updatedEntity: AssestClassDTO = (
      await request(app.getHttpServer())
        .put('/api/assest-classes/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE assest-classes', async () => {
    const deletedEntity: AssestClassDTO = (
      await request(app.getHttpServer())
        .delete('/api/assest-classes/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
