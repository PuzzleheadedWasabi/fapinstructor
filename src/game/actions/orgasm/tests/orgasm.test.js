import store from "store";
import orgasm, { doRuin, doOrgasm, doDenied, end, skip, determineOrgasm } from "../orgasm";

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
    maximumOrgasms: 1,
    maximumGameTime: 5,
    finalOrgasmAllowed: false,
    finalOrgasmDenied: false,
    finalOrgasmRuined: false,
    finalOrgasmRandom: false
  };
  store.engine = {
    notifications: []
  };
};

test("determineOrgasm() should return a doOrgasm trigger function", async () => {
  setDefaultStore();
  store.config.finalOrgasmAllowed = true;
  const triggers = await determineOrgasm();
  expect(triggers[0]).toBe(doOrgasm);
  expect(triggers[1]).toBe(skip);
});

test("determineOrgasm() should return a doRuin trigger function", async () => {
  setDefaultStore();
  store.config.finalOrgasmRuined = true;
  const triggers = await determineOrgasm();
  expect(triggers[0]).toBe(doRuin);
  expect(triggers[1]).toBe(skip);
});

test("determineOrgasm() should return a doDenied trigger function", async () => {
  setDefaultStore();
  store.config.finalOrgasmDenied = true;
  const triggers = await determineOrgasm();
  expect(triggers[0]).toBe(doDenied);
  expect(triggers[1]).toBe(skip);
});

test("determineOrgasm() should return a random trigger function", async () => {
  setDefaultStore();
  store.config = {
    finalOrgasmAllowed: true,
    finalOrgasmDenied: true,
    finalOrgasmRuined: true,
    finalOrgasmRandom: true
  };
  const triggers = await determineOrgasm();
  expect(triggers[0]).toBeDefined();
  expect(triggers[1]).toBe(skip);
});

//orgasm

test("doOrgasm() should return a trigger function", async () => {
  setDefaultStore();
  const trigger = await doOrgasm();
  expect(trigger.label).toBe("Orgasmed");
  expect(store.game.strokeSpeed).toBe(store.config.fastestStrokeSpeed);
});

test("doDenied() should return a trigger function", async () => {
  setDefaultStore();
  const trigger = await doDenied();
  expect(trigger.label).toBe("Denied");
  expect(store.game.strokeSpeed).toBe(store.config.fastestStrokeSpeed);
});

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

test("skip() should extend the game by 20%", async () => {
  setDefaultStore();
  const { maximumGameTime } = store.config;

  await skip();

  expect(store.config.maximumGameTime).toBe(maximumGameTime * 1.2);
  expect(store.game.strokeSpeed).toBeGreaterThan(0);
});
