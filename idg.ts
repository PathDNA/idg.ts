export class ID {
	// Index (uint64, beware of overflow)
	// TODO: Implement uint64 support so this is proper
	private index: number;
	// Timestamp (in seconds)
	private ts: number;

	constructor(index: number, ts: number) {
		this.index = index;
		this.ts = ts;
	}

	Index(): number {
		return this.index;
	}

	Date(): Date {
		// Timestamp is stored as seconds, Javascript Date object is parsed as milliseconds
		return new Date(this.ts * 1000);
	}
}

export function Parse(str: string): ID {
	// Decode base64 string
	const decoded = atob(str);
	// Check if the decoded length is proper
	if (decoded.length !== 16) {
		throw ("invalid string length, expected 16 and received " + decoded.length);
	}
	// Get index bytes from first 8 characters
	const indexBytes = getBytes(decoded.substring(0, 8));
	// Get timestamp bytes from last 8 characters
	const tsBytes = getBytes(decoded.substring(8, 16));
	return new ID(parseBytes(indexBytes), parseBytes(tsBytes))
}

function getBytes(str: string): Uint8Array {
	// Initialize array
	const bytes = new Uint8Array(8);
	// Array index
	let j = 8;
	// String index
	let i = 0;
	// Iterate through all indexes
	while (j--) {
		// Since our string is little endian, we need to populate the array in reverse
		bytes[j] = str.charCodeAt(i++);
	}

	return bytes;
}


function parseBytes(bytes: Uint8Array): number {
	// Return value
	var n = 0;
	// Iterate through each byte
	bytes.forEach(function (byte: number, i: number) {
		// Increment value by byte-value
		n += byte;
		if (i < bytes.length - 1) {
			// We are not at the last byte, perform a bit shift
			n = n << 8;
		}
	});

	return n;
}