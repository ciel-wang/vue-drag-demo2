<template>
	<el-table
		class="w_table"
		ref="table"
		:data="propValue.data"
		:height="element.style.height"
		:border="propValue.border"
		:cellStyle="cellStyle"
		:row-style="rowStyle"
		:show-header="propValue.showHeader"
		:header-row-style="headerRowStyle"
		:header-cell-style="headerCellStyle"
	>
		<el-table-column
			type="index"
			label="序号"
			header-align="center"
			align="center"
			v-if="propValue.index"
			:width="propValue.indexWidth || 70"
		>
			<span slot-scope="{ $index }">{{ $index + 1 }}</span>
		</el-table-column>
		<template v-for="(item, index) in propValue.column">
			<el-table-column
				v-if="item.hide !== true"
				show-overflow-tooltip
				:key="index"
				:prop="item.prop"
				:label="item.label"
				:width="item.width"
			>
			</el-table-column>
		</template>
	</el-table>
</template>
<script>
export default {
	name: 'WTable',
	props: {
		propValue: {
			type: Object,
			default: {},
		},
		element: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
			headerHeight: '',
		};
	},
	created() {
		this.$nextTick(() => {
			this.headerHeight = parseInt(this.$refs.table.$refs.headerWrapper.clientHeight);
		});
	},
	computed: {
		cellHeight() {
			return parseInt((this.element.style.height - this.headerHeight) / this.propValue.count);
		},
	},
	methods: {
		cellStyle({ column, rowIndex }) {
			return {
				padding: 0,
				height: this.cellHeight + 'px',
				fontSize: this.propValue.bodyFontSize + 'px',
				color: this.propValue.bodyColor,
				textAlign: column.type == 'index' ? 'center' : this.propValue.bodyTextAlign,
				backgroundColor: rowIndex % 2 == 0 ? this.propValue.othColor : this.propValue.nthColor,
			};
		},
		rowStyle() {
			return {
				backgroundColor: 'transparent',
			};
		},
		headerRowStyle() {
			return {
				backgroundColor: this.propValue.headerBackground,
			};
		},
		headerCellStyle({ column }) {
			return {
				fontSize: this.propValue.headerFontSize + 'px',
				backgroundColor: this.propValue.headerBackground,
				color: this.propValue.headerColor,
				textAlign: column.type == 'index' ? 'center' : this.propValue.headerTextAlign,
			};
		},
	},
};
</script>
<style lang="scss" scoped>
/deep/.el-table__body-wrapper {
	height: 100% !important;
	.el-table td.el-table__cell div {
		line-height: 100% !important;
	}
}
.el-table th.el-table__cell > .cell {
	line-height: 100% !important;
}
.w_table {
	background-color: transparent !important;
}
</style>
