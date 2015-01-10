/**
 * Utility functions to manage the connection to the camera.
 *
 * @TODO
 *   Add default settings, eg: port 80, http etc. videoMain vs. videoSub
 */

var Camera = function (settings) {
  
  var self = this;

  this.settings = settings;

  // Map requests to the Foscam API.
  this.commands = {
    snap: 'snapPicture2',
    move: {
      left: 'ptzMoveLeft',
      up: 'ptzMoveUp',
      down: 'ptzMoveDown',
      right: 'ptzMoveRight',
      stop: 'ptzStopRun'
    },
    validate: 'usrBeatHeart'
  };

  /**
   * Utility function to build the base URL to the camera.
   */
  this.buildURL = function () {
    // http://URL/CGIProxy.fcgi?usr=USER&pwd=PASS
    var protocol = '';
    // If there isn't a protocol on the URL, assume it's http.
    if (this.settings.cameraURL.search('http') == -1) {
      protocol = 'http://';
    }
    return protocol + this.settings.cameraURL + '/CGIProxy.fcgi?usr=' + this.settings.cameraUser + '&pwd=' + this.settings.cameraPassword
  }

  /**
   * Utility function to build an executable command.
   */
  this.buildURLCommand = function (command) {
    return this.buildURL() + '&cmd=' + command;
  }
 
  /**
   * Utility function to query the camera.
   */
  this.query = function (url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    if (typeof callback != 'undefined') { 
      return callback(xmlhttp.responseText);
    }
    return xmlhttp.responseText;
  }

  /**
   * Validate that the user/pass can access the camera.
   */
  this.validate = function () {
    var valid = false;
    return this.query(this.buildURLCommand(this.commands.validate), function (data) {
      // Returned valid data looks like: 
      // <CGI_Result>
      //  <result>-1</result>
      // </CGI_Result>
      var parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");
      if (xmlDoc.getElementsByTagName("result")[0].childNodes[0].nodeValue == -1) {
        return true;
      } 
    });    
  } 

  /**
   * Utility function to build the URL to the image snap shot.
   */
  this.snap = function() {
    return this.buildURLCommand(this.commands.snap);
  }

  /**
   * Activate fetching new images from the camera.
   */
  this.activate = function () {
    if (typeof this.stop == 'undefined') {
      setTimeout(function () {
        self.imageReload();
      }, 1000) 
    }
  }

  /**
   * Reload images from the camera.
   *
   * Uses a time stamp to invalidate the browser cache.
   */
  this.imageReload = function () {
    var date = new Date(); 
    document.getElementById(this.settings.id).src = this.snap() + "&t=" + Math.floor(date.getTime()/1000);
    this.activate();
  }

  /**
   * Issue a move request to the camera.
   *
   * Note that the camera movement does not stop until a stop request is made.
   *
   * @param string direction
   *   left, right, up, down, stop
   */
  this.move = function (direction) {
    var command = this.commands.move[direction];
    this.query(this.buildURLCommand(command));
  }

  /**
   * Create a URL to the RTSP stream
   *
   * @param string type
   *   videoMain, videoSub, audio
   */
  this.buildRTSPURL = function (type) {
    if (typeof type == 'undefined') {
      type = 'videoSub';
    }

    // If the URL of the camera doesn't have a port, add one.

    return "rtsp://" + this.settings.cameraUser + ':' + this.settings.cameraPassword + '@' + this.settings.cameraURL + '/' + type;
  }


  return this;

};
