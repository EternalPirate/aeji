(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-history-history-module"],{

/***/ "./src/app/pages/history/history.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/history/history.module.ts ***!
  \*************************************************/
/*! exports provided: HistoryPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryPageModule", function() { return HistoryPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _history_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./history.page */ "./src/app/pages/history/history.page.ts");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");





var routes = [
    {
        path: '',
        component: _history_page__WEBPACK_IMPORTED_MODULE_3__["HistoryPage"]
    }
];
var HistoryPageModule = /** @class */ (function () {
    function HistoryPageModule() {
    }
    HistoryPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
            ],
            declarations: [_history_page__WEBPACK_IMPORTED_MODULE_3__["HistoryPage"]]
        })
    ], HistoryPageModule);
    return HistoryPageModule;
}());



/***/ }),

/***/ "./src/app/pages/history/history.page.html":
/*!*************************************************!*\
  !*** ./src/app/pages/history/history.page.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n\r\n\r\n    <ion-title>\r\n      История\r\n      <span *ngIf=\"historyLen\">({{ historyLen }}шт.)</span>\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n  <ion-refresher (ionRefresh)=\"onRefresh($event)\">\r\n    <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n\r\n\r\n  <div *ngIf=\"history?.length > 0\">\r\n    <div id=\"cards\">\r\n      <app-queue-video\r\n              *ngFor=\"let item of history; trackBy: trackQueue\"\r\n              [queueItem]=\"item\"\r\n              [isHistory]=\"true\">\r\n      </app-queue-video>\r\n    </div>\r\n\r\n    <ion-infinite-scroll threshold=\"5px\" (ionInfinite)=\"onInfiniteScroll($event)\">\r\n      <ion-infinite-scroll-content\r\n              loadingSpinner=\"bubbles\"\r\n              loadingText=\"Loading more data...\">\r\n      </ion-infinite-scroll-content>\r\n    </ion-infinite-scroll>\r\n  </div>\r\n\r\n\r\n  <h2 *ngIf=\"history?.length === 0\" text-center>Пустовато</h2>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/history/history.page.scss":
/*!*************************************************!*\
  !*** ./src/app/pages/history/history.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2hpc3RvcnkvaGlzdG9yeS5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/history/history.page.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/history/history.page.ts ***!
  \***********************************************/
/*! exports provided: HistoryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryPage", function() { return HistoryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_history_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/history.service */ "./src/app/services/history.service.ts");



var HistoryPage = /** @class */ (function () {
    function HistoryPage(historyService, r) {
        this.historyService = historyService;
        this.r = r;
        this.limit = 2;
        this.cardsHeightIsChecked = false;
    }
    HistoryPage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var docs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.historyService
                            .getHistory(this.limit)
                            .toPromise()];
                    case 1:
                        docs = (_a.sent())
                            .docs;
                        this.historySnapshot = docs;
                        this.history = docs.map(function (item) { return item.data(); });
                        this.checkInitHeight();
                        return [2 /*return*/];
                }
            });
        });
    };
    HistoryPage.prototype.checkInitHeight = function () {
        var _this = this;
        setTimeout(function () {
            var cards = _this.r.nativeElement.querySelector('#cards');
            if (cards) {
                var wp = cards.closest('ion-content');
                if (cards && cards.clientHeight < wp.clientHeight) {
                    // if cards height less than screen we need to load more
                    _this.loadMore();
                    _this.cardsHeightIsChecked = true;
                }
            }
        });
    };
    HistoryPage.prototype.loadMore = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, lastSnapshot, docs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        lastSnapshot = this.historySnapshot[this.historySnapshot.length - 1];
                        if (!lastSnapshot) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.historyService
                                .getHistoryFromTo(lastSnapshot, this.limit)
                                .toPromise()];
                    case 1:
                        docs = (_c.sent())
                            .docs;
                        this.historySnapshot = docs ? (_a = this.historySnapshot).concat.apply(_a, docs) : null;
                        this.history = docs ? (_b = this.history).concat.apply(_b, docs.map(function (item) { return item.data(); })) : null;
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    HistoryPage.prototype.onRefresh = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var fromFirstSnapshot, toVisibleLength, docs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromFirstSnapshot = this.historySnapshot[0];
                        if (!fromFirstSnapshot) return [3 /*break*/, 2];
                        toVisibleLength = this.historySnapshot.length;
                        return [4 /*yield*/, this.historyService
                                .getHistoryFromTo(fromFirstSnapshot, toVisibleLength, true)
                                .toPromise()];
                    case 1:
                        docs = (_a.sent())
                            .docs;
                        this.historySnapshot = docs;
                        this.history = docs.map(function (item) { return item.data(); });
                        _a.label = 2;
                    case 2:
                        event.target.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    HistoryPage.prototype.onInfiniteScroll = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.loadMore();
            event.target.complete();
        }, 500);
    };
    HistoryPage.prototype.trackQueue = function (index, queue) {
        return queue ? queue.key : undefined;
    };
    HistoryPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-history',
            template: __webpack_require__(/*! ./history.page.html */ "./src/app/pages/history/history.page.html"),
            styles: [__webpack_require__(/*! ./history.page.scss */ "./src/app/pages/history/history.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_history_service__WEBPACK_IMPORTED_MODULE_2__["HistoryService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], HistoryPage);
    return HistoryPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-history-history-module.js.map