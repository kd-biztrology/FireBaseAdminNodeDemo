const admin = require("firebase-admin");

const serverAccount = require("./config/firebase-config");


admin.initializeApp({
    credential: admin.credential.cert(serverAccount),
    databaseURL: "https://fir-test-8cc4a.firebaseio.com/"
});

// idToken comes from the client app
//
const idToken = "";
admin.auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
        const uid = decodedToken.uid;
    }).catch(function (error) {
    console.log("error-->" + JSON.stringify(error))
});