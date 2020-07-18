const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bot = new Discord.Client();
const token = require('./token.txt');


async function SheetAccess()
{

    const creds = require('./client_secret.json');
    const doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();


    const testSheet = doc.sheetsByIndex[3];
    await testSheet.loadCells();

    const PREFIX           = testSheet.getCellByA1('B3').value;
    const onlineMessage    = testSheet.getCellByA1('B2').value;

    console.log(PREFIX);
    console.log(onlineMessage);
}
SheetAccess();

bot.on('ready',() =>
    {
        console.log('guess im online lmao');
    })

    bot.on('message', async message=>
    {
        let args = message.content.slice(PREFIX.length).split(" ");

        switch(args[0])
        {
            case 'servant':
                message.reply('kindly screw off');
                break;
        }
    })

bot.login('NzE0OTIzMTg5NjM3MjE4NDY1.XxJDPQ.T5S-TfpHcst41L1C_DLWUDsC2Qs');