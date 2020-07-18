const Discord = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const bot = new Discord.Client();



async function SheetAccess()
{

    const creds = require('./client_secret.json');
    const doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();


    const testSheet = doc.sheetsByIndex[3];
    await testSheet.loadCells();

    const sheetTest        = SheetAccess().messagesSheet;

    const PREFIX           = sheetTest.getCell('B3').value;
    const onlineMessage    = sheetTest.getCell('B2').value;

    
}
SheetAccess();

bot.on('ready',() =>
    {
        console.log(onlineMessage);
    })

    bot.on('message', async message=>
    {
        let args = message.content.slice(PREFIX.length).split(" ");

        switch(args[0])
        {
            case 'servant':
                message.reply(onlineMessage);
                break;
        }
    })

bot.login('NzE0OTIzMTg5NjM3MjE4NDY1.XxH_Og.ILp993myV9C5LwZnHUhYrIyaVYs');