/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function () {
    module.exports = function templater(template, replacement) {
        //const regex = /{{(\w*(?:\.\w+)*)}}/g;
        const regex = /{{(\w*(?:(?::|\.)(?:\$|\w)+)*)}}/g;
        let m, result = template;
        while ((m = regex.exec(template)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            var repl = m[1].split('.').reduce((obj, property) => obj[property], replacement);
            if (repl) {
                result = result.replace(m[0], repl);
            }
        }
        return result;
    }

})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

window.$ = (selector) => document.querySelectorAll(selector);

Object.assign(NodeList.prototype, {
    addEventListener(event, handler) {
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener(event, handler);
        }
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
var templater = __webpack_require__(0);

$("#submitButton")[0].addEventListener("click", e => {

    fetch(`/api/speakers/${$("#inputName")[0].value}`).then(
        response =>{
            response.json().then(handleResponse);
        }
    )

    e.preventDefault();
});

function handleResponse(result) {
    let resultEl = $('#result')[0],
        speakerTemplate = $('#speakerTemplate')[0].innerHTML;

    resultEl.innerHTML = '';

    for (let i = 0; i < result.length; i++) {
        resultEl.innerHTML = resultEl.innerHTML + templater(speakerTemplate, result[i]);
    }
}


/***/ })
/******/ ]);