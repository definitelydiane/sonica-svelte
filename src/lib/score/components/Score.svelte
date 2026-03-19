<!--
@component
- Renders a score
- TODO: optionally pass in a musicxml and render from this
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ScoreContext } from '$lib/score/context';
	import { setScoreContext, DefaultScoreContext } from '$lib/score/context';
	interface Props {
		children: Snippet;

		// Convenience props
		centered?: boolean;
		scale?: number;
	}
	const {
		height = 128,
		width = 256,
		staffSpace = 16,
		margin = [0, 0, 0, 0],

		children,
		centered
	}: ScoreContext & Props = $props();

	const mergeContext = (): ScoreContext => {
		let ctx = { ...DefaultScoreContext };
		const staffHeight = staffSpace * 4;
		if (centered) {
			const marginY = (height - staffHeight) / 2;
			ctx.margin = [marginY, 0, marginY, 0];
		}
		return ctx;
	};

	setScoreContext(mergeContext());
</script>

<svg {height} {width} xmlns="http://www.w3.org/2000/svg" class="select-none">
	{@render children?.()}
</svg>
