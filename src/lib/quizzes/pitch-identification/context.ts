import { createContext } from "svelte";
import { Clef } from "$lib/score/utils.svelte.ts";

export interface ClefConfig {
	enabled: boolean,
	range: {
		min: string,
		max: string,
	},
	sharps: boolean,
	flats:  boolean,
}

export interface PitchQuizConfigContext {
	general: {
		hideUnusedButtons: boolean,
	},
	clefs: {
		[Clef.G]: ClefConfig,
		[Clef.F]: ClefConfig,
	}
}

export const DefaultPitchQuizConfigContext: PitchQuizConfigContext = {
	general: {
		hideUnusedButtons: false,
	},
	clefs: {
		[Clef.G]: {
			enabled: true,
			range: {
				min: 'D4',
				max: 'G5',
			},
			sharps: true,
			flats: true,
		},
		[Clef.F]: {
			enabled: true,
			range: {
				min: 'F2',
				max: 'B3',
			},
			sharps: true,
			flats: true
		}
	}
}

export const [getPitchQuizContext, setPitchQuizContext] = createContext<PitchQuizConfigContext>();
