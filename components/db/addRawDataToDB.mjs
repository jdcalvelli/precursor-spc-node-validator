import { prisma } from './prismaInit.mjs'

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

export { addRawDataToDB }