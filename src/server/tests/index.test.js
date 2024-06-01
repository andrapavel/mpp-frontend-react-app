// // server/tests/index.test.js
// const request = require('supertest');
// const app = require('../index');

// describe('GET /teams/:id', () => {
//     it('should return team details for valid ID', async () => {
//         const response = await request(app).get('/api/teams');
//         expect(response.status).toBe(200);
//         expect(response.body.length).toBe(2);
//     });

//     // it('should return 404 for invalid ID', async () => {
//     //     const response = await request(app).get('/teams/999');
//     //     expect(response.status).toBe(404);
//     // });
// });

// // Write similar tests for other endpoints

const request = require('supertest');
const app = require('../index'); // Adjust the path if needed

describe('Basic API Endpoints', () => {
    test('should respond with 404 Not Found for an unknown route', async () => {
        const response = await request(app).get('/unknown');
        expect(response.statusCode).toBe(404);
    });

    test('should respond with 401 Unauthorized for protected route without token', async () => {
        const response = await request(app).get('/api/teams');
        expect(response.statusCode).toBe(401);
    });

    test('should respond with 201 Created for register endpoint', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({username: 'testuser', password: 'password'});
        expect(response.statusCode).toBe(201);
    });

    test('should respond with 200 OK for login endpoint with valid credentials', async () => {
        const registerResponse = await request(app)
            .post('/api/register')
            .send({username: 'testuser2', password: 'password'});
        expect(registerResponse.statusCode).toBe(201);

        const loginResponse = await request(app)
            .post('/api/login')
            .send({username: 'testuser2', password: 'password'});
        expect(loginResponse.statusCode).toBe(200);
    });

    test('should respond with 200 OK for logout endpoint', async () => {
        const response = await request(app).post('/api/logout');
        expect(response.statusCode).toBe(200);
    });
});
