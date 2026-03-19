<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { hydratable, onMount } from 'svelte';

	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import Flashcard from '$lib/quizzes/pitch-identification/Flashcard.svelte';

	import { getAdvanceWidth } from '$lib/smufl/utils.svelte.ts';
	import { parsePitch, letterMap } from '$lib/score/utils.svelte.ts';
	import { fillGrabBag } from './utils.ts';

	// const pitches = ['D4', 'E4', 'F4', 'G4', 'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5'];
	const pitches = ['G#4'];

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
		clef: 'G',
		pitch: grabBag.shift()
	});

	function answer(letterClass: string) {
		const p = parsePitch(question.pitch);

		// TODO:  do something with the user response
		// question.answer = letterClass;
		if (p.letterClass == letterMap[letterClass]) {
			flashcardOut = 'green';
			stats.correct++;
		} else {
			flashcardOut = 'red';
		}
		// Do something with the resulting question

		stats.totalQuestions++;

		// Fill grab bag if it's empty
		if (!grabBag.length) {
			fillGrabBag(grabBag, pitches);
		}

		question = {
			id: question.id + 1,
			pitch: grabBag.shift(),
			clef: 'G',
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
		class="border h-8 w-8 rounded-md shadow cursor-pointer hover:bg-neutral-200 active:scale-96 transition duration-200 delay-[0s, 200ms]"
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
		class="flex center justify-between max-w-sm m-auto mt-4 focus:border-none focus:outline-none"
		tabindex={0}
	>
		{@render answerButton('A')}
		{@render answerButton('B')}
		{@render answerButton('C')}
		{@render answerButton('D')}
		{@render answerButton('E')}
		{@render answerButton('F')}
		{@render answerButton('G')}
	</div>
</div>
