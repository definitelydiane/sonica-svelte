import { FontMeta } from '$lib/smufl/data.ts';
import { createContext } from "svelte";

export class FretboardContextBase {
	public heightSP = $state(0);
	public widthSP = $state(0);
	protected _staffLines = $state(5);

	private _staffSpace = $state(16);
	/**
	 * [top, right, bottom, left]; same as CSS (NESW)
	 */
	private _marginSP = $state([0,0,0,0]);

	public engravingDefaults = FontMeta.engravingDefaults;

	constructor() {
		this.height = 128;
		this.width = 256;
	}

	public get height(): number {
		return this.heightSP * this.staffSpace;
	}
	public set height(h: number) {
		this.heightSP = h / this.staffSpace;
	}

	public get width(): number {
		return this.widthSP * this.staffSpace;
	}
	public set width(w: number) {
		this.widthSP = w / this.staffSpace;
	}

	public get staffSpace(): number {
		return this._staffSpace;
	}

	/**
	 * Setting staffSpace will maintain the current height/width/margins
	 */
	public set staffSpace(s: number) {
		const scaleFactor = this.staffSpace / s;

		// Make sure to scale the staff space values without changing the
		// derived pixel values
		this.heightSP *= scaleFactor;
		this._marginSP = this.marginSP.map(v => v * scaleFactor);
		this._staffSpace = s;
	}

	public get staffLines(): number {
		return this._staffLines;
	}

	public set staffLines(n: number) {
		this._staffLines = n;
	}

	public get marginSP(): [number, number, number, number] {
		return this._marginSP;
	}

	public get margin(): [number, number, number, number] {
		return this.marginSP.map(v => v * this.staffSpace);
	}

	public get staffHeight() {
		return this.staffSpace * (this.staffLines - 1);
	};

	public get bottomStaffLine() {
		return this.margin[0] + this.staffHeight;
	}
}

export class FretboardContext extends FretboardContextBase {

	constructor() {
		super();
	}

	public get marginSP(): [number, number, number, number] {
		return this._marginSP;
	}

	public get margin(): [number, number, number, number] {
		return this.marginSP.map(v => v * this.staffSpace);
	}

	/**
	 * Values accepted in the format of CSS margins:
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin
	 *
	 * Examples:
	 * - `margin(1)` and `margin([1])` will apply margin of 1 on all four sides
	 * - `margin([1, 2])` will apply a margin of 1 on top-bottom and 2 on left-right
	 * - etc.
	 */
	public set marginSP(v: number | number[]) {
		if(typeof(v) === "number") {
			this._marginSP = [v, v, v, v];
		} else {
			switch(v.length) {
				case 1: // all sides
					this._marginSP = [v[0], v[0], v[0], v[0]];
					break;
				case 2: // top-bottom | left-right
					this._marginSP = [v[0], v[1], v[0], v[1]];
					break;
				case 3: // top | left-right | bottom
					this._marginSP = [v[0], v[1], v[2], v[1]];
					break;
				case 4:
					this._marginSP = [...v];
					break;
				default:
					throw new Error("Invalid array length. Expected 1-4 elements.");
			}
		}
	}

	public set margin(v: number | number[]) {
		if(typeof(v) === "number") {
			this.marginSP = v / this.staffSpace;
		} else {
			this.marginSP = [...v.map(i => i / this.staffSpace)];
		}
	}
}

export class FretboardCenteredContext extends FretboardContextBase {
	constructor() {
		super();
		this._staffLines = 5;
		this.centerVertical();
	}

	private centerVertical() {
		this._marginSP[0] = [(this.heightSP - (this.staffLines - 1)) / 2];
		this._marginSP[2] = [(this.heightSP - (this.staffLines - 1)) / 2];
	}

	public set height(h: number) {
		this.heightSP = h / this.staffSpace;
		this.centerVertical();
	}

	public get height() {
		return this.heightSP * this.staffSpace;
	}

	public set staffLines(n: number) {
		this._staffLines = n;
		this.centerVertical();
	}

	public get staffLines() {
		return this._staffLines;
	}
}



export const [getFretboardContext, setFretboardContext] = createContext<FretboardContextBase>();
