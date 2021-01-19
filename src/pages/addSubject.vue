<template>
  <q-page padding>
    <q-form class="q-pa-md">
      <q-input
        filled
        v-model="SubjectName"
        label="Subject Name"
        color="purple-12"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type the subject name',
        ]"
      />
      <q-input
        filled
        v-model="SubjectCode"
        label="Subject Code"
        color="orange-12"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type the subject code',
        ]"
      />
      <q-select
        color="orange"
        bg-color=""
        filled
        v-model="Day"
        :options="options"
        label="Day"
        transition-show="flip-up"
        transition-hide="scale"
        options-dense
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
      <q-input
        class="q-pt-md"
        filled
        v-model="fromTime"
        mask="time"
        :rules="['time']"
        label="From"
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="fromTime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input filled v-model="toTime" mask="time" :rules="['time']" label="To">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="toTime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        v-model="SubjectLink"
        label="Subject Link"
        color="purple-12"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please paste the link']"
      />
      <div class="q-pt-md row justify-center items-center">
        <q-btn label="Submit" @click="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import firebase from "firebase";
import { Notify } from "quasar";

export default {
  // name: 'PageName',
  data() {
    return {
      options: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      fromTime: "00:00",
      toTime: "00:00",
      SubjectLink: "",
      Day: "",
      SubjectCode: "",
      SubjectName: "",
    };
  },
  methods: {
    submit() {
      // var UID = firebase.auth().currentUser.uid;
      // var db = firebase.database();
      // let x = db.ref(UID).once('value',(sc)=>{
      //   console.log(sc.exists())
      // });
      var subject = {
        Day: this.Day,
        SubjectCode: this.SubjectCode,
        SubjectName: this.SubjectName,
        SubjectLink: this.SubjectLink,
        FT: this.fromTime,
        TT: this.toTime,
      };
      console.log(subject);
      var UID = firebase.auth().currentUser.uid;
      var db = firebase.database().ref(UID);
      db.child("TimeTable")
        .child(subject.Day)
        .push(subject)
        .then((sc) => {
          Notify.create({
            message: this.SubjectName+" added to timetable",
            color: "blue-10",
            position: "center",
          });
        });
    },
  },
};
</script>
