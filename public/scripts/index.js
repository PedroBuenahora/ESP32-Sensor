const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");
const brigElement = document.getElementById("bri");
const bulElement = document.getElementById("bul");
const pumElement = document.getElementById("pum");
const fanElement = document.getElementById("fan");

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathTemp = 'UsersData/' + uid.toString() + '/temperature';
    var dbPathHum = 'UsersData/' + uid.toString() + '/humidity';
    var dbPathPres = 'UsersData/' + uid.toString() + '/pressure';
    var dbPathBrig = 'UsersData/' + uid.toString() + '/brightness';
    var dbPathBul = 'UsersData/' + uid.toString() + '/bulbStatus';
    var dbPathPum = 'UsersData/' + uid.toString() + '/pumpStatus';
    var dbPathFan = 'UsersData/' + uid.toString() + '/fanStatus';

    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefPres = firebase.database().ref().child(dbPathPres);
    var dbRefBrig = firebase.database().ref().child(dbPathBrig);
    var dbRefNBul = firebase.database().ref().child(dbPathBul);
    var dbRefPum = firebase.database().ref().child(dbPathPum);
    var dbRefFan = firebase.database().ref().child(dbPathFan);

    // Update page with new readings
    dbRefTemp.on('value', snap => {
      tempElement.innerText = snap.val().toFixed(2);
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
    });

    dbRefPres.on('value', snap => {
      presElement.innerText = snap.val().toFixed(2);
    });

    dbRefBrig.on('value', snap => {
      brigElement.innerText = snap.val().toFixed(2);
    });

    dbRefNBul.on('value', snap => {
      bulElement.innerText = snap.val().toString();
    });

    dbRefPum.on('value', snap => {
      pumElement.innerText = snap.val().toString();
    });

    dbRefFan.on('value', snap => {
      fanElement.innerText = snap.val().toString();
    });

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}