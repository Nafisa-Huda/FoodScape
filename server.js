//Required Dependencies
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

//Declared Variables
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'favorite-restaurants-tracker'

//Connect to Mongo
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
})
    
app.set('view engine', 'ejs')//Using ejs as templating langauge
app.use(express.static('public'))// this line tells Express to use the public folder as our static folder from which we can serve static files//
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 

app.get('/', (request,response)=>{
    response.sendFile('about.html', {root: 'public'})
})

// app.get('/views/index.ejs',(request, response)=>{
//     db.collection('restaurants').find().sort({likes: -1}).toArray()
//     .then(data => {
//         response.render('index.ejs', { info: data })
//     })
//     .catch(error => console.error(error))
// })


app.post('/addRestaurant', (request, response) => {
    db.collection('restaurants').insertOne({
        restaurantName: request.body.restaurantName,
        cuisineName: request.body.cuisineName, 
        priceRange: request.body.priceRange, 
        resVibe: request.body.resVibe, 
        likes: 0
    }) 
    .then(result => {
        console.log('Restaurant Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})


// app.put('/addOneLike', (request, response) => {
//     db.collection('restaurants').updateOne({
//             restaurantName: request.body.restaurantNameS, 
//             cuisineName: request.body.cuisineNameS, 
//             priceRange: request.body.priceRangeS, 
//             resVibe: request.body.resVibeS, 
//             likes: request.body.likesS}, {
//         $set: {
//             likes:request.body.likesS + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         response.json('Like Added')
//     })
//     .catch(error => console.error(error))

// })

app.delete('/deleteRestaurant', (request, response) => {
    db.collection('restaurants').deleteOne({
        restaurantName: request.body.restaurantNameS
    })
    .then(result => {
        console.log('Restaurant Deleted')
        response.json('Restaurant Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
})