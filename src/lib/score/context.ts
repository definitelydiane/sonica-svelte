import { createContext } from "svelte";
import { FontMeta } from "$lib/smufl/data.ts";

export interface ScoreContext {
	height: number;
	width: number;
	staffSpace: number;

	// [top, right, bottom, left], same as CSS (NESW)
	margin: [number, number, number, number];
}

export const DefaultScoreContext: ScoreContext = {
	height: 128,
	width: 256,
	staffSpace: 16,
	margin: [12, 12, 12, 12],
	engravingDefaults: FontMeta.engravingDefaults,
} as const;

export const [getScoreContext, setScoreContext] = createContext<ScoreContext>();
