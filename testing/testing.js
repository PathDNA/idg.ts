require(["idg"], function (idg) {
	const id = idg.Parse("OQUAAAAAAAB3ehBaAAAAAA");
	if (id.Index() !== 1337) {
		console.error("Invalid index, expected 1337 and received" + id.Index());
		return;
	}

	if (id.Date().toString() !== "Sat Nov 18 2017 10:22:47 GMT-0800 (PST)") {
		console.error("Invalid date, expected 'Sat Nov 18 2017 10:22:47 GMT-0800 (PST)' and received '" + id.Date().toString() + "'");
		return;
	}

	console.log("Success!");
});
