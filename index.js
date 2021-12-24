const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || "3000";
const url = require("url");
const axios = require('axios');
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const API_KEY = '1ab622d7b5732550a1ba64acf09920cf';
//init Object
axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=20.26&lon=105.98&appid=${API_KEY}`)
.then(data => {
    console.log(data.data)
    let object = {
        current: data.data,
        favorite: [
            
        ],
        render: data.data
    };
// CRUD 
console.log(object);
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
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${API_KEY}`)
	.then(data => {
        data.data.id = object.favorite.length + 1;
        object.favorite.push(data.data);
        res.send(object.favorite);
    })
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
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${API_KEY}`)
	.then(data => {
        Object.assign(del, data.data);
        res.send(del);
    })
})

app.put("/render", (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${API_KEY}`)
	.then(data => {
        Object.assign(object.render, data.data);
        res.send(object.render);
    })
})
app.put("/current", (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${API_KEY}`)
	.then(data => {
        Object.assign(object.current, data.data);
        res.send(object.current);
    })
});

app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});

})
.catch( err => {
    console.log('Error', err.message)
})