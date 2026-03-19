<script lang="ts">
	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import { getAdvanceWidth } from '$lib/smufl/utils.svelte.ts';
	import { getStaffPosition, parsePitch, getClefGlyphName } from '$lib/score/utils.svelte.ts';

	import { fade } from 'svelte/transition';

	type Props = {
		width: number;
		height: number;

		out: 'green' | 'red';

		// Question ID
		// qid: number;
		question: {
			clef: 'G' | 'F';
			id: number;
			pitch: string;
			answer: string | null;
			correct: boolean | null;
		};
	};

	const { pitch, width = 256, height = 256, question, out }: Props = $props();

	const parsedPitch = parsePitch(question.pitch);

	const offsetY = $derived(getStaffPosition({ clef: question.clef, pitch: question.pitch }) / 2);
	const noteType = $derived(offsetY >= 2 ? 'noteQuarterDown' : 'noteQuarterUp');

	const clefGlyph = getClefGlyphName(question.clef);

	const noteXPos = (width - getAdvanceWidth(clefGlyph)) / 2;

	function tOut() {
		return {
			direction: 'out',
			duration: 200,
			css: (t, u) => {
				return `opacity: ${t}; fill: ${out};`;
			}
		};
	}
</script>

<div class="flex justify-center">
	<Score centered {width} {height}>
		<Staff />
		<Glyph name={clefGlyph} />
		{#key question.id}
			<g in:fade={{ duration: 200, delay: 250 }} out:tOut fill="black">
				<Glyph color={''} name={noteType} x={noteXPos} ysp={offsetY} />
			</g>
		{/key}
	</Score>
</div>
