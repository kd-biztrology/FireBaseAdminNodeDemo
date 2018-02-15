const admin = require("firebase-admin");

const serverAccount = require("./config/firebase-config");


admin.initializeApp({
    credential: admin.credential.cert(serverAccount),
    databaseURL: "https://fir-test-8cc4a.firebaseio.com/"
});
//this is uid is fire base user
// can get uid then create custom token
const uid = "uid";

admin.auth().createCustomToken(uid)
    .then(function (customToken) {
        console.log("customToken" + JSON.stringify(customToken));
        // Send token back to client
    }).catch(function (error) {
    console.log("Error creating custom token:", error);
});

///
///
// optionally specify additional

const uids = "";
const additionalClaims = {
    premiumAccount: true
};
admin.auth.createCustomToken(uids, additionalClaims)
    .then(function (customToken) {
        //send token to client
    }).catch(function (error) {
    console.log("error-->>" + error.toJSON())
});
