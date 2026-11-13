
  const $ = (id) => document.getElementById(id);
  const form = $("searchForm"), input = $("cityInput"), button = $("searchBtn"), message = $("message");
  const weatherText = {
    0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",
    45:"Fog",48:"Depositing rime fog",51:"Light drizzle",53:"Drizzle",55:"Dense drizzle",
    56:"Freezing drizzle",57:"Heavy freezing drizzle",61:"Slight rain",63:"Rain",65:"Heavy rain",
    66:"Freezing rain",67:"Heavy freezing rain",71:"Slight snow",73:"Snow",75:"Heavy snow",
    77:"Snow grains",80:"Rain showers",81:"Showers",82:"Heavy showers",85:"Snow showers",
    86:"Heavy snow showers",95:"Thunderstorm",96:"Thunderstorm with hail",99:"Heavy thunderstorm"
  };
  const svg = {
    sun: `<svg viewBox="0 0 160 140"><g class="sun-core" stroke="#FFE9A8" stroke-width="4" stroke-linecap="round"><path d="M80 9v13M80 118v13M20 70h13M127 70h13M37 27l9 9m68 68 9 9m0-86-9 9m-68 68-9 9"/></g><circle cx="80" cy="70" r="30" fill="#FFD36B"/><circle cx="70" cy="60" r="9" fill="#FFF1B9" opacity=".55"/></svg>`,
    cloud: `<svg viewBox="0 0 160 140"><g class="cloud-float"><ellipse cx="80" cy="91" rx="52" ry="25" fill="#E8F2F7"/><circle cx="58" cy="73" r="26" fill="#F5FAFC"/><circle cx="91" cy="62" r="34" fill="#fff"/><circle cx="117" cy="82" r="22" fill="#E8F2F7"/></g></svg>`,
    partly: `<svg viewBox="0 0 160 140"><g class="sun-core"><circle cx="62" cy="55" r="28" fill="#FFD36B"/><g stroke="#FFE9A8" stroke-width="4" stroke-linecap="round"><path d="M62 10v10M62 90v10M17 55h10M97 55h10M30 23l8 8m48 48 8 8m0-64-8 8M30 87l8-8"/></g></g><g class="cloud-float"><ellipse cx="91" cy="98" rx="48" ry="22" fill="#E8F2F7"/><circle cx="71" cy="82" r="23" fill="#F5FAFC"/><circle cx="101" cy="76" r="29" fill="#fff"/></g></svg>`,
    rain: `<svg viewBox="0 0 160 140"><g class="cloud-float"><ellipse cx="80" cy="69" rx="51" ry="25" fill="#DCE8EF"/><circle cx="58" cy="52" r="25" fill="#F0F5F8"/><circle cx="92" cy="44" r="33" fill="#fff"/></g><g stroke="#A9E5F5" stroke-width="5" stroke-linecap="round"><path d="m51 105-7 16m31-16-7 16m31-16-7 16m31-16-7 16"/></g></svg>`,
    snow: `<svg viewBox="0 0 160 140"><g class="cloud-float"><ellipse cx="80" cy="68" rx="51" ry="25" fill="#DCE8EF"/><circle cx="58" cy="51" r="25" fill="#F0F5F8"/><circle cx="92" cy="43" r="33" fill="#fff"/></g><g fill="#fff"><circle cx="50" cy="111" r="5"/><circle cx="82" cy="119" r="5"/><circle cx="113" cy="108" r="5"/></g></svg>`,
    storm: `<svg viewBox="0 0 160 140"><g class="cloud-float"><ellipse cx="80" cy="62" rx="51" ry="25" fill="#C6D4E0"/><circle cx="58" cy="45" r="25" fill="#E4EDF2"/><circle cx="92" cy="37" r="33" fill="#F5F8FA"/></g><path d="m86 79-20 32h17l-8 25 29-38H86l9-19Z" fill="#FFE18A"/><path d="m48 104-5 12m75-12-5 12" stroke="#9FE0F1" stroke-width="4" stroke-linecap="round"/></svg>`,
    moon: `<svg viewBox="0 0 160 140"><path d="M104 22a52 52 0 1 0 34 88A55 55 0 0 1 104 22Z" fill="#F4E9C8"/><g fill="#fff"><circle cx="45" cy="37" r="2.5"/><circle cx="124" cy="44" r="2"/><circle cx="39" cy="91" r="2"/></g></svg>`
  };
  function makeParticles() {
    for(let i=0;i<45;i++){const s=document.createElement("i");s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";s.style.animationDelay=Math.random()*3+"s";$("stars").appendChild(s);}
    for(let i=0;i<34;i++){const d=document.createElement("span");d.style.left=Math.random()*100+"%";d.style.animationDelay=(Math.random()*1.5)+"s";d.style.animationDuration=(.7+Math.random()*.7)+"s";$("rain").appendChild(d);}
    for(let i=0;i<30;i++){const d=document.createElement("span");d.style.left=Math.random()*100+"%";d.style.animationDelay=(Math.random()*8)+"s";d.style.animationDuration=(6+Math.random()*7)+"s";$("snow").appendChild(d);}
  }
  makeParticles();
  function setTheme(code, isDay, hour) {
    document.body.classList.remove("day","sunset","night","cloudy","rainy","snowy");
    const rainy=[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99];
    const snowy=[71,73,75,77,85,86];
    if(snowy.includes(code)) document.body.classList.add("snowy");
    else if(rainy.includes(code)) document.body.classList.add("rainy");
    else if([2,3,45,48].includes(code)) document.body.classList.add("cloudy");
    else if(!isDay || hour<5 || hour>=20) document.body.classList.add("night");
    else if(hour>=17) document.body.classList.add("sunset");
    else document.body.classList.add("day");
    $("dayLabel").textContent = !isDay ? "☾ Nighttime" : (hour>=17 ? "🌇 Evening" : "☀ Daytime");
  }
  function iconFor(code,isDay) {
    if([95,96,99].includes(code)) return svg.storm;
    if([71,73,75,77,85,86].includes(code)) return svg.snow;
    if([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return svg.rain;
    if([2,3,45,48].includes(code)) return svg.cloud;
    if(!isDay) return svg.moon;
    if(code===1 || code===2) return svg.partly;
    return svg.sun;
  }
  function formatLocalDate(iso, timezone) {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-US",{weekday:"long",month:"long",day:"numeric",hour:"numeric",minute:"2-digit",timeZone:timezone}).format(d);
  }
  async function loadCity(city) {
    button.disabled=true;button.textContent="Loading…";message.textContent="Finding "+city+"…";
    try {
      const geoRes=await fetch("https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(city)+"&count=1&language=en&format=json");
      if(!geoRes.ok) throw new Error("Could not reach the city search service.");
      const geo=await geoRes.json();
      if(!geo.results?.length) throw new Error("City not found. Check the spelling and try again.");
      const p=geo.results[0];
      const params=new URLSearchParams({latitude:p.latitude,longitude:p.longitude,current:"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m",timezone:"auto"});
      const wxRes=await fetch("https://api.open-meteo.com/v1/forecast?"+params);
      if(!wxRes.ok) throw new Error("Weather data is temporarily unavailable.");
      const data=await wxRes.json(), c=data.current, code=c.weather_code;
      const place=[p.name,p.admin1,p.country].filter((v,i,a)=>v && a.indexOf(v)===i).join(", ");
      $("cityName").textContent=place;
      $("temperature").textContent=Math.round(c.temperature_2m);
      $("description").textContent=weatherText[code]||"Current conditions";
      $("feels").textContent=Math.round(c.apparent_temperature)+"°C";
      $("humidity").textContent=c.relative_humidity_2m+"%";
      $("wind").textContent=Math.round(c.wind_speed_10m)+" km/h";
      $("cloud").textContent=c.cloud_cover+"%";
      const hour=Number(c.time.slice(11,13));
      setTheme(code,!!c.is_day,hour);
      $("weatherArt").innerHTML=iconFor(code,!!c.is_day);
      $("localDate").textContent=formatLocalDate(c.time,data.timezone);
      message.textContent="Weather updated · Live conditions for "+p.name;
    } catch(err) { message.textContent=err.message||"Something went wrong. Please try again."; }
    finally {button.disabled=false;button.textContent="Explore weather";}
  }
  form.addEventListener("submit",e=>{e.preventDefault();const city=input.value.trim();if(city)loadCity(city);});
  loadCity("Faisalabad");
