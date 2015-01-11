enyo.kind({
	name: "Webcam.WebcamAdd",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onCameraAdd": "",
		"onCameraAddCancel": "",
	},
	components:[
  	{name: "addCamera", kind: "RowGroup", caption: "Camera information", showing: false, components: [
      {name: "cameraTitle", kind: "Input", flex: 1, caption: 'Camera name', hint: "Name this camera", value: "Bubba"},
			{name: "cameraURL", kind: "Input", flex: 1, caption: 'Camera IP', hint: "IP of the camera", value: "10.0.1.100"},
			{name: "cameraUser", kind: "Input", flex: 1, caption: 'User', hint: "User name", value: "arthur"},
			{name: "cameraPassword", kind: "PasswordInput", flex: 1, caption: 'Password', hint: "User's password", value: "dingus"},
      {layoutKind: "HFlexLayout", pack: "center", components: [
			  {name: "cameraCancel", kind: "ActivityButton", caption: "Cancel", onclick: "doCameraCreateCancel", className: "enyo-button"},
        {name: "cameraGet", kind: "ActivityButton", caption: "Save", onclick: "doCameraCreate", className: "enyo-button-dark"}
      ]}
    ]}
	]
});
