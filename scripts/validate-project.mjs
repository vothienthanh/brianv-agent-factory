import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");

const requiredFiles = [
  "README.md",
  "README.vi.md",
  "LICENSE",
  "NOTICE",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "AGENTS.md",
  "package.json",
  "schemas/run-manifest.schema.json",
  "docs/decisions.md",
  "docs/sanitization-checklist.md",
  "models/deepseek-flash-high.yaml",
  "models/deepseek-flash-max.yaml",
  "roles/spec.yaml",
  "roles/coder.yaml",
  "roles/reviewer.yaml",
  "prompts/spec.md",
  "prompts/coder.md",
  "prompts/reviewer.md",
  "specs/templates/feature-spec.md",
  "specs/examples/mailflow-skip-duplicates.md",
];

const errors = [];
for (const file of requiredFiles) {
  try {
    await access(path.join(root, file));
  } catch {
    errors.push(`Missing required file: ${file}`);
  }
}

for (const file of ["package.json", "schemas/run-manifest.schema.json"]) {
  try {
    JSON.parse(await readFile(path.join(root, file), "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${error.message}`);
  }
}

for (const role of ["spec", "coder", "reviewer"]) {
  try {
    const text = await readFile(path.join(root, `roles/${role}.yaml`), "utf8");
    if (!text.includes("agent:") || !text.includes("mode: confirm")) {
      errors.push(`roles/${role}.yaml must define agent and use confirm mode`);
    }
  } catch {
    // Missing-file error is already reported above.
  }
}

for (const modelFile of ["deepseek-flash-high", "deepseek-flash-max"]) {
  try {
    const text = await readFile(path.join(root, `models/${modelFile}.yaml`), "utf8");
    if (!text.includes('model_name: "deepseek/deepseek-flash"')) {
      errors.push(`models/${modelFile}.yaml must select deepseek/deepseek-flash`);
    }
    if (/api[_-]?key\s*:\s*["']?sk-/i.test(text)) {
      errors.push(`models/${modelFile}.yaml appears to contain an API key`);
    }
  } catch {
    // Missing-file error is already reported above.
  }
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Project structure is valid (${requiredFiles.length} required files).`);
}
