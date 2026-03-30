import { createContext } from "svelte";

export interface ScoreContext {
	height: number;
	width: number;
	staffSpace: number;

	// [top, right, bottom, left], same as CSS (NESW)
	margin: [number, number, number, number];
}

export const [getScoreContext, setScoreContext] = createContext<() => ScoreContext>();
