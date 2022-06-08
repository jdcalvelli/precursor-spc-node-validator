import { prisma } from './prismaInit.mjs'

async function addStructuredDataToDB(newForecast) {
    try {
        await prisma.structured_test.create({
            data: newForecast
        })
    } catch (error) {
        console.log('ERROR: Unable to post structured data to structured_test');
    }
}

export { addStructuredDataToDB }