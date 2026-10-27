export const RUN_STATES = Object.freeze([
  "IDEA",
  "SPEC_DRAFT",
  "WAITING_FOR_APPROVAL",
  "READY_TO_BUILD",
  "IMPLEMENTING",
  "IMPLEMENTED",
  "REVIEW_PASSED",
  "REVIEW_FAILED",
  "WAITING_FOR_MERGE",
  "COMPLETE",
  "CANCELLED",
]);

const transitions = Object.freeze({
  IDEA: ["SPEC_DRAFT", "CANCELLED"],
  SPEC_DRAFT: ["WAITING_FOR_APPROVAL", "CANCELLED"],
  WAITING_FOR_APPROVAL: ["READY_TO_BUILD", "SPEC_DRAFT", "CANCELLED"],
  READY_TO_BUILD: ["IMPLEMENTING", "CANCELLED"],
  IMPLEMENTING: ["IMPLEMENTED", "CANCELLED"],
  IMPLEMENTED: ["REVIEW_PASSED", "REVIEW_FAILED", "CANCELLED"],
  REVIEW_FAILED: ["READY_TO_BUILD", "CANCELLED"],
  REVIEW_PASSED: ["WAITING_FOR_MERGE", "CANCELLED"],
  WAITING_FOR_MERGE: ["COMPLETE", "REVIEW_FAILED", "CANCELLED"],
  COMPLETE: [],
  CANCELLED: [],
});

function isoDate(now) {
  const value = now instanceof Date ? now : new Date(now);
  if (Number.isNaN(value.getTime())) {
    throw new TypeError("now must be a valid date");
  }
  return value.toISOString();
}

export function canTransition(from, to) {
  return Boolean(transitions[from]?.includes(to));
}

export function createRun({ id, title, now = new Date() }) {
  if (!id || !title) {
    throw new TypeError("id and title are required");
  }

  const createdAt = isoDate(now);
  return {
    schemaVersion: 1,
    id,
    title,
    state: "IDEA",
    createdAt,
    updatedAt: createdAt,
    approvals: [],
    evidence: [],
    history: [
      {
        from: null,
        to: "IDEA",
        actor: "human",
        at: createdAt,
        note: "Run created",
      },
    ],
  };
}

export function transitionRun(
  manifest,
  to,
  { actor = "human", approvedBy, note, now = new Date() } = {},
) {
  if (!manifest || !RUN_STATES.includes(manifest.state)) {
    throw new TypeError("manifest has an invalid state");
  }
  if (!RUN_STATES.includes(to)) {
    throw new Error(`Unknown target state: ${to}`);
  }
  if (!canTransition(manifest.state, to)) {
    throw new Error(`Invalid transition: ${manifest.state} -> ${to}`);
  }

  const humanGate =
    (manifest.state === "WAITING_FOR_APPROVAL" && to === "READY_TO_BUILD") ||
    (manifest.state === "WAITING_FOR_MERGE" && to === "COMPLETE");

  if (humanGate && !approvedBy) {
    throw new Error(`Transition ${manifest.state} -> ${to} requires approvedBy`);
  }

  const at = isoDate(now);
  const approvals = [...(manifest.approvals ?? [])];
  if (humanGate) {
    approvals.push({
      gate: to === "READY_TO_BUILD" ? "SPEC" : "MERGE",
      approvedBy,
      approvedAt: at,
    });
  }

  return {
    ...manifest,
    state: to,
    updatedAt: at,
    approvals,
    history: [
      ...(manifest.history ?? []),
      {
        from: manifest.state,
        to,
        actor,
        at,
        ...(note ? { note } : {}),
      },
    ],
  };
}
