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


      msgData = {
        text:msg,
        // userId:usr,
        // createdAt: new Date,
      };

      Meteor.call("createMessage", msgData)



  }
  })

}
if(Meteor.isServer){
  Meteor.publish(null,function(){
    return(Message.find({},{limit:10,sort:{createdAt:-1}}))
   })
  Meteor.methods({
    createMessage: function(msgData){
    // userId By Facebook
    usr = Meteor.userId()
    if (usr){
      msgData.userId = usr;
      msgData.user = Meteor.user().profile.name;
      msgData.createdAt = new Date;

      Message.insert(msgData);
    }

    }
  })
}


