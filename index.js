//APIs
const fs = require('fs');
const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');

//Files
const { token } = require('./config.json');

//Initialization of Discord stuff
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

//Dynamic command loading
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

var creds;
var doc;

var messagesSheet;
var artPromptsSheet;
var dataSheet;
var commandSheet;
var members;

var PREFIX = '?';
var cryerAvatar;
var defaultName;


var onlineMessage = 'OnlineMessage';
var apologiesMessage = 'ApologiesMessage';
var summoning;



//It would probably be easier to unload this into another file, and just get all the information from that file like what i did with config.json
async function SheetAccess()
{
    creds = require('./client_secret.json');
    doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk'); 

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    for (let i = 0; i < doc.sheetCount; i++)
    {
        //Get each sheet from the doc
        //load the cells from those sheets
        //load the items from those sheets
    }



/*
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
*/
}
SheetAccess().then(()=>{bot.login(token);})


    
bot.on('ready',() =>
{ 
    if (bot.avatarURL != cryerAvatar){bot.user.setAvatar(cryerAvatar);}
    if (bot.username != defaultName) {bot.user.setUsername(defaultName);}
    console.log(onlineMessage);
})

bot.on('message', message=>
{
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
})
