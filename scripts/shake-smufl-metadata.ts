// TODO: write this as a SMuFL library for publish
import GlyphNameMeta from "../src/lib/smufl/metadata/glyphnames.json" with {type: "json" };
import GlyphClasses from "../src/lib/smufl/metadata/classes.json" with {type: "json" };
import BravuraMeta from "../src/lib/smufl/metadata/bravura_metadata.json" with {type: "json" };

import { readdir, readFile, writeFile } from "node:fs/promises";

if(import.meta.main) {
	try {
		await shakeSMuFL();
		console.log("Done.");
	} catch(e) {
		console.error(e)
	}
}

export async function shakeSMuFL() {
	const fnames = await getFilePaths({
		ignoreDirs: [
			".git",
			"node_modules",
			".svelte",
			".svelte-kit",
			".vscode"
		],
	});
	const glyphNames = new Set();

	const reGlyphCalls = /(?<=getGlyph\(")([A-Za-z]+)(?="\))/g;
	const reComponentCalls = /(?<=name={?("|'))[A-Za-z]+(?=}?("|'))/g;
	const stringLiterals = /(?<=("|'))[A-Za-z]+(?=("|'))/g;
	for(const fname of fnames) {
		const data = await readFile(fname, { encoding: "utf-8" });
		for(const match of data.matchAll(stringLiterals)) {
			glyphNames.add(match[0]);
		}
	}

	let glyphNameOutput = extractGlyphNames({ glyphNames });
	let classes = extractClassMeta({glyphNames});
	let fontMeta = extractFontMeta(glyphNames);

	await writeFile("src/lib/smufl/data.ts",
`
export const GlyphNames = ${JSON.stringify(glyphNameOutput, undefined, 2)} as const;

export const Classes = ${JSON.stringify(classes, undefined, 2)} as const;

export const FontMeta = ${JSON.stringify(fontMeta, undefined, 2)} as const;
`);
}

async function getFilePaths({ignoreDirs, ignoreFiles}: {
} = { ignoreDirs: [".git", "node_modules"], ignoreFiles: [] }): string[] {

	const dirs = ["."];
	const ignoreDirSet = new Set(ignoreDirs);
	const results = [];
	const re = /.+\.svelte(.ts|.js)?(?!.+)/g;

	while(dirs.length) {
		const dir = dirs.shift();
		const dirents = await readdir(dir, { withFileTypes: true });
		for await (const dirent of dirents) {
			const dpath = `${dir}/${dirent.name}`;
			if(dirent.isDirectory() && !ignoreDirSet.has(dpath.slice(2))) {
					dirs.push(dpath);
			 } else if(dirent.isFile() &&
				 (re.test(dirent.name) || dirent.name == "+page.svelte") // why re.test fail??
			) {
					results.push(dpath);
			}
		}
	}
	return results;
}

function extractGlyphNames({glyphNames}: Set<string>): Object {
	const output = {};
	for(const gname of glyphNames) {
		// @ts-ignore 
		// We need to check if the Glyph name actually exists here.
		// although we already type this when we generate the types.ts
		output[gname] = GlyphNameMeta[gname];
	}
	return output;
}

function extractClassMeta({glyphNames, ignoreClasses }: {
	glyphNames: Set<string>,
	ignoreClasses?: Set<string>
}): Object {
	const result = {};

	for(const key in GlyphClasses) {
		const glyphs = new Set(GlyphClasses[key]);
		// Use the Set.intersection function to get the
		// shared keys between the glyphs we're actually
		// using and the glyphs in the metadata.
		const intersection = glyphNames.intersection(glyphs);
		if(intersection.size) {
			result[key] = Array.from(intersection.values());
		}
	}

	return result;
}

function extractFontMeta(glyphNames: Set<string>): Object {
	const result = {};

	// Handles properties where the glyph is used as a key
	// E.g.glyphAdvanceWidths, glyphsWithAlternates, etc.
	const handleGlyphAsKey = (key: string) => {
		const obj = BravuraMeta[key];
		const keySet = new Set(Object.keys(obj));
		const intersection = glyphNames.intersection(keySet);
		if(!intersection.size) return;
		result[key] = {};
		for(const k of intersection.values()) {
			result[key][k] = obj[k];
		}
	}

	for(const key in BravuraMeta) {
		switch(key) {
			case "fontName":
			case "fontVersion":
			case "engravingDefaults":
				result[key] = BravuraMeta[key];
				break;
			case "glyphAdvanceWidths":
			case "glyphBBoxes":
			case "glyphsWithAlternates":
			case "glyphsWithAnchors":
			case "ligatures":
			case "optionalGlyphs":
				handleGlyphAsKey(key);
				break;
			// TODO: sets?
		}
	}

	return result;
}
