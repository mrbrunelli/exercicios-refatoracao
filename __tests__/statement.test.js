import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { htmlStatement, statement } from "../statement.js";

const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));

Deno.test("Deve retornar o Statement de BigCo", () => {
  const expected = `Statement for BigCo
Hamlet: R$ 650 (55 seats)
As You Like It: R$ 475 (35 seats)
Othello: R$ 500 (40 seats)
Amount owed is R$ 1625
You earned 47 credits
`;
  const received = statement(invoices, plays);
  assertEquals(received, expected);
});

Deno.test("Deve retornar o HTML Statement de BigCo", () => {
  const expected = `<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr>
<tr><td>Hamlet</td><td>55</td><td>R$ 650</td></tr>
<tr><td>As You Like It</td><td>35</td><td>R$ 475</td></tr>
<tr><td>Othello</td><td>40</td><td>R$ 500</td></tr>
</table>
<p>Amount owed is <em>R$ 1625</em></p>
<p>You earned <em>47</em> credits</p>
`;
  const received = htmlStatement(invoices, plays);
  assertEquals(received, expected);
});
