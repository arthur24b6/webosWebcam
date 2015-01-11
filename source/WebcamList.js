enyo.kind({
	name: "Webcam.WebcamList",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,

	events: {
		"onWebcamListTap": "",
		"onNewFeedTap": "",
		"onOpenCameraAdd": ""
	},
	components:[
    {kind: enyo.VirtualRepeater, name: "webcamList", onSetupRow: "getWebcamList", onclick: "doWebcamListTap", components: [
      {kind: enyo.SwipeableItem, onConfirm: "doDeleteWebcam", layoutKind: enyo.HFlexLayout, tapHighlight: true, components: [
        {name: "webcamItemTitle", kind: "Button", caption: ""},
        {name: "webcamItemEdit", content: ""},
        {name: "webcamItemActive", content: ""}
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
