const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//creating the command
const command = new SlashCommandBuilder().setName("dalle").setDescription("Generates an image from a prompt.");

command.addStringOption((option) =>
  option
    .setName(`prompt`)
    .setDescription(`Your prompt`)
    .setRequired(true)
);

module.exports = {
  data: command,
  async execute(interaction) {
    let prompt = interaction.options.getString("prompt");
    interaction.reply("Generating image...");
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      image_url = response.data.data[0].url;

      const responseEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(prompt)
        .setImage(image_url)

      interaction.channel.send({ embeds: [responseEmbed] });
    } catch (err) {
      console.log(err);
      interaction.channel.send("An error occurred. Contact @Thunder#6228 if the issue persists. Error code: 01");
    }
  }
};