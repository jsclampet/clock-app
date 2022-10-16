appFn();

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

        let city = locationData.data.location.city.name
        let country = locationData.data.location.country.alpha2 
        document.querySelector('#location').textContent = `IN ${locationData.data.timezone.id.split('/')[1].toUpperCase()}, ${locationData.data.location.country.alpha2.toUpperCase()}`
    }
};
locationApi.open("GET", "https://api.ipbase.com/v2/info?format=json");
locationApi.setRequestHeader("apikey", "y9FpuihLeu2pDN80wl9Nfx7vVk8UbfGWklGOMVV5");
locationApi.send();


function appFn(){
    var worldApi = new XMLHttpRequest();
            worldApi.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                let worldApiData = JSON.parse(worldApi.responseText)
                
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

                if(window.innerWidth >= 700){
                    document.querySelector('.greeting p').textContent += ", IT'S CURRENTLY"
                }

                let expandedContainer = document.querySelector('.expanded-container');
                let icon = document.querySelector('.icon');

                if (hourOfDay >= 5 && hourOfDay < 18){
                    icon.src = 'assets/desktop/icon-sun.svg';
                    if(document.body.classList.contains('nighttime-background-image')){
                        document.body.classList.remove('nighttime-background-image')
                    }
                    document.body.classList.add('daytime-background-image')
                    if(expandedContainer.classList.contains('expanded-dark-style')){
                        expandedContainer.classList.remove('expanded-dark-style');
                    }
                    expandedContainer.classList.add('expanded-light-style');
                } else {
                    icon.src = 'assets/desktop/icon-moon.svg';
                    if(document.body.classList.contains('daytime-background-image')){
                        document.body.classList.remove('daytime-background-image')
                    }
                    document.body.classList.add('nighttime-background-image')
                    if(expandedContainer.classList.contains('expanded-light-style')){
                        expandedContainer.classList.remove('expanded-light-style');
                    }
                    expandedContainer.classList.add('expanded-dark-style');
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
};

setInterval(() => {
    appFn();
}, 250);


//EXPAND BUTTON
let overlay = document.getElementById('.overlay')
let isExpanded = false;
let button = document.getElementById('pop-up-btn');
button.addEventListener('click', () => {
    //toggle visibility for expanded and bottom containers
    let topContainer = document.querySelector('.top-container')
    topContainer.classList.toggle('hidden');                                        
    let btnText = document.getElementById('btn-txt');
    let btnArrow = document.getElementById('btn-arrow');
    let bottomContainer = document.querySelector('.bottom-container');
    let overlayDiv = document.getElementById('overlay');
    if (isExpanded) {
        isExpanded = false;
        btnText.textContent = 'MORE';
        btnArrow.style.transform = 'rotate(0deg)';
        if (bottomContainer.classList.contains('bottom-pushed-down')){
            bottomContainer.classList.remove('bottom-pushed-down');
        }
        bottomContainer.classList.add('bottom-pushed-up')
    } else {
        isExpanded = true;
        btnText.textContent = 'LESS';
        btnArrow.style.transform = 'rotate(180deg)';
        bottomContainer.style.top = '99px';
        if (bottomContainer.classList.contains('bottom-pushed-up')){
            bottomContainer.classList.remove('bottom-pushed-up');
        }
        bottomContainer.classList.add('bottom-pushed-down')
    }   

    let expandedContainer = document.querySelector('.expanded-container')
    if (window.innerWidth <= 700) {
        expandedContainer.classList.toggle('hidden');
    } else {
        expandedContainer.classList.remove('hidden');
        //btnText was "LESS", now "MORE" after click, and expanded collapsed
        if (btnText.textContent === "MORE") {
            expandedContainer.style.display = "none"
        } else {expandedContainer.style.display = "flex"}
    }   
})

//TABLET MODE NOTES 

    //Greeting now has ... "GOOD MORNING, IT'S CURRENTLY"
        //maybe use media size in js to textContent += ', IT'S CURRENTLY'
        //if not, can just add hidden text next to it, or in place of

    //Expanded still uses flex, but now spreads out to rows of 2 cols
        //Expanded Div flex-direction: row
        //Expanded info fields are now flex-direction: column

    //CHECK FONT SIZES IN CSS


    