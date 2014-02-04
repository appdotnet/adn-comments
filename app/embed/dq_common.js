! function (a, b) {
    function c(a) {
        var b = a.length,
            c = cb.type(a);
        return cb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
    }

    function d(a) {
        var b = rb[a] = {};
        return cb.each(a.match(eb) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    function e(a, c, d, e) {
        if (cb.acceptData(a)) {
            var f, g, h = cb.expando,
                i = a.nodeType,
                j = i ? cb.cache : a,
                k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || d !== b || "string" != typeof c) return k || (k = i ? a[h] = V.pop() || cb.guid++ : h), j[k] || (j[k] = i ? {} : {
                toJSON: cb.noop
            }), ("object" == typeof c || "function" == typeof c) && (e ? j[k] = cb.extend(j[k], c) : j[k].data = cb.extend(j[k].data, c)), g = j[k], e || (g.data || (g.data = {}), g = g.data), d !== b && (g[cb.camelCase(c)] = d), "string" == typeof c ? (f = g[c], null == f && (f = g[cb.camelCase(c)])) : f = g, f
        }
    }

    function f(a, b, c) {
        if (cb.acceptData(a)) {
            var d, e, f = a.nodeType,
                g = f ? cb.cache : a,
                i = f ? a[cb.expando] : cb.expando;
            if (g[i]) {
                if (b && (d = c ? g[i] : g[i].data)) {
                    cb.isArray(b) ? b = b.concat(cb.map(b, cb.camelCase)) : b in d ? b = [b] : (b = cb.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    for (; e--;) delete d[b[e]];
                    if (c ? !h(d) : !cb.isEmptyObject(d)) return
                }(c || (delete g[i].data, h(g[i]))) && (f ? cb.cleanData([a], !0) : cb.support.deleteExpando || g != g.window ? delete g[i] : g[i] = null)
            }
        }
    }

    function g(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(tb, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : sb.test(d) ? cb.parseJSON(d) : d
                } catch (f) {}
                cb.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b;
        for (b in a)
            if (("data" !== b || !cb.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function i() {
        return !0
    }

    function j() {
        return !1
    }

    function k(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function l(a, b, c) {
        if (b = b || 0, cb.isFunction(b)) return cb.grep(a, function (a, d) {
            var e = !! b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return cb.grep(a, function (a) {
            return a === b === c
        });
        if ("string" == typeof b) {
            var d = cb.grep(a, function (a) {
                return 1 === a.nodeType
            });
            if (Lb.test(b)) return cb.filter(b, d, !c);
            b = cb.filter(b, d)
        }
        return cb.grep(a, function (a) {
            return cb.inArray(a, b) >= 0 === c
        })
    }

    function m(a) {
        var b = Ob.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length;) c.createElement(b.pop());
        return c
    }

    function n(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }

    function o(a) {
        var b = a.getAttributeNode("type");
        return a.type = (b && b.specified) + "/" + a.type, a
    }

    function p(a) {
        var b = $b.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function q(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) cb._data(c, "globalEval", !b || cb._data(b[d], "globalEval"))
    }

    function r(a, b) {
        if (1 === b.nodeType && cb.hasData(a)) {
            var c, d, e, f = cb._data(a),
                g = cb._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++) cb.event.add(b, c, h[c][d])
            }
            g.data && (g.data = cb.extend({}, g.data))
        }
    }

    function s(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !cb.support.noCloneEvent && b[cb.expando]) {
                e = cb._data(b);
                for (d in e.events) cb.removeEvent(b, d, e.handle);
                b.removeAttribute(cb.expando)
            }
            "script" === c && b.text !== a.text ? (o(b).text = a.text, p(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), cb.support.html5Clone && a.innerHTML && !cb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Xb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }

    function t(a, c) {
        var d, e, f = 0,
            g = typeof a.getElementsByTagName !== O ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== O ? a.querySelectorAll(c || "*") : b;
        if (!g)
            for (g = [], d = a.childNodes || a; null != (e = d[f]); f++)!c || cb.nodeName(e, c) ? g.push(e) : cb.merge(g, t(e, c));
        return c === b || c && cb.nodeName(a, c) ? cb.merge([a], g) : g
    }

    function u(a) {
        Xb.test(a.type) && (a.defaultChecked = a.checked)
    }

    function v(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = sc.length; e--;)
            if (b = sc[e] + c, b in a) return b;
        return d
    }

    function w(a, b) {
        return a = b || a, "none" === cb.css(a, "display") || !cb.contains(a.ownerDocument, a)
    }

    function x(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = cb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && w(d) && (f[g] = cb._data(d, "olddisplay", B(d.nodeName)))) : f[g] || (e = w(d), (c && "none" !== c || !e) && cb._data(d, "olddisplay", e ? c : cb.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function y(a, b, c) {
        var d = lc.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += cb.css(a, c + rc[f], !0, e)), d ? ("content" === c && (g -= cb.css(a, "padding" + rc[f], !0, e)), "margin" !== c && (g -= cb.css(a, "border" + rc[f] + "Width", !0, e))) : (g += cb.css(a, "padding" + rc[f], !0, e), "padding" !== c && (g += cb.css(a, "border" + rc[f] + "Width", !0, e)));
        return g
    }

    function A(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = ec(a),
            g = cb.support.boxSizing && "border-box" === cb.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = fc(a, b, f), (0 > e || null == e) && (e = a.style[b]), mc.test(e)) return e;
            d = g && (cb.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function B(a) {
        var b = Q,
            c = oc[a];
        return c || (c = C(a, b), "none" !== c && c || (dc = (dc || cb("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (dc[0].contentWindow || dc[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = C(a, b), dc.detach()), oc[a] = c), c
    }

    function C(a, b) {
        var c = cb(b.createElement(a)).appendTo(b.body),
            d = cb.css(c[0], "display");
        return c.remove(), d
    }

    function D(a, b, c, d) {
        var e;
        if (cb.isArray(b)) cb.each(b, function (b, e) {
            c || uc.test(a) ? d(a, e) : D(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== cb.type(b)) d(a, b);
        else
            for (e in b) D(a + "[" + e + "]", b[e], c, d)
    }

    function E(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(eb) || [];
            if (cb.isFunction(c))
                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function F(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, cb.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }
        var f = {}, g = a === Lc;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function G(a, c) {
        var d, e, f = cb.ajaxSettings.flatOptions || {};
        for (e in c) c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
        return d && cb.extend(!0, a, d), a
    }

    function H(a, c, d) {
        for (var e, f, g, h, i = a.contents, j = a.dataTypes;
            "*" === j[0];) j.shift(), f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
        if (f)
            for (h in i)
                if (i[h] && i[h].test(f)) {
                    j.unshift(h);
                    break
                }
        if (j[0] in d) g = j[0];
        else {
            for (h in d) {
                if (!j[0] || a.converters[h + " " + j[0]]) {
                    g = h;
                    break
                }
                e || (e = h)
            }
            g = g || e
        }
        return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0
    }

    function I(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function J() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function K() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function L(a) {
        return cb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var M, N, O = typeof b,
        P = a.location,
        Q = a.document,
        R = Q.documentElement,
        S = a.jQuery,
        T = a.$,
        U = {}, V = [],
        W = "1.9.2-pre -effects,-deprecated",
        X = V.concat,
        Y = V.push,
        Z = V.slice,
        $ = V.indexOf,
        _ = U.toString,
        ab = U.hasOwnProperty,
        bb = W.trim,
        cb = function (a, b) {
            return new cb.fn.init(a, b, N)
        }, db = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        eb = /\S+/g,
        fb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        gb = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        hb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ib = /^[\],:{}\s]*$/,
        jb = /(?:^|:|,)(?:\s*\[)+/g,
        kb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        lb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        mb = /^-ms-/,
        nb = /-([\da-z])/gi,
        ob = function (a, b) {
            return b.toUpperCase()
        }, pb = function (a) {
            (Q.addEventListener || "load" === a.type || "complete" === Q.readyState) && (qb(), cb.ready())
        }, qb = function () {
            Q.addEventListener ? (Q.removeEventListener("DOMContentLoaded", pb, !1), a.removeEventListener("load", pb, !1)) : (Q.detachEvent("onreadystatechange", pb), a.detachEvent("onload", pb))
        };
    cb.fn = cb.prototype = {
        jquery: W,
        constructor: cb,
        init: function (a, c, d) {
            var e, f;
            if (!a) return this;
            if ("string" == typeof a) {
                if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : gb.exec(a), !e || !e[1] && c) return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                if (e[1]) {
                    if (c = c instanceof cb ? c[0] : c, cb.merge(this, cb.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : Q, !0)), hb.test(e[1]) && cb.isPlainObject(c))
                        for (e in c) cb.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                    return this
                }
                if (f = Q.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2]) return d.find(a);
                    this.length = 1, this[0] = f
                }
                return this.context = Q, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : cb.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), cb.makeArray(a, this))
        },
        selector: "",
        length: 0,
        size: function () {
            return this.length
        },
        toArray: function () {
            return Z.call(this)
        },
        get: function (a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function (a) {
            var b = cb.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function (a, b) {
            return cb.each(this, a, b)
        },
        ready: function (a) {
            return cb.ready.promise().done(a), this
        },
        slice: function () {
            return this.pushStack(Z.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        map: function (a) {
            return this.pushStack(cb.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: Y,
        sort: [].sort,
        splice: [].splice
    }, cb.fn.init.prototype = cb.fn, cb.extend = cb.fn.extend = function () {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1,
            j = arguments.length,
            k = !1;
        for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || cb.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)
            if (null != (f = arguments[i]))
                for (e in f) a = h[e], d = f[e], h !== d && (k && d && (cb.isPlainObject(d) || (c = cb.isArray(d))) ? (c ? (c = !1, g = a && cb.isArray(a) ? a : []) : g = a && cb.isPlainObject(a) ? a : {}, h[e] = cb.extend(k, g, d)) : d !== b && (h[e] = d));
        return h
    }, cb.extend({
        expando: "jQuery" + (W + Math.random()).replace(/\D/g, ""),
        noConflict: function (b) {
            return a.$ === cb && (a.$ = T), b && a.jQuery === cb && (a.jQuery = S), cb
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
            a ? cb.readyWait++ : cb.ready(!0)
        },
        ready: function (a) {
            if (a === !0 ? !--cb.readyWait : !cb.isReady) {
                if (!Q.body) return setTimeout(cb.ready);
                cb.isReady = !0, a !== !0 && --cb.readyWait > 0 || (M.resolveWith(Q, [cb]), cb.fn.trigger && cb(Q).trigger("ready").off("ready"))
            }
        },
        isFunction: function (a) {
            return "function" === cb.type(a)
        },
        isArray: Array.isArray || function (a) {
            return "array" === cb.type(a)
        },
        isWindow: function (a) {
            return null != a && a == a.window
        },
        isNumeric: function (a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function (a) {
            return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? U[_.call(a)] || "object" : typeof a
        },
        isPlainObject: function (a) {
            if (!a || "object" !== cb.type(a) || a.nodeType || cb.isWindow(a)) return !1;
            try {
                if (a.constructor && !ab.call(a, "constructor") && !ab.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (c) {
                return !1
            }
            var d;
            for (d in a);
            return d === b || ab.call(a, d)
        },
        isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        error: function (a) {
            throw new Error(a)
        },
        parseHTML: function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || Q;
            var d = hb.exec(a),
                e = !c && [];
            return d ? [b.createElement(d[1])] : (d = cb.buildFragment([a], b, e), e && cb(e).remove(), cb.merge([], d.childNodes))
        },
        parseJSON: function (b) {
            return a.JSON && a.JSON.parse ? a.JSON.parse(b) : null === b ? b : "string" == typeof b && (b = cb.trim(b), b && ib.test(b.replace(kb, "@").replace(lb, "]").replace(jb, ""))) ? new Function("return " + b)() : (cb.error("Invalid JSON: " + b), void 0)
        },
        parseXML: function (c) {
            var d, e;
            if (!c || "string" != typeof c) return null;
            try {
                a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (f) {
                d = b
            }
            return d && d.documentElement && !d.getElementsByTagName("parsererror").length || cb.error("Invalid XML: " + c), d
        },
        noop: function () {},
        globalEval: function (b) {
            b && cb.trim(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function (a) {
            return a.replace(mb, "ms-").replace(nb, ob)
        },
        nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function (a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a);
            if (d) {
                if (h)
                    for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.apply(a[f], d), e === !1) break
            } else if (h)
                for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
            else
                for (f in a)
                    if (e = b.call(a[f], f, a[f]), e === !1) break; return a
        },
        trim: bb && !bb.call("﻿ ") ? function (a) {
            return null == a ? "" : bb.call(a)
        } : function (a) {
            return null == a ? "" : (a + "").replace(fb, "")
        },
        makeArray: function (a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? cb.merge(d, "string" == typeof a ? [a] : a) : Y.call(d, a)), d
        },
        inArray: function (a, b, c) {
            var d;
            if (b) {
                if ($) return $.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function (a, c) {
            var d = c.length,
                e = a.length,
                f = 0;
            if ("number" == typeof d)
                for (; d > f; f++) a[e++] = c[f];
            else
                for (; c[f] !== b;) a[e++] = c[f++];
            return a.length = e, a
        },
        grep: function (a, b, c) {
            var d, e = [],
                f = 0,
                g = a.length;
            for (c = !! c; g > f; f++) d = !! b(a[f], f), c !== d && e.push(a[f]);
            return e
        },
        map: function (a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a),
                i = [];
            if (h)
                for (; g > f; f++) e = b(a[f], f, d), null != e && (i[i.length] = e);
            else
                for (f in a) e = b(a[f], f, d), null != e && (i[i.length] = e);
            return X.apply([], i)
        },
        guid: 1,
        proxy: function (a, c) {
            var d, e, f;
            return "string" == typeof c && (f = a[c], c = a, a = f), cb.isFunction(a) ? (d = Z.call(arguments, 2), e = function () {
                return a.apply(c || this, d.concat(Z.call(arguments)))
            }, e.guid = a.guid = a.guid || cb.guid++, e) : b
        },
        access: function (a, c, d, e, f, g, h) {
            var i = 0,
                j = a.length,
                k = null == d;
            if ("object" === cb.type(d)) {
                f = !0;
                for (i in d) cb.access(a, c, i, d[i], !0, g, h)
            } else if (e !== b && (f = !0, cb.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function (a, b, c) {
                return k.call(cb(a), c)
            })), c))
                for (; j > i; i++) c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
            return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
        },
        now: function () {
            return (new Date).getTime()
        }
    }), cb.ready.promise = function (b) {
        if (!M)
            if (M = cb.Deferred(), "complete" === Q.readyState) setTimeout(cb.ready);
            else if (Q.addEventListener) Q.addEventListener("DOMContentLoaded", pb, !1), a.addEventListener("load", pb, !1);
        else {
            Q.attachEvent("onreadystatechange", pb), a.attachEvent("onload", pb);
            var c = !1;
            try {
                c = null == a.frameElement && Q.documentElement
            } catch (d) {}
            c && c.doScroll && ! function e() {
                if (!cb.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    qb(), cb.ready()
                }
            }()
        }
        return M.promise(b)
    }, cb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
        U["[object " + b + "]"] = b.toLowerCase()
    }), N = cb(Q);
    var rb = {};
    cb.Callbacks = function (a) {
        a = "string" == typeof a ? rb[a] || d(a) : cb.extend({}, a);
        var c, e, f, g, h, i, j = [],
            k = !a.once && [],
            l = function (b) {
                for (e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++)
                    if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                        e = !1;
                        break
                    }
                c = !1, j && (k ? k.length && l(k.shift()) : e ? j = [] : m.disable())
            }, m = {
                add: function () {
                    if (j) {
                        var b = j.length;
                        ! function d(b) {
                            cb.each(b, function (b, c) {
                                var e = cb.type(c);
                                "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
                            })
                        }(arguments), c ? g = j.length : e && (i = b, l(e))
                    }
                    return this
                },
                remove: function () {
                    return j && cb.each(arguments, function (a, b) {
                        for (var d;
                            (d = cb.inArray(b, j, d)) > -1;) j.splice(d, 1), c && (g >= d && g--, h >= d && h--)
                    }), this
                },
                has: function (a) {
                    return a ? cb.inArray(a, j) > -1 : !(!j || !j.length)
                },
                empty: function () {
                    return j = [], g = 0, this
                },
                disable: function () {
                    return j = k = e = b, this
                },
                disabled: function () {
                    return !j
                },
                lock: function () {
                    return k = b, e || m.disable(), this
                },
                locked: function () {
                    return !k
                },
                fireWith: function (a, b) {
                    return b = b || [], b = [a, b.slice ? b.slice() : b], !j || f && !k || (c ? k.push(b) : l(b)), this
                },
                fire: function () {
                    return m.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!f
                }
            };
        return m
    }, cb.extend({
        Deferred: function (a) {
            var b = [
                ["resolve", "done", cb.Callbacks("once memory"), "resolved"],
                ["reject", "fail", cb.Callbacks("once memory"), "rejected"],
                ["notify", "progress", cb.Callbacks("memory")]
            ],
                c = "pending",
                d = {
                    state: function () {
                        return c
                    },
                    always: function () {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var a = arguments;
                        return cb.Deferred(function (c) {
                            cb.each(b, function (b, f) {
                                var g = f[0],
                                    h = cb.isFunction(a[b]) && a[b];
                                e[f[1]](function () {
                                    var a = h && h.apply(this, arguments);
                                    a && cb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function (a) {
                        return null != a ? cb.extend(a, d) : d
                    }
                }, e = {};
            return d.pipe = d.then, cb.each(b, function (a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function (a) {
            var b, c, d, e = 0,
                f = Z.call(arguments),
                g = f.length,
                h = 1 !== g || a && cb.isFunction(a.promise) ? g : 0,
                i = 1 === h ? a : cb.Deferred(),
                j = function (a, c, d) {
                    return function (e) {
                        c[a] = this, d[a] = arguments.length > 1 ? Z.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                    }
                };
            if (g > 1)
                for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && cb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    }), cb.support = function (b) {
        var c, d, e, f, g, h, i, j, k, l = Q.createElement("div");
        if (l.setAttribute("className", "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = l.getElementsByTagName("*"), d = l.getElementsByTagName("a")[0], !c || !d || !c.length) return b;
        f = Q.createElement("select"), h = f.appendChild(Q.createElement("option")), e = l.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b.getSetAttribute = "t" !== l.className, b.leadingWhitespace = 3 === l.firstChild.nodeType, b.tbody = !l.getElementsByTagName("tbody").length, b.htmlSerialize = !! l.getElementsByTagName("link").length, b.style = /top/.test(d.getAttribute("style")), b.hrefNormalized = "/a" === d.getAttribute("href"), b.opacity = /^0.5/.test(d.style.opacity), b.cssFloat = !! d.style.cssFloat, b.checkOn = !! e.value, b.optSelected = h.selected, b.enctype = !! Q.createElement("form").enctype, b.html5Clone = "<:nav></:nav>" !== Q.createElement("nav").cloneNode(!0).outerHTML, b.boxModel = "CSS1Compat" === Q.compatMode, b.inlineBlockNeedsLayout = !1, b.shrinkWrapBlocks = !1, b.pixelPosition = !1, b.deleteExpando = !0, b.noCloneEvent = !0, b.reliableMarginRight = !0, b.boxSizingReliable = !0, e.checked = !0, b.noCloneChecked = e.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete l.test
        } catch (m) {
            b.deleteExpando = !1
        }
        e = Q.createElement("input"), e.setAttribute("value", ""), b.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), b.radioValue = "t" === e.value, e.setAttribute("checked", "t"), e.setAttribute("name", "t"), g = Q.createDocumentFragment(), g.appendChild(e), b.appendChecked = e.checked, b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked, l.attachEvent && (l.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), l.cloneNode(!0).click());
        for (k in {
            submit: !0,
            change: !0,
            focusin: !0
        }) l.setAttribute(i = "on" + k, "t"), b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1;
        return l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = "content-box" === l.style.backgroundClip, cb(function () {
            var c, d, e, f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                g = Q.getElementsByTagName("body")[0];
            g && (c = Q.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(c).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = l.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", j = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = 4 === l.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== g.offsetTop, a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {
                width: "4px"
            }).width, d = l.appendChild(Q.createElement("div")), d.style.cssText = l.style.cssText = f, d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), typeof l.style.zoom !== O && (l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (g.style.zoom = 1)), g.removeChild(c), c = l = e = d = null)
        }), c = f = g = h = d = e = null, b
    }({});
    var sb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        tb = /([A-Z])/g;
    cb.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function (a) {
            return a = a.nodeType ? cb.cache[a[cb.expando]] : a[cb.expando], !! a && !h(a)
        },
        data: function (a, b, c) {
            return e(a, b, c)
        },
        removeData: function (a, b) {
            return f(a, b)
        },
        _data: function (a, b, c) {
            return e(a, b, c, !0)
        },
        _removeData: function (a, b) {
            return f(a, b, !0)
        },
        acceptData: function (a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
            var b = a.nodeName && cb.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b
        }
    }), cb.fn.extend({
        data: function (a, c) {
            var d, e, f = null,
                h = 0,
                i = this[0];
            if (a === b) {
                if (this.length && (f = cb.data(i), 1 === i.nodeType && !cb._data(i, "parsedAttrs"))) {
                    for (d = i.attributes; h < d.length; h++) e = d[h].name, 0 === e.indexOf("data-") && (e = cb.camelCase(e.slice(5)), g(i, e, f[e]));
                    cb._data(i, "parsedAttrs", !0)
                }
                return f
            }
            return "object" == typeof a ? this.each(function () {
                cb.data(this, a)
            }) : arguments.length > 1 ? this.each(function () {
                cb.data(this, a, c)
            }) : i ? g(i, a, cb.data(i, a)) : null
        },
        removeData: function (a) {
            return this.each(function () {
                cb.removeData(this, a)
            })
        }
    }), cb.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = cb._data(a, b), c && (!d || cb.isArray(c) ? d = cb._data(a, b, cb.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = cb.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = cb._queueHooks(a, b),
                g = function () {
                    cb.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), f.cur = e, e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return cb._data(a, c) || cb._data(a, c, {
                empty: cb.Callbacks("once memory").add(function () {
                    cb._removeData(a, b + "queue"), cb._removeData(a, c)
                })
            })
        }
    }), cb.fn.extend({
        queue: function (a, c) {
            var d = 2;
            return "string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? cb.queue(this[0], a) : c === b ? this : this.each(function () {
                var b = cb.queue(this, a, c);
                cb._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && cb.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                cb.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            return a = cb.fx ? cb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, c) {
            var d, e = 1,
                f = cb.Deferred(),
                g = this,
                h = this.length,
                i = function () {
                    --e || f.resolveWith(g, [g])
                };
            for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;) d = cb._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
            return i(), f.promise(c)
        }
    });
    var ub, vb, wb = /[\t\r\n]/g,
        xb = /\r/g,
        yb = /^(?:input|select|textarea|button|object)$/i,
        zb = /^(?:a|area)$/i,
        Ab = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
        Bb = /^(?:checked|selected)$/i,
        Cb = cb.support.getSetAttribute,
        Db = cb.support.input;
    cb.fn.extend({
        attr: function (a, b) {
            return cb.access(this, cb.attr, a, b, arguments.length > 1)
        },
        removeAttr: function (a) {
            return this.each(function () {
                cb.removeAttr(this, a)
            })
        },
        prop: function (a, b) {
            return cb.access(this, cb.prop, a, b, arguments.length > 1)
        },
        removeProp: function (a) {
            return a = cb.propFix[a] || a, this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function (a) {
            var b, c, d, e, f, g = 0,
                h = this.length,
                i = "string" == typeof a && a;
            if (cb.isFunction(a)) return this.each(function (b) {
                cb(this).addClass(a.call(this, b, this.className))
            });
            if (i)
                for (b = (a || "").match(eb) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(wb, " ") : " ")) {
                        for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        c.className = cb.trim(d)
                    }
            return this
        },
        removeClass: function (a) {
            var b, c, d, e, f, g = 0,
                h = this.length,
                i = 0 === arguments.length || "string" == typeof a && a;
            if (cb.isFunction(a)) return this.each(function (b) {
                cb(this).removeClass(a.call(this, b, this.className))
            });
            if (i)
                for (b = (a || "").match(eb) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(wb, " ") : "")) {
                        for (f = 0; e = b[f++];)
                            for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                        c.className = a ? cb.trim(d) : ""
                    }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                d = "boolean" == typeof b;
            return cb.isFunction(a) ? this.each(function (c) {
                cb(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function () {
                if ("string" === c)
                    for (var e, f = 0, g = cb(this), h = b, i = a.match(eb) || []; e = i[f++];) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e);
                else(c === O || "boolean" === c) && (this.className && cb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : cb._data(this, "__className__") || "")
            })
        },
        hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(wb, " ").indexOf(b) >= 0) return !0;
            return !1
        },
        val: function (a) {
            var c, d, e, f = this[0]; {
                if (arguments.length) return e = cb.isFunction(a), this.each(function (c) {
                    var f, g = cb(this);
                    1 === this.nodeType && (f = e ? a.call(this, c, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : cb.isArray(f) && (f = cb.map(f, function (a) {
                        return null == a ? "" : a + ""
                    })), d = cb.valHooks[this.type] || cb.valHooks[this.nodeName.toLowerCase()], d && "set" in d && d.set(this, f, "value") !== b || (this.value = f))
                });
                if (f) return d = cb.valHooks[f.type] || cb.valHooks[f.nodeName.toLowerCase()], d && "get" in d && (c = d.get(f, "value")) !== b ? c : (c = f.value, "string" == typeof c ? c.replace(xb, "") : null == c ? "" : c)
            }
        }
    }), cb.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (cb.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && cb.nodeName(c.parentNode, "optgroup"))) {
                            if (b = cb(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function (a, b) {
                    for (var c, d, e = a.options, f = cb.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = cb.inArray(cb(d).val(), f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        },
        attr: function (a, c, d) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h) return typeof a.getAttribute === O ? cb.prop(a, c, d) : (f = 1 !== h || !cb.isXMLDoc(a), f && (c = c.toLowerCase(), e = cb.attrHooks[c] || (Ab.test(c) ? vb : ub)), d === b ? e && f && "get" in e && null !== (g = e.get(a, c)) ? g : (typeof a.getAttribute !== O && (g = a.getAttribute(c)), null == g ? b : g) : null !== d ? e && f && "set" in e && (g = e.set(a, d, c)) !== b ? g : (a.setAttribute(c, d + ""), d) : (cb.removeAttr(a, c), void 0))
        },
        removeAttr: function (a, b) {
            var c, d, e = 0,
                f = b && b.match(eb);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];) d = cb.propFix[c] || c, Ab.test(c) ? !Cb && Bb.test(c) ? a[cb.camelCase("default-" + c)] = a[d] = !1 : a[d] = !1 : cb.attr(a, c, ""), a.removeAttribute(Cb ? c : d)
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (!cb.support.radioValue && "radio" === b && cb.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h) return g = 1 !== h || !cb.isXMLDoc(a), g && (c = cb.propFix[c] || c, f = cb.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : yb.test(a.nodeName) || zb.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), vb = {
        get: function (a, c) {
            var d = cb.prop(a, c),
                e = "boolean" == typeof d && a.getAttribute(c),
                f = "boolean" == typeof d ? Db && Cb ? null != e : Bb.test(c) ? a[cb.camelCase("default-" + c)] : !! e : a.getAttributeNode(c);
            return f && f.value !== !1 ? c.toLowerCase() : b
        },
        set: function (a, b, c) {
            return b === !1 ? cb.removeAttr(a, c) : Db && Cb || !Bb.test(c) ? a.setAttribute(!Cb && cb.propFix[c] || c, c) : a[cb.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, Db && Cb || (cb.attrHooks.value = {
        get: function (a, c) {
            var d = a.getAttributeNode(c);
            return cb.nodeName(a, "input") ? a.defaultValue : d && d.specified ? d.value : b
        },
        set: function (a, b, c) {
            return cb.nodeName(a, "input") ? (a.defaultValue = b, void 0) : ub && ub.set(a, b, c)
        }
    }), Cb || (ub = cb.valHooks.button = {
        get: function (a, c) {
            var d = a.getAttributeNode(c);
            return d && ("id" === c || "name" === c || "coords" === c ? "" !== d.value : d.specified) ? d.value : b
        },
        set: function (a, c, d) {
            var e = a.getAttributeNode(d);
            return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", "value" === d || c === a.getAttribute(d) ? c : b
        }
    }, cb.attrHooks.contenteditable = {
        get: ub.get,
        set: function (a, b, c) {
            ub.set(a, "" === b ? !1 : b, c)
        }
    }, cb.each(["width", "height"], function (a, b) {
        cb.attrHooks[b] = cb.extend(cb.attrHooks[b], {
            set: function (a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        })
    })), cb.support.hrefNormalized || (cb.each(["href", "src", "width", "height"], function (a, c) {
        cb.attrHooks[c] = cb.extend(cb.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return null == d ? b : d
            }
        })
    }), cb.each(["href", "src"], function (a, b) {
        cb.propHooks[b] = {
            get: function (a) {
                return a.getAttribute(b, 4)
            }
        }
    })), cb.support.style || (cb.attrHooks.style = {
        get: function (a) {
            return a.style.cssText || b
        },
        set: function (a, b) {
            return a.style.cssText = b + ""
        }
    }), cb.support.optSelected || (cb.propHooks.selected = cb.extend(cb.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), cb.support.enctype || (cb.propFix.enctype = "encoding"), cb.support.checkOn || cb.each(["radio", "checkbox"], function () {
        cb.valHooks[this] = {
            get: function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }), cb.each(["radio", "checkbox"], function () {
        cb.valHooks[this] = cb.extend(cb.valHooks[this], {
            set: function (a, b) {
                return cb.isArray(b) ? a.checked = cb.inArray(cb(a).val(), b) >= 0 : void 0
            }
        })
    });
    var Eb = /^(?:input|select|textarea)$/i,
        Fb = /^key/,
        Gb = /^(?:mouse|contextmenu)|click/,
        Hb = /^(?:focusinfocus|focusoutblur)$/,
        Ib = /^([^.]*)(?:\.(.+)|)$/;
    cb.event = {
        global: {},
        add: function (a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q, r = cb._data(a);
            if (r) {
                for (d.handler && (j = d, d = j.handler, f = j.selector), d.guid || (d.guid = cb.guid++), (h = r.events) || (h = r.events = {}), (l = r.handle) || (l = r.handle = function (a) {
                    return typeof cb === O || a && cb.event.triggered === a.type ? b : cb.event.dispatch.apply(l.elem, arguments)
                }, l.elem = a), c = (c || "").match(eb) || [""], i = c.length; i--;) g = Ib.exec(c[i]) || [], o = q = g[1], p = (g[2] || "").split(".").sort(), o && (k = cb.event.special[o] || {}, o = (f ? k.delegateType : k.bindType) || o, k = cb.event.special[o] || {}, m = cb.extend({
                    type: o,
                    origType: q,
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && cb.expr.match.needsContext.test(f),
                    namespace: p.join(".")
                }, j), (n = h[o]) || (n = h[o] = [], n.delegateCount = 0, k.setup && k.setup.call(a, e, p, l) !== !1 || (a.addEventListener ? a.addEventListener(o, l, !1) : a.attachEvent && a.attachEvent("on" + o, l))), k.add && (k.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, m) : n.push(m), cb.event.global[o] = !0);