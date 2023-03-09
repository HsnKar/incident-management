/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (() => {

window.up = {
    version: '2.7.2'
};


/***/ }),
/* 2 */
/***/ (() => {

up.mockable = function (originalFn) {
    let spy;
    const mockableFn = function () {
        return (spy || originalFn).apply(null, arguments);
    };
    mockableFn.mock = () => spy = jasmine.createSpy('mockable', originalFn);
    document.addEventListener('up:framework:reset', () => spy = null);
    return mockableFn;
};


/***/ }),
/* 3 */
/***/ (() => {

up.util = (function () {
    function noop() {
    }
    function asyncNoop() {
        return Promise.resolve();
    }
    function memoize(func) {
        let cachedValue, cached;
        return function (...args) {
            if (cached) {
                return cachedValue;
            }
            else {
                cached = true;
                return cachedValue = func.apply(this, args);
            }
        };
    }
    function isStandardPort(protocol, port) {
        port = port.toString();
        return (((port === "") || (port === "80")) && (protocol === 'http:')) || ((port === "443") && (protocol === 'https:'));
    }
    const NORMALIZE_URL_DEFAULTS = {
        host: 'cross-domain',
    };
    function normalizeURL(urlOrAnchor, options) {
        options = newOptions(options, NORMALIZE_URL_DEFAULTS);
        const parts = parseURL(urlOrAnchor);
        let normalized = '';
        if (options.host === 'cross-domain') {
            options.host = isCrossOrigin(parts);
        }
        if (options.host) {
            normalized += parts.protocol + "//" + parts.hostname;
            if (!isStandardPort(parts.protocol, parts.port)) {
                normalized += `:${parts.port}`;
            }
        }
        let { pathname } = parts;
        if (options.trailingSlash === false && pathname !== '/') {
            pathname = pathname.replace(/\/$/, '');
        }
        normalized += pathname;
        if (options.search !== false) {
            normalized += parts.search;
        }
        if (options.hash !== false) {
            normalized += parts.hash;
        }
        return normalized;
    }
    function matchURLs(leftURL, rightURL) {
        return normalizeURL(leftURL) === normalizeURL(rightURL);
    }
    const APP_PROTOCOL = location.protocol;
    const APP_HOSTNAME = location.hostname;
    function isCrossOrigin(urlOrAnchor) {
        if (isString(urlOrAnchor) && (urlOrAnchor.indexOf('//') === -1)) {
            return false;
        }
        const parts = parseURL(urlOrAnchor);
        return (APP_HOSTNAME !== parts.hostname) || (APP_PROTOCOL !== parts.protocol);
    }
    function parseURL(urlOrLink) {
        let link;
        if (isJQuery(urlOrLink)) {
            link = up.element.get(urlOrLink);
        }
        else if (urlOrLink.pathname) {
            link = urlOrLink;
        }
        else {
            link = document.createElement('a');
            link.href = urlOrLink;
        }
        if (!link.hostname) {
            link.href = link.href;
        }
        if (link.pathname[0] !== '/') {
            link = pick(link, ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash']);
            link.pathname = '/' + link.pathname;
        }
        return link;
    }
    function normalizeMethod(method) {
        return method ? method.toUpperCase() : 'GET';
    }
    function methodAllowsPayload(method) {
        return (method !== 'GET') && (method !== 'HEAD');
    }
    function assignPolyfill(target, ...sources) {
        for (let source of sources) {
            for (let key in source) {
                target[key] = source[key];
            }
        }
        return target;
    }
    const assign = Object.assign || assignPolyfill;
    function valuesPolyfill(object) {
        return Object.keys(object).map((key) => object[key]);
    }
    const objectValues = Object.values || valuesPolyfill;
    function iteratee(block) {
        if (isString(block)) {
            return item => item[block];
        }
        else {
            return block;
        }
    }
    function map(array, block) {
        if (array.length === 0) {
            return [];
        }
        block = iteratee(block);
        let mapped = [];
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            mapped.push(block(element, i));
        }
        return mapped;
    }
    function mapObject(array, pairer) {
        const merger = function (object, pair) {
            object[pair[0]] = pair[1];
            return object;
        };
        return map(array, pairer).reduce(merger, {});
    }
    function each(array, block) {
        for (let i = 0; i < array.length; i++) {
            block(array[i], i);
        }
    }
    function eachIterator(iterator, callback) {
        let entry;
        while ((entry = iterator.next()) && !entry.done) {
            callback(entry.value);
        }
    }
    function isNull(object) {
        return object === null;
    }
    function isUndefined(object) {
        return object === undefined;
    }
    const isDefined = negate(isUndefined);
    function isMissing(object) {
        return isUndefined(object) || isNull(object);
    }
    const isGiven = negate(isMissing);
    function isBlank(value) {
        if (isMissing(value)) {
            return true;
        }
        if (isObject(value) && value[isBlank.key]) {
            return value[isBlank.key]();
        }
        if (isString(value) || isList(value)) {
            return value.length === 0;
        }
        if (isOptions(value)) {
            return Object.keys(value).length === 0;
        }
        return false;
    }
    isBlank.key = 'up.util.isBlank';
    function presence(value, tester = isPresent) {
        if (tester(value)) {
            return value;
        }
    }
    const isPresent = negate(isBlank);
    function isFunction(object) {
        return typeof (object) === 'function';
    }
    function isString(object) {
        return (typeof (object) === 'string') || object instanceof String;
    }
    function isBoolean(object) {
        return (typeof (object) === 'boolean') || object instanceof Boolean;
    }
    function isNumber(object) {
        return (typeof (object) === 'number') || object instanceof Number;
    }
    function isOptions(object) {
        return (typeof (object) === 'object') && !isNull(object) && (isUndefined(object.constructor) || (object.constructor === Object));
    }
    function isObject(object) {
        const typeOfResult = typeof (object);
        return ((typeOfResult === 'object') && !isNull(object)) || (typeOfResult === 'function');
    }
    function isElement(object) {
        return object instanceof Element;
    }
    function isRegExp(object) {
        return object instanceof RegExp;
    }
    function isJQuery(object) {
        return up.browser.canJQuery() && object instanceof jQuery;
    }
    function isElementish(object) {
        return !!(object && (object.addEventListener || object[0]?.addEventListener));
    }
    function isPromise(object) {
        return isObject(object) && isFunction(object.then);
    }
    const { isArray } = Array;
    function isFormData(object) {
        return object instanceof FormData;
    }
    function toArray(value) {
        return isArray(value) ? value : copyArrayLike(value);
    }
    function isList(value) {
        return isArray(value) ||
            isNodeList(value) ||
            isArguments(value) ||
            isJQuery(value) ||
            isHTMLCollection(value);
    }
    function isNodeList(value) {
        return value instanceof NodeList;
    }
    function isHTMLCollection(value) {
        return value instanceof HTMLCollection;
    }
    function isArguments(value) {
        return Object.prototype.toString.call(value) === '[object Arguments]';
    }
    function nullToUndefined(value) {
        if (!isNull(value)) {
            return value;
        }
    }
    function wrapList(value) {
        if (isList(value)) {
            return value;
        }
        else if (isMissing(value)) {
            return [];
        }
        else {
            return [value];
        }
    }
    function copy(value) {
        if (isObject(value) && value[copy.key]) {
            value = value[copy.key]();
        }
        else if (isList(value)) {
            value = copyArrayLike(value);
        }
        else if (isOptions(value)) {
            value = assign({}, value);
        }
        return value;
    }
    function copyArrayLike(arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    }
    copy.key = 'up.util.copy';
    Date.prototype[copy.key] = function () { return new Date(+this); };
    function merge(...sources) {
        return assign({}, ...sources);
    }
    function mergeDefined(...sources) {
        const result = {};
        for (let source of sources) {
            if (source) {
                for (let key in source) {
                    const value = source[key];
                    if (isDefined(value)) {
                        result[key] = value;
                    }
                }
            }
        }
        return result;
    }
    function newOptions(object, defaults) {
        if (defaults) {
            return merge(defaults, object);
        }
        else if (object) {
            return copy(object);
        }
        else {
            return {};
        }
    }
    function parseArgIntoOptions(args, argKey) {
        let options = extractOptions(args);
        if (isDefined(args[0])) {
            options = copy(options);
            options[argKey] = args[0];
        }
        return options;
    }
    function findInList(list, tester) {
        tester = iteratee(tester);
        let match;
        for (let element of list) {
            if (tester(element)) {
                match = element;
                break;
            }
        }
        return match;
    }
    function some(list, tester) {
        return !!findResult(list, tester);
    }
    function findResult(array, tester) {
        tester = iteratee(tester);
        for (let i = 0; i < array.length; i++) {
            const result = tester(array[i], i);
            if (result) {
                return result;
            }
        }
    }
    function every(list, tester) {
        tester = iteratee(tester);
        let match = true;
        for (let i = 0; i < list.length; i++) {
            if (!tester(list[i], i)) {
                match = false;
                break;
            }
        }
        return match;
    }
    function compact(array) {
        return filterList(array, isGiven);
    }
    function compactObject(object) {
        return pickBy(object, isGiven);
    }
    function uniq(array) {
        if (array.length < 2) {
            return array;
        }
        return setToArray(arrayToSet(array));
    }
    function uniqBy(array, mapper) {
        if (array.length < 2) {
            return array;
        }
        mapper = iteratee(mapper);
        const seenElements = new Set();
        return filterList(array, function (elem, index) {
            const mapped = mapper(elem, index);
            if (seenElements.has(mapped)) {
                return false;
            }
            else {
                seenElements.add(mapped);
                return true;
            }
        });
    }
    function setToArray(set) {
        const array = [];
        set.forEach(elem => array.push(elem));
        return array;
    }
    function arrayToSet(array) {
        const set = new Set();
        array.forEach(elem => set.add(elem));
        return set;
    }
    function filterList(list, tester) {
        tester = iteratee(tester);
        const matches = [];
        each(list, function (element, index) {
            if (tester(element, index)) {
                return matches.push(element);
            }
        });
        return matches;
    }
    function reject(list, tester) {
        tester = negate(iteratee(tester));
        return filterList(list, tester);
    }
    function intersect(array1, array2) {
        return filterList(array1, element => contains(array2, element));
    }
    function scheduleTimer(millis, callback) {
        return setTimeout(callback, millis);
    }
    function queueTask(task) {
        return setTimeout(task);
    }
    function queueMicrotask(task) {
        return Promise.resolve().then(task);
    }
    function abortableMicrotask(task) {
        let aborted = false;
        queueMicrotask(function () { if (!aborted) {
            return task();
        } });
        return () => aborted = true;
    }
    function last(array) {
        return array[array.length - 1];
    }
    function contains(value, subValue) {
        return value.indexOf(subValue) >= 0;
    }
    function objectContains(object, subObject) {
        const reducedValue = pick(object, Object.keys(subObject));
        return isEqual(subObject, reducedValue);
    }
    function pick(object, keys) {
        const filtered = {};
        for (let key of keys) {
            if (key in object) {
                filtered[key] = object[key];
            }
        }
        return filtered;
    }
    function pickBy(object, tester) {
        tester = iteratee(tester);
        const filtered = {};
        for (let key in object) {
            const value = object[key];
            if (tester(value, key, object)) {
                filtered[key] = object[key];
            }
        }
        return filtered;
    }
    function omit(object, keys) {
        return pickBy(object, (_value, key) => !contains(keys, key));
    }
    function unresolvablePromise() {
        return new Promise(noop);
    }
    function remove(array, element) {
        const index = array.indexOf(element);
        if (index >= 0) {
            array.splice(index, 1);
            return element;
        }
    }
    function evalOption(value, ...args) {
        return isFunction(value) ? value(...args) : value;
    }
    const ESCAPE_HTML_ENTITY_MAP = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#x27;'
    };
    function escapeHTML(string) {
        return string.replace(/[&<>"']/g, char => ESCAPE_HTML_ENTITY_MAP[char]);
    }
    function escapeRegExp(string) {
        return string.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    function pluckKey(object, key) {
        const value = object[key];
        delete object[key];
        return value;
    }
    function renameKey(object, oldKey, newKey) {
        return object[newKey] = pluckKey(object, oldKey);
    }
    function extractLastArg(args, tester) {
        if (tester(last(args))) {
            return args.pop();
        }
    }
    function extractCallback(args) {
        return extractLastArg(args, isFunction);
    }
    function extractOptions(args) {
        return extractLastArg(args, isOptions) || {};
    }
    function identity(arg) {
        return arg;
    }
    function sequence(functions) {
        if (functions.length === 1) {
            return functions[0];
        }
        return () => map(functions, fn => fn());
    }
    function flatten(array) {
        const flattened = [];
        for (let object of array) {
            if (isList(object)) {
                flattened.push(...object);
            }
            else {
                flattened.push(object);
            }
        }
        return flattened;
    }
    function flatMap(array, block) {
        return flatten(map(array, block));
    }
    function isTruthy(object) {
        return !!object;
    }
    function always(promise, callback) {
        return promise.then(callback, callback);
    }
    function muteRejection(promise) {
        return promise?.catch(noop);
    }
    function newDeferred() {
        let resolveFn;
        let rejectFn;
        const nativePromise = new Promise(function (givenResolve, givenReject) {
            resolveFn = givenResolve;
            rejectFn = givenReject;
        });
        nativePromise.resolve = resolveFn;
        nativePromise.reject = rejectFn;
        nativePromise.promise = () => nativePromise;
        return nativePromise;
    }
    function asyncify(block) {
        try {
            return Promise.resolve(block());
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    function isBasicObjectProperty(k) {
        return Object.prototype.hasOwnProperty(k);
    }
    function isEqual(a, b) {
        if (a?.valueOf) {
            a = a.valueOf();
        }
        if (b?.valueOf) {
            b = b.valueOf();
        }
        if (typeof (a) !== typeof (b)) {
            return false;
        }
        else if (isList(a) && isList(b)) {
            return isEqualList(a, b);
        }
        else if (isObject(a) && a[isEqual.key]) {
            return a[isEqual.key](b);
        }
        else if (isOptions(a) && isOptions(b)) {
            const aKeys = Object.keys(a);
            const bKeys = Object.keys(b);
            if (isEqualList(aKeys, bKeys)) {
                return every(aKeys, aKey => isEqual(a[aKey], b[aKey]));
            }
            else {
                return false;
            }
        }
        else {
            return a === b;
        }
    }
    isEqual.key = 'up.util.isEqual';
    function isEqualList(a, b) {
        return (a.length === b.length) && every(a, (elem, index) => isEqual(elem, b[index]));
    }
    function splitValues(value, separator = ' ') {
        if (isString(value)) {
            value = value.split(separator);
            value = map(value, v => v.trim());
            value = filterList(value, isPresent);
            return value;
        }
        else {
            return wrapList(value);
        }
    }
    function endsWith(string, search) {
        return string.substring(string.length - search.length) === search;
    }
    function simpleEase(x) {
        return x < 0.5 ? 2 * x * x : (x * (4 - (x * 2))) - 1;
    }
    function wrapValue(constructor, ...args) {
        return (args[0] instanceof constructor) ? args[0] : new constructor(...args);
    }
    let nextUid = 0;
    function uid() {
        return nextUid++;
    }
    function reverse(list) {
        return copy(list).reverse();
    }
    function renameKeys(object, renameKeyFn) {
        const renamed = {};
        for (let key in object) {
            renamed[renameKeyFn(key)] = object[key];
        }
        return renamed;
    }
    function camelToKebabCase(str) {
        return str.replace(/[A-Z]/g, char => '-' + char.toLowerCase());
    }
    function prefixCamelCase(str, prefix) {
        return prefix + upperCaseFirst(str);
    }
    function unprefixCamelCase(str, prefix) {
        const pattern = new RegExp('^' + prefix + '(.+)$');
        let match = str.match(pattern);
        if (match) {
            return lowerCaseFirst(match[1]);
        }
    }
    function lowerCaseFirst(str) {
        return str[0].toLowerCase() + str.slice(1);
    }
    function upperCaseFirst(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    function defineGetter(object, prop, get) {
        Object.defineProperty(object, prop, { get });
    }
    function defineDelegates(object, props, targetProvider) {
        wrapList(props).forEach(function (prop) {
            Object.defineProperty(object, prop, {
                get() {
                    const target = targetProvider.call(this);
                    let value = target[prop];
                    if (isFunction(value)) {
                        value = value.bind(target);
                    }
                    return value;
                },
                set(newValue) {
                    const target = targetProvider.call(this);
                    target[prop] = newValue;
                }
            });
        });
    }
    function stringifyArg(arg) {
        let string;
        const maxLength = 200;
        let closer = '';
        if (isString(arg)) {
            string = arg.replace(/[\n\r\t ]+/g, ' ');
            string = string.replace(/^[\n\r\t ]+/, '');
            string = string.replace(/[\n\r\t ]$/, '');
        }
        else if (isUndefined(arg)) {
            string = 'undefined';
        }
        else if (isNumber(arg) || isFunction(arg)) {
            string = arg.toString();
        }
        else if (isArray(arg)) {
            string = `[${map(arg, stringifyArg).join(', ')}]`;
            closer = ']';
        }
        else if (isJQuery(arg)) {
            string = `$(${map(arg, stringifyArg).join(', ')})`;
            closer = ')';
        }
        else if (isElement(arg)) {
            string = `<${arg.tagName.toLowerCase()}`;
            for (let attr of ['id', 'name', 'class']) {
                let value = arg.getAttribute(attr);
                if (value) {
                    string += ` ${attr}="${value}"`;
                }
            }
            string += ">";
            closer = '>';
        }
        else if (isRegExp(arg)) {
            string = arg.toString();
        }
        else {
            try {
                string = JSON.stringify(arg);
            }
            catch (error) {
                if (error.name === 'TypeError') {
                    string = '(circular structure)';
                }
                else {
                    throw error;
                }
            }
        }
        if (string.length > maxLength) {
            string = `${string.substr(0, maxLength)} …`;
            string += closer;
        }
        return string;
    }
    const SPRINTF_PLACEHOLDERS = /%[oOdisf]/g;
    function secondsSinceEpoch() {
        return Math.floor(Date.now() * 0.001);
    }
    function sprintf(message, ...args) {
        return sprintfWithFormattedArgs(identity, message, ...args);
    }
    function sprintfWithFormattedArgs(formatter, message, ...args) {
        if (!message) {
            return '';
        }
        let i = 0;
        return message.replace(SPRINTF_PLACEHOLDERS, function () {
            let arg = args[i];
            arg = formatter(stringifyArg(arg));
            i += 1;
            return arg;
        });
    }
    function allSettled(promises) {
        return Promise.all(map(promises, muteRejection));
    }
    function negate(fn) {
        return function (...args) {
            return !fn(...args);
        };
    }
    return {
        parseURL,
        normalizeURL,
        matchURLs,
        normalizeMethod,
        methodAllowsPayload,
        assign,
        assignPolyfill,
        copy,
        copyArrayLike,
        merge,
        mergeDefined,
        options: newOptions,
        parseArgIntoOptions,
        each,
        eachIterator,
        map,
        flatMap,
        mapObject,
        findResult,
        some,
        every,
        find: findInList,
        filter: filterList,
        reject,
        intersect,
        compact,
        compactObject,
        uniq,
        uniqBy,
        last,
        isNull,
        isDefined,
        isUndefined,
        isGiven,
        isMissing,
        isPresent,
        isBlank,
        presence,
        isObject,
        isFunction,
        isString,
        isBoolean,
        isNumber,
        isElement,
        isJQuery,
        isElementish,
        isPromise,
        isOptions,
        isArray,
        isFormData,
        isNodeList,
        isArguments,
        isList,
        isRegExp,
        timer: scheduleTimer,
        contains,
        objectContains,
        toArray,
        pick,
        pickBy,
        omit,
        unresolvablePromise,
        remove,
        memoize,
        pluckKey,
        renameKey,
        extractOptions,
        extractCallback,
        noop,
        asyncNoop,
        identity,
        escapeHTML,
        escapeRegExp,
        sequence,
        evalOption,
        flatten,
        isTruthy,
        newDeferred,
        always,
        muteRejection,
        asyncify,
        isBasicObjectProperty,
        isCrossOrigin,
        task: queueTask,
        microtask: queueMicrotask,
        abortableMicrotask,
        isEqual,
        splitValues,
        endsWith,
        wrapList,
        wrapValue,
        simpleEase,
        values: objectValues,
        arrayToSet,
        setToArray,
        uid,
        upperCaseFirst,
        lowerCaseFirst,
        getter: defineGetter,
        delegate: defineDelegates,
        reverse,
        prefixCamelCase,
        unprefixCamelCase,
        camelToKebabCase,
        nullToUndefined,
        sprintf,
        sprintfWithFormattedArgs,
        renameKeys,
        timestamp: secondsSinceEpoch,
        allSettled,
        negate,
    };
})();


/***/ }),
/* 4 */
/***/ (() => {

up.error = (function () {
    const u = up.util;
    function build(message, props = {}) {
        if (u.isArray(message)) {
            message = u.sprintf(...message);
        }
        const error = new Error(message);
        u.assign(error, props);
        return error;
    }
    function errorInterface(name, init = build) {
        const fn = function (...args) {
            const error = init(...args);
            error.name = name;
            return error;
        };
        fn.is = error => error.name === name;
        fn.async = (...args) => Promise.reject(fn(...args));
        return fn;
    }
    const failed = errorInterface('up.Failed');
    const aborted = errorInterface('AbortError', (message) => {
        return build(message || 'Aborted');
    });
    const notImplemented = errorInterface('up.NotImplemented');
    const notApplicable = errorInterface('up.NotApplicable', (change, reason) => {
        return build(`Cannot apply change: ${change} (${reason})`);
    });
    const invalidSelector = errorInterface('up.InvalidSelector', (selector) => {
        return build(`Cannot parse selector: ${selector}`);
    });
    function emitGlobal(error) {
        const { message } = error;
        up.emit(window, 'error', { message, error, log: false });
    }
    function fail(...args) {
        throw up.error.failed(args);
    }
    return {
        fail,
        failed,
        aborted,
        invalidSelector,
        notApplicable,
        notImplemented,
        emitGlobal
    };
})();
up.fail = up.error.fail;


/***/ }),
/* 5 */
/***/ (() => {

up.migrate = { config: {} };


/***/ }),
/* 6 */
/***/ (() => {

up.browser = (function () {
    const u = up.util;
    function submitForm(form) {
        form.submit();
    }
    function isIE11() {
        return 'ActiveXObject' in window;
    }
    function isEdge18() {
        return u.contains(navigator.userAgent, ' Edge/');
    }
    function canPushState() {
        return history.pushState && up.protocol.initialRequestMethod() === 'GET';
    }
    function canPromise() {
        return !!window.Promise;
    }
    const canFormatLog = u.negate(isIE11);
    const canPassiveEventListener = u.negate(isIE11);
    function canJQuery() {
        return !!window.jQuery;
    }
    const canEval = u.memoize(function () {
        try {
            return new Function('return true')();
        }
        catch {
            return false;
        }
    });
    function popCookie(name) {
        let value = document.cookie.match(new RegExp(name + "=(\\w+)"))?.[1];
        if (value) {
            document.cookie = name + '=;Max-Age=0;Path=/';
            return value;
        }
    }
    const getJQuery = function () {
        if (!canJQuery()) {
            up.fail('jQuery must be published as window.jQuery');
        }
        return jQuery;
    };
    function assertConfirmed(options) {
        const confirmed = !options.confirm || window.confirm(options.confirm);
        if (!confirmed) {
            throw up.error.aborted('User canceled action');
        }
        return true;
    }
    return {
        submitForm,
        canPushState,
        canFormatLog,
        canPassiveEventListener,
        canJQuery,
        canPromise,
        canEval,
        assertConfirmed,
        popCookie,
        get jQuery() { return getJQuery(); },
        isIE11,
        isEdge18,
    };
})();


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(8);
up.element = (function () {
    const u = up.util;
    const MATCH_FN_NAME = up.browser.isIE11() ? 'msMatchesSelector' : 'matches';
    function first(...args) {
        const selector = args.pop();
        const root = args[0] || document;
        return root.querySelector(selector);
    }
    function all(...args) {
        const selector = args.pop();
        const root = args[0] || document;
        return root.querySelectorAll(selector);
    }
    function subtree(root, selector) {
        const results = [];
        if (matches(root, selector)) {
            results.push(root);
        }
        results.push(...all(root, selector));
        return results;
    }
    function isInSubtree(root, selectorOrElement) {
        const element = getOne(selectorOrElement);
        return root.contains(element);
    }
    function closest(element, selector) {
        if (element.closest) {
            return element.closest(selector);
        }
        else if (matches(element, selector)) {
            return element;
        }
        else {
            return ancestor(element, selector);
        }
    }
    function matches(element, selector) {
        return element[MATCH_FN_NAME]?.(selector);
    }
    function ancestor(element, selector) {
        let parentElement = element.parentElement;
        if (parentElement) {
            if (matches(parentElement, selector)) {
                return parentElement;
            }
            else {
                return ancestor(parentElement, selector);
            }
        }
    }
    function around(element, selector) {
        return getList(closest(element, selector), subtree(element, selector));
    }
    function getOne(...args) {
        const value = args.pop();
        if (u.isElement(value)) {
            return value;
        }
        else if (u.isString(value)) {
            return first(...args, value);
        }
        else if (u.isList(value)) {
            if (value.length > 1) {
                up.fail('up.element.get(): Cannot cast multiple elements (%o) to a single element', value);
            }
            return value[0];
        }
        else {
            return value;
        }
    }
    function getList(...args) {
        return u.flatMap(args, valueToList);
    }
    function valueToList(value) {
        if (u.isString(value)) {
            return all(value);
        }
        else {
            return u.wrapList(value);
        }
    }
    function remove(element) {
        let parent = element.parentNode;
        if (parent) {
            parent.removeChild(element);
        }
    }
    function hide(element) {
        element.setAttribute('hidden', '');
    }
    function show(element) {
        element.removeAttribute('hidden');
        if (element.style.display === 'none') {
            element.style.display = '';
        }
    }
    function toggle(element, newVisible) {
        if (newVisible == null) {
            newVisible = !isVisible(element);
        }
        (newVisible ? show : hide)(element);
    }
    function toggleClass(element, klass, newPresent) {
        const list = element.classList;
        if (newPresent == null) {
            newPresent = !list.contains(klass);
        }
        if (newPresent) {
            return list.add(klass);
        }
        else {
            return list.remove(klass);
        }
    }
    function toggleAttr(element, attr, value, newPresent) {
        if (newPresent == null) {
            newPresent = !element.hasAttribute(attr);
        }
        if (newPresent) {
            return element.setAttribute(attr, value);
        }
        else {
            return element.removeAttribute(attr);
        }
    }
    function setAttrs(element, attrs) {
        for (let key in attrs) {
            const value = attrs[key];
            if (u.isGiven(value)) {
                element.setAttribute(key, value);
            }
            else {
                element.removeAttribute(key);
            }
        }
    }
    function setTemporaryAttrs(element, attrs) {
        const oldAttrs = {};
        for (let key of Object.keys(attrs)) {
            oldAttrs[key] = element.getAttribute(key);
        }
        setAttrs(element, attrs);
        return () => setAttrs(element, oldAttrs);
    }
    function metaContent(name) {
        const selector = "meta" + attributeSelector('name', name);
        return first(selector)?.getAttribute('content');
    }
    function insertBefore(existingElement, newElement) {
        existingElement.insertAdjacentElement('beforebegin', newElement);
    }
    function replace(oldElement, newElement) {
        oldElement.parentElement.replaceChild(newElement, oldElement);
    }
    function createFromSelector(selector, attrs) {
        const attrValues = [];
        const selectorWithoutAttrValues = selector.replace(/\[([\w-]+)(?:[~|^$*]?=(["'])?([^\2\]]*?)\2)?\]/g, function (_match, attrName, _quote, attrValue) {
            attrValues.push(attrValue || '');
            return `[${attrName}]`;
        });
        const depths = selectorWithoutAttrValues.split(/[ >]+/);
        let rootElement;
        let depthElement;
        let previousElement;
        for (let depthSelector of depths) {
            let tagName;
            depthSelector = depthSelector.replace(/^[\w-]+/, function (match) {
                tagName = match;
                return '';
            });
            depthElement = document.createElement(tagName || 'div');
            if (!rootElement) {
                rootElement = depthElement;
            }
            depthSelector = depthSelector.replace(/#([\w-]+)/, function (_match, id) {
                depthElement.id = id;
                return '';
            });
            depthSelector = depthSelector.replace(/\.([\w-]+)/g, function (_match, className) {
                depthElement.classList.add(className);
                return '';
            });
            if (attrValues.length) {
                depthSelector = depthSelector.replace(/\[([\w-]+)\]/g, function (_match, attrName) {
                    depthElement.setAttribute(attrName, attrValues.shift());
                    return '';
                });
            }
            if (depthSelector !== '') {
                throw up.error.invalidSelector(selector);
            }
            previousElement?.appendChild(depthElement);
            previousElement = depthElement;
        }
        if (attrs) {
            let value;
            if (value = u.pluckKey(attrs, 'class')) {
                for (let klass of u.wrapList(value)) {
                    rootElement.classList.add(klass);
                }
            }
            if (value = u.pluckKey(attrs, 'style')) {
                setInlineStyle(rootElement, value);
            }
            if (value = u.pluckKey(attrs, 'text')) {
                rootElement.textContent = value;
            }
            if (value = u.pluckKey(attrs, 'content')) {
                rootElement.innerHTML = value;
            }
            setAttrs(rootElement, attrs);
        }
        return rootElement;
    }
    function affix(parent, ...args) {
        let position, selector;
        const attributes = u.extractOptions(args);
        if (args.length === 2) {
            [position, selector] = args;
        }
        else {
            position = 'beforeend';
            selector = args[0];
        }
        const element = createFromSelector(selector, attributes);
        parent.insertAdjacentElement(position, element);
        return element;
    }
    function toSelector(...args) {
        return up.fragment.toTarget(...args);
    }
    const SINGLETON_TAG_NAMES = ['HTML', 'BODY', 'HEAD', 'TITLE'];
    const SINGLETON_PATTERN = new RegExp('\\b(' + SINGLETON_TAG_NAMES.join('|') + ')\\b', 'i');
    const isSingleton = up.mockable(element => matches(element, SINGLETON_TAG_NAMES.join(',')));
    function isSingletonSelector(selector) {
        return SINGLETON_PATTERN.test(selector);
    }
    function elementTagName(element) {
        return element.tagName.toLowerCase();
    }
    function attributeSelector(attribute, value) {
        value = value.replace(/"/g, '\\"');
        return `[${attribute}="${value}"]`;
    }
    function trueAttributeSelector(attribute) {
        return `[${attribute}]:not([${attribute}=false])`;
    }
    function idSelector(id) {
        if (id.match(/^[a-z0-9\-_]+$/i)) {
            return `#${id}`;
        }
        else {
            return attributeSelector('id', id);
        }
    }
    function classSelector(klass) {
        klass = klass.replace(/:/g, '\\:');
        return `.${klass}`;
    }
    function createDocumentFromHTML(html) {
        return new DOMParser().parseFromString(html, 'text/html');
    }
    function createFromHTML(html) {
        const range = document.createRange();
        range.setStart(document.body, 0);
        const fragment = range.createContextualFragment(html.trim());
        let elements = fragment.childNodes;
        if (elements.length !== 1) {
            throw new Error('HTML must have a single root element');
        }
        return elements[0];
    }
    function getRoot() {
        return document.documentElement;
    }
    function paint(element) {
        element.offsetHeight;
    }
    function concludeCSSTransition(element) {
        const undo = setTemporaryStyle(element, { transition: 'none' });
        paint(element);
        return undo;
    }
    function hasCSSTransition(elementOrStyleHash) {
        let styleHash;
        if (u.isOptions(elementOrStyleHash)) {
            styleHash = elementOrStyleHash;
        }
        else {
            styleHash = computedStyle(elementOrStyleHash);
        }
        const prop = styleHash.transitionProperty;
        const duration = styleHash.transitionDuration;
        const noTransition = ((prop === 'none') || ((prop === 'all') && (duration === 0)));
        return !noTransition;
    }
    function fixedToAbsolute(element) {
        const elementRectAsFixed = element.getBoundingClientRect();
        element.style.position = 'absolute';
        const offsetParentRect = element.offsetParent.getBoundingClientRect();
        setInlineStyle(element, {
            left: elementRectAsFixed.left - computedStyleNumber(element, 'margin-left') - offsetParentRect.left,
            top: elementRectAsFixed.top - computedStyleNumber(element, 'margin-top') - offsetParentRect.top,
            right: '',
            bottom: ''
        });
    }
    function setMissingAttrs(element, attrs) {
        for (let key in attrs) {
            setMissingAttr(element, key, attrs[key]);
        }
    }
    function setMissingAttr(element, key, value) {
        if (u.isMissing(element.getAttribute(key))) {
            element.setAttribute(key, value);
        }
    }
    function unwrap(wrapper) {
        const parent = wrapper.parentNode;
        const wrappedNodes = u.toArray(wrapper.childNodes);
        u.each(wrappedNodes, wrappedNode => parent.insertBefore(wrappedNode, wrapper));
        parent.removeChild(wrapper);
    }
    function wrapChildren(element, wrapperSelector = 'up-wrapper') {
        let childNode;
        const wrapper = createFromSelector(wrapperSelector);
        while ((childNode = element.firstChild)) {
            wrapper.appendChild(childNode);
        }
        element.appendChild(wrapper);
        return wrapper;
    }
    function stringAttr(element, attribute) {
        return u.nullToUndefined(element.getAttribute(attribute));
    }
    function booleanAttr(element, attribute, pass) {
        const value = stringAttr(element, attribute);
        switch (value) {
            case 'false': {
                return false;
            }
            case 'true':
            case '':
            case attribute: {
                return true;
            }
            default: {
                if (pass) {
                    return value;
                }
            }
        }
    }
    function booleanOrStringAttr(element, attribute) {
        return booleanAttr(element, attribute, true);
    }
    function numberAttr(element, attribute) {
        let value = element.getAttribute(attribute);
        if (value) {
            value = value.replace(/_/g, '');
            if (value.match(/^[\d.]+$/)) {
                return parseFloat(value);
            }
        }
    }
    function jsonAttr(element, attribute) {
        let json = element.getAttribute?.(attribute)?.trim();
        if (json) {
            return JSON.parse(json);
        }
    }
    function callbackAttr(link, attr, exposedKeys = []) {
        let code = link.getAttribute(attr);
        if (code) {
            const callback = up.NonceableCallback.fromString(code).toFunction('event', ...exposedKeys);
            return function (event) {
                const exposedValues = u.values(u.pick(event, exposedKeys));
                return callback.call(link, event, ...exposedValues);
            };
        }
    }
    function closestAttr(element, attr) {
        return closest(element, '[' + attr + ']')?.getAttribute(attr);
    }
    function setTemporaryStyle(element, newStyles) {
        const oldStyles = inlineStyle(element, Object.keys(newStyles));
        setInlineStyle(element, newStyles);
        return () => setInlineStyle(element, oldStyles);
    }
    function computedStyle(element, props) {
        const style = window.getComputedStyle(element);
        return extractFromStyleObject(style, props);
    }
    function computedStyleNumber(element, prop) {
        const rawValue = computedStyle(element, prop);
        if (u.isGiven(rawValue)) {
            return parseFloat(rawValue);
        }
    }
    function inlineStyle(element, props) {
        const { style } = element;
        return extractFromStyleObject(style, props);
    }
    function extractFromStyleObject(style, keyOrKeys) {
        if (u.isString(keyOrKeys)) {
            return style[keyOrKeys];
        }
        else {
            return u.pick(style, keyOrKeys);
        }
    }
    function setInlineStyle(element, props) {
        if (u.isString(props)) {
            element.setAttribute('style', props);
        }
        else {
            const { style } = element;
            for (let key in props) {
                let value = props[key];
                value = normalizeStyleValueForWrite(key, value);
                style[key] = value;
            }
        }
    }
    function normalizeStyleValueForWrite(key, value) {
        if (u.isMissing(value)) {
            value = '';
        }
        else if (CSS_LENGTH_PROPS.has(key.toLowerCase().replace(/-/, ''))) {
            value = cssLength(value);
        }
        return value;
    }
    const CSS_LENGTH_PROPS = u.arrayToSet([
        'top', 'right', 'bottom', 'left',
        'padding', 'paddingtop', 'paddingright', 'paddingbottom', 'paddingleft',
        'margin', 'margintop', 'marginright', 'marginbottom', 'marginleft',
        'borderwidth', 'bordertopwidth', 'borderrightwidth', 'borderbottomwidth', 'borderleftwidth',
        'width', 'height',
        'maxwidth', 'maxheight',
        'minwidth', 'minheight',
    ]);
    function cssLength(obj) {
        if (u.isNumber(obj) || (u.isString(obj) && /^\d+$/.test(obj))) {
            return obj.toString() + "px";
        }
        else {
            return obj;
        }
    }
    function isVisible(element) {
        return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    }
    function upAttrs(element) {
        const upAttributePattern = /^up-/;
        const attrs = {};
        for (let attribute of element.attributes) {
            const { name } = attribute;
            if (name.match(upAttributePattern)) {
                attrs[name] = attribute.value;
            }
        }
        return attrs;
    }
    function isDetached(element) {
        return (element !== document) && !getRoot().contains(element);
    }
    return {
        all,
        subtree,
        isInSubtree,
        closest,
        closestAttr,
        matches,
        ancestor,
        around,
        get: getOne,
        list: getList,
        remove,
        toggle,
        toggleClass,
        hide,
        show,
        metaContent,
        replace,
        insertBefore,
        createFromSelector,
        setAttrs,
        setTemporaryAttrs,
        affix,
        toSelector,
        idSelector,
        classSelector,
        isSingleton,
        isSingletonSelector,
        attributeSelector,
        trueAttributeSelector,
        tagName: elementTagName,
        createDocumentFromHTML,
        createFromHTML,
        get root() { return getRoot(); },
        paint,
        concludeCSSTransition,
        hasCSSTransition,
        fixedToAbsolute,
        setMissingAttrs,
        setMissingAttr,
        unwrap,
        wrapChildren,
        attr: stringAttr,
        booleanAttr,
        numberAttr,
        jsonAttr,
        callbackAttr,
        booleanOrStringAttr,
        setTemporaryStyle,
        style: computedStyle,
        styleNumber: computedStyleNumber,
        inlineStyle,
        setStyle: setInlineStyle,
        isVisible,
        upAttrs,
        toggleAttr,
        isDetached
    };
})();


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 9 */
/***/ (() => {

const u = up.util;
up.Record = class Record {
    keys() {
        throw 'Return an array of keys';
    }
    defaults(_options) {
        return {};
    }
    constructor(options) {
        u.assign(this, this.defaults(options), this.attributes(options));
    }
    attributes(source = this) {
        return u.pick(source, this.keys());
    }
    [u.copy.key]() {
        return this.variant();
    }
    variant(changes = {}) {
        return new this.constructor(u.merge(this.attributes(), changes));
    }
    [u.isEqual.key](other) {
        return (this.constructor === other.constructor) && u.isEqual(this.attributes(), other.attributes());
    }
};


/***/ }),
/* 10 */
/***/ (() => {

const u = up.util;
up.Config = class Config {
    constructor(blueprintFn = (() => ({}))) {
        this.blueprintFn = blueprintFn;
        this.reset();
    }
    reset() {
        u.assign(this, this.blueprintFn());
    }
};


/***/ }),
/* 11 */
/***/ (() => {

const u = up.util;
up.Cache = class Cache {
    constructor(config = {}) {
        this.config = config;
        this.store = this.config.store || new up.store.Memory();
    }
    size() {
        return this.store.size();
    }
    maxSize() {
        return u.evalOption(this.config.size);
    }
    expiryMillis() {
        return u.evalOption(this.config.expiry);
    }
    normalizeStoreKey(key) {
        if (this.config.key) {
            return this.config.key(key);
        }
        else {
            return key.toString();
        }
    }
    isEnabled() {
        return (this.maxSize() !== 0) && (this.expiryMillis() !== 0);
    }
    clear() {
        this.store.clear();
    }
    keys() {
        return this.store.keys();
    }
    each(fn) {
        u.each(this.keys(), key => {
            const entry = this.store.get(key);
            fn(key, entry.value, entry.timestamp);
        });
    }
    makeRoomForAnotherEntry() {
        if (this.hasRoomForAnotherEntry()) {
            return;
        }
        let oldestKey;
        let oldestTimestamp;
        this.each(function (key, request, timestamp) {
            if (!oldestTimestamp || (oldestTimestamp > timestamp)) {
                oldestKey = key;
                oldestTimestamp = timestamp;
            }
        });
        if (oldestKey) {
            this.store.remove(oldestKey);
        }
    }
    hasRoomForAnotherEntry() {
        const maxSize = this.maxSize();
        return !maxSize || (this.size() < maxSize);
    }
    alias(oldKey, newKey) {
        const value = this.get(oldKey, { silent: true });
        if (u.isDefined(value)) {
            this.set(newKey, value);
        }
    }
    timestamp() {
        return (new Date()).valueOf();
    }
    set(key, value) {
        if (this.isEnabled()) {
            this.makeRoomForAnotherEntry();
            const storeKey = this.normalizeStoreKey(key);
            const entry = {
                timestamp: this.timestamp(),
                value
            };
            this.store.set(storeKey, entry);
        }
    }
    remove(key) {
        const storeKey = this.normalizeStoreKey(key);
        this.store.remove(storeKey);
    }
    isFresh(entry) {
        const millis = this.expiryMillis();
        if (millis) {
            const timeSinceTouch = this.timestamp() - entry.timestamp;
            return timeSinceTouch < millis;
        }
        else {
            return true;
        }
    }
    get(key) {
        const storeKey = this.normalizeStoreKey(key);
        let entry = this.store.get(storeKey);
        if (entry) {
            if (this.isFresh(entry)) {
                return entry.value;
            }
            else {
                this.remove(key);
            }
        }
    }
};


/***/ }),
/* 12 */
/***/ (() => {

up.Rect = class Rect extends up.Record {
    keys() {
        return [
            'left',
            'top',
            'width',
            'height'
        ];
    }
    get bottom() {
        return this.top + this.height;
    }
    get right() {
        return this.left + this.width;
    }
    static fromElement(element) {
        return new (this)(element.getBoundingClientRect());
    }
};


/***/ }),
/* 13 */
/***/ (() => {

const e = up.element;
up.BodyShifter = class BodyShifter {
    constructor() {
        this.unshiftFns = [];
        this.reset();
    }
    reset() {
        this.unshiftNow();
        this.shiftCount = 0;
    }
    shift() {
        this.shiftCount++;
        if (this.shiftCount > 1) {
            return;
        }
        const scrollbarTookSpace = up.viewport.rootHasReducedWidthFromScrollbar();
        const overflowElement = up.viewport.rootOverflowElement();
        this.changeStyle(overflowElement, { overflowY: 'hidden' });
        if (!scrollbarTookSpace) {
            return;
        }
        const { body } = document;
        const scrollbarWidth = up.viewport.scrollbarWidth();
        const bodyRightPadding = e.styleNumber(body, 'paddingRight');
        const bodyRightShift = scrollbarWidth + bodyRightPadding;
        this.changeStyle(body, { paddingRight: bodyRightShift });
        for (let anchor of up.viewport.anchoredRight()) {
            const elementRight = e.styleNumber(anchor, 'right');
            const elementRightShift = scrollbarWidth + elementRight;
            this.changeStyle(anchor, { right: elementRightShift });
        }
    }
    changeStyle(element, styles) {
        this.unshiftFns.push(e.setTemporaryStyle(element, styles));
    }
    unshift() {
        this.shiftCount--;
        if (this.shiftCount == 0) {
            this.unshiftNow();
        }
    }
    unshiftNow() {
        let unshiftFn;
        while (unshiftFn = this.unshiftFns.pop()) {
            unshiftFn();
        }
    }
};


/***/ }),
/* 14 */
/***/ (() => {

const u = up.util;
up.Change = class Change {
    constructor(options) {
        this.options = options;
    }
    notApplicable(reason) {
        return up.error.notApplicable(this, reason);
    }
    execute() {
        throw up.error.notImplemented();
    }
    onFinished() {
        return this.options.onFinished?.();
    }
    improveHistoryValue(existingValue, newValue) {
        if ((existingValue === false) || u.isString(existingValue)) {
            return existingValue;
        }
        else {
            return newValue;
        }
    }
};


/***/ }),
/* 15 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.Change.Addition = class Addition extends up.Change {
    constructor(options) {
        super(options);
        this.responseDoc = options.responseDoc;
        this.acceptLayer = options.acceptLayer;
        this.dismissLayer = options.dismissLayer;
        this.eventPlans = options.eventPlans || [];
    }
    handleLayerChangeRequests() {
        if (this.layer.isOverlay()) {
            this.tryAcceptLayerFromServer();
            this.abortWhenLayerClosed();
            this.layer.tryAcceptForLocation();
            this.abortWhenLayerClosed();
            this.tryDismissLayerFromServer();
            this.abortWhenLayerClosed();
            this.layer.tryDismissForLocation();
            this.abortWhenLayerClosed();
        }
        this.layer.asCurrent(() => {
            for (let eventPlan of this.eventPlans) {
                up.emit(eventPlan);
                this.abortWhenLayerClosed();
            }
        });
    }
    tryAcceptLayerFromServer() {
        if (u.isDefined(this.acceptLayer) && this.layer.isOverlay()) {
            this.layer.accept(this.acceptLayer);
        }
    }
    tryDismissLayerFromServer() {
        if (u.isDefined(this.dismissLayer) && this.layer.isOverlay()) {
            this.layer.dismiss(this.dismissLayer);
        }
    }
    abortWhenLayerClosed() {
        if (this.layer.isClosed()) {
            throw up.error.aborted('Layer was closed');
        }
    }
    setSource({ oldElement, newElement, source }) {
        if (source === 'keep') {
            source = (oldElement && up.fragment.source(oldElement));
        }
        if (source) {
            e.setMissingAttr(newElement, 'up-source', u.normalizeURL(source, { hash: false }));
        }
    }
};


/***/ }),
/* 16 */
/***/ (() => {

up.Change.Removal = class Removal extends up.Change {
};


/***/ }),
/* 17 */
/***/ (() => {

const e = up.element;
up.Change.DestroyFragment = class DestroyFragment extends up.Change.Removal {
    constructor(options) {
        super(options);
        this.layer = up.layer.get(options) || up.layer.current;
        this.element = this.options.element;
        this.animation = this.options.animation;
        this.log = this.options.log;
    }
    async execute() {
        this.parent = this.element.parentNode;
        up.fragment.markAsDestroying(this.element);
        if (up.motion.willAnimate(this.element, this.animation, this.options)) {
            this.emitDestroyed();
            await this.animate();
            this.wipe();
            this.onFinished();
        }
        else {
            this.wipe();
            this.emitDestroyed();
            this.onFinished();
        }
    }
    animate() {
        return up.motion.animate(this.element, this.animation, this.options);
    }
    wipe() {
        this.layer.asCurrent(() => {
            up.syntax.clean(this.element, { layer: this.layer });
            if (up.browser.canJQuery()) {
                jQuery(this.element).remove();
            }
            else {
                e.remove(this.element);
            }
        });
    }
    emitDestroyed() {
        up.fragment.emitDestroyed(this.element, { parent: this.parent, log: this.log });
    }
};


/***/ }),
/* 18 */
/***/ (() => {

up.Change.OpenLayer = class OpenLayer extends up.Change.Addition {
    constructor(options) {
        super(options);
        this.target = options.target;
        this.origin = options.origin;
        this.baseLayer = options.baseLayer;
    }
    preflightProps() {
        return {
            layer: this.baseLayer,
            mode: this.options.mode,
            context: this.buildLayer().context,
            target: this.target
        };
    }
    bestPreflightSelector() {
        return this.target;
    }
    execute(responseDoc, onApplicable) {
        if (this.target === ':none') {
            this.content = document.createElement('up-none');
        }
        else {
            this.content = responseDoc.select(this.target);
        }
        if (!this.content || this.baseLayer.isClosed()) {
            throw this.notApplicable();
        }
        onApplicable();
        up.puts('up.render()', `Opening element "${this.target}" in new overlay`);
        this.options.title = this.improveHistoryValue(this.options.title, responseDoc.getTitle());
        if (this.emitOpenEvent().defaultPrevented) {
            throw up.error.aborted('Open event was prevented');
        }
        this.baseLayer.peel();
        this.layer = this.buildLayer();
        up.layer.stack.push(this.layer);
        this.layer.createElements(this.content);
        this.layer.setupHandlers();
        this.handleHistory();
        this.setSource({ newElement: this.content, source: this.options.source });
        responseDoc.finalizeElement(this.content);
        up.hello(this.layer.element, { layer: this.layer, origin: this.origin });
        this.handleLayerChangeRequests();
        this.handleScroll();
        this.layer.startOpenAnimation().then(() => {
            if (this.layer.isOpen()) {
                this.handleFocus();
            }
            this.onFinished();
        });
        this.layer.opening = false;
        this.emitOpenedEvent();
        this.abortWhenLayerClosed();
        return new up.RenderResult({
            layer: this.layer,
            fragments: [this.content]
        });
    }
    buildLayer() {
        const buildOptions = { ...this.options, opening: true };
        const beforeNew = optionsWithLayerDefaults => {
            return this.options = up.RenderOptions.finalize(optionsWithLayerDefaults);
        };
        return up.layer.build(buildOptions, beforeNew);
    }
    handleHistory() {
        if (this.layer.history === 'auto') {
            this.layer.history = up.fragment.hasAutoHistory(this.content);
        }
        this.layer.parent.saveHistory();
        this.layer.updateHistory(this.options);
    }
    handleFocus() {
        this.baseLayer.overlayFocus?.moveToBack();
        this.layer.overlayFocus.moveToFront();
        const fragmentFocus = new up.FragmentFocus({
            fragment: this.content,
            layer: this.layer,
            autoMeans: ['autofocus', 'layer']
        });
        fragmentFocus.process(this.options.focus);
    }
    handleScroll() {
        const scrollingOptions = {
            ...this.options,
            fragment: this.content,
            layer: this.layer,
            autoMeans: ['hash', 'layer']
        };
        const scrolling = new up.FragmentScrolling(scrollingOptions);
        scrolling.process(this.options.scroll);
    }
    emitOpenEvent() {
        return up.emit('up:layer:open', {
            origin: this.origin,
            baseLayer: this.baseLayer,
            layerOptions: this.options,
            log: "Opening new overlay"
        });
    }
    emitOpenedEvent() {
        return this.layer.emit('up:layer:opened', {
            origin: this.origin,
            callback: this.layer.callback('onOpened'),
            log: `Opened new ${this.layer}`
        });
    }
};


/***/ }),
/* 19 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.Change.UpdateLayer = class UpdateLayer extends up.Change.Addition {
    constructor(options) {
        options = up.RenderOptions.finalize(options);
        super(options);
        this.layer = options.layer;
        this.target = options.target;
        this.placement = options.placement;
        this.context = options.context;
        this.parseSteps();
    }
    preflightProps() {
        this.matchPreflight();
        return {
            layer: this.layer,
            mode: this.layer.mode,
            context: u.merge(this.layer.context, this.context),
            target: this.bestPreflightSelector(),
        };
    }
    bestPreflightSelector() {
        this.matchPreflight();
        return u.map(this.steps, 'selector').join(', ') || ':none';
    }
    execute(responseDoc, onApplicable) {
        this.responseDoc = responseDoc;
        this.matchPostflight();
        onApplicable();
        up.puts('up.render()', `Updating "${this.bestPreflightSelector()}" in ${this.layer}`);
        this.options.title = this.improveHistoryValue(this.options.title, this.responseDoc.getTitle());
        this.setScrollAndFocusOptions();
        if (this.options.saveScroll) {
            up.viewport.saveScroll({ layer: this.layer });
        }
        if (this.options.peel) {
            this.layer.peel();
        }
        u.assign(this.layer.context, this.context);
        if (this.options.history === 'auto') {
            this.options.history = this.hasAutoHistory();
        }
        if (this.options.history) {
            this.layer.updateHistory(this.options);
        }
        this.handleLayerChangeRequests();
        const swapPromises = this.steps.map(step => this.executeStep(step));
        Promise.all(swapPromises).then(() => {
            this.abortWhenLayerClosed();
            return this.onFinished();
        });
        return new up.RenderResult({
            layer: this.layer,
            fragments: u.map(this.steps, 'newElement')
        });
    }
    async executeStep(step) {
        this.setSource(step);
        switch (step.placement) {
            case 'swap': {
                let keepPlan = this.findKeepPlan(step);
                if (keepPlan) {
                    up.fragment.emitKept(keepPlan);
                    this.handleFocus(step.oldElement, step);
                    await this.handleScroll(step.oldElement, step);
                }
                else {
                    this.transferKeepableElements(step);
                    const parent = step.oldElement.parentNode;
                    const morphOptions = {
                        ...step,
                        beforeStart() {
                            up.fragment.markAsDestroying(step.oldElement);
                        },
                        afterInsert: () => {
                            this.responseDoc.finalizeElement(step.newElement);
                            step.keepPlans.forEach(this.reviveKeepable);
                            up.hello(step.newElement, step);
                        },
                        beforeDetach: () => {
                            up.syntax.clean(step.oldElement, { layer: this.layer });
                        },
                        afterDetach() {
                            e.remove(step.oldElement);
                            up.fragment.emitDestroyed(step.oldElement, { parent, log: false });
                        },
                        scrollNew: () => {
                            this.handleFocus(step.newElement, step);
                            return this.handleScroll(step.newElement, step);
                        }
                    };
                    await up.morph(step.oldElement, step.newElement, step.transition, morphOptions);
                }
                break;
            }
            case 'content': {
                let oldWrapper = e.wrapChildren(step.oldElement);
                let newWrapper = e.wrapChildren(step.newElement);
                let wrapperStep = {
                    ...step,
                    placement: 'swap',
                    oldElement: oldWrapper,
                    newElement: newWrapper,
                    focus: false
                };
                await this.executeStep(wrapperStep);
                e.unwrap(newWrapper);
                await this.handleFocus(step.oldElement, step);
                break;
            }
            case 'before':
            case 'after': {
                let wrapper = e.wrapChildren(step.newElement);
                let position = step.placement === 'before' ? 'afterbegin' : 'beforeend';
                step.oldElement.insertAdjacentElement(position, wrapper);
                this.responseDoc.finalizeElement(wrapper);
                up.hello(wrapper, step);
                this.handleFocus(wrapper, step);
                await this.handleScroll(wrapper, step);
                await up.animate(wrapper, step.transition, step);
                await e.unwrap(wrapper);
                break;
            }
            default: {
                up.fail('Unknown placement: %o', step.placement);
            }
        }
    }
    findKeepPlan(options) {
        if (!options.keep) {
            return;
        }
        const { oldElement, newElement } = options;
        let partnerSelector = e.booleanOrStringAttr(oldElement, 'up-keep');
        if (partnerSelector) {
            if (partnerSelector === true) {
                partnerSelector = '&';
            }
            const lookupOpts = { layer: this.layer, origin: oldElement };
            let partner;
            if (options.descendantsOnly) {
                partner = up.fragment.get(newElement, partnerSelector, lookupOpts);
            }
            else {
                partner = up.fragment.subtree(newElement, partnerSelector, lookupOpts)[0];
            }
            if (partner && e.matches(partner, '[up-keep]')) {
                const plan = {
                    oldElement,
                    newElement: partner,
                    newData: up.syntax.data(partner)
                };
                if (!up.fragment.emitKeep(plan).defaultPrevented) {
                    return plan;
                }
            }
        }
    }
    transferKeepableElements(step) {
        const keepPlans = [];
        if (step.keep) {
            for (let keepable of step.oldElement.querySelectorAll('[up-keep]')) {
                let keepPlan = this.findKeepPlan({ ...step, oldElement: keepable, descendantsOnly: true });
                if (keepPlan) {
                    this.hibernateKeepable(keepPlan);
                    const keepableClone = keepable.cloneNode(true);
                    e.replace(keepable, keepableClone);
                    e.replace(keepPlan.newElement, keepable);
                    keepPlans.push(keepPlan);
                }
            }
        }
        step.keepPlans = keepPlans;
    }
    parseSteps() {
        this.steps = [];
        for (let simpleTarget of u.splitValues(this.target, ',')) {
            if (simpleTarget !== ':none') {
                const expressionParts = simpleTarget.match(/^(.+?)(?::(before|after))?$/);
                if (!expressionParts) {
                    throw up.error.invalidSelector(simpleTarget);
                }
                const step = {
                    ...this.options,
                    selector: expressionParts[1],
                    placement: expressionParts[2] || this.placement || 'swap'
                };
                this.steps.push(step);
            }
        }
    }
    hibernateKeepable(keepPlan) {
        let viewports = up.viewport.subtree(keepPlan.oldElement);
        keepPlan.revivers = viewports.map(function (viewport) {
            let { scrollTop, scrollLeft } = viewport;
            return () => u.assign(viewport, { scrollTop, scrollLeft });
        });
    }
    reviveKeepable(keepPlan) {
        for (let reviver of keepPlan.revivers) {
            reviver();
        }
    }
    matchPreflight() {
        if (this.matchedPreflight) {
            return;
        }
        for (let step of this.steps) {
            const finder = new up.FragmentFinder(step);
            step.oldElement || (step.oldElement = finder.find());
            if (!step.oldElement) {
                throw this.notApplicable(`Could not find element "${this.target}" in current page`);
            }
        }
        this.resolveOldNesting();
        this.matchedPreflight = true;
    }
    matchPostflight() {
        if (this.matchedPostflight) {
            return;
        }
        this.matchPreflight();
        for (let step of this.steps) {
            let newElement = this.responseDoc.select(step.selector);
            if (newElement) {
                step.newElement = newElement;
            }
            else {
                throw this.notApplicable(`Could not find element "${this.target}" in server response`);
            }
        }
        if (this.options.hungry) {
            this.addHungrySteps();
        }
        this.resolveOldNesting();
        this.matchedPostflight = true;
    }
    addHungrySteps() {
        const hungries = up.fragment.all(up.radio.hungrySelector(), this.options);
        for (let oldElement of hungries) {
            const selector = up.fragment.toTarget(oldElement);
            const newElement = this.responseDoc.select(selector);
            if (newElement) {
                const transition = e.booleanOrStringAttr(oldElement, 'transition');
                const step = { selector, oldElement, newElement, transition, placement: 'swap' };
                this.steps.push(step);
            }
        }
    }
    containedByRivalStep(steps, candidateStep) {
        return u.some(steps, function (rivalStep) {
            return (rivalStep !== candidateStep) &&
                ((rivalStep.placement === 'swap') || (rivalStep.placement === 'content')) &&
                rivalStep.oldElement.contains(candidateStep.oldElement);
        });
    }
    resolveOldNesting() {
        let compressed = u.uniqBy(this.steps, 'oldElement');
        compressed = u.reject(compressed, step => this.containedByRivalStep(compressed, step));
        this.steps = compressed;
    }
    setScrollAndFocusOptions() {
        this.steps.forEach((step, i) => {
            if (i > 0) {
                step.scroll = false;
                step.focus = false;
            }
            if ((step.placement === 'swap') || (step.placement === 'content')) {
                step.scrollBehavior = 'auto';
                this.focusCapsule || (this.focusCapsule = up.FocusCapsule.preserveWithin(step.oldElement));
            }
        });
    }
    handleFocus(fragment, step) {
        const fragmentFocus = new up.FragmentFocus({
            ...step,
            fragment,
            layer: this.layer,
            focusCapsule: this.focusCapsule,
            autoMeans: up.fragment.config.autoFocus,
        });
        return fragmentFocus.process(step.focus);
    }
    handleScroll(fragment, step) {
        const scrolling = new up.FragmentScrolling({
            ...step,
            fragment,
            layer: this.layer,
            autoMeans: up.fragment.config.autoScroll
        });
        return scrolling.process(step.scroll);
    }
    hasAutoHistory() {
        const oldFragments = u.map(this.steps, 'oldElement');
        return u.some(oldFragments, oldFragment => up.fragment.hasAutoHistory(oldFragment));
    }
};


/***/ }),
/* 20 */
/***/ (() => {

const u = up.util;
up.Change.CloseLayer = class CloseLayer extends up.Change.Removal {
    constructor(options) {
        super(options);
        this.verb = options.verb;
        this.layer = up.layer.get(options);
        this.origin = options.origin;
        this.value = options.value;
        this.preventable = options.preventable ?? true;
    }
    execute() {
        if (!this.layer.isOpen()) {
            return Promise.resolve();
        }
        up.browser.assertConfirmed(this.options);
        up.network.abort(request => request.layer === this.layer);
        if (this.emitCloseEvent().defaultPrevented && this.preventable) {
            throw up.error.aborted('Close event was prevented');
        }
        const { parent } = this.layer;
        this.layer.peel();
        this.layer.stack.remove(this.layer);
        parent.restoreHistory();
        this.handleFocus(parent);
        this.layer.teardownHandlers();
        this.layer.destroyElements(this.options);
        this.emitClosedEvent(parent);
    }
    emitCloseEvent() {
        let event = this.layer.emit(this.buildEvent(`up:layer:${this.verb}`), {
            callback: this.layer.callback(`on${u.upperCaseFirst(this.verb)}`),
            log: [`Will ${this.verb} ${this.layer} with value %o`, this.value]
        });
        this.value = event.value;
        return event;
    }
    emitClosedEvent(formerParent) {
        const verbPast = `${this.verb}ed`;
        const verbPastUpperCaseFirst = u.upperCaseFirst(verbPast);
        return this.layer.emit(this.buildEvent(`up:layer:${verbPast}`), {
            baseLayer: formerParent,
            callback: this.layer.callback(`on${verbPastUpperCaseFirst}`),
            ensureBubbles: true,
            log: [`${verbPastUpperCaseFirst} ${this.layer} with value %o`, this.value]
        });
    }
    buildEvent(name) {
        return up.event.build(name, {
            layer: this.layer,
            value: this.value,
            origin: this.origin
        });
    }
    handleFocus(formerParent) {
        this.layer.overlayFocus.teardown();
        formerParent.overlayFocus?.moveToFront();
        let newFocusElement = this.layer.origin || formerParent.element;
        newFocusElement.focus({ preventScroll: true });
    }
};


/***/ }),
/* 21 */
/***/ (() => {

const u = up.util;
up.Change.FromContent = class FromContent extends up.Change {
    constructor(options) {
        super(options);
        this.layers = u.filter(up.layer.getAll(this.options), this.isRenderableLayer);
        this.origin = this.options.origin;
        this.preview = this.options.preview;
        this.mode = this.options.mode;
        if (this.origin) {
            this.originLayer = up.layer.get(this.origin);
        }
    }
    isRenderableLayer(layer) {
        return (layer === 'new') || layer.isOpen();
    }
    getPlans() {
        if (!this.plans) {
            this.plans = [];
            if (this.options.fragment) {
                this.options.target = this.getResponseDoc().rootSelector();
            }
            this.expandIntoPlans(this.layers, this.options.target);
            this.expandIntoPlans(this.layers, this.options.fallback);
        }
        return this.plans;
    }
    expandIntoPlans(layers, targets) {
        for (let layer of layers) {
            for (let target of this.expandTargets(targets, layer)) {
                const props = { ...this.options, target, layer, placement: this.defaultPlacement() };
                const change = layer === 'new' ? new up.Change.OpenLayer(props) : new up.Change.UpdateLayer(props);
                this.plans.push(change);
            }
        }
    }
    expandTargets(targets, layer) {
        return up.fragment.expandTargets(targets, { layer, mode: this.mode, origin: this.origin });
    }
    execute() {
        if (this.options.preload) {
            return Promise.resolve();
        }
        return this.seekPlan(this.executePlan.bind(this)) || this.postflightTargetNotApplicable();
    }
    executePlan(matchedPlan) {
        return matchedPlan.execute(this.getResponseDoc(), this.onPlanApplicable.bind(this, matchedPlan));
    }
    onPlanApplicable(plan) {
        let primaryPlan = this.getPlans()[0];
        if (plan !== primaryPlan) {
            up.puts('up.render()', 'Could not match primary target (%s). Updating a fallback target (%s).', primaryPlan.target, plan.target);
        }
    }
    getResponseDoc() {
        if (!this.preview && !this.responseDoc) {
            const docOptions = u.pick(this.options, ['target', 'content', 'fragment', 'document', 'html', 'cspNonces']);
            up.migrate.handleResponseDocOptions?.(docOptions);
            if (this.defaultPlacement() === 'content') {
                docOptions.target = this.firstExpandedTarget(docOptions.target);
            }
            this.responseDoc = new up.ResponseDoc(docOptions);
        }
        return this.responseDoc;
    }
    defaultPlacement() {
        if (!this.options.document && !this.options.fragment) {
            return 'content';
        }
    }
    firstExpandedTarget(target) {
        return this.expandTargets(target || ':main', this.layers[0])[0];
    }
    preflightProps(opts = {}) {
        const getPlanProps = plan => plan.preflightProps();
        return this.seekPlan(getPlanProps) || opts.optional || this.preflightTargetNotApplicable();
    }
    preflightTargetNotApplicable() {
        this.targetNotApplicable('Could not find target in current page');
    }
    postflightTargetNotApplicable() {
        this.targetNotApplicable('Could not find common target in current page and response');
    }
    targetNotApplicable(reason) {
        if (this.getPlans().length) {
            const planTargets = u.uniq(u.map(this.getPlans(), 'target'));
            const humanizedLayerOption = up.layer.optionToString(this.options.layer);
            up.fail(reason + " (tried selectors %o in %s)", planTargets, humanizedLayerOption);
        }
        else if (this.layers.length) {
            up.fail('No target selector given');
        }
        else {
            up.fail('Layer %o does not exist', this.options.layer);
        }
    }
    seekPlan(fn) {
        for (let plan of this.getPlans()) {
            try {
                return fn(plan);
            }
            catch (error) {
                if (!up.error.notApplicable.is(error)) {
                    throw error;
                }
            }
        }
    }
};


/***/ }),
/* 22 */
/***/ (() => {

const u = up.util;
up.Change.FromURL = class FromURL extends up.Change {
    constructor(options) {
        super(options);
        this.options.layer = up.layer.getAll(this.options);
        this.options.normalizeLayerOptions = false;
        this.successOptions = this.options;
        this.failOptions = up.RenderOptions.deriveFailOptions(this.successOptions);
    }
    execute() {
        let newPageReason = this.newPageReason();
        if (newPageReason) {
            up.puts('up.render()', newPageReason);
            up.network.loadPage(this.options);
            return u.unresolvablePromise();
        }
        const promise = this.makeRequest();
        if (this.options.preload) {
            return promise;
        }
        return u.always(promise, responseOrError => this.onRequestSettled(responseOrError));
    }
    newPageReason() {
        if (u.isCrossOrigin(this.options.url)) {
            return 'Loading cross-origin content in new page';
        }
        if (!up.browser.canPushState()) {
            return 'Loading content in new page to restore history support';
        }
    }
    makeRequest() {
        const successAttrs = this.preflightPropsForRenderOptions(this.successOptions);
        const failAttrs = this.preflightPropsForRenderOptions(this.failOptions, { optional: true });
        const requestAttrs = u.merge(this.successOptions, successAttrs, u.renameKeys(failAttrs, up.fragment.failKey));
        this.request = up.request(requestAttrs);
        return this.request;
    }
    preflightPropsForRenderOptions(renderOptions, requestAttributesOptions) {
        const preview = new up.Change.FromContent({ ...renderOptions, preview: true });
        return preview.preflightProps(requestAttributesOptions);
    }
    onRequestSettled(response) {
        this.response = response;
        if (!(response instanceof up.Response)) {
            throw response;
        }
        else if (this.isSuccessfulResponse()) {
            return this.updateContentFromResponse(['Loaded fragment from successful response to %s', this.request.description], this.successOptions);
        }
        else {
            const log = ['Loaded fragment from failed response to %s (HTTP %d)', this.request.description, this.response.status];
            throw this.updateContentFromResponse(log, this.failOptions);
        }
    }
    isSuccessfulResponse() {
        return (this.successOptions.fail === false) || this.response.ok;
    }
    updateContentFromResponse(log, renderOptions) {
        this.request.assertEmitted('up:fragment:loaded', {
            callback: this.options.onLoaded,
            response: this.response,
            log,
            renderOptions,
        });
        this.augmentOptionsFromResponse(renderOptions);
        return new up.Change.FromContent(renderOptions).execute();
    }
    augmentOptionsFromResponse(renderOptions) {
        const responseURL = this.response.url;
        let serverLocation = responseURL;
        let hash = this.request.hash;
        if (hash) {
            renderOptions.hash = hash;
            serverLocation += hash;
        }
        const isReloadable = (this.response.method === 'GET');
        if (isReloadable) {
            renderOptions.source = this.improveHistoryValue(renderOptions.source, responseURL);
        }
        else {
            renderOptions.source = this.improveHistoryValue(renderOptions.source, 'keep');
            renderOptions.history = !!renderOptions.location;
        }
        renderOptions.location = this.improveHistoryValue(renderOptions.location, serverLocation);
        renderOptions.title = this.improveHistoryValue(renderOptions.title, this.response.title);
        renderOptions.eventPlans = this.response.eventPlans;
        let serverTarget = this.response.target;
        if (serverTarget) {
            renderOptions.target = serverTarget;
        }
        renderOptions.document = this.response.text;
        renderOptions.acceptLayer = this.response.acceptLayer;
        renderOptions.dismissLayer = this.response.dismissLayer;
        if (!renderOptions.document && (u.isDefined(renderOptions.acceptLayer) || u.isDefined(renderOptions.dismissLayer))) {
            renderOptions.target = ':none';
        }
        renderOptions.context = u.merge(renderOptions.context, this.response.context);
        renderOptions.cspNonces = this.response.cspNonces;
    }
};


/***/ }),
/* 23 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.CompilerPass = class CompilerPass {
    constructor(root, compilers, options = {}) {
        this.root = root;
        this.compilers = compilers;
        this.skipSubtrees = options.skip;
        if (!this.skipSubtrees.length || !this.root.querySelector('[up-keep]')) {
            this.skipSubtrees = undefined;
        }
        this.layer = options.layer || up.layer.get(this.root) || up.layer.current;
        this.errors = [];
    }
    run() {
        up.puts('up.hello()', "Compiling fragment %o", this.root);
        this.layer.asCurrent(() => {
            for (let compiler of this.compilers) {
                this.runCompiler(compiler);
            }
        });
        if (this.errors.length) {
            throw up.error.failed('Errors while compiling', { errors: this.errors });
        }
    }
    runCompiler(compiler) {
        const matches = this.select(compiler.selector);
        if (!matches.length) {
            return;
        }
        if (!compiler.isDefault) {
            up.puts('up.hello()', 'Compiling "%s" on %d element(s)', compiler.selector, matches.length);
        }
        if (compiler.batch) {
            this.compileBatch(compiler, matches);
        }
        else {
            for (let match of matches) {
                this.compileOneElement(compiler, match);
            }
        }
        return up.migrate.postCompile?.(matches, compiler);
    }
    compileOneElement(compiler, element) {
        const elementArg = compiler.jQuery ? up.browser.jQuery(element) : element;
        const compileArgs = [elementArg];
        if (compiler.length !== 1) {
            const data = up.syntax.data(element);
            compileArgs.push(data);
        }
        const result = this.applyCompilerFunction(compiler, element, compileArgs);
        let destructorOrDestructors = this.destructorPresence(result);
        if (destructorOrDestructors) {
            up.destructor(element, destructorOrDestructors);
        }
    }
    compileBatch(compiler, elements) {
        const elementsArgs = compiler.jQuery ? up.browser.jQuery(elements) : elements;
        const compileArgs = [elementsArgs];
        if (compiler.length !== 1) {
            const dataList = u.map(elements, up.syntax.data);
            compileArgs.push(dataList);
        }
        const result = this.applyCompilerFunction(compiler, elements, compileArgs);
        if (this.destructorPresence(result)) {
            up.fail('Compilers with { batch: true } cannot return destructors');
        }
    }
    applyCompilerFunction(compiler, elementOrElements, compileArgs) {
        try {
            return compiler.apply(elementOrElements, compileArgs);
        }
        catch (error) {
            this.errors.push(error);
            up.log.error('up.hello()', 'While compiling %o: %o', elementOrElements, error);
            up.error.emitGlobal(error);
        }
    }
    destructorPresence(result) {
        if (u.isFunction(result) || (u.isArray(result) && (u.every(result, u.isFunction)))) {
            return result;
        }
    }
    select(selector) {
        let matches = e.subtree(this.root, u.evalOption(selector));
        if (this.skipSubtrees) {
            matches = u.reject(matches, (match) => this.isInSkippedSubtree(match));
        }
        return matches;
    }
    isInSkippedSubtree(element) {
        let parent;
        if (u.contains(this.skipSubtrees, element)) {
            return true;
        }
        else if ((parent = element.parentElement)) {
            return this.isInSkippedSubtree(parent);
        }
        else {
            return false;
        }
    }
};


/***/ }),
/* 24 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.CSSTransition = class CSSTransition {
    constructor(element, lastFrameKebab, options) {
        this.element = element;
        this.lastFrameKebab = lastFrameKebab;
        this.lastFrameKeysKebab = Object.keys(this.lastFrameKebab);
        if (u.some(this.lastFrameKeysKebab, key => key.match(/A-Z/))) {
            up.fail('Animation keys must be kebab-case');
        }
        this.finishEvent = options.finishEvent;
        this.duration = options.duration;
        this.easing = options.easing;
        this.finished = false;
    }
    start() {
        if (this.lastFrameKeysKebab.length === 0) {
            this.finished = true;
            return Promise.resolve();
        }
        this.deferred = u.newDeferred();
        this.pauseOldTransition();
        this.startTime = new Date();
        this.startFallbackTimer();
        this.listenToFinishEvent();
        this.listenToTransitionEnd();
        this.startMotion();
        return this.deferred.promise();
    }
    listenToFinishEvent() {
        if (this.finishEvent) {
            this.stopListenToFinishEvent = up.on(this.element, this.finishEvent, this.onFinishEvent.bind(this));
        }
    }
    onFinishEvent(event) {
        event.stopPropagation();
        this.finish();
    }
    startFallbackTimer() {
        const timingTolerance = 100;
        this.fallbackTimer = u.timer((this.duration + timingTolerance), () => {
            this.finish();
        });
    }
    stopFallbackTimer() {
        clearTimeout(this.fallbackTimer);
    }
    listenToTransitionEnd() {
        this.stopListenToTransitionEnd = up.on(this.element, 'transitionend', this.onTransitionEnd.bind(this));
    }
    onTransitionEnd(event) {
        if (event.target !== this.element) {
            return;
        }
        const elapsed = new Date() - this.startTime;
        if (elapsed <= (0.25 * this.duration)) {
            return;
        }
        const completedPropertyKebab = event.propertyName;
        if (!u.contains(this.lastFrameKeysKebab, completedPropertyKebab)) {
            return;
        }
        this.finish();
    }
    finish() {
        if (this.finished) {
            return;
        }
        this.finished = true;
        this.stopFallbackTimer();
        this.stopListenToFinishEvent?.();
        this.stopListenToTransitionEnd?.();
        e.concludeCSSTransition(this.element);
        this.resumeOldTransition();
        this.deferred.resolve();
    }
    pauseOldTransition() {
        const oldTransition = e.style(this.element, [
            'transitionProperty',
            'transitionDuration',
            'transitionDelay',
            'transitionTimingFunction'
        ]);
        if (e.hasCSSTransition(oldTransition)) {
            if (oldTransition.transitionProperty !== 'all') {
                const oldTransitionProperties = oldTransition.transitionProperty.split(/\s*,\s*/);
                const oldTransitionFrameKebab = e.style(this.element, oldTransitionProperties);
                this.setOldTransitionTargetFrame = e.setTemporaryStyle(this.element, oldTransitionFrameKebab);
            }
            this.setOldTransition = e.concludeCSSTransition(this.element);
        }
    }
    resumeOldTransition() {
        this.setOldTransitionTargetFrame?.();
        this.setOldTransition?.();
    }
    startMotion() {
        e.setStyle(this.element, {
            transitionProperty: Object.keys(this.lastFrameKebab).join(', '),
            transitionDuration: `${this.duration}ms`,
            transitionTimingFunction: this.easing
        });
        e.setStyle(this.element, this.lastFrameKebab);
    }
};


/***/ }),
/* 25 */
/***/ (() => {

const u = up.util;
up.DestructorPass = class DestructorPass {
    constructor(fragment, options) {
        this.fragment = fragment;
        this.options = options;
        this.errors = [];
    }
    run() {
        for (let cleanable of this.selectCleanables()) {
            let destructors = u.pluckKey(cleanable, 'upDestructors');
            if (destructors) {
                for (let destructor of destructors) {
                    this.applyDestructorFunction(destructor, cleanable);
                }
            }
            cleanable.classList.remove('up-can-clean');
        }
        if (this.errors.length) {
            throw up.error.failed('Errors while destroying', { errors: this.errors });
        }
    }
    selectCleanables() {
        const selectOptions = { ...this.options, destroying: true };
        return up.fragment.subtree(this.fragment, '.up-can-clean', selectOptions);
    }
    applyDestructorFunction(destructor, element) {
        try {
            destructor();
        }
        catch (error) {
            this.errors.push(error);
            up.log.error('up.destroy()', 'While destroying %o: %o', element, error);
            up.error.emitGlobal(error);
        }
    }
};


/***/ }),
/* 26 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.EventEmitter = class EventEmitter extends up.Record {
    keys() {
        return [
            'target',
            'event',
            'baseLayer',
            'callback',
            'log',
            'ensureBubbles'
        ];
    }
    emit() {
        this.logEmission();
        if (this.baseLayer) {
            this.baseLayer.asCurrent(() => this.dispatchEvent());
        }
        else {
            this.dispatchEvent();
        }
        return this.event;
    }
    dispatchEvent() {
        this.target.dispatchEvent(this.event);
        if (this.ensureBubbles && e.isDetached(this.target)) {
            document.dispatchEvent(this.event);
        }
        this.callback?.(this.event);
    }
    assertEmitted() {
        const event = this.emit();
        if (event.defaultPrevented) {
            throw up.error.aborted(`Event ${event.type} was prevented`);
        }
    }
    logEmission() {
        if (!up.log.isEnabled()) {
            return;
        }
        let message = this.log;
        let messageArgs;
        if (u.isArray(message)) {
            [message, ...messageArgs] = message;
        }
        else {
            messageArgs = [];
        }
        const { type } = this.event;
        if (u.isString(message)) {
            up.puts(type, message, ...messageArgs);
        }
        else if (message !== false) {
            up.puts(type, `Event ${type}`);
        }
    }
    static fromEmitArgs(args, defaults = {}) {
        let options = u.extractOptions(args);
        options = u.merge(defaults, options);
        if (u.isElementish(args[0])) {
            options.target = e.get(args.shift());
        }
        else if (args[0] instanceof up.Layer) {
            options.layer = args.shift();
        }
        let layer;
        if (options.layer) {
            layer = up.layer.get(options.layer);
            if (options.target == null) {
                options.target = layer.element;
            }
            if (options.baseLayer == null) {
                options.baseLayer = layer;
            }
        }
        if (options.baseLayer) {
            options.baseLayer = up.layer.get(options.baseLayer);
        }
        if (u.isString(options.target)) {
            options.target = up.fragment.get(options.target, { layer: options.layer });
        }
        else if (!options.target) {
            options.target = document;
        }
        if (args[0]?.preventDefault) {
            options.event = args[0];
            if (options.log == null) {
                options.log = args[0].log;
            }
        }
        else if (u.isString(args[0])) {
            options.event = up.event.build(args[0], options);
        }
        else {
            options.event = up.event.build(options);
        }
        return new (this)(options);
    }
};


/***/ }),
/* 27 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.EventListener = class EventListener extends up.Record {
    keys() {
        return [
            'element',
            'eventType',
            'selector',
            'callback',
            'jQuery',
            'guard',
            'baseLayer',
            'passive',
            'once',
            'beforeBoot',
        ];
    }
    constructor(attributes) {
        super(attributes);
        this.key = this.constructor.buildKey(attributes);
        this.isDefault = up.framework.evaling;
        this.beforeBoot ?? (this.beforeBoot = this.eventType.indexOf('up:framework:') === 0);
        this.nativeCallback = this.nativeCallback.bind(this);
    }
    bind() {
        var _a;
        const map = ((_a = this.element).upEventListeners || (_a.upEventListeners = {}));
        if (map[this.key]) {
            up.fail('up.on(): The %o callback %o cannot be registered more than once', this.eventType, this.callback);
        }
        map[this.key] = this;
        this.element.addEventListener(...this.addListenerArgs());
    }
    addListenerArgs() {
        const args = [this.eventType, this.nativeCallback];
        if (this.passive && up.browser.canPassiveEventListener()) {
            args.push({ passive: true });
        }
        return args;
    }
    unbind() {
        let map = this.element.upEventListeners;
        if (map) {
            delete map[this.key];
        }
        this.element.removeEventListener(...this.addListenerArgs());
    }
    nativeCallback(event) {
        if (up.framework.beforeBoot && !this.beforeBoot) {
            return;
        }
        if (this.once) {
            this.unbind();
        }
        let element = event.target;
        if (this.selector) {
            element = e.closest(element, u.evalOption(this.selector));
        }
        if (this.guard && !this.guard(event)) {
            return;
        }
        if (element) {
            const elementArg = this.jQuery ? up.browser.jQuery(element) : element;
            const args = [event, elementArg];
            const expectedArgCount = this.callback.length;
            if (expectedArgCount !== 1 && expectedArgCount !== 2) {
                const data = up.syntax.data(element);
                args.push(data);
            }
            const applyCallback = this.callback.bind(element, ...args);
            if (this.baseLayer) {
                this.baseLayer.asCurrent(applyCallback);
            }
            else {
                applyCallback();
            }
        }
    }
    static fromElement(attributes) {
        let map = attributes.element.upEventListeners;
        if (map) {
            const key = this.buildKey(attributes);
            return map[key];
        }
    }
    static buildKey(attributes) {
        var _a;
        (_a = attributes.callback).upUid || (_a.upUid = u.uid());
        return [
            attributes.eventType,
            attributes.selector,
            attributes.callback.upUid
        ].join('|');
    }
    static allNonDefault(element) {
        let map = element.upEventListeners;
        if (map) {
            const listeners = u.values(map);
            return u.reject(listeners, 'isDefault');
        }
        else {
            return [];
        }
    }
};


/***/ }),
/* 28 */
/***/ (() => {

const u = up.util;
up.EventListenerGroup = class EventListenerGroup extends up.Record {
    keys() {
        return [
            'elements',
            'eventTypes',
            'selector',
            'callback',
            'jQuery',
            'guard',
            'baseLayer',
            'passive',
            'once',
            'beforeBoot',
        ];
    }
    bind() {
        const unbindFns = [];
        this.eachListenerAttributes(function (attrs) {
            const listener = new up.EventListener(attrs);
            listener.bind();
            return unbindFns.push(listener.unbind.bind(listener));
        });
        return u.sequence(unbindFns);
    }
    eachListenerAttributes(fn) {
        for (let element of this.elements) {
            for (let eventType of this.eventTypes) {
                fn(this.listenerAttributes(element, eventType));
            }
        }
    }
    listenerAttributes(element, eventType) {
        return { ...this.attributes(), element, eventType };
    }
    unbind() {
        this.eachListenerAttributes(function (attrs) {
            let listener = up.EventListener.fromElement(attrs);
            if (listener) {
                listener.unbind();
            }
        });
    }
    static fromBindArgs(args, defaults) {
        args = u.copy(args);
        const callback = args.pop();
        let elements;
        if (args[0].addEventListener) {
            elements = [args.shift()];
        }
        else if (u.isJQuery(args[0]) || (u.isList(args[0]) && args[0][0].addEventListener)) {
            elements = args.shift();
        }
        else {
            elements = [document];
        }
        let eventTypes = u.splitValues(args.shift());
        let fixTypes = up.migrate.fixEventTypes;
        if (fixTypes) {
            eventTypes = fixTypes(eventTypes);
        }
        const options = u.extractOptions(args);
        const selector = args[0];
        const attributes = { elements, eventTypes, selector, callback, ...options, ...defaults };
        return new (this)(attributes);
    }
};


/***/ }),
/* 29 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.FieldObserver = class FieldObserver {
    constructor(fieldOrFields, options, callback) {
        this.scheduleValues = this.scheduleValues.bind(this);
        this.isNewValues = this.isNewValues.bind(this);
        this.callback = callback;
        this.fields = e.list(fieldOrFields);
        this.delay = options.delay;
        this.batch = options.batch;
    }
    start() {
        this.scheduledValues = null;
        this.processedValues = this.readFieldValues();
        this.currentTimer = undefined;
        this.callbackRunning = false;
        this.unbind = up.on(this.fields, 'input change', () => this.check());
    }
    stop() {
        this.unbind();
        this.cancelTimer();
    }
    cancelTimer() {
        clearTimeout(this.currentTimer);
        this.currentTimer = undefined;
    }
    scheduleTimer() {
        this.cancelTimer();
        this.currentTimer = u.timer(this.delay, () => {
            this.currentTimer = undefined;
            this.requestCallback();
        });
    }
    scheduleValues(values) {
        this.scheduledValues = values;
        this.scheduleTimer();
    }
    isNewValues(values) {
        return !u.isEqual(values, this.processedValues) && !u.isEqual(this.scheduledValues, values);
    }
    async requestCallback() {
        if ((this.scheduledValues !== null) && !this.currentTimer && !this.callbackRunning) {
            const diff = this.changedValues(this.processedValues, this.scheduledValues);
            this.processedValues = this.scheduledValues;
            this.scheduledValues = null;
            this.callbackRunning = true;
            const callbackReturnValues = [];
            if (this.batch) {
                callbackReturnValues.push(this.callback(diff));
            }
            else {
                for (let name in diff) {
                    const value = diff[name];
                    callbackReturnValues.push(this.callback(value, name));
                }
            }
            await u.allSettled(callbackReturnValues);
            this.callbackRunning = false;
            this.requestCallback();
        }
    }
    changedValues(previous, next) {
        const changes = {};
        let keys = Object.keys(previous);
        keys = keys.concat(Object.keys(next));
        keys = u.uniq(keys);
        for (let key of keys) {
            const previousValue = previous[key];
            const nextValue = next[key];
            if (!u.isEqual(previousValue, nextValue)) {
                changes[key] = nextValue;
            }
        }
        return changes;
    }
    readFieldValues() {
        return up.Params.fromFields(this.fields).toObject();
    }
    check() {
        const values = this.readFieldValues();
        if (this.isNewValues(values)) {
            this.scheduleValues(values);
        }
    }
};


/***/ }),
/* 30 */
/***/ (() => {

const e = up.element;
const PRESERVE_KEYS = ['selectionStart', 'selectionEnd', 'scrollLeft', 'scrollTop'];
function transferProps(from, to) {
    for (let key of PRESERVE_KEYS) {
        try {
            to[key] = from[key];
        }
        catch (error) {
        }
    }
}
function focusedElementWithin(scopeElement) {
    const focusedElement = document.activeElement;
    if (e.isInSubtree(scopeElement, focusedElement)) {
        return focusedElement;
    }
}
up.FocusCapsule = class FocusCapsule extends up.Record {
    keys() {
        return ['selector', 'oldElement'].concat(PRESERVE_KEYS);
    }
    restore(scope, options) {
        if (!this.wasLost()) {
            return;
        }
        let rediscoveredElement = e.get(scope, this.selector);
        if (rediscoveredElement) {
            transferProps(this, rediscoveredElement);
            up.focus(rediscoveredElement, options);
            return true;
        }
    }
    static preserveWithin(oldElement) {
        let focusedElement = focusedElementWithin(oldElement);
        if (focusedElement) {
            const plan = { oldElement, selector: up.fragment.toTarget(focusedElement) };
            transferProps(focusedElement, plan);
            return new (this)(plan);
        }
    }
    wasLost() {
        return !focusedElementWithin(this.oldElement);
    }
};


/***/ }),
/* 31 */
/***/ (() => {

const u = up.util;
up.FragmentProcessor = class FragmentProcessor extends up.Record {
    keys() {
        return [
            'fragment',
            'autoMeans',
            'origin',
            'layer'
        ];
    }
    process(opt) {
        return this.tryProcess(opt);
    }
    tryProcess(opt) {
        if (u.isArray(opt)) {
            return u.find(opt, opt => this.tryProcess(opt));
        }
        if (u.isFunction(opt)) {
            return this.tryProcess(opt(this.fragment, this.attributes()));
        }
        if (u.isElement(opt)) {
            return this.processElement();
        }
        if (u.isString(opt)) {
            if (opt === 'auto') {
                return this.tryProcess(this.autoMeans);
            }
            let match = opt.match(/^(.+?)-if-(.+?)$/);
            if (match) {
                return this.resolveCondition(match[2]) && this.process(match[1]);
            }
        }
        return this.processPrimitive(opt);
    }
    resolveCondition(condition) {
        if (condition === 'main') {
            return up.fragment.contains(this.fragment, ':main');
        }
    }
    findSelector(selector) {
        const lookupOpts = { layer: this.layer, origin: this.origin };
        let match = up.fragment.get(this.fragment, selector, lookupOpts) || up.fragment.get(selector, lookupOpts);
        if (match) {
            return match;
        }
        else {
            up.warn('up.render()', 'Could not find an element matching "%s"', selector);
        }
    }
};


/***/ }),
/* 32 */
/***/ (() => {

const DESCENDANT_SELECTOR = /^([^ >+(]+) (.+)$/;
up.FragmentFinder = class FragmentFinder {
    constructor(options) {
        this.options = options;
        this.origin = this.options.origin;
        this.selector = this.options.selector;
        this.layer = this.options.layer;
    }
    find() {
        return this.findAroundOrigin() || this.findInLayer();
    }
    findAroundOrigin() {
        if (this.origin && up.fragment.config.matchAroundOrigin && !up.element.isDetached(this.origin)) {
            return this.findClosest() || this.findInVicinity();
        }
    }
    findClosest() {
        return up.fragment.closest(this.origin, this.selector, this.options);
    }
    findInVicinity() {
        let parts = this.selector.match(DESCENDANT_SELECTOR);
        if (parts) {
            let parent = up.fragment.closest(this.origin, parts[1], this.options);
            if (parent) {
                return up.fragment.getDumb(parent, parts[2]);
            }
        }
    }
    findInLayer() {
        return up.fragment.getDumb(this.selector, this.options);
    }
};


/***/ }),
/* 33 */
/***/ (() => {

const u = up.util;
const e = up.element;
const PREVENT_SCROLL_OPTIONS = { preventScroll: true };
up.FragmentFocus = class FragmentFocus extends up.FragmentProcessor {
    keys() {
        return super.keys().concat([
            'hash',
            'focusCapsule'
        ]);
    }
    processPrimitive(opt) {
        switch (opt) {
            case 'keep':
                return this.restoreFocus();
            case 'target':
            case true:
                return this.focusElement(this.fragment);
            case 'layer':
                return this.focusElement(this.layer.getFocusElement());
            case 'main':
                return this.focusSelector(':main');
            case 'hash':
                return this.focusHash();
            case 'autofocus':
                return this.autofocus();
            default:
                if (u.isString(opt)) {
                    return this.focusSelector(opt);
                }
        }
    }
    processElement(element) {
        return this.focusElement(element);
    }
    resolveCondition(condition) {
        if (condition === 'lost') {
            return this.wasFocusLost();
        }
        else {
            return super.resolveCondition(condition);
        }
    }
    focusSelector(selector) {
        let match = this.findSelector(selector);
        if (match) {
            return this.focusElement(match);
        }
    }
    restoreFocus() {
        return this.focusCapsule?.restore(this.fragment, PREVENT_SCROLL_OPTIONS);
    }
    autofocus() {
        let autofocusElement = e.subtree(this.fragment, '[autofocus]')[0];
        if (autofocusElement) {
            up.focus(autofocusElement, PREVENT_SCROLL_OPTIONS);
            return true;
        }
    }
    focusElement(element) {
        up.viewport.makeFocusable(element);
        up.focus(element, PREVENT_SCROLL_OPTIONS);
        return true;
    }
    focusHash() {
        let hashTarget = up.viewport.firstHashTarget(this.hash, { layer: this.layer });
        if (hashTarget) {
            return this.focusElement(hashTarget);
        }
    }
    wasFocusLost() {
        return this.focusCapsule?.wasLost();
    }
};


/***/ }),
/* 34 */
/***/ (() => {

const e = up.element;
const u = up.util;
up.FragmentPolling = class FragmentPolling {
    constructor(fragment) {
        this.options = {};
        this.state = 'initialized';
        this.setFragment(fragment);
    }
    static forFragment(fragment) {
        return fragment.upPolling || (fragment.upPolling = new this(fragment));
    }
    onPollAttributeObserved() {
        this.start();
    }
    onFragmentDestroyed() {
        this.stop();
    }
    start() {
        if (this.state !== 'started') {
            this.state = 'started';
            this.scheduleReload();
        }
    }
    stop() {
        if (this.state === 'started') {
            clearTimeout(this.reloadTimer);
            this.state = 'stopped';
        }
    }
    forceStart(options) {
        u.assign(this.options, options);
        this.forceStarted = true;
        this.start();
    }
    forceStop() {
        this.stop();
        this.forceStarted = false;
    }
    scheduleReload(delay = this.getInterval()) {
        this.reloadTimer = setTimeout(() => this.reload(), delay);
    }
    reload() {
        if (this.state !== 'started') {
            return;
        }
        if (up.radio.shouldPoll(this.fragment)) {
            let reloadOptions = {
                url: this.options.url,
                guardEvent: up.event.build('up:fragment:poll', { log: 'Polling fragment' })
            };
            u.always(up.reload(this.fragment, reloadOptions), (result) => this.onReloaded(result));
        }
        else {
            up.puts('[up-poll]', 'Polling is disabled');
            let reconsiderDisabledDelay = Math.min(10 * 1000, this.getInterval());
            this.scheduleReload(reconsiderDisabledDelay);
        }
    }
    onReloaded(result) {
        let newFragment = result?.fragments?.[0];
        if (newFragment) {
            this.onFragmentSwapped(newFragment);
        }
        else {
            this.scheduleReload();
        }
    }
    onFragmentSwapped(newFragment) {
        newFragment.upPolling = this;
        delete this.fragment.upPolling;
        this.setFragment(newFragment);
        if (this.state === 'stopped' && this.forceStarted) {
            this.start();
        }
    }
    setFragment(newFragment) {
        this.fragment = newFragment;
        up.destructor(newFragment, () => this.onFragmentDestroyed());
    }
    getInterval() {
        return this.options.interval ?? e.numberAttr(this.fragment, 'up-interval') ?? up.radio.config.pollInterval;
    }
};


/***/ }),
/* 35 */
/***/ (() => {

const u = up.util;
up.FragmentScrolling = class FragmentScrolling extends up.FragmentProcessor {
    keys() {
        return super.keys().concat([
            'hash',
            'mode',
            'revealTop',
            'revealMax',
            'revealSnap',
            'scrollBehavior',
            'scrollSpeed'
        ]);
    }
    constructor(options) {
        up.migrate.handleScrollOptions?.(options);
        super(options);
    }
    process(opt) {
        return super.process(opt) || Promise.resolve();
    }
    processPrimitive(opt) {
        switch (opt) {
            case 'reset':
                return this.reset();
            case 'layer':
                return this.revealLayer();
            case 'main':
                return this.revealSelector(':main');
            case 'restore':
                return this.restore();
            case 'hash':
                return this.hash && up.viewport.revealHash(this.hash, this.attributes());
            case 'target':
            case 'reveal':
            case true:
                return this.revealElement(this.fragment);
            default:
                if (u.isString(opt)) {
                    return this.revealSelector(opt);
                }
        }
    }
    processElement(element) {
        return this.revealElement(element);
    }
    revealElement(element) {
        return up.reveal(element, this.attributes());
    }
    revealSelector(selector) {
        let match = this.findSelector(selector);
        if (match) {
            return this.revealElement(match);
        }
    }
    revealLayer() {
        return this.revealElement(this.layer.getBoxElement());
    }
    reset() {
        return up.viewport.resetScroll({ ...this.attributes(), around: this.fragment });
    }
    restore() {
        return up.viewport.restoreScroll({ ...this.attributes(), around: this.fragment });
    }
};


/***/ }),
/* 36 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.HTMLWrapper = class HTMLWrapper {
    constructor(tagName) {
        this.tagName = tagName;
        const openTag = `<${this.tagName}[^>]*>`;
        const closeTag = `</${this.tagName}>`;
        const innerHTML = "(.|\\s)*?";
        this.pattern = new RegExp(openTag + innerHTML + closeTag, 'ig');
        this.attrName = `up-wrapped-${this.tagName}`;
    }
    strip(html) {
        return html.replace(this.pattern, '');
    }
    wrap(html) {
        return html.replace(this.pattern, this.wrapMatch.bind(this));
    }
    wrapMatch(match) {
        this.didWrap = true;
        return '<meta name="' + this.attrName + '" value="' + u.escapeHTML(match) + '">';
    }
    unwrap(element) {
        if (!this.didWrap) {
            return;
        }
        for (let wrappedChild of element.querySelectorAll(`meta[name='${this.attrName}']`)) {
            const originalHTML = wrappedChild.getAttribute('value');
            const restoredElement = e.createFromHTML(originalHTML);
            e.replace(wrappedChild, restoredElement);
        }
    }
};


/***/ }),
/* 37 */
/***/ (() => {

const e = up.element;
const u = up.util;
up.Layer = class Layer extends up.Record {
    keys() {
        return [
            'element',
            'stack',
            'history',
            'mode',
            'context',
            'lastScrollTops'
        ];
    }
    defaults() {
        return {
            context: {},
            lastScrollTops: new up.Cache({ size: 30, key: up.history.normalizeURL })
        };
    }
    constructor(options = {}) {
        super(options);
        if (!this.mode) {
            throw "missing { mode } option";
        }
    }
    setupHandlers() {
        up.link.convertClicks(this);
    }
    teardownHandlers() { }
    mainTargets() {
        return up.layer.mainTargets(this.mode);
    }
    sync() {
    }
    accept() {
        throw up.error.notImplemented();
    }
    dismiss() {
        throw up.error.notImplemented();
    }
    peel(options) {
        this.stack.peel(this, options);
    }
    evalOption(option) {
        return u.evalOption(option, this);
    }
    isCurrent() {
        return this.stack.isCurrent(this);
    }
    isFront() {
        return this.stack.isFront(this);
    }
    isRoot() {
        return this.stack.isRoot(this);
    }
    isOverlay() {
        return this.stack.isOverlay(this);
    }
    isOpen() {
        return this.stack.isOpen(this);
    }
    isClosed() {
        return this.stack.isClosed(this);
    }
    get parent() {
        return this.stack.parentOf(this);
    }
    get child() {
        return this.stack.childOf(this);
    }
    get ancestors() {
        return this.stack.ancestorsOf(this);
    }
    get descendants() {
        return this.stack.descendantsOf(this);
    }
    get index() {
        return this.stack.indexOf(this);
    }
    getContentElement() {
        return this.contentElement || this.element;
    }
    getBoxElement() {
        return this.boxElement || this.element;
    }
    getFocusElement() {
        return this.getBoxElement();
    }
    getFirstSwappableElement() {
        throw up.error.notImplemented();
    }
    contains(element) {
        return e.closest(element, up.layer.anySelector()) === this.element;
    }
    on(...args) {
        return this.buildEventListenerGroup(args).bind();
    }
    off(...args) {
        return this.buildEventListenerGroup(args).unbind();
    }
    buildEventListenerGroup(args) {
        return up.EventListenerGroup.fromBindArgs(args, {
            guard: (event) => this.containsEventTarget(event),
            elements: [this.element],
            baseLayer: this
        });
    }
    containsEventTarget(event) {
        return this.contains(event.target);
    }
    wasHitByMouseEvent(event) {
        const hittableElement = document.elementFromPoint(event.clientX, event.clientY);
        return !hittableElement || this.contains(hittableElement);
    }
    buildEventEmitter(args) {
        return up.EventEmitter.fromEmitArgs(args, { layer: this });
    }
    emit(...args) {
        return this.buildEventEmitter(args).emit();
    }
    isDetached() {
        return e.isDetached(this.element);
    }
    saveHistory() {
        if (this.isHistoryVisible()) {
            this.savedTitle = document.title;
            this.savedLocation = up.history.location;
        }
    }
    restoreHistory() {
        if (!this.showsLiveHistory()) {
            return;
        }
        if (this.savedLocation) {
            up.history.push(this.savedLocation);
        }
        if (this.savedTitle) {
            document.title = this.savedTitle;
        }
    }
    asCurrent(fn) {
        return this.stack.asCurrent(this, fn);
    }
    updateHistory(options) {
        if (u.isString(options.location)) {
            this.location = options.location;
        }
        if (u.isString(options.title)) {
            this.title = options.title;
        }
    }
    isHistoryVisible() {
        return this.history && (this.isRoot() || this.parent.isHistoryVisible());
    }
    showsLiveHistory() {
        return this.isHistoryVisible() && this.isFront() && (up.history.config.enabled || this.isRoot());
    }
    get title() {
        if (this.showsLiveHistory()) {
            return document.title;
        }
        else {
            return this.savedTitle;
        }
    }
    set title(title) {
        this.savedTitle = title;
        if (this.showsLiveHistory()) {
            document.title = title;
        }
    }
    get location() {
        if (this.showsLiveHistory()) {
            return up.history.location;
        }
        else {
            return this.savedLocation;
        }
    }
    set location(location) {
        const previousLocation = this.location;
        location = up.history.normalizeURL(location);
        if (previousLocation !== location) {
            this.savedLocation = location;
            this.emit('up:layer:location:changed', { location, log: false });
            if (this.showsLiveHistory()) {
                up.history.push(location);
            }
        }
    }
    selector(part) {
        return this.constructor.selector(part);
    }
    static selector(_part) {
        throw up.error.notImplemented();
    }
    toString() {
        throw up.error.notImplemented();
    }
    affix(...args) {
        return e.affix(this.getFirstSwappableElement(), ...args);
    }
    [u.isEqual.key](other) {
        return (this.constructor === other.constructor) && (this.element === other.element);
    }
};


/***/ }),
/* 38 */
/***/ (() => {

const e = up.element;
const u = up.util;
up.Layer.Overlay = class Overlay extends up.Layer {
    keys() {
        return super.keys().concat([
            'position',
            'align',
            'size',
            'origin',
            'class',
            'backdrop',
            'openAnimation',
            'closeAnimation',
            'openDuration',
            'closeDuration',
            'openEasing',
            'closeEasing',
            'backdropOpenAnimation',
            'backdropCloseAnimation',
            'dismissable',
            'dismissLabel',
            'dismissAriaLabel',
            'onOpened',
            'onAccept',
            'onAccepted',
            'onDismiss',
            'onDismissed',
            'acceptEvent',
            'dismissEvent',
            'acceptLocation',
            'dismissLocation',
            'opening'
        ]);
    }
    constructor(options) {
        super(options);
        if (this.dismissable === true) {
            this.dismissable = ['button', 'key', 'outside'];
        }
        else if (this.dismissable === false) {
            this.dismissable = [];
        }
        else {
            this.dismissable = u.splitValues(this.dismissable);
        }
        if (this.acceptLocation) {
            this.acceptLocation = new up.URLPattern(this.acceptLocation);
        }
        if (this.dismissLocation) {
            this.dismissLocation = new up.URLPattern(this.dismissLocation);
        }
    }
    callback(name) {
        let fn = this[name];
        if (fn) {
            return fn.bind(this);
        }
    }
    createElement(parentElement) {
        this.nesting || (this.nesting = this.suggestVisualNesting());
        const elementAttrs = u.compactObject(u.pick(this, ['align', 'position', 'size', 'class', 'nesting']));
        this.element = this.affixPart(parentElement, null, elementAttrs);
    }
    createBackdropElement(parentElement) {
        this.backdropElement = this.affixPart(parentElement, 'backdrop');
    }
    createViewportElement(parentElement) {
        this.viewportElement = this.affixPart(parentElement, 'viewport', { 'up-viewport': '' });
    }
    createBoxElement(parentElement) {
        this.boxElement = this.affixPart(parentElement, 'box');
    }
    createContentElement(parentElement, content) {
        this.contentElement = this.affixPart(parentElement, 'content');
        this.contentElement.appendChild(content);
    }
    createDismissElement(parentElement) {
        this.dismissElement = this.affixPart(parentElement, 'dismiss', {
            'up-dismiss': '":button"',
            'aria-label': this.dismissAriaLabel
        });
        return e.affix(this.dismissElement, 'span[aria-hidden="true"]', { text: this.dismissLabel });
    }
    affixPart(parentElement, part, options = {}) {
        return e.affix(parentElement, this.selector(part), options);
    }
    static selector(part) {
        return u.compact(['up', this.mode, part]).join('-');
    }
    suggestVisualNesting() {
        const { parent } = this;
        if (this.mode === parent.mode) {
            return 1 + parent.suggestVisualNesting();
        }
        else {
            return 0;
        }
    }
    setupHandlers() {
        super.setupHandlers();
        this.overlayFocus = new up.OverlayFocus(this);
        if (this.supportsDismissMethod('button')) {
            this.createDismissElement(this.getBoxElement());
        }
        if (this.supportsDismissMethod('outside')) {
            if (this.viewportElement) {
                up.on(this.viewportElement, 'up:click', event => {
                    if (event.target === this.viewportElement) {
                        this.onOutsideClicked(event, true);
                    }
                });
            }
            else {
                this.unbindParentClicked = this.parent.on('up:click', (event, element) => {
                    const originClicked = this.origin && this.origin.contains(element);
                    this.onOutsideClicked(event, originClicked);
                });
            }
        }
        if (this.supportsDismissMethod('key')) {
            this.unbindEscapePressed = up.event.onEscape(event => this.onEscapePressed(event));
        }
        this.registerClickCloser('up-accept', (value, closeOptions) => {
            this.accept(value, closeOptions);
        });
        this.registerClickCloser('up-dismiss', (value, closeOptions) => {
            this.dismiss(value, closeOptions);
        });
        up.migrate.registerLayerCloser?.(this);
        this.registerEventCloser(this.acceptEvent, this.accept);
        this.registerEventCloser(this.dismissEvent, this.dismiss);
    }
    onOutsideClicked(event, halt) {
        if (halt) {
            up.event.halt(event);
        }
        this.dismiss(':outside', { origin: event.target });
    }
    onEscapePressed(event) {
        if (this.isFront()) {
            let field = up.form.focusedField();
            if (field) {
                field.blur();
            }
            else if (this.supportsDismissMethod('key')) {
                up.event.halt(event);
                this.dismiss(':key');
            }
        }
    }
    registerClickCloser(attribute, closeFn) {
        let selector = `[${attribute}]`;
        this.on('up:click', selector, function (event) {
            up.event.halt(event);
            const origin = e.closest(event.target, selector);
            const value = e.jsonAttr(origin, attribute);
            const closeOptions = { origin };
            const parser = new up.OptionsParser(closeOptions, origin);
            parser.booleanOrString('animation');
            parser.string('easing');
            parser.number('duration');
            parser.string('confirm');
            closeFn(value, closeOptions);
        });
    }
    registerEventCloser(eventTypes, closeFn) {
        if (!eventTypes) {
            return;
        }
        return this.on(eventTypes, event => {
            event.preventDefault();
            closeFn.call(this, event);
        });
    }
    tryAcceptForLocation() {
        this.tryCloseForLocation(this.acceptLocation, this.accept);
    }
    tryDismissForLocation() {
        this.tryCloseForLocation(this.dismissLocation, this.dismiss);
    }
    tryCloseForLocation(urlPattern, closeFn) {
        let location, resolution;
        if (urlPattern && (location = this.location) && (resolution = urlPattern.recognize(location))) {
            const closeValue = { ...resolution, location };
            closeFn.call(this, closeValue);
        }
    }
    teardownHandlers() {
        super.teardownHandlers();
        this.unbindParentClicked?.();
        this.unbindEscapePressed?.();
        this.overlayFocus.teardown();
    }
    destroyElements(options) {
        const animation = () => {
            return this.startCloseAnimation(options);
        };
        const onFinished = () => {
            this.onElementsRemoved();
            options.onFinished?.();
        };
        const destroyOptions = { ...options, animation, onFinished, log: false };
        up.destroy(this.element, destroyOptions);
    }
    onElementsRemoved() { }
    startAnimation(options = {}) {
        const boxDone = up.animate(this.getBoxElement(), options.boxAnimation, options);
        let backdropDone;
        if (this.backdrop && !up.motion.isNone(options.boxAnimation)) {
            backdropDone = up.animate(this.backdropElement, options.backdropAnimation, options);
        }
        return Promise.all([boxDone, backdropDone]);
    }
    startOpenAnimation(options = {}) {
        return this.startAnimation({
            boxAnimation: options.animation ?? this.evalOption(this.openAnimation),
            backdropAnimation: 'fade-in',
            easing: options.easing || this.openEasing,
            duration: options.duration || this.openDuration
        }).then(() => {
            return this.wasEverVisible = true;
        });
    }
    startCloseAnimation(options = {}) {
        const boxAnimation = this.wasEverVisible && (options.animation ?? this.evalOption(this.closeAnimation));
        return this.startAnimation({
            boxAnimation,
            backdropAnimation: 'fade-out',
            easing: options.easing || this.closeEasing,
            duration: options.duration || this.closeDuration
        });
    }
    accept(value = null, options = {}) {
        return this.executeCloseChange('accept', value, options);
    }
    dismiss(value = null, options = {}) {
        return this.executeCloseChange('dismiss', value, options);
    }
    supportsDismissMethod(method) {
        return u.contains(this.dismissable, method);
    }
    executeCloseChange(verb, value, options) {
        options = { ...options, verb, value, layer: this };
        return new up.Change.CloseLayer(options).execute();
    }
    getFirstSwappableElement() {
        return this.getContentElement().children[0];
    }
    toString() {
        return `${this.mode} overlay`;
    }
};


/***/ }),
/* 39 */
/***/ (() => {

up.Layer.OverlayWithTether = class OverlayWithTether extends up.Layer.Overlay {
    createElements(content) {
        if (!this.origin) {
            up.fail('Missing { origin } option');
        }
        this.tether = new up.Tether({
            anchor: this.origin,
            align: this.align,
            position: this.position
        });
        this.createElement(this.tether.parent);
        this.createContentElement(this.element, content);
        this.tether.start(this.element);
    }
    onElementsRemoved() {
        this.tether.stop();
    }
    sync() {
        if (this.isOpen()) {
            if (this.isDetached() || this.tether.isDetached()) {
                this.dismiss(':detached', {
                    animation: false,
                    preventable: false
                });
            }
            else {
                this.tether.sync();
            }
        }
    }
};


/***/ }),
/* 40 */
/***/ (() => {

var _a;
up.Layer.OverlayWithViewport = (_a = class OverlayWithViewport extends up.Layer.Overlay {
        static getParentElement() {
            return document.body;
        }
        createElements(content) {
            this.shiftBody();
            this.createElement(this.constructor.getParentElement());
            if (this.backdrop) {
                this.createBackdropElement(this.element);
            }
            this.createViewportElement(this.element);
            this.createBoxElement(this.viewportElement);
            this.createContentElement(this.boxElement, content);
        }
        onElementsRemoved() {
            this.unshiftBody();
        }
        shiftBody() {
            this.constructor.bodyShifter.shift();
        }
        unshiftBody() {
            this.constructor.bodyShifter.unshift();
        }
        sync() {
            if (this.isDetached() && this.isOpen()) {
                this.constructor.getParentElement().appendChild(this.element);
            }
        }
    },
    _a.bodyShifter = new up.BodyShifter(),
    _a);


/***/ }),
/* 41 */
/***/ (() => {

var _a;
const u = up.util;
const e = up.element;
up.Layer.Root = (_a = class Root extends up.Layer {
        constructor(options) {
            super(options);
            this.setupHandlers();
        }
        get element() {
            return e.root;
        }
        getFirstSwappableElement() {
            return document.body;
        }
        static selector() {
            return 'html';
        }
        setupHandlers() {
            if (!this.element.upHandlersApplied) {
                this.element.upHandlersApplied = true;
                super.setupHandlers();
            }
        }
        sync() {
            this.setupHandlers();
        }
        accept() {
            this.cannotCloseRoot();
        }
        dismiss() {
            this.cannotCloseRoot();
        }
        cannotCloseRoot() {
            throw up.error.failed('Cannot close the root layer');
        }
        reset() {
            u.assign(this, this.defaults());
        }
        toString() {
            return "root layer";
        }
    },
    _a.mode = 'root',
    _a);


/***/ }),
/* 42 */
/***/ (() => {

var _a;
up.Layer.Modal = (_a = class Modal extends up.Layer.OverlayWithViewport {
    },
    _a.mode = 'modal',
    _a);


/***/ }),
/* 43 */
/***/ (() => {

var _a;
up.Layer.Popup = (_a = class Popup extends up.Layer.OverlayWithTether {
    },
    _a.mode = 'popup',
    _a);


/***/ }),
/* 44 */
/***/ (() => {

var _a;
up.Layer.Drawer = (_a = class Drawer extends up.Layer.OverlayWithViewport {
    },
    _a.mode = 'drawer',
    _a);


/***/ }),
/* 45 */
/***/ (() => {

var _a;
up.Layer.Cover = (_a = class Cover extends up.Layer.OverlayWithViewport {
    },
    _a.mode = 'cover',
    _a);


/***/ }),
/* 46 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.LayerLookup = class LayerLookup {
    constructor(stack, ...args) {
        this.stack = stack;
        const options = u.parseArgIntoOptions(args, 'layer');
        if (options.normalizeLayerOptions !== false) {
            up.layer.normalizeOptions(options);
        }
        this.values = u.splitValues(options.layer);
        this.origin = options.origin;
        this.baseLayer = options.baseLayer || this.originLayer() || this.stack.current;
        if (u.isString(this.baseLayer)) {
            const recursiveOptions = { ...options, baseLayer: this.stack.current, normalizeLayerOptions: false };
            this.baseLayer = new this.constructor(this.stack, this.baseLayer, recursiveOptions).first();
        }
    }
    originLayer() {
        if (this.origin) {
            return this.forElement(this.origin);
        }
    }
    first() {
        return this.all()[0];
    }
    all() {
        let results = u.flatMap(this.values, value => this.resolveValue(value));
        results = u.compact(results);
        results = u.uniq(results);
        return results;
    }
    forElement(element) {
        element = e.get(element);
        return u.find(this.stack.reversed(), layer => layer.contains(element));
    }
    forIndex(value) {
        return this.stack[value];
    }
    resolveValue(value) {
        if (value instanceof up.Layer) {
            return value;
        }
        if (u.isNumber(value)) {
            return this.forIndex(value);
        }
        if (/^\d+$/.test(value)) {
            return this.forIndex(Number(value));
        }
        if (u.isElementish(value)) {
            return this.forElement(value);
        }
        switch (value) {
            case 'any':
                return [this.baseLayer, ...this.stack.reversed()];
            case 'current':
                return this.baseLayer;
            case 'closest':
                return this.stack.selfAndAncestorsOf(this.baseLayer);
            case 'parent':
                return this.baseLayer.parent;
            case 'ancestor':
            case 'ancestors':
                return this.baseLayer.ancestors;
            case 'child':
                return this.baseLayer.child;
            case 'descendant':
            case 'descendants':
                return this.baseLayer.descendants;
            case 'new':
                return 'new';
            case 'root':
                return this.stack.root;
            case 'overlay':
            case 'overlays':
                return u.reverse(this.stack.overlays);
            case 'front':
                return this.stack.front;
            case 'origin':
                return this.originLayer();
            default:
                return up.fail("Unknown { layer } option: %o", value);
        }
    }
};


/***/ }),
/* 47 */
/***/ (() => {

const u = up.util;
up.LayerStack = class LayerStack extends Array {
    constructor() {
        super();
        Object.setPrototypeOf(this, up.LayerStack.prototype);
        this.currentOverrides = [];
        this.push(this.buildRoot());
    }
    buildRoot() {
        return up.layer.build({ mode: 'root', stack: this });
    }
    remove(layer) {
        u.remove(this, layer);
    }
    peel(layer, options) {
        const descendants = u.reverse(layer.descendants);
        const dismissOptions = { ...options, preventable: false };
        for (let descendant of descendants) {
            descendant.dismiss(':peel', dismissOptions);
        }
    }
    reset() {
        this.peel(this.root, { animation: false });
        this.currentOverrides = [];
        this.root.reset();
    }
    isOpen(layer) {
        return layer.index >= 0;
    }
    isClosed(layer) {
        return !this.isOpen(layer);
    }
    parentOf(layer) {
        return this[layer.index - 1];
    }
    childOf(layer) {
        return this[layer.index + 1];
    }
    ancestorsOf(layer) {
        return u.reverse(this.slice(0, layer.index));
    }
    selfAndAncestorsOf(layer) {
        return [layer, ...layer.ancestors];
    }
    descendantsOf(layer) {
        return this.slice(layer.index + 1);
    }
    isRoot(layer) {
        return this[0] === layer;
    }
    isOverlay(layer) {
        return !this.isRoot(layer);
    }
    isCurrent(layer) {
        return this.current === layer;
    }
    isFront(layer) {
        return this.front === layer;
    }
    get(...args) {
        return this.getAll(...args)[0];
    }
    getAll(...args) {
        return new up.LayerLookup(this, ...args).all();
    }
    sync() {
        for (let layer of this) {
            layer.sync();
        }
    }
    asCurrent(layer, fn) {
        try {
            this.currentOverrides.push(layer);
            return fn();
        }
        finally {
            this.currentOverrides.pop();
        }
    }
    reversed() {
        return u.reverse(this);
    }
    dismissOverlays(value = null, options = {}) {
        options.dismissable = false;
        for (let overlay of u.reverse(this.overlays)) {
            overlay.dismiss(value, options);
        }
    }
    [u.copy.key]() {
        return u.copyArrayLike(this);
    }
    get count() {
        return this.length;
    }
    get root() {
        return this[0];
    }
    get overlays() {
        return this.root.descendants;
    }
    get current() {
        return u.last(this.currentOverrides) || this.front;
    }
    get front() {
        return u.last(this);
    }
};


/***/ }),
/* 48 */
/***/ (() => {

up.LinkFeedbackURLs = class LinkFeedbackURLs {
    constructor(link) {
        const normalize = up.feedback.normalizeURL;
        this.isSafe = up.link.isSafe(link);
        if (this.isSafe) {
            const href = link.getAttribute('href');
            if (href && (href !== '#')) {
                this.href = normalize(href);
            }
            const upHREF = link.getAttribute('up-href');
            if (upHREF) {
                this.upHREF = normalize(upHREF);
            }
            const alias = link.getAttribute('up-alias');
            if (alias) {
                this.aliasPattern = new up.URLPattern(alias, normalize);
            }
        }
    }
    isCurrent(normalizedLocation) {
        return this.isSafe && !!((this.href && (this.href === normalizedLocation)) ||
            (this.upHREF && (this.upHREF === normalizedLocation)) ||
            (this.aliasPattern && this.aliasPattern.test(normalizedLocation, false)));
    }
};


/***/ }),
/* 49 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.LinkPreloader = class LinkPreloader {
    constructor() {
        this.considerPreload = this.considerPreload.bind(this);
    }
    observeLink(link) {
        if (up.link.isSafe(link)) {
            this.on(link, 'mouseenter', event => this.considerPreload(event, true));
            this.on(link, 'mousedown touchstart', event => this.considerPreload(event));
            this.on(link, 'mouseleave', event => this.stopPreload(event));
        }
    }
    on(link, eventTypes, callback) {
        up.on(link, eventTypes, { passive: true }, callback);
    }
    considerPreload(event, applyDelay) {
        const link = event.target;
        if (link !== this.currentLink) {
            this.reset();
            this.currentLink = link;
            if (up.link.shouldFollowEvent(event, link)) {
                if (applyDelay) {
                    this.preloadAfterDelay(link);
                }
                else {
                    this.preloadNow(link);
                }
            }
        }
    }
    stopPreload(event) {
        if (event.target === this.currentLink) {
            return this.reset();
        }
    }
    reset() {
        if (!this.currentLink) {
            return;
        }
        clearTimeout(this.timer);
        if (this.currentRequest?.preload) {
            this.currentRequest.abort();
        }
        this.currentLink = undefined;
        this.currentRequest = undefined;
    }
    preloadAfterDelay(link) {
        const delay = e.numberAttr(link, 'up-delay') ?? up.link.config.preloadDelay;
        this.timer = u.timer(delay, () => this.preloadNow(link));
    }
    preloadNow(link) {
        if (e.isDetached(link)) {
            this.reset();
            return;
        }
        const onQueued = request => { return this.currentRequest = request; };
        up.log.muteUncriticalRejection(up.link.preload(link, { onQueued }));
        this.queued = true;
    }
};


/***/ }),
/* 50 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.MotionController = class MotionController {
    constructor(name) {
        this.activeClass = `up-${name}`;
        this.dataKey = `up-${name}-finished`;
        this.selector = `.${this.activeClass}`;
        this.finishEvent = `up:${name}:finish`;
        this.finishCount = 0;
        this.clusterCount = 0;
    }
    async startFunction(cluster, startMotion, memory = {}) {
        cluster = e.list(cluster);
        const mutedAnimator = () => up.log.muteUncriticalRejection(startMotion());
        memory.trackMotion = memory.trackMotion ?? up.motion.isEnabled();
        if (memory.trackMotion === false) {
            await u.microtask(mutedAnimator);
        }
        else {
            memory.trackMotion = false;
            await this.finish(cluster);
            let promise = this.whileForwardingFinishEvent(cluster, mutedAnimator);
            this.markCluster(cluster, promise);
            promise = promise.then(() => this.unmarkCluster(cluster));
            return await promise;
        }
    }
    startMotion(cluster, motion, memory = {}) {
        const start = () => motion.start();
        const finish = () => motion.finish();
        const unbindFinish = up.on(cluster, this.finishEvent, finish);
        let promise = this.startFunction(cluster, start, memory);
        promise = promise.then(unbindFinish);
        return promise;
    }
    finish(elements) {
        this.finishCount++;
        if ((this.clusterCount === 0) || !up.motion.isEnabled()) {
            return Promise.resolve();
        }
        elements = this.expandFinishRequest(elements);
        const allFinished = u.map(elements, this.finishOneElement.bind(this));
        return Promise.all(allFinished);
    }
    expandFinishRequest(elements) {
        if (elements) {
            return u.flatMap(elements, el => e.list(e.closest(el, this.selector), e.all(el, this.selector)));
        }
        else {
            return e.all(this.selector);
        }
    }
    isActive(element) {
        return element.classList.contains(this.activeClass);
    }
    finishOneElement(element) {
        this.emitFinishEvent(element);
        return this.whenElementFinished(element);
    }
    emitFinishEvent(element, eventAttrs = {}) {
        eventAttrs = { target: element, log: false, ...eventAttrs };
        return up.emit(this.finishEvent, eventAttrs);
    }
    whenElementFinished(element) {
        return element[this.dataKey] || Promise.resolve();
    }
    markCluster(cluster, promise) {
        this.clusterCount++;
        for (let element of cluster) {
            element.classList.add(this.activeClass);
            element[this.dataKey] = promise;
        }
    }
    unmarkCluster(cluster) {
        this.clusterCount--;
        for (let element of cluster) {
            element.classList.remove(this.activeClass);
            delete element[this.dataKey];
        }
    }
    whileForwardingFinishEvent(cluster, fn) {
        if (cluster.length < 2) {
            return fn();
        }
        const doForward = (event) => {
            if (!event.forwarded) {
                for (let element of cluster) {
                    if (element !== event.target && this.isActive(element)) {
                        this.emitFinishEvent(element, { forwarded: true });
                    }
                }
            }
        };
        const unbindFinish = up.on(cluster, this.finishEvent, doForward);
        return fn().then(unbindFinish);
    }
    async reset() {
        await this.finish();
        this.finishCount = 0;
        this.clusterCount = 0;
    }
};


/***/ }),
/* 51 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.NonceableCallback = class NonceableCallback {
    constructor(script, nonce) {
        this.script = script;
        this.nonce = nonce;
    }
    static fromString(string) {
        let match = string.match(/^(nonce-([^\s]+)\s)?(.*)$/);
        return new this(match[3], match[2]);
    }
    toFunction(...argNames) {
        if (up.browser.canEval()) {
            return new Function(...argNames, this.script);
        }
        else if (this.nonce) {
            let callbackThis = this;
            return function (...args) {
                return callbackThis.runAsNoncedFunction(this, argNames, args);
            };
        }
        else {
            return this.cannotRun.bind(this);
        }
    }
    toString() {
        return `nonce-${this.nonce} ${this.script}`;
    }
    cannotRun() {
        throw new Error(`Your Content Security Policy disallows inline JavaScript (${this.script}). See https://unpoly.com/csp for solutions.`);
    }
    runAsNoncedFunction(thisArg, argNames, args) {
        let wrappedScript = `
      try {
        up.noncedEval.value = (function(${argNames.join(',')}) {
          ${this.script}
        }).apply(up.noncedEval.thisArg, up.noncedEval.args)
      } catch (error) {
        up.noncedEval.error = error
      }
    `;
        let script;
        try {
            up.noncedEval = { args, thisArg: thisArg };
            script = up.element.affix(document.body, 'script', { nonce: this.nonce, text: wrappedScript });
            if (up.noncedEval.error) {
                throw up.noncedEval.error;
            }
            else {
                return up.noncedEval.value;
            }
        }
        finally {
            up.noncedEval = undefined;
            if (script) {
                up.element.remove(script);
            }
        }
    }
    allowedBy(allowedNonces) {
        return this.nonce && u.contains(allowedNonces, this.nonce);
    }
    static adoptNonces(element, allowedNonces) {
        if (!allowedNonces?.length) {
            return;
        }
        const getPageNonce = u.memoize(up.protocol.cspNonce);
        u.each(up.protocol.config.nonceableAttributes, (attribute) => {
            let matches = e.subtree(element, `[${attribute}^="nonce-"]`);
            u.each(matches, (match) => {
                let attributeValue = match.getAttribute(attribute);
                let callback = this.fromString(attributeValue);
                let warn = (message, ...args) => up.log.warn('up.render()', `Cannot use callback [${attribute}="${attributeValue}"]: ${message}`, ...args);
                if (!callback.allowedBy(allowedNonces)) {
                    return warn("Callback's CSP nonce (%o) does not match response header (%o)", callback.nonce, allowedNonces);
                }
                let pageNonce = getPageNonce();
                if (!pageNonce) {
                    return warn("Current page's CSP nonce is unknown");
                }
                callback.nonce = pageNonce;
                match.setAttribute(attribute, callback.toString());
            });
        });
    }
};


/***/ }),
/* 52 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.OptionsParser = class OptionsParser {
    constructor(options, element, parserOptions) {
        this.options = options;
        this.element = element;
        this.fail = parserOptions?.fail;
    }
    string(key, keyOptions) {
        this.parse(e.attr, key, keyOptions);
    }
    boolean(key, keyOptions) {
        this.parse(e.booleanAttr, key, keyOptions);
    }
    number(key, keyOptions) {
        this.parse(e.numberAttr, key, keyOptions);
    }
    booleanOrString(key, keyOptions) {
        this.parse(e.booleanOrStringAttr, key, keyOptions);
    }
    json(key, keyOptions) {
        this.parse(e.jsonAttr, key, keyOptions);
    }
    parse(attrValueFn, key, keyOptions = {}) {
        const attrNames = u.wrapList(keyOptions.attr ?? this.attrNameForKey(key));
        let value = this.options[key];
        if (this.element) {
            for (let attrName of attrNames) {
                value ?? (value = attrValueFn(this.element, attrName));
            }
        }
        value ?? (value = keyOptions.default);
        let normalizeFn = keyOptions.normalize;
        if (normalizeFn) {
            value = normalizeFn(value);
        }
        if (u.isDefined(value)) {
            this.options[key] = value;
        }
        let failKey;
        if ((keyOptions.fail || this.fail) && (failKey = up.fragment.failKey(key))) {
            const failAttrNames = u.compact(u.map(attrNames, this.deriveFailAttrName));
            const failKeyOptions = {
                ...keyOptions,
                attr: failAttrNames,
                fail: false
            };
            this.parse(attrValueFn, failKey, failKeyOptions);
        }
    }
    deriveFailAttrName(attr) {
        if (attr.indexOf('up-') === 0) {
            return `up-fail-${attr.slice(3)}`;
        }
    }
    attrNameForKey(option) {
        return `up-${u.camelToKebabCase(option)}`;
    }
};


/***/ }),
/* 53 */
/***/ (() => {

const e = up.element;
const u = up.util;
up.OverlayFocus = class OverlayFocus {
    constructor(layer) {
        this.layer = layer;
        this.focusElement = this.layer.getFocusElement();
    }
    moveToFront() {
        if (this.enabled) {
            return;
        }
        this.enabled = true;
        this.untrapFocus = up.on('focusin', event => this.onFocus(event));
        this.unsetAttrs = e.setTemporaryAttrs(this.focusElement, {
            'tabindex': '0',
            'role': 'dialog',
            'aria-modal': 'true'
        });
        this.focusTrapBefore = e.affix(this.focusElement, 'beforebegin', 'up-focus-trap[tabindex=0]');
        this.focusTrapAfter = e.affix(this.focusElement, 'afterend', 'up-focus-trap[tabindex=0]');
    }
    moveToBack() {
        this.teardown();
    }
    teardown() {
        if (!this.enabled) {
            return;
        }
        this.enabled = false;
        this.untrapFocus();
        this.unsetAttrs();
        e.remove(this.focusTrapBefore);
        e.remove(this.focusTrapAfter);
    }
    onFocus(event) {
        const { target } = event;
        if (this.processingFocusEvent) {
            return;
        }
        this.processingFocusEvent = true;
        if (target === this.focusTrapBefore) {
            this.focusEnd();
        }
        else if ((target === this.focusTrapAfter) || !this.layer.contains(target)) {
            this.focusStart();
        }
        this.processingFocusEvent = false;
    }
    focusStart(focusOptions) {
        up.focus(this.focusElement, focusOptions);
    }
    focusEnd() {
        this.focusLastDescendant(this.layer.getBoxElement()) || this.focusStart();
    }
    focusLastDescendant(element) {
        for (let child of u.reverse(element.children)) {
            if (up.viewport.tryFocus(child) || this.focusLastDescendant(child)) {
                return true;
            }
        }
    }
};


/***/ }),
/* 54 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.Params = class Params {
    constructor(raw) {
        this.clear();
        this.addAll(raw);
    }
    clear() {
        this.entries = [];
    }
    [u.copy.key]() {
        return new up.Params(this);
    }
    toObject() {
        const obj = {};
        for (let entry of this.entries) {
            const { name, value } = entry;
            if (!u.isBasicObjectProperty(name)) {
                if (this.isArrayKey(name)) {
                    obj[name] || (obj[name] = []);
                    obj[name].push(value);
                }
                else {
                    obj[name] = value;
                }
            }
        }
        return obj;
    }
    toArray() {
        return this.entries;
    }
    toFormData() {
        const formData = new FormData();
        for (let entry of this.entries) {
            formData.append(entry.name, entry.value);
        }
        if (!formData.entries) {
            formData.originalArray = this.entries;
        }
        return formData;
    }
    toQuery() {
        let parts = u.map(this.entries, this.arrayEntryToQuery.bind(this));
        parts = u.compact(parts);
        return parts.join('&');
    }
    arrayEntryToQuery(entry) {
        const { value } = entry;
        if (this.isBinaryValue(value)) {
            return;
        }
        let query = encodeURIComponent(entry.name);
        if (u.isGiven(value)) {
            query += "=";
            query += encodeURIComponent(value);
        }
        return query;
    }
    isBinaryValue(value) {
        return value instanceof Blob;
    }
    hasBinaryValues() {
        const values = u.map(this.entries, 'value');
        return u.some(values, this.isBinaryValue);
    }
    toURL(base) {
        let parts = [base, this.toQuery()];
        parts = u.filter(parts, u.isPresent);
        const separator = u.contains(base, '?') ? '&' : '?';
        return parts.join(separator);
    }
    add(name, value) {
        this.entries.push({ name, value });
    }
    addAll(raw) {
        if (u.isMissing(raw)) {
        }
        else if (raw instanceof this.constructor) {
            this.entries.push(...raw.entries);
        }
        else if (u.isArray(raw)) {
            this.entries.push(...raw);
        }
        else if (u.isString(raw)) {
            this.addAllFromQuery(raw);
        }
        else if (u.isFormData(raw)) {
            this.addAllFromFormData(raw);
        }
        else if (u.isObject(raw)) {
            this.addAllFromObject(raw);
        }
        else {
            up.fail("Unsupport params type: %o", raw);
        }
    }
    addAllFromObject(object) {
        for (let key in object) {
            const value = object[key];
            const valueElements = u.isArray(value) ? value : [value];
            for (let valueElement of valueElements) {
                this.add(key, valueElement);
            }
        }
    }
    addAllFromQuery(query) {
        for (let part of query.split('&')) {
            if (part) {
                let [name, value] = part.split('=');
                name = decodeURIComponent(name);
                if (u.isGiven(value)) {
                    value = decodeURIComponent(value);
                }
                else {
                    value = null;
                }
                this.add(name, value);
            }
        }
    }
    addAllFromFormData(formData) {
        u.eachIterator(formData.entries(), value => {
            this.add(...value);
        });
    }
    set(name, value) {
        this.delete(name);
        this.add(name, value);
    }
    delete(name) {
        this.entries = u.reject(this.entries, this.matchEntryFn(name));
    }
    matchEntryFn(name) {
        return entry => entry.name === name;
    }
    get(name) {
        if (this.isArrayKey(name)) {
            return this.getAll(name);
        }
        else {
            return this.getFirst(name);
        }
    }
    getFirst(name) {
        const entry = u.find(this.entries, this.matchEntryFn(name));
        return entry?.value;
    }
    getAll(name) {
        if (this.isArrayKey(name)) {
            return this.getAll(name);
        }
        else {
            const entries = u.map(this.entries, this.matchEntryFn(name));
            return u.map(entries, 'value');
        }
    }
    isArrayKey(key) {
        return u.endsWith(key, '[]');
    }
    [u.isBlank.key]() {
        return this.entries.length === 0;
    }
    static fromForm(form) {
        form = up.fragment.get(form);
        return this.fromFields(up.form.fields(form));
    }
    static fromFields(fields) {
        const params = new (this)();
        for (let field of u.wrapList(fields)) {
            params.addField(field);
        }
        return params;
    }
    addField(field) {
        field = e.get(field);
        let name = field.name;
        if (name && !field.disabled) {
            const { tagName } = field;
            const { type } = field;
            if (tagName === 'SELECT') {
                for (let option of field.querySelectorAll('option')) {
                    if (option.selected) {
                        this.add(name, option.value);
                    }
                }
            }
            else if ((type === 'checkbox') || (type === 'radio')) {
                if (field.checked) {
                    this.add(name, field.value);
                }
            }
            else if (type === 'file') {
                for (let file of field.files) {
                    this.add(name, file);
                }
            }
            else {
                return this.add(name, field.value);
            }
        }
    }
    [u.isEqual.key](other) {
        return (this.constructor === other.constructor) && u.isEqual(this.entries, other.entries);
    }
    static fromURL(url) {
        const params = new (this)();
        const urlParts = u.parseURL(url);
        let query = urlParts.search;
        if (query) {
            query = query.replace(/^\?/, '');
            params.addAll(query);
        }
        return params;
    }
    static stripURL(url) {
        return u.normalizeURL(url, { search: false });
    }
};


/***/ }),
/* 55 */
/***/ (() => {

const e = up.element;
const TRANSITION_DELAY = 300;
up.ProgressBar = class ProgressBar {
    constructor() {
        this.step = 0;
        this.element = e.affix(document.body, 'up-progress-bar');
        this.element.style.transition = `width ${TRANSITION_DELAY}ms ease-out`;
        this.moveTo(0);
        up.element.paint(this.element);
        this.width = 31;
        this.nextStep();
    }
    nextStep() {
        let diff;
        if (this.width < 80) {
            if (Math.random() < 0.15) {
                diff = 7 + (5 * Math.random());
            }
            else {
                diff = 1.5 + (0.5 * Math.random());
            }
        }
        else {
            diff = 0.13 * (100 - this.width) * Math.random();
        }
        this.moveTo(this.width + diff);
        this.step++;
        const nextStepDelay = TRANSITION_DELAY + (this.step * 40);
        this.timeout = setTimeout(this.nextStep.bind(this), nextStepDelay);
    }
    moveTo(width) {
        this.width = width;
        this.element.style.width = `${width}vw`;
    }
    destroy() {
        clearTimeout(this.timeout);
        e.remove(this.element);
    }
    conclude() {
        clearTimeout(this.timeout);
        this.moveTo(100);
        setTimeout(this.destroy.bind(this), TRANSITION_DELAY);
    }
};


/***/ }),
/* 56 */
/***/ (() => {

const u = up.util;
up.RenderOptions = (function () {
    const GLOBAL_DEFAULTS = {
        hungry: true,
        keep: true,
        source: true,
        saveScroll: true,
        fail: 'auto'
    };
    const PRELOAD_OVERRIDES = {
        solo: false,
        confirm: false,
        feedback: false
    };
    const PREFLIGHT_KEYS = [
        'url',
        'method',
        'origin',
        'headers',
        'params',
        'cache',
        'clearCache',
        'fallback',
        'solo',
        'confirm',
        'feedback',
        'origin',
        'baseLayer',
        'fail',
    ];
    const SHARED_KEYS = PREFLIGHT_KEYS.concat([
        'keep',
        'hungry',
        'history',
        'source',
        'saveScroll',
        'navigate'
    ]);
    const CONTENT_KEYS = [
        'url',
        'content',
        'fragment',
        'document'
    ];
    const LATE_KEYS = [
        'history',
        'focus',
        'scroll'
    ];
    function navigateDefaults(options) {
        if (options.navigate) {
            return up.fragment.config.navigateOptions;
        }
    }
    function preloadOverrides(options) {
        if (options.preload) {
            return PRELOAD_OVERRIDES;
        }
    }
    function preprocess(options) {
        up.migrate.preprocessRenderOptions?.(options);
        const defaults = u.merge(GLOBAL_DEFAULTS, navigateDefaults(options));
        return u.merge(u.omit(defaults, LATE_KEYS), { defaults }, options, preloadOverrides(options));
    }
    function finalize(preprocessedOptions, lateDefaults) {
        return u.merge(preprocessedOptions.defaults, lateDefaults, preprocessedOptions);
    }
    function assertContentGiven(options) {
        if (!u.some(CONTENT_KEYS, contentKey => u.isGiven(options[contentKey]))) {
            if (options.defaultToEmptyContent) {
                options.content = '';
            }
            else {
                up.fail('up.render() needs either { ' + CONTENT_KEYS.join(', ') + ' } option');
            }
        }
    }
    function failOverrides(options) {
        const overrides = {};
        for (let key in options) {
            const value = options[key];
            let unprefixed = up.fragment.successKey(key);
            if (unprefixed) {
                overrides[unprefixed] = value;
            }
        }
        return overrides;
    }
    function deriveFailOptions(preprocessedOptions) {
        return u.merge(preprocessedOptions.defaults, u.pick(preprocessedOptions, SHARED_KEYS), failOverrides(preprocessedOptions));
    }
    return {
        preprocess,
        finalize,
        assertContentGiven,
        deriveFailOptions,
    };
})();


/***/ }),
/* 57 */
/***/ (() => {

up.RenderResult = class RenderResult extends up.Record {
    keys() {
        return [
            'fragments',
            'layer',
        ];
    }
};


/***/ }),
/* 58 */
/***/ (() => {

const u = up.util;
up.Request = class Request extends up.Record {
    keys() {
        return [
            'method',
            'url',
            'hash',
            'params',
            'target',
            'failTarget',
            'headers',
            'timeout',
            'preload',
            'cache',
            'clearCache',
            'layer',
            'mode',
            'context',
            'failLayer',
            'failMode',
            'failContext',
            'origin',
            'solo',
            'queueTime',
            'wrapMethod',
            'contentType',
            'payload',
            'onQueued'
        ];
    }
    constructor(options) {
        super(options);
        this.params = new up.Params(this.params);
        this.headers || (this.headers = {});
        if (this.preload) {
            this.cache = true;
        }
        if (this.wrapMethod == null) {
            this.wrapMethod = up.network.config.wrapMethod;
        }
        this.normalizeForCaching();
        if (!options.basic) {
            const layerLookupOptions = { origin: this.origin };
            this.layer = up.layer.get(this.layer, layerLookupOptions);
            this.failLayer = up.layer.get(this.failLayer || this.layer, layerLookupOptions);
            this.context || (this.context = this.layer.context || {});
            this.failContext || (this.failContext = this.failLayer.context || {});
            this.mode || (this.mode = this.layer.mode);
            this.failMode || (this.failMode = this.failLayer.mode);
            this.deferred = u.newDeferred();
            this.state = 'new';
        }
    }
    get xhr() {
        return this._xhr ?? (this._xhr = new XMLHttpRequest());
    }
    followState(sourceRequest) {
        u.delegate(this, ['deferred', 'state', 'preload'], () => sourceRequest);
    }
    normalizeForCaching() {
        this.method = u.normalizeMethod(this.method);
        this.extractHashFromURL();
        this.transferParamsToURL();
        this.url = u.normalizeURL(this.url);
    }
    evictExpensiveAttrs() {
        u.task(() => {
            this.layer = undefined;
            this.failLayer = undefined;
            return this.origin = undefined;
        });
    }
    extractHashFromURL() {
        let match = this.url?.match(/^([^#]*)(#.+)$/);
        if (match) {
            this.url = match[1];
            return this.hash = match[2];
        }
    }
    transferParamsToURL() {
        if (!this.url || this.allowsPayload() || u.isBlank(this.params)) {
            return;
        }
        this.url = this.params.toURL(this.url);
        this.params.clear();
    }
    isSafe() {
        return up.network.isSafeMethod(this.method);
    }
    allowsPayload() {
        return u.methodAllowsPayload(this.method);
    }
    will302RedirectWithGET() {
        return this.isSafe() || (this.method === 'POST');
    }
    willCache() {
        if (this.cache === 'auto') {
            return up.network.config.autoCache(this);
        }
        else {
            return this.cache;
        }
    }
    runQueuedCallbacks() {
        u.always(this, () => this.evictExpensiveAttrs());
        this.onQueued?.(this);
    }
    load() {
        if (this.state !== 'new') {
            return;
        }
        this.state = 'loading';
        new up.Request.XHRRenderer(this).buildAndSend({
            onload: () => this.onXHRLoad(),
            onerror: () => this.onXHRError(),
            ontimeout: () => this.onXHRTimeout(),
            onabort: () => this.onXHRAbort()
        });
    }
    loadPage() {
        up.network.abort();
        new up.Request.FormRenderer(this).buildAndSubmit();
    }
    onXHRLoad() {
        const response = this.extractResponseFromXHR();
        const log = ['Server responded HTTP %d to %s %s (%d characters)', response.status, this.method, this.url, response.text.length];
        this.emit('up:request:loaded', { request: response.request, response, log });
        this.respondWith(response);
    }
    onXHRError() {
        const log = 'Fatal error during request';
        this.deferred.reject(up.error.failed(log));
        this.emit('up:request:fatal', { log });
    }
    onXHRTimeout() {
        this.setAbortedState('Requested timed out');
    }
    onXHRAbort() {
        this.setAbortedState();
    }
    abort() {
        if (this.setAbortedState() && this._xhr) {
            this._xhr.abort();
        }
    }
    setAbortedState(reason = ["Request to %s %s was aborted", this.method, this.url]) {
        if ((this.state !== 'new') && (this.state !== 'loading')) {
            return;
        }
        this.state = 'aborted';
        this.emit('up:request:aborted', { log: reason });
        this.deferred.reject(up.error.aborted(reason));
        return true;
    }
    respondWith(response) {
        if (this.state !== 'loading') {
            return;
        }
        this.state = 'loaded';
        if (response.ok) {
            return this.deferred.resolve(response);
        }
        else {
            return this.deferred.reject(response);
        }
    }
    csrfHeader() {
        return up.protocol.csrfHeader();
    }
    csrfParam() {
        return up.protocol.csrfParam();
    }
    csrfToken() {
        if (!this.isSafe() && !this.isCrossOrigin()) {
            return up.protocol.csrfToken();
        }
    }
    isCrossOrigin() {
        return u.isCrossOrigin(this.url);
    }
    extractResponseFromXHR() {
        const responseAttrs = {
            method: this.method,
            url: this.url,
            request: this,
            xhr: this.xhr,
            text: this.xhr.responseText,
            status: this.xhr.status,
            title: up.protocol.titleFromXHR(this.xhr),
            target: up.protocol.targetFromXHR(this.xhr),
            acceptLayer: up.protocol.acceptLayerFromXHR(this.xhr),
            dismissLayer: up.protocol.dismissLayerFromXHR(this.xhr),
            eventPlans: up.protocol.eventPlansFromXHR(this.xhr),
            context: up.protocol.contextFromXHR(this.xhr),
            clearCache: up.protocol.clearCacheFromXHR(this.xhr)
        };
        let methodFromResponse = up.protocol.methodFromXHR(this.xhr);
        let urlFromResponse = up.protocol.locationFromXHR(this.xhr);
        if (urlFromResponse) {
            if (!methodFromResponse && !u.matchURLs(responseAttrs.url, urlFromResponse)) {
                methodFromResponse = 'GET';
            }
            responseAttrs.url = urlFromResponse;
        }
        if (methodFromResponse) {
            responseAttrs.method = methodFromResponse;
        }
        return new up.Response(responseAttrs);
    }
    cacheKey() {
        return JSON.stringify([
            this.method,
            this.url,
            this.params.toQuery(),
            this.metaProps()
        ]);
    }
    metaProps() {
        const props = {};
        for (let key of u.evalOption(up.network.config.requestMetaKeys, this)) {
            const value = this[key];
            if (u.isGiven(value)) {
                props[key] = value;
            }
        }
        return props;
    }
    buildEventEmitter(args) {
        return up.EventEmitter.fromEmitArgs(args, {
            layer: this.layer,
            request: this,
            origin: this.origin
        });
    }
    emit(...args) {
        return this.buildEventEmitter(args).emit();
    }
    assertEmitted(...args) {
        this.buildEventEmitter(args).assertEmitted();
    }
    get description() {
        return this.method + ' ' + this.url;
    }
};
u.delegate(up.Request.prototype, ['then', 'catch', 'finally'], function () { return this.deferred; });
up.Request.tester = function (condition) {
    if (u.isFunction(condition)) {
        return condition;
    }
    else if (condition instanceof this) {
        return (request) => condition === request;
    }
    else if (u.isString(condition)) {
        let pattern = new up.URLPattern(condition);
        return (request) => pattern.test(request.url);
    }
    else {
        return (_request) => condition;
    }
};


/***/ }),
/* 59 */
/***/ (() => {

let u = up.util;
up.Request.Cache = class Cache extends up.Cache {
    maxSize() {
        return up.network.config.cacheSize;
    }
    expiryMillis() {
        return up.network.config.cacheExpiry;
    }
    normalizeStoreKey(request) {
        return u.wrapValue(up.Request, request).cacheKey();
    }
    clear(condition = true) {
        let tester = up.Request.tester(condition);
        this.each((key, request) => {
            if (tester(request)) {
                this.store.remove(key);
            }
        });
    }
};


/***/ }),
/* 60 */
/***/ (() => {

const u = up.util;
up.Request.Queue = class Queue {
    constructor(options = {}) {
        this.concurrency = options.concurrency ?? (() => up.network.config.concurrency);
        this.badResponseTime = options.badResponseTime ?? (() => up.network.config.badResponseTime);
        this.reset();
    }
    reset() {
        this.queuedRequests = [];
        this.currentRequests = [];
        clearTimeout(this.checkSlowTimout);
        this.emittedSlow = false;
    }
    get allRequests() {
        return this.currentRequests.concat(this.queuedRequests);
    }
    asap(request) {
        request.runQueuedCallbacks();
        u.always(request, responseOrError => this.onRequestSettled(request, responseOrError));
        request.queueTime = new Date();
        this.setSlowTimer();
        if (this.hasConcurrencyLeft()) {
            this.sendRequestNow(request);
        }
        else {
            this.queueRequest(request);
        }
    }
    promoteToForeground(request) {
        if (request.preload) {
            request.preload = false;
            return this.setSlowTimer();
        }
    }
    setSlowTimer() {
        const badResponseTime = u.evalOption(this.badResponseTime);
        this.checkSlowTimout = u.timer(badResponseTime, () => this.checkSlow());
    }
    hasConcurrencyLeft() {
        const maxConcurrency = u.evalOption(this.concurrency);
        return (maxConcurrency === -1) || (this.currentRequests.length < maxConcurrency);
    }
    isBusy() {
        return this.currentRequests.length > 0;
    }
    queueRequest(request) {
        this.queuedRequests.push(request);
    }
    pluckNextRequest() {
        let request = u.find(this.queuedRequests, request => !request.preload);
        request || (request = this.queuedRequests[0]);
        return u.remove(this.queuedRequests, request);
    }
    sendRequestNow(request) {
        if (request.emit('up:request:load', { log: ['Loading %s %s', request.method, request.url] }).defaultPrevented) {
            request.abort('Prevented by event listener');
        }
        else {
            request.normalizeForCaching();
            this.currentRequests.push(request);
            request.load();
        }
    }
    onRequestSettled(request, responseOrError) {
        u.remove(this.currentRequests, request);
        if ((responseOrError instanceof up.Response) && responseOrError.ok) {
            up.network.registerAliasForRedirect(request, responseOrError);
        }
        this.checkSlow();
        u.microtask(() => this.poke());
    }
    poke() {
        let request;
        if (this.hasConcurrencyLeft() && (request = this.pluckNextRequest())) {
            return this.sendRequestNow(request);
        }
    }
    abort(conditions = true) {
        let tester = up.Request.tester(conditions);
        for (let list of [this.currentRequests, this.queuedRequests]) {
            const abortableRequests = u.filter(list, tester);
            abortableRequests.forEach(function (abortableRequest) {
                abortableRequest.abort();
                u.remove(list, abortableRequest);
            });
        }
    }
    abortExcept(excusedRequest, additionalConditions = true) {
        const excusedCacheKey = excusedRequest.cacheKey();
        this.abort(queuedRequest => (queuedRequest.cacheKey() !== excusedCacheKey) && u.evalOption(additionalConditions, queuedRequest));
    }
    checkSlow() {
        const currentSlow = this.isSlow();
        if (this.emittedSlow !== currentSlow) {
            this.emittedSlow = currentSlow;
            if (currentSlow) {
                up.emit('up:request:late', { log: 'Server is slow to respond' });
            }
            else {
                up.emit('up:request:recover', { log: 'Slow requests were loaded' });
            }
        }
    }
    isSlow() {
        const now = new Date();
        const delay = u.evalOption(this.badResponseTime);
        const allForegroundRequests = u.reject(this.allRequests, 'preload');
        const timerTolerance = 1;
        return u.some(allForegroundRequests, request => (now - request.queueTime) >= (delay - timerTolerance));
    }
};


/***/ }),
/* 61 */
/***/ (() => {

const u = up.util;
const e = up.element;
const HTML_FORM_METHODS = ['GET', 'POST'];
up.Request.FormRenderer = class FormRenderer {
    constructor(request) {
        this.request = request;
    }
    buildAndSubmit() {
        this.params = u.copy(this.request.params);
        let action = this.request.url;
        let { method } = this.request;
        const paramsFromQuery = up.Params.fromURL(action);
        this.params.addAll(paramsFromQuery);
        action = up.Params.stripURL(action);
        if (!u.contains(HTML_FORM_METHODS, method)) {
            method = up.protocol.wrapMethod(method, this.params);
        }
        this.form = e.affix(document.body, 'form.up-request-loader', { method, action });
        let contentType = this.request.contentType;
        if (contentType) {
            this.form.setAttribute('enctype', contentType);
        }
        let csrfParam, csrfToken;
        if ((csrfParam = this.request.csrfParam()) && (csrfToken = this.request.csrfToken())) {
            this.params.add(csrfParam, csrfToken);
        }
        u.each(this.params.toArray(), this.addField.bind(this));
        up.browser.submitForm(this.form);
    }
    addField(attrs) {
        e.affix(this.form, 'input[type=hidden]', attrs);
    }
};


/***/ }),
/* 62 */
/***/ (() => {

const CONTENT_TYPE_URL_ENCODED = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_FORM_DATA = 'multipart/form-data';
const u = up.util;
up.Request.XHRRenderer = class XHRRenderer {
    constructor(request) {
        this.request = request;
    }
    buildAndSend(handlers) {
        const xhr = this.request.xhr;
        this.params = u.copy(this.request.params);
        if (this.request.timeout) {
            xhr.timeout = this.request.timeout;
        }
        xhr.open(this.getMethod(), this.request.url);
        const metaProps = this.request.metaProps();
        for (let key in metaProps) {
            this.addHeader(xhr, up.protocol.headerize(key), metaProps[key]);
        }
        for (let header in this.request.headers) {
            this.addHeader(xhr, header, this.request.headers[header]);
        }
        let csrfHeader, csrfToken;
        if ((csrfHeader = this.request.csrfHeader()) && (csrfToken = this.request.csrfToken())) {
            this.addHeader(xhr, csrfHeader, csrfToken);
        }
        this.addHeader(xhr, up.protocol.headerize('version'), up.version);
        let contentType = this.getContentType();
        if (contentType) {
            this.addHeader(xhr, 'Content-Type', contentType);
        }
        u.assign(xhr, handlers);
        xhr.send(this.getPayload());
    }
    getMethod() {
        if (!this.method) {
            this.method = this.request.method;
            if (this.request.wrapMethod && !this.request.will302RedirectWithGET()) {
                this.method = up.protocol.wrapMethod(this.method, this.params);
            }
        }
        return this.method;
    }
    getContentType() {
        this.finalizePayload();
        return this.contentType;
    }
    getPayload() {
        this.finalizePayload();
        return this.payload;
    }
    addHeader(xhr, header, value) {
        if (u.isOptions(value) || u.isArray(value)) {
            value = JSON.stringify(value);
        }
        xhr.setRequestHeader(header, value);
    }
    finalizePayload() {
        if (this.payloadFinalized) {
            return;
        }
        this.payloadFinalized = true;
        this.payload = this.request.payload;
        this.contentType = this.request.contentType;
        if (!this.payload && this.request.allowsPayload()) {
            if (!this.contentType) {
                this.contentType = this.params.hasBinaryValues() ? CONTENT_TYPE_FORM_DATA : CONTENT_TYPE_URL_ENCODED;
            }
            if (this.contentType === CONTENT_TYPE_FORM_DATA) {
                this.contentType = null;
                this.payload = this.params.toFormData();
            }
            else {
                this.payload = this.params.toQuery().replace(/%20/g, '+');
            }
        }
    }
};


/***/ }),
/* 63 */
/***/ (() => {

up.Response = class Response extends up.Record {
    keys() {
        return [
            'method',
            'url',
            'text',
            'status',
            'request',
            'xhr',
            'target',
            'title',
            'acceptLayer',
            'dismissLayer',
            'eventPlans',
            'context',
            'clearCache',
            'headers'
        ];
    }
    defaults() {
        return { headers: {} };
    }
    get ok() {
        return this.status && ((this.status >= 200) && (this.status <= 299));
    }
    getHeader(name) {
        return this.headers[name] || this.xhr?.getResponseHeader(name);
    }
    get contentType() {
        return this.getHeader('Content-Type');
    }
    get cspNonces() {
        return up.protocol.cspNoncesFromHeader(this.getHeader('Content-Security-Policy'));
    }
    get json() {
        return this.parsedJSON || (this.parsedJSON = JSON.parse(this.text));
    }
};


/***/ }),
/* 64 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.ResponseDoc = class ResponseDoc {
    constructor(options) {
        this.noscriptWrapper = new up.HTMLWrapper('noscript');
        this.scriptWrapper = new up.HTMLWrapper('script');
        this.root =
            this.parseDocument(options) ||
                this.parseFragment(options) ||
                this.parseContent(options);
        this.cspNonces = options.cspNonces;
    }
    parseDocument(options) {
        return this.parse(options.document, e.createDocumentFromHTML);
    }
    parseContent(options) {
        let content = options.content || '';
        const target = options.target || up.fail("must pass a { target } when passing { content }");
        const matchingElement = e.createFromSelector(target);
        if (u.isString(content)) {
            content = this.wrapHTML(content);
            matchingElement.innerHTML = content;
        }
        else {
            matchingElement.appendChild(content);
        }
        return matchingElement;
    }
    parseFragment(options) {
        return this.parse(options.fragment);
    }
    parse(value, parseFn = e.createFromHTML) {
        if (u.isString(value)) {
            value = this.wrapHTML(value);
            value = parseFn(value);
        }
        return value;
    }
    rootSelector() {
        return up.fragment.toTarget(this.root);
    }
    wrapHTML(html) {
        html = this.noscriptWrapper.wrap(html);
        if (up.fragment.config.runScripts) {
            html = this.scriptWrapper.wrap(html);
        }
        else {
            html = this.scriptWrapper.strip(html);
        }
        return html;
    }
    getTitle() {
        if (!this.titleParsed) {
            this.title = this.root.querySelector("head title")?.textContent;
            this.titleParsed = true;
        }
        return this.title;
    }
    select(selector) {
        return up.fragment.subtree(this.root, selector, { layer: 'any' })[0];
    }
    finalizeElement(element) {
        this.noscriptWrapper.unwrap(element);
        up.NonceableCallback.adoptNonces(element, this.cspNonces);
        this.scriptWrapper.unwrap(element);
    }
};


/***/ }),
/* 65 */
/***/ (() => {

const e = up.element;
const u = up.util;
up.RevealMotion = class RevealMotion {
    constructor(element, options = {}) {
        this.element = element;
        this.options = options;
        const viewportConfig = up.viewport.config;
        this.viewport = e.get(this.options.viewport) || up.viewport.get(this.element);
        this.obstructionsLayer = up.layer.get(this.viewport);
        this.snap = this.options.snap ?? this.options.revealSnap ?? viewportConfig.revealSnap;
        this.padding = this.options.padding ?? this.options.revealPadding ?? viewportConfig.revealPadding;
        this.top = this.options.top ?? this.options.revealTop ?? viewportConfig.revealTop;
        this.max = this.options.max ?? this.options.revealMax ?? viewportConfig.revealMax;
        this.topObstructions = viewportConfig.fixedTop;
        this.bottomObstructions = viewportConfig.fixedBottom;
    }
    start() {
        const viewportRect = this.getViewportRect(this.viewport);
        const elementRect = up.Rect.fromElement(this.element);
        if (this.max) {
            const maxPixels = u.evalOption(this.max, this.element);
            elementRect.height = Math.min(elementRect.height, maxPixels);
        }
        this.addPadding(elementRect);
        this.substractObstructions(viewportRect);
        if (viewportRect.height < 0) {
            return up.error.failed.async('Viewport has no visible area');
        }
        const originalScrollTop = this.viewport.scrollTop;
        let newScrollTop = originalScrollTop;
        if (this.top || (elementRect.height > viewportRect.height)) {
            const diff = elementRect.top - viewportRect.top;
            newScrollTop += diff;
        }
        else if (elementRect.top < viewportRect.top) {
            newScrollTop -= (viewportRect.top - elementRect.top);
        }
        else if (elementRect.bottom > viewportRect.bottom) {
            newScrollTop += (elementRect.bottom - viewportRect.bottom);
        }
        else {
        }
        if (u.isNumber(this.snap) && (newScrollTop < this.snap) && (elementRect.top < (0.5 * viewportRect.height))) {
            newScrollTop = 0;
        }
        if (newScrollTop !== originalScrollTop) {
            return this.scrollTo(newScrollTop);
        }
        else {
            return Promise.resolve();
        }
    }
    scrollTo(newScrollTop) {
        this.scrollMotion = new up.ScrollMotion(this.viewport, newScrollTop, this.options);
        return this.scrollMotion.start();
    }
    getViewportRect() {
        if (up.viewport.isRoot(this.viewport)) {
            return new up.Rect({
                left: 0,
                top: 0,
                width: up.viewport.rootWidth(),
                height: up.viewport.rootHeight()
            });
        }
        else {
            return up.Rect.fromElement(this.viewport);
        }
    }
    addPadding(elementRect) {
        elementRect.top -= this.padding;
        elementRect.height += 2 * this.padding;
    }
    selectObstructions(selectors) {
        let elements = up.fragment.all(selectors.join(','), { layer: this.obstructionsLayer });
        return u.filter(elements, e.isVisible);
    }
    substractObstructions(viewportRect) {
        for (let obstruction of this.selectObstructions(this.topObstructions)) {
            let obstructionRect = up.Rect.fromElement(obstruction);
            let diff = obstructionRect.bottom - viewportRect.top;
            if (diff > 0) {
                viewportRect.top += diff;
                viewportRect.height -= diff;
            }
        }
        for (let obstruction of this.selectObstructions(this.bottomObstructions)) {
            let obstructionRect = up.Rect.fromElement(obstruction);
            let diff = viewportRect.bottom - obstructionRect.top;
            if (diff > 0) {
                viewportRect.height -= diff;
            }
        }
    }
    finish() {
        this.scrollMotion?.finish();
    }
};


/***/ }),
/* 66 */
/***/ (() => {

const u = up.util;
const SPEED_CALIBRATION = 0.065;
up.ScrollMotion = class ScrollMotion {
    constructor(scrollable, targetTop, options = {}) {
        this.scrollable = scrollable;
        this.targetTop = targetTop;
        this.behavior = options.behavior ?? options.scrollBehavior ?? 'auto';
        this.speed = (options.speed ?? options.scrollSpeed ?? up.viewport.config.scrollSpeed) * SPEED_CALIBRATION;
    }
    start() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            if ((this.behavior === 'smooth') && up.motion.isEnabled()) {
                this.startAnimation();
            }
            else {
                this.finish();
            }
        });
    }
    startAnimation() {
        this.startTime = Date.now();
        this.startTop = this.scrollable.scrollTop;
        this.topDiff = this.targetTop - this.startTop;
        this.duration = Math.sqrt(Math.abs(this.topDiff)) / this.speed;
        requestAnimationFrame(() => this.animationFrame());
    }
    animationFrame() {
        if (this.settled) {
            return;
        }
        const currentTime = Date.now();
        const timeElapsed = currentTime - this.startTime;
        const timeFraction = Math.min(timeElapsed / this.duration, 1);
        this.frameTop = this.startTop + (u.simpleEase(timeFraction) * this.topDiff);
        if (Math.abs(this.targetTop - this.frameTop) < 0.3) {
            this.finish();
        }
        else {
            this.scrollable.scrollTop = this.frameTop;
            requestAnimationFrame(() => this.animationFrame());
        }
    }
    abort(reason) {
        this.settled = true;
        this.reject(up.error.aborted(reason));
    }
    finish() {
        this.settled = true;
        this.scrollable.scrollTop = this.targetTop;
        this.resolve();
    }
};


/***/ }),
/* 67 */
/***/ (() => {

const e = up.element;
const u = up.util;
up.Selector = class Selector {
    constructor(selectors, filters = []) {
        this.selectors = selectors;
        this.filters = filters;
        this.unionSelector = this.selectors.join(',') || 'match-none';
    }
    matches(element) {
        return e.matches(element, this.unionSelector) && this.passesFilter(element);
    }
    closest(element) {
        let parentElement;
        if (this.matches(element)) {
            return element;
        }
        else if (parentElement = element.parentElement) {
            return this.closest(parentElement);
        }
    }
    passesFilter(element) {
        return u.every(this.filters, filter => filter(element));
    }
    descendants(root) {
        const results = u.flatMap(this.selectors, selector => e.all(root, selector));
        return u.filter(results, element => this.passesFilter(element));
    }
    subtree(root) {
        const results = [];
        if (this.matches(root)) {
            results.push(root);
        }
        results.push(...this.descendants(root));
        return results;
    }
};


/***/ }),
/* 68 */
/***/ (() => {

const u = up.util;
up.store || (up.store = {});
up.store.Memory = class Memory {
    constructor() {
        this.data = {};
    }
    clear() {
        this.data = {};
    }
    get(key) {
        return this.data[key];
    }
    set(key, value) {
        this.data[key] = value;
    }
    remove(key) {
        delete this.data[key];
    }
    keys() {
        return Object.keys(this.data);
    }
    size() {
        return this.keys().length;
    }
    values() {
        return u.values(this.data);
    }
};


/***/ }),
/* 69 */
/***/ (() => {

up.store.Session = class Session extends up.store.Memory {
    constructor(rootKey) {
        super();
        this.rootKey = rootKey;
        this.loadFromSessionStorage();
    }
    clear() {
        super.clear();
        this.saveToSessionStorage();
    }
    set(key, value) {
        super.set(key, value);
        this.saveToSessionStorage();
    }
    remove(key) {
        super.remove(key);
        this.saveToSessionStorage();
    }
    loadFromSessionStorage() {
        try {
            let raw = sessionStorage?.getItem(this.rootKey);
            if (raw) {
                this.data = JSON.parse(raw);
            }
        }
        catch (error) {
        }
    }
    saveToSessionStorage() {
        const json = JSON.stringify(this.data);
        try {
            return sessionStorage?.setItem(this.rootKey, json);
        }
        catch (error) {
        }
    }
};


/***/ }),
/* 70 */
/***/ (() => {

const u = up.util;
const e = up.element;
up.Tether = class Tether {
    constructor(options) {
        up.migrate.handleTetherOptions?.(options);
        this.anchor = options.anchor;
        this.align = options.align;
        this.position = options.position;
        this.alignAxis = (this.position === 'top') || (this.position === 'bottom') ? 'horizontal' : 'vertical';
        this.viewport = up.viewport.get(this.anchor);
        this.parent = this.viewport === e.root ? document.body : this.viewport;
        this.syncOnScroll = !this.viewport.contains(this.anchor.offsetParent);
    }
    start(element) {
        this.element = element;
        this.element.style.position = 'absolute';
        this.setOffset(0, 0);
        this.sync();
        this.changeEventSubscription('on');
    }
    stop() {
        this.changeEventSubscription('off');
    }
    changeEventSubscription(fn) {
        let doScheduleSync = this.scheduleSync.bind(this);
        up[fn](window, 'resize', doScheduleSync);
        if (this.syncOnScroll) {
            up[fn](this.viewport, 'scroll', doScheduleSync);
        }
    }
    scheduleSync() {
        clearTimeout(this.syncTimer);
        return this.syncTimer = u.task(this.sync.bind(this));
    }
    isDetached() {
        return e.isDetached(this.parent) || e.isDetached(this.anchor);
    }
    sync() {
        const elementBox = this.element.getBoundingClientRect();
        const elementMargin = {
            top: e.styleNumber(this.element, 'marginTop'),
            right: e.styleNumber(this.element, 'marginRight'),
            bottom: e.styleNumber(this.element, 'marginBottom'),
            left: e.styleNumber(this.element, 'marginLeft')
        };
        const anchorBox = this.anchor.getBoundingClientRect();
        let left;
        let top;
        switch (this.alignAxis) {
            case 'horizontal': {
                switch (this.position) {
                    case 'top':
                        top = anchorBox.top - elementMargin.bottom - elementBox.height;
                        break;
                    case 'bottom':
                        top = anchorBox.top + anchorBox.height + elementMargin.top;
                        break;
                }
                switch (this.align) {
                    case 'left':
                        left = anchorBox.left + elementMargin.left;
                        break;
                    case 'center':
                        left = anchorBox.left + (0.5 * (anchorBox.width - elementBox.width));
                        break;
                    case 'right':
                        left = (anchorBox.left + anchorBox.width) - elementBox.width - elementMargin.right;
                        break;
                }
                break;
            }
            case 'vertical': {
                switch (this.align) {
                    case 'top':
                        top = anchorBox.top + elementMargin.top;
                        break;
                    case 'center':
                        top = anchorBox.top + (0.5 * (anchorBox.height - elementBox.height));
                        break;
                    case 'bottom':
                        top = (anchorBox.top + anchorBox.height) - elementBox.height - elementMargin.bottom;
                        break;
                }
                switch (this.position) {
                    case 'left':
                        left = anchorBox.left - elementMargin.right - elementBox.width;
                        break;
                    case 'right':
                        left = anchorBox.left + anchorBox.width + elementMargin.left;
                        break;
                }
                break;
            }
        }
        if (u.isDefined(left) || u.isDefined(top)) {
            this.moveTo(left, top);
        }
        else {
            up.fail('Invalid tether constraints: %o', this.describeConstraints());
        }
    }
    describeConstraints() {
        return { position: this.position, align: this.align };
    }
    moveTo(targetLeft, targetTop) {
        const elementBox = this.element.getBoundingClientRect();
        this.setOffset((targetLeft - elementBox.left) + this.offsetLeft, (targetTop - elementBox.top) + this.offsetTop);
    }
    setOffset(left, top) {
        this.offsetLeft = left;
        this.offsetTop = top;
        e.setStyle(this.element, { left, top });
    }
};


/***/ }),
/* 71 */
/***/ (() => {

const u = up.util;
up.URLPattern = class URLPattern {
    constructor(fullPattern, normalizeURL = u.normalizeURL) {
        this.normalizeURL = normalizeURL;
        this.groups = [];
        const positiveList = [];
        const negativeList = [];
        for (let pattern of u.splitValues(fullPattern)) {
            if (pattern[0] === '-') {
                negativeList.push(pattern.substring(1));
            }
            else {
                positiveList.push(pattern);
            }
        }
        this.positiveRegexp = this.buildRegexp(positiveList, true);
        this.negativeRegexp = this.buildRegexp(negativeList, false);
    }
    buildRegexp(list, capture) {
        if (!list.length) {
            return;
        }
        list = list.map((url) => {
            if (url[0] === '*') {
                url = '/' + url;
            }
            url = this.normalizeURL(url);
            url = u.escapeRegExp(url);
            return url;
        });
        let reCode = list.join('|');
        reCode = reCode.replace(/\\\*/g, '.*?');
        reCode = reCode.replace(/(:|\\\$)([a-z][\w-]*)/ig, (match, type, name) => {
            if (type === '\\$') {
                if (capture) {
                    this.groups.push({ name, cast: Number });
                }
                return '(\\d+)';
            }
            else {
                if (capture) {
                    this.groups.push({ name, cast: String });
                }
                return '([^/?#]+)';
            }
        });
        return new RegExp('^(?:' + reCode + ')$');
    }
    test(url, doNormalize = true) {
        if (doNormalize) {
            url = this.normalizeURL(url);
        }
        return this.positiveRegexp.test(url) && !this.isExcluded(url);
    }
    recognize(url, doNormalize = true) {
        if (doNormalize) {
            url = this.normalizeURL(url);
        }
        let match = this.positiveRegexp.exec(url);
        if (match && !this.isExcluded(url)) {
            const resolution = {};
            this.groups.forEach((group, groupIndex) => {
                let value = match[groupIndex + 1];
                if (value) {
                    return resolution[group.name] = group.cast(value);
                }
            });
            return resolution;
        }
    }
    isExcluded(url) {
        return this.negativeRegexp?.test(url);
    }
};


/***/ }),
/* 72 */
/***/ (() => {

up.framework = (function () {
    let readyState = 'evaling';
    function emitReset() {
        up.emit('up:framework:reset', { log: false });
    }
    function boot() {
        if (readyState !== 'configuring') {
            console.error('Unpoly has already booted');
            return;
        }
        let supportIssue = up.framework.supportIssue();
        if (!supportIssue) {
            readyState = 'booting';
            up.emit('up:framework:boot', { log: false });
            readyState = 'booted';
        }
        else {
            console.error("Unpoly cannot boot: %s", supportIssue);
        }
    }
    function mustBootManually() {
        let unpolyScript = document.currentScript;
        if (unpolyScript?.async) {
            return true;
        }
        if (unpolyScript?.getAttribute('up-boot') === 'manual') {
            return true;
        }
        if (document.readyState === 'complete') {
            return true;
        }
    }
    function onEvaled() {
        up.emit('up:framework:evaled', { log: false });
        if (mustBootManually()) {
            console.debug('Call up.boot() after you have configured Unpoly');
        }
        else {
            document.addEventListener('DOMContentLoaded', boot);
        }
        readyState = 'configuring';
    }
    function startExtension() {
        if (readyState !== 'configuring') {
            throw new Error('Unpoly extensions must be loaded before booting');
        }
        readyState = 'evaling';
    }
    function stopExtension() {
        readyState = 'configuring';
    }
    function isSupported() {
        return !supportIssue();
    }
    function supportIssue() {
        if (!up.browser.canPromise()) {
            return "Browser doesn't support promises";
        }
        if (document.compatMode === 'BackCompat') {
            return 'Browser is in quirks mode (missing DOCTYPE?)';
        }
        if (up.browser.isEdge18()) {
            return 'Edge 18 or lower is unsupported';
        }
    }
    return {
        onEvaled,
        boot,
        startExtension,
        stopExtension,
        reset: emitReset,
        get evaling() { return readyState === 'evaling'; },
        get booted() { return readyState === 'booted'; },
        get beforeBoot() { return readyState !== 'booting' && readyState !== 'booted'; },
        isSupported,
        supportIssue,
    };
})();
up.boot = up.framework.boot;


/***/ }),
/* 73 */
/***/ (() => {

up.event = (function () {
    const u = up.util;
    const e = up.element;
    function reset() {
        for (let globalElement of [window, document, e.root, document.body]) {
            for (let listener of up.EventListener.allNonDefault(globalElement)) {
                listener.unbind();
            }
        }
    }
    function on(...args) {
        return buildListenerGroup(args).bind();
    }
    function $on(...args) {
        return buildListenerGroup(args, { jQuery: true }).bind();
    }
    function off(...args) {
        return buildListenerGroup(args).unbind();
    }
    function buildListenerGroup(args, options) {
        return up.EventListenerGroup.fromBindArgs(args, options);
    }
    function buildEmitter(args) {
        return up.EventEmitter.fromEmitArgs(args);
    }
    function emit(...args) {
        return buildEmitter(args).emit();
    }
    function build(...args) {
        const props = u.extractOptions(args);
        const type = args[0] || props.type || up.fail('Expected event type to be passed as string argument or { type } property');
        const event = document.createEvent('Event');
        event.initEvent(type, true, true);
        u.assign(event, u.omit(props, ['type', 'target']));
        if (up.browser.isIE11()) {
            const originalPreventDefault = event.preventDefault;
            event.preventDefault = function () {
                originalPreventDefault.call(event);
                return u.getter(event, 'defaultPrevented', () => true);
            };
        }
        return event;
    }
    function assertEmitted(...args) {
        return buildEmitter(args).assertEmitted();
    }
    function onEscape(listener) {
        return on('keydown', function (event) {
            if (wasEscapePressed(event)) {
                return listener(event);
            }
        });
    }
    function wasEscapePressed(event) {
        const { key } = event;
        return (key === 'Escape') || (key === 'Esc');
    }
    function halt(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
    }
    const keyModifiers = ['metaKey', 'shiftKey', 'ctrlKey', 'altKey'];
    function isUnmodified(event) {
        return (u.isUndefined(event.button) || (event.button === 0)) &&
            !u.some(keyModifiers, modifier => event[modifier]);
    }
    function fork(originalEvent, newType, copyKeys = []) {
        const newEvent = up.event.build(newType, u.pick(originalEvent, copyKeys));
        newEvent.originalEvent = originalEvent;
        ['stopPropagation', 'stopImmediatePropagation', 'preventDefault'].forEach(function (key) {
            const originalMethod = newEvent[key];
            return newEvent[key] = function () {
                originalEvent[key]();
                return originalMethod.call(newEvent);
            };
        });
        if (originalEvent.defaultPrevented) {
            newEvent.preventDefault();
        }
        return newEvent;
    }
    function executeEmitAttr(event, element) {
        if (!isUnmodified(event)) {
            return;
        }
        const eventType = e.attr(element, 'up-emit');
        const eventProps = e.jsonAttr(element, 'up-emit-props');
        const forkedEvent = fork(event, eventType);
        u.assign(forkedEvent, eventProps);
        up.emit(element, forkedEvent);
    }
    on('up:click', 'a[up-emit]', executeEmitAttr);
    on('up:framework:reset', reset);
    return {
        on,
        $on,
        off,
        build,
        emit,
        assertEmitted,
        onEscape,
        halt,
        isUnmodified,
        fork,
        keyModifiers
    };
})();
up.on = up.event.on;
up.$on = up.event.$on;
up.off = up.event.off;
up.$off = up.event.off;
up.emit = up.event.emit;


/***/ }),
/* 74 */
/***/ (() => {

up.protocol = (function () {
    const u = up.util;
    const e = up.element;
    const headerize = function (camel) {
        const header = camel.replace(/(^.|[A-Z])/g, char => '-' + char.toUpperCase());
        return 'X-Up' + header;
    };
    const extractHeader = function (xhr, shortHeader, parseFn = u.identity) {
        let value = xhr.getResponseHeader(headerize(shortHeader));
        if (value) {
            return parseFn(value);
        }
    };
    function parseClearCacheValue(value) {
        switch (value) {
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                return value;
        }
    }
    function clearCacheFromXHR(xhr) {
        return extractHeader(xhr, 'clearCache', parseClearCacheValue);
    }
    function contextFromXHR(xhr) {
        return extractHeader(xhr, 'context', JSON.parse);
    }
    function methodFromXHR(xhr) {
        return extractHeader(xhr, 'method', u.normalizeMethod);
    }
    function eventPlansFromXHR(xhr) {
        return extractHeader(xhr, 'events', JSON.parse);
    }
    function acceptLayerFromXHR(xhr) {
        return extractHeader(xhr, 'acceptLayer', JSON.parse);
    }
    function dismissLayerFromXHR(xhr) {
        return extractHeader(xhr, 'dismissLayer', JSON.parse);
    }
    const initialRequestMethod = u.memoize(function () {
        return u.normalizeMethod(up.browser.popCookie('_up_method'));
    });
    function locationFromXHR(xhr) {
        return extractHeader(xhr, 'location') || xhr.responseURL;
    }
    function titleFromXHR(xhr) {
        return extractHeader(xhr, 'title');
    }
    function targetFromXHR(xhr) {
        return extractHeader(xhr, 'target');
    }
    const config = new up.Config(() => ({
        methodParam: '_method',
        csrfParam() { return e.metaContent('csrf-param'); },
        csrfToken() { return e.metaContent('csrf-token'); },
        cspNonce() { return e.metaContent('csp-nonce'); },
        csrfHeader: 'X-CSRF-Token',
        nonceableAttributes: ['up-observe', 'up-on-accepted', 'up-on-dismissed', 'up-on-loaded', 'up-on-finished', 'up-observe'],
    }));
    function csrfHeader() {
        return u.evalOption(config.csrfHeader);
    }
    function csrfParam() {
        return u.evalOption(config.csrfParam);
    }
    function csrfToken() {
        return u.evalOption(config.csrfToken);
    }
    function cspNonce() {
        return u.evalOption(config.cspNonce);
    }
    function cspNoncesFromHeader(cspHeader) {
        let nonces = [];
        if (cspHeader) {
            let parts = cspHeader.split(/\s*;\s*/);
            for (let part of parts) {
                if (part.indexOf('script-src') === 0) {
                    let noncePattern = /'nonce-([^']+)'/g;
                    let match;
                    while (match = noncePattern.exec(part)) {
                        nonces.push(match[1]);
                    }
                }
            }
        }
        return nonces;
    }
    function wrapMethod(method, params) {
        params.add(config.methodParam, method);
        return 'POST';
    }
    function reset() {
        config.reset();
    }
    up.on('up:framework:reset', reset);
    return {
        config,
        reset,
        locationFromXHR,
        titleFromXHR,
        targetFromXHR,
        methodFromXHR,
        acceptLayerFromXHR,
        contextFromXHR,
        dismissLayerFromXHR,
        eventPlansFromXHR,
        clearCacheFromXHR,
        csrfHeader,
        csrfParam,
        csrfToken,
        cspNonce,
        initialRequestMethod,
        headerize,
        wrapMethod,
        cspNoncesFromHeader,
    };
})();


/***/ }),
/* 75 */
/***/ (() => {

up.log = (function () {
    const sessionStore = new up.store.Session('up.log');
    const config = new up.Config(() => ({
        enabled: sessionStore.get('enabled'),
        banner: true,
        format: up.browser.canFormatLog()
    }));
    function reset() {
        config.reset();
    }
    function printToStandard(...args) {
        if (config.enabled) {
            printToStream('log', ...args);
        }
    }
    const printToWarn = (...args) => printToStream('warn', ...args);
    const printToError = (...args) => printToStream('error', ...args);
    function printToStream(stream, trace, message, ...args) {
        if (message) {
            if (config.format) {
                args.unshift('');
                args.unshift('color: #666666; padding: 1px 3px; border: 1px solid #bbbbbb; border-radius: 2px; font-size: 90%; display: inline-block');
                message = `%c${trace}%c ${message}`;
            }
            else {
                message = `[${trace}] ${message}`;
            }
            console[stream](message, ...args);
        }
    }
    function printBanner() {
        if (!config.banner) {
            return;
        }
        const logo = " __ _____  ___  ___  / /_ __\n" +
            `/ // / _ \\/ _ \\/ _ \\/ / // /  ${up.version}\n` +
            "\\___/_//_/ .__/\\___/_/\\_. / \n" +
            "        / /            / /\n\n";
        let text = "";
        if (!up.migrate.loaded) {
            text += "Load unpoly-migrate.js to enable deprecated APIs.\n\n";
        }
        if (config.enabled) {
            text += "Call `up.log.disable()` to disable logging for this session.";
        }
        else {
            text += "Call `up.log.enable()` to enable logging for this session.";
        }
        const color = 'color: #777777';
        if (config.format) {
            console.log('%c' + logo + '%c' + text, 'font-family: monospace;' + color, color);
        }
        else {
            console.log(logo + text);
        }
    }
    up.on('up:framework:boot', printBanner);
    up.on('up:framework:reset', reset);
    function setEnabled(value) {
        sessionStore.set('enabled', value);
        config.enabled = value;
    }
    function enable() {
        setEnabled(true);
    }
    function disable() {
        setEnabled(false);
    }
    function muteUncriticalRejection(promise) {
        return promise.catch(function (error) {
            if ((typeof error !== 'object') || ((error.name !== 'AbortError') && !(error instanceof up.RenderResult) && !(error instanceof up.Response))) {
                throw error;
            }
        });
    }
    return {
        puts: printToStandard,
        error: printToError,
        warn: printToWarn,
        config,
        enable,
        disable,
        muteUncriticalRejection,
        isEnabled() { return config.enabled; },
    };
})();
up.puts = up.log.puts;
up.warn = up.log.warn;


/***/ }),
/* 76 */
/***/ (() => {

up.syntax = (function () {
    const u = up.util;
    const e = up.element;
    const SYSTEM_MACRO_PRIORITIES = {
        '[up-back]': -100,
        '[up-content]': -200,
        '[up-drawer]': -200,
        '[up-modal]': -200,
        '[up-cover]': -200,
        '[up-popup]': -200,
        '[up-tooltip]': -200,
        '[up-dash]': -200,
        '[up-expand]': -300,
        '[data-method]': -400,
        '[data-confirm]': -400,
    };
    let compilers = [];
    let macros = [];
    function registerCompiler(...args) {
        const compiler = buildCompiler(args);
        return insertCompiler(compilers, compiler);
    }
    function registerJQueryCompiler(...args) {
        const compiler = registerCompiler(...args);
        compiler.jQuery = true;
    }
    function registerMacro(...args) {
        const macro = buildCompiler(args);
        if (up.framework.evaling) {
            macro.priority = detectSystemMacroPriority(macro.selector) ||
                up.fail('Unregistered priority for system macro %o', macro.selector);
        }
        return insertCompiler(macros, macro);
    }
    function registerJQueryMacro(...args) {
        const macro = registerMacro(...args);
        macro.jQuery = true;
        return macro;
    }
    function detectSystemMacroPriority(macroSelector) {
        macroSelector = u.evalOption(macroSelector);
        for (let substr in SYSTEM_MACRO_PRIORITIES) {
            const priority = SYSTEM_MACRO_PRIORITIES[substr];
            if (macroSelector.indexOf(substr) >= 0) {
                return priority;
            }
        }
    }
    const parseCompilerArgs = function (args) {
        const selector = args.shift();
        const callback = args.pop();
        const options = u.extractOptions(args);
        return [selector, options, callback];
    };
    function buildCompiler(args) {
        let [selector, options, callback] = parseCompilerArgs(args);
        options = u.options(options, {
            selector,
            isDefault: up.framework.evaling,
            priority: 0,
            batch: false,
            jQuery: false
        });
        return u.assign(callback, options);
    }
    function insertCompiler(queue, newCompiler) {
        if (up.framework.booted) {
            up.puts('up.compiler()', 'Compiler %s was registered after booting Unpoly. Compiler will run for future fragments.', newCompiler.selector);
        }
        let existingCompiler;
        let index = 0;
        while ((existingCompiler = queue[index]) && (existingCompiler.priority >= newCompiler.priority)) {
            index += 1;
        }
        queue.splice(index, 0, newCompiler);
        return newCompiler;
    }
    function compile(fragment, options) {
        const orderedCompilers = macros.concat(compilers);
        const pass = new up.CompilerPass(fragment, orderedCompilers, options);
        pass.run();
    }
    function registerDestructor(element, destructor) {
        let destructors = element.upDestructors;
        if (!destructors) {
            destructors = [];
            element.upDestructors = destructors;
            element.classList.add('up-can-clean');
        }
        if (u.isArray(destructor)) {
            destructors.push(...destructor);
        }
        else {
            destructors.push(destructor);
        }
    }
    function clean(fragment, options = {}) {
        new up.DestructorPass(fragment, options).run();
    }
    function readData(element) {
        element = up.fragment.get(element);
        return e.jsonAttr(element, 'up-data') || {};
    }
    function reset() {
        compilers = u.filter(compilers, 'isDefault');
        macros = u.filter(macros, 'isDefault');
    }
    up.on('up:framework:reset', reset);
    return {
        compiler: registerCompiler,
        macro: registerMacro,
        $compiler: registerJQueryCompiler,
        $macro: registerJQueryMacro,
        destructor: registerDestructor,
        compile,
        clean,
        data: readData
    };
})();
up.compiler = up.syntax.compiler;
up.$compiler = up.syntax.$compiler;
up.destructor = up.syntax.destructor;
up.macro = up.syntax.macro;
up.$macro = up.syntax.$macro;
up.data = up.syntax.data;


/***/ }),
/* 77 */
/***/ (() => {

up.history = (function () {
    const u = up.util;
    const e = up.element;
    const config = new up.Config(() => ({
        enabled: true,
        restoreTargets: ['body']
    }));
    let previousLocation;
    let nextPreviousLocation;
    function reset() {
        config.reset();
        previousLocation = undefined;
        nextPreviousLocation = undefined;
        trackCurrentLocation();
    }
    const DEFAULT_NORMALIZE_OPTIONS = { hash: true };
    function normalizeURL(url, options) {
        options = u.merge(DEFAULT_NORMALIZE_OPTIONS, options);
        return u.normalizeURL(url, options);
    }
    function currentLocation(normalizeOptions) {
        return normalizeURL(location.href, normalizeOptions);
    }
    function trackCurrentLocation() {
        const url = currentLocation();
        if (nextPreviousLocation !== url) {
            previousLocation = nextPreviousLocation;
            nextPreviousLocation = url;
        }
    }
    trackCurrentLocation();
    const ADDITIONAL_NORMALIZE_OPTIONS_FOR_COMPARISON = { trailingSlash: false };
    function isLocation(url, options) {
        options = u.merge(ADDITIONAL_NORMALIZE_OPTIONS_FOR_COMPARISON, options);
        return normalizeURL(url, options) === currentLocation(options);
    }
    function replace(url, options = {}) {
        url = normalizeURL(url);
        if (manipulate('replaceState', url) && (options.event !== false)) {
            emit('up:location:changed', { url, reason: 'replace', log: `Replaced state for ${url}` });
        }
    }
    function push(url) {
        url = normalizeURL(url);
        if (!isLocation(url) && manipulate('pushState', url)) {
            up.emit('up:location:changed', { url, reason: 'push', log: `Advanced to location ${url}` });
        }
    }
    function manipulate(method, url) {
        if (config.enabled) {
            const state = buildState();
            window.history[method](state, '', url);
            trackCurrentLocation();
            return true;
        }
    }
    function buildState() {
        return { up: {} };
    }
    async function restoreStateOnPop(state) {
        if (state?.up) {
            let url = currentLocation();
            await up.render({
                url,
                history: true,
                location: url,
                peel: true,
                layer: 'root',
                target: config.restoreTargets,
                cache: true,
                scroll: 'restore',
                saveScroll: false
            });
            url = currentLocation();
            emit('up:location:changed', { url, reason: 'pop', log: `Restored location ${url}` });
        }
        else {
            up.puts('pop', 'Ignoring a state not pushed by Unpoly (%o)', state);
        }
    }
    function onPop(event) {
        trackCurrentLocation();
        up.viewport.saveScroll({ location: previousLocation });
        const { state } = event;
        restoreStateOnPop(state);
    }
    function emit(...args) {
        const historyLayer = u.find(up.layer.stack.reversed(), 'history');
        return historyLayer.emit(...args);
    }
    function register() {
        window.addEventListener('popstate', onPop);
        if (up.protocol.initialRequestMethod() === 'GET') {
            replace(currentLocation(), { event: false });
        }
    }
    up.on('up:framework:boot', function () {
        if ('jasmine' in window) {
            register();
        }
        else {
            setTimeout(register, 100);
        }
    });
    up.macro('a[up-back], [up-href][up-back]', function (link) {
        if (previousLocation) {
            e.setMissingAttrs(link, {
                'up-href': previousLocation,
                'up-scroll': 'restore'
            });
            link.removeAttribute('up-back');
            up.link.makeFollowable(link);
        }
    });
    up.on('up:framework:reset', reset);
    return {
        config,
        push,
        replace,
        get location() { return currentLocation(); },
        get previousLocation() { return previousLocation; },
        normalizeURL,
        isLocation
    };
})();


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(79);
const u = up.util;
const e = up.element;
up.fragment = (function () {
    const config = new up.Config(() => ({
        badTargetClasses: [/^up-/],
        navigateOptions: {
            solo: true,
            feedback: true,
            cache: 'auto',
            fallback: true,
            focus: 'auto',
            scroll: 'auto',
            history: 'auto',
            peel: true
        },
        matchAroundOrigin: true,
        runScripts: false,
        autoHistoryTargets: [':main'],
        autoFocus: ['hash', 'autofocus', 'main-if-main', 'target-if-lost'],
        autoScroll: ['hash', 'layer-if-main']
    }));
    u.delegate(config, 'mainTargets', () => up.layer.config.any);
    function reset() {
        config.reset();
    }
    function sourceOf(element, options = {}) {
        element = getSmart(element, options);
        return e.closestAttr(element, 'up-source');
    }
    function timeOf(element) {
        return e.closestAttr(element, 'up-time') || '0';
    }
    const render = up.mockable((...args) => {
        return u.asyncify(function () {
            let options = parseTargetAndOptions(args);
            options = up.RenderOptions.preprocess(options);
            up.browser.assertConfirmed(options);
            let guardEvent = u.pluckKey(options, 'guardEvent');
            if (guardEvent) {
                guardEvent.renderOptions = options;
                up.event.assertEmitted(guardEvent, { target: options.origin });
            }
            up.RenderOptions.assertContentGiven(options);
            return (options.url ? renderRemoteContent : renderLocalContent)(options);
        });
    });
    function renderRemoteContent(options) {
        let execute = () => new up.Change.FromURL(options).execute();
        return up.feedback.aroundForOptions(options, execute);
    }
    function renderLocalContent(options) {
        up.network.mimicLocalRequest(options);
        return new up.Change.FromContent(options).execute();
    }
    const navigate = up.mockable((...args) => {
        const options = parseTargetAndOptions(args);
        return render({ ...options, navigate: true });
    });
    function hello(element, options = {}) {
        element = getSmart(element);
        const keepPlans = options.keepPlans || [];
        const skip = keepPlans.map(function (plan) {
            emitFragmentKept(plan);
            return plan.oldElement;
        });
        up.syntax.compile(element, { skip, layer: options.layer });
        emitFragmentInserted(element, options);
        return element;
    }
    function emitFragmentInserted(element, options) {
        return up.emit(element, 'up:fragment:inserted', {
            log: ['Inserted fragment %o', element],
            origin: options.origin
        });
    }
    function emitFragmentKeep(keepPlan) {
        const log = ['Keeping fragment %o', keepPlan.oldElement];
        const callback = e.callbackAttr(keepPlan.oldElement, 'up-on-keep', ['newFragment', 'newData']);
        return emitFromKeepPlan(keepPlan, 'up:fragment:keep', { log, callback });
    }
    function emitFragmentKept(keepPlan) {
        const log = ['Kept fragment %o', keepPlan.oldElement];
        return emitFromKeepPlan(keepPlan, 'up:fragment:kept', { log });
    }
    function emitFromKeepPlan(keepPlan, eventType, emitDetails) {
        const keepable = keepPlan.oldElement;
        const event = up.event.build(eventType, {
            newFragment: keepPlan.newElement,
            newData: keepPlan.newData
        });
        return up.emit(keepable, event, emitDetails);
    }
    function emitFragmentDestroyed(fragment, options) {
        const log = options.log ?? ['Destroyed fragment %o', fragment];
        const parent = options.parent || document;
        return up.emit(parent, 'up:fragment:destroyed', { fragment, parent, log });
    }
    function isDestroying(element) {
        return !!e.closest(element, '.up-destroying');
    }
    const isNotDestroying = u.negate(isDestroying);
    function getSmart(...args) {
        const options = u.extractOptions(args);
        const selector = args.pop();
        const root = args[0];
        if (u.isElementish(selector)) {
            return e.get(selector);
        }
        if (root) {
            return getDumb(root, selector, options);
        }
        return new up.FragmentFinder({
            selector,
            origin: options.origin,
            layer: options.layer
        }).find();
    }
    function getDumb(...args) {
        return getAll(...args)[0];
    }
    const CSS_HAS_SUFFIX_PATTERN = /:has\(([^)]+)\)$/;
    function getAll(...args) {
        const options = u.extractOptions(args);
        let selector = args.pop();
        const root = args[0];
        selector = parseSelector(selector, root, options);
        return selector.descendants(root || document);
    }
    function getSubtree(element, selector, options = {}) {
        selector = parseSelector(selector, element, options);
        return selector.subtree(element);
    }
    function contains(element, selector) {
        return getSubtree(element, selector).length > 0;
    }
    function closest(element, selector, options) {
        element = e.get(element);
        selector = parseSelector(selector, element, options);
        return selector.closest(element);
    }
    function destroy(...args) {
        const options = parseTargetAndOptions(args);
        if (options.element = getSmart(options.target, options)) {
            new up.Change.DestroyFragment(options).execute();
        }
        return up.migrate.formerlyAsync?.('up.destroy()');
    }
    function parseTargetAndOptions(args) {
        const options = u.parseArgIntoOptions(args, 'target');
        if (u.isElement(options.target)) {
            options.origin || (options.origin = options.target);
        }
        return options;
    }
    function markFragmentAsDestroying(element) {
        element.classList.add('up-destroying');
        element.setAttribute('aria-hidden', 'true');
    }
    function reload(...args) {
        const options = parseTargetAndOptions(args);
        options.target || (options.target = ':main');
        const element = getSmart(options.target, options);
        options.url || (options.url = sourceOf(element));
        options.headers || (options.headers = {});
        options.headers[up.protocol.headerize('reloadFromTime')] = timeOf(element);
        return render(options);
    }
    function visit(url, options) {
        return navigate({ ...options, url });
    }
    function successKey(key) {
        return u.unprefixCamelCase(key, 'fail');
    }
    function failKey(key) {
        if (!key.match(/^fail[A-Z]/)) {
            return u.prefixCamelCase(key, 'fail');
        }
    }
    function toTarget(element) {
        if (u.isString(element)) {
            return element;
        }
        element = e.get(element);
        let value;
        if (e.isSingleton(element)) {
            return e.tagName(element);
        }
        else if (value = element.getAttribute("up-id")) {
            return e.attributeSelector('up-id', value);
        }
        else if (value = element.getAttribute("id")) {
            return e.idSelector(value);
        }
        else if (value = element.getAttribute("name")) {
            return e.tagName(element) + e.attributeSelector('name', value);
        }
        else if (value = u.presence(u.filter(element.classList, isGoodClassForTarget))) {
            let selector = '';
            for (let goodClass of value) {
                selector += e.classSelector(goodClass);
            }
            return selector;
        }
        else {
            return e.tagName(element);
        }
    }
    function isGoodClassForTarget(klass) {
        function matchesPattern(pattern) {
            if (u.isRegExp(pattern)) {
                return pattern.test(klass);
            }
            else {
                return pattern === klass;
            }
        }
        return !u.some(config.badTargetClasses, matchesPattern);
    }
    function resolveOriginReference(target, options = {}) {
        const { origin } = options;
        return target.replace(/&|:origin\b/, function (match) {
            if (origin) {
                return toTarget(origin);
            }
            else {
                up.fail('Missing { origin } element to resolve "%s" reference (found in %s)', match, target);
            }
        });
    }
    function expandTargets(targets, options = {}) {
        const { layer } = options;
        if (layer !== 'new' && !(layer instanceof up.Layer)) {
            up.fail('Must pass an up.Layer as { layer } option, but got %o', layer);
        }
        targets = u.copy(u.wrapList(targets));
        const expanded = [];
        while (targets.length) {
            const target = targets.shift();
            if (target === ':main' || target === true) {
                const mode = layer === 'new' ? options.mode : layer.mode;
                targets.unshift(...up.layer.mainTargets(mode));
            }
            else if (target === ':layer') {
                if (layer !== 'new' && !layer.opening) {
                    targets.unshift(layer.getFirstSwappableElement());
                }
            }
            else if (u.isElementish(target)) {
                expanded.push(toTarget(target));
            }
            else if (u.isString(target)) {
                expanded.push(resolveOriginReference(target, options));
            }
            else {
            }
        }
        return u.uniq(expanded);
    }
    function parseSelector(selector, element, options = {}) {
        const filters = [];
        if (!options.destroying) {
            filters.push(isNotDestroying);
        }
        options.layer || (options.layer = element);
        const layers = up.layer.getAll(options);
        if (options.layer !== 'any' && !(element && e.isDetached(element))) {
            filters.push(match => u.some(layers, layer => layer.contains(match)));
        }
        let expandedTargets = up.fragment.expandTargets(selector, { ...options, layer: layers[0] });
        expandedTargets = expandedTargets.map(function (target) {
            target = target.replace(CSS_HAS_SUFFIX_PATTERN, function (match, descendantSelector) {
                filters.push(element => element.querySelector(descendantSelector));
                return '';
            });
            return target || '*';
        });
        return new up.Selector(expandedTargets, filters);
    }
    function hasAutoHistory(fragment) {
        if (contains(fragment, config.autoHistoryTargets)) {
            return true;
        }
        else {
            up.puts('up.render()', "Will not auto-update history because fragment doesn't contain a selector from up.fragment.config.autoHistoryTargets");
            return false;
        }
    }
    function matches(element, selector, options = {}) {
        element = e.get(element);
        selector = parseSelector(selector, element, options);
        return selector.matches(element);
    }
    up.on('up:framework:boot', function () {
        const { body } = document;
        body.setAttribute('up-source', u.normalizeURL(location.href, { hash: false }));
        hello(body);
        if (!up.browser.canPushState()) {
            return up.warn('Cannot push history changes. Next fragment update will load in a new page.');
        }
    });
    up.on('up:framework:reset', reset);
    return {
        config,
        reload,
        destroy,
        render,
        navigate,
        get: getSmart,
        getDumb,
        all: getAll,
        subtree: getSubtree,
        contains,
        closest,
        source: sourceOf,
        hello,
        visit,
        markAsDestroying: markFragmentAsDestroying,
        emitInserted: emitFragmentInserted,
        emitDestroyed: emitFragmentDestroyed,
        emitKeep: emitFragmentKeep,
        emitKept: emitFragmentKept,
        successKey,
        failKey,
        expandTargets,
        toTarget,
        matches,
        hasAutoHistory
    };
})();
up.reload = up.fragment.reload;
up.destroy = up.fragment.destroy;
up.render = up.fragment.render;
up.navigate = up.fragment.navigate;
up.hello = up.fragment.hello;
up.visit = up.fragment.visit;
u.delegate(up, 'context', () => up.layer.current);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(81);
up.viewport = (function () {
    const u = up.util;
    const e = up.element;
    const f = up.fragment;
    const config = new up.Config(() => ({
        viewportSelectors: ['[up-viewport]', '[up-fixed]'],
        fixedTop: ['[up-fixed~=top]'],
        fixedBottom: ['[up-fixed~=bottom]'],
        anchoredRight: ['[up-anchored~=right]', '[up-fixed~=top]', '[up-fixed~=bottom]', '[up-fixed~=right]'],
        revealSnap: 200,
        revealPadding: 0,
        revealTop: false,
        revealMax() { return 0.5 * window.innerHeight; },
        scrollSpeed: 1
    }));
    const scrollingController = new up.MotionController('scrolling');
    function reset() {
        config.reset();
        scrollingController.reset();
    }
    function scroll(viewport, scrollTop, options = {}) {
        viewport = f.get(viewport, options);
        const motion = new up.ScrollMotion(viewport, scrollTop, options);
        scrollingController.startMotion(viewport, motion, options);
    }
    function anchoredRight() {
        const selector = config.anchoredRight.join(',');
        return f.all(selector, { layer: 'root' });
    }
    function reveal(element, options) {
        options = u.options(options);
        element = f.get(element, options);
        if (!(options.layer = up.layer.get(element))) {
            return up.error.failed.async('Cannot reveal a detached element');
        }
        if (options.peel) {
            options.layer.peel();
        }
        const motion = new up.RevealMotion(element, options);
        return scrollingController.startMotion(element, motion, options);
    }
    function doFocus(element, options = {}) {
        if (up.browser.isIE11()) {
            const viewport = closest(element);
            const oldScrollTop = viewport.scrollTop;
            element.focus();
            viewport.scrollTop = oldScrollTop;
        }
        else {
            element.focus({ preventScroll: true });
        }
        if (!options.preventScroll) {
            return reveal(element);
        }
    }
    function tryFocus(element, options) {
        doFocus(element, options);
        return element === document.activeElement;
    }
    function isNativelyFocusable(element) {
        return e.matches(element, 'a[href], button, textarea, input, select');
    }
    function makeFocusable(element) {
        if (!element.hasAttribute('tabindex') && !isNativelyFocusable(element)) {
            element.setAttribute('tabindex', '-1');
            element.classList.add('up-focusable-content');
        }
    }
    function revealHash(hash = location.hash, options) {
        let match = firstHashTarget(hash, options);
        if (match) {
            return up.reveal(match, { top: true });
        }
    }
    function allSelector() {
        return [rootSelector(), ...config.viewportSelectors].join(',');
    }
    function closest(target, options = {}) {
        const element = f.get(target, options);
        return e.closest(element, allSelector());
    }
    function getSubtree(element, options = {}) {
        element = f.get(element, options);
        return e.subtree(element, allSelector());
    }
    function getAround(element, options = {}) {
        element = f.get(element, options);
        return e.around(element, allSelector());
    }
    function getAll(options = {}) {
        return f.all(allSelector(), options);
    }
    function rootSelector() {
        let element;
        if ((element = document.scrollingElement)) {
            return element.tagName;
        }
        else {
            return 'html';
        }
    }
    function getRoot() {
        return document.querySelector(rootSelector());
    }
    function rootWidth() {
        return e.root.clientWidth;
    }
    function rootHeight() {
        return e.root.clientHeight;
    }
    function isRoot(element) {
        return e.matches(element, rootSelector());
    }
    function rootHasReducedWidthFromScrollbar() {
        return window.innerWidth > document.documentElement.offsetWidth;
    }
    function rootOverflowElement() {
        const { body } = document;
        const html = document.documentElement;
        const element = u.find([html, body], wasChosenAsOverflowingElement);
        return element || getRoot();
    }
    function wasChosenAsOverflowingElement(element) {
        const overflowY = e.style(element, 'overflow-y');
        return overflowY === 'auto' || overflowY === 'scroll';
    }
    const scrollbarWidth = u.memoize(function () {
        const outerStyle = {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100px',
            height: '100px',
            overflowY: 'scroll'
        };
        const outer = up.element.affix(document.body, '[up-viewport]', { style: outerStyle });
        const width = outer.offsetWidth - outer.clientWidth;
        up.element.remove(outer);
        return width;
    });
    function scrollTopKey(viewport) {
        return up.fragment.toTarget(viewport);
    }
    function fixedElements(root = document) {
        const queryParts = ['[up-fixed]'].concat(config.fixedTop).concat(config.fixedBottom);
        return root.querySelectorAll(queryParts.join(','));
    }
    function saveScroll(...args) {
        const [viewports, options] = parseOptions(args);
        const url = options.location || options.layer.location;
        if (url) {
            const tops = options.tops ?? getScrollTops(viewports);
            options.layer.lastScrollTops.set(url, tops);
        }
    }
    function getScrollTops(viewports) {
        return u.mapObject(viewports, viewport => [scrollTopKey(viewport), viewport.scrollTop]);
    }
    function restoreScroll(...args) {
        const [viewports, options] = parseOptions(args);
        const url = options.layer.location;
        const scrollTopsForURL = options.layer.lastScrollTops.get(url) || {};
        up.puts('up.viewport.restoreScroll()', 'Restoring scroll positions for URL %s to %o', url, scrollTopsForURL);
        return setScrollTops(viewports, scrollTopsForURL);
    }
    function parseOptions(args) {
        const options = u.copy(u.extractOptions(args));
        options.layer = up.layer.get(options);
        let viewports;
        if (args[0]) {
            viewports = [closest(args[0], options)];
        }
        else if (options.around) {
            viewports = getAround(options.around, options);
        }
        else {
            viewports = getAll(options);
        }
        return [viewports, options];
    }
    function resetScroll(...args) {
        const [viewports, _options] = parseOptions(args);
        return setScrollTops(viewports, {});
    }
    function setScrollTops(viewports, tops) {
        const allScrollPromises = u.map(viewports, function (viewport) {
            const key = scrollTopKey(viewport);
            const scrollTop = tops[key] || 0;
            return scroll(viewport, scrollTop, { duration: 0 });
        });
        return Promise.all(allScrollPromises);
    }
    function absolutize(element, options = {}) {
        const viewport = closest(element);
        const viewportRect = viewport.getBoundingClientRect();
        const originalRect = element.getBoundingClientRect();
        const boundsRect = new up.Rect({
            left: originalRect.left - viewportRect.left,
            top: originalRect.top - viewportRect.top,
            width: originalRect.width,
            height: originalRect.height
        });
        options.afterMeasure?.();
        e.setStyle(element, {
            position: element.style.position === 'static' ? 'static' : 'relative',
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
            left: 'auto',
            width: '100%',
            height: '100%'
        });
        const bounds = e.createFromSelector('up-bounds');
        e.insertBefore(element, bounds);
        bounds.appendChild(element);
        const moveBounds = function (diffX, diffY) {
            boundsRect.left += diffX;
            boundsRect.top += diffY;
            return e.setStyle(bounds, boundsRect);
        };
        moveBounds(0, 0);
        const newElementRect = element.getBoundingClientRect();
        moveBounds(originalRect.left - newElementRect.left, originalRect.top - newElementRect.top);
        u.each(fixedElements(element), e.fixedToAbsolute);
        return {
            bounds,
            moveBounds
        };
    }
    function firstHashTarget(hash, options = {}) {
        if (hash = pureHash(hash)) {
            const selector = [
                e.attributeSelector('id', hash),
                'a' + e.attributeSelector('name', hash)
            ].join(',');
            return f.get(selector, options);
        }
    }
    function pureHash(value) {
        return value?.replace(/^#/, '');
    }
    let userScrolled = false;
    up.on('scroll', { once: true, beforeBoot: true }, () => userScrolled = true);
    up.on('up:framework:boot', function () {
        u.task(function () {
            if (!userScrolled) {
                return revealHash();
            }
        });
    });
    up.on(window, 'hashchange', () => revealHash());
    up.on('up:framework:reset', reset);
    return {
        reveal,
        revealHash,
        firstHashTarget,
        scroll,
        config,
        get: closest,
        subtree: getSubtree,
        around: getAround,
        all: getAll,
        rootSelector,
        get root() { return getRoot(); },
        rootWidth,
        rootHeight,
        rootHasReducedWidthFromScrollbar,
        rootOverflowElement,
        isRoot,
        scrollbarWidth,
        saveScroll,
        restoreScroll,
        resetScroll,
        anchoredRight,
        absolutize,
        focus: doFocus,
        tryFocus,
        makeFocusable,
    };
})();
up.focus = up.viewport.focus;
up.scroll = up.viewport.scroll;
up.reveal = up.viewport.reveal;


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 82 */
/***/ (() => {

up.motion = (function () {
    const u = up.util;
    const e = up.element;
    let namedAnimations = {};
    let namedTransitions = {};
    const motionController = new up.MotionController('motion');
    const config = new up.Config(() => ({
        duration: 175,
        easing: 'ease',
        enabled: !matchMedia('(prefers-reduced-motion: reduce)').matches
    }));
    function pickDefault(registry) {
        return u.pickBy(registry, value => value.isDefault);
    }
    function reset() {
        motionController.reset();
        namedAnimations = pickDefault(namedAnimations);
        namedTransitions = pickDefault(namedTransitions);
        config.reset();
    }
    function isEnabled() {
        return config.enabled;
    }
    function animate(element, animation, options) {
        element = up.fragment.get(element);
        options = u.options(options);
        const animationFn = findAnimationFn(animation);
        const willRun = willAnimate(element, animation, options);
        if (willRun) {
            const runNow = () => animationFn(element, options);
            return motionController.startFunction(element, runNow, options);
        }
        else {
            return skipAnimate(element, animation);
        }
    }
    function willAnimate(element, animationOrTransition, options) {
        applyConfig(options);
        return isEnabled() && !isNone(animationOrTransition) && (options.duration > 0) && !e.isSingleton(element);
    }
    function skipAnimate(element, animation) {
        if (u.isOptions(animation)) {
            e.setStyle(element, animation);
        }
        return Promise.resolve();
    }
    function animateNow(element, lastFrame, options) {
        options = { ...options, finishEvent: motionController.finishEvent };
        const cssTransition = new up.CSSTransition(element, lastFrame, options);
        return cssTransition.start();
    }
    function applyConfig(options) {
        options.easing || (options.easing = config.easing);
        options.duration || (options.duration = config.duration);
    }
    function findNamedAnimation(name) {
        return namedAnimations[name] || up.fail("Unknown animation %o", name);
    }
    function finish(element) {
        return motionController.finish(element);
    }
    function morph(oldElement, newElement, transitionObject, options) {
        options = u.options(options);
        applyConfig(options);
        oldElement = up.fragment.get(oldElement);
        newElement = up.fragment.get(newElement);
        const transitionFn = findTransitionFn(transitionObject);
        const willMorph = willAnimate(oldElement, transitionFn, options);
        const beforeStart = u.pluckKey(options, 'beforeStart') || u.noop;
        const afterInsert = u.pluckKey(options, 'afterInsert') || u.noop;
        const beforeDetach = u.pluckKey(options, 'beforeDetach') || u.noop;
        const afterDetach = u.pluckKey(options, 'afterDetach') || u.noop;
        const scrollNew = u.pluckKey(options, 'scrollNew') || u.asyncNoop;
        beforeStart();
        if (willMorph) {
            if (motionController.isActive(oldElement) && (options.trackMotion === false)) {
                return transitionFn(oldElement, newElement, options);
            }
            up.puts('up.morph()', 'Morphing %o to %o with transition %O', oldElement, newElement, transitionObject);
            const viewport = up.viewport.get(oldElement);
            const scrollTopBeforeReveal = viewport.scrollTop;
            const oldRemote = up.viewport.absolutize(oldElement, {
                afterMeasure() {
                    e.insertBefore(oldElement, newElement);
                    afterInsert();
                }
            });
            const trackable = async function () {
                await scrollNew();
                const scrollTopAfterReveal = viewport.scrollTop;
                oldRemote.moveBounds(0, scrollTopAfterReveal - scrollTopBeforeReveal);
                await transitionFn(oldElement, newElement, options);
                beforeDetach();
                e.remove(oldRemote.bounds);
                afterDetach();
            };
            return motionController.startFunction([oldElement, newElement], trackable, options);
        }
        else {
            beforeDetach();
            swapElementsDirectly(oldElement, newElement);
            afterInsert();
            afterDetach();
            return scrollNew();
        }
    }
    function findTransitionFn(object) {
        if (isNone(object)) {
            return undefined;
        }
        else if (u.isFunction(object)) {
            return object;
        }
        else if (u.isArray(object)) {
            return composeTransitionFn(...object);
        }
        else if (u.isString(object)) {
            let namedTransition;
            if (object.indexOf('/') >= 0) {
                return composeTransitionFn(...object.split('/'));
            }
            else if (namedTransition = namedTransitions[object]) {
                return findTransitionFn(namedTransition);
            }
        }
        else {
            return up.fail("Unknown transition %o", object);
        }
    }
    function composeTransitionFn(oldAnimation, newAnimation) {
        if (!isNone(oldAnimation) && !isNone(newAnimation)) {
            const oldAnimationFn = findAnimationFn(oldAnimation) || u.asyncNoop;
            const newAnimationFn = findAnimationFn(newAnimation) || u.asyncNoop;
            return (oldElement, newElement, options) => Promise.all([
                oldAnimationFn(oldElement, options),
                newAnimationFn(newElement, options)
            ]);
        }
    }
    function findAnimationFn(object) {
        if (isNone(object)) {
            return undefined;
        }
        else if (u.isFunction(object)) {
            return object;
        }
        else if (u.isString(object)) {
            return findNamedAnimation(object);
        }
        else if (u.isOptions(object)) {
            return (element, options) => animateNow(element, object, options);
        }
        else {
            return up.fail('Unknown animation %o', object);
        }
    }
    const swapElementsDirectly = up.mockable(function (oldElement, newElement) {
        e.replace(oldElement, newElement);
    });
    function registerTransition(name, transition) {
        const fn = findTransitionFn(transition);
        fn.isDefault = up.framework.evaling;
        namedTransitions[name] = fn;
    }
    function registerAnimation(name, animation) {
        const fn = findAnimationFn(animation);
        fn.isDefault = up.framework.evaling;
        namedAnimations[name] = fn;
    }
    up.on('up:framework:boot', function () {
        if (!isEnabled()) {
            up.puts('up.motion', 'Animations are disabled');
        }
    });
    function isNone(animationOrTransition) {
        return !animationOrTransition || animationOrTransition === 'none';
    }
    function registerOpacityAnimation(name, from, to) {
        registerAnimation(name, function (element, options) {
            element.style.opacity = 0;
            e.setStyle(element, { opacity: from });
            return animateNow(element, { opacity: to }, options);
        });
    }
    registerOpacityAnimation('fade-in', 0, 1);
    registerOpacityAnimation('fade-out', 1, 0);
    function translateCSS(dx, dy) {
        return { transform: `translate(${dx}px, ${dy}px)` };
    }
    function untranslatedBox(element) {
        e.setStyle(element, translateCSS(0, 0));
        return element.getBoundingClientRect();
    }
    function registerMoveAnimations(direction, boxToTransform) {
        const animationToName = `move-to-${direction}`;
        const animationFromName = `move-from-${direction}`;
        registerAnimation(animationToName, function (element, options) {
            const box = untranslatedBox(element);
            const transform = boxToTransform(box);
            return animateNow(element, transform, options);
        });
        registerAnimation(animationFromName, function (element, options) {
            const box = untranslatedBox(element);
            const transform = boxToTransform(box);
            e.setStyle(element, transform);
            return animateNow(element, translateCSS(0, 0), options);
        });
    }
    registerMoveAnimations('top', function (box) {
        const travelDistance = box.top + box.height;
        return translateCSS(0, -travelDistance);
    });
    registerMoveAnimations('bottom', function (box) {
        const travelDistance = up.viewport.rootHeight() - box.top;
        return translateCSS(0, travelDistance);
    });
    registerMoveAnimations('left', function (box) {
        const travelDistance = box.left + box.width;
        return translateCSS(-travelDistance, 0);
    });
    registerMoveAnimations('right', function (box) {
        const travelDistance = up.viewport.rootWidth() - box.left;
        return translateCSS(travelDistance, 0);
    });
    registerTransition('cross-fade', ['fade-out', 'fade-in']);
    registerTransition('move-left', ['move-to-left', 'move-from-right']);
    registerTransition('move-right', ['move-to-right', 'move-from-left']);
    registerTransition('move-up', ['move-to-top', 'move-from-bottom']);
    registerTransition('move-down', ['move-to-bottom', 'move-from-top']);
    up.on('up:framework:reset', reset);
    return {
        morph,
        animate,
        finish,
        finishCount() { return motionController.finishCount; },
        transition: registerTransition,
        animation: registerAnimation,
        config,
        isEnabled,
        isNone,
        willAnimate,
        swapElementsDirectly
    };
})();
up.transition = up.motion.transition;
up.animation = up.motion.animation;
up.morph = up.motion.morph;
up.animate = up.motion.animate;


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(84);
const u = up.util;
up.network = (function () {
    const config = new up.Config(() => ({
        concurrency: 4,
        wrapMethod: true,
        cacheSize: 70,
        cacheExpiry: 1000 * 60 * 5,
        badDownlink: 0.6,
        badRTT: 750,
        badResponseTime: 400,
        autoCache(request) { return request.isSafe(); },
        clearCache(request, _response) { return !request.isSafe(); },
        requestMetaKeys: ['target', 'failTarget', 'mode', 'failMode', 'context', 'failContext'],
        progressBar: true
    }));
    const queue = new up.Request.Queue();
    const cache = new up.Request.Cache();
    let progressBar = null;
    function reset() {
        abortRequests();
        queue.reset();
        config.reset();
        cache.clear();
        progressBar?.destroy();
        progressBar = null;
    }
    function makeRequest(...args) {
        const request = new up.Request(parseRequestOptions(args));
        useCachedRequest(request) || queueRequest(request);
        handleSolo(request);
        return request;
    }
    function mimicLocalRequest(options) {
        handleSolo(options);
        let clearCache = options.clearCache;
        if (clearCache) {
            cache.clear(clearCache);
        }
    }
    function handleSolo(requestOrOptions) {
        let solo = requestOrOptions.solo;
        if (solo && isBusy()) {
            up.puts('up.request()', 'Change with { solo } option will abort other requests');
            if (requestOrOptions instanceof up.Request) {
                queue.abortExcept(requestOrOptions, solo);
            }
            else {
                abortRequests(solo);
            }
        }
    }
    function parseRequestOptions(args) {
        const options = u.extractOptions(args);
        if (!options.url) {
            options.url = args[0];
        }
        up.migrate.handleRequestOptions?.(options);
        return options;
    }
    function useCachedRequest(request) {
        let cachedRequest;
        if (request.willCache() && (cachedRequest = cache.get(request))) {
            up.puts('up.request()', 'Re-using previous request to %s %s', request.method, request.url);
            if (!request.preload) {
                queue.promoteToForeground(cachedRequest);
            }
            request.followState(cachedRequest);
            return true;
        }
    }
    function queueRequest(request) {
        if (request.preload && !request.isSafe()) {
            up.fail('Will not preload request to %s', request.description);
        }
        handleCaching(request);
        queue.asap(request);
        return true;
    }
    function handleCaching(request) {
        if (request.willCache()) {
            cache.set(request, request);
        }
        return u.always(request, function (response) {
            let clearCache = response.clearCache ?? request.clearCache ?? config.clearCache(request, response);
            if (clearCache) {
                cache.clear(clearCache);
            }
            if (request.willCache() || cache.get(request)) {
                cache.set(request, request);
            }
            if (!response.ok) {
                cache.remove(request);
            }
        });
    }
    function isBusy() {
        return queue.isBusy();
    }
    const isIdle = u.negate(isBusy);
    function loadPage(requestsAttrs) {
        new up.Request(requestsAttrs).loadPage();
    }
    function shouldReduceRequests() {
        let netInfo = navigator.connection;
        if (netInfo) {
            return netInfo.saveData ||
                (netInfo.rtt && (netInfo.rtt > config.badRTT)) ||
                (netInfo.downlink && (netInfo.downlink < config.badDownlink));
        }
    }
    function abortRequests(...args) {
        queue.abort(...args);
    }
    function registerAliasForRedirect(request, response) {
        if (request.cache && response.url && request.url !== response.url) {
            const newRequest = request.variant({
                method: response.method,
                url: response.url
            });
            cache.alias(request, newRequest);
        }
    }
    function isSafeMethod(method) {
        return u.contains(['GET', 'OPTIONS', 'HEAD'], u.normalizeMethod(method));
    }
    function onLate() {
        if (u.evalOption(config.progressBar)) {
            progressBar = new up.ProgressBar();
        }
    }
    function onRecover() {
        progressBar?.conclude();
    }
    up.on('up:request:late', onLate);
    up.on('up:request:recover', onRecover);
    up.on('up:framework:reset', reset);
    return {
        request: makeRequest,
        cache,
        isIdle,
        isBusy,
        isSafeMethod,
        config,
        abort: abortRequests,
        registerAliasForRedirect,
        queue,
        shouldReduceRequests,
        mimicLocalRequest,
        loadPage,
    };
})();
up.request = up.network.request;
up.cache = up.network.cache;


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(86);
const u = up.util;
const e = up.element;
up.layer = (function () {
    const LAYER_CLASSES = [
        up.Layer.Root,
        up.Layer.Modal,
        up.Layer.Popup,
        up.Layer.Drawer,
        up.Layer.Cover
    ];
    const config = new up.Config(function () {
        const newConfig = {
            mode: 'modal',
            any: {
                mainTargets: [
                    "[up-main='']",
                    'main',
                    ':layer'
                ]
            },
            root: {
                mainTargets: ['[up-main~=root]'],
                history: true
            },
            overlay: {
                mainTargets: ['[up-main~=overlay]'],
                openAnimation: 'fade-in',
                closeAnimation: 'fade-out',
                dismissLabel: '×',
                dismissAriaLabel: 'Dismiss dialog',
                dismissable: true,
                history: 'auto'
            },
            cover: {
                mainTargets: ['[up-main~=cover]']
            },
            drawer: {
                mainTargets: ['[up-main~=drawer]'],
                backdrop: true,
                position: 'left',
                size: 'medium',
                openAnimation(layer) {
                    switch (layer.position) {
                        case 'left': return 'move-from-left';
                        case 'right': return 'move-from-right';
                    }
                },
                closeAnimation(layer) {
                    switch (layer.position) {
                        case 'left': return 'move-to-left';
                        case 'right': return 'move-to-right';
                    }
                }
            },
            modal: {
                mainTargets: ['[up-main~=modal]'],
                backdrop: true,
                size: 'medium'
            },
            popup: {
                mainTargets: ['[up-main~=popup]'],
                position: 'bottom',
                size: 'medium',
                align: 'left',
                dismissable: 'outside key'
            }
        };
        for (let Class of LAYER_CLASSES) {
            newConfig[Class.mode].Class = Class;
        }
        return newConfig;
    });
    let stack = null;
    let handlers = [];
    function mainTargets(mode) {
        return u.flatMap(modeConfigs(mode), 'mainTargets');
    }
    function modeConfigs(mode) {
        if (mode === 'root') {
            return [config.root, config.any];
        }
        else {
            return [config[mode], config.overlay, config.any];
        }
    }
    function normalizeOptions(options) {
        up.migrate.handleLayerOptions?.(options);
        if (u.isGiven(options.layer)) {
            let match = String(options.layer).match(/^(new|shatter|swap)( (\w+))?/);
            if (match) {
                options.layer = 'new';
                const openMethod = match[1];
                const shorthandMode = match[3];
                options.mode || (options.mode = shorthandMode || config.mode);
                if (openMethod === 'swap') {
                    if (up.layer.isOverlay()) {
                        options.baseLayer = 'parent';
                    }
                }
                else if (openMethod === 'shatter') {
                    options.baseLayer = 'root';
                }
            }
        }
        else {
            if (options.mode) {
                options.layer = 'new';
            }
            else if (u.isElementish(options.target)) {
                options.layer = stack.get(options.target, { normalizeLayerOptions: false });
            }
            else if (options.origin) {
                options.layer = 'origin';
            }
            else {
                options.layer = 'current';
            }
        }
        if (!options.context) {
            options.context = {};
        }
        options.baseLayer = stack.get('current', { ...options, normalizeLayerOptions: false });
    }
    function build(options, beforeNew) {
        const { mode } = options;
        const { Class } = config[mode];
        const configs = u.reverse(modeConfigs(mode));
        let handleDeprecatedConfig = up.migrate.handleLayerConfig;
        if (handleDeprecatedConfig) {
            configs.forEach(handleDeprecatedConfig);
        }
        options.openAnimation ?? (options.openAnimation = u.pluckKey(options, 'animation'));
        options = u.mergeDefined(...configs, { mode, stack }, options);
        if (beforeNew) {
            options = beforeNew(options);
        }
        return new Class(options);
    }
    function openCallbackAttr(link, attr) {
        return e.callbackAttr(link, attr, ['layer']);
    }
    function closeCallbackAttr(link, attr) {
        return e.callbackAttr(link, attr, ['layer', 'value']);
    }
    function reset() {
        config.reset();
        stack.reset();
        handlers = u.filter(handlers, 'isDefault');
    }
    async function open(options) {
        options = u.options(options, {
            layer: 'new',
            defaultToEmptyContent: true,
            navigate: true
        });
        let result = await up.render(options);
        return result.layer;
    }
    function ask(options) {
        return new Promise(function (resolve, reject) {
            options = {
                ...options,
                onAccepted: (event) => resolve(event.value),
                onDismissed: (event) => reject(event.value)
            };
            open(options);
        });
    }
    function anySelector() {
        return u.map(LAYER_CLASSES, Class => Class.selector()).join(',');
    }
    function optionToString(option) {
        if (u.isString(option)) {
            return `layer "${option}"`;
        }
        else {
            return option.toString();
        }
    }
    up.on('up:fragment:destroyed', function () {
        stack.sync();
    });
    up.on('up:framework:evaled', function () {
        stack = new up.LayerStack();
    });
    up.on('up:framework:reset', reset);
    const api = {
        config,
        mainTargets,
        open,
        build,
        ask,
        normalizeOptions,
        openCallbackAttr,
        closeCallbackAttr,
        anySelector,
        optionToString,
        get stack() { return stack; }
    };
    u.delegate(api, [
        'get',
        'getAll',
        'root',
        'overlays',
        'current',
        'front',
        'sync',
        'count',
        'dismissOverlays'
    ], () => stack);
    u.delegate(api, [
        'accept',
        'dismiss',
        'isRoot',
        'isOverlay',
        'isFront',
        'on',
        'off',
        'emit',
        'parent',
        'history',
        'location',
        'mode',
        'context',
        'element',
        'contains',
        'size',
        'affix'
    ], () => stack.current);
    return api;
})();


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(88);
up.link = (function () {
    const u = up.util;
    const e = up.element;
    const linkPreloader = new up.LinkPreloader();
    let lastMousedownTarget = null;
    const LINKS_WITH_LOCAL_HTML = ['a[up-content]', 'a[up-fragment]', 'a[up-document]'];
    const LINKS_WITH_REMOTE_HTML = ['a[href]', '[up-href]'];
    const ATTRIBUTES_SUGGESTING_FOLLOW = ['[up-follow]', '[up-target]', '[up-layer]', '[up-transition]', '[up-preload]', '[up-instant]'];
    function combineFollowableSelectors(elementSelectors, attributeSelectors) {
        return u.flatMap(elementSelectors, elementSelector => attributeSelectors.map(attributeSelector => elementSelector + attributeSelector));
    }
    const config = new up.Config(() => ({
        followSelectors: combineFollowableSelectors(LINKS_WITH_REMOTE_HTML, ATTRIBUTES_SUGGESTING_FOLLOW).concat(LINKS_WITH_LOCAL_HTML),
        noFollowSelectors: ['[up-follow=false]', 'a[download]', 'a[target]', 'a[href^="#"]:not([up-content]):not([up-fragment]):not([up-document])', 'a[href^="javascript:"]'],
        instantSelectors: ['[up-instant]'],
        noInstantSelectors: ['[up-instant=false]', '[onclick]'],
        preloadSelectors: combineFollowableSelectors(LINKS_WITH_REMOTE_HTML, ['[up-preload]']),
        noPreloadSelectors: ['[up-preload=false]'],
        clickableSelectors: LINKS_WITH_LOCAL_HTML.concat(['[up-emit]', '[up-accept]', '[up-dismiss]', '[up-clickable]']),
        preloadDelay: 90,
        preloadEnabled: 'auto'
    }));
    function fullFollowSelector() {
        return config.followSelectors.join(',');
    }
    function fullPreloadSelector() {
        return config.preloadSelectors.join(',');
    }
    function fullInstantSelector() {
        return config.instantSelectors.join(',');
    }
    function fullClickableSelector() {
        return config.clickableSelectors.join(',');
    }
    function isFollowDisabled(link) {
        return e.matches(link, config.noFollowSelectors.join(',')) || u.isCrossOrigin(link);
    }
    function isPreloadDisabled(link) {
        return !up.browser.canPushState() ||
            e.matches(link, config.noPreloadSelectors.join(',')) ||
            isFollowDisabled(link) ||
            !willCache(link);
    }
    function willCache(link) {
        const options = parseRequestOptions(link);
        if (options.url) {
            if (options.cache == null) {
                options.cache = 'auto';
            }
            options.basic = true;
            const request = new up.Request(options);
            return request.willCache();
        }
    }
    function isInstantDisabled(link) {
        return e.matches(link, config.noInstantSelectors.join(',')) || isFollowDisabled(link);
    }
    function reset() {
        lastMousedownTarget = null;
        config.reset();
        linkPreloader.reset();
    }
    const follow = up.mockable(function (link, options) {
        return up.render(followOptions(link, options));
    });
    function parseRequestOptions(link, options) {
        options = u.options(options);
        const parser = new up.OptionsParser(options, link);
        options.url = followURL(link, options);
        options.method = followMethod(link, options);
        parser.json('headers');
        parser.json('params');
        parser.booleanOrString('cache');
        parser.booleanOrString('clearCache');
        parser.booleanOrString('solo');
        parser.string('contentType', { attr: ['enctype', 'up-content-type'] });
        return options;
    }
    function followOptions(link, options) {
        link = up.fragment.get(link);
        options = parseRequestOptions(link, options);
        const parser = new up.OptionsParser(options, link, { fail: true });
        parser.boolean('feedback');
        parser.boolean('fail');
        if (parser.options.origin == null) {
            parser.options.origin = link;
        }
        parser.boolean('navigate', { default: true });
        parser.string('confirm');
        parser.string('target');
        parser.booleanOrString('fallback');
        parser.parse(((link, attrName) => e.callbackAttr(link, attrName, ['request', 'response', 'renderOptions'])), 'onLoaded');
        parser.string('content');
        parser.string('fragment');
        parser.string('document');
        parser.boolean('peel');
        parser.string('layer');
        parser.string('baseLayer');
        parser.json('context');
        parser.string('mode');
        parser.string('align');
        parser.string('position');
        parser.string('class');
        parser.string('size');
        parser.booleanOrString('dismissable');
        parser.parse(up.layer.openCallbackAttr, 'onOpened');
        parser.parse(up.layer.closeCallbackAttr, 'onAccepted');
        parser.parse(up.layer.closeCallbackAttr, 'onDismissed');
        parser.string('acceptEvent');
        parser.string('dismissEvent');
        parser.string('acceptLocation');
        parser.string('dismissLocation');
        parser.booleanOrString('history');
        parser.booleanOrString('focus');
        parser.boolean('saveScroll');
        parser.booleanOrString('scroll');
        parser.boolean('revealTop');
        parser.number('revealMax');
        parser.number('revealPadding');
        parser.number('revealSnap');
        parser.string('scrollBehavior');
        parser.booleanOrString('history');
        parser.booleanOrString('location');
        parser.booleanOrString('title');
        parser.booleanOrString('animation');
        parser.booleanOrString('transition');
        parser.string('easing');
        parser.number('duration');
        up.migrate.parseFollowOptions?.(parser);
        if (!options.guardEvent) {
            options.guardEvent = up.event.build('up:link:follow', { log: 'Following link' });
        }
        return options;
    }
    function preload(link, options) {
        link = up.fragment.get(link);
        if (!shouldPreload()) {
            return up.error.failed.async('Link preloading is disabled');
        }
        const guardEvent = up.event.build('up:link:preload', { log: ['Preloading link %o', link] });
        return follow(link, { ...options, guardEvent, preload: true });
    }
    function shouldPreload() {
        const setting = config.preloadEnabled;
        if (setting === 'auto') {
            return !up.network.shouldReduceRequests();
        }
        return setting;
    }
    function followMethod(link, options = {}) {
        return u.normalizeMethod(options.method || link.getAttribute('up-method') || link.getAttribute('data-method'));
    }
    function followURL(link, options = {}) {
        const url = options.url || link.getAttribute('up-href') || link.getAttribute('href');
        if (url !== '#') {
            return url;
        }
    }
    function isFollowable(link) {
        link = up.fragment.get(link);
        return e.matches(link, fullFollowSelector()) && !isFollowDisabled(link);
    }
    function makeFollowable(link) {
        if (!isFollowable(link)) {
            link.setAttribute('up-follow', '');
        }
    }
    function makeClickable(link) {
        if (e.matches(link, 'a[href], button')) {
            return;
        }
        e.setMissingAttrs(link, {
            tabindex: '0',
            role: 'link',
            'up-clickable': ''
        });
        link.addEventListener('keydown', function (event) {
            if ((event.key === 'Enter') || (event.key === 'Space')) {
                return forkEventAsUpClick(event);
            }
        });
    }
    up.macro(fullClickableSelector, makeClickable);
    function shouldFollowEvent(event, link) {
        if (event.defaultPrevented || isFollowDisabled(link)) {
            return false;
        }
        const betterTargetSelector = `a, [up-href], ${up.form.fieldSelector()}`;
        const betterTarget = e.closest(event.target, betterTargetSelector);
        return !betterTarget || (betterTarget === link);
    }
    function isInstant(linkOrDescendant) {
        const element = e.closest(linkOrDescendant, fullInstantSelector());
        return element && !isInstantDisabled(element);
    }
    function convertClicks(layer) {
        layer.on('click', function (event, element) {
            if (!up.event.isUnmodified(event)) {
                return;
            }
            if (isInstant(element) && lastMousedownTarget) {
                up.event.halt(event);
            }
            else if (layer.wasHitByMouseEvent(event) && !didUserDragAway(event)) {
                forkEventAsUpClick(event);
            }
            return lastMousedownTarget = null;
        });
        layer.on('mousedown', function (event, element) {
            if (!up.event.isUnmodified(event)) {
                return;
            }
            lastMousedownTarget = event.target;
            if (isInstant(element)) {
                forkEventAsUpClick(event);
            }
        });
    }
    function didUserDragAway(clickEvent) {
        return lastMousedownTarget && (lastMousedownTarget !== clickEvent.target);
    }
    function forkEventAsUpClick(originalEvent) {
        let forwardedProps = ['clientX', 'clientY', 'button', ...up.event.keyModifiers];
        const newEvent = up.event.fork(originalEvent, 'up:click', forwardedProps);
        up.emit(originalEvent.target, newEvent, { log: false });
    }
    function isSafe(link) {
        const method = followMethod(link);
        return up.network.isSafeMethod(method);
    }
    up.on('up:click', fullFollowSelector, function (event, link) {
        if (shouldFollowEvent(event, link)) {
            up.event.halt(event);
            up.log.muteUncriticalRejection(follow(link));
        }
    });
    up.macro('[up-expand]', function (area) {
        const selector = area.getAttribute('up-expand') || 'a, [up-href]';
        let childLink = e.get(area, selector);
        if (childLink) {
            const areaAttrs = e.upAttrs(childLink);
            if (!areaAttrs['up-href']) {
                areaAttrs['up-href'] = childLink.getAttribute('href');
            }
            e.setMissingAttrs(area, areaAttrs);
            makeFollowable(area);
        }
    });
    up.compiler(fullPreloadSelector, function (link) {
        if (!isPreloadDisabled(link)) {
            linkPreloader.observeLink(link);
        }
    });
    up.on('up:framework:reset', reset);
    return {
        follow,
        followOptions,
        preload,
        makeFollowable,
        makeClickable,
        isSafe,
        isFollowable,
        shouldFollowEvent,
        followMethod,
        convertClicks,
        config,
        combineFollowableSelectors
    };
})();
up.follow = up.link.follow;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 89 */
/***/ (() => {

up.form = (function () {
    const u = up.util;
    const e = up.element;
    const ATTRIBUTES_SUGGESTING_SUBMIT = ['[up-submit]', '[up-target]', '[up-layer]', '[up-transition]'];
    const config = new up.Config(() => ({
        validateTargets: ['[up-fieldset]:has(:origin)', 'fieldset:has(:origin)', 'label:has(:origin)', 'form:has(:origin)'],
        fieldSelectors: ['select', 'input:not([type=submit]):not([type=image])', 'button[type]:not([type=submit])', 'textarea'],
        submitSelectors: up.link.combineFollowableSelectors(['form'], ATTRIBUTES_SUGGESTING_SUBMIT),
        noSubmitSelectors: ['[up-submit=false]', '[target]'],
        submitButtonSelectors: ['input[type=submit]', 'input[type=image]', 'button[type=submit]', 'button:not([type])'],
        observeDelay: 0
    }));
    let abortScheduledValidate;
    function fullSubmitSelector() {
        return config.submitSelectors.join(',');
    }
    function reset() {
        config.reset();
    }
    function fieldSelector(suffix = '') {
        return config.fieldSelectors.map(field => field + suffix).join(',');
    }
    function findFields(root) {
        root = e.get(root);
        let fields = e.subtree(root, fieldSelector());
        if (e.matches(root, 'form[id]')) {
            const outsideFieldSelector = fieldSelector(e.attributeSelector('form', root.getAttribute('id')));
            const outsideFields = e.all(outsideFieldSelector);
            fields.push(...outsideFields);
            fields = u.uniq(fields);
        }
        return fields;
    }
    function submittingButton(form) {
        const selector = submitButtonSelector();
        const focusedElement = document.activeElement;
        if (focusedElement && e.matches(focusedElement, selector) && form.contains(focusedElement)) {
            return focusedElement;
        }
        else {
            return e.get(form, selector);
        }
    }
    function submitButtonSelector() {
        return config.submitButtonSelectors.join(',');
    }
    const submit = up.mockable((form, options) => {
        return up.render(submitOptions(form, options));
    });
    function submitOptions(form, options) {
        form = getForm(form);
        options = parseBasicOptions(form, options);
        let parser = new up.OptionsParser(options, form);
        parser.string('failTarget', { default: up.fragment.toTarget(form) });
        options.guardEvent || (options.guardEvent = up.event.build('up:form:submit', {
            submitButton: options.submitButton,
            params: options.params,
            log: 'Submitting form'
        }));
        u.assign(options, up.link.followOptions(form, options));
        return options;
    }
    function parseBasicOptions(form, options) {
        options = u.options(options);
        form = getForm(form);
        const parser = new up.OptionsParser(options, form);
        const params = up.Params.fromForm(form);
        options.submitButton || (options.submitButton = submittingButton(form));
        if (options.submitButton) {
            params.addField(options.submitButton);
            options.method || (options.method = options.submitButton.getAttribute('formmethod'));
            options.url || (options.url = options.submitButton.getAttribute('formaction'));
        }
        params.addAll(options.params);
        options.params = params;
        parser.string('url', { attr: 'action', default: up.fragment.source(form) });
        parser.string('method', {
            attr: ['up-method', 'data-method', 'method'],
            default: 'GET',
            normalize: u.normalizeMethod
        });
        if (options.method === 'GET') {
            options.url = up.Params.stripURL(options.url);
        }
        return options;
    }
    up.on('up:click', submitButtonSelector, function (event, button) {
        const form = getForm(button);
        if (form && isSubmittable(form)) {
            button.focus();
        }
    });
    function observe(elements, ...args) {
        elements = e.list(elements);
        const fields = u.flatMap(elements, findFields);
        const unnamedFields = u.reject(fields, 'name');
        if (unnamedFields.length) {
            up.warn('up.observe()', 'Will not observe fields without a [name]: %o', unnamedFields);
        }
        const callback = u.extractCallback(args) || observeCallbackFromElement(elements[0]) || up.fail('up.observe: No change callback given');
        const options = u.extractOptions(args);
        options.delay = options.delay ?? e.numberAttr(elements[0], 'up-delay') ?? config.observeDelay;
        const observer = new up.FieldObserver(fields, options, callback);
        observer.start();
        return () => observer.stop();
    }
    function observeCallbackFromElement(element) {
        let rawCallback = element.getAttribute('up-observe');
        if (rawCallback) {
            return up.NonceableCallback.fromString(rawCallback).toFunction('value', 'name');
        }
    }
    function autosubmit(target, options) {
        return observe(target, options, () => submit(target));
    }
    function findValidateTarget(element, options) {
        let givenTarget;
        const container = getContainer(element);
        if (u.isElementish(options.target)) {
            return up.fragment.toTarget(options.target);
        }
        else if (givenTarget = options.target || element.getAttribute('up-validate') || container.getAttribute('up-validate')) {
            return givenTarget;
        }
        else if (e.matches(element, 'form')) {
            return up.fragment.toTarget(element);
        }
        else {
            return findValidateTargetFromConfig(element, options) || up.fail('Could not find validation target for %o (tried defaults %o)', element, config.validateTargets);
        }
    }
    function findValidateTargetFromConfig(element, options) {
        const layer = up.layer.get(element);
        return u.findResult(config.validateTargets, function (defaultTarget) {
            if (up.fragment.get(defaultTarget, { ...options, layer })) {
                return defaultTarget;
            }
        });
    }
    function validate(field, options) {
        field = up.fragment.get(field);
        options = parseBasicOptions(field, options);
        options.origin = field;
        options.target = findValidateTarget(field, options);
        options.focus = 'keep';
        options.fail = false;
        options.headers || (options.headers = {});
        options.headers[up.protocol.headerize('validate')] = field.getAttribute('name') || ':unknown';
        options.guardEvent = up.event.build('up:form:validate', { field, log: 'Validating form' });
        return up.render(options);
    }
    function switcherValues(field) {
        let value;
        let meta;
        if (e.matches(field, 'input[type=checkbox]')) {
            if (field.checked) {
                value = field.value;
                meta = ':checked';
            }
            else {
                meta = ':unchecked';
            }
        }
        else if (e.matches(field, 'input[type=radio]')) {
            const form = getContainer(field);
            const groupName = field.getAttribute('name');
            const checkedButton = form.querySelector(`input[type=radio]${e.attributeSelector('name', groupName)}:checked`);
            if (checkedButton) {
                meta = ':checked';
                value = checkedButton.value;
            }
            else {
                meta = ':unchecked';
            }
        }
        else {
            value = field.value;
        }
        const values = [];
        if (u.isPresent(value)) {
            values.push(value);
            values.push(':present');
        }
        else {
            values.push(':blank');
        }
        if (u.isPresent(meta)) {
            values.push(meta);
        }
        return values;
    }
    function switchTargets(switcher, options = {}) {
        const targetSelector = options.target || options.target || switcher.getAttribute('up-switch');
        const form = getContainer(switcher);
        targetSelector || up.fail("No switch target given for %o", switcher);
        const fieldValues = switcherValues(switcher);
        for (let target of e.all(form, targetSelector)) {
            switchTarget(target, fieldValues);
        }
    }
    const switchTarget = up.mockable(function (target, fieldValues) {
        let show;
        fieldValues || (fieldValues = switcherValues(findSwitcherForTarget(target)));
        let hideValues = target.getAttribute('up-hide-for');
        if (hideValues) {
            hideValues = u.splitValues(hideValues);
            show = u.intersect(fieldValues, hideValues).length === 0;
        }
        else {
            let showValues = target.getAttribute('up-show-for');
            showValues = showValues ? u.splitValues(showValues) : [':present', ':checked'];
            show = u.intersect(fieldValues, showValues).length > 0;
        }
        e.toggle(target, show);
        target.classList.add('up-switched');
    });
    function findSwitcherForTarget(target) {
        const form = getContainer(target);
        const switchers = e.all(form, '[up-switch]');
        const switcher = u.find(switchers, function (switcher) {
            const targetSelector = switcher.getAttribute('up-switch');
            return e.matches(target, targetSelector);
        });
        return switcher || up.fail('Could not find [up-switch] field for %o', target);
    }
    function getForm(elementOrTarget, fallbackSelector) {
        const element = up.fragment.get(elementOrTarget);
        return element.form || e.closest(element, 'form') || (fallbackSelector && e.closest(element, fallbackSelector));
    }
    function getContainer(element) {
        return getForm(element, up.layer.anySelector());
    }
    function isField(element) {
        return e.matches(element, fieldSelector());
    }
    function focusedField() {
        return u.presence(document.activeElement, isField);
    }
    function isSubmittable(form) {
        form = up.fragment.get(form);
        return e.matches(form, fullSubmitSelector()) && !isSubmitDisabled(form);
    }
    function isSubmitDisabled(form) {
        return e.matches(form, config.noSubmitSelectors.join(','));
    }
    up.on('submit', fullSubmitSelector, function (event, form) {
        if (event.defaultPrevented || isSubmitDisabled(form)) {
            return;
        }
        abortScheduledValidate?.();
        up.event.halt(event);
        up.log.muteUncriticalRejection(submit(form));
    });
    up.on('change', '[up-validate]', function (event) {
        const field = findFields(event.target)[0];
        abortScheduledValidate = u.abortableMicrotask(() => {
            return up.log.muteUncriticalRejection(validate(field));
        });
    });
    up.compiler('[up-switch]', (switcher) => {
        switchTargets(switcher);
    });
    up.on('change', '[up-switch]', (_event, switcher) => {
        switchTargets(switcher);
    });
    up.compiler('[up-show-for]:not(.up-switched), [up-hide-for]:not(.up-switched)', (element) => {
        switchTarget(element);
    });
    up.compiler('[up-observe]', (formOrField) => observe(formOrField));
    up.compiler('[up-autosubmit]', (formOrField) => autosubmit(formOrField));
    up.on('up:framework:reset', reset);
    return {
        config,
        submit,
        submitOptions,
        isSubmittable,
        observe,
        validate,
        autosubmit,
        fieldSelector,
        fields: findFields,
        focusedField,
        switchTarget
    };
})();
up.submit = up.form.submit;
up.observe = up.form.observe;
up.autosubmit = up.form.autosubmit;
up.validate = up.form.validate;


/***/ }),
/* 90 */
/***/ (() => {

up.feedback = (function () {
    const u = up.util;
    const e = up.element;
    const config = new up.Config(() => ({
        currentClasses: ['up-current'],
        navSelectors: ['[up-nav]', 'nav'],
    }));
    function reset() {
        config.reset();
        up.layer.root.feedbackLocation = null;
    }
    const CLASS_ACTIVE = 'up-active';
    const SELECTOR_LINK = 'a, [up-href]';
    function navSelector() {
        return config.navSelectors.join(',');
    }
    function normalizeURL(url) {
        if (url) {
            return u.normalizeURL(url, { trailingSlash: false, hash: false });
        }
    }
    function linkURLs(link) {
        return link.upFeedbackURLs || (link.upFeedbackURLs = new up.LinkFeedbackURLs(link));
    }
    function updateFragment(fragment) {
        const layerOption = { layer: up.layer.get(fragment) };
        if (up.fragment.closest(fragment, navSelector(), layerOption)) {
            const links = up.fragment.subtree(fragment, SELECTOR_LINK, layerOption);
            updateLinks(links, layerOption);
        }
        else {
            updateLinksWithinNavs(fragment, layerOption);
        }
    }
    function updateLinksWithinNavs(fragment, options) {
        const navs = up.fragment.subtree(fragment, navSelector(), options);
        const links = u.flatMap(navs, nav => e.subtree(nav, SELECTOR_LINK));
        updateLinks(links, options);
    }
    function getNormalizedLayerLocation(layer) {
        return layer.feedbackLocation || normalizeURL(layer.location);
    }
    function updateLinks(links, options = {}) {
        if (!links.length) {
            return;
        }
        const layer = options.layer || up.layer.get(links[0]);
        let layerLocation = getNormalizedLayerLocation(layer);
        if (layerLocation) {
            for (let link of links) {
                const isCurrent = linkURLs(link).isCurrent(layerLocation);
                for (let currentClass of config.currentClasses) {
                    e.toggleClass(link, currentClass, isCurrent);
                }
                e.toggleAttr(link, 'aria-current', 'page', isCurrent);
            }
        }
    }
    function findActivatableArea(element) {
        return e.ancestor(element, SELECTOR_LINK) || element;
    }
    function start(element) {
        findActivatableArea(element).classList.add(CLASS_ACTIVE);
    }
    function stop(element) {
        findActivatableArea(element).classList.remove(CLASS_ACTIVE);
    }
    function around(element, fn) {
        start(element);
        const result = fn();
        u.always(result, () => stop(element));
        return result;
    }
    function aroundForOptions(options, fn) {
        let element;
        let feedbackOpt = options.feedback;
        if (feedbackOpt) {
            if (u.isBoolean(feedbackOpt)) {
                element = options.origin;
            }
            else {
                element = feedbackOpt;
            }
        }
        if (element) {
            element = up.fragment.get(element);
            return around(element, fn);
        }
        else {
            return fn();
        }
    }
    function updateLayerIfLocationChanged(layer) {
        const processedLocation = layer.feedbackLocation;
        const layerLocation = getNormalizedLayerLocation(layer.location);
        if (!processedLocation || (processedLocation !== layerLocation)) {
            layer.feedbackLocation = layerLocation;
            updateLinksWithinNavs(layer.element, { layer });
        }
    }
    function onBrowserLocationChanged() {
        const frontLayer = up.layer.front;
        if (frontLayer.showsLiveHistory()) {
            updateLayerIfLocationChanged(frontLayer);
        }
    }
    up.on('up:location:changed', (_event) => {
        onBrowserLocationChanged();
    });
    up.on('up:fragment:inserted', (_event, newFragment) => {
        updateFragment(newFragment);
    });
    up.on('up:layer:location:changed', (event) => {
        updateLayerIfLocationChanged(event.layer);
    });
    up.on('up:framework:reset', reset);
    return {
        config,
        start,
        stop,
        around,
        aroundForOptions,
        normalizeURL,
    };
})();


/***/ }),
/* 91 */
/***/ (() => {

up.radio = (function () {
    const u = up.util;
    const config = new up.Config(() => ({
        hungrySelectors: ['[up-hungry]'],
        pollInterval: 30000,
        pollEnabled: 'auto'
    }));
    function reset() {
        config.reset();
    }
    function hungrySelector() {
        return config.hungrySelectors.join(',');
    }
    function startPolling(fragment, options = {}) {
        up.FragmentPolling.forFragment(fragment).forceStart(options);
    }
    function stopPolling(element) {
        up.FragmentPolling.forFragment(element).forceStop();
    }
    function shouldPoll(fragment) {
        const setting = u.evalOption(config.pollEnabled, fragment);
        if (setting === 'auto') {
            return !document.hidden && !up.network.shouldReduceRequests() && up.layer.get(fragment)?.isFront?.();
        }
        return setting;
    }
    up.compiler('[up-poll]', (fragment) => {
        up.FragmentPolling.forFragment(fragment).onPollAttributeObserved();
    });
    up.on('up:framework:reset', reset);
    return {
        config,
        hungrySelector,
        startPolling,
        stopPolling,
        shouldPoll,
    };
})();


/***/ }),
/* 92 */
/***/ (() => {

up.rails = (function () {
    const u = up.util;
    const e = up.element;
    function isRails() {
        return window._rails_loaded ||
            window.Rails ||
            window.jQuery?.rails;
    }
    return u.each(['method', 'confirm'], function (feature) {
        const dataAttribute = `data-${feature}`;
        const upAttribute = `up-${feature}`;
        up.macro(`a[${dataAttribute}]`, function (link) {
            if (isRails() && up.link.isFollowable(link)) {
                e.setMissingAttr(link, upAttribute, link.getAttribute(dataAttribute));
                return link.removeAttribute(dataAttribute);
            }
        });
    });
})();


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);
__webpack_require__(47);
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(51);
__webpack_require__(52);
__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(56);
__webpack_require__(57);
__webpack_require__(58);
__webpack_require__(59);
__webpack_require__(60);
__webpack_require__(61);
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(64);
__webpack_require__(65);
__webpack_require__(66);
__webpack_require__(67);
__webpack_require__(68);
__webpack_require__(69);
__webpack_require__(70);
__webpack_require__(71);
__webpack_require__(72);
__webpack_require__(73);
__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(77);
__webpack_require__(78);
__webpack_require__(80);
__webpack_require__(82);
__webpack_require__(83);
__webpack_require__(85);
__webpack_require__(87);
__webpack_require__(89);
__webpack_require__(90);
__webpack_require__(91);
__webpack_require__(92);
up.framework.onEvaled();

})();

/******/ })()
;