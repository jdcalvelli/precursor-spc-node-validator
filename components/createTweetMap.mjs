import puppeteer from 'puppeteer'

function createTweetMap(lat, lng, joinedID) {
    //create the javascript string that will be injected to puppeteer

    // going back to injecting scripts with puppeteer and taking screenshots
    // bc we can inject the cdn version of leaflet!

    //execution of puppeteer
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // await page.goto('https://www.google.com')
        //injecting leaflet
        await page.addStyleTag({ url: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" })
        await page.addScriptTag({ url: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" })
        //injecting our map code
        await page.evaluate(() => {
            //adding the div element we will need for leaflet
            let mapDiv = document.createElement('div')
            mapDiv.id = 'map'
            mapDiv.style.height = 582
            mapDiv.style.width = 782
            mapDiv.style.margin = 0
            mapDiv.style.padding = 0
            document.querySelector('body').appendChild(mapDiv)

            //actually utilizing leaflet
            let map = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([51.5, -0.09]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
        })
        
        //have to wait to let the tiles load
        await page.waitForTimeout(1500)
        
        await page.screenshot({ path: '../mapImages/example.png' });

        await browser.close();
    })();
}

createTweetMap()