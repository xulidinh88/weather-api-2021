# weather-api-2021 deploy heroku
## Using Nodejs, Express, Cors, Axios, Weather API
## Source API: 
- Weather: openweather api (lat, lon), current weather
- AQI: openweather api (lat, lon)
- Forecast: openweather api (lat, lon), 5 day weather forecast
- I used Promise.all(Weather, AQI, Forecast) ==> https://weather-api-2021-100eggs.herokuapp.com/
## This API: 
- "Current": {
    - "Weather" : {},
    - "AQI" : {},
    - "Forecast: {}
}
- "Favorite" : [{
}]
- "Render": {}
## Method
- Get: 
    - In this project, we can get: 
    - "/", "/current", "/favorite", "/render"
    - "/current/weather", "/current/weather", "/current/forecast"
    - "/render/weather", "/render/AQI", "/render/forecast"
    - "/favorite/:id"
- Post:
    - We can update data of "/favorite" by using "req.body.lat", "req.body.lon"
- Put:
    - We can change data of "/favorite:/:id" by using "req.body.lat, "req.body.lon"
    - We can change data of "/render" by using "req.body.lat, "req.body.lon"
    - We can change data of "/current" by using "req.body.lat, "req.body.lon"
- Delete: 
    - We can remove data of "/favorite/:id", if this id doesn't exist, we will receive a message: "The favorite withe the given ID was not found" 
