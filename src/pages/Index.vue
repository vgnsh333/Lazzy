<template>
  <q-page class="flex flex-center">
    <q-btn @click="signIn">Login</q-btn>
    {{ deets }}
  </q-page>
</template>

<script>
import firebase from "firebase";
import { Notify } from 'quasar';

export default {
  name: "PageIndex",
  methods: {
    signIn() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(token);
          console.log("uid: " + user.uid);
          console.log(credential);
          this.deets = user;
          var UID = firebase.auth().currentUser.uid;

          console.log("UID" + UID);
          var db = firebase.database();
          db.ref(UID)
            .child("TimeTable")
            .once("value", (sc) => {
              console.log("sc" + sc.exists());
              if (!sc.exists()) {
                db.ref(UID).set({
                  TimeTable: {
                    Sunday: "Yet To Add",
                    Monday: "Yet To Add",
                    Tuesday: "Yet To Add",
                    Wednesday: "Yet To Add",
                    Thursday: "Yet To Add",
                    Friday: "Yet To Add",
                    Saturday: "Yet To Add",
                  },
                });
              }
            });
          this.$router.push({ path: "/add" });
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          this.deets = error;
        });
    },
  },
  data() {
    return {
      deets: "",
    };
  },
};
</script>
