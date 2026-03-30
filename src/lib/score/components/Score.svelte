<!--
@component
- Renders a score
- TODO: optionally pass in a musicxml and render from this
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ScoreContext } from '$lib/score/context';
	import { setScoreContext } from '$lib/score/context';
	import { FontMeta } from '$lib/smufl/data.ts';

	// TODO fill this interface out...
	interface Props {
		children: Snippet;

		// Height and Width in staff spaces
		// Overrides height and width properties
		hsp?: number;
		wsp?: number;

		// Convenience props
		centered?: boolean;
		scale?: number;
	}
	let {
		height = 128,
		width = 256,

		hsp = undefined,
		wsp = undefined,

		staffSpace = 16,
		margin = [0, 0, 0, 0],

		children,
		centered,

		// If needing to bind ths root element of this component
		svg = $bindable(),
		...props
	}: ScoreContext & Props = $props();

	const ctxHeight = $derived(hsp ? hsp * staffSpace : height);
	const ctxWidth = $derived(wsp ? wsp * staffSpace : width);

	const ctx = $derived({
		height: hsp ? hsp * staffSpace : height,
		width: wsp ? wsp * staffSpace : width,
		staffSpace,
		margin: centered
			? [(height - staffSpace * 4) / 2, 0, (height - staffSpace * 4) / 2, 0]
			: [0, 0, 0, 0],
		engravingDefaults: FontMeta.engravingDefaults
	});

	setScoreContext(() => ctx);
</script>

<svg
	bind:this={svg}
	{...props}
	height={ctxHeight}
	width={ctxWidth}
	xmlns="http://www.w3.org/2000/svg"
	class="select-none"
>
	{@render children?.()}
</svg>
