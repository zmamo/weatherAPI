//--------------------------------------------By @hassan_agueoum | hassanaguezoum@gmail.com-------------------------------------
const iconElement   = document.querySelector(".icon-weather");
const temvalElement = document.querySelector(".temp-value p");
const descElement   = document.querySelector(".description p");
const locaElement   = document.querySelector(".location p");
const notifElement   = document.querySelector(".notif");

const kelvin=273.15;
const key="7279f6795b74d20c2cb4e2be33ad47cd";


if('geolocation' in navigator){
	//in the case the browser  support geoLocation
    navigator.geolocation.getCurrentPosition(position,error);
 }else{
	//in the case the browser not support geoLocation
	notifElement.style.visibility="visible";
	notifElement.innerHTML=`<p>Your divce dosen't suport the geaolocation</p>`
}

function position(position){
	let lat=position.coords.latitude;
	let lon=position.coords.longitude;
	getWeather(lat,lon);  // lat =>latitude | lon=>longitude

}//position()

function error(error){
	 notifElement.style.visibility="visible";
	 notifElement.innerHTML=`<p>${error.message}</p>`
}//error()

function getWeather(lat,lon){
 //api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key} 
 //you replace api by ['myWeather.json']
 let api =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
//  console.log(api);
//  console.log(lat);
//  console.log(lon);
//  console.log(key);
 
 fetch(api).then(res =>{
	 return res.json();	
     }).then(data=>{
			console.log(data);
			iconElement.innerHTML=`<img src="img/${data.weather[0].icon}.png" width="150px">`;
			temvalElement.innerHTML=Math.floor(data.main.temp-kelvin)+"°<span>C</span>"; //0kelvin = -273.15 C° |  (X)k - 273.15 = (Y)C°
			descElement.innerHTML=data.weather[0].description;
			locaElement.innerHTML=data.name+","+data.sys.country;
        }).catch(error=>{
				notifElement.style.visibility="visible";
				notifElement.innerHTML=`<p>${error.message}</p>`
           })

}//getWeather()
