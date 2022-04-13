let DATI;

const config = {
    apiKey: "AIzaSyAIq0lfwAzdFIrbuZySmfT5fdxjBYyAPN8",
    authDomain: "progetto-biciclette-482ba.firebaseapp.com",
    databaseURL: "https://progetto-biciclette-482ba-default-rtdb.firebaseio.com",
    projectId: "progetto-biciclette-482ba",
    storageBucket: "progetto-biciclette-482ba.appspot.com",
    messagingSenderId: "661917554268",
    appId: "1:661917554268:web:c94dba2c3468359cc67899"
};


async function downloadDati() {
    if (firebase.apps.length == 0) {
        firebase.initializeApp(config);
    }

    let database = firebase.database();
    let arrayPromesse = [
        database.ref().once('value')
    ];
    await Promise.all(arrayPromesse)
        .then((dati) => {
            setDati(dati[0].val())
        });
}

function setDati(dati) {
    DATI = dati;
}

export async function getDati() {
    await downloadDati();
    return DATI;
}


export async function pushDati(dati) {
    // Reference messages collection
    let messagesRef = firebase.database().ref();

    messagesRef.remove();

    return messagesRef.set(dati);

}