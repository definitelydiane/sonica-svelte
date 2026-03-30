<script lang="ts">
	let { value = $bindable() } = $props();
</script>

<button
	class="overflow-hidden w-20 h-7 rounded-full h-5 border border-white inset-shadow-sm/10 dark:border-neutral-800 select-none cursor-pointer bg-neutral-50 dark:bg-neutral-900"
	onclick={() => (value = !value)}
>
	<span class="flex w-full justify-between">
		<span
			class="grow transition-colors duration-200 ease-in-out z-20"
			style={`color: ${!value ? 'white' : 'var(--color-neutral-400)'};`}>Off</span
		>

		<span
			class="grow transition-colors duration-200 ease-in-out z-20"
			style={`color: ${value ? 'white' : 'var(--color-neutral-400)'};`}>On</span
		>
	</span>
	<span
		class="relative h-full w-10 shadow-sm bg-neutral-900 dark:bg-neutral-700 rounded-full block transition-transform duration-150 ease-in-out -top-6 z-10"
		style={`transform: translateX(${!value ? 0 : 2.4}em);`}
	></span>
</button>
