if (a === 1) { //
} else if (b === 2) { // 
  try { //
  } catch(e) {} //
  if (a === 1) { //
  } else if (b === 2) { // 
    try { //
    } catch(e) {} //
  }
}

try { //

} catch(e) {} //

switch (3) { //
  case 2: //
  case 3: //
  break; //
}
// 14

for (let i = 0; i < 10; i++) { //
  console.log(i) //
}

for (const a in b) { //
  console.log(a); //
}

for (const a of b) { //
  console.log(a); //
}

do {

} while(false); //

while (false) { //

}
// 22

function foo() { //
  return 1; //
}

exampleLoop: 
while (true) { //
  break; //
  continue exampleLoop; //
}

throw new Error('foo'); //

// 28

console.log('foo'); //
let a = 1; //
a = 13; //

// 31

debugger; //

// 32

{

}

// 33

const b = 234; //
function buzz() { //
}

class FooClass { //
}

export * from '../module'; //
export default 13; //

export const bar = 13231; //

import abc from 'sd'; //

// 40