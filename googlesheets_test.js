const {GoogleSpreadsheet } = require('google-spreadsheet');

async function SheetAccess()
{
    const creds = require('./client_secret.json');
    const doc = new GoogleSpreadsheet('1Th-9SWorFagQQMFzf_CLxv8eRkOFGpXQr_eugv2JWCk');
    await doc.useServiceAccountAuth(creds);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    console.log(sheet.title);
    console.log(sheet.rowCount);

    await sheet.loadCells('A1:E13');

    const onlineMessage = sheet.getCellByA1('B2').value;
    console.log(onlineMessage);
}

SheetAccess();