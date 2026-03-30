import type { ScoreContext } from "$lib/score/context.ts";

export function getStaffHeight(ctx: ScoreContext) {
	return ctx.staffSpace * 4;
}

export function getBottomStaffLine(ctx: ScoreContext) {
	return ctx.margin[0] + getStaffHeight(ctx);
}

// A string formatted as Scientific Pitch Notation
export type SPNString = string;

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
	public static fromSPN(spn: SPNString): Pitch {
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
	 * Parses a staffScalar into a new Pitch object.
	 * A staff scalar represents the position of this pitch along the
	 * pitch axis { C0, D0, E0, F0, G0, A0, B0, C1 ... }
	 */
	public static fromStaffScalar(scalar: number) {
		const integerComponent = Math.trunc(scalar / 7); // How many octaves?
		const remainder = scalar % 7;

		// TODO Do this less hacky
		// Right now we are looking up the value in the letter map. this will return undefined
		// if the value is not found in the map.
		const letterClass = Object.entries(letterMap).find(([_, v]) => v === remainder)?.[0];
		return new Pitch({
			letterClass,
			octave: integerComponent,
		});
	}

	/**
	 * Returns an array of Pitch objects 
	 *
	 * TODO: return sharps and flats
	 */
	public static range(begin: Pitch | SPNString, end: Pitch | SPNString, config: {
		sharps: boolean,
		flats: boolean,
	} = { sharps: true, flats: true}): Pitch[] {
		const result = [];

		// SPNString is a type alias for string.
		let i = typeof begin === "string" ? Pitch.fromSPN(begin).staffScalar : begin.staffScalar;
		let j = typeof end === "string" ? Pitch.fromSPN(end).staffScalar : end.staffScalar;

		while(i <= j) {
			// This is a hack for us to get sharps and flats here...
			const p = Pitch.fromStaffScalar(i);
			result.push(p);
			if(config.flats) {
				result.push(new Pitch({
					letterClass: p.letterClass,
					accidental: Accidental.Flat,
					octave: p.octave}));
			}
			if(config.sharps) {
				result.push(new Pitch({
					letterClass: p.letterClass,
					accidental: Accidental.Sharp,
					octave: p.octave}));
			}
			i++;
		}

		return result;
	}

	/**
	 * Return a scientific pitch notation string
	 */
	public toString(): string {
		return `${this.letterClass}${this.accidentalStr}${this.octave}`;
	}

	/**
	 * Return the name of this note (excludes the register)
	 */
	get spnName(): string {
		return `${this.letterClass}${this.accidentalStr}`;
	}

	/**
	 * Staff scalar represents the position of this pitch along the hypothetical
	 * pitch axis { ..., C0, D0, E0, F0, G0, A0, B0, C1 ... }
	 *
	 * Where C0 is the 0th position, D0 is the 1st position, E0 is the 2nd... etc.
	 *
	 *
	 * Returns the singular numeric value of the letterClass component
	 * and the octave component. E.g. A#0 will return the same as A0
	 * and Bb0 will return the same as B0
	 */
	get staffScalar(): number {
		return this.octave * 7 + letterMap[this.letterClass];
	}

	/**
	 * Returns the position on a staff in half-spaces!
	 */
	public positionOnStaff(clef: Clef): number {
		let baseline;
		switch(clef) {
			// Add more cases here to account for more clefs
			case Clef.G:
				baseline = Pitch.fromSPN('E4');
				break;
			case Clef.F:
				baseline = Pitch.fromSPN('G2'); 
				break;
		}

		return this.staffScalar - baseline.staffScalar;
	}

	// Return the lower of 2 pitches
	static lowerStaffScalar(a: Pitch, b: Pitch): Pitch {
		return a.staffScalar < b.staffScalar ? a : b;
	}

	static higherStaffScalar(a: Pitch, b: Pitch): Pitch {
		return b.staffScalar < a.staffScalar ? a : b;
	}

}

// TODO: move this logic into Pitch class.
// TODO: replace instances of this with Pitch.positionOnStaff
//
// Returns the number of staff half-spaces away from the
// baseline this a pitch should be. Negative values
// are below the staff. This method by default takes
// the pitch as a string
export function getStaffPosition({clef, pitch, pitchString}: {
	clef: Clef,
	pitchString?: SPNString,
	pitch?: Pitch
}): number {
	if(!pitchString && !pitch) {
		throw new Error("Expected one of 'pitch' or 'pitchString' passed to getStaffPosition but received undefined");
	}
	const p: Pitch = pitch ?? Pitch.fromSPN(pitchString);
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

/**
* yPos is in spaces
*
* We can use the staffScalar to determine how far away our note is. Then we can
* do a conversion between the resulting scalar and SPN
*/
export function getPitchAtStaffPosition(clef: Clef, ypos: number): Pitch {
	let baseline;

	switch(clef) {
		case Clef.G:
			baseline = Pitch.fromSPN('E4');
			break;
		case Clef.F:
			baseline = Pitch.fromSPN('G2');
			break;
	}

	const sum = baseline.staffScalar + ypos * 2;

	return Pitch.fromStaffScalar(sum);
}

export function getClefGlyphName(clef: 'G' | 'F'): 'gClef' | 'fClef' {
	switch(clef) { 
		case 'G':
			return 'gClef';
		case 'F':
			return 'fClef';
	}
}
