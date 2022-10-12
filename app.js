function quoteFn(){    
    var quoteApi = new XMLHttpRequest();
    quoteApi.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(quoteApi.responseText)

        let random = Math.floor(Math.random() * 500);

        let quote = document.querySelector('.quote');
        quote.textContent = `"${data[random].en}"`;

        let author = document.querySelector('#author');
        author.textContent = data[random].author;
        }
    };
    quoteApi.open("GET", "https://programming-quotes-api.herokuapp.com/Quotes?count=500", true);
    quoteApi.send();
}
quoteFn();

let refreshBtn = document.querySelector('#refresh-btn')
refreshBtn.addEventListener('click', () => {
    quoteFn();
})


var timeApi = new XMLHttpRequest();
timeApi.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let data = JSON.parse(timeApi.responseText)
       console.log('weekday?', data)

       let time = document.querySelector('#time');
       time.textContent = data.timezone.current_time.slice(0,5)

       let timeZone = document.querySelector('#time-zone-abbrev');
       timeZone.textContent = data.timezone.abbreviation;

       let location = document.querySelector('#location');
       location.textContent = `${data.city}, ${data.country}`;

       let currentTimezone = document.querySelector('.time-zone-full');
        //    currentTimezone.textContent = data.


        //geolocator (IP) || City, Country
        //https://freegeoip.app/
        var locationApi = new XMLHttpRequest();
        locationApi.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            let locationData = JSON.parse(locationApi.responseText);
                console.log('geo', locationData)

            }
        };
        locationApi.open("GET", "https://api.ipbase.com/v2/info?format=json");
        locationApi.setRequestHeader("apikey", "y9FpuihLeu2pDN80wl9Nfx7vVk8UbfGWklGOMVV5");
        locationApi.send();


        //NESTED API
        // http://worldtimeapi.org/
        // URL format ... http://worldtimeapi.org/api/timezone/america/denver  (<<country, city)
        var worldTimeApi = new XMLHttpRequest();
        worldTimeApi.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            let worldTimeApiData = JSON.parse(worldTimeApi.responseText)
            console.log(worldTimeApiData)
            }
        };
        worldTimeApi.open("GET", `http://worldtimeapi.org/api/timezone/${data.country}/${data.city}`, true);
        worldTimeApi.send();
    }
};
timeApi.open("GET", "https://ipgeolocation.abstractapi.com/v1/?api_key=c9e14f3cb3e84944a0c1db81e9cb1f46&ip_address", true);
timeApi.send();