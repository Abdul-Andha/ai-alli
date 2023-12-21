module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (!message.content.includes("https://x.com")) return;

    try {
      let start = message.content.indexOf("https://x.com");
      let end = message.content.indexOf(" ", start);
      if (end === -1) end = message.content.length;

      let link = message.content.substring(start, end);
      let newLink = link.replace("x.com", "fxtwitter.com");

      message.channel.send(newLink);
    } catch (err) {
      if (err) console.error(err);
      await interaction.reply({
        content: "An error occurred. Contact @Thunder#6228 if the issue persists. Error code: 01"
      });
    }
  }
}