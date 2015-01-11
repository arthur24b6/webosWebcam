var camera;

enyo.kind({
	name: "Webcam",
	kind: enyo.VFlexBox,
	components: [
		{kind: "PageHeader", components: [
			{content: "Web Cameras"}
		]},

    {name: "webcamListPane", kind: "Webcam.WebcamList", onWebcamListTap: "cameraLaunch", onDeleteFeed: "deleteWebCam", onOpenCameraAdd: "openCameraAdd", showing: true},

    {name: "webcamAddPane", kind: "Webcam.WebcamAdd", onCameraAdd: "cameraAdd", onCameraAddCancel: "cameraAddCancel", showing: false},

    {kind: enyo.box, name: 'webcamContainer', components: [
      {name: "cameraControls", kind: "Toolbar", showing: false, components: [
        {kind: "ToolButtonGroup", components: [
          {name: "cameraLeft", kind: "Button", caption: "Left", move: 'left', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraUp", kind: "Button", caption: "Up", move: 'up', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraDown", kind: "Button", caption: "Down", move: 'down', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraRight", kind: "Button", caption: "Right", move: 'right', onmousedown: "cameraMove", onmouseup: "cameraStop"}
        ]}
      ]},

      {kind: "Image", src: "", style: "min-width:320px; max-width: 100%"}
    ]}

  ],

	ready: function() {
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

  cameraLaunch: function (inSender, inEvent) {
    // Get camera settings.
    var settings = this.webcamList[inEvent.rowIndex];
    camera = new Camera(settings);
    camera.activate();

    this.$.webcamContainer.setShowing(true);
    //console.log(this.$.webcamListPane);
    this.$.webcamListPane.showing= false;
  },

  openCameraAdd: function() {
    this.$.webcamListPane.setShowing(false);
    this.$.webcamAddPane.setShowing(true);
  },

  cameraAdd: function() {
    var settings = {
      cameraTitle : this.$.cameraTitle.getValue(),
      cameraURL: this.$.cameraURL.getValue(),
      cameraUser: this.$.cameraUser.getValue(),
      cameraPassword: this.$.cameraPassword.getValue(),
      id: 'webcam_image'
    };

    // Check to see if we got a valid camera image?
    camera = new Camera(settings);

    // Set a spinner.

    if (camera.validate()) {
      this.webcamList.push(settings);
      this.saveWebcamListList();
      this.$.webcamListContainer.setShowing(true);
      this.$.addCamera.setShowing(false);
    }
    else {
      // ERROR, cancel
    }

    // Close, return to list.
  },

  cameraAddCancel: function () {
    // @TODO clear data from form.
    this.$.webcamListContainer.setShowing(true);
    this.$.webcamAddPane.setShowing(false);
  },


  cameraMove: function (inSender, inEvent) {
    camera.move(inSender.move);
  },
  cameraStop: function () {
    camera.move('stop');
  }


  });
