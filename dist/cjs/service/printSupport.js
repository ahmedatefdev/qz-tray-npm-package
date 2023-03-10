"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
exports["default"] = (function (api) {
    var sign = function (_a) {
        var toSign = _a.toSign, url = _a.url;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_b) {
            return [2 /*return*/, api.get("".concat(url, "?request=").concat(toSign))];
        }); });
    };
    return {
        sign: sign
    };
});
//# sourceMappingURL=printSupport.js.map