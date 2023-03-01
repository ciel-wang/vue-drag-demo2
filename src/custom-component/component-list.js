// 公共样式
export const commonStyle = {
	rotate: 0,
	opacity: 1,
};

export const commonAttr = {
	animations: [],
	events: {},
	groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
	isLock: false, // 是否锁定组件
	collapseName: 'style', // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
	linkage: {
		duration: 0, // 过渡持续时间
		data: [
			// 组件联动
			{
				id: '', // 联动的组件 id
				label: '', // 联动的组件名称
				event: '', // 监听事件
				style: [{ key: '', value: '' }], // 监听的事件触发时，需要改变的属性
			},
		],
	},
};

// 编辑器左侧组件列表
const list = [
	{
		component: 'WText',
		label: '文本',
		propValue: '文本',
		icon: 'icon-wenben',
		request: {
			method: 'GET',
			data: [],
			url: '',
			series: false, // 是否定时发送请求
			time: 1000, // 定时更新时间
			paramType: '', // string object array
			requestCount: 0, // 请求次数限制，0 为无限
		},
		style: {
			width: 200,
			height: 28,
			fontSize: 14,
			fontWeight: 400,
			lineHeight: 28,
			letterSpacing: 1,
			textAlign: '',
			color: '',
		},
	},
	{
		component: 'WButton',
		label: '按钮',
		propValue: '按钮',
		icon: 'icon-anniu',
		style: {
			width: 100,
			height: 34,
			borderWidth: 1,
			borderColor: '',
			borderRadius: 6,
			fontSize: 14,
			fontWeight: 400,
			textAlign: 'center',
			lineHeight: 34,
			letterSpacing: 0,
			color: '',
			backgroundColor: '',
		},
	},
	{
		component: 'WImg',
		label: '图片',
		icon: 'icon-tupian',
		propValue: {
			img: '/assets/logo.png',
			action: 'https://jsonplaceholder.typicode.com/posts/',
		},
		style: {
			width: 100,
			height: 100,
			borderRadius: '',
		},
	},
	{
		component: 'WTable',
		label: '表格',
		icon: 'icon-biaoge',
		propValue: {
			data: [
				{ type1: '数据1', type2: '数据1', type3: '数据1', type4: '数据1' },
				{ type1: '数据2', type2: '数据2', type3: '数据2', type4: '数据2' },
				{ type1: '数据3', type2: '数据3', type3: '数据3', type4: '数据3' },
				{ type1: '数据4', type2: '数据4', type3: '数据4', type4: '数据4' },
			],
			index: true,
			border: false,
			showHeader: true,
			headerFontSize: 14,
			headerBackground: 'rgba(8, 90, 111, 0.8)',
			headerColor: 'rgba(154, 168, 212, 1)',
			headerTextAlign: 'center',
			othColor: 'rgba(14, 86, 241, 0.08)',
			nthColor: 'rgba(14, 86, 241, 0.08)',
			bodyFontSize: 12,
			bodyBackground: 'rgba(0, 0, 0, 0.01)',
			bodyColor: 'rgba(154, 168, 212, 1)',
			bodyTextAlign: 'center',
			scrollSpeed: 1,
			count: 4,
			column: [
				{ label: '列1', prop: 'type1' },
				{ label: '列2', prop: 'type2' },
				{ label: '列3', prop: 'type3' },
				{ label: '列4', prop: 'type4' },
			],
		},
		request: {
			method: 'GET',
			data: [],
			url: '',
			series: false,
			time: 1000,
			paramType: '', // string object array
			requestCount: 0, // 请求次数限制，0 为无限
		},
		style: {
			width: 600,
			height: 200,
		},
	},
	{
		component: 'WVideo',
		label: '播放器',
		icon: 'icon-shipin',
		propValue: {
			data: 'http://www.w3school.com.cn/i/movie.ogg',
			autoplay: true,
			controls: true,
			loop: true,
		},
		request: {
			method: 'GET',
			data: [],
			url: '',
			series: false,
			time: 1000,
			paramType: '', // string object array
			requestCount: 0, // 请求次数限制，0 为无限
		},
		style: {
			width: 300,
			height: 200,
		},
	},
	{
		component: 'WSwiper',
		label: '轮播图',
		icon: 'icon-shipin',
		propValue: {
			data: [
				{ value: '/assets/bg/bg1.png', label: '123' },
				{ value: '/assets/bg/bg1.png', label: '456' },
				{ value: '/assets/bg/bg1.png', label: '789' },
			],
			autoplay: true,
			loop: true,
			interval: 3000,
			indicatorPosition: 'none',
			isCard: true,
			direction: 'horizontal',
			isShowText: true,
		},
		request: {
			method: 'GET',
			data: [],
			url: '',
			series: false,
			time: 1000,
			paramType: '', // string object array
			requestCount: 0, // 请求次数限制，0 为无限
		},
		style: {
			width: 420,
			height: 220,
			fontSize: 14,
		},
	},
	{
		component: 'WChart',
		label: '图表',
		icon: 'el-icon-data-analysis',
		propValue: {
			chart: 'VChart',
			option: {
				title: {
					text: '柱状图',
					show: true,
				},
				legend: {
					show: true,
				},
				tooltip: {
					show: true,
					trigger: 'item',
				},
				xAxis: {
					show: true,
					data: ['A', 'B', 'C', 'D', 'E'],
				},
				yAxis: {},
				series: {
					type: 'bar',
					name: '销量',
					data: [23, 61, 35, 77, 35],
					itemStyle: {
						barBorderRadius: 5,
						borderWidth: 1,
						borderType: 'solid',
						borderColor: '#73c0de',
						shadowColor: '#5470c6',
						shadowBlur: 3,
					},
				},
			},
		},
		style: {
			width: 800,
			height: 500,
			borderRadius: '',
		},
	},
];

for (let i = 0, len = list.length; i < len; i++) {
	const item = list[i];
	item.style = { ...commonStyle, ...item.style };
	list[i] = { ...commonAttr, ...item };
}

export default list;
