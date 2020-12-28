const request = require('postman-request')

const weather = (latitude, longitude, callback) => {
    const weatherUrl = "http://api.weatherstack.com/current?access_key=4be0b62243ae48c383fcb51ce7abb4ec&query="+ latitude + "," + longitude + "&units=f"

    request({url:weatherUrl, json:true}, (error,response) => {
        if(error) {
            callback("Unable to connect to weather service!")
        } 
        else if(response.body.error) {
            callback(response.body.error.info)
        }
        else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
        
    })
}

module.exports = weather