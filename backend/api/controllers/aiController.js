const OpenAI = require('openai');

const { OpenAISystemConfig } = require('../../config/apiConfig');

class AIController {
    static async apiGetCitizenBackstory(req, res) {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        try {
            const response = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: OpenAISystemConfig.content,
                    },
                    {
                        role: 'user',
                        content: JSON.stringify(req.body),
                    },
                ],
                model: 'gpt-3.5-turbo',
            });

            res.json(response.choices[0].message.content);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error,
                message: `Failed to get citizen backstory`,
            });
        }
    }
}

module.exports = { AIController };
