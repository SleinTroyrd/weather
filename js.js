const sity = document.querySelector('.sity');
const date = document.querySelector('.date');
const weather = document.querySelector('.weather');
const weatherWraper = document.querySelector('.weather__wraper');
const info = document.querySelector('.info');
const error = document.querySelector('.error');
const weatherforecast = document.querySelector('.weather__forecast');
const timeAfterThreeOclock = document.querySelector('.timeAfterThreeOclock');
const timeAfterSixOclock = document.querySelector('.timeAfterSixOclock');
const timeAfterNineOclock = document.querySelector('.timeAfterNineOclock');
const timeAfterTwelveOclock = document.querySelector('.timeAfterTwelveOclock');
const imgAfterThreeOclock = document.querySelector('.imgAfterThreeOclock');
const imgAfterSixOclock = document.querySelector('.imgAfterSixOclock');
const imgAfterNineOclock = document.querySelector('.imgAfterNineOclock');
const imgAfterTwelveOclock = document.querySelector('.imgAfterTwelveOclock');
const tempAfterThreeOclock = document.querySelector('.tempAfterThreeOclock');
const tempAfterSixOclock = document.querySelector('.tempAfterSixOclock');
const tempAfterNineOclock = document.querySelector('.tempAfterNineOclock');
const tempAfterTwelveOclock = document.querySelector('.tempAfterTwelveOclock');
const buttonSearch = document.querySelector('.button__search');
const buttonUnits = document.querySelector('.button__units');
const Humidity = document.querySelector('.Humidity');
const description = document.querySelector('.description');
const visibility = document.querySelector('.visibility');
const pressure = document.querySelector('.pressure');
const temperatureFeelsLike = document.querySelector('.temperatureFeelsLike');
const nowDay = new Date();
let nowTime;
let unit;
var searchSity = 'minsk';
var day;
var units = "metric";
const UnitsOfMeasurement = {
    c : true,
    f : false
}

if (nowDay.getDay() == 1){
    day = 'Monday';
} else if (nowDay.getDay() == 2) {
    day = 'Tuesday';
}else if (nowDay.getDay() == 3) {
    day = 'Wednesday';
}else if (nowDay.getDay() == 4) {
    day = 'Thursday';
}else if (nowDay.getDay() == 5) {
    day = 'Friday';
}else if (nowDay.getDay() == 6) {
    day = 'Saturday';
}else if (nowDay.getDay() == 0) {
    day = 'Sunday';
}

tempNow(searchSity);
tempFuture(searchSity);

buttonSearch.addEventListener('click', function() {  
    searchSity = document.querySelector('.search__sity').value;
    searchSity ? 0 : searchSity = 'minsk';
    return tempNow(searchSity,units), tempFuture (searchSity);
});

buttonUnits.addEventListener('click', function() {
    console.log(unit);
    units = "metric";
    units = "imperial";
    if (UnitsOfMeasurement.c ==  true){
        buttonUnits.innerHTML = '°F';      
        UnitsOfMeasurement.c = false;
        UnitsOfMeasurement.f = true;
        units = "imperial";
    } else if (UnitsOfMeasurement.f == true){
        buttonUnits.innerHTML = '°C';
        UnitsOfMeasurement.f = false;
        UnitsOfMeasurement.c = true;
        units = "metric";
    }
    return tempNow(searchSity,units),tempFuture(searchSity,units);
});


function tempNow (searchSity) {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchSity}&units=${units}&appid=6ab28fd1b2cf7e3c374d1c2c869e67af`)
.then(function(resp) { return resp.json() })
.then(function(data) {
    if (data.name == undefined){
        weatherWraper.style.display = "none";
        info.style.display = "none";
        error.style.display = "flex";
    } else {
        error.style.display = "none";
        weatherWraper.style.display = "flex";
        info.style.display = "block";

        if (units == "metric"){
            unit= "°C";
        } else {
            unit= "°F";
        }

        nowTime = new Date();
        sity.innerHTML = `${data.name}`;
        date.innerHTML = ` ${day} ${nowTime.getHours()}:${nowTime.getUTCMinutes()}`;
        weather.innerHTML = `${Math.round(data.main.temp)} ${unit}`;
        Humidity.innerHTML = `${data.main.humidity} %`;
        description.innerHTML = `${data.weather[0].description}`;
        visibility.innerHTML = `${Math.round(data.visibility/1000)} km`;
        pressure.innerHTML = `${data.main.pressure} hPa`;
        temperatureFeelsLike.innerHTML = `${Math.round(data.main.feels_like)} ${unit}`;   
    }
})
}

function tempFuture (searchSity) {
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchSity}&units=${units}&appid=6ab28fd1b2cf7e3c374d1c2c869e67af&lang=ru`)
.then(function(resp) { return resp.json() })
.then(function(data) {
    if (units == "metric"){
        unit= "°C";
    } else {
        unit= "°F";
    }

    timeAfterThreeOclock.innerHTML = `${data.list[1].dt_txt.slice(10,16)}`;
    timeAfterSixOclock.innerHTML = `${data.list[2].dt_txt.slice(10,16)}`;
    timeAfterNineOclock.innerHTML = `${data.list[3].dt_txt.slice(10,16)}`;
    timeAfterTwelveOclock.innerHTML = `${data.list[4].dt_txt.slice(10,16)}`;
    imgAfterThreeOclock.innerHTML = `<img src="//openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png">`;
    imgAfterSixOclock.innerHTML = `<img src="//openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`;
    imgAfterNineOclock.innerHTML = `<img src="//openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png">`;
    imgAfterTwelveOclock.innerHTML = `<img src="//openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png">`;
    tempAfterThreeOclock.innerHTML = `${Math.round(data.list[1].main.temp)} ${unit}`;
    tempAfterSixOclock.innerHTML = `${Math.round(data.list[2].main.temp)} ${unit}`;
    tempAfterNineOclock.innerHTML = `${Math.round(data.list[3].main.temp)} ${unit}`;
    tempAfterTwelveOclock.innerHTML = `${Math.round(data.list[4].main.temp)} ${unit}`;
})
.catch (function(data) {
})
}
