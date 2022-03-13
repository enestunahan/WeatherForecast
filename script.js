const openweatherUrl  =  'https://api.openweathermap.org/data/2.5/weather';
const openweatherKey  = "";

const unsplashUrl     =  'https://api.unsplash.com/search/photos?';
const unsplashKey     = "";

const searchBar  = document.querySelector("#search");


searchBar.addEventListener('keypress', async (e)=>{
   
    if(e.key == "Enter"){
        
        var result  =  await getResult(searchBar.value);
        if(result.status == 404){
            
        }
        if(result.status == 200){
            displayResult(result.openweatherData , result.unsplashData);
            searchBar.value="";
        }
    }
})


const getResult = async (cityName)=>{
    
    let openweatherQuery = `${openweatherUrl}?q=${cityName}&appid=${openweatherKey}&units=metric&lang=tr`;
    let unsplashQuery = `${unsplashUrl}query=${cityName}&per_page=4&client_id=${unsplashKey}`;

    let openweatherResult  = await fetch(openweatherQuery);
    let unsplashResult  = await fetch(unsplashQuery);

    return {openweatherData : await openweatherResult.json() , status :openweatherResult.status , unsplashData : await unsplashResult.json() }
}

 
function displayResult(weatherForecastData , backgroundData ){
    let walpaperClassName = [".walpaper1",".walpaper2",".walpaper3",".walpaper4"];

    backgroundData.results.forEach((data,i)=>{
        let walpaperDiv  = document.querySelector(`${walpaperClassName[i]}`);
        walpaperDiv.style.backgroundImage = `url('${data.urls.regular}')`;
        walpaperDiv.style.backgroundPosition = "center";
        walpaperDiv.style.backgroundRepeat = "no-repeat";
        walpaperDiv.style.backgroundSize = "cover";       
    })

    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let desc = document.querySelector(".desc");

    city.innerText  = `${weatherForecastData.name} |` ;
    temp.innerHTML = `${Math.round(weatherForecastData.main.temp)} °C |`;
    desc.innerText = weatherForecastData.weather[0].description;
}