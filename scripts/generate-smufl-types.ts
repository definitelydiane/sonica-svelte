//
// This script generates an array of keys from the glyphnames.json
//
import fs from "node:fs";
import GlyphNameMeta from "../src/lib/smufl/metadata/glyphnames.json" with { type: "json" }

if (import.meta.main) {
	const lines = ["declare const glyphNames: readonly["];
	for(const key in GlyphNameMeta) {
		lines.push(`\t"${key}",`);
	}
	lines.push("];");
	lines.push("");
	lines.push("export type GlyphName = typeof glyphNames[number];");

	try {
		fs.writeFileSync("src/lib/smufl/types.ts", lines.join("\n"));
		console.log("SMuFL types written to: src/lib/smufl/types.ts");
	} catch (e) {
		console.error(e);
	}
}
