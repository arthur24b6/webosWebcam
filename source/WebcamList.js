enyo.kind({
	name: "Webcam.WebcamList",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,

	events: {
		"onOpenCameraAdd": "",
    "onOpenCameraEdit": "",
    "onCameraOpen": "",
    "onCameraDelete": ""
	},

	components:[
    {kind: "PageHeader", name: "header", content: "Web cameras"},
    {kind: enyo.VirtualRepeater, name: "webcamList", onSetupRow: "getWebcamList", components: [
      {kind: enyo.SwipeableItem, onConfirm: "doCameraDelete", layoutKind: enyo.HFlexLayout, tapHighlight: true, components: [
        {name: "webcamItemTitle", kind: "Button", onclick: "doCameraOpen"},
        {name: "webcamItemEdit", kind: "Button", content: "Edit", onclick: "doOpenCameraEdit"},
        {name: "webcamItemActive", kind: "IconButton", content: "Active"}
      ]}
    ]},

    {kind: enyo.Toolbar, pack: "justify", components: [
      {flex: 1},
      {icon: "images/menu-icon-new.png", onclick: "doOpenCameraAdd", align: "right"}
    ]}
  ],

	getWebcamList: function(inSender, inIndex) {
		var r = this.owner.webcamList[inIndex];
		if (r) {
			this.$.webcamItemTitle.setContent(r.cameraTitle);
      //this.$.webcamItemTitle.setValue(inIndex);

      /// @TODO instantitate camera, check connection.
			return true;
		}
	}

});
