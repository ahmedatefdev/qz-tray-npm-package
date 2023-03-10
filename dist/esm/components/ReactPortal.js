import { __extends } from "tslib";
import { Component } from "react";
import { createPortal } from "react-dom";
function createWrapperAndAppendToBody(wrapperId) {
    var wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}
var ReactPortal = /** @class */ (function (_super) {
    __extends(ReactPortal, _super);
    function ReactPortal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            wrapperElement: null
        };
        return _this;
    }
    ReactPortal.prototype.componentDidMount = function () {
        var wrapperId = this.props.wrapperId || "react-portal-QZ-wrapper";
        var element = document.getElementById(wrapperId);
        element = createWrapperAndAppendToBody(wrapperId);
        this.setState({ wrapperElement: element });
        return function () {
            if (element === null || element === void 0 ? void 0 : element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    };
    ReactPortal.prototype.render = function () {
        if (this.state.wrapperElement === null)
            return null;
        return createPortal(this.props.children, this.state.wrapperElement);
    };
    return ReactPortal;
}(Component));
export default ReactPortal;
//# sourceMappingURL=ReactPortal.js.map