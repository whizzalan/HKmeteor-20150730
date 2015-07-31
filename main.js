
console.log("this is both sides.");
// global(Client & Server) not var
Message = new Mongo.Collection("message");

sampleMessages = [
	{text: "Hi Meteor! (m1)"},
	{text: "Agilearning.io is awesome! (m2)"},
	{text: "Agilearning.io is cute (m3)"} 
]
 

if(Meteor.isClient){
  console.log("this is client!");
 

  Template.body.helpers({
  	Msgs : sampleMessages //[
// 	{n:1, text: "Hi Meteor! (m1)"},
// 	{n:2, text: "Agilearning.io is awesome! (m2)"},
// 	{n:3, text: "Agilearning.io is cute (m3)"} 
// ]
  })

}

if(Meteor.isServer){
  console.log("this is server");
}







