let components = {};
const requireComponent = require.context('.', true, /\w+.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
	if (fileName.includes('index.vue')) {
		const cmp = requireComponent(fileName).default;
		components[`${cmp.name}`] = cmp;
	}
});
export default {
	components: components,
};
