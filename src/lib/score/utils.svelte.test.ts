import { describe, test, expect } from "vitest";

import { Clef, Pitch, PitchLetter, Accidental, getPitchAtStaffPosition } from "./utils.svelte";
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

test.each(
		[[Clef.G, -0.5, 'D'],
		[Clef.G, -1.5, 'B'],
		[Clef.G, -2, 'A'],
		[Clef.G, -2.5, 'G'],
		[Clef.G, -3, 'F'],
		[Clef.G, -4, 'D'],
		[Clef.G, -5, 'B'],
		[Clef.G, 0, 'E'],
		[Clef.G, 0.5, 'F'],
		[Clef.G, 1, 'G'],
		[Clef.G, 1.5, 'A'],
		[Clef.G, 2, 'B'],
		[Clef.G, 2.5, 'C'],
		[Clef.G, 3, 'D'],
		[Clef.G, 3.5, 'E'],
		[Clef.G, 4, 'F'],

		[Clef.F, -0.5, 'F'],
		[Clef.F, 0, 'G']]
	)("getPitchAtStaffPosition returns the correct letter class (%s, %s, %s)", (clef, space, pitch) => {
	const result = getPitchAtStaffPosition(clef, space);
	expect(result.letterClass).toEqual(pitch);
});

test("getPitchAtStaffPosition numeric octave", () => {
	const result = getPitchAtStaffPosition(Clef.G, -1.5);
	expect(result.octave).toEqual(3);
});

test.each(
		[
		[Clef.G, -5, 'B2'],
		[Clef.G, -4.5, 'C3'],
		[Clef.G, -4, 'D3'],
		[Clef.G, -3.5, 'E3'],
		[Clef.G, -3, 'F3'],
		[Clef.G, -2.5, 'G3'],
		[Clef.G, -2, 'A3'],
		[Clef.G, -1.5, 'B3'],
		[Clef.G, -1, 'C4'],
		[Clef.G, -0.5, 'D4'],
		[Clef.G, 0, 'E4'],
		[Clef.G, 0.5, 'F4'],
		[Clef.G, 1, 'G4'],
		[Clef.G, 1.5, 'A4'],
		[Clef.G, 2, 'B4'],
		[Clef.G, 2.5, 'C5'],
		[Clef.G, 3, 'D5'],
		[Clef.G, 3.5, 'E5'],
		[Clef.G, 4, 'F5'],

		[Clef.F, 0, 'G2']]
	)("getPitchAtStaffPosition returns the correct pitch (%s, %s, %s)", (clef, space, pitch) => {
	const result = getPitchAtStaffPosition(clef, space);
	expect(result.toString()).toEqual(pitch);
});

test.each([
	[Pitch.fromSPN('C0'), 0],
	[Pitch.fromSPN('D0'), 1],
	[Pitch.fromSPN('E0'), 2],
	[Pitch.fromSPN('F0'), 3],
	[Pitch.fromSPN('G0'), 4],
	[Pitch.fromSPN('A0'), 5],
	[Pitch.fromSPN('B0'), 6],
	[Pitch.fromSPN('C1'), 7],
	[Pitch.fromSPN('D1'), 8],
	[Pitch.fromSPN('E1'), 9],
])("Pitch.staffScalar yields the correct scalar value", (pitch, scalar) => {
	expect(pitch.staffScalar).toEqual(scalar);
});

test.each([
	[0, Pitch.fromSPN('C0')],
	[1, Pitch.fromSPN('D0')],
	[2, Pitch.fromSPN('E0')],
	[3, Pitch.fromSPN('F0')],
	[4, Pitch.fromSPN('G0')],
	[5, Pitch.fromSPN('A0')],
	[6, Pitch.fromSPN('B0')],
	[7, Pitch.fromSPN('C1')],
	[8, Pitch.fromSPN('D1')],
	[9, Pitch.fromSPN('E1')],
])("Pitch.fromStaffScalar correctly deserialiezs from a scalar value %s", (scalar, result) => {
	expect(Pitch.fromStaffScalar(scalar)).toEqual(result);
});

test.each([
	[Clef.G, Pitch.fromSPN('B3'), -3],
	[Clef.G, Pitch.fromSPN('C4'), -2],
	[Clef.G, Pitch.fromSPN('D4'), -1],
	[Clef.G, Pitch.fromSPN('E4'), 0],
	[Clef.G, Pitch.fromSPN('F4'), 1],
	[Clef.G, Pitch.fromSPN('G4'), 2],
	[Clef.G, Pitch.fromSPN('A4'), 3],
	[Clef.G, Pitch.fromSPN('B4'), 4],
	[Clef.G, Pitch.fromSPN('C5'), 5],
	[Clef.G, Pitch.fromSPN('D5'), 6],

	[Clef.F, Pitch.fromSPN('F2'), -1],
	[Clef.F, Pitch.fromSPN('G2'), 0],
	[Clef.F, Pitch.fromSPN('A2'), 1],
])("Pitch.positionOnStaff correctly returns a scalar representing the position on a staff (%s, %s, %s)", (clef, pitch, result) => { 
	expect(pitch.positionOnStaff(clef)).toEqual(result);
});

