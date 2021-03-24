const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));
import createStatementData from './createStatementData.js';

export default function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function brl(aNumber) {
  return `R$ ${aNumber / 100}`;
}

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (const perf of data.performances) {
    result += `${perf.play.name}: ${
      brl(perf.amount)
    } (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${brl(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

}
