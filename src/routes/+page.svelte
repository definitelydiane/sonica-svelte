<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { hydratable, onMount } from 'svelte';

	import ThemeToggle from '$components/ThemeToggle.svelte';

	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import Flashcard from '$lib/quizzes/pitch-identification/Flashcard.svelte';
	import {
		setPitchQuizContext,
		DefaultPitchQuizConfigContext
	} from '$lib/quizzes/pitch-identification/context.ts';

	import SettingsPanel from '$components/SettingsPanel.svelte';

	import { getAdvanceWidth } from '$lib/smufl/utils.svelte.ts';
	import { Pitch, Clef } from '$lib/score/utils.svelte.ts';
	import { fillGrabBag } from './utils.ts';

	let settingsVisible = $state(false);

	// Set up configuration of our quiz
	let pitchQuizConfigState = $state({ ...DefaultPitchQuizConfigContext });
	setPitchQuizContext(pitchQuizConfigState);

	const possiblePitches = $derived.by(() => {
		const trebleClef = pitchQuizConfigState.clefs[Clef.G];
		const bassClef = pitchQuizConfigState.clefs[Clef.F];

		// If the clef is disabled, just use an empty set.
		return {
			[Clef.G]: trebleClef.enabled
				? Pitch.range(trebleClef.range.min, trebleClef.range.max, {
						sharps: trebleClef.sharps,
						flats: trebleClef.flats
					}).map((v) => v.toString())
				: [],
			[Clef.F]: bassClef.enabled
				? Pitch.range(bassClef.range.min, bassClef.range.max, {
						sharps: bassClef.sharps,
						flats: bassClef.flats
					}).map((v) => v.toString())
				: []
		};
	});

	// Create an array that looks like: [{clef: Clef.G, pitchSPN: 'A4'}, {clef: Clef.F, pitchSPN: 'C3'}]
	// the array of pitches mapped to each clef is de-duplicated by using a Set constructor.
	const pitches = $derived.by(() => {
		return Object.entries(possiblePitches).flatMap(([clef, pitches]) =>
			[...new Set(pitches)].map((pitchSPN) => ({ clef, pitchSPN }))
		);
	});

	const usedPitches = $derived.by(() => {
		// Guarantee insertion order by initializing the map
		const result = {
			'A#': false,
			'B#': false,
			'C#': false,
			'D#': false,
			'E#': false,
			'F#': false,
			'G#': false,
			A: false,
			B: false,
			C: false,
			D: false,
			E: false,
			F: false,
			G: false,
			Ab: false,
			Bb: false,
			Cb: false,
			Db: false,
			Eb: false,
			Fb: false,
			Gb: false
		};

		const re = /[A-G](#+|b+)?/;
		pitches.forEach(({ pitchSPN }) => {
			const matches = pitchSPN.match(re);
			const key = matches[0];
			if (key in result) result[key] = true;
		});
		return result;
	});

	// // Prevent initial SSR from hydrating a different value
	let grabBag = hydratable('grabBag', () => {
		const bag = [];
		fillGrabBag(bag, pitches);
		return bag;
	});

	// Whenever `pitches` updates, reset the quiz
	$effect(() => {
		pitches;
		resetQuiz();
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

	// TODO Known bug:
	// when the quiz resets the note will transition and flash either green or red.
	function resetQuiz() {
		grabBag = [];
		fillGrabBag(grabBag, pitches);
		stats = { correct: 0, totalQuestions: 0 };
		question = {
			id: 0,
			clef: grabBag[0].clef,
			pitchSPN: grabBag.shift().pitchSPN
		};
	}

	function answer(noteName: string) {
		const p = Pitch.fromSPN(question.pitchSPN);

		// TODO:  do something with the user response
		// question.answer = letterClass;
		if (p.spnName == noteName) {
			stats.correct++;
		}

		setTransitionColor(p.spnName == noteName);
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

	/**
	 * Sets the color of our exiting flash card
	 */
	function setTransitionColor(correct: boolean): string {
		const isDarkMode = localStorage.getItem('theme') == 'dark';

		// This is passed directly into the CSS so we should be able to use TailwindCSS variables here
		if (correct) {
			flashcardOut = isDarkMode ? 'var(--color-green-400)' : 'var(--color-green-500)';
		} else {
			flashcardOut = isDarkMode ? 'var(--color-red-400)' : 'var(--color-red-500)';
		}
	}

	// Keyboard input handling
	const grabFocus: Attachment = (element) => {
		element.focus();
	};

	// TODO make this configurable
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

{#snippet answerButton(p, enabled)}
	<button
		class="border h-10 w-10 rounded-md shadow cursor-pointer hover:bg-neutral-200 active:scale-96 transition duration-200 delay-[0s, 200ms]"
		style={pitchQuizConfigState.general.hideUnusedButtons && !enabled && 'visibility: hidden;'}
		onclick={() => answer(p)}>{p}</button
	>
{/snippet}

<div class="shrink flex justify-end m-auto max-w-2xl w-full items-center pr-2">
	<ThemeToggle />
	<button
		class="cursor-pointer active:scale-96 transition duration-200 delay-[0s, 200ms] inline-flex"
		onclick={() => (settingsVisible = !settingsVisible)}
		><span
			class="material-symbols--settings-rounded bg-neutral-600 dark:bg-white hover:bg-neutral-500 dark:hover:bg-neutral-300 transition duration-200 delay-[0s, 200ms]"
		></span></button
	>
</div>

<div class="max-w-lg mx-auto grow">
	<div class="w-full mb-4">
		<h1 class="text-xl font-bold text-center">Pitch Identification Practice</h1>
	</div>
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
			{#each Object.entries(usedPitches) as p}
				{@render answerButton(p[0], p[1])}
			{/each}
		</div>
	</div>
	{#if settingsVisible}
		<SettingsPanel bind:settingsVisible />
	{/if}
</div>

<style>
	.material-symbols--settings-rounded {
		display: inline-block;
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5'/%3E%3C/svg%3E");
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
