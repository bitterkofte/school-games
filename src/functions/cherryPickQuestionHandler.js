import {
  mcQuestions,
  scQuestions,
  sQuestions,
  tfQuestions,
  tpQuestions,
} from "../data/wholeQuestions";
import { randomizer } from "./randomizer";

const limiter = (arr, amn) => randomizer(arr).slice(0, amn);

export const cherryPickQuestionHandler = (amount) => {
  return randomizer([
    ...limiter(scQuestions, amount),
    ...limiter(mcQuestions, amount),
    ...limiter(sQuestions, amount),
    ...limiter(tpQuestions, amount),
    ...limiter(tfQuestions, amount),
  ]);
};
