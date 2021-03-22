const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));

export default function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  for (const perf of invoice.performances) {
    result += `${playFor(perf).name}: ${
      brl(amountFor(perf) / 100)
    } (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${brl(totalAmount() / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance)}`);
    }
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount() {
    let totalAmount = 0;
    for (const perf of invoice.performances) {
      totalAmount += amountFor(perf);
    }
    return totalAmount;
  }

  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(perf).type) {
      result += Math.floor(perf.audience / 5);
    }
    return result;
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (const perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }

  function brl(aNumber) {
    return `R$ ${aNumber}`;
  }
}
