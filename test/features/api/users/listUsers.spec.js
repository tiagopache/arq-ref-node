const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');
describe('API :: GET /api/users', () => {
    let users;
    context('when there are users', () => {
        beforeEach(async () => {
            users = await factory.createMany('user', 2, [
                { name: 'First' },
                { name: 'Second' }
            ]);
            return;
        });

        it('return success with array of users', async () => {
            const { body } = await request()
                .get('/api/users')
                .expect(200);

            // expect(body).to.have.lengthOf(2);
            const user1 = body.find(({id}) => id === users[0].id);
            const user2 = body.find(({id}) => id === users[1].id);

            expect(user1.name).to.equal(users[0].name);
            expect(user1.id).to.equal(users[0].id);
            expect(user1).to.have.all.keys('id', 'name');

            expect(user2.name).to.equal(users[1].name);
            expect(user2.id).to.equal(users[1].id);
            expect(user2).to.have.all.keys('id', 'name');
        });
    });

    // todo validate when implents migrate
    // context('when there are no users', () => {
    //     it('return success with empty array', async () => {
    //         const { body } = await request()
    //             .get('/api/users')
    //             .expect(200);

    //         expect(body).to.have.lengthOf(0);
    //     });
    // });
});
