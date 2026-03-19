import { GlyphNames, Classes, FontMeta } from "./data.ts";
import type { GlyphName } from "./types.ts";
import { Glyph } from "./SMuFLMetadata";

export function getGlyph(name: GlyphName) {
	const nameMeta = GlyphNames[name];

	// @ts-ignore: temporary ignore. Maybe not every glyph has a bbox?
	const boundingBox = FontMeta.glyphBBoxes[name];

	// @ts-ignore: Not every glyph may have an advance width
	const advanceWidth = FontMeta.glyphAdvanceWidths[name];

	var offsetY = 0;
	// handle offets for clefs...
	if(Classes["clefsG"].includes(name)) {
		offsetY = 1
	} else if(Classes["clefsF"]?.includes(name)) {
		offsetY = 3
	}

	return new Glyph({
		codepoint: parseCodepointToInt(nameMeta.codepoint),
		description: nameMeta.description,
		alternateCodepoint: "alternateCodepoint" in nameMeta ?
			parseCodepointToInt(nameMeta.alternateCodepoint) :
			undefined,
		advanceWidth,
		offsetY,
		...boundingBox,
	});
}

export function getAdvanceWidth(name: GlyphName): number {
	return FontMeta.glyphAdvanceWidths[name] ?? 0;
}

function parseCodepointToInt(s: string): number {
	return parseInt(s.replace(/^U\+/i, ""), 16);
}
