const express = require('express');
const Ramen = require('./models/Ramen');
const app = express();

app.use(express.json());

app.post('/api/v1/ramen', (req, res, next) => {
    Ramen
        .insert(req.body)
        .then(ramen => res.send(ramen))
        .catch(next);
});

app.get('/api/v1/ramen/:id', (req, res, next) => {
    Ramen
        .findById(req.params.id)
        .then(ramen => res.send(ramen))
        .catch(next);
});

app.put('/api/v1/ramen/:id', (req, res, next) => {
    Ramen
        .update(req.params.id, req.body)
        .then(ramen => res.send(ramen))
        .catch(next);
});

app.delete('/api/v1/ramen/:id', (req, res, next) => {
    Ramen
        .delete(req.params.id)
        .then(ramen => res.send(ramen))
        .catch(next);
});

module.exports = app;
