!(function () {
    var e = !1,
        t = /xyz/.test(function () {
            xyz;
        })
            ? /\b_super\b/
            : /.*/;
    (this.Class = function () {}),
        (Class.extend = function (i) {
            function o() {
                !e && this.init && this.init.apply(this, arguments);
            }
            var n = this.prototype;
            e = !0;
            var s = new this();
            for (var r in ((e = !1), i))
                s[r] =
                    "function" == typeof i[r] && "function" == typeof n[r] && t.test(i[r])
                        ? (function (e, t) {
                              return function () {
                                  var i = this._super;
                                  this._super = n[e];
                                  var o = t.apply(this, arguments);
                                  return (this._super = i), o;
                              };
                          })(r, i[r])
                        : i[r];
            return (o.prototype = s), (o.constructor = o), (o.extend = arguments.callee), o;
        });
})(),
    (function (e) {
        if (!e.hasInitialised) {
            var t = {
                escapeRegExp: function (e) {
                    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                },
                hasClass: function (e, t) {
                    var i = " ";
                    return 1 === e.nodeType && (i + e.className + i).replace(/[\n\t]/g, i).indexOf(i + t + i) >= 0;
                },
                addClass: function (e, t) {
                    e.className += " " + t;
                },
                removeClass: function (e, t) {
                    var i = new RegExp("\\b" + this.escapeRegExp(t) + "\\b");
                    e.className = e.className.replace(i, "");
                },
                interpolateString: function (e, t) {
                    var i = /{{([a-z][a-z0-9\-_]*)}}/gi;
                    return e.replace(i, function () {
                        return t(arguments[1]) || "";
                    });
                },
                getCookie: function (e) {
                    var t = ("; " + document.cookie).split("; " + e + "=");
                    return 2 != t.length ? void 0 : t.pop().split(";").shift();
                },
                setCookie: function (e, t, i, o, n) {
                    var s = new Date();
                    s.setDate(s.getDate() + (i || 365));
                    var r = [e + "=" + t, "expires=" + s.toUTCString(), "path=" + (n || "/")];
                    o && r.push("domain=" + o), (document.cookie = r.join(";"));
                },
                deepExtend: function (e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (i in e && this.isPlainObject(e[i]) && this.isPlainObject(t[i]) ? this.deepExtend(e[i], t[i]) : (e[i] = t[i]));
                    return e;
                },
                throttle: function (e, t) {
                    var i = !1;
                    return function () {
                        i ||
                            (e.apply(this, arguments),
                            (i = !0),
                            setTimeout(function () {
                                i = !1;
                            }, t));
                    };
                },
                hash: function (e) {
                    var t,
                        i,
                        o = 0;
                    if (0 === e.length) return o;
                    for (t = 0, i = e.length; t < i; ++t) (o = (o << 5) - o + e.charCodeAt(t)), (o |= 0);
                    return o;
                },
                normaliseHex: function (e) {
                    return "#" == e[0] && (e = e.substr(1)), 3 == e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), e;
                },
                getContrast: function (e) {
                    return (e = this.normaliseHex(e)), (299 * parseInt(e.substr(0, 2), 16) + 587 * parseInt(e.substr(2, 2), 16) + 114 * parseInt(e.substr(4, 2), 16)) / 1e3 >= 128 ? "#000" : "#fff";
                },
                getLuminance: function (e) {
                    var t = parseInt(this.normaliseHex(e), 16),
                        i = 38,
                        o = (t >> 16) + i,
                        n = ((t >> 8) & 255) + i,
                        s = (255 & t) + i;
                    return "#" + (16777216 + 65536 * (o < 255 ? (o < 1 ? 0 : o) : 255) + 256 * (n < 255 ? (n < 1 ? 0 : n) : 255) + (s < 255 ? (s < 1 ? 0 : s) : 255)).toString(16).slice(1);
                },
                isMobile: function () {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                },
                isPlainObject: function (e) {
                    return "object" == typeof e && null !== e && e.constructor == Object;
                },
            };
            (e.status = { deny: "deny", allow: "allow", dismiss: "dismiss" }),
                (e.transitionEnd = (function () {
                    var e = document.createElement("div"),
                        t = { t: "transitionend", OT: "oTransitionEnd", msT: "MSTransitionEnd", MozT: "transitionend", WebkitT: "webkitTransitionEnd" };
                    for (var i in t) if (t.hasOwnProperty(i) && "undefined" != typeof e.style[i + "ransition"]) return t[i];
                    return "";
                })()),
                (e.hasTransition = !!e.transitionEnd);
            var i = Object.keys(e.status).map(t.escapeRegExp);
            (e.customStyles = {}),
                (e.Popup = (function () {
                    function o() {
                        this.initialise.apply(this, arguments);
                    }
                    function n(e) {
                        (this.openingTimeout = null), t.removeClass(e, "cc-invisible");
                    }
                    function s(t) {
                        (t.style.display = "none"), t.removeEventListener(e.transitionEnd, this.afterTransition), (this.afterTransition = null);
                    }
                    function r() {
                        var t = this.options.onInitialise.bind(this);
                        if (!window.navigator.cookieEnabled) return t(e.status.deny), !0;
                        if (window.CookiesOK || window.navigator.CookiesOK) return t(e.status.allow), !0;
                        var i = Object.keys(e.status),
                            o = this.getStatus(),
                            n = i.indexOf(o) >= 0;
                        return n && t(o), n;
                    }
                    function a() {
                        var e = this.options.position.split("-"),
                            t = [];
                        return (
                            e.forEach(function (e) {
                                t.push("cc-" + e);
                            }),
                            t
                        );
                    }
                    function c() {
                        var e = this.options,
                            i = "top" == e.position || "bottom" == e.position ? "banner" : "floating";
                        t.isMobile() && (i = "floating");
                        var o = ["cc-" + i, "cc-type-" + e.type, "cc-theme-" + e.theme];
                        return e["static"] && o.push("cc-static"), o.push.apply(o, a.call(this)), h.call(this, this.options.palette), this.customStyleSelector && o.push(this.customStyleSelector), o;
                    }
                    function l() {
                        var e = {},
                            i = this.options;
                        i.showLink || ((i.elements.link = ""), (i.elements.messagelink = i.elements.message)),
                            Object.keys(i.elements).forEach(function (o) {
                                e[o] = t.interpolateString(i.elements[o], function (e) {
                                    var t = i.content[e];
                                    return e && "string" == typeof t && t.length ? t : "";
                                });
                            });
                        var o = i.compliance[i.type];
                        o || (o = i.compliance.info),
                            (e.compliance = t.interpolateString(o, function (t) {
                                return e[t];
                            }));
                        var n = i.layouts[i.layout];
                        return (
                            n || (n = i.layouts.basic),
                            t.interpolateString(n, function (t) {
                                return e[t];
                            })
                        );
                    }
                    function u(i) {
                        var o = this.options,
                            n = document.createElement("div"),
                            s = o.container && 1 === o.container.nodeType ? o.container : document.body;
                        n.innerHTML = i;
                        var r = n.children[0];
                        return (
                            (r.style.display = "none"),
                            t.hasClass(r, "cc-window") && e.hasTransition && t.addClass(r, "cc-invisible"),
                            (this.onButtonClick = d.bind(this)),
                            r.addEventListener("click", this.onButtonClick),
                            o.autoAttach && (s.firstChild ? s.insertBefore(r, s.firstChild) : s.appendChild(r)),
                            r
                        );
                    }
                    function d(o) {
                        var n = o.target;
                        if (t.hasClass(n, "cc-btn")) {
                            var s = n.className.match(new RegExp("\\bcc-(" + i.join("|") + ")\\b")),
                                r = (s && s[1]) || !1;
                            r && (this.setStatus(r), this.close(!0));
                        }
                        t.hasClass(n, "cc-close") && (this.setStatus(e.status.dismiss), this.close(!0)), t.hasClass(n, "cc-revoke") && this.revokeChoice();
                    }
                    function h(e) {
                        var i = t.hash(JSON.stringify(e)),
                            o = "cc-color-override-" + i,
                            n = t.isPlainObject(e);
                        return (this.customStyleSelector = n ? o : null), n && p(i, e, "." + o), n;
                    }
                    function p(i, o, n) {
                        if (e.customStyles[i]) ++e.customStyles[i].references;
                        else {
                            var s = {},
                                r = o.popup,
                                a = o.button,
                                c = o.highlight;
                            r &&
                                ((r.text = r.text ? r.text : t.getContrast(r.background)),
                                (r.link = r.link ? r.link : r.text),
                                (s[n + ".cc-window"] = ["color: " + r.text, "background-color: " + r.background]),
                                (s[n + ".cc-revoke"] = ["color: " + r.text, "background-color: " + r.background]),
                                (s[n + " .cc-link," + n + " .cc-link:active," + n + " .cc-link:visited"] = ["color: " + r.link]),
                                a &&
                                    ((a.text = a.text ? a.text : t.getContrast(a.background)),
                                    (a.border = a.border ? a.border : "transparent"),
                                    (s[n + " .cc-btn"] = ["color: " + a.text, "border-color: " + a.border, "background-color: " + a.background]),
                                    "transparent" != a.background && (s[n + " .cc-btn:hover, " + n + " .cc-btn:focus"] = ["background-color: " + f(a.background)]),
                                    c
                                        ? ((c.text = c.text ? c.text : t.getContrast(c.background)),
                                          (c.border = c.border ? c.border : "transparent"),
                                          (s[n + " .cc-highlight .cc-btn:first-child"] = ["color: " + c.text, "border-color: " + c.border, "background-color: " + c.background]))
                                        : (s[n + " .cc-highlight .cc-btn:first-child"] = ["color: " + r.text])));
                            var l = document.createElement("style");
                            document.head.appendChild(l), (e.customStyles[i] = { references: 1, element: l.sheet });
                            var u = -1;
                            for (var d in s) s.hasOwnProperty(d) && l.sheet.insertRule(d + "{" + s[d].join(";") + "}", ++u);
                        }
                    }
                    function f(e) {
                        return "000000" == (e = t.normaliseHex(e)) ? "#222" : t.getLuminance(e);
                    }
                    function m(i) {
                        if (t.isPlainObject(i)) {
                            var o = t.hash(JSON.stringify(i)),
                                n = e.customStyles[o];
                            if (n && !--n.references) {
                                var s = n.element.ownerNode;
                                s && s.parentNode && s.parentNode.removeChild(s), (e.customStyles[o] = null);
                            }
                        }
                    }
                    function v(e, t) {
                        for (var i = 0, o = e.length; i < o; ++i) {
                            var n = e[i];
                            if ((n instanceof RegExp && n.test(t)) || ("string" == typeof n && n.length && n === t)) return !0;
                        }
                        return !1;
                    }
                    function y() {
                        var t = this.setStatus.bind(this),
                            i = this.options.dismissOnTimeout;
                        "number" == typeof i &&
                            i >= 0 &&
                            (this.dismissTimeout = window.setTimeout(function () {
                                t(e.status.dismiss);
                            }, Math.floor(i)));
                        var o = this.options.dismissOnScroll;
                        if ("number" == typeof o && o >= 0) {
                            var n = function () {
                                window.pageYOffset > Math.floor(o) && (t(e.status.dismiss), window.removeEventListener("scroll", n), (this.onWindowScroll = null));
                            };
                            (this.onWindowScroll = n), window.addEventListener("scroll", n);
                        }
                    }
                    function g() {
                        if (("info" != this.options.type && (this.options.revokable = !0), t.isMobile() && (this.options.animateRevokable = !1), this.options.revokable)) {
                            var e = a.call(this);
                            this.options.animateRevokable && e.push("cc-animate"), this.customStyleSelector && e.push(this.customStyleSelector);
                            var i = this.options.revokeBtn.replace("{{classes}}", e.join(" "));
                            this.revokeBtn = u.call(this, i);
                            var o = this.revokeBtn;
                            if (this.options.animateRevokable) {
                                var n = t.throttle(function (e) {
                                    var i = !1,
                                        n = 20,
                                        s = window.innerHeight - 20;
                                    t.hasClass(o, "cc-top") && e.clientY < n && (i = !0),
                                        t.hasClass(o, "cc-bottom") && e.clientY > s && (i = !0),
                                        i ? t.hasClass(o, "cc-active") || t.addClass(o, "cc-active") : t.hasClass(o, "cc-active") && t.removeClass(o, "cc-active");
                                }, 200);
                                (this.onMouseMove = n), window.addEventListener("mousemove", n);
                            }
                        }
                    }
                    var b = {
                        enabled: !0,
                        container: null,
                        cookie: { name: "cookieconsent_status", path: "/", domain: "", expiryDays: 365 },
                        onPopupOpen: function () {},
                        onPopupClose: function () {},
                        onInitialise: function () {},
                        onStatusChange: function () {},
                        onRevokeChoice: function () {},
                        content: {
                            header: "Cookies used on the website!",
                            message: "This website uses cookies to ensure you get the best experience on our website.",
                            dismiss: "Got it!",
                            allow: "Allow cookies",
                            deny: "Decline",
                            link: "Learn more",
                            href: "http://cookiesandyou.com",
                            close: "&#x274c;",
                        },
                        elements: {
                            header: '<span class="cc-header">{{header}}</span>&nbsp;',
                            message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
                            messagelink:
                                '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="_blank">{{link}}</a></span>',
                            dismiss: '<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
                            allow: '<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',
                            deny: '<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
                            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',
                            close: '<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>',
                        },
                        window: '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',
                        revokeBtn: '<div class="cc-revoke {{classes}}">Cookie Policy</div>',
                        compliance: {
                            info: '<div class="cc-compliance">{{dismiss}}</div>',
                            "opt-in": '<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',
                            "opt-out": '<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>',
                        },
                        type: "info",
                        layouts: { basic: "{{messagelink}}{{compliance}}", "basic-close": "{{messagelink}}{{compliance}}{{close}}", "basic-header": "{{header}}{{message}}{{link}}{{compliance}}" },
                        layout: "basic",
                        position: "bottom",
                        theme: "block",
                        static: !1,
                        palette: null,
                        revokable: !1,
                        animateRevokable: !0,
                        showLink: !0,
                        dismissOnScroll: !1,
                        dismissOnTimeout: !1,
                        autoOpen: !0,
                        autoAttach: !0,
                        whitelistPage: [],
                        blacklistPage: [],
                        overrideHTML: null,
                    };
                    return (
                        (o.prototype.initialise = function (e) {
                            this.options && this.destroy(),
                                t.deepExtend((this.options = {}), b),
                                t.isPlainObject(e) && t.deepExtend(this.options, e),
                                r.call(this) && (this.options.enabled = !1),
                                v(this.options.blacklistPage, location.pathname) && (this.options.enabled = !1),
                                v(this.options.whitelistPage, location.pathname) && (this.options.enabled = !0);
                            var i = this.options.window.replace("{{classes}}", c.call(this).join(" ")).replace("{{children}}", l.call(this)),
                                o = this.options.overrideHTML;
                            if (("string" == typeof o && o.length && (i = o), this.options["static"])) {
                                var n = u.call(this, '<div class="cc-grower">' + i + "</div>");
                                (n.style.display = ""), (this.element = n.firstChild), (this.element.style.display = "none"), t.addClass(this.element, "cc-invisible");
                            } else this.element = u.call(this, i);
                            y.call(this), g.call(this), this.options.autoOpen && this.autoOpen();
                        }),
                        (o.prototype.destroy = function () {
                            this.onButtonClick && this.element && (this.element.removeEventListener("click", this.onButtonClick), (this.onButtonClick = null)),
                                this.dismissTimeout && (clearTimeout(this.dismissTimeout), (this.dismissTimeout = null)),
                                this.onWindowScroll && (window.removeEventListener("scroll", this.onWindowScroll), (this.onWindowScroll = null)),
                                this.onMouseMove && (window.removeEventListener("mousemove", this.onMouseMove), (this.onMouseMove = null)),
                                this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element),
                                (this.element = null),
                                this.revokeBtn && this.revokeBtn.parentNode && this.revokeBtn.parentNode.removeChild(this.revokeBtn),
                                (this.revokeBtn = null),
                                m(this.options.palette),
                                (this.options = null);
                        }),
                        (o.prototype.open = function () {
                            if (this.element) return this.isOpen() || (e.hasTransition ? this.fadeIn() : (this.element.style.display = ""), this.options.revokable && this.toggleRevokeButton(), this.options.onPopupOpen.call(this)), this;
                        }),
                        (o.prototype.close = function (t) {
                            if (this.element)
                                return this.isOpen() && (e.hasTransition ? this.fadeOut() : (this.element.style.display = "none"), t && this.options.revokable && this.toggleRevokeButton(!0), this.options.onPopupClose.call(this)), this;
                        }),
                        (o.prototype.fadeIn = function () {
                            var i = this.element;
                            if (e.hasTransition && i && (this.afterTransition && s.call(this, i), t.hasClass(i, "cc-invisible"))) {
                                if (((i.style.display = ""), this.options["static"])) {
                                    var o = this.element.clientHeight;
                                    this.element.parentNode.style.maxHeight = o + "px";
                                }
                                var r = 20;
                                this.openingTimeout = setTimeout(n.bind(this, i), r);
                            }
                        }),
                        (o.prototype.fadeOut = function () {
                            var i = this.element;
                            e.hasTransition &&
                                i &&
                                (this.openingTimeout && (clearTimeout(this.openingTimeout), n.bind(this, i)),
                                t.hasClass(i, "cc-invisible") ||
                                    (this.options["static"] && (this.element.parentNode.style.maxHeight = ""),
                                    (this.afterTransition = s.bind(this, i)),
                                    i.addEventListener(e.transitionEnd, this.afterTransition),
                                    t.addClass(i, "cc-invisible")));
                        }),
                        (o.prototype.isOpen = function () {
                            return this.element && "" == this.element.style.display && (!e.hasTransition || !t.hasClass(this.element, "cc-invisible"));
                        }),
                        (o.prototype.toggleRevokeButton = function (e) {
                            this.revokeBtn && (this.revokeBtn.style.display = e ? "" : "none");
                        }),
                        (o.prototype.revokeChoice = function (e) {
                            (this.options.enabled = !0), this.clearStatus(), this.options.onRevokeChoice.call(this), e || this.autoOpen();
                        }),
                        (o.prototype.hasAnswered = function () {
                            return Object.keys(e.status).indexOf(this.getStatus()) >= 0;
                        }),
                        (o.prototype.hasConsented = function () {
                            var t = this.getStatus();
                            return t == e.status.allow || t == e.status.dismiss;
                        }),
                        (o.prototype.autoOpen = function () {
                            !this.hasAnswered() && this.options.enabled && this.open();
                        }),
                        (o.prototype.setStatus = function (i) {
                            var o = this.options.cookie,
                                n = t.getCookie(o.name),
                                s = Object.keys(e.status).indexOf(n) >= 0;
                            Object.keys(e.status).indexOf(i) >= 0 ? (t.setCookie(o.name, i, o.expiryDays, o.domain, o.path), this.options.onStatusChange.call(this, i, s)) : this.clearStatus();
                        }),
                        (o.prototype.getStatus = function () {
                            return t.getCookie(this.options.cookie.name);
                        }),
                        (o.prototype.clearStatus = function () {
                            var e = this.options.cookie;
                            t.setCookie(e.name, "", -1, e.domain, e.path);
                        }),
                        o
                    );
                })()),
                (e.Location = (function () {
                    function e(e) {
                        t.deepExtend((this.options = {}), s), t.isPlainObject(e) && t.deepExtend(this.options, e), (this.currentServiceIndex = -1);
                    }
                    function i(e, t, i) {
                        var o,
                            n = document.createElement("script");
                        (n.type = "text/" + (e.type || "javascript")),
                            (n.src = e.src || e),
                            (n.async = !1),
                            (n.onreadystatechange = n.onload = function () {
                                var e = n.readyState;
                                clearTimeout(o), t.done || (e && !/loaded|complete/.test(e)) || ((t.done = !0), t(), (n.onreadystatechange = n.onload = null));
                            }),
                            document.body.appendChild(n),
                            (o = setTimeout(function () {
                                (t.done = !0), t(), (n.onreadystatechange = n.onload = null);
                            }, i));
                    }
                    function o(e, t, i, o, n) {
                        var s = new (window.XMLHttpRequest || window.ActiveXObject)("MSXML2.XMLHTTP.3.0");
                        if ((s.open(o ? "POST" : "GET", e, 1), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), Array.isArray(n)))
                            for (var r = 0, a = n.length; r < a; ++r) {
                                var c = n[r].split(":", 2);
                                s.setRequestHeader(c[0].replace(/^\s+|\s+$/g, ""), c[1].replace(/^\s+|\s+$/g, ""));
                            }
                        "function" == typeof t &&
                            (s.onreadystatechange = function () {
                                s.readyState > 3 && t(s);
                            }),
                            s.send(o);
                    }
                    function n(e) {
                        return new Error("Error [" + (e.code || "UNKNOWN") + "]: " + e.error);
                    }
                    var s = {
                        timeout: 5e3,
                        services: ["freegeoip", "ipinfo", "maxmind"],
                        serviceDefinitions: {
                            freegeoip: function () {
                                return {
                                    url: "//freegeoip.net/json/?callback={callback}",
                                    isScript: !0,
                                    callback: function (e, t) {
                                        try {
                                            var i = JSON.parse(t);
                                            return i.error ? n(i) : { code: i.country_code };
                                        } catch (o) {
                                            return n({ error: "Invalid response (" + o + ")" });
                                        }
                                    },
                                };
                            },
                            ipinfo: function () {
                                return {
                                    url: "//ipinfo.io",
                                    headers: ["Accept: application/json"],
                                    callback: function (e, t) {
                                        try {
                                            var i = JSON.parse(t);
                                            return i.error ? n(i) : { code: i.country };
                                        } catch (o) {
                                            return n({ error: "Invalid response (" + o + ")" });
                                        }
                                    },
                                };
                            },
                            ipinfodb: function () {
                                return {
                                    url: "//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",
                                    isScript: !0,
                                    callback: function (e, t) {
                                        try {
                                            var i = JSON.parse(t);
                                            return "ERROR" == i.statusCode ? n({ error: i.statusMessage }) : { code: i.countryCode };
                                        } catch (o) {
                                            return n({ error: "Invalid response (" + o + ")" });
                                        }
                                    },
                                };
                            },
                            maxmind: function () {
                                return {
                                    url: "//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",
                                    isScript: !0,
                                    callback: function (e) {
                                        return window.geoip2
                                            ? void geoip2.country(
                                                  function (t) {
                                                      try {
                                                          e({ code: t.country.iso_code });
                                                      } catch (i) {
                                                          e(n(i));
                                                      }
                                                  },
                                                  function (t) {
                                                      e(n(t));
                                                  }
                                              )
                                            : void e(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"));
                                    },
                                };
                            },
                        },
                    };
                    return (
                        (e.prototype.getNextService = function () {
                            var e;
                            do {
                                e = this.getServiceByIdx(++this.currentServiceIndex);
                            } while (this.currentServiceIndex < this.options.services.length && !e);
                            return e;
                        }),
                        (e.prototype.getServiceByIdx = function (e) {
                            var i = this.options.services[e];
                            if ("function" == typeof i) {
                                var o = i();
                                return o.name && t.deepExtend(o, this.options.serviceDefinitions[o.name](o)), o;
                            }
                            return "string" == typeof i ? this.options.serviceDefinitions[i]() : t.isPlainObject(i) ? this.options.serviceDefinitions[i.name](i) : null;
                        }),
                        (e.prototype.locate = function (e, t) {
                            var i = this.getNextService();
                            return i ? ((this.callbackComplete = e), (this.callbackError = t), void this.runService(i, this.runNextServiceOnError.bind(this))) : void t(new Error("No services to run"));
                        }),
                        (e.prototype.setupUrl = function (e) {
                            var t = this.getCurrentServiceOpts();
                            return e.url.replace(/\{(.*?)\}/g, function (i, o) {
                                if ("callback" === o) {
                                    var n = "callback" + Date.now();
                                    return (
                                        (window[n] = function (t) {
                                            e.__JSONP_DATA = JSON.stringify(t);
                                        }),
                                        n
                                    );
                                }
                                if (o in t.interpolateUrl) return t.interpolateUrl[o];
                            });
                        }),
                        (e.prototype.runService = function (e, t) {
                            var n = this;
                            e &&
                                e.url &&
                                e.callback &&
                                (e.isScript ? i : o)(
                                    this.setupUrl(e),
                                    function (i) {
                                        var o = i ? i.responseText : "";
                                        e.__JSONP_DATA && ((o = e.__JSONP_DATA), delete e.__JSONP_DATA), n.runServiceCallback.call(n, t, e, o);
                                    },
                                    this.options.timeout,
                                    e.data,
                                    e.headers
                                );
                        }),
                        (e.prototype.runServiceCallback = function (e, t, i) {
                            var o = this,
                                n = function (t) {
                                    s || o.onServiceResult.call(o, e, t);
                                },
                                s = t.callback(n, i);
                            s && this.onServiceResult.call(this, e, s);
                        }),
                        (e.prototype.onServiceResult = function (e, t) {
                            t instanceof Error || (t && t.error) ? e.call(this, t, null) : e.call(this, null, t);
                        }),
                        (e.prototype.runNextServiceOnError = function (e, t) {
                            if (e) {
                                this.logError(e);
                                var i = this.getNextService();
                                i ? this.runService(i, this.runNextServiceOnError.bind(this)) : this.completeService.call(this, this.callbackError, new Error("All services failed"));
                            } else this.completeService.call(this, this.callbackComplete, t);
                        }),
                        (e.prototype.getCurrentServiceOpts = function () {
                            var e = this.options.services[this.currentServiceIndex];
                            return "string" == typeof e ? { name: e } : "function" == typeof e ? e() : t.isPlainObject(e) ? e : {};
                        }),
                        (e.prototype.completeService = function (e, t) {
                            (this.currentServiceIndex = -1), e && e(t);
                        }),
                        (e.prototype.logError = function (e) {
                            var t = this.currentServiceIndex,
                                i = this.getServiceByIdx(t);
                            console.error("The service[" + t + "] (" + i.url + ") responded with the following error", e);
                        }),
                        e
                    );
                })()),
                (e.Law = (function () {
                    function e() {
                        this.initialise.apply(this, arguments);
                    }
                    var i = {
                        regionalLaw: !0,
                        hasLaw: ["AT", "BE", "BG", "HR", "CZ", "CY", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "SK", "SI", "ES", "SE", "GB", "UK"],
                        revokable: ["HR", "CY", "DK", "EE", "FR", "DE", "LV", "LT", "NL", "PT", "ES"],
                        explicitAction: ["HR", "IT", "ES"],
                    };
                    return (
                        (e.prototype.initialise = function (e) {
                            t.deepExtend((this.options = {}), i), t.isPlainObject(e) && t.deepExtend(this.options, e);
                        }),
                        (e.prototype.get = function (e) {
                            var t = this.options;
                            return { hasLaw: t.hasLaw.indexOf(e) >= 0, revokable: t.revokable.indexOf(e) >= 0, explicitAction: t.explicitAction.indexOf(e) >= 0 };
                        }),
                        (e.prototype.applyLaw = function (e, t) {
                            var i = this.get(t);
                            return i.hasLaw || (e.enabled = !1), this.options.regionalLaw && (i.revokable && (e.revokable = !0), i.explicitAction && ((e.dismissOnScroll = !1), (e.dismissOnTimeout = !1))), e;
                        }),
                        e
                    );
                })()),
                (e.initialise = function (t, i, o) {
                    var n = new e.Law(t.law);
                    i || (i = function () {}),
                        o || (o = function () {}),
                        e.getCountryCode(
                            t,
                            function (o) {
                                delete t.law, delete t.location, o.code && (t = n.applyLaw(t, o.code)), i(new e.Popup(t));
                            },
                            function (i) {
                                delete t.law, delete t.location, o(i, new e.Popup(t));
                            }
                        );
                }),
                (e.getCountryCode = function (t, i, o) {
                    t.law && t.law.countryCode
                        ? i({ code: t.law.countryCode })
                        : t.location
                        ? new e.Location(t.location).locate(function (e) {
                              i(e || {});
                          }, o)
                        : i({});
                }),
                (e.utils = t),
                (e.hasInitialised = !0),
                (window.cookieconsent = e);
        }
    })(window.cookieconsent || {}),
    (window.SL = function (e) {
        e = e.split(".");
        for (var t = SL; e.length; ) {
            var i = e.shift();
            t[i] || (t[i] = {}), (t = t[i]);
        }
        return t;
    }),
    (function () {
        function e() {
            o || ((o = !0), t(), i());
        }
        function t() {
            n.classList.add("loaded");
        }
        function i() {
            n.classList.contains("index") ? new SL.views.marketing.Index() : n.classList.contains("marketing") && new SL.views.marketing.Page();
        }
        var o = !1,
            n = document.documentElement;
        "complete" === document.readyState
            ? setTimeout(e, 1)
            : "interactive" === document.readyState
            ? ((document.onreadystatechange = function () {
                  "complete" == document.readyState && setTimeout(e, 1);
              }),
              window.addEventListener("load", e))
            : (document.addEventListener("DOMContentLoaded", e), window.addEventListener("load", e));
    })(),
    (SL("views.marketing").Base = Class.extend({
        init: function () {
            (this.device = { IS_PHONE: /iphone|ipod|android|windows\sphone/gi.test(navigator.userAgent), IS_TABLET: /ipad/gi.test(navigator.userAgent) }),
                this.setup(),
                this.bind(),
                this.syncScrolling(),
                setTimeout(this.asyncSetup.bind(this), 400);
        },
        asyncSetup: function () {
            this.syncMedia(), this.runMarqueeIntro(), this.setupCookieConsent(), this.setupHeader(), document.querySelector(".logo-animation").classList.add("open");
        },
        setup: function () {
            (this.device.IS_PHONE || this.device.IS_TABLET) &&
                document.querySelectorAll(".feature video, .marquee-video video").forEach(function (e) {
                    (e.controls = !0), this.device.IS_TABLET && (e.controls = !1);
                }, this),
                document.querySelectorAll(".feature-media, .feature-bento-media, .marquee-video").forEach(
                    function (e) {
                        (video = e.querySelector("video")),
                            video &&
                                (this.device.IS_PHONE || this.device.IS_TABLET
                                    ? (e.classList.add("loaded"), this.loadFeatureAnimation(e))
                                    : video.addEventListener(
                                          "loadeddata",
                                          function () {
                                              e.classList.add("loaded"), e.classList.contains("playing") && this.startFeatureAnimation(e);
                                          }.bind(this)
                                      ));
                    }.bind(this)
                ),
                (this.themeColorElement = document.querySelector('meta[name="theme-color"]')),
                (this.defaultThemeColor = this.themeColorElement ? this.themeColorElement.getAttribute("content") : "#fff");
        },
        bind: function () {
            (this.syncMedia = this.syncMedia.bind(this)),
                window.addEventListener("resize", this.syncMedia),
                window.addEventListener(
                    "scroll",
                    function () {
                        this.syncMedia(), this.syncScrolling();
                    }.bind(this),
                    { passive: !0 }
                );
        },
        syncScrolling: function () {
            var e = document.documentElement.scrollTop,
                t = document.querySelector(".global-header"),
                i = this.isScrolled;
            (this.isScrolled = e > 30),
                e > 30 ? t.classList.add("is-scrolled-30") : t.classList.remove("is-scrolled-30"),
                e > 150 ? t.classList.add("is-scrolled-150") : t.classList.remove("is-scrolled-150"),
                this.isScrolled !== i && this.themeColorElement && this.themeColorElement.setAttribute("content", this.isScrolled ? "#fff" : this.defaultThemeColor);
        },
        syncMedia: function () {
            var e = document.documentElement.scrollTop;
            if (!this.device.IS_PHONE && !this.device.IS_TABLET) {
                var t = window.innerHeight,
                    i = 200;
                document.querySelectorAll(".feature-media, .marquee-video").forEach((e, o) => {
                    var n = e.getBoundingClientRect(),
                        s = e.classList.contains("playing"),
                        r = 0 === o ? -20 : 100;
                    !e.classList.contains("loaded") && n.bottom > -i && n.top < t + r && this.loadFeatureAnimation(e),
                        n.top + n.height / 2 > 0 && n.top + n.height / 2 < t ? s || this.startFeatureAnimation(e) : s && this.stopFeatureAnimation(e);
                }),
                    document.querySelectorAll(".feature-bento").forEach((o) => {
                        var n = o.getBoundingClientRect(),
                            s = o.classList.contains("playing");
                        !o.classList.contains("loaded") &&
                            n.bottom > -i &&
                            n.top < t - 120 &&
                            e > 2 &&
                            (o.classList.add("loaded"),
                            document.querySelectorAll(".feature-bento-media").forEach((e) => {
                                this.loadFeatureAnimation(e);
                            })),
                            n.top + n.height / 2 > 0 && n.top + n.height / 2 < t ? s || this.startBentoAnimation(o) : s && this.stopBentoAnimation(o);
                    });
            }
            !this.postersLoaded &&
                e > 20 &&
                ((this.postersLoaded = !0),
                document.querySelectorAll(".feature video[data-poster]").forEach(function (e) {
                    e.setAttribute("poster", e.getAttribute("data-poster")), e.removeAttribute("data-poster");
                }));
        },
        setupCookieConsent: function () {
            if (window.cookieconsent) {
                window.cookieconsent.initialise({
                    container: document.body,
                    location: !1,
                    blacklistPage: [/^\/users\/(sign_up|invitations)/g, /^\/teams\/new/g, /.+\/(live|speaker|embed)$/g, /.+\/speaker/g],
                    palette: { popup: { background: "rgba(255, 255, 255, 0.95)", text: "#252525" }, button: { background: "#222", text: "#fff" } },
                    content: { message: "This site uses cookies to deliver its services and to analyze traffic.", href: "/security/cookies", dismiss: "Got it" },
                    cookie: { domain: ".slides.com" },
                    dismissOnScroll: 100,
                    dismissOnTimeout: 5e3,
                    onStatusChange: function () {
                        window.scrollY > 100 && this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element);
                    },
                });
                var e = document.querySelector(".cc-window");
                e && (e.classList.remove("cc-floating"), e.classList.add("cc-banner"));
            }
        },
        setupHeader: function () {
            function e(e) {
                e.preventDefault(), document.querySelector(".global-header").classList.toggle("show-menu");
            }
            var t = document.querySelector(".global-header .menu-button");
            t && (t.addEventListener("click", e), t.addEventListener("touchstart", e));
        },
        updatePricingLinks: function () {
            var e = document.querySelector(".features[data-pricing-link]");
            if (e) {
                var t = e.getAttribute("data-pricing-link");
                t &&
                    document.querySelectorAll('a[href="/pricing"]').forEach(function (e) {
                        e.setAttribute("href", t);
                    });
            }
        },
        loadFirstPoster: function () {
            var e = document.querySelector(".feature");
            if (e)
                e.querySelectorAll("video[data-poster]").forEach(function (e) {
                    e.setAttribute("poster", e.getAttribute("data-poster"));
                });
        },
        loadFeatureAnimation: function (e) {
            var t = e.querySelector("video");
            if (t) {
                var i = t.querySelectorAll("span[data-src]");
                if (i.length) {
                    var o = "";
                    i.forEach(function (e) {
                        o += '<source src="' + e.getAttribute("data-src") + '" type="' + e.getAttribute("data-type") + '">';
                    }),
                        o && (t.innerHTML = o);
                }
            }
        },
        startFeatureAnimation: function (e) {
            e.classList.add("playing");
            var t = e.querySelector("video");
            t && e.classList.contains("loaded") && t.play();
        },
        stopFeatureAnimation: function (e) {
            e.classList.remove("playing");
            var t = e.querySelector("video");
            t && e.classList.contains("loaded") && t.pause();
        },
        startBentoAnimation: function (e) {
            e.classList.add("playing");
            const t = Array.from(e.querySelectorAll("video"));
            t.forEach((e, t) => {
                (e.parentNode.style.cursor = "pointer"), (e.parentNode.onclick = () => i(t)), e.parentNode.querySelector(".video-progress") || e.parentNode.appendChild(this.createVideoProgressBar(e.parentNode));
            });
            const i = (e) => {
                    t.forEach((e) => this.stopBentoVideo(e));
                    const i = t[e];
                    i.hasAttribute("data-rate") && (i.playbackRate = parseFloat(i.getAttribute("data-rate"))), i.classList.add("playing"), (i.onended = o), i.play();
                    let n = i.parentNode.querySelector(".video-progress");
                    i.ontimeupdate = () => {
                        const e = n.querySelector(".bar"),
                            t = e.getAttribute("r"),
                            o = Math.PI * (2 * t);
                        e.style.strokeDashoffset = (1 - i.currentTime / i.duration) * o;
                    };
                },
                o = () => {
                    let o = t.findIndex((e) => e.classList.contains("playing"));
                    e.classList.contains("playing") && i((o + 1) % t.length);
                };
            o();
        },
        stopBentoVideo: function (e) {
            e.classList.remove("playing"), (e.onended = null), (e.onclick = null), (e.ontimeupdate = null), e.pause();
        },
        stopBentoAnimation: function (e) {
            e.classList.remove("playing"), e.querySelectorAll("video").forEach((e) => this.stopBentoVideo(e));
        },
        createVideoProgressBar: function () {
            const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            return (
                e.setAttribute("class", "video-progress"),
                e.setAttribute("width", "50"),
                e.setAttribute("height", "50"),
                e.setAttribute("viewBox", "0 0 200 200"),
                e.setAttribute("version", "1.1"),
                e.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
                (e.innerHTML =
                    '<circle class="track" r="80" cx="100" cy="100" fill="transparent" stroke-dasharray="502.48" stroke-dashoffset="0"></circle>\n\t\t\t<circle class="bar" r="80" cx="100" cy="100" fill="transparent" stroke-dasharray="502.48" stroke-dashoffset="0"></circle>\n\t\t\t<path class="play" d="M 85 65 L 85 135 L 135 100 Z" fill="#fff"></path>'),
                (e.querySelector(".bar").style.strokeDashoffset = 502.48),
                e
            );
        },
        runMarqueeIntro: function () {
            function e(e) {
                return 1 - Math.pow(1 - e, 5);
            }
            function t() {
                (s = window.devicePixelRatio || 1), (r = c.offsetWidth), (a = c.offsetHeight), (c.width = r * s), (c.height = a * s), l.scale(s, s), i();
            }
            function i() {
                l.clearRect(0, 0, r, a),
                    u.forEach(function (t) {
                        l.beginPath(),
                            t.points.forEach(function (t) {
                                var i = Math.max(e(t.progress), 0),
                                    o = a * (1 - i),
                                    n = a * i;
                                (t.x = t.fx * r), (t.y = o + t.fy * n), (t.progress = Math.min(t.progress + t.speed, 1));
                            }),
                            l.moveTo(0, a),
                            l.lineTo(t.points[0].x, t.points[0].y);
                        for (var i = 1; i < t.points.length - 2; i++) {
                            var o = t.points[i],
                                n = t.points[i + 1];
                            l.quadraticCurveTo(o.x, o.y, (o.x + n.x) / 2, (o.y + n.y) / 2);
                        }
                        if ((l.quadraticCurveTo(t.points[i].x, t.points[i].y, t.points[i + 1].x, t.points[i + 1].y), l.lineTo(r, a), l.closePath(), t.last)) l.fillStyle = t.color;
                        else {
                            var s = l.createLinearGradient(r, t.points[i].y, 0, a);
                            s.addColorStop(0, t.color), s.addColorStop(1, "rgba(255,255,255,0)"), (l.fillStyle = s);
                        }
                        l.fill();
                    });
            }
            function o() {
                i(),
                    u.some(function (e) {
                        return e.points.some(function (e) {
                            return e.progress < 0.95;
                        });
                    }) && requestAnimationFrame(o);
            }
            var n = document.querySelector(".marquee");
            if (n) {
                n.classList.add("intro");
                for (var s, r, a, c = document.querySelector(".marquee-canvas"), l = c.getContext("2d"), u = [], d = 3, h = 6, p = 0.75, f = 1; f <= d; f++) {
                    for (var m = [], v = f / d, y = 1 - v * p, g = 0; g <= h; g++) {
                        var b = g / h;
                        m.push({ fx: b, fy: 0.95 - b * y - 0.15 * Math.random() * b, progress: -0.1 * v + -0.1 * (1 - b), speed: 0.005 + Math.max(0.005 * (1 - v), 0.0025) + Math.max(0.01 * b, 0.005) });
                    }
                    u.push({ points: m, color: "rgba(255, 255, 255, " + v + ")", last: f === d });
                }
                window.addEventListener("resize", t), t(), o();
            }
        },
    })),
    (SL("views.marketing").Index = SL.views.marketing.Base.extend({
        MARQUEE_MIN_HEIGHT: 600,
        init: function () {
            (this.learnMoreButton = document.querySelector(".marquee .description-cta-secondary")),
                (this.scrollPromotion = document.querySelector(".marquee .scroll-promotion")),
                (this.scrollPromotionArrow = document.querySelector(".marquee .scroll-promotion-arrow")),
                this._super();
        },
        asyncSetup() {
            this._super.apply(this, arguments), this.startScrollPromotion(), this.setupMarquee();
        },
        setupMarquee: function () {},
        bind: function () {
            this._super.apply(this, arguments),
                this.learnMoreButton && this.learnMoreButton.addEventListener("click", this.onLearnMoreClicked.bind(this)),
                this.scrollPromotion.addEventListener("click", this.onLearnMoreClicked.bind(this)),
                this.scrollPromotionArrow.addEventListener("mouseover", this.onScrollPromotionOver.bind(this));
        },
        syncMedia: function () {
            this._super.apply(this, arguments);
            var e = document.documentElement.scrollTop;
            (this.closeToPageTop = e < 0.3 * window.innerHeight),
                e > 20 &&
                    (this.scrollPromotion.classList.add("hidden"),
                    this.postersLoaded ||
                        ((this.postersLoaded = !0),
                        document.querySelectorAll(".feature video").forEach(function (e) {
                            e.setAttribute("poster", e.getAttribute("data-poster"));
                        })));
        },
        startScrollPromotion: function () {
            this.scrollPromotion.classList.remove("hidden"), clearInterval(this.scrollPromotionInterval), (this.scrollPromotionInterval = setInterval(this.promoteScrolling.bind(this), 2500));
        },
        stopScrollPromotion: function () {
            clearInterval(this.scrollPromotionInterval), (this.scrollPromotionInterval = null);
        },
        promoteScrolling: function () {
            this.scrollPromotionArrow.classList.remove("bounce"),
                setTimeout(
                    function () {
                        this.scrollPromotionArrow.classList.add("bounce");
                    }.bind(this),
                    1
                );
        },
        onScrollPromotionOver: function () {
            this.stopScrollPromotion();
        },
        onLearnMoreClicked: function () {
            this.stopScrollPromotion();
        },
        onWindowResize: function () {
            this.syncScrolling();
        },
        onWindowScroll: function () {
            this.scrollPromotionInterval && this.stopScrollPromotion(), this.syncScrolling();
        },
    })),
    (SL("views.marketing").Page = SL.views.marketing.Base.extend({
        init: function () {
            this._super(), this.loadFirstPoster(), this.updatePricingLinks();
        },
    }));
