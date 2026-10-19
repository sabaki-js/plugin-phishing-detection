import test from "node:test";
import assert from "node:assert/strict";
import plugin, { modelDir } from "./index.js";
import fs from "node:fs";
test("manifest phishing", () => {
    assert.equal(plugin.manifest.domain, "phishing");
    assert.ok(plugin.manifest.questions.includes("suspicious"));
});
test("poids bundlés présents", () => {
    assert.ok(fs.existsSync(`${modelDir}/generalist.onnx`));
    assert.ok(fs.existsSync(`${modelDir}/tokenizer/tokenizer.json`));
});
