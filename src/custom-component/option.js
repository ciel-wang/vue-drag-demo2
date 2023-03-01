let components = {};
const requireComponent = require.context('.', true, /\w+.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
	if (fileName.includes('option.vue')) {
		const cmp = requireComponent(fileName).default;
		components[`${cmp.name}` + 'Option'] = cmp;
	}
});
export default {
	components: components,
};
