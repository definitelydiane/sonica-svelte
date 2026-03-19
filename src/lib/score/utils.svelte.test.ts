import { describe, test, expect } from "vitest";

import { parsePitch } from "./utils.svelte";

describe("parsePitch", () => {
	test.each(
		[["A4", 0],
		["B4", 1],
		["C4", 2],
		["D4", 3],
		["E4", 4],
		["F4", 5],
		["G4", 6]],
	)("Parses natural pitches (%s)", (p, c) => {
		const result = parsePitch(p);
		expect(result).toStrictEqual({
			letterClass: c,
			accidental: undefined,
			octave: 4
		});
	});

	test("Parses sharps and flats", () => {
		let result;
		result = parsePitch("C#5");
		expect(result).toStrictEqual({
			letterClass: 2,
			accidental: "accidentalSharp",
			octave: 5
		});

		result = parsePitch("C##5");
		expect(result).toStrictEqual({
			letterClass: 2,
			accidental: "accidentalDoubleSharp",
			octave: 5
		});

		result = parsePitch("Db5");
		expect(result).toStrictEqual({
			letterClass: 3,
			accidental: "accidentalFlat",
			octave: 5
		});

		result = parsePitch("Dbb5");
		expect(result).toStrictEqual({
			letterClass: 3,
			accidental: "accidentalDoubleFlat",
			octave: 5
		});
	});

	test("Throws when passed invalid letter", () => {
		expect(() => parsePitch("H4")).toThrowError();
	});

	test("Throws when passed an invalid string", () => {
		expect(() => parsePitch("duck")).toThrowError();
	});

	test("Throws when passed a string with invalid number of accidentals", () => {
		expect(() => parsePitch("C###5")).toThrowError();
	});
});
