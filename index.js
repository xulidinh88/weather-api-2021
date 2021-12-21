const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || "3000";
const url = require("url");
const axios = require('axios');

axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=20.26&lon=105.98&appid=1ab622d7b5732550a1ba64acf09920cf`)
.then(data => {
    console.log(data.data)
    let object = {
        current: {
            id: data.data.id,
            name: data.data.name,
            lat: 20.26,
            lon: 105.98,
            temp: Math.ceil(data.data.main.temp - 273.15),
            main: data.data.weather.main,
            wind: data.data.wind.speed,
            humidity: data.data.main.humidity,
        },
        favorite: [
            
        ],
        render: {
            id: data.data.id,
            name: data.data.name,
            lat: 20.26,
            lon: 105.98,
            temp: Math.ceil(data.data.main.temp - 273.15),
            main: data.data.weather.main,
            wind: data.data.wind.speed,
            humidity: data.data.main.humidity,
        }
    };
    app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.status(200).send(object);
});
app.get("/current", (req, res) => {
	res.status(200).send(object.current);
});
app.get("/favorite", (req, res) => {
	res.status(200).send(object.favorite);
});
app.get("/render", (req, res) => {
    res.status(200).send(object.render);
})
app.get("/favorite/:id", (req, res) => {
    const getObject = object.favorite.filter(fav => fav.id === parseInt(req.params.id));
    res.send(getObject);
})

app.post("/favorite", (req, res) => {
	const newLocation = {
		id: object.favorite.length + 1,
		name: req.body.name,
        lat: req.body.lat,
        lon: req.body.lon,
        temp: req.body.temp,
        main: req.body.main,
        wind: req.body.wind,
        humidity: req.body.humidity
	};
    if (newLocation.name !== undefined) {
        object.favorite.push(newLocation);
    }
	res.send(object.favorite);
});

app.delete("/favorite/:id", (req, res) => {
    const del = object.favorite.find(fav => fav.id === parseInt(req.params.id));
    if(!del) res.status(404).send('The favorite withe the given ID was not found');
    const index = object.favorite.indexOf(del);
    object.favorite.splice(index, 1);
    res.send(object.favorite);
})

app.put('/favorite/:id', (req, res) => {
    let del = object.favorite.find(fav => fav.id === parseInt(req.params.id));
    if(!del) res.status(404).send('The favorite withe the given ID was not found');
    del.name = req.body.name;
    del.lat = req.body.lat;
    del.lon = req.body.lon;
    del.temp = req.body.temp;
    del.main = req.body.main;
    del.wind = req.body.wind;
    del.humidity = req.body.humidity;
    res.send(del);
})

app.put("/render", (req, res) => {
    object.render.id = req.body.id;
	object.render.name = req.body.name;
    object.render.lat = req.body.lat;
    object.render.lon = req.body.lon;
    object.render.temp = req.body.temp;
    object.render.main = req.body.main;
    object.render.wind = req.body.wind;
    object.render.humidity = req.body.humidity;
	res.send(object.render);
})
app.put("/current", (req, res) => {
    object.current.id = req.body.id;
	object.current.name = req.body.name;
    object.current.lat = req.body.lat;
    object.current.lon = req.body.lon;
    object.current.temp = req.body.temp;
    object.current.main = req.body.main;
    object.current.wind = req.body.wind;
    object.current.humidity = req.body.humidity;
	res.send(object.current);
});

app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});

})
.catch( err => {
    console.log('Error', err.message)
})