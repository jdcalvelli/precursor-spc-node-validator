import { prisma } from './components/db/prismaInit.mjs';
import { getData } from './components/data/getData.mjs';
import { compareNewForecastToDB } from './components/db/compareNewForecastToDB.mjs';
import { addRawDataToDB } from './components/db/addRawDataToDB.mjs';
import { addStructuredDataToDB } from './components/db/addStructuredDataToDB.mjs'

import { createTweet } from './components/tweeting/twitterClient.mjs'
import { createTweetMap } from './components/tweeting/createTweetMap.mjs'


//main execution
async function main() {
    // get the data asynchronously
    const data = await getData();

    data['forecasts'].forEach(async forecast => {

        const comparisonResult = await compareNewForecastToDB(forecast);

        if (comparisonResult.length == 0) {
            //add the data
            await addRawDataToDB(forecast);
            console.log('forecast added to raw db')
            await addStructuredDataToDB(forecast);
            console.log('forecast added to structured db')

            //create the map
            await createTweetMap(forecast.epicenter_lat, forecast.epicenter_long, forecast.forecast_id, forecast.update_id)
            console.log('forecast map tweet created')

            //do the tweeting
            await createTweet(forecast)


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