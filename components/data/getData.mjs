import axios from 'axios';

let urlEndpoint = 'https://hsatcher.github.io/staticjson/';

async function getData() {
    try {
        const response = await axios.get(urlEndpoint);
        return response.data;
    } catch (error) {
        console.log('ERROR: Unable to Fetch data from API Endpoint');
        console.log(error);
    }
}

export { getData }