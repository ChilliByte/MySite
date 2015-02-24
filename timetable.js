function notifyMe() {
  if (!Notification) {
    alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();

  var notification = new Notification('Notification title', {
    icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
    body: "Hey there! You've been notified!",
  });


  notification.onclick = function () {
    window.open("http://stackoverflow.com/a/13328397/1269037");
  }
}
