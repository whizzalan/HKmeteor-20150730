
console.log("this is both sides.");

if(Meteor.isClient){
  console.log("this is client!");
 
 Template.message.helpers({
  	test:"test123"
 })

  Template.body.helpers({
  	testArray: _.range(0,10),
  	testObject:{
  		test:"test1234"
  	},
  	testDate: new Date,
  	Msgs:[
  		{n:1,text: "Hi Meteor! (m1)"},
  		{n:2,text: "Agilearning.io is awesome! (m2)"},
  		{n:3,text: "Agilearning.io is cute (m3)"} 
  	]
  })

}

if(Meteor.isServer){
  console.log("this is server");
}


