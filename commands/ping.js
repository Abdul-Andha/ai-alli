const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("pong"),
	async execute(interaction) {
		guild = await interaction.client.guilds.fetch("760326429161291777")
		member = await guild.members.fetch(interaction.user.id)
		console.log(member)
		// member = guild.members.fetch(interaction.user.id)
		member.roles.add("764290802515181608")
		interaction.reply("Pong!");
	}
}