getNewContent("http://study.163.com/webDev/hotcouresByCategory.htm", success, Faild);

function success(str) {

    var name = document.getElementsByClassName("name");
    var id = document.getElementsByClassName("id");
    var provider = document.getElementsByClassName("provider");
    var learnerCount = document.getElementsByClassName("learnerCount");
    var price = document.getElementsByClassName("price");
    var description = document.getElementsByClassName("description");
    var smallPhotoUrl = document.getElementsByClassName("smallPhotoUrl");
    var middlePhotoUrl = document.getElementsByClassName("middlePhotoUrl");
    var bigPhotoUrl = document.getElementsByClassName("bigPhotoUrl");




    var Class = JSON.parse(str);
    for (var i = 0; i < Class.length ; i++) {

        name[i+2].innerHTML = Class[i].name;
        id[i+2].innerHTML = Class[i].id;
        provider[i+2].innerHTML = Class[i].provider;
        learnerCount[i+2].innerHTML = Class[i].learnerCount;
        price[i+2].innerHTML = Class[i].price;
        description[i+2].innerHTML = Class[i].description;

        smallPhotoUrl[i+2].href = Class[i].smallPhotoUrl;
        middlePhotoUrl[i+2].href = Class[i].middlePhotoUrl;
        bigPhotoUrl[i+2].href = Class[i].bigPhotoUrl; 

        smallPhotoUrl[i].onmouseover = function() {
            smallPhotoUrl[i].style.background = url + Class[i].smallPhotoUrl;
    }

    }
    //备用19
    name[0].innerHTML = Class[18].name;
    id[0].innerHTML = Class[18].id;
    provider[0].innerHTML = Class[18].provider;
    learnerCount[0].innerHTML = Class[18].learnerCount;
    price[0].innerHTML = Class[18].price;
    description[0].innerHTML = Class[18].description;
    //备用20
    name[1].innerHTML = Class[19].name;
    id[1].innerHTML = Class[19].id;
    provider[1].innerHTML = Class[19].provider;
    learnerCount[1].innerHTML = Class[19].learnerCount;
    price[1].innerHTML = Class[19].price;
    description[1].innerHTML = Class[19].description;
    //备用一
    name[22].innerHTML = Class[0].name;
    id[22].innerHTML = Class[0].id;
    provider[22].innerHTML = Class[0].provider;
    learnerCount[22].innerHTML = Class[0].learnerCount;
    price[22].innerHTML = Class[0].price;
    description[22].innerHTML = Class[0].description;
    //备用二
    name[23].innerHTML = Class[1].name;
    id[23].innerHTML = Class[1].id;
    provider[23].innerHTML = Class[1].provider;
    learnerCount[23].innerHTML = Class[1].learnerCount;
    price[23].innerHTML = Class[1].price;
    description[23].innerHTML = Class[1].description;
}









function Faild() {
    alert('Sorry,you browser does\'t support XMLHttpRquest');
}
