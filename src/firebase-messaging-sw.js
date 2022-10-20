importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
 apiKey: "AIzaSyAr4BDFYd4Bfp1UFVXiembRIey-7T2EqfM",
 authDomain: "https://accounts.google.com/o/oauth2/auth",
 projectId: "notification-project-10dff",
 storageBucket: "notification-project-10dff.appspot.com",
 messagingSenderId: "823756799151",
 appId: "1:823756799151:web:6f4d918a2cbbcf6f5ce85a",
 measurementId: "G-9TLH34GFGP"
});

const messaging = firebase.messaging();


