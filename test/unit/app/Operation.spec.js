const { expect } = require('chai');
const Operation = require('src/app/Operation');

describe('App :: Operation', () => {
    var CustomOperation;

    beforeEach(() => {
        CustomOperation = class CustomOperation extends Operation {

        };

        CustomOperation.setOutputs(['SUCCESS']);
    });

    describe('#on', () => {
        context('when added handler for a valid output', () => {
            it('does not throw', (done) => {
                const operation = new CustomOperation();

                expect(() => {
                    operation.on(operation.outputs.SUCCESS, () => { });
                }).to.not.throw;
                done();
            });
        });

        context('when added handler for a invalid output', () => {
            it('does not throw', () => {
                const operation = new CustomOperation();

                expect(() => {
                    operation.on('INVALID', () => {});
                }).to.throw(Error, /Invalid output "INVALID" to operation CustomOperation/);
            });
        });
    });
});
