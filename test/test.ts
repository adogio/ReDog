import redog from '../src/ReDog';

let a = new redog(document.getElementById("root"),
    "<div style=background-color:black;color:white>\
    <span>dasd<div>\
        <span id=12312 style=color:red>{test}</span>1231231\
        </div>11\
        <span style=color:purple>11</span>123\
        <button onClick=alert(123) style=color:red>test</button></span>\
    </div>"
);
a.mount()