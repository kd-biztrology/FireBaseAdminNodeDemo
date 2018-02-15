const admin = require("firebase-admin");

const serverAccount = require("./config/firebase-config");

//firebase initializeApp

admin.initializeApp({
    credential: admin.credential.cert(serverAccount),
    databaseURL: "https://fir-test-8cc4a.firebaseio.com/"
});
console.log("initial");