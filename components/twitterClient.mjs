import { TwitterApi } from "twitter-api-v2";
import 'dotenv/config';

const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
})

const rwClient = client.readWrite

async function createTweet() {
    try {
        await rwClient.v2.tweet('disregard this tweet i am trying to learn the twitter api :D')
    } catch (error) {
        console.log('ERROR: Unable to Tweet')
        console.log(error)
    }
}

export { createTweet }