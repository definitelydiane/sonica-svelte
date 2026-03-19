import { getGlyph } from "$lib/smufl/utils.svelte.ts";

import { expect, test } from "vitest";

// Skip these tests since this is not guaranteed to be correct.
// We can add this test back in when this SMuFL logic is put
// into its own library
test.skip(
	"Retrieves metadata from glyphnames.json",
	() => {
		const glyph = getGlyph("gClef");
		expect(glyph.codepoint).toBe(0xE050);
		expect(glyph.description).toBe("G clef");
		expect(glyph.alternateCodepoint).toBe(0x1D11E);

		const glyphNoAlt = getGlyph("gClef15ma");
		expect(glyphNoAlt.codepoint).toBe(0xE054);
		expect(glyphNoAlt.description).toBe("G clef quindicesima alta");
		expect(glyphNoAlt.alternateCodepoint).toBe(undefined);
	}
);

test.skip(
	"Retrieves bounding box metadata from font metadata",
	() => {
		const glyph = getGlyph("gClef");
		expect(glyph.bBoxNE).toStrictEqual([2.684, 4.392]);
		expect(glyph.bBoxSW).toStrictEqual([0.0, -2.632]);
	}
);
