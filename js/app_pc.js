// replace these values with those generated in your TokBox Account
var apiKey = "API_KEY";
var sessionId = "SESSION_ID";

//set connectionData:"pc" when creating token
var token = "TOKEN";

// (optional) add server code here
initializeSession();


// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    console.log(event.stream.connection.data);
    
    //show mobile user as the main window.  window size is controlled in css.
    if(event.stream.connection.data == 'mobile'){
      session.subscribe(event.stream, 'subscriber-mobile', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    }
    //show other pc user as small window.  window size and placement is controlled in css.
    else if(event.stream.connection.data == 'pc'){
      session.subscribe(event.stream, 'subscriber-pc', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    }
      

  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    name: clientName,
    style: { nameDisplayMode: 'on' }
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
