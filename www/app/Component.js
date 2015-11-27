sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/m/routing/Router',
	'sap/ui/model/resource/ResourceModel',
	'sap/ui/model/json/JSONModel'
], function (
	UIComponent,
	Router,
	ResourceModel,
	JSONModel
) {
	return UIComponent.extend('app.Component', {

		metadata: {
			includes: ['css/app.css'],
			routing: {
				config: {
					viewType: 'JS',
					viewPath: 'app.view',
					targetControl: 'appView',
					targetAggregation: 'pages',
					transition: 'slide'
				},
				routes: [
					{
						pattern: '',
						name: 'main',
						view: 'Main'
					}
				]
			}
		},

		init: function () {

			// call overwritten init (calls createContent)
			UIComponent.prototype.init.apply(this, arguments);

			// initialize the router
			this.getRouter().initialize();
		},

		createContent: function () {

			// create root view
			return sap.ui.view({
				viewName: 'app.view.App',
				type: 'JS'
			});
		}
	});

});
