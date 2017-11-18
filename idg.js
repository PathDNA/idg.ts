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
            return new Date(this.ts * 1000);
        }
    }
    exports.ID = ID;
    function Parse(str) {
        const decoded = atob(str);
        if (decoded.length !== 16) {
            throw ("invalid string length, expected 16 and received " + decoded.length);
        }
        const indexBytes = getBytes(decoded.substring(0, 8));
        const tsBytes = getBytes(decoded.substring(8, 16));
        return new ID(parseBytes(indexBytes), parseBytes(tsBytes));
    }
    exports.Parse = Parse;
    function getBytes(str) {
        const bytes = new Uint8Array(8);
        let j = 8;
        while (j--) {
            bytes[j] = str.charCodeAt(7 - j);
        }
        return bytes;
    }
    function parseBytes(bytes) {
        var n = 0;
        bytes.forEach(function (byte, i) {
            n += byte;
            if (i < bytes.length - 1) {
                n = n << 8;
            }
        });
        return n;
    }
});
