const dotenv = require('dotenv');
const OpenAI = require('openai');
dotenv.config();

const { OpenAISystemConfig } = require('../../config/apiConfig');

const testBody = {
    name: 'Outer Citizen #3681',
    attributes: [
        {
            value: 'Super Market Overlord',
            trait_type: 'Class',
        },
        {
            value: 'Albino',
            trait_type: 'Race',
        },
        {
            value: 75,
            trait_type: 'Strength',
            max_value: 100,
        },
        {
            value: 76,
            trait_type: 'Attractiveness',
            max_value: 100,
        },
        {
            value: 79,
            trait_type: 'Tech Skill',
            max_value: 100,
        },
        {
            value: 82,
            trait_type: 'Cool',
            max_value: 100,
        },
        {
            value: 'Focused',
            trait_type: 'Eyes',
        },
        {
            value: 'None',
            trait_type: 'Ability',
        },
        {
            value: 'Ocean Edge Park',
            trait_type: 'Location',
        },
        {
            value: 'Bills',
            trait_type: 'Weapon',
        },
        {
            value: 'Canoe',
            trait_type: 'Vehicle',
        },
        {
            value: 'Summer Suit 3',
            trait_type: 'Apparel',
        },
        {
            value: 'Cheek Implants',
            trait_type: 'Helm',
        },
        {
            value: 'Growl',
            trait_type: 'Expression',
        },
        {
            value: 'Swoop',
            trait_type: 'Hair',
        },
        {
            value: 'Civil',
            trait_type: 'Nose',
        },
        {
            value: 'High',
            trait_type: 'Allocation',
        },
        {
            value: 'Male',
            trait_type: 'Gender',
        },
        // {
        //     value: '180 days',
        //     trait_type: 'Timelock',
        // },
        // {
        //     value: '1.50x',
        //     trait_type: 'Multiplier',
        // },
        {
            value: 'Season 2',
            trait_type: 'Season',
        },
    ],
};

class AIController {
    static async apiGetCitizenBackstory(req, res) {
        console.log('apiGetCitizenBackstory');
        const config = {
            apiKey: process.env.OPENAI_API_KEY,
        };
        const openai = new OpenAI(config);
        try {
            const response = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: OpenAISystemConfig.content,
                    },
                    {
                        role: 'user',
                        content: JSON.stringify(testBody),
                    },
                ],
                // response_format: {
                //     type: 'json_object',
                // },
                model: 'gpt-3.5-turbo',
            });

            // console.log(response.data.choices[0].message.content);
            console.log(response.choices[0]);
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
