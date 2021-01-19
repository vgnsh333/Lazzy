<template>
  <q-page padding>
    <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
      <q-tab class="text-light-green-14" name="Sunday" label="Sunday" />
      <q-tab class="text-lime-14" name="Monday" label="Monday" />
      <q-tab class="text-deep-purple-8" name="Tuesday" label="Tuesday" />
      <q-tab class="text-cyan-8" name="Wednesday" label="Wednesday" />
      <q-tab class="text-indigo-10" name="Thursday" label="Thursday" />
      <q-tab class="text-green-10" name="Friday" label="Friday" />
      <q-tab class="text-teal" name="Saturday" label="Saturday" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      transition-prev="jump-up"
      transition-next="jump-down"
      class="text-center"
    >
      <q-tab-panel v-for="(items, idx) in TimeTable" :key="idx" :name="idx">
        <div class="text-h6">{{ idx }}</div>
        <div class="q-pa-sm col items-start q-gutter-sm">
          <div v-if="items == 'Yet To Add' || items == undefined">
            <q-spinner-bars color="primary" size="16em" />
            <div class="text-h6">Yet To Add</div>
          </div>
          <q-card v-else v-for="(item, idx) in items" :key="idx" class="">
            <q-card-section class="bg-purple text-white text-center">
              <div class="text-h6">{{ item.SubjectName }}</div>
              <q-separator dark />
              <div class="text-h6">{{ item.SubjectCode }}</div>
              <q-separator dark />
              <div class="text-subtitle2">
                {{ item.FT | AMorPM }} - {{ item.TT | AMorPM }}
              </div>
            </q-card-section>
            <q-separator dark />
            <q-card-actions class="bg-blue text-white" align="around">
              <q-btn class="full-width" flat outline>Join</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <!-- content -->
    <!-- <div class="q-pa-sm col items-start q-gutter-sm">
      {{ deets }}
      <ul id="example-1">
        <li v-for="(item,idx) in deets" :key="idx">
          {{ item.Day }}
        </li>
      </ul>
      <q-card v-for="(item,idx) in deets" :key="idx" class="my-card">
        <q-card-section class="bg-purple text-white text-center">
          <div class="text-h6">{{ item.SubjectName }}</div>
          <q-separator dark />
          <div class="text-h6">{{ item.SubjectCode }}</div>
          <q-separator dark />
          <div class="text-subtitle2">
            {{ item.FT | AMorPM }} - {{ item.TT | AMorPM }}
          </div>
        </q-card-section>
        <q-separator dark />
        <q-card-actions class="bg-blue text-white" align="around">
          <q-btn class="full-width" flat outline>Join</q-btn>
        </q-card-actions>
      </q-card>
    </div> -->
  </q-page>
</template>

<script>
import firebase from "firebase";

export default {
  // name: 'PageName',
  data() {
    return {
      TimeTable: {},
      deets: {},
      tab: "Sunday",
    };
  },
  filters: {
    AMorPM: function (value) {
      if (!value) return "";
      var amorpm = "";
      value = value.toString();
      var hourandmins = value.split(":");
      var hours = hourandmins[0];
      var mins = hourandmins[1];
      if (hours > 12) {
        hours = hours % 12;
        amorpm = "pm";
      } else {
        amorpm = "am";
      }
      var time = hours + ":" + mins + " " + amorpm;
      return time;
    },
  },
  created() {
    var UID = firebase.auth().currentUser.uid;
    var db = firebase
      .database()
      .ref(UID)
      .child("TimeTable")
      .once("value", (sc) => {
        //console.log(sc.val());
        var timetable = sc.val();
        var tt = {
          Sunday: timetable["Sunday"],
          Monday: timetable["Monday"],
          Tuesday: timetable["Tuesday"],
          Wednesday: timetable["Wednesday"],
          Thursday: timetable["Thursday"],
          Friday: timetable["Friday"],
          Saturday: timetable["Saturday"],
        };
        this.TimeTable = tt;
        console.log("AA");
        console.log(tt);
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var n = weekday[d.getDay()];
        console.log('today'+n);
        this.tab = n;
        console.log(this.tab);
        // var monday = timetable[weekday[0]];
        // console.log(monday);
        // this.deets = monday;
        // for (let k in monday) {
        //   console.log(monday[k]);
        // }
        // console.log("in tt" + timetable);
        // for (let k in timetable) {
        //   console.log(k);
        //   console.log(timetable[k]);
        // }
      });
  },
};
</script>
