const { expect } = require('chai');
const User = require('src/domain/user/User');
const MongooseUserMapper = require('src/infra/user/MongooseUserMapper');

describe('Infra :: User :: MongooseUserMapper', () => {
    describe('.toEntity', () => {
        it('returns user instance with passed attributes', () => {
            const mockedMongooseUser = {
                _id: '1',
                name: 'The Name'
            };

            const entity = MongooseUserMapper.toEntity(mockedMongooseUser);

            expect(entity).to.be.instanceOf(User);
            expect(entity.id).to.equal('1');
            expect(entity.name).to.equal('The Name');
        });
    });

    describe('.toDatabase', () => {
        it('returns user object prepared to be persisted', () => {
            const user = new User({
                name: 'Some User',
                age: 24
            });

            const dbUser = MongooseUserMapper.toDatabase(user);

            expect(dbUser.name).to.equal('Some User');
            expect(dbUser).to.have.all.keys('name', 'age');
        });
    });
});
