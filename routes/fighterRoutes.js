const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        const data = FighterService.getAll();
        if (data === null) throw Error("Data not found");
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
        if (data === null) throw Error("Data not found");
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

router.put('/:id', (req, res, next) => {
    try {
        const data = FighterService.update(req.params.id, req.body);
        if (data === null) throw Error("Data not found");
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, updateFighterValid, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const data = FighterService.delete(req.params.id);
        if (data === null) throw Error("Data not found");
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);
// TODO: Implement route controllers for fighter

module.exports = router;