const admin = require("firebase-admin");

const serverAccount = require("./config/firebase-config");

//firebase initializeApp

admin.initializeApp({
    credential: admin.credential.cert(serverAccount),
    databaseURL: "https://fir-test-8cc4a.firebaseio.com/"
});
console.log("initial");

//////////
///  1
///send message to other devices one to one
///this devices token from frontend FCM SDK, we can save this in our database;
const regiestDevicesToken = "";

/// message data
const payload = {
    data: {
        score: "800",
        time: "2:35",
    }
};

//send message function use token payload
admin.messaging()
    .sendToDevice(regiestDevicesToken, payload)
    .then(function (response) {
        //
        // response is a promise
        console.log("success:--->>>" + JSON.stringify(response));
    })
    .catch(function (error) {
        console.log("error:---->>> " + JSON.stringify(error))
    });

////


/////
/// 2
//// send to different devices, but only send 1000 devices
//get this tokens form client FCM sdk
const regiestDevicesTokens = [
    "token one",
    "token two"
];

/// message data
const payloads = {
    data: {
        score: "800",
        time: "2:35",
    }
};
admin.messaging()
    .sendToDevice(regiestDevicesTokens, payloads)
    .then(function (response) {
        console.log("success:---->" + JSON.stringify(response))
    }).catch(function (error) {
    console.log("error" + JSON.stringify(error))
});


//////
/////
// 3
// Managing device groups
// groups set link is
// https://firebase.google.com/docs/cloud-messaging/android/device-group#managing_device_groups
// notification key.
const notificationKey = "some-notification-key";


const payloadGroup = {
    data: {
        score: "850",
        time: "2:45"
    }
};

// Send a message to the device group corresponding to the provided
// notification key.
admin.messaging()
    .sendToDeviceGroup(notificationKey, payloadGroup)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });

///
//////
////
///4

///send message to topic
//向主题发送消息
// The topic name can be optionally prefixed with "/topics/".
const topic = "highScores";

// See the "Defining the message payload" section below for details
// on how to define a message payload.
const payloadTopic = {
    data: {
        score: "850",
        time: "2:45"
    }
};

// Send a message to devices subscribed to the provided topic.
admin.messaging()
    .sendToTopic(topic, payloadTopic)
    .then(function (response) {
        // See the MessagingTopicResponse reference documentation for the
        // contents of response.
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });


////
//
//5
//send To Condition
//
// 向条件发送消息
// 比如  "'TopicA' in topics && ('TopicB' in topics || 'TopicC' in topics)"
////


// Define a condition which will send to devices which are subscribed
// to either the Google stock or the tech industry topics.
const condition = "'stock-GOOG' in topics || 'industry-tech' in topics";

// See the "Defining the message payload" section below for details
// on how to define a message payload.
const payloadCondition = {
    notification: {
        title: "$GOOG up 1.43% on the day",
        body: "$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day."
    }
};

// Send a message to devices subscribed to the combination of topics
// specified by the provided condition.
admin.messaging()
    .sendToCondition(condition, payloadCondition)
    .then(function (response) {
        // See the MessagingConditionResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });


///
///
///
///6
/// 自定义消息

/// This registration token comes from the client FCM SDKs.
const registrationToken = "";

// See the "Defining the message payload" section above for details
// on how to define a message payload.
const payloadCustom = {
    notification: {
        title: "Urgent action needed!",
        body: "Urgent action is needed to prevent your account from being disabled!"
    }
};

// Set the message as high priority and have it expire after 24 hours.
const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

// Send a message to the device corresponding to the provided
// registration token with the provided options.
admin.messaging()
    .sendToDevice(registrationToken, payloadCustom, options)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });