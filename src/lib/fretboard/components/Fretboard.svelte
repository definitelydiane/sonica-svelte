<!--
	@component
	- Returns an SVG group node containing a fretboard diagram
	- Defautls to 6 strings.
-->
<script lang="ts">
	import { FretboardCenteredContext, setFretboardContext } from '$lib/fretboard/context.svelte.ts';

	interface Props {
		lines: number;
		color: string;
	}

	const { lines = 6, color = 'currentColor' }: Props = $props();

	const ctx = new FretboardCenteredContext();
ctx.staffLines = lines;
	setFretboardContext(ctx);
</script>

<svg height={ctx.height} width={ctx.width}>
	<g stroke={color}>
		{#each { length: ctx.staffLines }, i}
			<line
				x1={ctx.margin[3]}
				x2={ctx.width - ctx.margin[1]}
				y1={ctx.bottomStaffLine - i * ctx.staffSpace}
				y2={ctx.bottomStaffLine - i * ctx.staffSpace}
				stroke-width={ctx.engravingDefaults.staffLineThickness * ctx.staffSpace}
			/>
		{/each}
	</g>
	<g stroke={color}>
		<!-- nut -->
		<line x1="0" x2="0" y1={ctx.bottomStaffLine} y2={ctx.bottomStaffLine - ctx.staffHeight} />
		<!-- frets & -->
		<g stroke={color}> </g>
	</g>
</svg>
