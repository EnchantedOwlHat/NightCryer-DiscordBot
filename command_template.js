//all the stuff that can be read by the index.js file
module.exports =
{
    name:        'name',
    description: 'description',
    usage:       '<lolgay>',
    args:        false,
    guildOnly:   true,
    cooldown:    0,

    //this is what will be executed when this file is activated
    execute(message, args)
    {
        message.reply('I\'m a real gamer');
    },
}