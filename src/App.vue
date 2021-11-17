<template>
      <Timer
        :timer="formattedTime"
        :totaltimer="totalTime"    
        :state="timerState"  
        :times="times"
        @start="start"
        @addTime="addTime"
        @pause="pause"
        @stop="stop"    
      />
</template>

<!--       update : i add typescript (lang="ts")  now we can write typescript code  -->
<script lang="ts">
import Vue from 'vue';
import Timer from './components/Timer.vue'

export default Vue.extend ({
  name: 'App',
  components: {
    Timer
  }, 
  
  data () {
    return {
      API_URL:"http://localhost:3000/time",
      timerState: 'stopped',
      currentTimer: 0,
      total: 0,
      formattedTime: "00:00:00",
      totalTime: "00:00:00",
      ticker: 0 ,
      latestLap: "",
      snackbar: false,
      times:[] as any[],
      index:1,
    };
  },

  methods: {
    // call function get all time tracker 
    getTimes : function():void {
      //NOTE : in this project I used fetch but in general I work with axios
      fetch(this.API_URL)
      .then(data => {
        return data.json();
      })
      .then((json) => {
        this.times = json;
      })
    },

    // get last row to get total time
    getTotal: function(): void {
      fetch(this.API_URL + "/last")
      .then(data => {
        return data.json();
      })
        .then(json => {
        this.totalTime = json[0].total;
    });
    },

    //when we click on start
    start: function(): void {
      if (this.timerState !== 'running') {
        this.tick();
        this.timerState = 'running';
      }
    },
   
    // when we click on start new ( add time tracker in our base )
    addTime : function(): void {
      this.snackbar = true;
      this.latestLap = this.formatTime(this.currentTimer);
      let payload = {
        title:'periode'+" " + this.index++,
        time:this.formatTime(this.currentTimer),
        total:this.formatTime(this.total),
      }

      fetch(this.API_URL,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(payload)
      })
      .then(data => {  

        return data.json()
      })
      .then(() => {
          this.getTimes()
      })

      this.currentTimer = 0;
    },

    // when click on pause
    pause : function():void {
      window.clearInterval(this.ticker);
      this.timerState = 'paused';
    },
    
    // that for reset time, but i don't used in component timer 
    stop : function():void {
      window.clearInterval(this.ticker)
      this.currentTimer = 0;
     // this.total = this.times.total;
      this.formattedTime = "00:00:00";
      this.timerState = "stopped";
    },

    // for increment time and format total time
    tick : function():void {
     const timez = this.totalTime.split(':');
        const secs = timez[2];
        const mins = timez[1];
        const hours = timez[0];
        const date = new Date(Date.UTC(2009, 1, 13, +hours, +mins, +secs));
        this.total = date.getTime() / 1000; 
        this.ticker = setInterval(() => {
        this.currentTimer++;
        this.total++;
        this.formattedTime = this.formatTime(this.currentTimer);
        this.totalTime = this.formatTime(this.total);
      }, 1000);
    },

    // convert totaltime in our format 
    formatTime : function(seconds: any): string {
      const measuredTime = new Date(0);
      measuredTime.setSeconds(seconds);
      const MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    },  
  }, 
// call our function 
beforeMount() {
  this.getTimes();
  this.getTotal();
},
});
</script>

