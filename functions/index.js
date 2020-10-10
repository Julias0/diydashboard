var functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp();
var firestore = admin.firestore;
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var uuid = require('uuid').v4;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


app.post('/', async (req, res) => {
    var formattedData = req.body;
    formattedData.created_at = new Date(formattedData.created_at);
    await firestore().doc('emails/' + uuid()).create(formattedData);
    res.send('Got it');
});

// Expose Express API as a single Cloud Function:
exports.listenForEmail = functions.https.onRequest(app);