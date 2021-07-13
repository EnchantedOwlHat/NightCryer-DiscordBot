module.exports =
{
    name:        'feed',
    description: 'clears the number of messages the user provides',
    args:        true,
    usage:       '<number of messages to clear>',
    guildOnly:   true,

    execute(message, args) 
    {
        const feedNum = parseInt(args[0], 10);

        //discord doesn't want to delete more than 100 messages at a time
        if (!args[0] || isNaN(feedNum) || feedNum > 100 || feedNum < 1)
        {
            return message.channel.send('This is improper use of this command. Please provide an integer value between 1 and 100.');
        }
        //if messages are too old or uh idk but if discord gets pissy about
        //deleting it then it just catches the error
        message.channel.bulkDelete(feedNum + 1, true).catch(err => 
        {
            console.error(err);
            message.channel.send('We have encountered difficulties. My apologies.');
        });
    },
}