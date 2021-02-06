import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { statement } from "../statement.js";

const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));

Deno.test("Deve retornar o Statement de BigCo", () => {
  const expected = `Statement for BigCo
Hamlet: 650 (55 seats)
As You Like It: 475 (35 seats)
Othello: 500 (40 seats)
Amount owed is 1625
You earned 47 credits
`;
  const received = statement(invoices, plays);
  assertEquals(received, expected);
});
