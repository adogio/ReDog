import './static';
import element from './element';

function parse(dom: string) {
    let tree: element = new element(ROOT);
    let position: Array<string> = [];
    let pointer: element = tree;
    let dList: Array<string> = dom.split(/</);
    console.log(dList);
    while (dList.length > 0) {
        let dofList = dList.shift();
        let node = dofList.split(/>/);
        if (node.length == 1) {
            if (node[0]) {
                pointer = tree.appendText(node[0]);
            }
        } else if (node[0][0] == "/") {
            let lastposition = position[position.length - 1]
            if (node[0].substring(1) == lastposition) {
                dList.unshift(node[1]);
                position.pop();
                pointer = pointer.getParent();
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
            pointer = pointer.append(node[0], node[1] ? node[1] : undefined);
            position.push(node[0]);
        }
    }
}