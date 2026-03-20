import { describe, test, expect } from "vitest";

import { Pitch, PitchLetter, Accidental } from "./utils.svelte";
describe("Pitch.fromSPN", () => {
	test.each(
		[["A4", PitchLetter.A],
		["B4", PitchLetter.B],
		["C4", PitchLetter.C],
		["D4", PitchLetter.D],
		["E4", PitchLetter.E],
		["F4", PitchLetter.F],
		["G4", PitchLetter.G]],
	)("Parses natural pitches (%s)", (p, c) => {
		const result = Pitch.fromSPN(p);
		expect(result.letterClass).toEqual(c);
		expect(result.accidental).toEqual(undefined);
		expect(result.octave).toEqual(4);
	});

	test("Parses sharps and flats", () => {
		let result;
		result = Pitch.fromSPN("C#5");
		expect(result.letterClass).toEqual(PitchLetter.C);
		expect(result.accidental).toEqual(Accidental.Sharp);
		expect(result.octave).toEqual(5);
			
		result = Pitch.fromSPN("C##5");
		expect(result.letterClass).toEqual(PitchLetter.C);
		expect(result.accidental).toEqual(Accidental.DoubleSharp);
		expect(result.octave).toEqual(5);

		result = Pitch.fromSPN("Db5");
		expect(result.letterClass).toEqual(PitchLetter.D);
		expect(result.accidental).toEqual(Accidental.Flat);
		expect(result.octave).toEqual(5);

		result = Pitch.fromSPN("Dbb5");
		expect(result.letterClass).toEqual(PitchLetter.D);
		expect(result.accidental).toEqual(Accidental.DoubleFlat);
		expect(result.octave).toEqual(5);
	});

	test("Throws when passed invalid letter", () => {
		expect(() => Pitch.fromSPN("H4")).toThrowError();
	});

	test("Throws when passed an invalid string", () => {
		expect(() => Pitch.fromSPN("duck")).toThrowError();
	});

	test("Throws when passed a string with invalid number of accidentals", () => {
		expect(() => Pitch.fromSPN("C###5")).toThrowError();
	});
});

test("getStaffPosition throws when both `pitch` and `pitchClass` are undefined", () => {
	expect(() => getStaffPosition({clef: 'G'})).toThrowError();
});
