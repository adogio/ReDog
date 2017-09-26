import S from './static';
import element from './element';

export default function (dom: string): element {
    let tree: element = new element(S.ROOT);
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
                pointer = pointer.getParent();
                if (node[1]) {
                    pointer.appendText(node[1]);
                }
                position.pop();
            } else {
                throw "parse error, " + lastposition + "have no close tag";
            }
        } else {
            let propsSplit = node[0].split(" ");
            let a: element = null;
            if (node[0].length == 1) {
                a = new element(node[0], pointer);
                position.push(node[0]);
            } else {
                a = new element(propsSplit[0], pointer);
                position.push(propsSplit[0]);
                for (let i = 1; i < propsSplit.length; i++) {
                    let propLR = propsSplit[i].split("=");
                    a.setProp(propLR[0], propLR[1] ? propLR[1] : true);
                }
            }
            if (node[1]) a.appendText(node[1]);
            pointer = pointer.appendElement(a);
        }
    }
    return tree;
}