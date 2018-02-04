//This is addition.
function sum(a, b) {
  return a + b;
}

//This is substraction
function subs(a, b) {
  return a - b;
}

//Time to multiply
function mult(a, b) {
  return a * b;
}

//Let's divide
function mod(a,b) {
  if (b !== 0){
    console.log("Div, ", a%b);
    return a % b;
  }
  else
    throw error;
}
module.exports = { sum, subs, mult, mod };
