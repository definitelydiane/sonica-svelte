<script lang="ts">
	import type { GlyphName } from '$lib/smufl/types.ts';
	import { getGlyph } from '$lib/smufl/utils.svelte.ts';
	import { getScoreContext } from '$lib/score/context.ts';

	import { getStaffHeight, getBottomStaffLine } from '$lib/score/utils.svelte.ts';

	interface Props {
		name: GlyphName;
		color: string;

		// In staff sp
		xsp: number;
		ysp: number;

		// Px units
		x: number;
		y: number;

		onclick?: () => void;
	}

	const {
		name,
		color = 'currentColor',
		x = 0,
		y = 0,
		xsp = 0,
		ysp = 0,
		...props
	}: Props = $props();
	const ctx = $derived(getScoreContext()());
	const glyph = $derived(getGlyph(name));
</script>

<text
	{...props}
	font-family="Bravura"
	fill={color}
	font-size={getStaffHeight(ctx)}
	x={ctx.margin[3] + xsp * ctx.staffSpace + x}
	y={getBottomStaffLine(ctx) - ysp * ctx.staffSpace - glyph.offsetY * ctx.staffSpace + y}
	>{glyph.toString()}</text
>
