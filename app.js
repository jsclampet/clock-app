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


var locationApi = new XMLHttpRequest();
locationApi.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    let locationData = JSON.parse(locationApi.responseText);
        console.log('geo', locationData)
            
        let city = locationData.data.location.city.name
        let country = locationData.data.location.country.alpha2 
        document.querySelector('#location').textContent = `IN ${locationData.data.timezone.id.split('/')[1].toUpperCase()}, ${locationData.data.location.country.alpha2.toUpperCase()}`
    }
};
locationApi.open("GET", "https://api.ipbase.com/v2/info?format=json");
locationApi.setRequestHeader("apikey", "y9FpuihLeu2pDN80wl9Nfx7vVk8UbfGWklGOMVV5");
locationApi.send();


var worldApi = new XMLHttpRequest();
        worldApi.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

            let worldApiData = JSON.parse(worldApi.responseText)
            console.log('worldApi', worldApiData)
            
            let time = document.getElementById('time');
            time.textContent = worldApiData.datetime.slice(11,16).toString()
            
            let timeZoneAbbreviation = document.querySelector('#time-zone-abbrev');
            timeZoneAbbreviation.textContent = worldApiData.abbreviation;
            
            
            let greeting = document.querySelector('.greeting p');
            let hourOfDay = Number(worldApiData.datetime.slice(11,13))

            if (hourOfDay >= 5 && hourOfDay <= 12){
                greeting.textContent = 'GOOD MORNING'
            } else if (hourOfDay >= 12 && hourOfDay <= 18){
                greeting.textContent = "GOOD AFTERNOON"
            } else {
                greeting.textContent = "GOOD EVENING"
            }

            let expandedContainer = document.querySelector('.expanded-container');
            let icon = document.querySelector('.icon');
            if (hourOfDay >= 5 && hourOfDay <= 18){
                icon.src = 'assets/desktop/icon-moon.svg';
                document.body.style.backgroundImage = 'url(/assets/mobile/bg-image-daytime.jpg)';
                expandedContainer.style.backgroundColor = '#D2D5D8';
                expandedContainer.style.color = '#303030';
            } else {
                icon.src = 'assets/desktop/icon-moon.svg';
                document.body.style.backgroundImage = 'url(/assets/mobile/bg-image-nighttime.jpg)';
                expandedContainer.style.backgroundColor = 'rgba(0, 0, 0)';
                expandedContainer.style.color = 'white';
            }
            

            let timeZone = document.querySelector('.time-zone-full')
            timeZone.textContent = worldApiData.timezone
            let dayOfYear = document.querySelector('.day-of-the-year')
            dayOfYear.textContent = worldApiData.day_of_year
            let dayOfWeek = document.querySelector('.day-of-the-week')
            dayOfWeek.textContent = worldApiData.day_of_week
            let weekNumber = document.querySelector('.week-number')
            weekNumber.textContent = worldApiData.week_number

    }
};
worldApi.open("GET", `https://worldtimeapi.org/api/ip`, true);
worldApi.send();



//EXPAND BUTTON
let isExpanded = false;
let button = document.getElementById('pop-up-btn');
button.addEventListener('click', () => {
    //toggle visibility for expanded and bottom containers
    let topContainer = document.querySelector('.top-container')
    topContainer.classList.toggle('hidden');
    let expandedContainer = document.querySelector('.expanded-container')
    expandedContainer.classList.toggle('hidden');

    let btnText = document.getElementById('btn-txt');
    let btnArrow = document.getElementById('btn-arrow');
    let bottomContainer = document.querySelector('.bottom-container');
    if (isExpanded) {
        isExpanded = false;
        btnText.textContent = 'MORE';
        btnArrow.style.transform = 'rotate(0deg)'
        bottomContainer.style.top = '355px';
    } else {
        isExpanded = true;
        btnText.textContent = 'LESS';
        btnArrow.style.transform = 'rotate(180deg)';
        bottomContainer.style.top = '99px';
        expandedContainer.style.bottom = '0';
    }   

})