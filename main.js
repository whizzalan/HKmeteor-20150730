
console.log("this is both sides.");
// global(Client & Server) not var
Message = new Mongo.Collection("message");

sampleMessages = [
	{text: "Hi Meteor! (m1)", from :"db"},
	{text: "Agilearning.io is awesome! (m2)"},
	{text: "Agilearning.io is cute (m3)"} 
]
 

if(Meteor.isClient){
  console.log("this is client!");
 

  Template.body.helpers({
  	// from data 
  	Msgs: function(){
  		return(Message.find())
  	}
  	// Msgs : sampleMessages //[
// 	{n:1, text: "Hi Meteor! (m1)"},
// 	{n:2, text: "Agilearning.io is awesome! (m2)"},
// 	{n:3, text: "Agilearning.io is cute (m3)"} 
// ]
  })
  // print input
  Template.body.events({
  	// e:event, t:template
  	"change #inputMsg": function(e,t){
  		console.log($(e.target).val());
  		console.log("change #inputMsg");
  		msg = $(e.target).val();
  		// after message and clear space
  		$(e.target).val("");
  		msgData = {
  			test:msg,
  			createdAt: new Date,
  		};
  		console.log(msgData);
  		Message.insert(msgData);
  	}
  })

}

if(Meteor.isServer){
  console.log("this is server");
  // check data
  if (Message.find().count() === 0){
  	for (i in sampleMessages){
  		Message.insert(sampleMessages[i])
  	}
  }
}







