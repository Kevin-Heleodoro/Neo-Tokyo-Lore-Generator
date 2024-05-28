const OpenAI = require('openai');

const { OpenAISystemConfig } = require('../config/apiConfig');

class OpenAIService {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey });
    }

    async generateCitizenBackstory(requestBody) {
        try {
            const response = await this.openai.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: OpenAISystemConfig.content,
                    },
                    {
                        role: 'user',
                        content: JSON.stringify(requestBody),
                    },
                ],
                model: 'gpt-3.5-turbo',
            });

            if (!response.choices || response.choices.length === 0) {
                throw new Error('No response from the Lore Maker');
            }

            return response.choices[0].message.content;
        } catch (error) {
            console.log(error.message);
            throw new Error('Failed to get citizen backstory');
        }
    }
}

module.exports = { OpenAIService };
