const { expect } = require('chai');
const factory = require('test/support/factory');
const MongooseUsersRepository = require('src/infra/user/MongooseUsersRepository');
const User = require('src/domain/user/User');
const { User: UserModel } = require('src/infra/database/models');

describe('Infra :: User :: MongooseUsersRepository', () => {
    let repository;

    beforeEach(() => {
        repository = new MongooseUsersRepository({ UserModel });
    });

    describe('#getAll', () => {
        beforeEach(() => {
            return factory.createMany('user', 2, [
                { name: 'User 1' },
                { name: 'User 2' }
            ]);
        });

        it('returns all users from the database', async () => {
            const users = await repository.getAll();

            expect(users).to.have.lengthOf(2);

            expect(users[0]).to.be.instanceOf(User);
            expect(users[0].name).to.equal('User 1');

            expect(users[1]).to.be.instanceOf(User);
            expect(users[1].name).to.equal('User 2');
        });
    });

    describe('#getById', () => {
        context('when user exits', () => {
            it('returns the user', async () => {
                const user = await factory.create('user', {
                    name: 'User'
                });

                const foundUser = await repository.getById(user.id);

                expect(foundUser).to.be.instanceOf(User);
                expect(foundUser.id).to.equal(user.id);
                expect(foundUser.name).to.equal('User');
            });
        });

        context('when the user does not exist', () => {
            it('rejects with an error', async () => {
                let userId = '000000000000000000000000';
                try {
                    await repository.getById(userId);
                } catch(error) {
                    expect(error.message).to.equal('NotFoundError');
                    expect(error.details).to.equal(`User with id ${userId} can't be found.`);
                }
            });
        });
    });

    describe('#add', () => {
        context('when user is valid', () => {
            it('persists the user', () => {
                const user = new User({
                    name: 'The User'
                });

                expect(user.validate().valid).to.be.ok();

                return expect(async () => {
                    const persistedUser = await repository.add(user);

                    expect(persistedUser.id).to.exist;
                    expect(persistedUser.name).to.equal('The User');
                }).to.alter(() => repository.count(), { by: 1 });
            });
        });

        context('when user is invalid', () => {
            it('does not persist user and rejects with an error', () => {
                const user = new User();

                expect(user.validate().valid).to.not.be.ok();

                return expect(async () => {
                    try {
                        await repository.add(user);
                    } catch (error) {
                        expect(error.message).to.equal('ValidationError');
                        expect(error.details).to.eql([
                            { message: '"name" is required', path: 'name' }
                        ]);
                    }
                }).to.not.alter(() => repository.count());
            });
        });
    });

    describe('#remove', () => {
        context('when the user exists', () => {
            it('removes the user', async () => {
                const user = await factory.create('user', {
                    name: 'User'
                });

                return expect(async () => {
                    return await repository.remove(user.id);
                }).to.alter(() => repository.count(), { by: -1 });
            });
        });

        context('when the user does not exists', () => {
            it('returns a error', async () => {
                let userId = '000000000000000000000000';
                try {
                    await repository.remove(userId);
                } catch (error) {
                    expect(error.message).to.equal('NotFoundError');
                }
            });
        });
    });

    describe('#update', () => {
        context('when the user exists', () => {
            context('when data is valid', () => {
                it('updates and returns the updated user', async () => {
                    const user = await factory.create('user', {
                        name: 'User'
                    });

                    return expect(async () => {
                        return await repository.update(user.id, { name: 'New User' });
                    }).to.alter(async () => {
                        const dbUser = await UserModel.findById(user.id);
                        return dbUser.name;
                    }, { from: 'User', to: 'New User' });
                });
            });

            context('when data is not valid', () => {
                it('does not update and returns the error', async () => {
                    const user = await factory.create('user', {
                        name: 'User'
                    });

                    return expect(async () => {
                        try {
                            await repository.update(user.id, { name: '' });
                        } catch (error) {
                            expect(error.message).to.equal('ValidationError');
                        }
                    }).to.not.alter(async () => {
                        const dbUser = await UserModel.findById(user.id);
                        return dbUser.name;
                    });
                });
            });
        });

        context('when user does not exist', () => {
            it('returns an error', async () => {
                let userId = '000000000000000000000000';
                try {
                    await repository.update(userId, { name: 'New User' });
                } catch (error) {
                    expect(error.message).to.equal('NotFoundError');
                    expect(error.details).to.equal(`User with id ${userId} can't be found.`);
                }
            });
        });
    });
});
