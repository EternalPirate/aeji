(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "./src/app/pages/login/login.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared.module */ "./src/app/shared.module.ts");





var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
                    }
                ])
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/pages/login/login.page.html":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <img src=\"./assets/aeji.gif\" alt=\"\" class=\"login-aeji\">\n  \n  <ion-row class=\"login-wp\" align-items-center justify-content-center>\n    <ion-button *ngIf=\"!loading\" (click)=\"logIn()\">\n      <ion-icon name=\"logo-google\"></ion-icon>\n      <span class=\"login-g\">login</span>\n    </ion-button>\n\n    <ion-spinner *ngIf=\"loading\" name=\"dots\"></ion-spinner>\n  </ion-row>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/login/login.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-wp {\n  height: 100%; }\n\n.login-aeji {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  height: 80%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  opacity: 0.02; }\n\n.login-g {\n  margin-left: 5px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9nY2hyb25vcy9hZWppL3NyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UsWUFBWSxFQUFBOztBQUdkO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1Qsd0NBQWdDO1VBQWhDLGdDQUFnQztFQUNoQyxXQUFXO0VBQ1gsc0JBQW1CO0tBQW5CLG1CQUFtQjtFQUNuQixhQUFhLEVBQUE7O0FBR2Y7RUFDRSxnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dpbiB7XG4gICYtd3Age1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gICYtYWVqaSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICBoZWlnaHQ6IDgwJTtcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xuICAgIG9wYWNpdHk6IDAuMDI7XG4gIH1cblxuICAmLWcge1xuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/pages/login/login.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/login/login.page.ts ***!
  \*******************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");






var LoginPage = /** @class */ (function () {
    function LoginPage(angularFireAuth, userService, router) {
        var _this = this;
        this.angularFireAuth = angularFireAuth;
        this.userService = userService;
        this.router = router;
        this.loading = true;
        this.userService.user.subscribe(function (user) {
            if (!user) {
                _this.router.navigate(['/']);
            }
        });
    }
    LoginPage.prototype.ngOnInit = function () {
        this.loading = false;
    };
    LoginPage.prototype.logIn = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var gLoginRes;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        return [4 /*yield*/, this.doGoogleLogin()];
                    case 1:
                        gLoginRes = _a.sent();
                        if (!(gLoginRes && gLoginRes.additionalUserInfo && gLoginRes.additionalUserInfo.profile)) return [3 /*break*/, 3];
                        this.userService.setUser(gLoginRes.additionalUserInfo.profile);
                        return [4 /*yield*/, this.router.navigate(['/'])];
                    case 2:
                        _a.sent();
                        this.loading = false;
                        return [3 /*break*/, 4];
                    case 3: throw new Error('Can\'t save user credentials.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.doGoogleLogin = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var provider = new firebase_app__WEBPACK_IMPORTED_MODULE_4__["auth"].GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            _this.angularFireAuth.auth
                .signInWithPopup(provider)
                .then(function (res) {
                resolve(res);
            });
        });
    };
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.page.html */ "./src/app/pages/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/pages/login/login.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module.js.map