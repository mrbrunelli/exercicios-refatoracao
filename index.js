const invoices = JSON.parse(await Deno.readTextFile("./invoices.json"));
const plays = JSON.parse(await Deno.readTextFile("./plays.json"));

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    result += `${play.name}: ${thisAmount / 100} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${totalAmount / 100}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

const result = statement(
  invoices,
  plays,
);

console.log(result);
