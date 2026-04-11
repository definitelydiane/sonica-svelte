import { describe, test, expect } from "vitest";

import { FontMeta } from "$lib/smufl/data.ts";
import { StaffContext} from "$lib/score/ScoreContext.svelte.ts";
import { StaffContextBase } from "$lib/score/ScoreContext.svelte.ts";
import { StaffCenteredContext } from "$lib/score/ScoreContext.svelte.ts";

describe("StaffContextBase", () => {
	test.each([0, 1, 2, 3, 4, 5, 6])("staffHeight is calculated correctly for %d staff lines", (d) => {
		const ctx = new StaffContextBase();
		ctx.staffSpace = 16;

		ctx.staffLines = d;
		expect(ctx.staffHeight).toEqual(ctx.staffSpace * (d - 1));
	});
});

describe("StaffContext", () => {
	test("is initialized with default values", () => {
		const ctx = new StaffContext();
		const defaults = {
			sp: 16,
			hsp: 128 / 16,
			wsp: 256 / 16,
			msp: [0, 0, 0, 0]
		};

		expect(ctx.staffSpace).toEqual(defaults.sp);
		expect(ctx.heightSP).toEqual(defaults.hsp);
		expect(ctx.widthSP).toEqual(defaults.wsp);
		expect(ctx.marginSP).toEqual(defaults.msp);

	});

	test("height and heightSP can be assigned interchangeably", () => {
		const ctx = new StaffContext();

		ctx.height = 256;
		expect(ctx.heightSP).toEqual(256 / ctx.staffSpace);

		ctx.heightSP = 10;
		expect(ctx.height).toEqual(ctx.staffSpace * 10);
	});

	test("width and widthSP can be assigned interchangeably", () => {
		const ctx = new StaffContext();

		ctx.width = 512;
		expect(ctx.widthSP).toEqual(512 / ctx.staffSpace);

		ctx.widthSP= 10;
		expect(ctx.width).toEqual(ctx.staffSpace * 10);
	});

	test.each([
		[20, 256],
		[12, 256],
	])("Setting staffSpace to %d correctly mutates heightSP and marginSP without changing height (%d)", (sp, h) => {
		const ctx = new StaffContext();
		ctx.height = h;
		ctx.margin = h;

		expect(ctx.heightSP).toEqual(h / ctx.staffSpace);
		expect(ctx.marginSP).toEqual([h, h, h, h].map(v => v / ctx.staffSpace));

		ctx.staffSpace = sp;

		// Height, margin remains unchanged
		expect(ctx.height).toEqual(h);
		expect(ctx.margin).toEqual([h, h, h, h]);

		expect(ctx.heightSP).toEqual(h / sp);
		expect(ctx.marginSP).toEqual([h, h, h, h].map(v => v / sp));
	});

	test.each([[20, 512], [12, 512]])("Setting staffSpace to %d correctly mutates widthSP without changing width (%d)", (sp, w) => {
		const ctx = new StaffContext();
		ctx.width = w;
		expect(ctx.widthSP).toEqual(w / ctx.staffSpace);

		ctx.staffSpace = sp;

		// Width remains unchanged
		expect(ctx.width).toEqual(w);
		expect(ctx.widthSP).toEqual(w / sp);
	});

	describe("margin", () => {

		test("marginSP = 2 sets all margin values to 2", () => {
			const ctx = new StaffContext();
			ctx.marginSP = 2;
			expect(ctx.marginSP).toEqual([2, 2, 2, 2]);
		});

		test("marginSP = [2] sets all margin values to 2", () => {
			const ctx = new StaffContext();
			ctx.marginSP = [2];
			expect(ctx.marginSP).toEqual([2, 2, 2, 2]);
		});

		test("marginSP = [2, 3] sets top-bottom to 2 and left-right to 3", () => {
			const ctx = new StaffContext();
			ctx.marginSP = [2, 3];
			expect(ctx.marginSP).toEqual([2, 3, 2, 3]);
		});

		test("marginSP = [2, 3, 4] sets top to 2, left-right to 3, and bottom to 4", () => {
			const ctx = new StaffContext();
			ctx.marginSP = [2, 3, 4];
			expect(ctx.marginSP).toEqual([2, 3, 4, 3]);
		});

		test("marginSP = [1, 2, 3, 4] sets the margins of the returned instance", () => {
			const ctx = new StaffContext();
			ctx.marginSP = [1, 2, 3, 4];
			expect(ctx.marginSP).toEqual([1, 2, 3, 4]);
		});

		test("Assigning to margin and marginSP throws an error when the array is an invalid length", () => {
			const ctx = new StaffContext();
			expect(() => ctx.marginSP = []).toThrow("Invalid array length. Expected 1-4 elements.");
			expect(() => ctx.marginSP = [1, 2, 3, 4, 5]).toThrow("Invalid array length. Expected 1-4 elements.");
		});

		test("margin = 2 sets all margin values to 2", () => {
			const expected = [2, 2, 2, 2];

			const ctx = new StaffContext();
			ctx.margin = 2;

			expect(ctx.margin).toEqual(expected);
			expect(ctx.marginSP).toEqual(expected.map(v => v / ctx.staffSpace)); 
		});

		test("margin = [2] sets all margin values  to 2", () => {
			const expected = [2, 2, 2, 2];

			const ctx = new StaffContext();
			ctx.margin = [2];

			expect(ctx.margin).toEqual(expected);
			expect(ctx.marginSP).toEqual(expected.map(v => v / ctx.staffSpace)); 
		});

		test("margin = [2, 3] sets top-bottom to 2 and left-right to 3", () => {
			const expected = [2, 3, 2, 3];

			const ctx = new StaffContext();
			ctx.margin = [2, 3];

			expect(ctx.margin).toEqual(expected);
			expect(ctx.marginSP).toEqual(expected.map(v => v / ctx.staffSpace));
		});

		test("margin = [2, 3, 4] sets top to 2, left-right to 3, and bottom to 4", () => {
			const expected = [2, 3, 4, 3];

			const ctx = new StaffContext();
			ctx.margin = [2, 3, 4];

			expect(ctx.margin).toEqual(expected);
			expect(ctx.marginSP).toEqual(expected.map(v => v / ctx.staffSpace));
		});

		test("marginSP = [1, 2, 3, 4] sets the margins of the returned instance", () => {
			const expected = [1, 2, 3, 4];

			const ctx = new StaffContext();
			ctx.margin = [1, 2, 3, 4];

			expect(ctx.margin).toEqual(expected);
			expect(ctx.marginSP).toEqual(expected.map(v => v / ctx.staffSpace));
		});
	});
});

describe("StaffCenteredContext", () => {
	test("margin is readonly", () => {
		const ctx = new StaffCenteredContext();
		expect(() => ctx.margin = [2]).toThrow();
		expect(() => ctx.marginSP = [2]).toThrow();

		expect(ctx.margin).not.toBe(undefined);
		expect(ctx.marginSP).not.toBe(undefined);
	});

	test("vertical margin should be automatically set from constructor", () => {
		const ctx = new StaffCenteredContext();
		const defaultHeight  = 128;

		const marginY = (defaultHeight - (ctx.staffSpace * (ctx.staffLines - 1))) / 2;
		expect(ctx.margin).toEqual([marginY, 0, marginY, 0]);
	});

	test("vertical margins are re-calculated when size changes", () => {
		const ctx = new StaffCenteredContext();

		// Function to calculate the expected vertical margins based on h
		const marginY = (h: number) => (h - (ctx.staffSpace * (ctx.staffLines - 1))) / 2;

		let controlHeight = 128
		let testHeight = 256;

		ctx.height = controlHeight;

		const y1 = marginY(controlHeight);
		expect(ctx.margin).toEqual([y1, 0, y1, 0]);

		// Resize the height
		ctx.height = testHeight;
		const y2 = marginY(testHeight);
		expect(ctx.margin).toEqual([y2, 0, y2, 0]);

		// Make sure the setter has a corresponding getter
		expect(ctx.height).toEqual(256);
	});

	test("vertical margins are re-calculated when number of staff lines change", () => {
		const ctx = new StaffCenteredContext();
		const controlStaffLines = 5;
		const testStaffLines = 6;

		const marginY = (l: number) => (ctx.height - (ctx.staffSpace * (l - 1))) / 2;

		ctx.staffLines = controlStaffLines;
		const y1 = marginY(controlStaffLines);
		expect(ctx.margin).toEqual([y1, 0, y1, 0]);
		expect(ctx.staffLines).toEqual(5);

		ctx.staffLines = testStaffLines;
		const y2 = marginY(testStaffLines);
		expect(ctx.margin).toEqual([y2, 0, y2, 0]);
		expect(ctx.staffLines).toEqual(6);
	});
});
