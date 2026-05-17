import { describe, test, expect } from "vitest";

import { FretboardCenteredContext } from "$lib/score/FretboardContext.svelte.ts";

describe("FretboardCenteredContext", () => {
	test.each([
		[12, 128],
		[2, 64],
	])("Displays correct fret positions for diagram for %d frets with width %d", (n, width) => {

		// Fret position formula derived from: https://www.proguitar.com/articles/guitar-construction
		//
		// We solve the position of fret[n] in relation to the nut, rather than the bridge.
		//
		// Our scale length should be factored in to be n + 1
		// so we can display all n frets
		const nextFret = n+1;
		const c = 2**((nextFret)/12);
		const scaleLength = (width * c)/(c - 1);
		const fretPosition = (fret: number): number => {
			return scaleLength * 2**(-fret/12);
		}

		const ctx = new FretboardCenteredContext();
		ctx.width = width;
		ctx.frets = n;

		expect(ctx.getFretPosition(0)).toEqual(0);
		expect(ctx.getFretPosition(n + 1)).toBeCloseTo(width);

		for(let i = 1; i <= n; i++) {
			const expected = scaleLength - fretPosition(i);
			expect(ctx.getFretPosition(i)).toEqual(expected);
		}
	});
});
