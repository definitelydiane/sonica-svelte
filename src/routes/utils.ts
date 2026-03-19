export const randomIdx = (arr: any[]): number => Math.floor(Math.random() * arr.length);

export const fillGrabBag = (bag: string[], pitches: string[]) => {
		while (bag.length < pitches.length) {
			const idx = randomIdx(pitches);
			if (!bag.includes(pitches[idx])) bag.push(pitches[idx]);
		}
	};
