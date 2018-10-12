const s = `99. THE WICKED WITCH OF THE WEST (Margaret Hamilton): "I'll get you, my pretty, and your little dog, too!"`;

let [number, some, ...rest] = s.split(' ');

console.log(number);
console.log(some);
console.log(rest);
