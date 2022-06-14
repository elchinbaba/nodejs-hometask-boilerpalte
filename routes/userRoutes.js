const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        const data = UserService.getAll();
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
        const data = UserService.search({ id: req.params.id });
        if (data === null) throw Error("Data not found");
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
    try {
        if (!res.err) {
            const data = UserService.create(req.body);
            res.data = data;
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    try {
        if (!res.err) {
            const data = UserService.update(req.params.id, req.body);
            if (data === null) throw Error("Data not found");
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
        const data = UserService.delete(req.params.id);
        if (data === null) throw Error("Data not found");
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);
// TODO: Implement route controllers for user

module.exports = router;