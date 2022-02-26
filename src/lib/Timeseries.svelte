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
	import { onMount } from 'svelte';

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
			autocolors
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: 'Time (s)'
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
			intersect: true,
			mode: 'index'
		}
	};
	onMount(() => {
		chart = new Chart(chartElem, {
			type: 'line',
			data: {
				labels: ['0', '1', '2', '3'],
				datasets: [
					{ label: 'test1', data: [20, 10, 30, 40], fill: false },
					{ label: 'test2', data: [10, 5, 15, 20], fill: false }
				]
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
