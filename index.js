const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bot = new Discord.Client();

var creds;
var doc;
var testSheet;
var PREFIX;
var onlineMessage;


async function SheetAccess()
{
    creds = require('./client_secret.json');
    doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk'); 

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    testSheet = doc.sheetsByIndex[3];
    await testSheet.loadCells();
    
    PREFIX           = testSheet.getCellByA1('B3').value;
    onlineMessage    = testSheet.getCellByA1('B2').value;

    console.log(PREFIX);
    console.log(onlineMessage);
}

SheetAccess().then(()=> 
{  
    bot.login(''); //don't forget token before running, delete before uploading!!!
})


    
bot.on('ready',() =>
{
    console.log('guess im online lmao');
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

    
