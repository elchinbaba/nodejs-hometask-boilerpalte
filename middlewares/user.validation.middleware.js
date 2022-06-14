const { user } = require('../models/user');

const UserService = require('../services/userService');

const error = new Error("Validation error");

const userHasNoAdditionalFields = reqBody => Object.keys(reqBody).every(key => Object.keys(user).includes(key));

const userCreationValidator = reqBody => {
    if (reqBody.id) throw error;

    if (!reqBody.firstName) throw error;

    if (!reqBody.lastName) throw error;

    if (!reqBody.email) throw error;
    else if (!(reqBody.email.split('@').pop() === "gmail.com")) throw error;

    if (!reqBody.phoneNumber) throw error;
    else if (!reqBody.phoneNumber.startsWith('+380') || !(reqBody.length === 13)) throw error;

    if (!reqBody.password) throw error;
    else if (!(reqBody.password.length >= 3)) throw error;
}

const userUpdationValidator = reqBody => {
    if (reqBody.id || reqBody.firstName || reqBody.lastName
        || reqBody.email|| reqBody.phoneNumber || reqBody.password) return;
    throw error;
}

const checkingUniqueness = reqBody => {
    if (UserService.search({ email: reqBody.email }) || UserService.search({ phoneNumber: reqBody.phoneNumber }))
        throw error;
}

const createUserValid = (req, res, next) => {
    const reqBody = req.body;
    try {
        if (!userHasNoAdditionalFields(reqBody)) throw error;
        userCreationValidator(reqBody);
        checkingUniqueness(reqBody);
    } catch (error) {
        res.err = error;
    } finally {
        next();
    }
    // TODO: Implement validatior for user entity during creation

    // next();
}

const updateUserValid = (req, res, next) => {
    const reqBody = req.body;
    try {
        if (!userHasNoAdditionalFields(reqBody)) throw error;
        userUpdationValidator(reqBody);
        checkingUniqueness(reqBody);
    } catch (error) {
        res.err = error;
    } finally {
        next();
    }
    // TODO: Implement validatior for user entity during update

    // next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;