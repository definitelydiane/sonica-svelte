<script lang="ts">
	import Score from '$lib/score/components/Score.svelte';
	import Staff from '$lib/score/components/Staff.svelte';
	import Glyph from '$lib/score/components/Glyph.svelte';

	import { Clef, Pitch, getPitchAtStaffPosition } from '$lib/score/utils.svelte.ts';

	interface Bounds {
		min;
		max;
	}
	let {
		clef = Clef.G,
		min = $bindable('D4'),
		max = $bindable('G5'),
		bounds = { min: 'D4', max: 'G5' },
		staffSpace = 16
	} = $props();

	let initialPos = { left: 0, right: 0 };

	// In staff spaces
	let notePos = $state({
		left: Pitch.fromSPN(min).positionOnStaff(clef) / 2,
		right: Pitch.fromSPN(max).positionOnStaff(clef) / 2
	});

	let dragTarget = $state(false);

	let score = $state();

	function handleMouseMove(e) {
		if (!dragTarget) return;

		notePos[dragTarget] -= e.movementY / staffSpace;
	}

	// Return the note to its original position
	function handleMouseOutOfBounds() {
		if (dragTarget) {
			notePos[dragTarget] = initialPos[dragTarget];
			dragTarget = false;
		}
	}

	function handleMouseUp() {
		if (dragTarget) {
			// Snap to grid
			notePos[dragTarget] = Math.round(notePos[dragTarget] * 2) / 2;
			dragTarget = false;

			// Swap the position of these to keep the presentation as (Min, Max)
			if (notePos.left > notePos.right) {
				[notePos.left, notePos.right] = [notePos.right, notePos.left];
			}

			const minPitch = getPitchAtStaffPosition(clef, notePos.left);
			const maxPitch = getPitchAtStaffPosition(clef, notePos.right);

			const boundsMinPitch = Pitch.fromSPN(bounds.min);
			const boundsMaxPitch = Pitch.fromSPN(bounds.max);

			// Clamp the left
			const clampedLeft = Pitch.higherStaffScalar(minPitch, boundsMinPitch);
			notePos.left = clampedLeft.positionOnStaff(clef) / 2;
			min = clampedLeft.toString();

			// Clamp the right
			const clampedRight = Pitch.lowerStaffScalar(maxPitch, boundsMaxPitch);
			notePos.right = clampedRight.positionOnStaff(clef) / 2;
			max = clampedRight.toString();
		}
	}

	function handleStartDrag(target: 'left' | 'right') {
		initialPos[target] = notePos[target];
		dragTarget = target;
	}
</script>

<div>
	<Score
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseOutOfBounds}
		onmouseup={handleMouseUp}
		bind:svg={score}
		centered
		width={256}
		height={128}
	>
		<Staff />
		<Glyph name={clef} x={2} />
		<Glyph
			onmousedown={() => handleStartDrag('left')}
			onmouseup={handleMouseUp}
			name={'noteQuarterUp'}
			x={76}
			ysp={notePos.left}
		/>
		<Glyph
			onmousedown={() => handleStartDrag('right')}
			onmouseup={handleMouseUp}
			name={'noteQuarterDown'}
			x={200}
			ysp={notePos.right}
		/>
	</Score>
</div>
