define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Component;
    (function (Component_1) {
        class Component {
            constructor(templateId, hostElementId, insertAtStart, newElementId) {
                this.templateElement = document.getElementById(templateId);
                this.hostElement = document.getElementById(hostElementId);
                const importedNode = document.importNode(this.templateElement.content, true);
                this.element = importedNode.firstElementChild;
                if (newElementId) {
                    this.element.id = newElementId;
                }
                this.attach(insertAtStart);
            }
            attach(insertWhere) {
                this.hostElement.insertAdjacentElement(insertWhere ? "afterbegin" : "beforeend", this.element);
            }
        }
        Component_1.Component = Component;
    })(Component = exports.Component || (exports.Component = {}));
});
