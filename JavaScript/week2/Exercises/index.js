const user = 14684651;

if (user <= 0) {
  console.log("Please deposit some money!");
} else if (user <= 1000) {
  console.log("Your balance is looking okay");
} else if (user <= 3000) {
  console.log("Your balance is looking good");
} else if (user <= 10000) {
  console.log("Your balance is fantastic");
} else {
  console.log("Your balance is AMAZING");
}
