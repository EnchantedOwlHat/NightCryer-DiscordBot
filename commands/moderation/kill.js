module.exports =
{
    name: 'kill',
    description: 'Kicks the @\'d member',
    args: true,
    usage: '<@person to kill>',
    guildOnly: true,

    execute(message, args) 
    {
        const taggedUser = message.mentions.users.first();

        message.channel.send(`${taggedUser.username}, you have been selected for the culling.`);
    },
}