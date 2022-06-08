import puppeteer from 'puppeteer'

async function createTweetMap(lat, lng, forecastID, updateID) {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // await page.goto('https://www.google.com')
        //injecting leaflet
        await page.addStyleTag({ url: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" })
        await page.addScriptTag({ url: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" })
        //injecting our map code
        await page.evaluate((lat, lng, forecastID, updateID) => {
            //adding the div element we will need for leaflet
            let mapDiv = document.createElement('div')
            mapDiv.id = 'map'
            mapDiv.style.height = 582
            mapDiv.style.width = 782
            mapDiv.style.margin = 0
            mapDiv.style.padding = 0
            document.querySelector('body').appendChild(mapDiv)

            //actually utilizing leaflet
            let map = L.map('map').setView([lat, lng], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([lat, lng]).addTo(map)

        }, lat, lng)
        
        //have to wait to let the tiles load
        await page.waitForTimeout(1500)
        
        //this has to be ./mapImages bc the path is based on where this gets called evidently, ie in the main
        await page.screenshot({ path: `./mapImages/${forecastID + "-" + updateID}.png` })

        await browser.close()

}

export { createTweetMap }