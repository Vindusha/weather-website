const path = require('path')
const express = require('express')
const hbs = require('hbs')
const location = require('./utils/location')
const weather = require('./utils/weather')
const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath) //by default expressjs looks for views directory. 
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather App",
        name: "Vindusha"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Weather",
        name: "Vindusha"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help Page!",
        name: "Vindusha"
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "Provide an address"
        })
    }
        
    location(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        weather(latitude, longitude, (error, weatherData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: location,
                forecast: weatherData
            })
        })
    }) 
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Vindusha',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Vindusha',
        errorMessage: 'Page not found!'
    })
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server is up and running in port 3000!")
})

// app.listen(3000, ()=>{
//     console.log("Server is up and running in port 3000!")
// })

// app.get('', (req,res) => {
//     res.send("Hello express!")
// })

// app.get('/about', (req,res) => {
//     res.send("<h1>Express page</h1>")
// })

// app.get('/help', (req,res) => {
//     res.send({
//         name: "Vindusha",
//         age: 23
//     })
// })

// app.get('/products', (req,res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: "Provide a search term"
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })