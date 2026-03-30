<script lang="ts">
	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import { getScoreContext } from '$lib/score/context.ts';

	import { getAdvanceWidth } from '$lib/smufl/utils.svelte.ts';
	import { getStaffPosition, Pitch, Clef } from '$lib/score/utils.svelte.ts';

	import { fade } from 'svelte/transition';

	type Props = {
		width: number;
		height: number;
		staffSpace: number;

		out: string;

		// Question ID
		// qid: number;
		question: {
			clef: Clef;
			id: number;
			pitchSPN: string;
		};
	};

	const { pitch, width = 256, height = 256, staffSpace = 16, question, out }: Props = $props();

	const parsedPitch = $derived(Pitch.fromSPN(question.pitchSPN));

	const offsetY = $derived(parsedPitch.positionOnStaff(question.clef) / 2);

	const noteType = $derived(offsetY >= 2 ? 'noteQuarterDown' : 'noteQuarterUp');

	const noteXPos = $derived((width - getAdvanceWidth(question.clef)) / 2);

	const accidentalX = $derived(noteXPos - getAdvanceWidth(noteType) * staffSpace);

	function tOut(node, params) {
		// It is possible for this <g> tag to have 2 <text> elements:
		//	1. the note glyph itself
		//	2. the accidental
		// This node will be removed from the tree once the transition is
		// completed, so there's not need to ever set this back to anything.
		[...node.children].forEach((c) => c.setAttribute('fill', ''));
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
	<Score centered {width} {height} {staffSpace}>
		<Staff />
		{#key question.clef}
			<g transition:fade={{ duration: 150, delay: 200 }}>
				<Glyph name={question.clef} />
			</g>
		{/key}
		{#key question.pitchSPN}
			<g in:fade={{ duration: 200, delay: 250 }} out:tOut>
				{#if parsedPitch.accidental}
					<Glyph name={parsedPitch.accidental} x={accidentalX} ysp={offsetY} />
				{/if}
				<Glyph name={noteType} x={noteXPos} ysp={offsetY} />
			</g>
		{/key}
	</Score>
</div>
