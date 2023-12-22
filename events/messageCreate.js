module.exports = {
  name: "messageCreate",
  async execute(message) {
    let oldDomain = "";
    let newDomain = "";
    if (message.content.includes("https://x.com")) {
      oldDomain = "https://x.com";
      newDomain = "https://fxtwitter.com";
    } else if (message.content.includes("https://twitter.com")) {
      oldDomain = "https://twitter.com";
      newDomain = "https://fxtwitter.com";
    } else if (message.content.includes(".instagram.com")) {
      oldDomain = ".instagram.com";
      newDomain = "https://ddinstagram.com";
    } else return;

    try {
      let start = message.content.indexOf(oldDomain);
      let end = message.content.indexOf(" ", start);
      if (end === -1) end = message.content.length;

      let link = message.content.substring(start, end);
      let newLink = link.replace(oldDomain, newDomain);

      message.channel.send(newLink);
    } catch (err) {
      if (err) console.error(err);
      await interaction.reply({
        content: "An error occurred. Contact @Thunder#6228 if the issue persists. Error code: 01"
      });
    }
  }
}