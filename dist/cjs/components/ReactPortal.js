"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
function createWrapperAndAppendToBody(wrapperId) {
    var wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}
var ReactPortal = /** @class */ (function (_super) {
    tslib_1.__extends(ReactPortal, _super);
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
        return (0, react_dom_1.createPortal)(this.props.children, this.state.wrapperElement);
    };
    return ReactPortal;
}(react_1.Component));
exports["default"] = ReactPortal;
//# sourceMappingURL=ReactPortal.js.map