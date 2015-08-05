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
  		// after message and clear space
  		$(e.target).val("");
  		msgData = {
  			text:msg,
  			createdAt: new Date,
  		};
  		Message.insert(msgData);
  	}
  })

}
