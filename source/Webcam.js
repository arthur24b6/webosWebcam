enyo.kind({
	name: "Webcam",
	kind: enyo.VFlexBox,
	components: [

    {kind: enyo.box, name: "webcamListContainer", components: [
      {name: "webcamListPane", kind: "Webcam.WebcamList", onCameraOpen: "cameraOpen", onCameraDelete: "cameraDelete", onOpenCameraAdd: "openCameraAdd", onOpenCameraEdit: "openCameraEdit"}
    ]},

    {kind: enyo.box, name: "webcamAddContainer", showing: false, components: [
      {name: "webcamAddPane", kind: "Webcam.WebcamAdd", onCameraAdd: "cameraAdd", onCameraAddCancel: "cameraAddCancel"},
    ]},

    {kind: enyo.box, name: 'webcamContainer', showing: false, components: [
      {kind: enyo.Toolbar, pack: "justify", components: [
        {kind: "ToolButtonGroup", components: [
          {name: "cameraLeft", kind: "Button", caption: "Left", move: 'left', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraUp", kind: "Button", caption: "Up", move: 'up', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraDown", kind: "Button", caption: "Down", move: 'down', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraRight", kind: "Button", caption: "Right", move: 'right', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {flex: 1},
          {name: "return", kind: "Button", caption: "Cameras", align: "right", onclick: "cameraClose"}
        ]}
      ]},
      {kind: "Image", src: "", style: "min-width:320px; max-width: 100%"}
    ]}

  ],

	ready: function() {
    this.camera = {};

    enyo.setAllowedOrientation('up');
		this.webcamList = localStorage.getItem("webcamList");
		if (this.webcamList == undefined) {
			this.webcamList = [];
		}
    else {
			this.webcamList = JSON.parse(this.webcamList);
			this.$.webcamListPane.$.webcamList.render();
		}
	},

	saveWebcamListList: function() {
		localStorage.setItem("webcamList", JSON.stringify(this.webcamList));
	},

  /**
   * Display a webcam feed.
   */
  cameraOpen: function (inSender, inEvent) {
    // Get camera settings.
    var settings = this.webcamList[inEvent.rowIndex];
    this.camera = new Camera(settings);
    this.camera.activate();
    this.$.webcamContainer.setShowing(true);
    this.$.webcamListPane.$.webcamList.setShowing(false);
  },

  /**
   * Destroy the currently displayed camera.
   */
  cameraClose: function() {
    this.$.webcamContainer.setShowing(false);
    this.$.webcamListContainer.setShowing(true);
    this.camera = "";
  },

  /**
   * Open the add camera interface.
   */
  openCameraAdd: function() {
    this.$.webcamAddContainer.setShowing(true);
    this.$.webcamAddPane.$.header.setContent('Add camera');
    this.$.webcamListContainer.setShowing(false);
  },

  /**
   * Add a new camera.
   */
  cameraAdd: function() {
    var settings = {
      cameraTitle : this.$.webcamAddPane.$.cameraTitle.getValue(),
      cameraURL: this.$.webcamAddPane.$.cameraURL.getValue(),
      cameraUser: this.$.webcamAddPane.$.cameraUser.getValue(),
      cameraPassword: this.$.webcamAddPane.$.cameraPassword.getValue(),
      id: 'webcam_image'
    };
console.log(settings);
    // Check to see if we got a valid camera image?
    this.camera = new Camera(settings);

    // Set a spinner.

    if (this.camera.validate()) {

     if (this.$.webcamAddPane.$.cameraGet.getCaption() == 'Update') {
       var index = this.$.webcamAddPane.$.cameraGet.getContent();
       this.webcamList[index] = settings;
     }
     else {
      this.webcamList.push(settings);
    }
      this.saveWebcamListList();
      this.$.webcamListContainer.setShowing(true);
      this.$.addCamera.setShowing(false);
    }
    else {
      // ERROR, cancel
      alert('Camera error');
    }

    // Close, return to list.
  },

  /**
   * Close the camera add/edit interface.
   */
  cameraAddCancel: function () {
    // @TODO clear data from form.
    this.$.webcamListContainer.setShowing(true);
    this.$.webcamAddContainer.setShowing(false);
  },


  cameraMove: function (inSender, inEvent) {
    this.camera.move(inSender.move);
  },

  cameraStop: function () {
    this.camera.move('stop');
  },

  /**
   * Edit an existing camera.
   */
  openCameraEdit: function(inSender, inEvent) {
    this.$.webcamListContainer.setShowing(false);
    this.$.webcamAddContainer.setShowing(true);

    var settings = this.webcamList[inEvent.rowIndex];
    this.$.webcamAddPane.$.cameraTitle.setValue(settings.cameraTitle);
    this.$.webcamAddPane.$.cameraURL.setValue(settings.cameraURL);
    this.$.webcamAddPane.$.cameraUser.setValue(settings.cameraUser);
    this.$.webcamAddPane.$.cameraPassword.setValue(settings.password);

    this.$.webcamAddPane.$.header.setContent('Edit: ' + settings.cameraTitle);
    this.$.webcamAddPane.$.cameraGet.setCaption('Update');

    this.$.webcamAddPane.$.cameraGet.setContent(inEvent.rowIndex);
  },

  /**
   * Delete a camera from the list.
   */
  cameraDelete: function (inSender, inEvent) {
    this.webcamList.splice(inEvent.index, 1);
    this.saveWebcamListList();
    // Rerender the list of cameras.
    this.$.webcamListPane.$.webcamList.render();
  }



  });
