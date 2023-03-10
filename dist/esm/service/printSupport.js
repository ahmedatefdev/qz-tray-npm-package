import { __awaiter, __generator } from "tslib";
export default (function (api) {
    var sign = function (_a) {
        var toSign = _a.toSign, url = _a.url;
        return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/, api.get("".concat(url, "?request=").concat(toSign))];
        }); });
    };
    return {
        sign: sign
    };
});
//# sourceMappingURL=printSupport.js.map