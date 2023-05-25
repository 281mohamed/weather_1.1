const express = require("express")

const app = express()

const port = 3000       //  const port = process.env.PORT || 3000




const path = require("path")
const x = path.join(__dirname, "../public")
app.use(express.static(x))


// app.get('/', ( req, res) => {
//     res.send("Mohamed Ali")
// })


app.get('/about', ( req, res) => {
    res.send("About Page")
})

// app.get('/service', ( req, res) => {
//     res.send("Service Page")
// })

app.get('/teams', ( req, res) => {
    res.send("Teams Page")
})

app.get('/data1', ( req, res) => {
    res.send({
        name: "Mohamed Ali",
        age: 22,
        city: "Beni-Suef"
    })
})

// ////////////////////////////////////////////////////////////////


app.set('view engine', 'hbs')

const viewsDirectory = path.join(__dirname, "../temp/views")
app.set("views", viewsDirectory)

//////////////////////////////////////////////////////////////////////////

const hbs = require("hbs")

const partialsPath = path.join(__dirname, "../temp/partials")
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: "HOME",
        desc: "this is home page from hbs"
    })
})

app.get('/service', (req, res) => {
    res.render('service', {
        title: "SERVICE",
        name: "Mohamed Ali",
        age: 22,
        city: "Beni-Suef",
        img1: "images/936378.jpg"
    })
})


///////////////////////////////////////////////////////////////

app.get('/products', (req, res) => {
    console.log(req.query)

    res.send({
        product: "BMW 520"
    })
})


//              task

// app.get('/weather', (req, res) => {
//     console.log(req.query)

//     if(!req.query.address){
//         return res.send({
//             error: "enter a value"
//         })
//     }
//     res.send({
//         address: req.query.address,
//         status: "cold"
//     })
// })

///////////////////////////////////////////////////////////////

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')
const { error } = require("console")


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }
    
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }

        forecast(data.longtitude, data.latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: req.query.address,
                longtitude: data.longtitude,
                latitude: data.latitude
            })
        })
    })
})



///////////////////////////////////////////////////////////////

app.get('*', (req, res) => {
    res.send('404 page not found')
})


app.listen(port, () => {
    console.log("All is OK")
})