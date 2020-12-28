const request = require('postman-request')

const location = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoidmluZHVzaGEiLCJhIjoiY2tmbnEyb255MDA2ZzJxcGZzN2RzY2dtdSJ9.14Ngwytutg0sGSBDoXPq3w&limit=1"
    
    request({url, json:true}, (error, {body}) => {  //shorthand and destrcuturing used here
        if(error) {
            callback("Unable to connect to location service!")
        } 
        else if(body.features.length === 0) {
            callback("Unable to find location. Try another search!")
        } else {
            callback(undefined, {
                location : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]                      
            })
        }
    })
}

module.exports = location