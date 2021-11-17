<template>
<!--     update : design     -->
<div style="padding:5% 15%">
	<div class="wrapper">

    <div>
        <h1 style="  margin: 10px 2px;">Today,{{currentDate()}}</h1>
    </div>

    <div>
    <button
     @click="$emit('pause')"
     :disabled="state == 'stopped' || state == 'paused'"
    class="button button3"
    ><font-awesome-icon :icon="['fas','stop']"  />Stop</button>

    <button
    @click="$emit('addTime') "
    :disabled="state == 'stopped'"
    class="button button1"
    ><font-awesome-icon :icon="['fas','clock']" /> Start new</button>

    <button  
    @click="$emit('start')"
    :disabled="state == 'running'"
      class="button button1"
    ><font-awesome-icon :icon="['fas','play']" />Start</button>

    </div>

    <div>
      <h2 style="color:green">{{ timer }}</h2>
    </div>
  </div>

<hr class="new1">
<div class="total">
  <div>
       <p style="margin-left:10%"> Current periode</p>    
  </div>

    <div>
       <h3 style="color:rgb(59, 238, 14)"> {{ timer }} </h3>
    </div>

</div>
<hr class="new1">

<div class="total" v-for="lap in times" :key="lap.id">
  <div>
       <p style="margin-left:10%"> {{lap.title}}</p>   
       <hr class="new2">
  </div>

    <div>
       <p> {{ lap.time }} </p>
       <hr class="new2">
    </div>
</div>

	<div class="total">
    <div class="box">    
    </div>
    <div class="totalNumber">
       <h2> Total {{ totaltimer }} </h2>
    </div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name : 'Timer',
  props : ['timer', 'state' , 'times' , 'totaltimer' ],
  methods: {
 // get date of today
 currentDate(): string {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
      return date;
    },
  },  
}; 
</script>

<!--     update :  I added scss    -->
<style lang="scss">

th {
	text-align: left;
	padding: 16px;
}
td {
	text-align: left;
	padding: 16px;
}
tr {
	&:nth-child(even) {
		background-color: #f2f2f2;
	}
}
.new1 {
	border: 0.5px solid green;
}
.new2 {
	color: gray;
}
.wrapper {
	display: grid;
	grid-template-columns: 40% 40% 20%;
}
.total {
	display: grid;
	grid-template-columns: 70% 30%;
}
.box {
	padding: 1em;
}
.totalNumber {
	padding: 1em;
	color: green;
}
.button {
	background-color: #4CAF50;
	border: none;
	color: white;
	padding: 10px 25px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 10px 2px;
	transition-duration: 0.4s;
	cursor: pointer;
	border-radius: 10%;
}
.button1 {
	background-color: white;
	color: green;
	border: 2px solid #4CAF50;
	&:hover {
		background-color: #4CAF50;
		color: white;
	}
}
.button3 {
	background-color: white;
	color: black;
	border: 2px solid #f44336;
	&:hover {
		background-color: #f44336;
		color: white;
	}
}
</style>
