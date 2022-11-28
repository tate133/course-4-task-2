const axios = require('axios');
const nasaConfig = require('config').get('services.nasa');
const NASA_HOST = nasaConfig.hostname;
const API_KEY = nasaConfig.api_key;
const MARS_PATH = nasaConfig.mars_path;

async function getManifest(data){
    const query = new URLSearchParams({
        ...data,
        api_key: API_KEY
    });
    const queryString = query.toString();
    try {
        const response = await axios.get(`${NASA_HOST}${MARS_PATH}?${queryString}`);
        return response.data;
        
    } catch(error){
        if(error.response){
            console.error(error.response.data);
            res.status(error.response.status).json(error.response.data);
        }else {
            console.error(error.message);
            res.status(500).json({
                code: 'internat_server_error',
                message: error.message,
            });
        }
    }
}

module.exports = {getManifest};