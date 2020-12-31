const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brian Hillis'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must provide an address'
        })
    }
    geocode (req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send(forecastData);
        })
    })
    // res.send( {
    //     forecast: 'It is snowing',
    //     location: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query);
    res.send({
        products: []
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});