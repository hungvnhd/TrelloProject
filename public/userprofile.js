let str = document.getElementById("text-name").innerHTML.split(" ");
let a = str[0];
let b = str[str.length - 2];
let c = a.split("");
let d = b.split("");
let arr = [c[0], d[0]];
let userName = arr.join("");
console.log(str);

document.getElementById(
  "text-name"
).innerHTML = `<span id="text-name" class="text-logoUser">${userName}</span>`;


let userLogo = document.getElementById("userName").innerHTML.split(" ")
let a1= str[0];
let b1 = str[str.length-2];
let c1 = a1.split("");
let d1 = b1.split("");
let arr1 = [c[0], d[0]]
let textUser = arr.join("");
console.log(textUser);
document.getElementById("userName").innerHTML = `<span id="userName" class="text-userLogo">${textUser}</span>`



