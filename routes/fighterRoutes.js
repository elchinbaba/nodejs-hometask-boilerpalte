const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

const error = new Error("Data not found");

router.get('/', (req, res, next) => {
    try {
        const data = FighterService.getAll();
        if (data === null) throw error;
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const data = FighterService.search({ id: req.params.id });
        if (data === null) throw error;
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
    try {
        if (!res.err) {
            const data = FighterService.create(req.body);
            res.data = data;
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
    try {
        if (!res.err) {
            const data = FighterService.update(req.params.id, req.body);
            if (data === null) throw error;
            res.data = data;
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const data = FighterService.delete(req.params.id);
        if (data === null) throw error;
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);
// TODO: Implement route controllers for fighter

module.exports = router;