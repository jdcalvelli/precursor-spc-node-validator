import { prisma } from './components/prismaInit.mjs';
import { getData } from './components/getData.mjs';
import { compareNewForecastToDB } from './components/compareNewForecastToDB.mjs';
import { addRawDataToDB } from './components/addRawDataToDB.mjs';
import { addStructuredDataToDB } from './components/addStructuredDataToDB.mjs'

import { createTweet } from './components/twitterClient.mjs'


//main execution
async function main() {
    // get the data asynchronously
    const data = await getData();

    createTweet()

    data['forecasts'].forEach(async forecast => {

        const comparisonResult = await compareNewForecastToDB(forecast);

        if (comparisonResult.length == 0) {
            //add the data
            addRawDataToDB(forecast);
            console.log('forecast added to raw db')
            addStructuredDataToDB(forecast);
            console.log('forecast added to structured db')
        }
        else {
            //already in the database
            console.log('forecast is already in structured db')
        }
    })

}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

// put this in a cron job to run every so often to collect information from api endpoint
// doesn't have an external log like the python yet