<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href="/fonts/Bravura.woff2" as="font" type="font/woff2" />
</svelte:head>

<div class="w-full h-screen flex flex-col justify-between">
	<div class="max-w-lg mx-auto pt-12">
		{@render children()}
	</div>
	<footer class="flex justify-center">
		<div class="p-4 flex gap-2">
			<span class="text-sm text-neutral-600">
				made with <span class="text-pink-400">&hearts;</span> by
				<a class="underline text-blue-500" href="https://www.definitely-diane.com" target="_blank"
					>Diane Nguyen</a
				>
			</span>
			<span class="text-neutral-500">|</span>
			<span class="text-sm">
				<img class="w-5 h-5 inline-block mb-0.5" src="/kofi_symbol.svg" />
				<a class="underline text-blue-500" href="https://ko-fi.com/DianeEliseNguyen" target="_blank"
					>Support me on Ko-Fi</a
				>
			</span>
		</div>
	</footer>
</div>
