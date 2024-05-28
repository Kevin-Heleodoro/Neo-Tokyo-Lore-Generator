const { check, validationResult } = require('express-validator');

const validateAttributes = [
    check('name').isString().withMessage('Name must be a string'),
    check('attributes').isArray().withMessage('Attributes must be an array'),
    check('attributes.*').custom((attribute) => {
        if (typeof attribute !== 'object') {
            throw new Error('Each attribute must be an object');
        }
        if (
            !attribute.hasOwnProperty('value') ||
            !attribute.hasOwnProperty('trait_type')
        ) {
            throw new Error(
                'Each attribute must have value and trait_type properties'
            );
        }
        if (!['string', 'number'].includes(typeof attribute.value)) {
            throw new Error('The value property must be a string or number');
        }
        if (!['string', 'number'].includes(typeof attribute.trait_type)) {
            throw new Error(
                'The trait_type property must be a string or number'
            );
        }
        if (
            attribute.hasOwnProperty('max_value') &&
            typeof attribute.max_value !== 'number'
        ) {
            throw new Error(
                'The max_value property must be a number if present'
            );
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateAttributes;
