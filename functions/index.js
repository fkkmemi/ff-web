const functions = require('firebase-functions')
const admin = require('firebase-admin')

const serviceAccount = require('./test-ff6-firebase-adminsdk-u40fa-d02d4e5a01.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://test-ff6.firebaseio.com'
})

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const data = {
    email: user.email,
    level: 5
  }
  admin.firestore().collection('users').doc(user.uid).set(data)
})

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  admin.firestore().collection('users').doc(user.uid).delete()
})

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!')
// })
