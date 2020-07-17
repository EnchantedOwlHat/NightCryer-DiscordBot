const Discord = require('discord.js');
const bot = new Discord.Client();


const token       = 'NzE0OTIzMTg5NjM3MjE4NDY1.Xs1uRw.FavxaxsaM4qnSd4GYI29opZaRcs';

const PREFIX      = '=';
const cryerAvatar = 'https://i.imgur.com/KESzmRE.png';
const defaultName = 'NightCryer';
const CryerID     = '714923189637218465';

const onlineMessage    = 'My wings are yours to command.';
const apologiesMessage = 'Apologies, I am but a simple beast. I do not understand.';


var hunt;
var kills;
var prey;
var preyName;


bot.on('ready',() =>
{
    console.log(onlineMessage); 
    if (bot.avatarURL != cryerAvatar){bot.user.setAvatar(cryerAvatar);}
    if (bot.username != defaultName) {bot.user.setUsername(defaultName);}

    hunt = false;
    prey = null;
    preyName = null;
    kills = 0;
})

bot.on('message', async message=>
{
    let args = message.content.slice(PREFIX.length).split(" ");

    if(message.content === "Servant on the night, the stars beckon thee!")
    {message.reply(onlineMessage);}

    
    switch(args[0])
    {
        case 'servant':
            message.reply('What is thy will?');
            break;
        case 'show':
            if (args[1] === "me" && args[2] === "your" && args[3] === "face")
            {
                let image = new Discord.MessageEmbed().setImage(cryerAvatar);
                message.channel.send(image);
            }
            else
            {
                message.channel.send(apologiesMessage)
            }
            break;

        case 'clear':
            if(!args[1]) return message.reply('How much do you want to clear? I cannot know. \n (Syntax: ' + PREFIX + 'clear <number of messages you want to clear>)')
            message.channel.bulkDelete(args[1])
            break;

        case 'hunt':
            if (message.mentions.users.size)
            {
                if (hunt)
                {
                    message.reply("There is already a hunt in progress.");
                }
                else
                {
                    prey = message.mentions.users.first();
                    preyName = prey.username;
                    hunt = true;
    
                    message.channel.send('I pray you found a place to hide, ' + preyName + '.')    
                }
            }
            else if (!message.mentions.users.size) 
            {
                if (args[1] === 'end' || args[1] === 'End')
                {
                    if (hunt === true)
                    {
                        message.channel.send(preyName + ' lives, for tonight.');
                        prey = null;
                        hunt = false;
                    }
                    else 
                    {
                        message.reply('There is no one currently being hunted.');
                    }
                }
                else
                {
                    message.reply('Whom shall I hunt? \n (Syntax: ' + PREFIX + 'hunt @person' + ')');
                }
            }
            break;

        case 'rad':
            message.delete();
            let radMan = message.mentions.users.first();

            let radEmbed = new Discord.MessageEmbed()
                                       .setTitle("THIS BUGGER IS RAD YO.")
                                       .setImage(radMan.avatarURL())
                                       .setDescription("Please give them lots of love and affection.");
            message.channel.send(radEmbed);
            break;
        case 'test':
            message.delete();
            let testMan = message.mentions.users.first();
    
            let testEmbed = new Discord.MessageEmbed()
                                       .setTitle(testMan.guild.member.displayName)
                                       .setImage(testMan.avatarURL())
                                       .setDescription("This is a test.");
            message.channel.send(testEmbed);
            break;
    }

    if(hunt === true)
    {
        if(message.author === prey)
        {
            let bounty = (100 + (kills * 37 / 5)) + 22;

        message.delete();
            let ava =  message.author.avatarURL();
            let name = message.member.displayName;

            let image = new Discord.MessageEmbed()
                                .setTitle("-=A L E R T=-")
                                .setDescription('This man has no rights!')
                                .setImage(ava)                                        
                                .addFields({name: '\u200B', value: name},
                                           {name: '\u200B', value: 'BOUNTY: ' + bounty},
                                          );
    
            message.channel.send(image);
            kills++;
            message.channel.send(prey);
        }        
    }
})



bot.login(token);