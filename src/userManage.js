const admin = require("firebase-admin");

const serverAccount = require("./config/firebase-config");


admin.initializeApp({
    credential: admin.credential.cert(serverAccount),
    databaseURL: "https://fir-test-8cc4a.firebaseio.com/"
});

console.log("initial");

// create user
admin.auth().createUser({
    email: "user@example.com",
    emailVerified: false,
    phoneNumber: "+11234567890",
    password: "secretPassword",
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
}).then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);

    const uid = userRecord.uid;
    console.log("user uid is -->>>" + JSON.stringify(uid));
    // this function is get user informations
    getUser(uid);
}).catch(function (error) {
    console.log("Error creating new user:", error);
});

function getUser(uid) {
    admin.auth().getUser(uid)
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully fetched user data:", userRecord.toJSON());
            const uid = userRecord.uid;
            //update user
            updateUser(uid);
        }).catch(function (error) {
        console.log("Error fetching user data:", error);
    });
}


function updateUser(uid) {
    admin.auth().updateUser(uid, {
        email: "modifiedUser@example.com",
        phoneNumber: "+11234567890",
        emailVerified: true,
        password: "newPassword",
        displayName: "Test 002",
        photoURL: "http://www.example.com/12345678/photo.png",
        disabled: true
    }).then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated user", userRecord.toJSON());
    }).catch(function (error) {
        console.log("Error updating user:", error);
    });
}


admin.auth().deleteUser(uid)
    .then(function () {
        console.log("Successfully deleted user");
    }).catch(function (error) {
    console.log("Error deleting user:", error);
});