import { prisma } from './prismaInit.mjs'

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

export { compareNewForecastToDB }