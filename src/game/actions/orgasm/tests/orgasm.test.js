import store from "store";
import orgasm, { doRuin, doOrgasm, end } from "../orgasm";

const setDefaultStore = () => {
  store = {};
  store.game = {
    ruins: 0,
    orgasms: 0,
    strokeSpeed: 5
  };
  store.config = {
    slowestStrokeSpeed: 0.25,
    fastestStrokeSpeed: 5,
    maximumOrgasms: 1
  };
  store.engine = {
    notifications: []
  };
};

//doOrgasm
//doDenied
//determineOrgasm
//skip
//orgasm

test("doRuin() should return a trigger function", async () => {
  setDefaultStore();
  const trigger = await doRuin();
  expect(trigger.label).toBe("Ruined");
});

test("doRuin() should increment ruins", async () => {
  setDefaultStore();
  const trigger = await doRuin();
  await trigger();

  expect(store.game.ruins).toBe(1);
});

test("end() should increment users orgasms", async () => {
  setDefaultStore();
  await end();
  expect(store.game.orgasms).toBe(1);
});

test("end() should end the game after achieved orgasms", async () => {
  setDefaultStore();
  await end();
  expect(store.game.strokeSpeed).toBe(0);
});

test("end() should continue the game if not received achieved maximum orgasms", async () => {
  setDefaultStore();
  store.config.maximumOrgasms = 2;
  await end();
  expect(store.game.strokeSpeed).toBeGreaterThan(0);
});
