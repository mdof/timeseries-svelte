<script context="module" lang="ts">
	/* let current: Chart; */
	let listCharts: Chart[] = [];
	function zoomOthers(z: ZoomCmd) {
		console.log('Zooming others');
		for (let chart of listCharts) {
			if (chart.id != z.idChart) {
				console.log('Chart id is ', chart.id);
				chart.zoomScale('x', z.x, 'zoom');
			}
		}
	}

	export type ZoomCmd = {
		idChart: string;
		x: { min: number; max: number };
	};
</script>

<script lang="ts">
	import {
		Chart,
		LineElement,
		PointElement,
		LineController,
		LinearScale,
		Title,
		CategoryScale,
		Tooltip,
		Legend,
		type ChartOptions
	} from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import zoomPlugin from 'chartjs-plugin-zoom';
	import randomColor from 'randomcolor';
	import { onDestroy, onMount } from 'svelte';
	import type { Data, Signals } from './types';

	Chart.register(autocolors);
	Chart.register(zoomPlugin);
	Chart.register(
		LineElement,
		PointElement,
		LineController,
		LinearScale,
		Title,
		CategoryScale,
		Tooltip,
		Legend
	);

	/* let color = randomColor({ luminosity: 'light', hue: 'green', count: 2 }); */
	/* console.log('Color is ', color); */
	export let time: Data;
	export let data: Signals;
	// Style config
	export let backgroundColor: string = '#FFFFFF';

	let limits: { x: { min: number; max: number }; y: { min: number; max: number } } = {
		x: { min: 0, max: 0 },
		y: { min: 0, max: 0 }
	};
	limits.x.min = time.data[0];
	limits.x.max = Math.round(time.data[time.data.length - 1]);
	let ymin = 0;
	let ymax = 0;
	for (let sigData of data.data) {
		if (ymin > sigData.min) ymin = Math.floor(sigData.min);
		if (ymax < sigData.max) ymax = Math.ceil(sigData.max);
	}
	limits.y.min = ymin;
	limits.y.max = ymax;
	console.log('Data ', data);
	console.log('Limits ', limits);

	let chartElem: HTMLCanvasElement;
	let chart: Chart;
	let backgroundColorPlugin = {
		id: 'custom_canvas_background_color',
		beforeDraw: (chart) => {
			const ctx = chart.canvas.getContext('2d');
			ctx.save();
			ctx.globalCompositeOperation = 'destination-over';
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, chart.width, chart.height);
			ctx.restore();
		}
	};
	let zoomOptions = {
		pan: {
			enabled: true,
			mode: 'x',
			onPanComplete({ chart }) {
				let zoomToOthers: ZoomCmd = {
					idChart: chart.id,
					x: { min: chart.scales.x.min, max: chart.scales.x.max }
				};
				zoomOthers(zoomToOthers);
			}
		},
		zoom: {
			mode: 'x',
			drag: {
				enabled: true,
				mode: 'xy',
				borderColor: 'rgb(54, 162, 235)',
				borderWidth: 1,
				backgroundColor: 'rgba(54, 162, 235, 0.3)',
				modifierKey: 'shift'
			},
			wheel: {
				enabled: true
			},
			onZoomComplete({ chart }) {
				let zoomToOthers: ZoomCmd = {
					idChart: chart.id,
					x: { min: chart.scales.x.min, max: chart.scales.x.max }
				};
				zoomOthers(zoomToOthers);
			}
		},
		limits: {
			x: limits.x
		}
	};
	let options: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			zoom: zoomOptions,
			title: {
				display: true,
				text: data.title,
				font: {
					size: 14,
					weight: 'bold'
				}
			},
			autocolors: {
				mode: 'dataset'
			},
			legend: {
				position: 'bottom'
			},
			decimation: {
				enabled: false,
				algorithm: 'min-max'
			}
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: time.name
				},
				min: limits.x.min,
				max: limits.x.max,
				type: 'linear',
				beginAtZero: true,
				ticks: {
					autoSkip: true,
					maxRotation: 0,
					maxTicksLimit: 21,
					includeBounds: true,
					major: {
						enabled: true
					}
				}
			},
			y: {
				display: true,
				type: 'linear',
				title: {
					display: true,
					text: data.units
				}
			}
		},
		interaction: {
			intersect: false,
			mode: 'index'
		},
		elements: {
			point: {
				borderWidth: 0,
				radius: 10,
				backgroundColor: 'rgba(0,0,0,0)'
			},
			line: {
				borderWidth: 1
			}
		}
	};
	let datasets = data.data.map((d) => {
		return {
			label: d.name,
			data: d.data,
			fill: false,
			radius: 0
		};
	});
	onMount(() => {
		chart = new Chart(chartElem, {
			type: 'line',
			data: {
				labels: time.data,
				datasets: datasets
			},
			options,
			plugins: [backgroundColorPlugin]
		});
		listCharts.push(chart);
		console.log('Chart ', chart);
	});
	onDestroy(() => {
		let idxChart = listCharts.findIndex((c) => c.id == chart.id);
		listCharts.splice(idxChart, 1);
		chart.destroy();
	});

	function resetZoom() {
		/* chart.resetZoom(); */
		listCharts.forEach((c) => c.resetZoom());
	}
</script>

<div class="relative w-full h-full">
	<canvas bind:this={chartElem} width="400" height="100" aria-label={data.title} role="img" />
	<button class="absolute right-0 top-0" on:click={resetZoom}>Reset zoom</button>
</div>
