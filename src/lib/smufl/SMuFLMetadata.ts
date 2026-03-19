interface IGlyph {
	readonly codepoint: number;
	readonly description: string;
	readonly alternateCodepoint?: number;

	readonly bBoxNE: [number, number];
	readonly bBoxSW: [number, number];

	readonly advanceWidth: number;

	readonly offsetY: number; // In staff height units
}

export class Glyph implements IGlyph {
	readonly codepoint: number;
	readonly description: string;
	readonly alternateCodepoint?: number;

	readonly bBoxNE: [number, number];
	readonly bBoxSW: [number, number];

	readonly advanceWidth: number = 0;
	readonly offsetY: number = 0;

	public get height(): number {
		return this.bBoxNE[1] - this.bBoxSW[1];
	}

	public get width(): number {
		return this.bBoxNE[0] - this.bBoxSW[0];
	}

	constructor(params: IGlyph) {
		this.codepoint = params.codepoint;
		this.description = params.description;
		this.alternateCodepoint = params.alternateCodepoint;
		this.bBoxNE = params.bBoxNE;
		this.bBoxSW = params.bBoxSW;
		this.advanceWidth = params.advanceWidth ?? 0;
		this.offsetY = params.offsetY;
	}

	public toString(): string {
		return String.fromCodePoint(this.codepoint);
	}
}

