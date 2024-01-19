const btn = document.querySelector('.btn');
const info = document.querySelector('.info');
const formattedInfo = document.querySelector('.formattedInfo');
const fullInfo = document.querySelector('.fullInfo');
const api_key = 'c9058a68e28648509f4b4665632e92b4';
const api_url = 'https://api.opencagedata.com/geocode/v1/json';

async function getFullAddress(latitude, longitude) {
    let query = latitude + ',' + longitude;
    const request_url = `${api_url}?key=${api_key}&q=${query}&pretty=1`;
    try {
        const res = await fetch(request_url);
        const data = await res.json();
        formattedInfo.textContent = `User Formatted Address : ${data.results[0].formatted}`;
        const {road,city,postcode,state_district,state,country,continent} = data.results[0].components;
        fullInfo.textContent = `User Full Address : ${road}, ${city}, ${postcode}, ${state_district}, ${state}, ${country}, ${continent}`;
    } catch (error) {
        console.log(error);
    }
}

btn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
            const { longitude, latitude } = location.coords;
            info.textContent = `The Latitude is ${latitude} & Longitude is ${longitude}.`;
            getFullAddress(latitude, longitude);
        }, (error) => {
            info.textContent = error.message;
        })
    }
})