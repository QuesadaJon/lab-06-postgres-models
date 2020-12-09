const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Ramen = require('../lib/models/Ramen');

describe('app test', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
    });

    afterAll(() => {
        return pool.end();
    });

    it('creates new ramen via POST', async () => {
        const response = await request(app)
            .post('/api/v1/ramen')
            .send({
                brand: 'nissin',
                type: 'cup noodle',
                flavor: 'shrimp'
            });

        expect(response.body).toEqual({
            id: '1',
            brand: 'nissin',
            type: 'cup noodle',
            flavor: 'shrimp'
        });
    });

    it('finds a ramen by id via GET', async () => {
        const ramen = await Ramen.insert({ brand: 'ramen', type: 'brothy', flavor: 'beef' });

        const response = await request(app)
            .get(`/api/v1/ramen/${ramen.id}`);

        expect(response.body).toEqual(ramen);
    });

    it('updates a ramen by id via PUT', async () => {
        const ramen = await Ramen.insert({ brand: 'tokyo', type: 'dry', flavor: 'shoyu' });

        const response = await request(app)
            .put(`/api/v1/ramen/${ramen.id}`)
            .send({
                brand: 'kanto',
                type: 'dry',
                flavor: 'katsu'
            });

        expect(response.body).toEqual({
            ...ramen,
            brand: 'kanto',
            type: 'dry',
            flavor: 'katsu'
        });
    });

    it('deletes a ramen by id via DELETE', async () => {
        const ramen = await Ramen.insert({ brand: 'jons', type: 'extra dry', flavor: 'salt' });

        const response = await request(app)
            .delete(`/api/v1/ramen/${ramen.id}`);

        expect(response.body).toEqual({});
    });
});
