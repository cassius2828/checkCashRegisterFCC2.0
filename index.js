function checkCashRegister(price, cash, cid) {
  // round change manually to avoid decimal issues
  let change = cash * 100 - price * 100;
  console.log(change + " cents is your change");
  //  decalre var & set cidAmount to 0
  let cidAmount = 0;
  //   iterate thru cid to convert all values to what they'd equal in pennies
  for (let item of cid) {
    cidAmount += item[1] * 100;
  }
  console.log("The total amount of cid is $" + cidAmount / 100);
  //   condition 1 of test
  if (cidAmount < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  //   condition 2 of test
  else if (cidAmount === change) {
    return { status: "CLOSED", change: cid };
  }
  //   condition 3 of test
  else {
    let properChange = [];
    // reverse cid so change displayed is from largest to smallest
    cid = cid.reverse();
    // currency type converted to penny values for easier math
    let currencyType = {
      "ONE HUNDRED": 10000,
      TWENTY: 2000,
      TEN: 1000,
      FIVE: 500,
      ONE: 100,
      QUARTER: 25,
      DIME: 10,
      NICKEL: 5,
      PENNY: 1,
    };
    // creating a storage arr that will use the name of the cid keys and start the values at 0
    // mult the items value by 100 to convert to pennies
    for (let item of cid) {
      let changeStorage = [item[0], 0];
      item[1] = item[1] * 100;
      //   while the total pennies is >= the penny value of the currency type
      // &&
      // the cid value is bigger than 0, then we will decrement the following and add to the storage value
      while (change >= currencyType[item[0]] && item[1] > 0) {
        change -= currencyType[item[0]];
        item[1] -= currencyType[item[0]];
        changeStorage[1] += currencyType[item[0]];
      }
      //   if something was added to the storage value, then we add it to our final array
      if (changeStorage[1] > 0) {
        properChange.push(changeStorage);
      }
    }
    // divide the values by 100 to convert them from pennies to their original value
    for (let item of properChange) {
      item[1] = item[1] / 100;
    }
    if (change > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: properChange };
  }
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
