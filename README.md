# idg ![Status](https://img.shields.io/badge/status-beta-yellow.svg)
idg is a companion library to github.com/PathDNA/idg which allows for parsing of idg strings their index and timestamp representations.

## Usage
### Typescript
```js
// Set dependency within package.json
{
	"dependencies" : {
	    "idg": "github:PathDNA/idg.ts"
	}
}
```

```typescript
import * as idg from "node_modules/idg/idg"

function main() {
	// Parse ID string
	const id = idg.Parse("OQUAAAAAAAB3ehBaAAAAAA");
	// Log id index
	console.log("Index", id.Index());
	// Log id date (parsed from timestamp)
	console.log("Date", id.Date());
}

```

### Javascript
```js
// Example utilizing require.js
require(["idg"], function (idg) {
	// Parse ID string
	const id = idg.Parse("OQUAAAAAAAB3ehBaAAAAAA");
	// Log id index
	console.log("Index", id.Index());
	// Log id date (parsed from timestamp)
	console.log("Date", id.Date());
});

```

## Interface
This library supports the following features:

- **Parse**: Parse string ID
