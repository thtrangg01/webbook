const firebaseConfig = {
  apiKey: "AIzaSyAEQg_i2aYOddiwK_ousVZQn3KiXeuaeP8",
  authDomain: "webbook-1fd58.firebaseapp.com",
  projectId: "webbook-1fd58",
  storageBucket: "webbook-1fd58.appspot.com",
  messagingSenderId: "980574455098",
  appId: "1:980574455098:web:3646c5eb210b758306fc03",
  measurementId: "G-Q2HH6KQ5YX",
};

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult.user) {
        handleSignedInUser(authResult.user);
      }
      return false;
    },
    signInFailure: function (error) {},
  },

  autoUpgradeAnonymousUsers: true,
};
var ui;
$(function () {
  genLogin();
});

function genLogin() {
  firebase.initializeApp(firebaseConfig);
  ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);
  firebase.auth().onAuthStateChanged(function (user) {
    user ? handleSignedInUser(user) : handleSignedOutUser();
    $("#login-spinner").addClass("d-none");
  });
}

function handleSignedInUser(user) {
  $(".user").removeClass("d-none");
  $(".guest").addClass("d-none");

  $("#name").text(user.displayName);
  $("#email").text(user.email);
  $("#phone").text(user.phoneNumber);
  if (user.photoURL) {
    $(".avatar").attr("src", user.photoURL);
    displayUserAvatar(user.photoURL);
  } else {
    $(".avatar").attr("src", "./imgbook/logo.svg");
    displayUserAvatar(null, user.displayName);
  }
  $("#modal-login").modal("hide");
}

function handleSignedOutUser() {
  ui.start("#firebaseui-auth-container", uiConfig);
  $(".user").addClass("d-none");
  $(".guest").removeClass("d-none");
  $("#modal-login").modal("hide");
  displayUserAvatar();
}

function displayUserAvatar(url = null, name = null) {
  if (url) {
    $("#user-display").html('<img id="user-display-avatar" src="" alt="">');
    $("#user-display-avatar").attr("src", url);
    return;
  }
  if (name) {
    $("#user-display").text(name);
    return;
  }
  $("#user-display").text("Đăng Nhập");
}
