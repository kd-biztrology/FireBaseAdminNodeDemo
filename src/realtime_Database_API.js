const admin = require("firebase-admin");

const serverAccount = require("./config/firebase-config");


admin.initializeApp({
    //default
    credential: admin.credential.cert(serverAccount),
    databaseURL: "https://fir-test-8cc4a.firebaseio.com/",

    //In some cases,
    // you may want to downscope the Admin SDKs to act as an
    // unauthenticated client. You can do this by providing a
    // value of null for the database auth variable override.
    databaseAuthVariableOverride: null
});


// As an admin, the app has access to read and write all data,
// regardless of Security Rules
const db = admin.database();
const ref = db.ref("restricted_access/secret_document");
ref.once("value", function (snapshot) {
    console.log("snapshot  val---->>>>" + snapshot.val())
});

//Authenticate with limited privileges


limitedFunction();


function limitedFunction() {
    admin.initializeApp({
        //default
        credential: admin.credential.cert(serverAccount),
        databaseURL: "https://fir-test-8cc4a.firebaseio.com/",
        ///
        ///Initialize the app with a custom auth variable,
        // limiting the server's access
        databaseAuthVariableOverride: {
            uid: ""
        }
    });


// The app only has access as defined in the Security Rules
    const db2 = admin.database();
    const ref2 = db2.ref("/some_res");
    ref2.once("value", function (snapshot) {
        console.log("snapshot  val---->>>>" + snapshot.val())
    });
}

