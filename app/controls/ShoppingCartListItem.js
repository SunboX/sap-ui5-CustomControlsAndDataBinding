$.sap.require('sap.m.ListType');

sap.m.ListItemBase.extend('app.controls.ShoppingCartListItem', {
	metadata: {
		properties: {
			type: { type: 'sap.m.ListType', group: 'Misc', defaultValue: sap.m.ListType.Navigation },
			count: { type: 'int', group: 'Misc', defaultValue: null },
			countWidth: { type: 'sap.ui.core.CSSSize', group: 'Dimension', defaultValue: '2rem' },
			title: { type: 'string', group: 'Misc', defaultValue: null },
			price: { type: 'string', group: 'Misc', defaultValue: null },
			priceWidth: { type: 'sap.ui.core.CSSSize', group: 'Dimension', defaultValue: '5rem' }
		}
	}
});