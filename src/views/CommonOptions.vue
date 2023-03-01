<template>
	<div>
		<el-form-item v-for="({ key, label }, index) in styleKeys" :key="index" :label="label">
			<el-color-picker v-if="isIncludesColor(key)" v-model="curComponent.style[key]" show-alpha></el-color-picker>
			<el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
				<el-option v-for="item in optionMap[key]" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input-number v-else v-model="curComponent.style[key]" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
	</div>
</template>
<script>
import { styleData, textAlignOptions, borderStyleOptions, verticalAlignOptions, selectKey, optionMap } from '@/utils/style';

export default {
	data() {
		return {
			optionMap,
			styleData,
			textAlignOptions,
			borderStyleOptions,
			verticalAlignOptions,
			selectKey,
		};
	},
	computed: {
		styleKeys() {
			if (this.curComponent) {
				const curComponentStyleKeys = Object.keys(this.curComponent.style);
				return this.styleData.filter((item) => curComponentStyleKeys.includes(item.key));
			}
			return [];
		},
		curComponent() {
			return this.$store.state.curComponent;
		},
	},
	methods: {
		isIncludesColor(str) {
			return str.toLowerCase().includes('color');
		},
	},
};
</script>
