(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-queue-queue-module"],{

/***/ "./src/app/pages/queue/queue.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/queue/queue.module.ts ***!
  \*********************************************/
/*! exports provided: QueuePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueuePageModule", function() { return QueuePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _queue_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queue.page */ "./src/app/pages/queue/queue.page.ts");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");





var routes = [
    {
        path: '',
        component: _queue_page__WEBPACK_IMPORTED_MODULE_3__["QueuePage"]
    }
];
var QueuePageModule = /** @class */ (function () {
    function QueuePageModule() {
    }
    QueuePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
            ],
            declarations: [_queue_page__WEBPACK_IMPORTED_MODULE_3__["QueuePage"]]
        })
    ], QueuePageModule);
    return QueuePageModule;
}());



/***/ }),

/***/ "./src/app/pages/queue/queue.page.html":
/*!*********************************************!*\
  !*** ./src/app/pages/queue/queue.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n    <ion-toolbar>\r\n        <ion-buttons slot=\"start\">\r\n            <ion-back-button></ion-back-button>\r\n        </ion-buttons>\r\n\r\n        <ion-title *ngIf=\"activeQueue\">\r\n            {{ activeQueue.queueType }}\r\n            Очередь\r\n            <span *ngIf=\"activeQueue.videoQueueLen\">({{ activeQueue.videoQueueLen }}шт.)</span>\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n    <ion-refresher (ionRefresh)=\"onRefresh($event)\">\r\n        <ion-refresher-content></ion-refresher-content>\r\n    </ion-refresher>\r\n\r\n    <div *ngIf=\"queue?.length > 0\">\r\n        <div id=\"cards\">\r\n            <app-queue-video\r\n                    *ngFor=\"let queueItem of queue; let last = last; let index = index; trackBy: trackQueue\"\r\n                    [queueItem]=\"queueItem\"\r\n                    [last]=\"last\"\r\n                    [index]=\"index\"\r\n                    (removeItem)=\"removeItem($event)\"\r\n                    (lastVideoLoad)=\"onLastVideoLoad()\">\r\n            </app-queue-video>\r\n        </div>\r\n\r\n\r\n        <ion-infinite-scroll threshold=\"5px\" (ionInfinite)=\"onInfiniteScroll($event)\">\r\n            <ion-infinite-scroll-content\r\n                    loadingSpinner=\"bubbles\"\r\n                    loadingText=\"Loading more data...\">\r\n            </ion-infinite-scroll-content>\r\n        </ion-infinite-scroll>\r\n    </div>\r\n\r\n\r\n    <h2 *ngIf=\"queue?.length === 0\" text-center>Пустовато</h2>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/queue/queue.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/queue/queue.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3F1ZXVlL3F1ZXVlLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/queue/queue.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/queue/queue.page.ts ***!
  \*******************************************/
/*! exports provided: QueuePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueuePage", function() { return QueuePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_queues_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/queues.service */ "./src/app/services/queues.service.ts");
/* harmony import */ var _services_history_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/history.service */ "./src/app/services/history.service.ts");






// import * as html2canvas from 'html2canvas';


var QueuePage = /** @class */ (function () {
    function QueuePage(queuesService, historyService, sanitizer, router, route, r, actionSheetController) {
        this.queuesService = queuesService;
        this.historyService = historyService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.route = route;
        this.r = r;
        this.actionSheetController = actionSheetController;
        this.activeQueue = {
            queueType: null,
            videoQueueLen: null
        };
        this.limit = 2;
        this.cardsHeightIsChecked = false;
    }
    QueuePage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, collection, info, docs;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.activeQueue.queueType = this.route.snapshot.params.id;
                        if (!this.activeQueue.queueType) return [3 /*break*/, 2];
                        _a = this.queuesService.getQueueById(this.activeQueue.queueType, this.limit), collection = _a.collection, info = _a.info;
                        return [4 /*yield*/, collection.toPromise()];
                    case 1:
                        docs = (_b.sent()).docs;
                        // get snapshot and values
                        // snapshot need for lazyloading and removing items
                        this.queueSnapshot = docs;
                        this.queue = docs.map(function (item) { return item.data(); });
                        // check for queue change
                        info.subscribe(function (activeQueue) {
                            _this.activeQueue = activeQueue;
                        });
                        this.checkInitHeight();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    QueuePage.prototype.removeItem = function (e) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var remEl, actionSheet;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        remEl = e.event.target;
                        remEl.classList.add('on-removing');
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: 'Точно удалить?',
                                buttons: [{
                                        text: 'Да',
                                        role: 'destructive',
                                        icon: 'trash',
                                        handler: function () {
                                            var removedSnapshot = _this.queueSnapshot.splice(e.index, 1)[0];
                                            var removed = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.queue.splice(e.index, 1)[0], { date_removed: firebase_app__WEBPACK_IMPORTED_MODULE_5__["firestore"].FieldValue.serverTimestamp() });
                                            _this.historyService.pushToHistory(removed);
                                            _this.queuesService.deleteQueueItem(_this.activeQueue.queueType, removedSnapshot);
                                            _this.checkInitHeight();
                                            remEl.classList.remove('on-removing');
                                        }
                                    }, {
                                        text: 'Отмена',
                                        icon: 'close',
                                        role: 'cancel',
                                        handler: function () {
                                            remEl.classList.remove('on-removing');
                                        }
                                    }]
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QueuePage.prototype.onLastVideoLoad = function () {
        // onLastVideoLoad need to checkInitHeight
        if (!this.cardsHeightIsChecked) {
            this.checkInitHeight();
        }
    };
    QueuePage.prototype.checkInitHeight = function () {
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
    QueuePage.prototype.onRefresh = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var fromFirstSnapshot, toVisibleLength, docs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromFirstSnapshot = this.queueSnapshot[0];
                        if (!fromFirstSnapshot) return [3 /*break*/, 2];
                        toVisibleLength = this.queueSnapshot.length;
                        return [4 /*yield*/, this.queuesService
                                .getQueueByIdFromTo(this.activeQueue.queueType, fromFirstSnapshot, toVisibleLength, true)
                                .toPromise()];
                    case 1:
                        docs = (_a.sent())
                            .docs;
                        this.queueSnapshot = docs;
                        this.queue = docs.map(function (item) { return item.data(); });
                        _a.label = 2;
                    case 2:
                        event.target.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    QueuePage.prototype.loadMore = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, lastSnapshot, docs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        lastSnapshot = this.queueSnapshot[this.queueSnapshot.length - 1];
                        if (!lastSnapshot) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.queuesService
                                .getQueueByIdFromTo(this.activeQueue.queueType, lastSnapshot, this.limit)
                                .toPromise()];
                    case 1:
                        docs = (_c.sent())
                            .docs;
                        if (docs.length > 0) {
                            this.queueSnapshot = (_a = this.queueSnapshot).concat.apply(_a, docs);
                            this.queue = (_b = this.queue).concat.apply(_b, docs.map(function (item) { return item.data(); }));
                        }
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    QueuePage.prototype.onInfiniteScroll = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.loadMore();
            event.target.complete();
        }, 500);
    };
    QueuePage.prototype.trackQueue = function (index, queue) {
        return queue ? queue.key : undefined;
    };
    QueuePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-queue-list',
            template: __webpack_require__(/*! ./queue.page.html */ "./src/app/pages/queue/queue.page.html"),
            styles: [__webpack_require__(/*! ./queue.page.scss */ "./src/app/pages/queue/queue.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_queues_service__WEBPACK_IMPORTED_MODULE_6__["QueuesService"],
            _services_history_service__WEBPACK_IMPORTED_MODULE_7__["HistoryService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"]])
    ], QueuePage);
    return QueuePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-queue-queue-module.js.map