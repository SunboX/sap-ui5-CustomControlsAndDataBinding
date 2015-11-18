sap.m.Panel.extend('app.controls.ShoppingCartFooter', {
	metadata: {
		properties: {
			height: { type: 'sap.ui.core.CSSSize', group: 'Appearance', defaultValue: 'auto' },
			backgroundDesign: { type: 'sap.m.BackgroundDesign', group: 'Appearance', defaultValue: sap.m.BackgroundDesign.Solid },
			totalPrice: { type: 'string', group: 'Misc', defaultValue: null }
		}
	}
});