if (a === 1) { // 1
  console.log('hello'); // 2
} else if (b === 2) { // 3
  console.log('world'); // 4
}

const c = d === 3 ? 'foo' : 'bar'; // 5

try { // 6
  
} catch (e) { // 7
  
}

switch(a) { // 8
  case 1: // 9
  case 2: // 10
  console.log(213); // 11
}

for (let i = 0; i < 10; i++) { // 12
  console.log(i); // 13
}

do {
  console.log(123); // 14
  continue; // 15
} while (false); // 16

while (true) { // 17
  console.log(123); // 18
  break; // 19
}

function f() { // 20
  return 12; // 21
}

// count expressions as 1
const asd = '21313'; // 22
const asd2 = '21313'; // 23
const res = asd + asd2; // 24
const hello = world(res); // 25

// statements are counted as 1 (end by ; and not for loop === statement)

function fn() { // 26
  console.log('sadsa'); // 27
}


