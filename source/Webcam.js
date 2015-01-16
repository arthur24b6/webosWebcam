enyo.kind({
	name: "Webcam",
	kind: enyo.VFlexBox,
	components: [

    {kind: enyo.box, name: "webcamListContainer", components: [
      {name: "webcamListPane", kind: "Webcam.WebcamList", onCameraOpen: "cameraOpen", onCameraDelete: "cameraDelete", onOpenCameraAdd: "openCameraAdd", onOpenCameraEdit: "openCameraEdit", onCameraSetDefault: "cameraSetDefault"}
    ]},

    {kind: enyo.box, name: "webcamAddContainer", showing: false, components: [
      {name: "webcamAddPane", kind: "Webcam.WebcamAdd", onCameraAdd: "cameraAdd", onCameraAddCancel: "cameraAddCancel"}
    ]},

    {kind: enyo.box, name: 'webcamContainer', showing: false, components: [
      {kind: enyo.Toolbar, pack: "justify", components: [
        {kind: "ToolButtonGroup", components: [
          {name: "cameraLeft", kind: "IconButton", icon: 'assets/icons/left.png', move: 'left', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraUp", kind: "IconButton", icon: 'assets/icons/up.png', move: 'up', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraDown", kind: "IconButton", icon: 'assets/icons/down.png', move: 'down', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "cameraRight", kind: "IconButton", icon: 'assets/icons/right.png', move: 'right', onmousedown: "cameraMove", onmouseup: "cameraStop"},
          {name: "return", kind: "IconButton", icon: 'assets/icons/list.png', align: "right", onclick: "cameraClose"}
        ]}
      ]},
      {kind: "Image", src: "", style: "min-width:320px; max-width: 100%"}
    ]}

  ],

	ready: function() {
    this.camera = {};
    this.cameraOn = false;

    enyo.setAllowedOrientation('up');

		this.webcamList = localStorage.getItem("webcamList");
		if (this.webcamList == undefined) {
			this.webcamList = [];
		}
    else {
			this.webcamList = JSON.parse(this.webcamList);

      // Open a camera that is set as the default.
      for (var index in this.webcamList) {
        if (this.webcamList[index].cameraDefault) {
          this.cameraLaunch(this.webcamList[index]);
        }
      }

      // No default camera, show the list.
      if (! this.cameraOn) {
			  this.$.webcamListPane.$.webcamList.render();
      }

		}
	},

	saveWebcamListList: function() {
		localStorage.setItem("webcamList", JSON.stringify(this.webcamList));
	},

  /**
   * UI request to open a camera.
   */
  cameraOpen: function (inSender, inEvent) {
    var settings = this.webcamList[inEvent.rowIndex];
    this.cameraLaunch(settings);
  },

  /**
   * Launch camera.
   */
  cameraLaunch: function(settings) {
    this.camera = new Camera(settings);
    this.camera.activate();
    this.$.webcamContainer.setShowing(true);
    this.$.webcamListContainer.setShowing(false);
    this.cameraOn = true;
  },

  /**
   * Destroy the currently displayed camera.
   */
  cameraClose: function() {
    this.$.webcamContainer.setShowing(false);
    this.$.webcamListContainer.setShowing(true);
    this.camera = "";
    this.cameraOn = false;
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

    this.camera = new Camera(settings);

    // @TODO Set a spinner.

    if (this.camera.validate()) {
      // Updating existing camera.
      if (this.$.webcamAddPane.$.cameraGet.getCaption() == 'Update') {
        var index = this.$.webcamAddPane.$.cameraGet.getContent();
        this.webcamList[index] = settings;
      }
      // Save new camera.
      else {
        this.webcamList.push(settings);
      }

      this.saveWebcamListList();
      this.$.webcamListContainer.setShowing(true);
      this.$.webcamAddContainer.setShowing(false);
      this.$.webcamListPane.$.webcamList.render();
    }
    else {
      // ERROR, cancel
      alert('Camera error');
      this.cameraAddCancel();
    }
  },

  /**
   * Close the camera add/edit interface.
   */
  cameraAddCancel: function () {
    // @TODO clear data from form?
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
    this.$.webcamAddPane.$.cameraPassword.setValue(settings.cameraPassword);

    this.$.webcamAddPane.$.header.setContent('Edit: ' + settings.cameraTitle);
    this.$.webcamAddPane.$.cameraGet.setCaption('Update');

    this.$.webcamAddPane.$.cameraGet.setContent(inEvent.rowIndex);
  },

  /**
   * Delete a camera from the list.
   */
  cameraDelete: function (inSender, value) {
    this.webcamList.splice(value, 1);
    this.saveWebcamListList();
    // Rerender the list of cameras.
    this.$.webcamListPane.$.webcamList.render();
  },

  /**
   * Make the selected camera the default for the application.
   */
  cameraSetDefault: function (inSender, inEvent) {
    for (var index in this.webcamList) {
      this.webcamList[index].cameraDefault = false;
    }

    this.webcamList[inEvent.rowIndex].cameraDefault = true;

    this.saveWebcamListList();

    // Rerender the list of cameras.
    this.$.webcamListPane.$.webcamList.render();
  }



  });
