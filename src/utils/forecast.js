const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=6c42e93165d7233f6a885e1bf7b37b08&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + '. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast