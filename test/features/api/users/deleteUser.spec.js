const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');
var mongoose = require('mongoose');

describe('API :: DELETE /api/users/:id', () => {
    context('when user exists', () => {
        it('deletes the user and return status 202', async () => {
            const user = await factory.create('user', {
                name: 'User'
            });

            await request()
                .delete(`/api/users/${user.id}`)
                .expect(202);
        });
    });

    context('when user does not exist', () => {
        it('returns the not found message and status 404', async () => {
            const objectId = new mongoose.mongo.ObjectId();
            const { body } = await request()
                .delete(`/api/users/${objectId}`)
                .send({
                    name: 'Updated User'
                })
                .expect(404);

            expect(body.type).to.equal('NotFoundError');
            // expect(body.details).to.equal(`User with id ${objectId} can't be found.`);
        });
    });
});
