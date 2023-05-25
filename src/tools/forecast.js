const request = require('request')

const forecast = (longtitude, latitude, callback ) => {

const url = "https://api.weatherapi.com/v1/current.json?key=1cc00dbafcdd4c29b4f210752230905&q=" + longtitude + ", " + latitude

request({url, json : true}, (error, response) => {


    if(error) {
        callback("Unable to connect weather service", undefined)
    } else if(response.body.error){
        callback(response.body.error.message, undefined)
    } else {
        callback(undefined, response.body.location.name + " it is " + response.body.current.condition.text 
        + " and Temp is " + response.body.current.temp_c)
    }
})
}

module.exports = forecast;