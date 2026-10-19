# @sabaki-js/phishing-detection

Sabaki plugin — multilingual phishing detection (**latin scripts**: de/en/es/fr/id/tr/vi).

- **Bundled mini mode**: MiniLM-L6 cross-encoder ONNX FP32 (~90 MB in `models/phishing-latin-fp32`, no download at runtime).
- Question `suspicious` (also accepts `Is this suspicious?`), options `yes` / `no`.
- Specialist trained on 4 100 rows. Held-out eval (100/lang, never seen in training):

| lang | acc | P | R | F1 |
|------|-----|---|---|----|
| de | 0.970 | 0.961 | 0.980 | 0.970 |
| es | 0.990 | 1.000 | 0.980 | 0.990 |
| id | 1.000 | 1.000 | 1.000 | 1.000 |
| tr | 1.000 | 1.000 | 1.000 | 1.000 |
| vi | 0.930 | 0.877 | 1.000 | 0.935 |
| en | 0.850 | 0.973 | 0.720 | 0.828 |
| fr | 0.830 | 0.789 | 0.900 | 0.841 |

Out of scope (documented): it/pt (weak recall), non-latin scripts (base limitation — see multilingual track).

## Install

```sh
npm i @sabaki-js/phishing-detection sabaki onnxruntime-node
```

```ts
import plugin from "@sabaki-js/phishing-detection";
const r = await plugin.classifyAsync({ state: "SMS: régularisez 96 EUR via ce lien" });
// { decision: "yes", confidence: 0.97, domain: "phishing", ... }
```

## Swap the model

`SABAKI_PHISHING_DIR` env (same layout: `generalist.onnx` + `tokenizer/`):

```sh
SABAKI_PHISHING_DIR=/path/to/my-weights node app.js
```

License: MIT.
