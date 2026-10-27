import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createRun } from "../src/workflow.js";

const [id, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(" ").trim();

if (!id || !title) {
  console.error('Usage: npm run new:run -- MFL-001 "Feature title"');
  process.exitCode = 1;
} else if (!/^[A-Z0-9][A-Z0-9_-]{2,31}$/.test(id)) {
  console.error("Run ID must be 3-32 uppercase letters, digits, underscores, or hyphens.");
  process.exitCode = 1;
} else {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const root = path.resolve(scriptDir, "..");
  const runDir = path.join(root, "runs", id);
  const manifest = createRun({ id, title });
  const idea = `# ${title}\n\n## Problem\n\nDescribe the observable problem.\n\n## User and impact\n\nWho is affected, and what is the cost?\n\n## Example\n\nProvide one sanitized example.\n\n## Allowed data\n\nList data the agents may read. Never include secrets or personal data.\n\n## Non-goals\n\nState what this run must not change.\n`;

  try {
    await mkdir(runDir);
    await writeFile(
      path.join(runDir, "manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
      "utf8",
    );
    await writeFile(path.join(runDir, "idea.md"), idea, "utf8");
    console.log(`Created local run workspace: ${runDir}`);
  } catch (error) {
    if (error?.code === "EEXIST") {
      console.error(`Run already exists: ${id}`);
      process.exitCode = 1;
    } else {
      throw error;
    }
  }
}
