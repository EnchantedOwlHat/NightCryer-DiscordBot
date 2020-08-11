const fs = require('fs');
const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const { token } = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}

var creds;
var doc;

var messagesSheet;
var artPromptsSheet;
var dataSheet;
var commandSheet;
var members;

var PREFIX;
var cryerAvatar;
var defaultName;


var onlineMessage;
var apologiesMessage;
var summoning;




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

}
SheetAccess().then(()=>{bot.login(token);})


    
bot.on('ready',() =>
{
    console.log(onlineMessage); 
    if (bot.avatarURL != cryerAvatar){bot.user.setAvatar(cryerAvatar);}
    if (bot.username != defaultName) {bot.user.setUsername(defaultName);}
})

bot.on('message', message=>
{
    if(message.content === summoning) return message.reply(onlineMessage);

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    let args = message.content.slice(PREFIX.length).trim().split(/ +/);
    let command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

    try 
    {
	    bot.commands.get(command).execute(message, args);
    } 
    catch (error) 
    {
	    console.error(error);
	    message.reply(apologiesMessage);
    }

    switch(command)
    {
        
        case 'face':
            let tag = message.mentions.users.first();
            if (!tag)
            {
                let ava = new Discord.MessageEmbed().setImage(message.author.avatarURL());
                return message.channel.send(ava);
            }

            let ava = new Discord.MessageEmbed().setImage(tag.avatarURL());
            message.channel.send(ava);

            break;
        case 'population':
            message.channel.send(`The Village\'s population is ${message.channel.guild.memberCount} lost souls.`);
            break;
        case 'eat':
            const amount = parseInt(args[0]) + 1;

            if (isNaN(amount))
            {
                return message.reply('This does not appear to be a number.');
            }
            else if (amount <= 2 || amount > 100)
            {
                return message.reply('Input must be between 2 and 99.');
            }
            message.channel.bulkDelete(amount, true)
            .catch(err => 
            {
                console.error(err);
                message.channel.send('I have encountered some difficulty with consuming the messages.');
            });
            break;

       default: return message.reply(apologiesMessage);
    }
    
})
