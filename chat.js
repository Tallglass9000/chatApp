// This code comes from https://github.com/meteor-seattle/simple-chat

ChatMessages = new Mongo.Collection('chatmessages');

if (Meteor.isClient) {
	Template.messageBox.events({
		'click #sendMessageButton, keydown #myMessage': 
			function (event, template) {

			if(!event.keyCode || event.keyCode == 13) {
				event.preventDefault();
				enterMessage();
			}
		}
	});

	Template.clearMessages.events({
		'click #clearAllMessagesButton': 
			function (e, t) {
			Meteor.call('removeMessages')
		}
	});

	function enterMessage (newMessage) {
		var newMessage = $('#myMessage').val();
		console.log(newMessage);
		ChatMessages.insert({
			message: newMessage, 
			timestamp: new Date()
		});
		$("#myMessage").val('');
	}

	Template.chatMessages.helpers({
		'allMessages': function () {
			return ChatMessages.find();
		}
	});
}

if (Meteor.isServer) {
	Meteor.methods({
		'removeMessages': function () {
			console.log('server here, what do you need')
			ChatMessages.remove({});
			console.log('all are removed')
		}
	})
}

// Check out github.com/meteor-seattle


