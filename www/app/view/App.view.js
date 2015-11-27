jQuery.sap.require('sap.m.App');

sap.ui.jsview('app.view.App', {

    createContent: function () {
        return new sap.m.App('appView', {});
    }
});
