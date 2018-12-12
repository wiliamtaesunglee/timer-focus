const userImg = document.querySelector('.userPhoto a img');
const menu = document.querySelector('.menu');
const userOff = document.querySelector('.status');
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

// Ler
// db.collection("teste").get().then(res => {
//     res.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data().name}`);
//     });
// })

// Adicionar
// db.collection("teste").doc("XPTO").set({
//     name: "Hugo"
// });

// Atualizar
// db.collection("teste").doc("XPTO").update({
//     name: "Will"
// });
//! regras de autenticações
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  })

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
    }
    // The signed-in user info.
    var user = result.user;
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});

    
    //!dados usuários

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
        user.providerData.forEach(function (profile) {
            menu.children[0].innerHTML = profile.displayName;
            // menu.children[1].innerHTML = '<p>status</p>'
            // userOff.innerHTML = 'available';
            userImg.setAttribute('src', profile.photoURL);

            // console.log("Sign-in provider: " + profile.providerId);
            // console.log("  Provider-specific UID: " + profile.uid);
            // console.log("  Name: " + profile.displayName);
            // console.log("  Email: " + profile.email);
            // console.log("  Photo URL: " + profile.photoURL);
            //!Adicionar
            db.collection('userData').doc(`${profile.email}`).set({
                name: `${profile.displayName}`,
                imgUrl: `${profile.photoURL}`,
                status: true

            });
        });

    } else {
        const singOutButtun = document.querySelector('.g-singout');
        console.log(singOutButtun);
        
        
    }
});



    
const singOutButtun = document.querySelector('.g-signout');
singOutButtun.addEventListener('click', function singOutButton() {
    firebase.auth().signOut().then(function() {
        menu.children[0].innerHTML = 'user';
        // menu.children[1].innerHTML = '<p>status</p>'
        // userOff.innerHTML = 'available';
        userImg.setAttribute('src', 'http://placehold.jp/150x150.png');
        // Sign-out successc
        console.log('foi');
      }).catch(function(error) {
        // An error happened.
      });
} )
    
    
    
// };

// //! singOut
// const clearUser = document.querySelector('.name');

// }

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

function logado() {
    if(onSignIn === true) {
        console.log(profile.getName());
    }
}




