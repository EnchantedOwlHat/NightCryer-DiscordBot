module.exports =
{
    name: 'population',
    description: 'See how many people are in the server',
    args: false,
    guildOnly: true,
    cooldown: 0,

    execute(message) 
    {
        let server = message.channel.guild;

        message.reply(`${server.memberCount} assorted spooks and spirits call ${server.name} their permanent home.`);
    },
}