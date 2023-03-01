<template>
	<div>
		<el-form-item label="开启序列">
			<el-switch v-model="curComponent.propValue.index"></el-switch>
		</el-form-item>
		<el-form-item label="序列行宽">
			<el-input-number v-model="curComponent.propValue.indexWidth" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
		<el-form-item label="边框">
			<el-switch v-model="curComponent.propValue.border"></el-switch>
		</el-form-item>
		<el-collapse accordion>
			<el-collapse-item title="表头设置">
				<el-form-item label="显示">
					<el-switch v-model="curComponent.propValue.showHeader"></el-switch>
				</el-form-item>
				<el-form-item label="字体大小">
					<el-input-number v-model="curComponent.propValue.headerFontSize" :min="0" :precision="0" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="背景颜色">
					<el-color-picker v-model="curComponent.propValue.headerBackground" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="字体颜色">
					<el-color-picker v-model="curComponent.propValue.headerColor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="对其方式">
					<el-select v-model="curComponent.propValue.headerTextAlign">
						<el-option v-for="item in textAlignOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-collapse-item>
			<el-collapse-item title="表格设置">
				<el-form-item label="显示行数">
					<el-input-number v-model="curComponent.propValue.count" :min="0" :precision="0" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="字体大小">
					<el-input-number v-model="curComponent.propValue.bodyFontSize" :min="0" :precision="0" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="对其方式">
					<el-select v-model="curComponent.propValue.bodyTextAlign">
						<el-option v-for="item in textAlignOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="文字颜色">
					<el-color-picker v-model="curComponent.propValue.bodyColor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="奇行颜色">
					<el-color-picker v-model="curComponent.propValue.othColor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="偶行颜色">
					<el-color-picker v-model="curComponent.propValue.nthColor" show-alpha></el-color-picker>
				</el-form-item>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
import { textAlignOptions } from '@/utils/style';

export default {
	name: 'WTable',
	data() {
		return {
			textAlignOptions,
		};
	},
	computed: {
		curComponent() {
			return this.$store.state.curComponent;
		},
	},
};
</script>
