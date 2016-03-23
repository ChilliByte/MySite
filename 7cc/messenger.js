var pubnub = PUBNUB({
    subscribe_key: 'sub-c-055f8160-f12c-11e5-8126-0619f8945a4f', // always required
    publish_key: 'pub-c-fde6521c-dd9d-4eb1-9081-1420d5c0e8ff' // only required if publishing
});

function send() {
  pubnub.publish({
      channel: '7cc',
      message: msg.value,
  });
  
}
var msgBox = document.getElementById("messages");
pubnub.subscribe({
    channel: '7cc',
    connect: alert("connected!"),
    callback: function(m) {
      
    },
    error: function(err) {
        console.log(err);
    }
});
