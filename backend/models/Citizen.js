class Citizen {
    constructor({ name, attributes }) {
        this.name = name;
        this.attributes = attributes;
    }

    static validate(citizen) {
        const { name, attributes } = citizen;
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Name must be a non-empty string');
        }

        if (!Array.isArray(attributes)) {
            throw new Error('Attributes must be an array');
        }

        attributes.forEach((attribute) => {
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
                throw new Error(
                    'The value property must be a string or number'
                );
            }
            if (typeof attribute.trait_type !== 'string') {
                throw new Error('The trait_type property must be a string');
            }
            if (
                attribute.hasOwnProperty('max_value') &&
                typeof attribute.max_value !== 'number'
            ) {
                throw new Error(
                    'The max_value property must be a number if present'
                );
            }
        });

        return true;
    }
}

module.exports = Citizen;
