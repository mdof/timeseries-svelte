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
	import { onMount } from 'svelte';
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

	let title = 'test';
	let chartElem: HTMLCanvasElement;
	let chart: Chart;
	let zoomOptions = {
		pan: {
			enabled: true,
			mode: 'xy'
		},
		zoom: {
			wheel: {
				enabled: true
			},
			pinch: {
				enabled: true
			},
			mode: 'xy'
		}
	};
	zoomOptions = {
		pan: {
			enabled: true,
			mode: 'xy',
			modifierKey: 'shift'
		},
		zoom: {
			mode: 'xy',
			drag: {
				enabled: true,
				borderColor: 'rgb(54, 162, 235)',
				borderWidth: 1,
				backgroundColor: 'rgba(54, 162, 235, 0.3)'
			}
		}
	};
	let options: ChartOptions = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			zoom: zoomOptions,
			title: {
				display: true,
				text: title,
				font: {
					size: 18,
					weight: 'bold'
				}
			},
			autocolors: {
				mode: 'dataset'
			},
			legend: {
				position: 'bottom'
			}
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: time.name
				},
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
				title: {
					display: true,
					text: 'Value'
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
			options
		});
	});

	function resetZoom() {
		chart.resetZoom();
	}
</script>

<canvas bind:this={chartElem} width="400" height="100" aria-label={title} role="img" />
<button on:click={resetZoom}>Reset zoom</button>
