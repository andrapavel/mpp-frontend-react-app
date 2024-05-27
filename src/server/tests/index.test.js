// server/tests/index.test.js
const request = require('supertest');
const app = require('../index');

describe('GET /teams/:id', () => {
    it('should return team details for valid ID', async () => {
        const response = await request(app).get('/teams/1');
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Team 1');
    });

    it('should return 404 for invalid ID', async () => {
        const response = await request(app).get('/teams/999');
        expect(response.status).toBe(404);
    });
});

// Write similar tests for other endpoints
