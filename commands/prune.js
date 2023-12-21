const { SlashCommandBuilder } = require("@discordjs/builders");

const command = new SlashCommandBuilder().setName("prune").setDescription("Delete a specified number of messages.");
command.addIntegerOption((option) =>
  option
    .setName(`number`)
    .setDescription(`Number of messages to delete (1 - 100)`)
    .setRequired(true)
);

module.exports = {
  data: command,

  async execute(interaction) {
    let numToDel = interaction.options.getInteger("number")
    if (numToDel < 1 || numToDel > 100) return interaction.reply("Out of range");

    let channel = interaction.channel
    channel.bulkDelete(numToDel)
    // for (let i = 0; i < numToDel; i++) {
    //   let lastMsg = await channel.messages.fetch(channel.lastMessageId)
    //   console.log(lastMsg)
    //   await lastMsg.deleteMessage();
    // }
    interaction.reply("Done!")
  }
}