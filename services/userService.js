const { UserRepository } = require('../repositories/userRepository');

class UserService {
    create(data) {
        const user = UserRepository.create(data);
        if(!user) {
            return null;
        }
        return user;
    }

    update(id, data) {
        if (!this.search({ id: id })) return null;
        const user = UserRepository.update(id, data);
        if(!user) {
            return null;
        }
        return user;
    }

    delete(id) {
        if (!this.search({ id: id })) return null;
        const user = UserRepository.delete(id);
        if(!user) {
            return null;
        }
        return user;
    }

    getAll() {
        const users = UserRepository.getAll();
        if(!users) {
            return null;
        }
        return users;
    }
    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();