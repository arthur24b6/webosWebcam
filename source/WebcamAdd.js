enyo.kind({
	name: "Webcam.WebcamAdd",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onCameraAdd": "",
		"onCameraAddCancel": "",
	},
	components:[
    {kind: "PageHeader", name: "header", content: "Add camera"},
  	{name: "addCamera", kind: "RowGroup", caption: "Camera information",  components: [
      {name: "cameraTitle", kind: "Input", flex: 1, caption: 'Camera name', hint: "Name this camera", value: ""},
			{name: "cameraURL", kind: "Input", flex: 1, caption: 'Camera IP', hint: "IP of the camera", value: ""},
			{name: "cameraUser", kind: "Input", flex: 1, caption: 'User', hint: "User name", value: ""},
			{name: "cameraPassword", kind: "PasswordInput", flex: 1, caption: 'Password', hint: "User's password", value: ""},
      {layoutKind: "HFlexLayout", pack: "center", components: [
			  {name: "cameraCancel", kind: "ActivityButton", caption: "Cancel", onclick: "doCameraAddCancel", className: "enyo-button"},
        {name: "cameraGet", kind: "ActivityButton", caption: "Save", index: '', onclick: "doCameraAdd", className: "enyo-button-dark"}
      ]}
    ]}
	],
});
