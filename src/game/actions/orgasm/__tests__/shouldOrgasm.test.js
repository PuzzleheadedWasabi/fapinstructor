import { allowedOrgasm } from "./shouldOrgasm";
import store from "store";
import moment from "moment";

const setDefaultStore = () => {
  store.game = {
    startTime: new moment(),
    ruins: 0,
    edges: 0
  };
  store.config = {
    minimumRuinedOrgasms: 0,
    minimumEdges: 0,
    minimumGameTime: 0
  };
};

test("allowedOrgasm should be false with not enough edges", () => {
  setDefaultStore();
  store.config.minimumEdges = 1;

  expect(allowedOrgasm()).toBe(false);
});

test("allowedOrgasm should be true with enough edges", () => {
  setDefaultStore();
  store.game.edges = 1;
  store.config.minimumEdges = 1;

  expect(allowedOrgasm()).toBe(true);
});

test("allowedOrgasm should be false with not enough ruins", () => {
  setDefaultStore();
  store.config.minimumRuinedOrgasms = 1;

  expect(allowedOrgasm()).toBe(false);
});

test("allowedOrgasm should be true with enough ruins", () => {
  setDefaultStore();
  store.game.ruins = 1;
  store.config.minimumRuinedOrgasms = 1;

  expect(allowedOrgasm()).toBe(true);
});

test("allowedOrgasm should be true if minimum game time is passed", () => {
  setDefaultStore();
  store.config.minimumGameTime = 0;

  expect(allowedOrgasm()).toBe(true);
});

test("allowedOrgasm should be false if mininum game time isn't passed", () => {
  setDefaultStore();
  store.config.minimumGameTime = 20;

  expect(allowedOrgasm()).toBe(false);
});
