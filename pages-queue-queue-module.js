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

module.exports = "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-back-button></ion-back-button>\n        </ion-buttons>\n\n        <ion-title *ngIf=\"activeQueue\">\n            {{ activeQueue.queueType }}\n            Queue\n            <span *ngIf=\"activeQueue.videoQueueLen\"> - {{ activeQueue.videoQueueLen }}</span>\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n    <div *ngIf=\"!loading\">\n        <div *ngIf=\"queue?.length > 0\">\n            <div @list id=\"cards\">\n                <app-queue-video\n                        @items\n                        *ngFor=\"let queueItem of queue; let index = index; trackBy: trackQueue\"\n                        [queueItem]=\"queueItem\"\n                        [index]=\"index\"\n                        (removeItem)=\"removeItem($event)\">\n                </app-queue-video>\n            </div>\n\n\n            <ion-infinite-scroll threshold=\"5px\" (ionInfinite)=\"onInfiniteScroll($event)\">\n                <ion-infinite-scroll-content\n                        loadingSpinner=\"bubbles\"\n                        loadingText=\"Loading more data...\">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n        </div>\n\n        <h2 *ngIf=\"queue?.length === 0\" text-center>empty</h2>\n    </div>\n\n    <ion-row *ngIf=\"loading\" justify-content-center>\n        <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n</ion-content>\n"

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
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services_queues_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/queues.service */ "./src/app/services/queues.service.ts");
/* harmony import */ var _services_history_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/history.service */ "./src/app/services/history.service.ts");









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
        this.limit = 3;
        this.loading = true;
        this.checkHeightCount = 0;
        this.checkHeightCountLimit = 5;
    }
    QueuePage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.activeQueue.queueType = this.route.snapshot.params.id;
                if (this.activeQueue.queueType) {
                    this.initLoad();
                    // check for queue change
                    this.queuesService
                        .getQueueByIdSub(this.activeQueue.queueType)
                        .subscribe(function (activeQueue) {
                        _this.activeQueue = activeQueue;
                        _this.checkInitHeight();
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    QueuePage.prototype.initLoad = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var collection, docs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = this.queuesService.getQueueListById(this.activeQueue.queueType, this.limit);
                        return [4 /*yield*/, collection.toPromise()];
                    case 1:
                        docs = (_a.sent()).docs;
                        // get snapshot and values
                        // snapshot need for lazyloading and removing items
                        this.queueSnapshot = docs;
                        this.queue = docs.map(function (item) { return item.data(); });
                        this.loading = false;
                        return [2 /*return*/];
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
                                header: 'Are you sure?',
                                buttons: [{
                                        text: 'Yes',
                                        role: 'destructive',
                                        icon: 'trash',
                                        handler: function () {
                                            var removedSnapshot = _this.queueSnapshot.splice(e.index, 1)[0];
                                            var removed = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.queue.splice(e.index, 1)[0], { date_removed: firebase_app__WEBPACK_IMPORTED_MODULE_6__["firestore"].FieldValue.serverTimestamp() });
                                            _this.historyService.pushToHistory(removed);
                                            _this.queuesService.deleteQueueItem(_this.activeQueue.queueType, removedSnapshot);
                                            remEl.classList.remove('on-removing');
                                        }
                                    }, {
                                        text: 'Cancel',
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
    QueuePage.prototype.checkInitHeight = function () {
        var _this = this;
        setTimeout(function () {
            var cards = _this.r.nativeElement.querySelector('#cards');
            if (cards) {
                var wp = cards.closest('ion-content');
                if (cards && cards.clientHeight < wp.clientHeight && _this.checkHeightCount <= _this.checkHeightCountLimit) {
                    // if cards height less than screen we need to load more
                    _this.loadMore();
                }
            }
            else {
                // in case if we have no cards but just added one more
                _this.initLoad();
            }
        }, 100);
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
                        this.queueSnapshot = docs ? (_a = this.queueSnapshot).concat.apply(_a, docs) : null;
                        this.queue = docs ? (_b = this.queue).concat.apply(_b, docs.map(function (item) { return item.data(); })) : null;
                        this.checkInitHeight();
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
        return queue ? queue.id : undefined;
    };
    QueuePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-queue-list',
            template: __webpack_require__(/*! ./queue.page.html */ "./src/app/pages/queue/queue.page.html"),
            animations: [
                // nice stagger effect when showing existing elements
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["trigger"])('list', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["transition"])(':enter', [
                        // child animation selector + stagger
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["query"])('@items', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["stagger"])(300, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["animateChild"])()))
                    ]),
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["trigger"])('items', [
                    // cubic-bezier for a tiny bouncing feel
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["transition"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({ transform: 'scale(0.5)', opacity: 0 }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["animate"])('1s cubic-bezier(.8,-0.6,0.2,1.5)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({ transform: 'scale(1)', opacity: 1 }))
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["transition"])(':leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({ transform: 'scale(1)', opacity: 1, height: '*' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["animate"])('1s cubic-bezier(.8,-0.6,0.2,1.5)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
                    ]),
                ])
            ],
            styles: [__webpack_require__(/*! ./queue.page.scss */ "./src/app/pages/queue/queue.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_queues_service__WEBPACK_IMPORTED_MODULE_7__["QueuesService"],
            _services_history_service__WEBPACK_IMPORTED_MODULE_8__["HistoryService"],
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