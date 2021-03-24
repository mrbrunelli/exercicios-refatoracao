const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));
import createStatementData from "./createStatementData.js";

export function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
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

export function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>\n";
  for (const perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${brl(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${brl(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

function brl(aNumber) {
  return `R$ ${aNumber / 100}`;
}
