/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var statics = {
    DIV: "div",
    SPAN: "span",
    TEXT: "text",
    ROOT: "root"
};
exports.default = statics;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReDog_1 = __webpack_require__(2);
var a = new ReDog_1.default(document.getElementById("root"), "<div>\
    <span>dasd<div>\
        <span id=12312>test</span>1231231\
        </div>11<span>11</span>123</span></div>");
a.mount();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dogDOM_1 = __webpack_require__(3);
var default_1 = (function () {
    function default_1(DOMElement, DOM) {
        this.rootElement = DOMElement;
        this.rootDOM = new dogDOM_1.default(DOM);
    }
    default_1.prototype.stringify = function () {
        return this.rootDOM.renderString();
    };
    default_1.prototype.mount = function () {
        this.rootElement.appendChild(this.rootDOM.render());
    };
    return default_1;
}());
exports.default = default_1;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(4);
var dogDOM = (function () {
    function dogDOM(dom) {
        this.rootComponent = new component_1.default(dom);
    }
    dogDOM.prototype.getDomElement = function () {
        return this.rootComponent.getDomElement();
    };
    dogDOM.prototype.renderString = function () {
        return this.rootComponent.renderString();
    };
    dogDOM.prototype.render = function () {
        return this.rootComponent.render();
    };
    return dogDOM;
}());
exports.default = dogDOM;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(5);
var component = (function () {
    function component(dom) {
        this.rootElement = parser_1.default(dom);
    }
    component.prototype.getDomElement = function () {
        return this.rootElement.getNode();
    };
    component.prototype.renderString = function () {
        return this.rootElement.renderString();
    };
    component.prototype.render = function () {
        return this.rootElement.render();
    };
    Object.defineProperty(component.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (newState) {
            this._state = newState;
        },
        enumerable: true,
        configurable: true
    });
    return component;
}());
exports.default = component;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var element_1 = __webpack_require__(6);
var static_1 = __webpack_require__(0);
var parser = function (dom) {
    var tree = new element_1.default(static_1.default.ROOT);
    var position = [];
    var pointer = tree;
    var dList = dom.split(/</);
    console.log(dList);
    while (dList.length > 0) {
        var dofList = dList.shift();
        var node = dofList.split(/>/);
        if (node.length == 1) {
            if (node[0]) {
                pointer = tree.appendText(node[0]);
            }
        }
        else if (node[0][0] == "/") {
            var lastposition = position[position.length - 1];
            if (node[0].substring(1) == lastposition) {
                pointer = pointer.getParent();
                if (node[1]) {
                    pointer.appendText(node[1]);
                }
                position.pop();
            }
            else {
                throw "parse error, " + lastposition + "have no close tag";
            }
        }
        else {
            var propsSplit = node[0].split(" ");
            var a = null;
            if (node[0].length == 1) {
                a = new element_1.default(node[0], pointer);
                position.push(node[0]);
            }
            else {
                a = new element_1.default(propsSplit[0], pointer);
                position.push(propsSplit[0]);
                for (var i = 1; i < propsSplit.length; i++) {
                    var propLR = propsSplit[i].split("=");
                    a.setProp(propLR[0], propLR[1] ? propLR[1] : true);
                }
            }
            if (node[1])
                a.appendText(node[1]);
            pointer = pointer.appendElement(a);
        }
    }
    return tree;
};
exports.default = parser;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var props_1 = __webpack_require__(7);
var static_1 = __webpack_require__(0);
var element = (function () {
    function element(tag, parent, text) {
        this.tag = tag;
        this.props = [];
        this.dom = document.createElement(tag);
        if (parent)
            this.parent = parent;
        if (text && tag == static_1.default.TEXT) {
            this.content = text;
        }
        else {
            this.childs = [];
        }
    }
    element.prototype.setProp = function (propName, propContent) {
        this.props.push(new props_1.default(propName, propContent));
        return this;
    };
    element.prototype.diff = function () {
    };
    element.prototype.change = function () {
    };
    element.prototype.bind = function () {
    };
    element.prototype.appendElement = function (child) {
        var node = child;
        this.childs.push(child);
        return node;
    };
    element.prototype.append = function (tag, text) {
        var node = null;
        if (tag == static_1.default.TEXT) {
            node = new element(static_1.default.TEXT, this, text);
        }
        else {
            node = new element(tag, this);
        }
        this.childs.push(node);
        return node;
    };
    element.prototype.appendText = function (content) {
        var textNode = new element(static_1.default.TEXT, this, content);
        this.childs.push(textNode);
        return textNode;
    };
    element.prototype.g = function () {
        return this.tag == static_1.default.TEXT ? this.content : this.childs;
    };
    element.prototype.getParent = function () {
        return this.parent;
    };
    element.prototype.getNode = function () {
        return this.dom;
    };
    element.prototype.render = function () {
        if (this.dom.tagName == static_1.default.TEXT.toUpperCase()) {
            this.dom.innerText = this.content;
            return this.dom.firstChild;
        }
        else {
            for (var i = 0; i < this.props.length; i++) {
                this.dom[this.props[i].getPropsName()] = this.props[i].getPropsContent();
            }
        }
        if (this.childs) {
            for (var i = 0; i < this.childs.length; i++) {
                var childElement = this.childs[i].render();
                if (childElement)
                    this.dom.appendChild(childElement);
            }
        }
        else {
            this.dom.innerHTML = this.content;
        }
        return this.dom;
    };
    element.prototype.renderString = function () {
        var str = "";
        if (this.tag != static_1.default.TEXT && this.tag != static_1.default.ROOT)
            str += "<" + this.tag + ">";
        if (this.childs) {
            for (var i = 0; i < this.childs.length; i++) {
                str += this.childs[i].renderString();
            }
            if (this.tag != static_1.default.TEXT && this.tag != static_1.default.ROOT)
                str += "</" + this.tag + ">";
        }
        else {
            str += this.content;
        }
        return str;
    };
    return element;
}());
exports.default = element;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var props = (function () {
    function props(propsName, propsContent) {
        this.propsName = propsName;
        this.propsContent = propsContent;
    }
    props.prototype.getPropsName = function () {
        return this.propsName;
    };
    props.prototype.getPropsContent = function () {
        return this.propsContent;
    };
    return props;
}());
exports.default = props;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjE0MzM3ZjM3NmQxNjQwZmJiN2YiLCJ3ZWJwYWNrOi8vLy4vZG9nRE9NL3N0YXRpYy50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L3Rlc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlRG9nLnRzIiwid2VicGFjazovLy8uL2RvZ0RPTS9kb2dET00udHMiLCJ3ZWJwYWNrOi8vLy4vZG9nRE9NL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9kb2dET00vcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2RvZ0RPTS9lbGVtZW50LnRzIiwid2VicGFjazovLy8uL2RvZ0RPTS9wcm9wcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsSUFBTSxPQUFPLEdBQVE7SUFDakIsR0FBRyxFQUFFLEtBQUs7SUFDVixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07Q0FDZjtBQUVtQiwwQkFBTzs7Ozs7Ozs7OztBQ1AzQixxQ0FBaUM7QUFFakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxlQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFDN0M7OztnREFHNEMsQ0FDL0Ms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IGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyMTQzMzdmMzc2ZDE2NDBmYmI3ZiIsImNvbnN0IHN0YXRpY3M6IGFueSA9IHtcbiAgICBESVY6IFwiZGl2XCIsXG4gICAgU1BBTjogXCJzcGFuXCIsXG4gICAgVEVYVDogXCJ0ZXh0XCIsXG4gICAgUk9PVDogXCJyb290XCJcbn1cblxuZXhwb3J0IHsgc3RhdGljcyBhcyBkZWZhdWx0IH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kb2dET00vc3RhdGljLnRzIiwiaW1wb3J0IHJlZG9nIGZyb20gJy4uL3NyYy9SZURvZyc7XG5cbmxldCBhID0gbmV3IHJlZG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSxcbiAgICBcIjxkaXY+XFxcbiAgICA8c3Bhbj5kYXNkPGRpdj5cXFxuICAgICAgICA8c3BhbiBpZD0xMjMxMj50ZXN0PC9zcGFuPjEyMzEyMzFcXFxuICAgICAgICA8L2Rpdj4xMTxzcGFuPjExPC9zcGFuPjEyMzwvc3Bhbj48L2Rpdj5cIlxuKTtcbmEubW91bnQoKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Rlc3QvdGVzdC50cyIsImltcG9ydCB2ZG9tIGZyb20gJy4uL2RvZ0RPTS9kb2dET00nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgcHJpdmF0ZSByb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByb290RE9NOiB2ZG9tO1xuXG4gICAgY29uc3RydWN0b3IoRE9NRWxlbWVudDogSFRNTEVsZW1lbnQsIERPTTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSBET01FbGVtZW50O1xuICAgICAgICB0aGlzLnJvb3RET00gPSBuZXcgdmRvbShET00pO1xuICAgIH1cblxuICAgIHN0cmluZ2lmeSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290RE9NLnJlbmRlclN0cmluZygpO1xuICAgIH1cblxuICAgIG1vdW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucm9vdERPTS5yZW5kZXIoKSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZURvZy50cyIsImltcG9ydCBTIGZyb20gJy4vc3RhdGljJztcbmltcG9ydCBjb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2VyJztcbmltcG9ydCBwcm9wcyBmcm9tICcuL3Byb3BzJztcblxuY2xhc3MgZG9nRE9NIHtcbiAgICBwcml2YXRlIHJvb3RDb21wb25lbnQ6IGNvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKGRvbTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucm9vdENvbXBvbmVudCA9IG5ldyBjb21wb25lbnQoZG9tKTtcbiAgICB9XG5cbiAgICBnZXREb21FbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdENvbXBvbmVudC5nZXREb21FbGVtZW50KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3RDb21wb25lbnQucmVuZGVyU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IE5vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290Q29tcG9uZW50LnJlbmRlcigpO1xuICAgIH1cbn1cbmV4cG9ydCB7IGRvZ0RPTSBhcyBkZWZhdWx0IH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kb2dET00vZG9nRE9NLnRzIiwiaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2VyJztcbmltcG9ydCBlbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQgUyBmcm9tICcuL3N0YXRpYyc7XG5cbmNsYXNzIGNvbXBvbmVudCB7XG4gICAgcHJpdmF0ZSByb290RWxlbWVudDogZWxlbWVudDtcbiAgICBwcml2YXRlIF9zdGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoZG9tOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudCA9IHBhcnNlKGRvbSk7XG4gICAgfVxuXG4gICAgZ2V0RG9tRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50LmdldE5vZGUoKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQucmVuZGVyU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IE5vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudC5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cblxuICAgIHNldCBzdGF0ZShuZXdTdGF0ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gbmV3U3RhdGU7XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IGNvbXBvbmVudCBhcyBkZWZhdWx0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZG9nRE9NL2NvbXBvbmVudC50cyIsImltcG9ydCBlbGVtZW50IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQgUyBmcm9tICcuL3N0YXRpYyc7XG5cbmNvbnN0IHBhcnNlciA9IGZ1bmN0aW9uIChkb206IHN0cmluZyk6IGVsZW1lbnQge1xuICAgIGxldCB0cmVlOiBlbGVtZW50ID0gbmV3IGVsZW1lbnQoUy5ST09UKTtcbiAgICBsZXQgcG9zaXRpb246IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBsZXQgcG9pbnRlcjogZWxlbWVudCA9IHRyZWU7XG4gICAgbGV0IGRMaXN0OiBBcnJheTxzdHJpbmc+ID0gZG9tLnNwbGl0KC88Lyk7XG4gICAgY29uc29sZS5sb2coZExpc3QpO1xuICAgIHdoaWxlIChkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBkb2ZMaXN0OiBzdHJpbmcgPSBkTGlzdC5zaGlmdCgpO1xuICAgICAgICBsZXQgbm9kZTogQXJyYXk8c3RyaW5nPiA9IGRvZkxpc3Quc3BsaXQoLz4vKTtcbiAgICAgICAgaWYgKG5vZGUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIGlmIChub2RlWzBdKSB7XG4gICAgICAgICAgICAgICAgcG9pbnRlciA9IHRyZWUuYXBwZW5kVGV4dChub2RlWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChub2RlWzBdWzBdID09IFwiL1wiKSB7XG4gICAgICAgICAgICBsZXQgbGFzdHBvc2l0aW9uOiBzdHJpbmcgPSBwb3NpdGlvbltwb3NpdGlvbi5sZW5ndGggLSAxXVxuICAgICAgICAgICAgaWYgKG5vZGVbMF0uc3Vic3RyaW5nKDEpID09IGxhc3Rwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHBvaW50ZXIgPSBwb2ludGVyLmdldFBhcmVudCgpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXIuYXBwZW5kVGV4dChub2RlWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwicGFyc2UgZXJyb3IsIFwiICsgbGFzdHBvc2l0aW9uICsgXCJoYXZlIG5vIGNsb3NlIHRhZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHByb3BzU3BsaXQgPSBub2RlWzBdLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgIGxldCBhOiBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChub2RlWzBdLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgYSA9IG5ldyBlbGVtZW50KG5vZGVbMF0sIHBvaW50ZXIpO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnB1c2gobm9kZVswXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGEgPSBuZXcgZWxlbWVudChwcm9wc1NwbGl0WzBdLCBwb2ludGVyKTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi5wdXNoKHByb3BzU3BsaXRbMF0pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcHJvcHNTcGxpdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcExSID0gcHJvcHNTcGxpdFtpXS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgICAgICAgICAgIGEuc2V0UHJvcChwcm9wTFJbMF0sIHByb3BMUlsxXSA/IHByb3BMUlsxXSA6IHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlWzFdKSBhLmFwcGVuZFRleHQobm9kZVsxXSk7XG4gICAgICAgICAgICBwb2ludGVyID0gcG9pbnRlci5hcHBlbmRFbGVtZW50KGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cmVlO1xufVxuZXhwb3J0IHsgcGFyc2VyIGFzIGRlZmF1bHQgfVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RvZ0RPTS9wYXJzZXIudHMiLCJpbXBvcnQgcHJvcHMgZnJvbSAnLi9wcm9wcyc7XG5pbXBvcnQgUyBmcm9tICcuL3N0YXRpYyc7XG5cbmNsYXNzIGVsZW1lbnQge1xuICAgIHByaXZhdGUgdGFnOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjb250ZW50OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBwcm9wczogQXJyYXk8cHJvcHM+O1xuICAgIHByaXZhdGUgcGFyZW50OiBlbGVtZW50O1xuICAgIHByaXZhdGUgY2hpbGRzOiBBcnJheTxlbGVtZW50PjtcbiAgICBwcml2YXRlIGRvbTogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IodGFnOiBzdHJpbmcsIHBhcmVudD86IGVsZW1lbnQsIHRleHQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7XG4gICAgICAgIHRoaXMucHJvcHMgPSBbXTtcbiAgICAgICAgdGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIGlmIChwYXJlbnQpIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBpZiAodGV4dCAmJiB0YWcgPT0gUy5URVhUKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQcm9wKHByb3BOYW1lOiBzdHJpbmcsIHByb3BDb250ZW50OiBhbnkpOiBlbGVtZW50IHtcbiAgICAgICAgdGhpcy5wcm9wcy5wdXNoKG5ldyBwcm9wcyhwcm9wTmFtZSwgcHJvcENvbnRlbnQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGRpZmYoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgY2hhbmdlKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGJpbmQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwZW5kRWxlbWVudChjaGlsZDogZWxlbWVudCk6IGVsZW1lbnQge1xuICAgICAgICBsZXQgbm9kZTogZWxlbWVudCA9IGNoaWxkO1xuICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGFwcGVuZCh0YWc6IHN0cmluZywgdGV4dD86IHN0cmluZyk6IGVsZW1lbnQge1xuICAgICAgICBsZXQgbm9kZTogZWxlbWVudCA9IG51bGw7XG4gICAgICAgIGlmICh0YWcgPT0gUy5URVhUKSB7XG4gICAgICAgICAgICBub2RlID0gbmV3IGVsZW1lbnQoUy5URVhULCB0aGlzLCB0ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSBuZXcgZWxlbWVudCh0YWcsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRzLnB1c2gobm9kZSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBlbmRUZXh0KGNvbnRlbnQ6IHN0cmluZyk6IGVsZW1lbnQge1xuICAgICAgICBsZXQgdGV4dE5vZGU6IGVsZW1lbnQgPSBuZXcgZWxlbWVudChTLlRFWFQsIHRoaXMsIGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmNoaWxkcy5wdXNoKHRleHROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRleHROb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhZyA9PSBTLlRFWFQgPyB0aGlzLmNvbnRlbnQgOiB0aGlzLmNoaWxkcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGFyZW50KCk6IGVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5kb207XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpOiBOb2RlIHtcbiAgICAgICAgaWYgKHRoaXMuZG9tLnRhZ05hbWUgPT0gUy5URVhULnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tLmlubmVyVGV4dCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvbS5maXJzdENoaWxkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb21bdGhpcy5wcm9wc1tpXS5nZXRQcm9wc05hbWUoKV0gPSB0aGlzLnByb3BzW2ldLmdldFByb3BzQ29udGVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZEVsZW1lbnQ6IE5vZGUgPSB0aGlzLmNoaWxkc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRFbGVtZW50KSB0aGlzLmRvbS5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb20uaW5uZXJIVE1MID0gdGhpcy5jb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRvbTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xuICAgICAgICBpZiAodGhpcy50YWcgIT0gUy5URVhUICYmIHRoaXMudGFnICE9IFMuUk9PVCkgc3RyICs9IFwiPFwiICsgdGhpcy50YWcgKyBcIj5cIjtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IHRoaXMuY2hpbGRzW2ldLnJlbmRlclN0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGFnICE9IFMuVEVYVCAmJiB0aGlzLnRhZyAhPSBTLlJPT1QpIHN0ciArPSBcIjwvXCIgKyB0aGlzLnRhZyArIFwiPlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyICs9IHRoaXMuY29udGVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn1cbmV4cG9ydCB7IGVsZW1lbnQgYXMgZGVmYXVsdCB9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZG9nRE9NL2VsZW1lbnQudHMiLCJjbGFzcyBwcm9wcyB7XG4gICAgcHJpdmF0ZSBwcm9wc05hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIHByb3BzQ29udGVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHNOYW1lOiBzdHJpbmcsIHByb3BzQ29udGVudDogYW55KSB7XG4gICAgICAgIHRoaXMucHJvcHNOYW1lID0gcHJvcHNOYW1lO1xuICAgICAgICB0aGlzLnByb3BzQ29udGVudCA9IHByb3BzQ29udGVudDtcbiAgICB9XG5cbiAgICBnZXRQcm9wc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHNOYW1lO1xuICAgIH1cblxuICAgIGdldFByb3BzQ29udGVudCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wc0NvbnRlbnQ7XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IHByb3BzIGFzIGRlZmF1bHQgfVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RvZ0RPTS9wcm9wcy50cyJdLCJzb3VyY2VSb290IjoiIn0=