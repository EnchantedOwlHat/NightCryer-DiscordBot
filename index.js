const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { token } = require('./config.json');
const bot = new Discord.Client();

var creds;
var doc;

var messagesSheet;
var artPromptsSheet;
var dataSheet;
var commandSheet;

var PREFIX;
var cryerAvatar;
var defaultName;


var onlineMessage;
var apologiesMessage;
var summoning;
var noHunt;



async function SheetAccess()
{
    creds = require('./client_secret.json');
    doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk'); 

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    messagesSheet       = doc.sheetsByIndex[0];
    artPromptsSheet     = doc.sheetsByIndex[1];
    dataSheet           = doc.sheetsByIndex[2];
    commandSheet        = doc.sheetsByIndex[4];
    members             = doc.sheetsByIndex[5];

    await messagesSheet.loadCells();
    await artPromptsSheet.loadCells();
    await dataSheet.loadCells();
    await commandSheet.loadCells();
    await members.loadCells();
    


    PREFIX           = dataSheet.getCellByA1('B2').value;
    cryerAvatar      = dataSheet.getCellByA1('B3').value;
    defaultName      = dataSheet.getCellByA1('B4').value;


    onlineMessage    = messagesSheet.getCellByA1('B2').value;
    apologiesMessage = messagesSheet.getCellByA1('B3').value;
    summoning        = messagesSheet.getCellByA1('B4').value;
    noHunt           = messagesSheet.getCellByA1('B5').value;

}

SheetAccess().then(()=> 
{  
    bot.login(token); 
})


    
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

bot.on('message', message=>
{
    let args = message.content.slice(PREFIX.length).split(" ");

    if(message.content === summoning)
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
                message.channel.send(apologiesMessage);
            }
            break;

        case 'clear':
            if(!args[1]) return message.reply('How much do you want to clear? I cannot know. \n (Syntax: ' + PREFIX + 'clear <number of messages you want to clear>)');
            message.channel.bulkDelete(args[1]);
            break;

        case 'hunt':
            if (message.mentions.users.size)
            {
                if (hunt)
                {
                    message.reply(noHunt);
                }
                else
                {
                    prey = message.mentions.users.first();
                    preyName = prey.username;
                    hunt = true;
    
                    message.channel.send('I pray you found a place to hide, ' + preyName + '.');
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
