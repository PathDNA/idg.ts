define("idg", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ID {
        constructor(index, ts) {
            this.index = index;
            this.ts = ts;
        }
        Index() {
            return this.index;
        }
        Date() {
            // Timestamp is stored as seconds, Javascript Date object is parsed as milliseconds
            return new Date(this.ts * 1000);
        }
    }
    exports.ID = ID;
    function Parse(str) {
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
        return new ID(parseBytes(indexBytes), parseBytes(tsBytes));
    }
    exports.Parse = Parse;
    function getBytes(str) {
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
    function parseBytes(bytes) {
        // Return value
        var n = 0;
        // Iterate through each byte
        bytes.forEach(function (byte, i) {
            // Increment value by byte-value
            n += byte;
            if (i < bytes.length - 1) {
                // We are not at the last byte, perform a bit shift
                n = n << 8;
            }
        });
        return n;
    }
});
