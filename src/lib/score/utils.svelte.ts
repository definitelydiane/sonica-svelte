import type { ScoreContext } from "$lib/score/context.ts";

export function getStaffHeight(ctx: ScoreContext) {
	return ctx.staffSpace * 4;
}

export function getBottomStaffLine(ctx: ScoreContext) {
	return ctx.margin[0] + getStaffHeight(ctx);
}

export const letterMap = {
	'A': 0,
	'B': 1,
	'C': 2,
	'D': 3,
	'E': 4,
	'F': 5,
	'G': 6,
} as const;

export const accidentalMap = {
	"#": "accidentalSharp",
	"##": "accidentalDoubleSharp",
	"b": "accidentalFlat",
	"bb": "accidentalDoubleFlat",
}

type Pitch = {
	letterClass: keyof typeof letterMap;
	accidental?: "accidentalSharp" | "accidentalDoubleSharp" | "accidentalFlat" | "accidentalDoubleFlat";
	octave: number;
}
// In scientific pitch notation
export function parsePitch(pitch: string): Pitch {
	const re = /([A-G])(#|##|b|bb)?([0-9]+)/;
	const matches = pitch.match(re);
	if(!matches) throw new Error();
	return {
		letterClass: letterMap[matches[1]],
		accidental: matches[2] ? accidentalMap[matches[2]] : undefined,
		octave: parseInt(matches[3])
	}
}

// Returns the number of staff half-spaces away from the
// baseline this a pitch should be. Negative values
// are below the staff. This method by default takes
// the pitch as a string
export function getStaffPosition({clef, pitch}: {
	clef: "G" | "F",
	pitch: string 
}): number {
	const p = parsePitch(pitch);
	let baseline;
	switch(clef) {
		// Add more cases here to account for more clefs
		case "G":
			baseline = {
				letterClass: 4,
				accidental: undefined,
				octave: 4,
			};
			break;
		case "F":
			baseline = {
				letterClass: 6,
				accidental: undefined,
				octave: 2,
			};
			break;
	}

	return 8 * (p.octave - baseline.octave) + (p.letterClass - baseline.letterClass) - (p.octave - baseline.octave);
}

export function getClefGlyphName(clef: 'G' | 'F'): 'gClef' | 'fClef' {
	switch(clef) { 
		case 'G':
			return 'gClef';
		case 'F':
			return 'fClef';
	}
}
