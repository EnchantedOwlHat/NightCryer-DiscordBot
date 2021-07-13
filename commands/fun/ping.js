//all the stuff that can be read by the index.js file
module.exports = 
{
	name: 		 'ping',
	description: 'Ping!',
	args:		 false,
	usage: '<nothing>',
	guildOnly: true,

    //this is what will be executed when this file is activated
	execute(message, args) 
    {
		message.channel.send('Pog.');
	},
};