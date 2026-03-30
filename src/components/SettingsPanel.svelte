<script lang="ts">
	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import { getPitchQuizContext } from '$lib/quizzes/pitch-identification/context.ts';

	import ClefRangeSelector from '$components/ClefRangeSelector.svelte';
	import { Clef } from '$lib/score/utils.svelte.ts';

	import { fly, fade, slide } from 'svelte/transition';

	import OnOffToggle from '$components/OnOffToggle.svelte';

	let { settingsVisible = $bindable() } = $props();

	let configCtx = getPitchQuizContext();

	let general = configCtx.general;
	let trebleClef = configCtx.clefs[Clef.G];
	let bassClef = configCtx.clefs[Clef.F];

	const isDarkMode: boolean = localStorage.getItem('theme') == 'dark' ?? false;

	function getClefConfigStyle(enabled: boolean): string {
		let style = '';
		if (!enabled) return style;
		if (isDarkMode) {
			style += 'background-color: oklch(from var(--color-neutral-700) l c h / 0.5);';
		} else {
			style += 'box-shadow: var(--shadow-xs);';
			style += 'border: 1px solid var(--color-neutral-100);';
		}
		return style;
	}
</script>

<div
	transition:fade={{ duration: 200 }}
	class="h-full w-full fixed top-0 right-0 bg-neutral-400 dark:bg-black opacity-50"
	onclick={() => (settingsVisible = false)}
></div>
<div
	transition:fly={{ x: '28rem', opacity: 1 }}
	class="fixed bg-white dark:bg-neutral-800 h-full w-md top-0 right-0 px-1 pt-2 z-100 overflow-scroll pb-4"
>
	<div class="flex items-center gap-1">
		<button
			class="cursor-pointer active:scale-96 transition duration-200 delay-[0s, 200ms] inline-flex"
			onclick={() => (settingsVisible = false)}
			><span
				class="material-symbols--close-rounded bg-neutral-600 dark:bg-white hover:bg-neutral-500 dark:hover:bg-neutral-300 transition transition-200 delay-[0s, 200ms]"
			/></button
		>
		<h2 class="font-bold text-xl">Settings</h2>
	</div>
	<div class="ml-7 mr-4">
		<div class="pb-2 mb-2">
			<div class="py-1">
				<div>
					<h3 class="font-bold text-lg">General</h3>
				</div>
			</div>
			<div>
				<div class="flex justify-between items-center">
					<p class="dark:text-neutral-300">Hide unused answer choices</p>
					<OnOffToggle bind:value={general.hideUnusedButtons} />
				</div>
			</div>
		</div>
		<div>
			<div>
				<div class="py-1">
					<h3 class="font-bold text-lg">Quiz</h3>
				</div>
			</div>
			<div>
				<div
					class="p-2 rounded-xl transition-[colors,margin]"
					style={`${getClefConfigStyle(trebleClef.enabled)}${bassClef.enabled && 'margin-bottom: 1em;'}`}
				>
					<div class="flex justify-between items-center">
						<p class="text-medium text-lg w-[10em]">Treble clef</p>
						<OnOffToggle bind:value={trebleClef.enabled} />
					</div>
					{#if trebleClef.enabled}
						<div
							transition:slide
							class="border-t border-neutral-300 dark:border-neutral-400 mt-2 pt-1"
						>
							<div>
								<h4>Range</h4>
								<p class="text-sm">
									Click and drag the note heads to adjust the range of pitches that the quiz will
									display.
								</p>
							</div>
							<div class="px-2">
								<ClefRangeSelector
									bind:min={trebleClef.range.min}
									bind:max={trebleClef.range.max}
									bounds={{ min: 'D4', max: 'G5' }}
								/>
								<!--
								<p class="text-xs dark:text-neutral-300">
									current range: {trebleClef.range.min}-{trebleClef.range.max}
								</p>
								-->
							</div>
							<div class="flex gap-4 items-center mb-2">
								<p class="w-[10em]">Enable sharps</p>
								<OnOffToggle bind:value={trebleClef.sharps} />
							</div>
							<div class="flex gap-4 items-center">
								<p class="w-[10em]">Enable flats</p>
								<OnOffToggle bind:value={trebleClef.flats} />
							</div>
						</div>
					{/if}
				</div>
				<div class="p-2 rounded-xl transition-all" style={getClefConfigStyle(bassClef.enabled)}>
					<div class="flex justify-between items-center">
						<p class="text-medium text-lg w-[10em]">Bass clef</p>
						<OnOffToggle bind:value={bassClef.enabled} />
					</div>
					{#if bassClef.enabled}
						<div
							transition:slide
							class="border-t border-neutral-300 dark:border-neutral-400 mt-2 pt-1"
						>
							<div>
								<div>
									<h4>Range</h4>
									<p class="text-sm dark:text-neutral-300">
										Click and drag the note heads to adjust the range of pitches that the quiz will
										display.
									</p>
								</div>
								<div class="px-2">
									<ClefRangeSelector
										clef={Clef.F}
										bind:min={bassClef.range.min}
										bind:max={bassClef.range.max}
										bounds={{ min: 'F2', max: 'B3' }}
									/>
									<!--
									<p class="text-xs dark:text-neutral-300">
										current range: {bassClef.range.min}-{bassClef.range.max}
									</p>
									-->
								</div>
							</div>
							<div class="flex gap-4 items-center mb-2">
								<p class="dark:text-neutral-300 w-[10em]">Enable sharps</p>
								<OnOffToggle bind:value={bassClef.sharps} />
							</div>
							<div class="flex gap-4 items-center">
								<p class="dark:text-neutral-300 w-[10em]">Enable flats</p>
								<OnOffToggle bind:value={bassClef.flats} />
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.material-symbols--close-rounded {
		display: inline-block;
		width: 24px;
		height: 24px;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z'/%3E%3C/svg%3E");
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
