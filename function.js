const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".citysearch");
const box=document.querySelector(".box");
const api="cf3b0e9cdcca40da312e412ceb2c241d";

weatherform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityinput.value;
    if(city){
      try{
        const weatherdata=await getweatherdata(city);
        displayweatherinfo(weatherdata);  
      }
      catch(error){
        displayerrormsg("COULD NOT FETCH WEATHER DATA");
      }   
    }
    else{
        displayerrormsg("PLEASE ENTER CITY");
    }
});

async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const responce=await fetch(apiurl);
    console.log(responce);
    if(!responce.ok){
        displayerrormsg("COULD NOT FETCH WEATHER DATA");
    }
    else{
        return await responce.json();
    }
}

function displayweatherinfo(data){
    const{name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;
    box.textContent="";
    box.style.display="flex";

    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const emojidisplay=document.createElement("p");

    citydisplay.textContent=city;
    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humiditydisplay.textContent=`Humidity:${humidity}`;
    descdisplay.textContent= description;
    emojidisplay.textContent=getweatheremoji(id);


    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");
    emojidisplay.classList.add("emojidisplay");


    box.appendChild(citydisplay);
    box.appendChild(tempdisplay);
    box.appendChild(humiditydisplay);
    box.appendChild(descdisplay); 
    box.appendChild(emojidisplay);

}

function getweatheremoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800) :
            return "☀️";
        case (weatherId >= 801 && weatherId < 800):
            return "☀️";
        default:
            return "❓";
    }    
}

function displayerrormsg(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");

    box.textContent="";
    box.style.display="flex";
    box.appendChild(errordisplay);



}