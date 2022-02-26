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
	import '@egjs/hammerjs';
	import zoomPlugin from 'chartjs-plugin-zoom';
	import { onMount } from 'svelte';

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
	let options: ChartOptions = {
		responsive: true,
		plugins: {
			zoom: {
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
			},
			title: {
				display: true,
				text: title,
				font: {
					size: 18,
					weight: 'bold'
				}
			}
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
					{ label: 'test1', data: [20, 10, 30, 40], fill: false, borderColor: 'rgb(75, 192, 192)' },
					{ label: 'test2', data: [10, 5, 15, 20], fill: false, borderColor: 'rgb(75, 192, 192)' }
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
