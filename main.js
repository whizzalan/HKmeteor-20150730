// global(Client & Server) not var
Message = new Mongo.Collection("message");
 

if(Meteor.isClient){
  
 Template.guestbook.helpers({
  	// from data 
  	Msgs: function(){
  		return(Message.find({},{sort:{createdAt:-1}}))
  	}
  })
  // print input
  Template.guestbook.events({
  	// e:event, t:template
  	"change #inputMsg": function(e,t){
  		msg = $(e.target).val();
		usr = $("#inputUsr").val();

  		// after message and clear space
  		$("input").val("");
  		console.log(msg)

  		msgData = {
  			text:msg,
  			userId:usr,
  			createdAt: new Date,
  		};


    // userId By Facebook
    usr = Meteor.userId()

    if (usr){
      msgData.userId = usr;
      msgData.user = Meteor.user().profile.name;
      Message.insert(msgData);
    }
  }
  })

}
