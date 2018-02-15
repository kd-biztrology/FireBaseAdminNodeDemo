const admin = require("firebase-admin");

const serverAccount = require("./config/firebase-config");

//firebase initializeApp

//use default storage bucket
admin.initializeApp({
    credential: admin.credential.cert(serverAccount),
    storageBucket: "gs://fir-test-8cc4a.appspot.com"
});
// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.
//  this function must be more time to learn, is use google cloud storage
const bucket = admin.storage.bucket();


//custom storage bucket

const customBucket = admin.storage.bucket("custom bucket path");


//custom firebase storage bucket
//customApp ?? i don't know this
const  customFirebaseBucket=customApp.storage().bucket();
