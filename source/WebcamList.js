enyo.kind({
	name: "Webcam.WebcamList",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,

	events: {
		"onOpenCameraAdd": "",
    "onOpenCameraEdit": "",
    "onCameraOpen": "",
    "onCameraDelete": "",
    "onCameraSetDefault": ""
	},

	components:[
    {kind: "PageHeader", name: "header", content: "Web cameras"},
    {kind: enyo.VirtualRepeater, name: "webcamList", onSetupRow: "getWebcamList", components: [
      {kind: enyo.SwipeableItem, onConfirm: "doCameraDelete", layoutKind: enyo.HFlexLayout, tapHighlight: true, components: [
        {name: "webcamItemTitle", kind: "Button", onclick: "doCameraOpen"},
        {name: "webcamItemEdit", kind: "Button", content: "Edit", onclick: "doOpenCameraEdit"},
        {name: "webcamItemDefault", kind: "Button", content: "Make default", onclick: "doCameraSetDefault"},
        {name: "webcamItemStatus", kind: "ToggleButton", content: "Status", disabled: true, onLabel: "Active", offLabel: "Offline",}
      ]}
    ]},

    {kind: enyo.Toolbar, name: "add", pack: "justify", components: [
      {flex: 1},
      {icon: "images/menu-icon-new.png", onclick: "doOpenCameraAdd", align: "right"}
    ]}
  ],

	getWebcamList: function(inSender, inIndex) {
		var settings = this.owner.webcamList[inIndex];
		if (settings) {

			this.$.webcamItemTitle.setContent(settings.cameraTitle);

      if (settings.cameraDefault) {
        this.$.webcamItemDefault.setContent('Default camera');
      }

      var camera = new Camera(settings);
      if (camera.validate()) {
        this.$.webcamItemStatus.setState(true);

      }
      else {
        this.$.webcamItemStatus.setState(false);
      }

			return true;
		}
	}

});
