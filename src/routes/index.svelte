<script lang="ts">
	import Timeseries from '$lib/Timeseries.svelte';
	import type { Data, Signals } from '$lib/types';

	let time: number[] = [];
	let data1 = [];
	let data2 = [];
	let maxTime = 600;
	let minTime = 0;
	for (let i = minTime; i <= maxTime; i += 0.5) {
		time.push(i);
		data1.push(Math.random() * 100 + 1);
		data2.push(Math.random() * 100 - 50);
	}

	let time_axis: Data = {
		name: 'Time (s)',
		data: time,
		max: maxTime,
		min: minTime
	};
	let data: Signals = {
		units: 'kNm',
		title: 'Load',
		data: [
			{ name: 'sim1', data: data1, max: findMax(data1), min: findMin(data1) },
			{ name: 'sim2', data: data2, max: findMax(data2), min: findMin(data2) }
		]
	};
	function findMax(l: number[]): number {
		let max = 0;
		for (let val of l) {
			if (max < val) {
				max = val;
			}
		}
		return max;
	}
	function findMin(l: number[]): number {
		let min = 0;
		for (let val of l) {
			if (min > val) {
				min = val;
			}
		}
		return min;
	}
</script>

<h1>Welcome to SvelteKit</h1>

<div class="w-9/12 h-80">
	<Timeseries time={time_axis} {data} backgroundColor={'#DCDCDC'} />
</div>
<div class="w-9/12 h-80">
	<Timeseries time={time_axis} {data} backgroundColor={'#DCDCDC'} />
</div>

<div class="w-9/12 h-80">
	<Timeseries time={time_axis} {data} backgroundColor={'#DCDCDC'} />
</div>
