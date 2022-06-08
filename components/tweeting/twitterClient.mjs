import { TwitterApi } from "twitter-api-v2";
import 'dotenv/config';

import { prisma } from "../db/prismaInit.mjs";

const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
})

const rwClient = client.readWrite

async function createTweet(newForecast) {
    try {

        const mediaId = await client.v1.uploadMedia(`./mapImages/${newForecast.forecast_id + '-' + newForecast.update_id}.png`);

        //want to check if forecast id is already in the database, in which case it's an update, otherwise it's a new forecast

        await rwClient.v2.tweet({
            text: `${checkIfUpdate(newForecast).length > 1 ? 'Update Forecast' : 'New Forecast'}\nID: ${newForecast.forecast_id + '.' + newForecast.update_id}\nLOC: ${newForecast.epicenter_lat}, ${newForecast.epicenter_long} (+/-${newForecast.epicenter_confidence})\nMAG: ${newForecast.magnitude} (+/- ${newForecast.magnitude_confidence})\nWHEN: ${newForecast.event_time} (+/- ${newForecast.time_confidence})`, 
            media: { media_ids: [mediaId] }
            })

        console.log('tweet with image fired')
    } catch (error) {
        console.log('ERROR: Unable to Tweet')
        console.log(error)
    }
}

export { createTweet }

// helper function strictly for writing correct twitter words

async function checkIfUpdate(newForecast) {
    //query db to find all places where forecast_id is present
    const existingForecasts = prisma.structured_test.findMany({
        where: {
            forecast_id: newForecast.forecast_id
        }
    })
    return existingForecasts;
}