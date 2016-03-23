window.onload = function() {
    var me = prompt("Enter Name");
    var who = prompt("Who to talk to?");
    var msgBox = document.getElementById("messages");
    
    var pubnub = PUBNUB({
        subscribe_key: 'sub-c-055f8160-f12c-11e5-8126-0619f8945a4f', // always required
        publish_key: 'pub-c-fde6521c-dd9d-4eb1-9081-1420d5c0e8ff' // only required if publishing
    });
    
    function send() {
      pubnub.publish({
          channel: me,
          message: msg.value,
      });
      msgBox.innerHTML += "<div class='from'><h1>"+me.substring(0,1).toUpperCase()+"</h1><p>"+msg.value+"</p></div>";
    }
    
    pubnub.subscribe({
        channel: who,
        connect: alert("connected!"),
        callback: function(m) {
            msgBox.innerHTML += "<div class='to'><h1>"+who.substring(0,1).toUpperCase()+"</h1><p>"+m+"</p></div>";
        },
        error: function(err) {
            console.log(err);
        }
    });
}
