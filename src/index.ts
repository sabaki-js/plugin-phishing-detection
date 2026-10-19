/**
 * @sabaki-js/phishing-detection - multilingual phishing detector (latin scripts).
 *
 * Dual mode (mail pattern): sync nano (TF-IDF, <1 ms, zero deps) by
 * default, bundled cross-encoder mini (FP32 ONNX, ~90 MB) via
 * `loadMiniClassifier`. FP32 bundle: int8 loses ~0.13 acc on
 * cross-encoders with no speed gain.
 */
import {
	definePlugin,
	loadGeneralist,
	predict,
	type ClassifyOutput,
	type GeneralistInput,
	type ModelWeights,
	type PluginManifest,
	type SabakiInput,
	type SabakiPlugin,
} from "sabaki";
import manifestData from "./manifest.json" with { type: "json" };
import weightsData from "./weights.json" with { type: "json" };
import type { PluginManifest as PM } from "sabaki";
import path from "node:path";
import { fileURLToPath } from "node:url";

const manifest = manifestData as PluginManifest;
const weights = weightsData as ModelWeights;
const QUESTION = "suspicious";
const OPTIONS = ["yes", "no"];

/** Dossier des poids mini embarqués (aucun téléchargement requis). */
export const modelDir = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
	"models",
	"phishing-latin-fp32",
);

function classifyNano(input: SabakiInput): ClassifyOutput {
	const q =
		input.question && weights.questions[input.question]
			? input.question
			: QUESTION;
	const r = predict(input.state, weights, q);
	return { decision: r.decision, confidence: r.confidence, domain: "phishing" };
}

export function definePhishing(
	modelDirOverride?: string,
): SabakiPlugin & {
	classifyAsync: (input: GeneralistInput) => Promise<ClassifyOutput>;
} {
	const classifyAsync = async (
		input: GeneralistInput,
	): Promise<ClassifyOutput> => {
		const dir =
			modelDirOverride ?? process.env.SABAKI_PHISHING_DIR ?? modelDir;
		const r = await loadGeneralist(dir).decide({
			...input,
			question: input.question ?? QUESTION,
			options:
				input.options && input.options.length >= 2
					? input.options
					: OPTIONS,
		});
		return { ...r, domain: "phishing" };
	};
	return {
		...definePlugin({ manifest, classify: classifyNano }),
		classifyAsync,
	};
}

/** Charge le mode mini (ONNX bundlé). `SABAKI_PHISHING_DIR` pour swapper. */
export async function loadMiniClassifier(
	dir?: string,
): Promise<(input: GeneralistInput) => Promise<ClassifyOutput>> {
	const use =
		dir ?? process.env.SABAKI_PHISHING_DIR ?? modelDir;
	return async (input: GeneralistInput) => {
		const r = await loadGeneralist(use).decide({
			...input,
			question: input.question ?? QUESTION,
			options:
				input.options && input.options.length >= 2
					? input.options
					: OPTIONS,
		});
		return { ...r, domain: "phishing" };
	};
}

const plugin: SabakiPlugin = {
	manifest,
	classify: classifyNano,
};
export default plugin;
