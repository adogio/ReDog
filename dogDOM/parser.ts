const DIV = "div";
const SPAN = "span";
const TEXT = "text";
const ROOT = "root";

parser("<div><span>dasd<span>test</span>123</span></div>");

function parser(dom) {
    let tree = {
        tag: ROOT,
        child: []
    };
    let position = [];
    let pointer = tree;
    let dList = dom.split(/</);
    console.log(dList);
    while (dList.length > 0) {
        let dofList = dList.shift();
        let node = dofList.split(/>/);
        if (node.length == 1) {
            if (node[0]) {
                pointer.child.push({
                    tag: TEXT,
                    parent: pointer,
                    content: node[0]
                })
                pointer = pointer.child[pointer.child.length - 1];
            }
        } else if (node[0][0] == "/") {
            let lastposition = position[position.length - 1]
            if (node[0].substring(1) == lastposition) {
                dList.unshift(node[1]);
                position.pop();
                pointer = pointer.parent;
            } else {
                throw "parse error, " + lastposition + "have no close tag";
            }
        } else {
            let element = {
                tag: node[0],
                parent: pointer,
                child: node[1] ? [{
                    tag: TEXT,
                    content: node[1]
                }] : []
            };
            pointer.child.push(element);
            pointer = pointer.child[pointer.child.length - 1]
            position.push(node[0]);
        }
    }
    console.log(render(tree));
}

function render(tree) {
    let str = "";
    renderElement(tree);

    function renderElement(tree) {
        if (tree.tag != TEXT && tree.tag != ROOT) str += "<" + tree.tag + ">";
        if (tree.child) {
            for (let i = 0; i < tree.child.length; i++) {
                renderElement(tree.child[i]);
            }
            if (tree.tag != TEXT && tree.tag != ROOT) str += "</" + tree.tag + ">";
        } else {
            str += tree.content;
        }
    }
    console.log(str);
}

function notTextOrRoot()