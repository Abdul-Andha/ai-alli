const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//creating the command
const command = new SlashCommandBuilder().setName("gpt").setDescription("Answers a prompt using GPT-3.");

command.addStringOption((option) =>
  option
    .setName(`prompt`)
    .setDescription(`Your prompt`)
    .setRequired(true)
);

module.exports = {
  data: command,
  async execute(bot, interaction) {
    print(bot)
    // let prompt = interaction.options.getString("prompt");
    // interaction.reply("Generating answer...");
    // try {
    //   const response = await openai.createCompletion({
    //     model: "gpt-3.5-turbo",
    //     prompt: prompt,
    //     temperature: 0,
    //     max_tokens: 512,
    //   });

    //   const responseEmbed = new EmbedBuilder()
    //     .setColor(0x0099FF)
    //     .setTitle(prompt)
    //     .setDescription(response.data.choices[0].text)

    //   interaction.channel.send({ embeds: [responseEmbed] });
    // } catch (err) {
    //   console.log(err);
    //   interaction.channel.send("An error occurred. Contact @Thunder#6228 if the issue persists. Error code: 02");
    // }
  }
};