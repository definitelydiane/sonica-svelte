import { StaffCenteredContext } from "$lib/score/StaffContext.svelte.ts";

export class FretboardCenteredContext extends StaffCenteredContext {
	constructor() {
		super();
		this._staffLines = 6;
		this.centerVertical();
	}

	public frets = $state(12);

	// Fret position formula derived from: https://www.proguitar.com/articles/guitar-construction
	//
	// In order to display the specified number of frets in our diagram,
	// we must first solve for the scale length. We do this by setting the
	// (n + 1)th fret to be the width of our fretboard diagram, and solving
	// for the scale length as derived from the article linked above.
	private get scaleLengthSP(): number {
		const n = this.frets + 1;
		const c = 2**(n/12);
		return (this.widthSP * c)/(c - 1);
	}

	private get scaleLength(): number {
		return this.scaleLengthSP * this.staffSpace;
	}

	public getFretPosition(n: number): number {
		return this.getFretPositionSP(n) * this.staffSpace;
	}

	// Fret position formula derived from: https://www.proguitar.com/articles/guitar-construction
	public getFretPositionSP(n: number): number {
		return this.scaleLengthSP - (this.scaleLengthSP * 2**(-n/12));
	}
}
