
(function () {
    function p() {}

    function q(a, b) {
        return 0 == ca.call(a).indexOf("[object " + b)
    }

    function s(a) {
        return a && "/" == a.charAt(a.length - 1) ? a.substr(0, a.length - 1) : a
    }

    function u(a, b) {
        var c, d, e, f;
        if (c = 1, d = a, b && (d = d.replace(da, function (a, b, d, e) {
            return d && c++, f = h, e || ""
        })), f) {
            if (e = b.split("/"), c > e) throw Error("attempt to access module beyond root of package: " + a);
            return e.splice(e.length - c, c), e.concat(d || []).join("/")
        }
        return d
    }

    function v(a) {
        var b = a.indexOf("!");
        return {
            M: a.substr(b + 1),
            i: b >= 0 && a.substr(0, b)
        }
    }

    function w() {}

    function z(a, b) {
        w.prototype = a || A;
        var c = new w;
        w.prototype = A;
        for (var d in b) c[d] = b[d];
        return c
    }

    function B() {
        function a(a, b, c) {
            d.push([a, b, c])
        }

        function b(a, b) {
            for (var c, e = 0; c = d[e++];)(c = c[a]) && c(b)
        }
        var c, d, e;
        c = this, d = [], e = function (c, f) {
            a = c ? function (a) {
                a && a(f)
            } : function (a, b) {
                b && b(f)
            }, e = p, b(c ? 0 : 1, f), b = p, d = C
        }, this.t = function (b, c, d) {
            a(b, c, d)
        }, this.f = function (a) {
            c.s = a, e(h, a)
        }, this.d = function (a) {
            c.ga = a, e(m, a)
        }, this.p = function (a) {
            b(2, a)
        }
    }

    function D(a, b, c, d) {
        a instanceof B ? a.t(b, c, d) : b(a)
    }

    function E(a, b, c) {
        var d;
        return function () {
            return 0 <= --a && b && (d = b.apply(C, arguments)), 0 == a && c && c(d), d
        }
    }

    function F() {
        function a(b, c, d, e) {
            var f;
            f = G.g(H, C, [].concat(b)), this.then = b = function (a, b) {
                return D(f, function (b) {
                    a && a.apply(C, b)
                }, function (a) {
                    if (!b) throw a;
                    b(a)
                }), this
            }, this.next = function (b, c, d) {
                return new a(b, c, d, f)
            }, c && b(c, d), D(e, function () {
                G.h(f)
            })
        }
        var b, c = [].slice.call(arguments);
        return q(c[0], "Object") && (b = c.shift(), H = G.b(b, H), G.v(b)), new a(c[0], c[1], c[2])
    }

    function I(a) {
        var b = a.id;
        if (b == C && (J !== C ? J = {
            C: "Multiple anonymous defines in url"
        } : (b = G.$()) || (J = a)), b != C) {
            var c = K[b];
            if (b in K || (c = G.j(b, H).b, c = K[b] = G.z(c, b)), !(c instanceof B)) throw Error("duplicate define: " + b);
            c.fa = m, G.A(c, a)
        }
    }

    function ka(a) {
        try {
            return eval(a)
        } catch (b) {}
    }

    function la() {
        var a;
        return a = W[ma]("link"), a.rel = "stylesheet", a.type = "text/css", a
    }

    function na(a, b, c) {
        oa.push({
            url: a,
            P: b,
            S: function () {
                c(Error(pa))
            }
        }), a = qa.shift(), !a && ra.length < sa && (a = W.createElement("style"), ra.push(a), X.appendChild(a)), a && Y(a)
    }

    function Y(a) {
        var b;
        (b = oa.shift()) ? (a.onload = function () {
            b.P(), Y(a)
        }, a.onerror = function () {
            b.S(), Y(a)
        }, a.styleSheet.addImport(b.url)) : (a.onload = a.onerror = Z, qa.push(a))
    }

    function ta(a, b, c) {
        if (!$.load) {
            var d, e, f;
            if (!a.href || W.readyState && "complete" != W.readyState) d = m;
            else {
                d = m;
                try {
                    (e = a.sheet) && (f = e.cssRules, d = null === f, !d && "length" in f && (e.insertRule("-curl-css-test {}", 0), e.deleteRule(0), d = h))
                } catch (g) {
                    d = /security|denied/i.test(g.message)
                }
            }
            d ? c() : a.onload == Z || !a.onload || ua(function () {
                ta(a, b, c)
            }, b)
        }
    }

    function va(a, b, c, d) {
        function e() {
            if (f.onload != Z && f.onload) {
                f.onload = f.onerror = Z;
                var a = function () {
                    W.readyState && "complete" != W.readyState ? ua(a, 10) : b()
                };
                a()
            }
        }
        var f;
        f = la(), f.onload = function () {
            $.load = $.load || h, e()
        }, ta(f, d, e), f.onerror = function () {
            $.error = $.error || h, f.onload != Z && f.onload && (f.onload = f.onerror = Z, c(Error(pa)))
        }, f.href = a, X.appendChild(f)
    }

    function Z() {}
    var h = !0,
        m = !1,
        n = this.window || global,
        H, L, M, O = n.document,
        P = O && (O.head || O.getElementsByTagName("head")[0]),
        ea = P && P.getElementsByTagName("base")[0] || null,
        Q = {}, R = {}, S = {}, fa = "addEventListener" in n ? {} : {
            loaded: 1,
            complete: 1
        }, A = {}, ca = A.toString,
        C, K = {}, T = m,
        J, ga = /\?/,
        U = /^\/|^[^:]+:\/\//,
        da = /(\.)(\.?)(?:$|\/([^\.\/]+.*)?)/g,
        ha = /\/\*[\s\S]*?\*\/|(?:[^\\])\/\/.*?[\n\r]/g,
        ia = /require\s*\(\s*["']([^"']+)["']\s*\)|(?:[^\\]?)(["'])/g,
        V, G;
    G = {
        O: function (a, b) {
            return G.m(u(a, b))
        },
        m: function (a, b) {
            return b.c && a in b.c && b.c[a].ba || a
        },
        n: function (a, b) {
            return a && b.K && 0 > a.indexOf("/") && (a = s(b.K) + "/" + a), a
        },
        g: function (a, b, c, d) {
            function e(b) {
                return G.m(u(b, g.id), a)
            }

            function f(b, c, f) {
                var h, i;
                if (h = c && function (a) {
                    c.apply(C, a)
                }, q(b, "String")) {
                    if (b = e(b), f = K[b], i = f instanceof B && f.a, !(b in K)) throw Error("Module not resolved: " + b);
                    if (h) throw Error("require(id, callback) not allowed");
                    return i || f
                }
                D(G.h(G.g(a, g.id, b, d)), h, f)
            }
            var g;
            return g = new B, g.id = b || "", g.aa = d, g.B = c, g.b = a, g.q = f, f.toUrl = function (b) {
                return G.j(e(b), a).url
            }, g.O = e, g
        },
        z: function (a, b, c) {
            var d, e, f;
            return d = G.g(a, b, C, c), e = d.f, f = E(1, function (a) {
                d.l = a;
                try {
                    return G.T(d)
                } catch (b) {
                    d.d(b)
                }
            }), d.f = function (a) {
                D(c || T, function () {
                    e(K[d.id] = f(a))
                })
            }, d.D = function (a) {
                D(c || T, function () {
                    d.a && (f(a), d.p(R))
                })
            }, d
        },
        Q: function (a, b, c, d) {
            return G.g(a, c, C, d)
        },
        Z: function (a) {
            return a.q
        },
        F: function (a) {
            return a.a || (a.a = {})
        },
        Y: function (a) {
            var b = a.o;
            return b || (b = a.o = {
                id: a.id,
                uri: G.G(a),
                exports: G.F(a),
                config: function () {
                    return a.b
                }
            }, b.a = b.exports), b
        },
        G: function (a) {
            return a.url || (a.url = G.w(a.q.toUrl(a.id)), a.b)
        },
        b: function (a) {
            var b, c, d, e, f, g;
            if (b = !a, a && (G.b = G.J), a || (a = {}), d = a.apiName || "curl", e = a.apiContext || n, f = a.defineName || "define", g = a.defineContext || n, c = a.overwriteApi, !b && L && (n.curl = L, L = m), !b && !c && e[d] && e[d] != F) throw Error(d + " already exists");
            if (e[d] = F, !b || !n.define) {
                if (!b && !c && f in g && g[f] != M) throw Error(f + " already exists");
                g[f] = M = function () {
                    var a = G.X(arguments);
                    I(a)
                }, M.amd = {
                    plugins: h,
                    jQuery: h,
                    curl: "0.7.0"
                }
            }
            return G.J(a)
        },
        J: function (a, b) {
            function c(a, b) {
                var c, d, g, h, i;
                for (i in a) {
                    if (g = a[i], g.name = g.id || g.name || i, h = e, d = v(s(g.name || i)), c = d.M, (d = G.n(d.i, e)) && (h = f[d], h || (h = f[d] = z(e), h.c = z(e.c), h.e = []), delete a[i]), b) {
                        d = g;
                        var j = void 0;
                        d.path = s(d.path || d.location || ""), j = s(d.main) || "main", "." != j.charAt(0) && (j = "./" + j), d.ba = u(j, d.name + "/"), d.b = d.config, d.b && (d.b = z(e, d.b))
                    } else d = {
                        path: s(g)
                    };
                    d.N = c.split("/").length, c ? (h.c[c] = d, h.e.push(c)) : h.u = G.L(g, e)
                }
            }

            function d(a) {
                var b = a.c;
                a.da = RegExp("^(" + a.e.sort(function (a, c) {
                    return b[c].N - b[a].N
                }).join("|").replace(/\/|\./g, "\\$&") + ")(?=\\/|$)"), delete a.e
            }
            var e, f, g;
            b || (b = {}), e = z(b, a), e.u = e.baseUrl || "", e.K = e.pluginPath || "curl/plugin", e.R = RegExp(e.dontAddFileExt || ga), e.c = z(b.c), f = a.plugins || {}, e.plugins = z(b.plugins);
            for (g in f) e.plugins[G.n(g, e)] = f[g];
            f = e.plugins, e.e = [], c(a.paths, m), c(a.packages, h);
            for (g in f) {
                f[g] = z(e, f[g]);
                var i = f[g].e;
                i && (f[g].e = i.concat(e.e), d(f[g]))
            }
            return d(e), e
        },
        v: function (a) {
            var b;
            (b = a && a.preloads) && 0 < b.length && D(T, function () {
                T = G.h(G.g(H, C, b, h))
            })
        },
        j: function (a, b) {
            var c, d, e, f;
            return c = b.c, e = U.test(a) ? a : a.replace(b.da, function (a) {
                return d = c[a] || {}, f = d.b, d.path || ""
            }), {
                b: f || H,
                url: G.L(e, b)
            }
        },
        L: function (a, b) {
            var c = b.u;
            return c && !U.test(a) ? s(c) + "/" + a : a
        },
        w: function (a, b) {
            return a + ((b || H).R.test(a) ? "" : ".js")
        },
        H: function (a, b, c) {
            var d = O.createElement("script");
            return d.onload = d.onreadystatechange = function (c) {
                c = c || n.event, ("load" == c.type || fa[d.readyState]) && (delete S[a.id], d.onload = d.onreadystatechange = d.onerror = "", b())
            }, d.onerror = function () {
                c(Error("Syntax or http error: " + a.url))
            }, d.type = a.I || "text/javascript", d.charset = "utf-8", d.async = !a.ca, d.src = a.url, S[a.id] = d, P.insertBefore(d, ea), d
        },
        U: function (a) {
            var b, c = [];
            return ("string" == typeof a ? a : a.toSource ? a.toSource() : a.toString()).replace(ha, "").replace(ia, function (a, d, e) {
                return e ? b = b == e ? C : b : b || c.push(d), ""
            }), c
        },
        X: function (a) {
            var b, c, d, e, f, g;
            return f = a.length, d = a[f - 1], e = q(d, "Function") ? d.length : -1, 2 == f ? q(a[0], "Array") ? c = a[0] : b = a[0] : 3 == f && (b = a[0], c = a[1]), !c && e > 0 && (g = h, c = ["require", "exports", "module"].slice(0, e).concat(G.U(d))), {
                id: b,
                l: c || [],
                r: e >= 0 ? d : function () {
                    return d
                },
                k: g
            }
        },
        T: function (a) {
            var b;
            return b = a.r.apply(a.k ? a.a : C, a.l), b === C && a.a && (b = a.o ? a.a = a.o.a : a.a), b
        },
        A: function (a, b) {
            a.r = b.r, a.k = b.k, a.B = b.l, G.h(a)
        },
        h: function (a) {
            function b(a, b, c) {
                g[b] = a, c && k(a, b)
            }

            function c(b, c) {
                var d, e, f, g;
                d = E(1, function (a) {
                    e(a), l(a, c)
                }), e = E(1, function (a) {
                    k(a, c)
                }), f = G.V(b, a), (g = f instanceof B && f.a) && e(g), D(f, d, a.d, a.a && function (a) {
                    f.a && (a == Q ? e(f.a) : a == R && d(f.a))
                })
            }

            function d() {
                a.f(g)
            }
            var e, f, g, i, j, k, l;
            for (g = [], f = a.B, i = f.length, 0 == f.length && d(), k = E(i, b, function () {
                a.D && a.D(g)
            }), l = E(i, b, d), e = 0; i > e; e++) j = f[e], j in V ? (l(V[j](a), e, h), a.a && a.p(Q)) : j ? c(j, e) : l(C, e, h);
            return a
        },
        W: function (a) {
            return G.G(a), G.H(a, function () {
                var b = J;
                J = C, a.fa !== m && (!b || b.C ? a.d(Error(b && b.C || "define() missing or duplicated: " + a.url)) : G.A(a, b))
            }, a.d), a
        },
        V: function (a, b) {
            var c, d, e, f, g, h, i, j, k, l;
            return c = b.O, d = b.aa, k = b.b || H, e = v(a), h = e.M, f = e.i ? G.m(G.n(u(e.i, b.id), k), k) : c(h), i = G.j(f, k), e.i ? g = f : (g = i.b.moduleLoader) && (h = f, f = g, i = G.j(g, k)), e = K[f], f in K || (e = K[f] = G.z(i.b, f, d), e.url = G.w(i.url, e.b), G.W(e)), f == g && (j = new B, l = k.plugins[g] || k, D(e, function (a) {
                var b, e, f;
                if (f = a.dynamic, h = "normalize" in a ? a.normalize(h, c, l) || "" : c(h), e = g + "!" + h, b = K[e], !(e in K)) {
                    b = G.Q(l, e, h, d), f || (K[e] = b);
                    var i = function (a) {
                        b.f(a), f || (K[e] = a)
                    };
                    i.resolve = i, i.reject = i.error = b.d, a.load(h, b.q, i, l)
                }
                j != b && D(b, j.f, j.d, j.p)
            }, j.d)), j || e
        },
        $: function () {
            var a;
            if (!q(n.opera, "Opera"))
                for (var b in S)
                    if ("interactive" == S[b].readyState) {
                        a = b;
                        break
                    }
            return a
        }
    }, V = {
        require: G.Z,
        exports: G.F,
        module: G.Y
    }, F.version = "0.7.0", H = n.curl, "function" == typeof H ? (L = H, H = m) : n.curl = C, H = G.b(H), G.v(H), K.curl = F, K["curl/_privileged"] = {
        core: G,
        cache: K,
        config: function () {
            return H
        },
        _define: I,
        _curl: F,
        Promise: B
    };
    var ja = this.document;
    define("curl/plugin/js", ["curl/_privileged"], function (a) {
        function b(b, c, d) {
            function e() {
                g || (f < new Date ? d() : setTimeout(e, 10))
            }
            var f, g, i;
            f = (new Date).valueOf() + (b.ea || 3e5), d && b.a && setTimeout(e, 10), i = a.core.H(b, function () {
                g = h, b.a && (b.s = ka(b.a)), !b.a || b.s ? c(i) : d()
            }, function (a) {
                g = h, d(a)
            })
        }

        function c(a, d) {
            b(a, function () {
                var b = g.shift();
                e = 0 < g.length, b && c.apply(null, b), d.f(a.s || h)
            }, function (a) {
                d.d(a)
            })
        }
        var d, e, f = {}, g = [],
            i = ja && ja.createElement("script").async == h;
        return d = a.Promise, {
            dynamic: h,
            load: function (a, j, k, l) {
                function m(a) {
                    (k.error || function (a) {
                        throw a
                    })(a)
                }
                var n, o, p, q, r;
                n = 0 < a.indexOf("!order"), o = a.indexOf("!exports="), p = o > 0 && a.substr(o + 9), q = "prefetch" in l ? l.prefetch : h, a = n || o > 0 ? a.substr(0, a.indexOf("!")) : a, r = j.toUrl(a.lastIndexOf(".") <= a.lastIndexOf("/") ? a + ".js" : a), r in f ? f[r] instanceof d ? f[r].t(k, m) : k(f[r]) : (a = {
                    name: a,
                    url: r,
                    ca: n,
                    a: p,
                    ea: l.timeout
                }, f[r] = j = new d, j.t(function (a) {
                    f[r] = a, k(a)
                }, m), n && !i && e ? (g.push([a, j]), q && (a.I = "text/cache", b(a, function (a) {
                    a && a.parentNode.removeChild(a)
                }, function () {}), a.I = "")) : (e = e || n, c(a, j)))
            }
        }
    });
    var ma = "createElement",
        ua = this.setTimeout,
        W = this.document,
        X, wa = W && W.createStyleSheet && !(10 <= W.documentMode),
        ra = [],
        qa = [],
        oa = [],
        sa = 12,
        xa, pa = "HTTP or network error.",
        $ = {};
    W && (X = W.head || W.getElementsByTagName("head")[0], xa = wa ? na : va), define("curl/plugin/css", {
        normalize: function (a, b) {
            var c, d;
            if (!a) return a;
            c = a.split(","), d = [];
            for (var e = 0, f = c.length; f > e; e++) d.push(b(c[e]));
            return d.join(",")
        },
        load: function (a, b, c, d) {
            function e() {
                0 == --i && c()
            }

            function f(a) {
                (c.d || function (a) {
                    throw a
                })(a)
            }
            var g, h, i, j;
            for (g = (a || "").split(","), h = d.cssWatchPeriod || 50, d = d.cssNoWait, i = g.length, j = 0; j < g.length; j++) {
                var k, a = g[j],
                    a = b.toUrl(a.lastIndexOf(".") <= a.lastIndexOf("/") ? a + ".css" : a);
                d ? (k = la(), k.href = a, X.appendChild(k), e()) : xa(a, e, f, h)
            }
        },
        "plugin-builder": "./builder/css",
        pluginBuilder: "./builder/css"
    })
}).call(this);
var DISQUS = window.DISQUS || {};
DISQUS.initializer = function (a) {
    "use strict";
    var b = function (a) {
        for (var b = {}, c = a.substr(1).split("&"), d = c.length - 1; d >= 0; d--) {
            var e = c[d].split("=");
            b[e[0]] = decodeURIComponent((e[1] || "").replace(/\+/g, "%20"))
        }
        return b
    }(location.search),
        c = function (c) {
            var d = a.document;
            return b.n_s ? (d.documentElement.className += " not-supported type-" + b.n_s, void 0) : (a.onload = function () {
                var e = d.documentElement.lang,
                    f = DISQUS._baseUrls = DISQUS.initializer.getEmbeddedData("urls");
                curl({
                    baseUrl: f.next
                }), a.define = null;
                var g = [];
                b.f ? g.push("js!" + f.root + "/next/config.js?forum=" + b.f + "!order") : g.push("js!" + f.root + "/next/config.js!order"), g.push("js!common.js!order", "js!lounge.js!order"), g.push("rtl" !== d.documentElement.dir ? "css!styles/lounge.css" : "css!styles/lounge_rtl.css");
                var h = curl(g);
                e && "en" !== e && (h = h.next(["js!lang/" + e + ".js!order"]));
                var i = function () {
                    var a = !0;
                    $("#postCompatContainer").remove(), $("#notSupported").remove(), d.body.style.display = "", c && (a = c()), a && DISQUS.Bus.sendHostMessage("ready")
                };
                h.then(i, function (a) {
                    DISQUS.log && DISQUS.log(a.toString()), i()
                })
            }, void 0)
        };
    return {
        params: b,
        getEmbeddedData: function (a) {
            var b = document.getElementById("disqus-" + a);
            return b && JSON.parse(b.textContent || b.innerHTML)
        },
        init: c
    }
}(window), DISQUS.initializer.init(function () {
    "use strict";
    var a = DISQUS.initializer.getEmbeddedData,
        b = a("threadData");
    if (b.code) return $("#error").show(), DISQUS.Bus.sendHostMessage("fail", b), !1;
    $.extend(b.response, a("forumData"));
    var c = new DISQUS.next.lounge.views.Lounge({
        jsonData: b,
        el: document.body
    });
    return DISQUS.next.lounge.tracking.init(c), !0
});