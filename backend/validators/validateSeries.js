const { check, validationResult } = require('express-validator');

const validateSeries = [
    check('series')
        .isString()
        .custom((value) => {
            if (value !== 'S1' && value !== 'S2') {
                throw new Error('Series must be S1 or S2');
            }
            return true;
        })
        .withMessage('Series must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateSeries;
