const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bot = new Discord.Client();



async function SheetAccess()
{
    const creds = require('./client_secret.json');
    const doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();


    const messagesSheet = doc.sheetsByIndex[0];
    const artPromptSheet = doc.sheetsByIndex[1];
    const dataSheet = doc.sheetsByIndex[2];

    await messagesSheet.loadInfo();
    await artPromptSheet.loadInfo();
    await dataSheet.loadInfo();

    await messagesSheet.loadCells();
    await artPromptSheet.loadCells();
    await dataSheet.loadCells();
}
SheetAccess();

const sheetMessages = SheetAccess().messagesSheet;
const sheetArtPrompt = SheetAccess().artPromptSheet;
const sheetData = SheetAccess().DataSheet;

const token = sheetData.getCell('B2').value;

const PREFIX      = sheetData.getCell('B3').value;
const cryerAvatar = sheetData.getCell('B4').value;
const defaultName = sheetData.getCell('B5').value;
const CryerID     = sheetData.getCell('B6').value;

const onlineMessage    = sheetMessages.getCell('B2').value;
const apologiesMessage = sheetMessages.getCell('B3').value;



bot.on('ready',() =>
{
    console.log(onlineMessage); 
    if (bot.avatarURL != cryerAvatar){bot.user.setAvatar(cryerAvatar);}
    if (bot.username != defaultName) {bot.user.setUsername(defaultName);}
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
    }

})



bot.login(token);