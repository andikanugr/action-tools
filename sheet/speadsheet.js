const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');

exports.Sheet = function(keys, spreadsheetId){

    const auth = GoogleAuth.fromJSON(keys);
    
    const service = google.sheets({version: 'v4', auth});

    this.batchGet = function(ranges){
        try {
            const result = await service.spreadsheets.values.batchGet({
                spreadsheetId,
                ranges,
            });
            console.log(`${result.data.valueRanges.length} ranges retrieved.`);
            return result;
        } catch (err) {
            throw err;
        }
    }

    this.append = async function(ranges, values){
        try {
            const response = (await service.spreadsheets.values.append({
                spreadsheetId: spreadsheetId,
                range: ranges,
                valueInputOption: "USER_ENTERED",
                resource: {
                    "values": [values]
                  }
            })).data;
            console.log(JSON.stringify(response, null, 2));
          } catch (err) {
            console.error(err);
          }
    }

    this.updateValue = async function(ranges, values){
        try {
            const response = (await service.spreadsheets.values.batchUpdate({
                spreadsheetId: spreadsheetId,
                range: ranges,
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [values]
                  }

            })).data;
            // TODO: Change code below to process the `response` object:
            console.log(JSON.stringify(response, null, 2));
          } catch (err) {
            console.error(err);
          }
    }
}