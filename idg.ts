export class ID {
	private index: number;
	private ts: number;

	constructor(index: number, ts: number) {
		this.index = index;
		this.ts = ts;
	}

	Index(): number {
		return this.index;
	}

	Date(): Date {
		return new Date(this.ts * 1000);
	}
}

export function Parse(str: string): ID {
	const decoded = atob(str);
	if (decoded.length !== 16) {
		throw ("invalid string length, expected 16 and received " + decoded.length);
	}

	const indexBytes = getBytes(decoded.substring(0, 8));
	const tsBytes = getBytes(decoded.substring(8, 16));
	return new ID(parseBytes(indexBytes), parseBytes(tsBytes))
}

function getBytes(str: string): Uint8Array {
	const bytes = new Uint8Array(8);
	let j = 8;

	while (j--) {
		bytes[j] = str.charCodeAt(7 - j);
	}

	return bytes;
}


function parseBytes(bytes: Uint8Array): number {
	var n = 0;
	bytes.forEach(function (byte: number, i: number) {
		n += byte;
		if (i < bytes.length - 1) {
			n = n << 8;
		}
	});

	return n;
}