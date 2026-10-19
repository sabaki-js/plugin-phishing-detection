/**
 * @sabaki-js/phishing-detection - multilingual phishing detector (latin scripts).
 *
 * Dual mode (mail pattern): sync nano (TF-IDF, <1 ms, zero deps) by
 * default, bundled cross-encoder mini (FP32 ONNX, ~90 MB) via
 * `loadMiniClassifier`. FP32 bundle: int8 loses ~0.13 acc on
 * cross-encoders with no speed gain.
 */
import { type ClassifyOutput, type GeneralistInput, type SabakiPlugin } from "sabaki";
/** Dossier des poids mini embarqués (aucun téléchargement requis). */
export declare const modelDir: string;
export declare function definePhishing(modelDirOverride?: string): SabakiPlugin & {
    classifyAsync: (input: GeneralistInput) => Promise<ClassifyOutput>;
};
/** Charge le mode mini (ONNX bundlé). `SABAKI_PHISHING_DIR` pour swapper. */
export declare function loadMiniClassifier(dir?: string): Promise<(input: GeneralistInput) => Promise<ClassifyOutput>>;
declare const plugin: SabakiPlugin;
export default plugin;
//# sourceMappingURL=index.d.ts.map