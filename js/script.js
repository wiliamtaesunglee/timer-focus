
const userOff = document.querySelector('.status');
const userImg = document.querySelector('.userPhoto a img');
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    
    
    
    
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    
    const userImgUrl = profile.getImageUrl();
    const menu = document.querySelector('.menu');
    menu.children[0].innerHTML = profile.getGivenName();
    menu.children[1].innerHTML = '<p>status</p>'
    userOff.innerHTML = 'available';
    userImg.setAttribute('src', userImgUrl);
    
};

//! singOut
const clearUser = document.querySelector('.name');
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    clearUser.innerHTML = 'user';
    userOff.innerHTML = 'off line';
    userImg.setAttribute('src','http://placehold.jp/150x150.png');
}

//! tiemr function
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    // const counter = document.querySelector('.counter');
    
    interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        display.textContent = minutes + ':' + seconds;
        
        if(--timer < 0) {
            timer = duration;
            // counter.innerHTML = i++;
        }

    }, 1000);
    

}

const time = () => {

    const twentyFive = 60 * 25, 
    display = document.querySelector('.timer');
    startTimer(twentyFive, display); 
    
};

//! start function
const iniciar = document.querySelector('.btn-start');
const reset = document.querySelector('.timer');
const status = document.querySelector('.status');
const statusColor = document.querySelector('body section');
const btnStartColor = document.querySelector('.btn-start');
const btnStopColor = document.querySelector('.btn-stop');

function start() {

    time();
    iniciar.setAttribute('disabled', '');
    status.innerHTML = 'bussy';
    statusColor.classList.add('.js-statusColor');
    btnStartColor.classList.add('.js-btnStart');
    btnStopColor.classList.remove('.js-btnStop');
}

iniciar.addEventListener('click', start);

//! stop function
const parar = document.querySelector('.btn-stop');

function stop() {

    clearInterval(interval);
    reset.innerHTML = '25:00';
    iniciar.removeAttribute('disabled', '');
    status.innerHTML = 'available';
    statusColor.classList.remove('.js-statusColor');
    btnStopColor.classList.add('.js-btnStop');
    btnStartColor.classList.remove('.js-btnStart');
}

parar.addEventListener('click', stop);



