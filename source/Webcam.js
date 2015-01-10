var camera;

enyo.kind({
	name: "Webcam",
	kind: enyo.VFlexBox,
	components: [
		{kind: "PageHeader", components: [
			{content: "Foscam IP camera"}
		]},
		{name: "cameraSettings", kind: "RowGroup", caption: "Camera information", components: [
      {name: "cameraName", kind: "Input", flex: 1, caption: 'Camera name', hint: "Name this camera", value: ""},
			{name: "cameraURL", kind: "Input", flex: 1, caption: 'Camera IP', hint: "IP of the camera", value: ""},
			{name: "cameraUser", kind: "Input", flex: 1, caption: 'User', hint: "User name", value: ""},
			{name: "cameraPassword", kind: "PasswordInput", flex: 1, caption: 'Password', hint: "User's password", value: ""},
			{name: "cameraGet", kind: "ActivityButton", caption: "load", onclick: "cameraConnect", className: "enyo-button-dark"}
    ]},

    {name: "cameraControls", kind: "Toolbar", showing: false, components: [
      {kind: "ToolButtonGroup", components: [
        {name: "cameraLeft", kind: "Button", caption: "Left", move: 'left', onmousedown: "cameraMove", onmouseup: "cameraStop"},
        {name: "cameraUp", kind: "Button", caption: "Up", move: 'up', onmousedown: "cameraMove", onmouseup: "cameraStop"},
        {name: "cameraDown", kind: "Button", caption: "Down", move: 'down', onmousedown: "cameraMove", onmouseup: "cameraStop"},
        {name: "cameraRight", kind: "Button", caption: "Right", move: 'right', onmousedown: "cameraMove", onmouseup: "cameraStop"}
      ]}
    ]},

    {kind: "Image", src: "", style: "min-width:320px; max-width: 100%"}

  ],

	cameraConnect: function() {
    var settings = {
      'cameraURL': this.$.cameraURL.getValue(),
      'cameraUser': this.$.cameraUser.getValue(),
      'cameraPassword': this.$.cameraPassword.getValue(),
      'id': 'webcam_image'
    }

    // Check to see if we got a valid camera image?
    camera = new Camera(settings);

    // Set a spinner.

    if (camera.validate()) {

      // Remove spinner

      camera.activate();

      // Hide the settings.
      this.$.cameraSettings.setShowing(false);
      // Show the controls.
      this.$.cameraControls.setShowing(true);
    }
    else {
      // validation error
    }

	},

  cameraMove: function (inSender, inEvent) {
    camera.move(inSender.move);
  },
  cameraStop: function () {
    camera.move('stop');
  }

  });
