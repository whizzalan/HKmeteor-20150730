Router.route('/hello', function(){
  this.render('guestbook');
});


// global(Client & Server) not var
Message = new Mongo.Collection("message");
 

if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe("pubMsgs",20);
  });  
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
  Meteor.publish("pubMsgs",function(liminN){
    //backend can see userId
    // console.log(Meteor.useId()); // not to work
    // console.log(this.userId);
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


