import mongoose from 'mongoose';
import request from 'supertest';
import server from '../src/server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const pagePayload1 = {
  id: new mongoose.Types.ObjectId().toString(),
  created_at: new Date("2021-09-30T13:31:07.674Z"),
  page: {
    title: 'dami',
    description: 'theris sckscs',
    tags: ['ddd', 'dddf', 'ddfd'],
  },
  user: {
    id: new mongoose.Types.ObjectId().toString(),
    created_at: new Date("2021-09-30T13:31:07.674Z"),
  },
};

const pagePayload2 = {
  id: new mongoose.Types.ObjectId().toString(),
  created_at: new Date('2021-09-30T13:31:07.674Z'),
  page: {
    title: 'Debo',
    description: 'spectacular',
    tags: ['ddd', 'dddf', 'ddfd'],
  },
  user: {
    id: new mongoose.Types.ObjectId().toString(),
    created_at: new Date('2021-09-30T13:31:07.674Z'),
  },
};



describe('GET Home', () => {
  it('should get a Home page showing server is active', async () => {
    const res = await request(server).get('/');
    expect(res.status).toEqual(200);
    await server.close();
  });
});

describe('PAGES', () => {
  // user registration

  // Connect to database before any test
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  // Disconnect from database after all test have been ran
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Get all pages before creation', () => {
    it('should return empty pages array', async () => {
      const { statusCode, body } = await request(server).get('/pages');
      expect(statusCode).toBe(200);
      expect(body.data).toEqual([]);
    });
  });

  describe('Register pages 1', () => {
    it('Given the registration data are present and valid, pages should be saved successfully', async () => {
      const { statusCode, body } = await request(server).post('/pages/register').send(pagePayload1);
        expect(statusCode).toBe(200);
        expect(body.data).not.toBeNull();
        expect(body.data).not.toBeUndefined();
        expect(body.data.page.description).toContain('theris sckscs');
        
    });
  });
    
    describe('Register pages 2', () => {
      it('Given the registration data are present and valid, pages should be saved successfully', async () => {
        const { statusCode, body } = await request(server).post('/pages/register').send(pagePayload2);
        expect(statusCode).toBe(200);
        expect(body.data).not.toBeNull();
        expect(body.data).not.toBeUndefined();
        expect(body.data.page.description).toContain('spectacular');
      });
    });

  describe('Get pages after creation', () => {
    it('should return the pages array as payload', async () => {
      const { statusCode, body } = await request(server).get('/pages');
        expect(statusCode).toBe(200);
        expect(body.data).not.toBeNull();
        expect(body.data).not.toBeUndefined();
        expect(body.data.length).toBeGreaterThan(0);
    });
  });
});
