import type { ScoreContext } from "$lib/score/context.ts";

export function getStaffHeight(ctx: ScoreContext) {
	return ctx.staffSpace * 4;
}

export function getBottomStaffLine(ctx: ScoreContext) {
	return ctx.margin[0] + getStaffHeight(ctx);
}

export const letterMap = {
	'A': 5,
	'B': 6,
	'C': 0,
	'D': 1,
	'E': 2,
	'F': 3,
	'G': 4,
} as const;

export enum PitchLetter {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	E = 'E',
	F = 'F',
	G = 'G'
}

export enum Clef {
	G = 'gClef',
	F = 'fClef',
}

export enum Accidental {
	Sharp = "accidentalSharp",
	Flat = "accidentalFlat",
	DoubleSharp = "accidentalDoubleSharp",
	DoubleFlat = "accidentalDoubleFlat",
}

export const accidentalMap = {
	"#": Accidental.Sharp,
	"##": Accidental.DoubleSharp,
	"b": Accidental.Flat,
	"bb": Accidental.DoubleFlat,
}

export type PitchArgs = {
	letterClass: PitchLetter;
	accidental?: Accidental;
	octave: number;
}

export class Pitch {
	public readonly letterClass: PitchLetter;
	public readonly accidental?: Accidental;
	public readonly octave: number;

	private readonly accidentalStr: string;

	constructor(args: PitchArgs) {
		this.letterClass = args.letterClass;
		this.accidental = args.accidental;

		switch(this.accidental) {
			case Accidental.Sharp:
				this.accidentalStr = "#";
				break;
			case Accidental.Flat:
				this.accidentalStr = "b";
				break;
			case Accidental.DoubleSharp:
				this.accidentalStr = "##";
				break;
			case Accidental.DoubleFlat:
				this.accidentalStr = "bb";
				break;
			default:
				this.accidentalStr = "";
				break;
		}
		this.octave = args.octave;
	}

	/**
	* Parses a scientific pitch notation string an deserializes it into a Pitch object
	*/
	public static fromSPN(spn: string): Pitch {
		const re = /([A-G])(#|##|b|bb)?([0-9]+)/;
		const matches = spn.match(re);
		if(!matches) throw new Error(`Failed to parse scientific pitch notation ${spn}`);
		return new Pitch({
			letterClass: PitchLetter[matches[1]],
			accidental: matches[2] ? accidentalMap[matches[2]] : undefined,
			octave: parseInt(matches[3])
		});
	}

	/**
	 * Return a scientific pitch notation string
	 */
	public toString(): string {
		return `${this.letterClass}${this.accidentalStr}${this.octave}`;
	}

	get spnName(): string {
		return `${this.letterClass}${this.accidentalStr}`;
	}
}

// TODO: move this logic into Pitch class.
//
// Returns the number of staff half-spaces away from the
// baseline this a pitch should be. Negative values
// are below the staff. This method by default takes
// the pitch as a string
export function getStaffPosition({clef, pitch, pitchString}: {
	clef: Clef,
	pitchString?: string,
	pitch?: Pitch
}): number {
	if(!pitchString && !pitch) {
		throw new Error("Expected one of 'pitch' or 'pitchString' passed to getStaffPosition but received undefined");
	}
	const p: Pitch = pitch ?? Pitch.fromSPN(pitch);
	let baseline;
	switch(clef) {
		// Add more cases here to account for more clefs
		case Clef.G:
			baseline = {
				letterClass: PitchLetter.E,
				accidental: undefined,
				octave: 4,
			};
			break;
		case Clef.F:
			baseline = {
				letterClass: PitchLetter.G,
				accidental: undefined,
				octave: 2,
			};
			break;
	}

	return 8 * (p.octave - baseline.octave) + (letterMap[p.letterClass] - letterMap[baseline.letterClass]) - (p.octave - baseline.octave);
}

export function getClefGlyphName(clef: 'G' | 'F'): 'gClef' | 'fClef' {
	switch(clef) { 
		case 'G':
			return 'gClef';
		case 'F':
			return 'fClef';
	}
}
