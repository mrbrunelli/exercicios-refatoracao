const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));
import createStatementData from './createStatementData.js';

export default function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;
  for (const perf of data.performances) {
    result += `${perf.play.name}: ${
      brl(perf.amount / 100)
    } (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${brl(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  function brl(aNumber) {
    return `R$ ${aNumber}`;
  }
}
