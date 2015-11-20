sap.ui.define([
	'sap/ui/model/json/JSONModel'
], function (JSONModel) {
	'use strict';

	return JSONModel.extend('app.model.JSONModelWithListProperty', {

		appendToList: function (property, itemToAppend) {
			var arr = this.getProperty(property);
			if ($.isArray(arr)) {
				arr.push(itemToAppend);
			}
			this.setProperty(property, arr);
			return this;
		}
	});

});