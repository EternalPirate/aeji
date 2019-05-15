(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-home-home-module"],{

/***/ "./src/app/pages/home/home.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home.page */ "./src/app/pages/home/home.page.ts");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");





var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/pages/home/home.page.html":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n    <ion-title>\n      Queues\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf=\"!loading\">\n    <ion-list *ngIf=\"queuesNotEmpty\" @list>\n      <ion-item\n              @items\n              *ngFor=\"let item of queues; trackBy: trackQueue\"\n              [hidden]=\"item.videoQueueLen === 0\"\n              (click)=\"openQueue(item)\">\n        <ion-label>{{ item.queueType }} Очередь</ion-label>\n        <ion-note slot=\"end\">({{ item.videoQueueLen }}шт.)</ion-note>\n      </ion-item>\n    </ion-list>\n\n    <h2 *ngIf=\"!queuesNotEmpty\" text-center>empty</h2>\n  </div>\n\n  <ion-row *ngIf=\"loading\" justify-content-center>\n    <ion-spinner name=\"dots\"></ion-spinner>\n  </ion-row>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/home/home.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card ion-img {\n  max-height: 35vh;\n  overflow: hidden; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9nY2hyb25vcy9hZWppL3NyYy9hcHAvcGFnZXMvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2VsY29tZS1jYXJkIGlvbi1pbWcge1xuICBtYXgtaGVpZ2h0OiAzNXZoO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/pages/home/home.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/home/home.page.ts ***!
  \*****************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_queues_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/queues.service */ "./src/app/services/queues.service.ts");






var HomePage = /** @class */ (function () {
    function HomePage(queuesService, storage, router) {
        this.queuesService = queuesService;
        this.storage = storage;
        this.router = router;
        this.loading = true;
        this.queuesNotEmpty = false;
    }
    HomePage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.queuesService
                    .getQueues()
                    .subscribe(function (queues) {
                    _this.queues = queues;
                    _this.queuesNotEmpty = _this.queues.some(function (item) { return item.videoQueueLen > 0; });
                    _this.loading = false;
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.openQueue = function (queue) {
        this.router.navigate(['queue', queue.queueType]);
    };
    HomePage.prototype.trackQueue = function (index, queue) {
        return queue ? queue.queueType : undefined;
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/pages/home/home.page.html"),
            animations: [
                // nice stagger effect when showing existing elements
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('list', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':enter', [
                        // child animation selector + stagger
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["query"])('@items', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["stagger"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animateChild"])()), { optional: true })
                    ]),
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('items', [
                    // cubic-bezier for a tiny bouncing feel
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: 0 }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('.2s linear', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: 1 }))
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: 1 }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('.2s linear', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: 0 }))
                    ]),
                ])
            ],
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/pages/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_queues_service__WEBPACK_IMPORTED_MODULE_5__["QueuesService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-home-home-module.js.map