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

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n\n    <ion-title>\n      History\n      <span *ngIf=\"history?.length > 0\">({{ history.length }}шт.)</span>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf=\"!loading\">\n    <div *ngIf=\"history?.length > 0\">\n      <div @list id=\"cards\">\n        <app-queue-video\n                @items\n                *ngFor=\"let item of history; trackBy: trackQueue\"\n                [queueItem]=\"item\"\n                [isHistory]=\"true\">\n        </app-queue-video>\n      </div>\n\n      <ion-infinite-scroll threshold=\"5px\" (ionInfinite)=\"onInfiniteScroll($event)\">\n        <ion-infinite-scroll-content\n                loadingSpinner=\"bubbles\"\n                loadingText=\"Loading more data...\">\n        </ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </div>\n\n\n    <h2 *ngIf=\"history?.length === 0\" text-center>empty</h2>\n  </div>\n\n  <ion-row *ngIf=\"loading\" justify-content-center>\n    <ion-spinner name=\"dots\"></ion-spinner>\n  </ion-row>\n</ion-content>\n"

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
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");




var HistoryPage = /** @class */ (function () {
    function HistoryPage(historyService, r) {
        this.historyService = historyService;
        this.r = r;
        this.loading = true;
        this.limit = 2;
    }
    HistoryPage.prototype.ngOnInit = function () {
        var _this = this;
        this.initLoad();
        this.historyService
            .getHistorySub(this.limit)
            .subscribe(function (e) {
            _this.checkInitHeight();
        });
    };
    HistoryPage.prototype.initLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var docs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.historyService
                            .getHistoryList(this.limit)
                            .toPromise()];
                    case 1:
                        docs = (_a.sent())
                            .docs;
                        this.historySnapshot = docs;
                        this.history = docs.map(function (item) { return item.data(); });
                        this.loading = false;
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
                }
            }
            else {
                // in case if we have no cards but just added one more
                _this.initLoad();
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
    HistoryPage.prototype.onInfiniteScroll = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.loadMore();
            event.target.complete();
        }, 500);
    };
    HistoryPage.prototype.trackQueue = function (index, queue) {
        return queue ? queue.id : undefined;
    };
    HistoryPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-history',
            template: __webpack_require__(/*! ./history.page.html */ "./src/app/pages/history/history.page.html"),
            animations: [
                // nice stagger effect when showing existing elements
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('list', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':enter', [
                        // child animation selector + stagger
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["query"])('@items', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["stagger"])(300, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animateChild"])()))
                    ]),
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('items', [
                    // cubic-bezier for a tiny bouncing feel
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'scale(0.5)', opacity: 0 }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('1s cubic-bezier(.8,-0.6,0.2,1.5)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'scale(1)', opacity: 1 }))
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'scale(1)', opacity: 1, height: '*' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('1s cubic-bezier(.8,-0.6,0.2,1.5)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
                    ]),
                ])
            ],
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