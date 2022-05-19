import { TwitterApi } from "twitter-api-v2";
import 'dotenv/config';

const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
})

const rwClient = client.readWrite

async function createTweet(newForecast) {
    try {
        await rwClient.v2.tweet(`ID: ${newForecast.forecast_id +'.'+newForecast.update_id}\nLOC: ${newForecast.epicenter_lat}, ${newForecast.epicenter_long} (+/-${newForecast.epicenter_confidence})\nMAG: ${newForecast.magnitude} (+/- ${newForecast.magnitude_confidence})\nWHEN: ${newForecast.event_time} (+/- ${newForecast.time_confidence})`)

        console.log('tweet fired')
    } catch (error) {
        console.log('ERROR: Unable to Tweet')
        console.log(error)
    }
}

export { createTweet }