import test from "node:test";
import assert from "node:assert/strict";

import {
  RUN_STATES,
  canTransition,
  createRun,
  transitionRun,
} from "../src/workflow.js";

test("createRun returns a reproducible initial manifest", () => {
  const now = new Date("2026-01-02T03:04:05.000Z");
  const run = createRun({ id: "MFL-001", title: "Skip duplicates", now });

  assert.equal(run.state, "IDEA");
  assert.equal(run.createdAt, now.toISOString());
  assert.equal(run.updatedAt, now.toISOString());
  assert.deepEqual(run.approvals, []);
  assert.equal(run.history.length, 1);
});

test("the normal path reaches the specification approval gate", () => {
  let run = createRun({ id: "MFL-001", title: "Skip duplicates" });
  run = transitionRun(run, "SPEC_DRAFT");
  run = transitionRun(run, "WAITING_FOR_APPROVAL");

  assert.equal(canTransition(run.state, "READY_TO_BUILD"), true);
  assert.throws(
    () => transitionRun(run, "READY_TO_BUILD"),
    /requires approvedBy/,
  );

  run = transitionRun(run, "READY_TO_BUILD", { approvedBy: "project-owner" });
  assert.equal(run.state, "READY_TO_BUILD");
  assert.equal(run.approvals[0].gate, "SPEC");
});

test("a run cannot skip review", () => {
  const run = createRun({ id: "MFL-002", title: "Guard transitions" });
  assert.throws(() => transitionRun(run, "COMPLETE"), /Invalid transition/);
});

test("terminal states have no outgoing transitions", () => {
  for (const state of ["COMPLETE", "CANCELLED"]) {
    for (const target of RUN_STATES) {
      assert.equal(canTransition(state, target), false);
    }
  }
});
