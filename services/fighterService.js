const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    create(data) {
        if (!data.health) data.health = '100';
        const user = FighterRepository.create(data);
        if(!user) {
            return null;
        }
        return user;
    }

    update(id, data) {
        const user = FighterRepository.update(id, data);
        if(!user) {
            return null;
        }
        return user;
    }

    delete(id) {
        const user = FighterRepository.delete(id);
        if(!user) {
            return null;
        }
        return user;
    }

    getAll() {
        const users = FighterRepository.getAll();
        if(!users) {
            return null;
        }
        return users;
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
    // TODO: Implement methods to work with fighters
}

module.exports = new FighterService();