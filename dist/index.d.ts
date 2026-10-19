/**
 * @sabaki-js/phishing-detection - multilingual phishing detector (latin scripts).
 *
 * Thin wrapper over the core cross-encoder runtime (`loadGeneralist`) with
 * bundled weights (`models/phishing-latin-fp32`). FP32 bundle (~90 MB):
 * int8 loses ~0.13 acc on cross-encoders with no speed gain.
 */
import { type ClassifyOutput, type GeneralistInput, type SabakiPlugin } from "sabaki";
/** Dossier des poids mini embarqués (aucun téléchargement requis). */
export declare const modelDir: string;
export declare function definePhishing(modelDirOverride?: string): SabakiPlugin & {
    classifyAsync: (input: GeneralistInput) => Promise<ClassifyOutput>;
};
declare const plugin: SabakiPlugin;
export default plugin;
//# sourceMappingURL=index.d.ts.map