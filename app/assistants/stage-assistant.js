function StageAssistant() {
    /* this is the creator function for your stage assistant object */
}
 
<span class="skimlinks-unlinked">StageAssistant.prototype.setup</span> = function() {
    /* this function is for setup tasks that have to happen when the stage is first created */
    Mojo.Controller.stageController.pushScene("first");
};