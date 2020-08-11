module.exports = 
{
	name: 'face',
	description: 'Displays a user\'s avatar',

	execute(message, args) 
	{
		let tag = message.mentions.users.first();
		if (!tag)
		{
			let ava = new Discord.MessageEmbed().setImage(message.author.avatarURL());
			return message.channel.send(ava);
		}

		let ava = new Discord.MessageEmbed().setImage(tag.avatarURL());
		message.channel.send(ava);

	},
};