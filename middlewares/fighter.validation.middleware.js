const { fighter } = require('../models/fighter');

const FighterService = require('../services/fighterService');

const error = new Error("Validation error");

const fighterHasNoAdditionalFields = reqBody => Object.keys(reqBody).every(key => Object.keys(fighter).includes(key));

const fighterCreationValidator = reqBody => {
    if (reqBody.id) throw error;

    if (!reqBody.name) throw error;

    if (!reqBody.power) throw error;
    else if (!(+reqBody.power >= 1 && +reqBody.power <= 100)) throw error;

    if (!reqBody.defense) throw error;
    else if (!(+reqBody.defense >= 1 && +reqBody.defense <= 10)) throw error;

    if (reqBody.health && !(+reqBody.health >= 80 && +reqBody.health <= 120)) throw error;
}

const fighterUpdationValidator = reqBody => {
    if (reqBody.id || reqBody.name || reqBody.power || reqBody.defense|| reqBody.health) return;
    throw error;
}

const checkingUniqueness = reqBody => {
    if (FighterService.search({ name: reqBody.name })) throw error;
}

const createFighterValid = (req, res, next) => {
    const reqBody = req.body;
    try {
        if (!fighterHasNoAdditionalFields(reqBody)) throw error;
        fighterCreationValidator(reqBody);
        checkingUniqueness(reqBody);
    } catch (error) {
        res.err = error;
    } finally {
        next();
    }
    // TODO: Implement validatior for fighter entity during creation
    // next();
}

const updateFighterValid = (req, res, next) => {
    const reqBody = req.body;
    try {
        if (!fighterHasNoAdditionalFields(reqBody)) throw error;
        fighterUpdationValidator(reqBody);
        checkingUniqueness(reqBody);
    } catch (error) {
        res.err = error;
    } finally {
        next();
    }
    // TODO: Implement validatior for fighter entity during update
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;