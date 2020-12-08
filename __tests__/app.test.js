const request = require('supertest');
const app = require('../lib/app');

describe('app test', () => {
    it('responds with hello world', () => {
        return request(app)
            .get('/')
            .then(res => {
                expect(res.text).toEqual('hello world');
            });
    });
});
