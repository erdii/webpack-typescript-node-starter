import { expect } from "chai";
import "mocha";

describe("test", () => {
	it("sync", () => {
		expect(null).to.be.not.ok;
	});

	it("async", (done) => {
		setTimeout(() => {
			expect(true).to.be.ok;
			done();
		}, 1000);
	});
});
