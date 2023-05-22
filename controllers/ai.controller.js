const { Configuration, OpenAIApi } = require("openai");
const Ai = require("../models/Ai.model");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,

      max_tokens: 1500,
      temperature: 0.9,
    });

    const data = completion.data.choices[0].text;

    const text = await Ai.create({
      input: prompt,
      output: data,
    });

    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateText,
};
