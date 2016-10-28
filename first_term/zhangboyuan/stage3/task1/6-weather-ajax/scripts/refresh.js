/*
 *     Created by Boyuan on 2016.7.30
 */

function refresh() {

    ajax("http://openweathermap.org/data/2.5/forecast/ daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a", fresh, fnFaild);

    function fresh(responseText) {
        //ajax获取JSON并转换为js对象(odata)
        var odata = null;
        odata = JSON.parse(responseText);

        //获取元素
        var date = document.getElementsByClassName("date");
        var temp_eve = document.getElementsByClassName("temp-eve");
        var temp_max = document.getElementsByClassName("temp-max");
        var temp_min = document.getElementsByClassName("temp-min");
        var temp_morn = document.getElementsByClassName("temp-morn");
        var temp_day = document.getElementsByClassName("temp-day");
        var temp_night = document.getElementsByClassName("temp-night");
        var weather_ico = document.getElementsByClassName("weather-ico");
        var weather = document.getElementsByClassName("weather");
        var wind_speed = document.getElementsByClassName("wind-speed");
        var wind_degs = document.getElementsByClassName("wind-degs");
        var pressure = document.getElementsByClassName("pressure");
        var humidity = document.getElementsByClassName("humidity");

        var j = 0;
        for (var i = 0; i < 5; i++) {
            date[i].innerHTML = odata.list[j].dt_txt.split(" ")[0];
            temp_eve[i].innerHTML = odata.list[j].main.temp;
            temp_max[i].innerHTML = odata.list[j].main.temp_max;
            temp_min[i].innerHTML = odata.list[j].main.temp_min;
            temp_morn[i].innerHTML = odata.list[j].main.temp;
            temp_day[i].innerHTML = odata.list[j].main.temp_max;
            temp_night[i].innerHTML = odata.list[j].main.temp_min;
            if (odata.list[j].weather[0].main == "Clouds") {
                weather[i].innerHTML = "多云";
                weather_ico[i].className = "weather-ico w-clouds";
            }
            else if (odata.list[j].weather[0].main == "Rain") {
                weather[i].innerHTML = "雨";
                weather_ico[i].className = "weather-ico w-rain";
            }
            else if (odata.list[j].weather[0].main == "Clear") {
                weather[i].innerHTML = "晴";
                weather_ico[i].className = "weather-ico w-clear";
            }
            else {
                weather[i].innerHTML = odata.list[j].weather[0].main;
                weather_ico[i].className = "weather-ico clear";
            }
            wind_speed[i].innerHTML = odata.list[j].wind.speed;
            wind_degs[i].innerHTML = odata.list[j].wind.deg;
            pressure[i].innerHTML = odata.list[j].main.pressure;
            humidity[i].innerHTML = odata.list[j].main.humidity;

            j += 8;
        }
    }

    function fnFaild() {
        alert("请求数据失败!");
    }
}

addLoadEvent(refresh);
