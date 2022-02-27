<script lang="ts">
	import Timeseries from '$lib/Timeseries.svelte';

	let time = [];
	let data1 = [];
	let data2 = [];
	for (let i = 0; i < 100; i += 0.1) {
		time.push(i.toFixed(1));
		data1.push(Math.random() * 100 + 1);
		data2.push(Math.random() * 100 - 50);
	}

	let time_axis = {
		name: 'Time (s)',
		data: time
	};
	let data = {
		units: 'kNm',
		title: 'Load',
		data: [
			{ name: 'sim1', data: data1 },
			{ name: 'sim2', data: data2 }
		]
	};
</script>

<h1>Welcome to SvelteKit</h1>
<div class="w-9/12 h-80">
	<Timeseries time={time_axis} {data} />
</div>
