
console.log("this is both sides.");

if(Meteor.isClient){
  console.log("this is client!");
  Template.message.helpers({
  	test:"test123"
  })

  Template.body.helpers({
  	testArray: _.range(0,10),
  	Msgs:[
  		"Hi Meteor! (m1)",
  		"Agilearning.io is awesome! (m2)",
  		"Agilearning.io is cute (m3)" 
  	]
  })

}

if(Meteor.isServer){
  console.log("this is server");
}


