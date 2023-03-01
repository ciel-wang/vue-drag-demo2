<template>
	<div
		class="w_edit"
		:style="{
			...setStyleUnit(canvasStyleData, ['width', 'height', 'scale']),
			width: canvasStyleData.width + 'px',
			height: canvasStyleData.height + 'px',
			backgroundImage: `url(${canvasStyleData.backgroundImg})`,
			backgroundColor: canvasStyleData.backgroundColor,
		}"
	>
		<div v-for="(item, index) in componentData" :key="index" :style="setStyleUnit(item.style)">
			<component
				:is="item.component"
				:id="'component' + item.id"
				:propValue="item.propValue"
				:element="item"
				:style="setStyleUnit(item.style, ['width', 'height', 'top', 'left', 'rotate'])"
			>
			</component>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import components from '@/custom-component/index.js';
import { setStyleUnit } from '@/utils/style';

export default {
	name: 'Test',
	mixins: [components],
	data() {
		return {};
	},
	created() {
		let obj = {
			data: [
				{ id: 1, name: 'zhangsan', cname: '会议1', time: '2023-02-22 12:30:00' },
				{ id: 2, name: 'zhangsan', cname: '会议2', time: '2023-02-22 13:30:00' },
				{ id: 3, name: 'zhangsan', cname: '会议3', time: '2023-02-22 14:30:00' },
				{ id: 4, name: 'zhangsan', cname: '会议4', time: '2023-02-22 15:30:00' },
				{ id: 5, name: 'zhangsan', cname: '会议5', time: '2023-02-22 16:30:00' },
			],
		};
		if (localStorage.getItem('formdata')) {
			let data = JSON.parse(localStorage.getItem('formdata'));
			// data.canvasData.forEach(v => {
			//   if(v.)
			// });

			this.$store.commit('setComponentData', data.canvasData);
			this.$store.commit('setCanvasStyle', data.canvasStyle);
		}
	},
	methods: {
		setStyleUnit,
	},
	computed: mapState(['canvasStyleData', 'componentData']),
};
</script>

<style lang="scss">
.w_edit {
	position: relative;
	margin: auto;
	& > div {
		position: absolute;
	}
}
</style>
