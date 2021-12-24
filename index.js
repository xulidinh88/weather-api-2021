const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || "3000";
const url = require("url");
const axios = require('axios');
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
app.use(express.json());
app.use(cors());

const API_KEY = '1ab622d7b5732550a1ba64acf09920cf';
//init Object
const initData = () => {
    const weather = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=20.26&lon=105.98&appid=${API_KEY}`);
    const AQI = axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=20.26&lon=105.98&appid=${API_KEY}`);

    return Promise.all([weather, AQI]);
}
initData()
.then(data => {
    let object = {
        current: {
            weather: data[0].data,
            AQI: data[1].data
        },
        favorite: [
            
        ],
        render: {
            weather: data[0].data,
            AQI: data[1].data
        }
    };

// Get Method
getMethod(object);
postMethod(object);
deleteMethod(object);
putMethod(object);


app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});

})
.catch( err => {
    console.log('Error', err.message)
})

function getMethod(object) {
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
    });
    app.get("/current/weather", (req, res) => {
        res.status(200).send(object.current.weather);
    });
    app.get("/current/AQI", (req, res) => {
        res.status(200).send(object.current.AQI);
    });
    app.get("/render/weather", (req, res) => {
        res.status(200).send(object.render.weather);
    });
    app.get("/render/AQI", (req, res) => {
        res.status(200).send(object.render.AQI);
    });
    app.get("/favorite/:id", (req, res) => {
    const getObject = object.favorite.filter(fav => fav.id === parseInt(req.params.id));
    res.send(getObject);
    });
}

function postMethod(object) {
    app.post("/favorite", (req, res) => {
        getDataFromAPI(req.body.lat, req.body.lon)
        .then(arr => {
            const favoriteObject = {
                id: object.favorite.length + 1,
                weather: arr[0].data,
                AQI: arr[1].data
            }
            object.favorite.push(favoriteObject);
            res.send(object.favorite);
        })
    });
}

function deleteMethod(object) {
    app.delete("/favorite/:id", (req, res) => {
    const del = object.favorite.find(fav => fav.id === parseInt(req.params.id));
    if(!del) res.status(404).send('The favorite withe the given ID was not found');
    const index = object.favorite.indexOf(del);
    object.favorite.splice(index, 1);
    res.send(object.favorite);
    });
}

function putMethod(object) {
    app.put('/favorite/:id', (req, res) => {
        let del = object.favorite.find(fav => fav.id === parseInt(req.params.id));
        if(!del) res.status(404).send('The favorite withe the given ID was not found');

        getDataFromAPI(req.body.lat, req.body.lon)
        .then(arr => {
            let newObject = {
                id: del.id,
                weather: arr[0].data,
                AQI: arr[1].data
            }
            Object.assign(del, newObject);
            res.send(del);
        });
    })

    app.put("/render", (req, res) => {
        getDataFromAPI(req.body.lat, req.body.lon)
	    .then(arr => {
            Object.assign(object.render.weather, arr[0].data);
            Object.assign(object.render.AQI, arr[1].data);
            res.send(object.render);
        })
    });

    app.put("/current", (req, res) => {
        getDataFromAPI(req.body.lat, req.body.lon)
	    .then(arr => {
            Object.assign(object.current.weather, arr[0].data);
            Object.assign(object.current.AQI, arr[1].data);
            res.send(object.render);
        })
    });
}
function getDataFromAPI(lat, lon) {
    const weather = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const AQI = axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return Promise.all([weather, AQI])
}