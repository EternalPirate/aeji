(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-queues-queues-module"],{

/***/ "./src/app/pages/queues/queues.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/queues/queues.module.ts ***!
  \***********************************************/
/*! exports provided: QueuesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueuesPageModule", function() { return QueuesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _queues_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queues.page */ "./src/app/pages/queues/queues.page.ts");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");





var QueuesPageModule = /** @class */ (function () {
    function QueuesPageModule() {
    }
    QueuesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _queues_page__WEBPACK_IMPORTED_MODULE_3__["QueuesPage"]
                    }
                ])
            ],
            declarations: [_queues_page__WEBPACK_IMPORTED_MODULE_3__["QueuesPage"]]
        })
    ], QueuesPageModule);
    return QueuesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/queues/queues.page.html":
/*!***********************************************!*\
  !*** ./src/app/pages/queues/queues.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n\r\n    <ion-title>\r\n      Очереди\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div *ngIf=\"loaded\">\r\n    <ion-list *ngIf=\"queuesNotEmpty\" @list>\r\n      <ion-item\r\n              @items\r\n              *ngFor=\"let item of queues; trackBy: trackQueue\"\r\n              [hidden]=\"item.videoQueueLen === 0\"\r\n              (click)=\"openQueue(item)\">\r\n        <ion-label>{{ item.queueType }} Очередь</ion-label>\r\n        <ion-note slot=\"end\">({{ item.videoQueueLen }}шт.)</ion-note>\r\n      </ion-item>\r\n    </ion-list>\r\n\r\n    <h2 *ngIf=\"!queuesNotEmpty\" text-center>Пустовато</h2>\r\n  </div>\r\n\r\n\r\n  <h2 *ngIf=\"!loaded\" text-center>\r\n    ...загрузка\r\n  </h2>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/queues/queues.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/queues/queues.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card ion-img {\n  max-height: 35vh;\n  overflow: hidden; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcXVldWVzL0Q6XFxQUk9KRUNUU1xcYWVqaS9zcmNcXGFwcFxccGFnZXNcXHF1ZXVlc1xccXVldWVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3F1ZXVlcy9xdWV1ZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndlbGNvbWUtY2FyZCBpb24taW1nIHtcclxuICBtYXgtaGVpZ2h0OiAzNXZoO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/pages/queues/queues.page.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/queues/queues.page.ts ***!
  \*********************************************/
/*! exports provided: QueuesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueuesPage", function() { return QueuesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _services_queues_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/queues.service */ "./src/app/services/queues.service.ts");





var QueuesPage = /** @class */ (function () {
    function QueuesPage(queuesService, router) {
        this.queuesService = queuesService;
        this.router = router;
        this.queuesNotEmpty = false;
        this.loaded = false;
    }
    QueuesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.queuesService
            .getQueues()
            .subscribe(function (queues) {
            _this.queues = queues;
            _this.queuesNotEmpty = _this.queues.some(function (item) { return item.videoQueueLen > 0; });
            _this.loaded = true;
        });
    };
    QueuesPage.prototype.openQueue = function (queue) {
        this.router.navigate(['queue', queue.queueType]);
    };
    QueuesPage.prototype.trackQueue = function (index, queue) {
        return queue ? queue.queueType : undefined;
    };
    QueuesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-queues',
            template: __webpack_require__(/*! ./queues.page.html */ "./src/app/pages/queues/queues.page.html"),
            animations: [
                // nice stagger effect when showing existing elements
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('list', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':enter', [
                        // child animation selector + stagger
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["query"])('@items', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["stagger"])(300, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animateChild"])()), { optional: true })
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
            styles: [__webpack_require__(/*! ./queues.page.scss */ "./src/app/pages/queues/queues.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_queues_service__WEBPACK_IMPORTED_MODULE_4__["QueuesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], QueuesPage);
    return QueuesPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-queues-queues-module.js.map