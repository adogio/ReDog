import redog from '../src/ReDog';

let a = new redog(document.getElementById("root"),
    "<div>\
    <span>dasd<div>\
        <span id=12312>test</span>1231231\
        </div>11<span>11</span>123</span></div>"
);
a.mount()