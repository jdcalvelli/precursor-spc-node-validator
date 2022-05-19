import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import axios from 'axios';

//main execution
async function main() {
    // get the data asynchronously
    const data = await getData();

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

//helper functions

async function getData() {
    let urlEndpoint = 'https://hsatcher.github.io/staticjson/';
    try {
        const response = await axios.get(urlEndpoint);
        return response.data;
    } catch (error) {
        console.log('ERROR: Unable to Fetch data from API Endpoint');
        console.log(error);
    }

}

async function compareNewForecastToDB(newForecast) {
    try {
        //query the db to see if the row is in the database already
        const existingForecasts = await prisma.structured_test.findMany({
            where: newForecast
        })
        return existingForecasts
    } catch (error) {
        console.log('ERROR: Unable to query structured_test');
        console.log(error)
    }
}

async function addRawDataToDB(newForecast) {
    try {
        await prisma.raw_test.create({
            data: {
                raw_json: JSON.stringify(newForecast),
                received_at: new Date(),
            }
        })
    } catch (error) {
        console.log('ERROR: Unable to post raw data to raw_test');
        console.log(error);
    }
}

async function addStructuredDataToDB(newForecast) {
    try {
        await prisma.structured_test.create({
            data: newForecast
        })
    } catch (error) {
        console.log('ERROR: Unable to post structured data to structured_test');
    }
}