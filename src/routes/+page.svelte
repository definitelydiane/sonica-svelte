<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { hydratable, onMount } from 'svelte';

	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import Flashcard from '$lib/quizzes/pitch-identification/Flashcard.svelte';

	import { getAdvanceWidth } from '$lib/smufl/utils.svelte.ts';
	import { Pitch, Clef } from '$lib/score/utils.svelte.ts';
	import { fillGrabBag } from './utils.ts';

	const quizConfig = {
		pitches: {
			[Clef.G]: ['D4', 'E4', 'F4', 'G4', 'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5'],
			[Clef.F]: ['F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4']
		}
	};

	// Create an array that looks like: [{clef: Clef.G, 'A4'}, {clef: Clef.F, 'C3'}]
	// the array of pitches mapped to each clef is de-duplicated by using a Set constructor.
	const pitches = Object.entries(quizConfig.pitches).flatMap(([clef, pitchSPNs]) =>
		[...new Set(pitchSPNs)].map((pitchSPN) => ({ clef, pitchSPN }))
	);
	console.log(pitches);

	// Prevent initial SSR from hydrating a different value
	let grabBag = hydratable('grabBag', () => {
		const bag = [];
		fillGrabBag(bag, pitches);
		return bag;
	});

	let flashcardOut = $state('red');

	let stats = $state({
		correct: 0,
		totalQuestions: 0
	});

	let percentage = $derived(Math.round((stats.correct / stats.totalQuestions) * 100));

	// Maybe change to raw later
	let question = $state({
		id: 0,
		clef: grabBag[0].clef,
		pitchSPN: grabBag.shift().pitchSPN
	});

	function answer(noteName: string) {
		const p = Pitch.fromSPN(question.pitchSPN);

		// TODO:  do something with the user response
		// question.answer = letterClass;
		if (p.spnName == noteName) {
			flashcardOut = 'green';
			stats.correct++;
		} else {
			flashcardOut = 'red';
		}
		// Do something with the resulting question

		stats.totalQuestions++;

		// Fill grab bag if it's empty
		if (!grabBag.length <= 1) {
			fillGrabBag(grabBag, pitches);
		}

		const nextPitch = grabBag.shift();

		question = {
			id: question.id + 1,
			pitchSPN: nextPitch.pitchSPN,
			clef: nextPitch.clef,
			answer: null,
			correct: null
		};
	}

	// Keyboard input handling
	const grabFocus: Attachment = (element) => {
		element.focus();
	};

	function handleKeyDown(e: KeyboardEvent): void {
		switch (e.key) {
			case 'a':
				answer('A');
				break;
			case 'b':
				answer('B');
				break;
			case 'c':
				answer('C');
				break;
			case 'd':
				answer('D');
				break;
			case 'e':
				answer('E');
				break;
			case 'f':
				answer('F');
				break;
			case 'g':
				answer('G');
				break;
			default:
				return;
		}
	}
</script>

{#snippet answerButton(p)}
	<button
		class="border h-10 w-10 rounded-md shadow cursor-pointer hover:bg-neutral-200 active:scale-96 transition duration-200 delay-[0s, 200ms]"
		onclick={() => answer(p)}>{p}</button
	>
{/snippet}

<h1 class="text-xl font-bold text-center mb-4">Pitch Identification Practice</h1>
<p class="text-center">
	{stats.correct} of {stats.totalQuestions} correct ({isNaN(percentage) ? '0' : percentage}%)
</p>
<div>
	<Flashcard {question} out={flashcardOut} />
	<div
		role="listbox"
		onkeydown={handleKeyDown}
		{@attach grabFocus}
		class="grid grid-cols-7 gap-4 m-auto mt-4 focus:border-none focus:outline-none"
		tabindex={0}
	>
		{@render answerButton('A#')}
		{@render answerButton('B#')}
		{@render answerButton('C#')}
		{@render answerButton('D#')}
		{@render answerButton('E#')}
		{@render answerButton('F#')}
		{@render answerButton('G#')}

		{@render answerButton('A')}
		{@render answerButton('B')}
		{@render answerButton('C')}
		{@render answerButton('D')}
		{@render answerButton('E')}
		{@render answerButton('F')}
		{@render answerButton('G')}

		{@render answerButton('Ab')}
		{@render answerButton('Bb')}
		{@render answerButton('Cb')}
		{@render answerButton('Db')}
		{@render answerButton('Eb')}
		{@render answerButton('Fb')}
		{@render answerButton('Gb')}
	</div>
</div>
