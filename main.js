// global(Client & Server) not var
Message = new Mongo.Collection("message");
 

if(Meteor.isClient){
  
 Template.body.helpers({
  	// from data 
  	Msgs: function(){
  		return(Message.find({},{sort:{createdAt:-1}}))
  	}
  })
  // print input
  Template.body.events({
  	// e:event, t:template
  	"change #inputMsg": function(e,t){
  		msg = $(e.target).val();
		usr = $("#inputUsr").val();

		if (!usr){
			usr = "Anonymous"
		}
  		// after message and clear space
  		$("form > input").val("");
  		console.log(msg)

  		msgData = {
  			text:msg,
  			user:usr,
  			createdAt: new Date,
  		};
  		Message.insert(msgData);
  	}
  })

}
