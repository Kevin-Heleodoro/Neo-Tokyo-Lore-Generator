const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const { OpenAIService } = require('../services/OpenAIService');
const Citizen = require('../models/Citizen');

class AIController {
    static async apiGetCitizenBackstory(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(
                createHttpError(400, 'Invalid input data', {
                    errors: errors.array(),
                })
            );
        }

        const openAIService = new OpenAIService(process.env.OPENAI_API_KEY);

        try {
            Citizen.validate(req.body);
            const citizen = new Citizen(req.body);

            const backstory = await openAIService.generateCitizenBackstory(
                citizen
            );
            res.json({ backstory });
        } catch (error) {
            next(createHttpError(500, error.message));
        }
    }
}

module.exports = AIController;
