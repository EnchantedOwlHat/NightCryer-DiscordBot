const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bot = new Discord.Client();

var creds;
var doc;



var messagesSheet;
var artPromptsSheet;
var dataSheet;

var PREFIX;
var cryerAvatar;
var defaultName;

var onlineMessage;
var apologiesMessage;



async function SheetAccess()
{
    creds = require('./client_secret.json');
    doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk'); 

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    messagesSheet = doc.sheetsByIndex[0];
    await messagesSheet.loadCells();
    artPromptsSheet = doc.sheetsByIndex[1];
    await artPromptsSheet.loadCells();
    dataSheet = doc.sheetsByIndex[2];
    await dataSheet.loadCells();
    


    PREFIX           = dataSheet.getCellByA1('B2').value;
    cryerAvatar      = dataSheet.getCellByA1('B3').value;
    defaultName      = dataSheet.getCellByA1('B4').value;

    onlineMessage    = messagesSheet.getCellByA1('B2').value;
    apologiesMessage = messagesSheet.getCellByA1('B3').value;

}

SheetAccess().then(()=> 
{  
    bot.login('NzE0OTIzMTg5NjM3MjE4NDY1.XxJqiQ.heClW2eNENNiBg5PSR6L3UPcRrQ'); //don't forget token before running, delete before uploading!!!
})


    
bot.on('ready',() =>
{
    console.log(onlineMessage);
})

bot.on('message', message=>
{
    let args = message.content.slice(PREFIX.length).split(" ");

    switch(args[0])
    {
        case 'servant':
            message.reply('kindly screw off');
            break;
    }
})