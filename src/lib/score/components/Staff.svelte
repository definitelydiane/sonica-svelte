<!--
@component
- Returns an SVG group node containing staff lines.
- Defaults to 5 black staff lines.
-->
<script lang="ts">
	import { getScoreContext } from '$lib/score/context.ts';
	import { getStaffHeight, getBottomStaffLine } from '$lib/score/utils.svelte.ts';

	interface Props {
		lines: number;
		color: string;
	}

	const { lines = 5, color = 'currentColor' }: Props = $props();
	const ctx = getScoreContext();
	const staffHeight = getStaffHeight(ctx);
</script>

<g stroke={color}>
	{#each { length: lines }, i}
		<line
			x1={ctx.margin[3]}
			x2={ctx.width - ctx.margin[1]}
			y1={getBottomStaffLine(ctx) - i * ctx.staffSpace}
			y2={getBottomStaffLine(ctx) - i * ctx.staffSpace}
			stroke-width={ctx.engravingDefaults.staffLineThickness * ctx.staffSpace}
		/>
	{/each}
</g>
