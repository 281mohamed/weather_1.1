const request = require("request")


const geocode = (address, callback) => {

const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibW9oYW1lZC1hbGktMTI4IiwiYSI6ImNsaGppbjZoODBpOWEzY254dGkwdzVqZmUifQ.4aQGuoD8vpAm1xMhh90Abg"

request ({url : geocodeUrl, json : true}, (error, response) => {

    if(error) {
        callback("Unable to connect geocode service", undefined)
    } else if(response.body.error){
        callback(response.body.message, undefined)
    }
    else if(response.body.features.length == 0){
        callback("Unable to find location", undefined)
    }
    else {
        callback(undefined, {
            longtitude : response.body.features[0].center[0],
            latitude : response.body.features[0].center[1]
        })
    }

})
}

module.exports = geocode;