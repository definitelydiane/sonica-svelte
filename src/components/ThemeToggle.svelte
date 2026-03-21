<script lang="ts">
	import { slide } from 'svelte/transition';
	let mode = $state(
		typeof document !== 'undefined' ? (localStorage.getItem('theme') ?? 'light') : 'light'
	);
</script>

<div
	class="overflow-hidden w-16 h-7 rounded-full h-5 m-5 border border-neutral-200 inset-shadow-sm/15 dark:border-neutral-500 select-none cursor-pointer"
	onclick={() => {
		mode = mode == 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', mode);
		localStorage.setItem('theme', mode);
	}}
>
	<span
		class="whitespace-nowrap text-center transition-transform duration-300 ease-in-out flex w-32 h-7"
		style={`transform: translateX(${mode == 'light' ? 0 : -4}em);`}
	>
		<span class="w-16 inline-block"
			><span class="material-symbols--sunny-rounded bg-black mr-5 mt-0.25 bg-yellow-500"
			></span></span
		><span class="w-16 inline-block bg-gradient-to-r from-transparent to-neutral-900"
			><span class="material-symbols--moon-stars ml-4 mt-0.25 bg-white"></span></span
		>
	</span>
	<span
		class="relative h-5 w-5 shadow-sm bg-neutral-400 dark:bg-neutral-200 rounded-full inline-block -top-6.25 transition-transform duration-300 ease-in-out"
		style={`transform: translateX(${mode == 'light' ? 2.4 : 0.2}em);`}
	></span>
</div>

<style>
	.material-symbols--sunny-rounded {
		display: inline-block;
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M11.288 4.713Q11 4.425 11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5t-.712-.288M16.95 7.05q-.275-.275-.275-.687t.275-.713l1.4-1.425q.3-.3.712-.3t.713.3q.275.275.275.7t-.275.7L18.35 7.05q-.275.275-.7.275t-.7-.275M20 13q-.425 0-.713-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8.712 9.713Q11 22.425 11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23t-.712-.288M5.65 7.05l-1.425-1.4q-.3-.3-.3-.725t.3-.7q.275-.275.7-.275t.7.275L7.05 5.65q.275.275.275.7t-.275.7q-.3.275-.7.275t-.7-.275m12.7 12.725l-1.4-1.425q-.275-.3-.275-.712t.275-.688t.688-.275t.712.275l1.425 1.4q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm2.225 6.775q-.275-.275-.275-.7t.275-.7L5.65 16.95q.275-.275.687-.275t.713.275q.3.3.3.713t-.3.712l-1.4 1.4q-.3.3-.725.3t-.7-.3M7.75 16.25Q6 14.5 6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18t-4.25-1.75'/%3E%3C/svg%3E");
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--moon-stars {
		display: inline-block;
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m15 8l-3-3l3-3l3 3zm5 3l-2-2l2-2l2 2zm-7.925 11q-2.1 0-3.937-.8t-3.2-2.162t-2.163-3.2t-.8-3.938q0-3.65 2.325-6.437T10.225 2q-.45 2.475.275 4.838t2.5 4.137t4.138 2.5t4.837.275q-.65 3.6-3.45 5.925T12.075 22'/%3E%3C/svg%3E");
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
