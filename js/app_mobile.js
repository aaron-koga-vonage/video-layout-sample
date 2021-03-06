// replace these values with those generated in your TokBox Account
var apiKey = "API_KEY";
var sessionId = "SESSION_ID";


//set connectionData:"mobile" when creating token
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
    
    //display each pc user in a separate window
    //you can do something smarter
    if(!document.getElementById('subscriber1').hasChildNodes()){
      session.subscribe(event.stream, 'subscriber1', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    }
    else{
      session.subscribe(event.stream, 'subscriber2', {
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
