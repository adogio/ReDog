let dom = require('../dogDOM/dogDOM').default;

let a = new dom("<div><span>dasd<span>test</span>11<span>11</span>123</span></div>");
console.log(a.render());