// Router.route('/', function(){
//   this.render('home');
// });

// Router.route('/hello', function(){
//   this.render('guestbook');
// });

Router.configure({
  layoutTemplate: 'layout'
})

Router.map(function(){
  this.route("index",{
    path: '/',
    template: "home"
  });
  this.route("hello",{
    path: '/hello',
    template: "guestbook"
  });
  this.route("chatroom",{
    path: '/chatroom/:cid',
    template: "chatroomPage",
    data: function(){
      res = {
        chatroomData:function(){
          //return(this.parames.cid)
          return(Chatroom.findOne({_id:this.params.cid}))
        }.bind(this)
      }
      return(res)
    },
    waitOn: function(){
      Meteor.subscribe("pubMsgsToChat",this.params.cid,10);
    }


  });
  
})


// global(Client & Server) not var
Message = new Mongo.Collection("message");
Chatroom = new Mongo.Collection("chatroom");
 

if(Meteor.isClient){
  // Meteor.startup(function(){
  //   Meteor.subscribe("pubMsgs",20);
  // });  

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
      cid = Router.current().params.cid

      msg = $(e.target).val();
      // usr = $("#inputUsr").val();

  		// after message and clear space
  		$("input").val("");

      msgData = {
        text:msg,
        chatroomId: cid, 
        // userId:usr,
        // createdAt: new Date,
      };

      Meteor.call("createMessage", msgData)

    }
  })

  Template.home.helpers({
    Chatrooms: function(){
      return(Chatroom.find({},{sort:{createdAt:-1}}))
    }
  })

  Template.home.events({
    // e:event, t:template
    "change #createChatroom": function(e,t){
      chatroomName = $(e.target).val();
      // usr = $("#inputUsr").val();

      // after message and clear space
      $("input").val("");

      chatroomData = {
        name: chatroomName,
        // userId:usr,
        // createdAt: new Date,
      };

      Meteor.call("createChatroom", chatroomData)

    }
  })


}
if(Meteor.isServer){
  Meteor.publish("pubMsgs",function(limitN){
    //backend can see userId
    // console.log(Meteor.useId()); // not to work
    // console.log(this.userId);
    return(Message.find({},{sort:{createdAt:-1},limit:limitN}))

   })

  Meteor.publish("pubMsgsToChat",function(cid,limitN){
    //backend can see userId
    // console.log(Meteor.useId()); // not to work
    // console.log(this.userId);
    return(Message.find({chatroomId:cid},{sort:{createdAt:-1}, limit:limitN}))

   })
  // auto publish 
  Meteor.publish(null,function(){
    // return([Message.find({}),Chatroom.find({})])
    return(Chatroom.find({}))
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
    },
    createChatroom: function(chatroomData){
    // userId By Facebook
    usr = Meteor.userId()
    if (usr){
      chatroomData.userId = usr;
      chatroomData.user = Meteor.user().profile.name;
      chatroomData.createdAt = new Date;
      Chatroom.insert(chatroomData);
      }
    },


  })
}


