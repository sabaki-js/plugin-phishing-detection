/**
 * @sabaki-js/phishing-detection - multilingual phishing detector (latin scripts).
 *
 * Thin wrapper over the core cross-encoder runtime (`loadGeneralist`) with
 * bundled weights (`models/phishing-latin-fp32`). FP32 bundle (~90 MB):
 * int8 loses ~0.13 acc on cross-encoders with no speed gain.
 */
import { definePlugin, loadGeneralist, } from "sabaki";
import manifestData from "./manifest.json" with { type: "json" };
import path from "node:path";
import { fileURLToPath } from "node:url";
const manifest = manifestData;
const QUESTION = "suspicious";
const OPTIONS = ["yes", "no"];
/** Dossier des poids mini embarqués (aucun téléchargement requis). */
export const modelDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "models", "phishing-latin-fp32");
export function definePhishing(modelDirOverride) {
    const classifyAsync = async (input) => {
        const dir = modelDirOverride ?? process.env.SABAKI_PHISHING_DIR ?? modelDir;
        const r = await loadGeneralist(dir).decide({
            ...input,
            question: input.question ?? QUESTION,
            options: input.options && input.options.length >= 2
                ? input.options
                : OPTIONS,
        });
        return { ...r, domain: "phishing" };
    };
    return {
        ...definePlugin({ manifest, classify: classifyAsync }),
        classifyAsync,
    };
}
const plugin = {
    manifest,
    classify: (input) => definePhishing().classifyAsync(input),
};
export default plugin;
