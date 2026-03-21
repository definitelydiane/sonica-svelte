<script lang="ts">
	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import { getScoreContext } from '$lib/score/context.ts';

	import { getAdvanceWidth } from '$lib/smufl/utils.svelte.ts';
	import { getStaffPosition, Pitch, Clef, getClefGlyphName } from '$lib/score/utils.svelte.ts';

	import { fade } from 'svelte/transition';

	type Props = {
		width: number;
		height: number;

		out: 'green' | 'red';

		// Question ID
		// qid: number;
		question: {
			clef: Clef;
			id: number;
			pitchSPN: string;
		};
	};

	const { pitch, width = 256, height = 256, question, out }: Props = $props();

	const parsedPitch = $derived(Pitch.fromSPN(question.pitchSPN));

	const offsetY = $derived(getStaffPosition({ clef: question.clef, pitch: parsedPitch }) / 2);
	const noteType = $derived(offsetY >= 2 ? 'noteQuarterDown' : 'noteQuarterUp');

	const noteXPos = (width - getAdvanceWidth(question.clef)) / 2;

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
		{#key question.clef}
			<g transition:fade={{ duration: 150, delay: 200 }}>
				<Glyph name={question.clef} />
			</g>
		{/key}
		{#key question.id}
			<g in:fade={{ duration: 200, delay: 250 }} out:tOut fill="black">
				{#if parsedPitch.accidental}
					<Glyph
						color={''}
						name={parsedPitch.accidental}
						x={noteXPos - getAdvanceWidth(noteType) * getScoreContext().staffSpace}
						ysp={offsetY}
					/>
				{/if}
				<Glyph color={''} name={noteType} x={noteXPos} ysp={offsetY} />
			</g>
		{/key}
	</Score>
</div>
