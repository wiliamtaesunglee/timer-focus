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


    const menu = document.querySelector('.menu');
    menu.children[0].innerHTML = profile.getGivenName();
    menu.children[1].innerHTML = '<p>status</p>'
    // menu.children[2].innerHTML = '<p>counter</p>'

};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}

//! tiemr function


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    const status = document.querySelector('.status');

    interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds;

        if(--timer < 0) {
            timer = duration;
            status.innerHTML = i++;
        }

    }, 1000);
    

}



const time = () => {

    const twentyFive = 60 * 25, 
    display = document.querySelector('.timer');
    startTimer(twentyFive, display); 
    
};



// const noTime = () => {

//     const twentyFive = 60 * 25,
//     display = document.querySelector('.timer');
//     startTimer(twentyFive);
// }


//! start function
const iniciar = document.querySelector('.btn-start');
const reset = document.querySelector('.timer');

function start() {

    time();
    iniciar.setAttribute('disabled', '');
}

iniciar.addEventListener('click', start);

//! stop function
const parar = document.querySelector('.btn-stop');

function stop() {

    clearInterval(interval);
    reset.innerHTML = '25:00';
    iniciar.removeAttribute('disabled', '');
}

parar.addEventListener('click', stop)

