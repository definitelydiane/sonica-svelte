<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href="/fonts/Bravura.woff2" as="font" type="font/woff2" />
</svelte:head>

<div class="w-full h-screen flex flex-col justify-between dark:bg-neutral-800 dark:text-white">
	{@render children()}
	<footer class="flex justify-center">
		<div class="p-4 flex gap-2">
			<span class="text-sm text-neutral-600 dark:text-neutral-300">
				made with <span class="text-pink-400 dark:text-pink-400">&hearts;</span> by
				<a
					class="underline text-blue-500 dark:text-blue-400"
					href="https://www.definitely-diane.com"
					target="_blank">Diane Nguyen</a
				>
			</span>
			<span class="text-neutral-500">|</span>
			<span class="text-sm">
				<img class="w-5 h-5 inline-block mb-0.5" src="/kofi_symbol.svg" />
				<a
					class="underline text-blue-500 dark:text-blue-400"
					href="https://ko-fi.com/DianeEliseNguyen"
					target="_blank">Support me on Ko-Fi</a
				>
			</span>
			<span class="text-neutral-500">|</span>
			<span class="text-sm dark:text-neutral-300">
				<a
					class="flex gap-1"
					target="_blank"
					href="https://github.com/definitelydiane/sonica-svelte"
				>
					<span class="mdi--github size-5 block inline-flex"></span>
					<span class="underline text-blue-500 dark:text-blue-400">Github</span>
				</a>
			</span>
		</div>
	</footer>
</div>

<style>
	.mdi--github {
		display: inline-block;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
