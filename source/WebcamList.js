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
        {flex: 1},
        {name: "webcamItemEdit", kind: "IconButton", icon: 'assets/icons/settings.png', onclick: "doOpenCameraEdit"},
        {name: "webcamItemDefault", kind: "IconButton", icon: 'assets/icons/default_off.png', onclick: "doCameraSetDefault"},
        {name: "webcamItemStatus", kind: "Image", src: "assets/icons/off.png"}
      ]}
    ]},

    {kind: enyo.Toolbar, name: "add", pack: "justify", components: [
      {flex: 1},
      {icon: "assets/icons/add.png", onclick: "doOpenCameraAdd", align: "right"}
    ]}
  ],

	getWebcamList: function(inSender, inIndex) {
		var settings = this.owner.webcamList[inIndex];
		if (settings) {

			this.$.webcamItemTitle.setContent(settings.cameraTitle);

      if (settings.cameraDefault) {
        this.$.webcamItemDefault.setIcon('assets/icons/default.png');
      }

      var camera = new Camera(settings);
      if (camera.validate()) {
        this.$.webcamItemStatus.setSrc("assets/icons/on.png");

      }
      else {
        this.$.webcamItemStatus.setState(false);
      }

			return true;
		}
	}

});
