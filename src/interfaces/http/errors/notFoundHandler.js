const Status = require('http-status');

/* istanbul ignore next */
module.exports = (req, res, next) => { // eslint-disable-line no-unused-vars

    const handled = {
        error_code: 0,
        message: 'Not Found',
        details: []
    };

    res.status(Status.NOT_FOUND).json(handled);
};
