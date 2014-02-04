DISQUS.define("next.lounge.common", function () {
    "use strict";
    var a, b = function (b) {
            a = b
        }, c = function () {
            return a
        }, d = Backbone.View.extend({
            updateDom: function (a, b) {
                var d = c();
                d && d.initialized ? d.updateDom(a, b) : _.isFunction(a) && a.call(b)
            },
            resize: function () {
                var a = c();
                a && a.initialized && a.resize()
            }
        }),
        e = d.extend({
            initialize: function (a) {
                this.session = a.session, this.showZero = a.showZero || !1, this.max = a.max, this.listenTo(this.session, "change:notificationCount", this.render)
            },
            render: function () {
                var a = this.session.get("notificationCount") || 0;
                return this.max && (a = Math.min(a, this.max)), this.$el.html("<span>" + a + "</span>"), a > 0 || this.showZero ? this.$el.show() : this.$el.hide(), this
            }
        });
    return {
        setLounge: b,
        getLounge: c,
        LoungeSubView: d,
        NotificationCountView: e
    }
}), $(document).ready(function () {
    "use strict";

    function a() {
        $(".dropdown").removeClass("open")
    }
    $("html").on("click", a), $("body").delegate("[data-toggle]", "click", function (b) {
        b.stopPropagation(), b.preventDefault();
        var c = $(b.currentTarget),
            d = c.closest("." + c.attr("data-toggle")),
            e = "disabled" !== d.attr("data-dropdown") && !d.hasClass("open");
        d.attr("data-dropdown", "enabled"), a(), e && d.addClass("open")
    }), DISQUS.Bus.on("window.click", a)
}), DISQUS.define("next.lounge.mixins", function () {
    "use strict";
    var a = DISQUS.use("next.lounge.common"),
        b = DISQUS.use("next.utils"),
        c = b.preventDefaultHandler,
        d = {
            _getShortUrl: function (a) {
                var b = this,
                    c = this._shareUrl(),
                    d = c,
                    e = _.extend({
                        url: c,
                        source: "disqus_embed_next"
                    }, this.model.relatedIds());
                DISQUS.api.call("shortener/create.json", {
                    method: "POST",
                    data: e,
                    timeout: 1e3 * 5,
                    success: function (a) {
                        var b = a.code,
                            c = a.response;
                        0 === b && (d = c.url)
                    },
                    complete: function () {
                        a.call(b, d)
                    }
                })
            },
            _shareWaitPopup: function (a) {
                return window.open(DISQUS.urls.loading, "_blank", a || "width=550,height=520")
            },
            share: function (a) {
                this.sharers[a].call(this)
            },
            sharers: {
                twitter: function () {
                    var a = "https://twitter.com/intent/tweet",
                        b = this._shareWaitPopup();
                    this._getShortUrl(function (c) {
                        b.location = DISQUS.serialize(a, {
                            url: c,
                            text: this.model.twitterText(c)
                        })
                    })
                },
                facebook: function () {
                    var a = "https://www.facebook.com/sharer.php",
                        b = this._shareWaitPopup("width=655,height=352");
                    this._getShortUrl(function (c) {
                        b.location = DISQUS.serialize(a, {
                            u: c
                        })
                    })
                }
            }
        }, e = a.LoungeSubView.extend({
            className: "alert",
            events: {
                "click [data-action=dismiss]": "dismiss"
            },
            initialize: function (a) {
                _.extend(this, a)
            },
            render: function () {
                var a = this,
                    b = a.$el;
                return b.html(DISQUS.renderBlock("alert", {
                    message: a.message,
                    safe: a.safe
                })), b.attr("class", a.className), a.type && b.addClass(a.type), a
            },
            dismiss: function (a) {
                a && a.preventDefault && a.preventDefault(), this.remove(), this.trigger("dismiss")
            }
        }),
        f = {
            alert: function (a, b) {
                b ? _.isString(b) && (b = {
                    type: b
                }) : b = {}, this.dismissAlert();
                var c = this._alert = new e(_.extend({
                    message: a
                }, b));
                return this.updateDom(function () {
                    c.render(), this._alertSelector ? this.$el.find(this._alertSelector).prepend(c.el) : this.el.parentNode.insertBefore(c.el, this.el)
                }, this), c
            },
            dismissAlert: function () {
                this._alert && this._alert.dismiss()
            },
            setAlertSelector: function (a) {
                this._alertSelector = a
            }
        }, g = {
            toggleFollow: c(function (b) {
                var c = b && $(b.target).closest("a[data-user]").attr("data-user"),
                    d = this.collection && c ? this.collection.get(c) : this.user,
                    e = a.getLounge(),
                    f = e.session;
                return f.isRegistered() ? (d.get("isFollowing") ? this.unfollow(d) : this.follow(d), void 0) : (this.trigger("authenticating"), this.listenToOnce(f, "identify", function () {
                    this.follow(d)
                }), void e.authenticate("disqusDotcom"))
            }),
            unfollow: function (b) {
                b.unfollow(), a.getLounge().trigger("uiAction:unfollowUser", b)
            },
            follow: function (b) {
                b.follow(), a.getLounge().trigger("uiAction:followUser", b)
            }
        }, h = function () {
            function a() {
                return this.collapseTarget && this.collapseTarget.length || (this.collapseTarget = this.collapseTargetSelector ? this[this.collapseScope].find(this.collapseTargetSelector) : this[this.collapseScope]), this.collapseTarget
            }

            function b() {
                var b = this;
                if (b.isCollapseAllowed) {
                    var c = a.call(b);
                    c && c.length && b.updateDom(function () {
                        c.height(b.collapsedHeight), e.call(b)
                    })
                }
            }

            function c(a) {
                var b = this;
                if (b.collapseTarget && b.collapseTarget.length) {
                    var c = b.collapseTarget;
                    b.updateDom(function () {
                        c.css("height", "auto"), c.css("maxHeight", "none"), f.call(b)
                    }), a || (b.isCollapseAllowed = !1)
                }
            }

            function d() {
                return this.seeMoreButton && this.seeMoreButton.length || (this.seeMoreButton = a.call(this).siblings("[data-action=see-more]")), this.seeMoreButton
            }

            function e() {
                var a = this;
                d.call(this).removeClass("hidden").on("click", function () {
                    a.expand()
                })
            }

            function f() {
                d.call(this).addClass("hidden").off("click")
            }
            return function (a) {
                var d = this;
                d.isCollapseAllowed = !0, d.collapsedHeight = a.collapsedHeight, d.collapseTargetSelector = a.collapseTargetSelector, d.collapseScope = a.collapseScope || "$el", d.collapse = b, d.expand = c
            }
        }();
    return {
        ShareMixin: d,
        AlertView: e,
        AlertMixin: f,
        FollowButtonMixin: g,
        asCollapsible: h
    }
}), DISQUS.define("next.realtime", function (a) {
    "use strict";

    function b() {
        i.apply(this, arguments), this.reqCounter = 0, this.marker = 0, this.interval = 1, this._boundOnError = _.bind(this.onError, this), this._boundOnLoad = _.bind(this.onLoad, this), this._boundOnProgress = _.bind(this.onProgress, this)
    }

    function c() {
        i.apply(this, arguments), this.handshakeSuccess = null, this.interval = 1, this._boundOnOpen = _.bind(this.onOpen, this), this._boundError = _.bind(this.onError, this), this._boundClose = _.bind(this.onClose, this), this._boundMessage = _.compose(_.bind(this.onMessage, this), function (a) {
            return JSON.parse(a.data)
        })
    }
    var d = DISQUS.use("next.utils"),
        e = 2,
        f = 120,
        g = function () {}, h = function () {
            throw new Error("Pipe class cannot be used directly.")
        }, i = function (a, b) {
            this.channel = a, this.since = b, this.connection = null, this.paused = !1, this._msgBuffer = [], this._boundOpen = _.bind(this.open, this)
        };
    _.extend(i.prototype, Backbone.Events, {
        getUrl: function (a) {
            var b = {};
            return this.since && (b.since = this.since), _.extend(b, a), DISQUS.serialize(this.baseUrl + this.channel, b)
        },
        onMessage: function (a) {
            var b = a.message_type,
                c = a.firehose_id;
            this.lastEventId = c, DISQUS.log("RT: new message:", b, c);
            var d = {
                type: b,
                data: a.message_body,
                lastEventId: c
            };
            this.trigger(b, d)
        },
        _msgToBuffer: function () {
            this._msgBuffer.push(_.toArray(arguments))
        },
        pause: function (a) {
            this.paused || (this.paused = !0, this._trigger = this.trigger, this.trigger = a === !1 ? g : this._msgToBuffer, DISQUS.log("RT: paused, buffered: %s", a !== !1))
        },
        resume: function () {
            if (this.paused) {
                this.paused = !1, this.trigger = this._trigger, DISQUS.log("RT: resumed, buffered messages: %s", this._msgBuffer.length);
                for (var a; a = this._msgBuffer.shift();) this.trigger.apply(this, a)
            }
        },
        open: h,
        close: function () {
            var a = this.connection;
            return a ? (this.connection = null, a) : !1
        }
    }), _.extend(b.prototype, i.prototype, {
        baseUrl: DISQUS.urls.realertime + "/api/2/",
        onError: function () {
            this.connection && (this.connection = null, this.trigger("error", this), this.interval <= f && (this.interval *= e), d.sendStat("rt_streampipe_error"), DISQUS.logError("RT: Connection error, backing off %s secs", this.interval), _.delay(this._boundOpen, 1e3 * this.interval))
        },
        onLoad: function () {
            this.connection && (this.connection = null, this.since = null, this.trigger("success", this), d.sendStat("rt_streampipe_close"), _.defer(this._boundOpen))
        },
        onProgress: function () {
            if (this.connection) {
                var a, b = this.connection.responseText,
                    c = 0;
                if (b && !(this.marker >= b.length)) {
                    a = b.slice(this.marker).split("\n");
                    for (var d, e, f, g = a.length, h = 0; g > h; h++)
                        if (d = a[h], c += d.length + 1, e = d.replace(/^\s+|\s+$/g, "")) {
                            try {
                                f = JSON.parse(e)
                            } catch (i) {
                                if (h === g - 1) {
                                    c -= d.length + 1;
                                    break
                                }
                                DISQUS.log("RT: unable to parse: ", e, d);
                                continue
                            }
                            this.onMessage(f)
                        } else DISQUS.log("RT: ignoring empty row...");
                    c > 0 && (this.marker += c - 1)
                }
            }
        },
        open: function () {
            this.close();
            var a = this.connection = d.CORS.request("GET", this.getUrl({
                bust: ++this.reqCounter
            }), this._boundOnLoad, this._boundOnError);
            if (!a) return d.sendStat("rt_streampipe_cors_unavail"), void DISQUS.log("RT: Cannot use any cross-domain request" + " tool with StreamPipe. Bailing out.");
            a.onprogress = this._boundOnProgress, this.connection = a, this.marker = 0;
            try {
                a.send()
            } catch (b) {
                this.connection = null, d.sendStat("rt_streampipe_cors_fail"), DISQUS.log("RT: Attempt to send a CORS request failed.")
            }
        },
        close: function () {
            var a = i.prototype.close.apply(this);
            return a && a.abort()
        }
    }), _.extend(c.prototype, i.prototype, {
        baseUrl: ("https:" === a.location.protocol ? "wss:" : "ws:") + DISQUS.urls.realertime + "/ws/2/",
        onOpen: function () {
            DISQUS.log("RT: [Socket] Connection established."), this.handshakeSuccess = !0, this.since = null
        },
        onError: function () {
            if (this.connection) {
                if (this.connection = null, !this.handshakeSuccess) return DISQUS.log("RT: [Socket] Error before open, bailing out."), d.sendStat("rt_socketpipe_fail"), this.trigger("fail"), void 0;
                this.trigger("error"), this.interval <= f && (this.interval *= e), d.sendStat("rt_socketpipe_error"), DISQUS.logError("RT: Connection error, backing off %s secs", this.interval), _.delay(this._boundOpen, 1e3 * this.interval)
            }
        },
        onClose: function (a) {
            if (this.connection) {
                if (!a.wasClean) return d.sendStat("rt_socketpipe_unclean_close"), this.onError(), void 0;
                this.connection = null, d.sendStat("rt_socketpipe_clean_close"), DISQUS.log("RT: [Socket] Connection closed. Restarting..."), this.trigger("close"), this.open()
            }
        },
        open: function () {
            this.close();
            var b = this.connection = new a.WebSocket(this.getUrl());
            b.onopen = this._boundOnOpen, b.onerror = this._boundError, b.onmessage = this._boundMessage, b.onclose = this._boundClose
        },
        close: function () {
            var a = i.prototype.close.apply(this);
            return a && a.close()
        }
    });
    var j = {
        _wsSupported: a.WebSocket && 2 === WebSocket.CLOSING,
        initialize: function (a, d, e, f) {
            this.close(), this._initArgs = [a, d, e, f];
            var g = this._wsSupported,
                h = g ? c : b,
                i = this.pipe = new h(a, d);
            _.chain(e).pairs().each(function (a) {
                i.on(a[0], a[1], f)
            }), g && i.on("fail", function () {
                this._wsSupported = !1, i.off(), this.initialize.apply(this, this._initArgs)
            }, this), i.open()
        },
        pause: function (a) {
            this.pipe && this.pipe.pause(a)
        },
        resume: function () {
            this.pipe && this.pipe.resume()
        },
        close: function () {
            this.pipe && (this.pipe.close(), this.pipe = null)
        }
    };
    return $(a).on("unload", _.bind(j.close, j)), {
        Pipe: i,
        StreamPipe: b,
        SocketPipe: c,
        Manager: j
    }
}), DISQUS.define("next.lounge.tracking", function (a) {
    "use strict";

    function b(a, b) {
        var c = DISQUS.use("next.jester"),
            f = b.initialData,
            g = b.switches;
        if (_.isObject(f) && !_.isEmpty(f)) {
            b.session.once("identify", function () {
                var c = this,
                    h = c.user.id;
                if (h && d.overwrite({
                    user_id: h
                }), g.enabled("juggler_thread_onReady")) {
                    var i = {
                        thread_slug: f.thread.slug,
                        user_type: c.user.get("user_type") || "anon",
                        referrer: a.document.referrer,
                        theme: "next"
                    }, j = f.forum.settings;
                    if (j && _.has(j, "organicDiscoveryEnabled") && _.extend(i, {
                        organic_enabled: j.organicDiscoveryEnabled,
                        promoted_enabled: j.promotedDiscoveryEnabled,
                        max_enabled: j.discoveryMax,
                        thumbnails_enabled: j.discoveryThumbnailsEnabled
                    }), d.emit("init_embed", i), g.enabled("dark_jester")) {
                        var k = DISQUS.juggler.client("jester", !0);
                        k.load(_.extend(d.copySettings(), {
                            url: DISQUS.urls.jester
                        })), k.emit("init_embed", i)
                    }
                    e.init({
                        version: b.isFullscreen ? "next-mobile" : "next",
                        forum: f.forum.id,
                        features: f.features,
                        session: c.user
                    }), b.session.on("change:id", function (a) {
                        e.setSession(a), e.trackEvent(a.id ? "login" : "logout")
                    })
                }
            }), d.load({
                disable: !g.enabled("juggler_enabled"),
                url: DISQUS.urls.juggler + "/event.js",
                disableSSL: g.enabled("next_disable_ssl_juggler"),
                thread: f.thread.id,
                forum: f.forum.id,
                forum_id: f.forum.pk
            });
            var h = b.isFullscreen ? "next.fullscreen" : "next";
            b.on({
                inViewport: function () {
                    e.trackEvent("view_embed"), c.client.emit({
                        verb: "view",
                        object_type: "application",
                        object_id: h
                    }), b.off("inViewport")
                },
                "uiAction:createPost": function (a) {
                    b.session.user.id || e.setSession("guest"), null != a.get("parent") ? e.trackEvent("post_comment_reply") : e.trackEvent("post_comment")
                },
                "uiCallback:postCreated": function (a) {
                    var b = {
                        object_type: "comment",
                        object_id: a.id,
                        verb: "post"
                    };
                    a.has("parent") && (b.target_type = "comment", b.target_id = a.get("parent")), c.client.emit(b)
                },
                "uiAction:postUpvote": function (a) {
                    e.trackEvent("like_comment"), c.client.emit({
                        verb: "like",
                        object_type: "comment",
                        object_id: a.id
                    })
                },
                "uiAction:postUnvote": function (a) {
                    c.client.emit({
                        verb: "unlike",
                        object_type: "comment",
                        object_id: a.id
                    })
                },
                "uiAction:postDownvote": function (a) {
                    e.trackEvent("dislike_comment"), c.client.emit({
                        verb: "dislike",
                        object_type: "comment",
                        object_id: a.id
                    })
                },
                "uiAction:upvotersCardShow": function () {
                    e.trackEvent("upvoters_card_shown")
                },
                "uiAction:showProfileFromUpvotes": function () {
                    e.trackEvent("upvoters_profile_click")
                },
                "uiAction:threadUnlike": function () {
                    c.client.emit({
                        verb: "unlike",
                        object_type: "thread"
                    })
                },
                "uiAction:threadLike": function () {
                    e.trackEvent("like_thread"), c.client.emit({
                        verb: "like",
                        object_type: "thread"
                    })
                },
                "uiAction:postShare": function (a, b) {
                    e.trackEvent("share_comment_" + b), c.client.emit({
                        verb: "share",
                        object_type: "comment",
                        object_id: a.id,
                        target_type: "service",
                        target_id: b
                    })
                },
                "uiAction:threadShare": function (a) {
                    e.trackEvent("share_thread_" + a), c.client.emit({
                        verb: "share",
                        object_type: "thread",
                        target_type: "service",
                        target_id: a
                    })
                },
                "uiAction:navigate": function (a) {
                    var b = {
                        community: "community",
                        dashboard: "mydisqus",
                        network: "mydisqus_network"
                    }[a];
                    b && e.trackEvent("open_" + b)
                },
                "uiAction:followUser": function (a) {
                    e.trackEvent("follow_user"), c.client.emit({
                        verb: "follow",
                        object_type: "user",
                        object_id: a.id
                    })
                },
                "uiAction:unfollowUser": function (a) {
                    c.client.emit({
                        verb: "stop-following",
                        object_type: "user",
                        object_id: a.id
                    })
                },
                "uiAction:openLogin": function (a) {
                    e.trackEvent("open_login_" + a), c.client.emit({
                        verb: "open",
                        object_type: "service",
                        object_id: "login",
                        target_type: "service",
                        target_id: a
                    })
                },
                "uiAction:finishRegistrationEmbed": function () {
                    e.trackEvent("finish_registration_embed")
                },
                "uiAction:finishRegistrationWindow": function () {
                    e.trackEvent("finish_registration_window")
                },
                "uiAction:finishAccountComplete": function () {
                    e.trackEvent("finish_account_complete")
                },
                "uiAction:onboardAlertShow": function () {
                    c.client.emit({
                        zone: "top_nav",
                        section: "onboard_alert",
                        verb: "view",
                        object_type: "alert"
                    })
                },
                "uiAction:onboardOpen": function () {
                    c.client.emit({
                        zone: "top_nav",
                        section: "onboard_alert",
                        verb: "open",
                        object_type: "zone",
                        object_id: "embed.onboard"
                    })
                },
                "uiAction:onboardAlertDismiss": function () {
                    c.client.emit({
                        zone: "top_nav",
                        section: "onboard_alert",
                        verb: "close",
                        object_type: "alert"
                    })
                }
            })
        }
    }
    var c = DISQUS.use("next.intelligence"),
        d = DISQUS.juggler.client("juggler", !0),
        e = new c.Intelligence;
    return {
        init: function (c) {
            b(a, c)
        }
    }
}), DISQUS.define("next.lounge.views", function () {
        "use strict";

        function a(a) {
            var b = a && a.match(/discovery\-([\w\-]+)/);
            return b && b[1]
        }
        var b = DISQUS.use("next"),
            c = DISQUS.use("next.lounge.common"),
            d = DISQUS.use("next.models"),
            e = DISQUS.use("next.collections"),
            f = DISQUS.use("next.utils"),
            g = DISQUS.use("next.realtime"),
            h = DISQUS.use("Bus"),
            i = DISQUS.strings.get,
            j = DISQUS.use("urls"),
            k = DISQUS.use("next.lounge.views.posts"),
            l = DISQUS.use("next.lounge.views.posts.fullscreen"),
            m = DISQUS.use("next.lounge.views.dashboard"),
            n = DISQUS.use("next.lounge.views.community"),
            o = DISQUS.use("next.lounge.views.media"),
            p = DISQUS.use("next.lounge.mixins"),
            q = DISQUS.use("next.lounge.views.onboard"),
            r = DISQUS.use("next.lounge.views.posts.collection"),
            s = c.LoungeSubView,
            t = f.preventDefaultHandler,
            u = DISQUS.use("next.jester"),
            v = Backbone.View.extend({
                    events: {
                        "click [data-action^=auth\\:]": "handleAuth",
                        "click [data-action=verify-email]": "verifyEmail",
                        "click [data-action=audiencesync]": "audienceSync",
                        "click [data-action=profile]": "handleShowProfile",
                        "click [data-action=onboard]": "handleShowOnboarding",
                        "click [data-action=sort]": "handleSort",
                        "click [data-action=close-thread]": "closeThread",
                        "click [data-action=open-thread]": "openThread",
                        "click [data-action=debug]": "renderDebugInfo",
                        "click [data-action=repair]": "repairThread",
                        "click [data-action=toggle-media]": "toggleMedia",
                        "click a": _.wrap(f.logLinkClick, function (a, b) {
                            var c = !this.isLinkAffiliatorEnabled() || !$(b.currentTarget).is("[rel=nofollow]");
                            return a(b, c)
                        })
                    },
                    MEDIA_PERSISTED_WIDTHS: [320, 480, 600, 800],
                    MAX_MEDIA_HEIGHT: 480,
                    initialize: function (a) {
                        c.setLounge(this), a = a || {};
                        var b = a.jsonData || {};
                        this.initialData = b.response || {}, this.profileWindowName = _.globalUniqueId("disqus_"), f.extract(b, "response.forum.id") && (DISQUS.urls.moderate = f.updateURL(DISQUS.urls.moderate, {
                            hostname: b.response.forum.id + "."
                        })), d.Session.setDefaults(this.initialData.session), this.session = d.Session.get(), this.bindSessionEvents(), this.forum = new d.Forum, this.forum.set(this.initialData.forum), this.thread = new d.Thread(this.initialData.thread, {
                            forum: this.forum,
                            postCursor: b.cursor,
                            moderators: (this.initialData.thread || {}).moderators,
                            order: b.order
                        }), this.postsView = new r.PostCollectionView({
                            posts: this.thread.posts,
                            thread: this.thread,
                            lounge: this,
                            session: this.session,
                            el: this.el
                        }), this.switches = new e.SwitchCollection(DISQUS.config.switches, {
                            parse: !0
                        }), this.isFullscreen = f.isFullscreen(window), this.states = {
                            realtimeIndicatorsCreated: !1,
                            streamingPaused: !1,
                            inViewport: this.isFullscreen,
                            nearViewport: this.isFullscreen
                        }, this.forum.get("settings").backplaneEnabled && this.enableBackplane();
                        var g = _.bind(this.bootstrap, this);
                        f.isIframed(window) ? this.listenTo(h, "init", g) : _.defer(g), this.onboardAlert = new q.OnboardAlert({
                            session: this.session
                        }), this.proxyViewEvents(this.onboardAlert), this.setAlertSelector("#layout")
                    },
                    enableBackplane: function () {
                        this.backplaneCredentialsReady = !1, this.events["click [data-action=logout]"] = function (a) {
                            return this.backplaneCredentialsReady ? (a.preventDefault(), h.sendHostMessage("backplane.invalidate", {
                                redirectUrl: DISQUS.urls.logout
                            }), void 0) : !0
                        }, this.listenTo(this.session, "identify", function () {
                            this.backplaneCredentialsReady && !this.session.isRegistered() && (h.sendHostMessage("backplane.invalidate"), this.backplaneCredentialsReady = !1, DISQUS.api.headers({
                                Authorization: null
                            }))
                        }), this.listenTo(h, "login", function (a) {
                            null !== a.backplane && (this.setBackplaneHeaders(a.backplane), this.fetchSession())
                        }), h.sendHostMessage("loadBackplane")
                    },
                    setBackplaneHeaders: function (a) {
                        var b = "Backplane " + JSON.stringify({
                            provider: "janrain",
                            message_id_url: a.messageUrl,
                            channel_name: a.channel,
                            forum_id: this.forum.id
                        });
                        this.backplaneCredentialsReady = !0, DISQUS.api.headers({
                            Authorization: b
                        })
                    },
                    bootstrap: function (b) {
                        var c = this,
                            d = {};
                        c.config = b = b || f.getConfigFromHash(window), this.discoveryOverride = a(b.parentWindowHash), b.apiKey && (d["X-Disqus-Publisher-API-Key"] = b.apiKey), b.remoteAuthS3 && (d["X-Disqus-Remote-Auth"] = b.remoteAuthS3), _.isEmpty(d) || DISQUS.api.headers(d), b.anchorColor && ! function () {
                            var a = f.escapeColor(b.anchorColor);
                            f.addStylesheetRules([
                                [".publisher-anchor-color a", ["color", a, !0]],
                                ["a.publisher-anchor-color", ["color", a, !0]],
                                [".publisher-anchor-hover a:hover", ["color", a, !0]],
                                ["a.publisher-anchor-hover:hover", ["color", a, !0]],
                                [".active .publisher-nav-color:after", ["background", a, !0]],
                                [".media-preview .active.publisher-border-color", ["border-color", a, !0]],
                                [".publisher-color", ["color", a, !1]],
                                [".publisher-color:hover", ["color", a, !1]],
                                [".publisher-background-color", ["background-color", a, !1]],
                                [".publisher-border-color", ["border-color", a, !1]]
                            ])
                        }(), this.isMobile = this.isFullscreen || f.isPhone(window);
                        var e;
                        this.isFullscreen ? (e = j.logout.replace(/\?.*/, ""), j.logout = DISQUS.serialize(e, {
                            redirect: window.location.href
                        })) : f.injectBaseElement(b.referrer), b.referrer && (c.thread.currentUrl = b.referrer), b.width && (document.body.style.width = b.width + "px");
                        var g = this.getPermalinkOptions(b.parentWindowHash);
                        g && h.once("embed.rendered", _.bind(c.scrollToPost, c, g.postId, g.options)), b.sso && (DISQUS.templateGlobals.sso = b.sso, c.session.set("sso", b.sso)), this.position = b.initialPosition ? b.initialPosition : f.calculatePositionFullscreen(), c.updateModeratorText(), c.initUI(), c.bindBusListeners(), c.postsView.bootstrap(this.initialData), c.initSession(), c.listenTo(c.thread, "create", function (a) {
                            h.sendHostMessage("posts.create", a.toJSON())
                        }), c.initialized = !0, u.client.enableLayoutExperiment(b, this.isFullscreen);
                        var i = "next";
                        this.isFullscreen ? i = "next.fullscreen" : this.isMobile && (i = "next.sparky"), u.client.set({
                            product: "embed",
                            zone: i,
                            thread: this.initialData.thread.id,
                            forum: this.initialData.forum.id,
                            forum_id: this.initialData.forum.pk
                        }), this.initLinkAffiliator()
                    },
                    initUI: function () {
                        this.applyPublisherClasses(), window.Handlebars.lounge.templates(), this.renderLayout(), this.currentSection = "conversation", this.bindUIUpdateHandlers(), this.initDeferredViews(), this.postsView.once("rendered", function () {
                            var a = f.getPageHeight();
                            h.sendHostMessage("mainViewRendered", {
                                height: a
                            }), this._lastHeight = a, this.initRealtime()
                        }, this), _.defer(_.bind(this.initUIComponents, this))
                    },
                    initUIComponents: function () {
                        this.findClosestThumbnailSize(), this.renderForm(), this.renderHeader(), this.updatePostCount(), this.initCommunity(), this.initUserMenu(), this.initThreadVotes(), this.initThreadShareMenu(), this.initThreadSubscribe(), this.renderStreamingToggle()
                    },
                    bindUIUpdateHandlers: function () {
                        var a = this,
                            b = a.thread,
                            c = a.session;
                        a.listenTo(b, {
                            "change:likes": a.updateThreadVotes,
                            "change:userScore": a.updateThreadUserScore,
                            "change:posts": a.updatePostCount
                        }), a.listenTo(b.queue, "add reset", a.toggleRealtimeNotifications), a.postsView.bindUIUpdateHandlers(), a.listenTo(c, "change:id", a.updateThreadSessionData), a.listenTo(c, "change:id", a.initDashboard), a.listenTo(a, "scrollOffViewport", function () {
                            this.states.realtimeIndicatorsCreated && "conversation" === this.currentSection && h.sendHostMessage("indicator:hide")
                        }), a.listenTo(a, "scroll", a.handleRealtimeScroll), a.listenTo(a, "scroll", function (a) {
                            this.position = a, "conversation" === this.currentSection && (this.conversationPosition = a)
                        }), a.listenTo(a.postsView, "rendered", a.toggleRealtimeNotifications)
                    },
                    initDeferredViews: function () {
                        var a = this;
                        a.deferredViews = [], a.unsortedDeferredViews = [], a.listenTo(a, "scroll", a.processDeferredViews), a.isFullscreen && $(window).on("scroll resize", _.debounce(function () {
                            a.position = f.calculatePositionFullscreen(), a.processDeferredViews()
                        }, 100)), a.listenTo(a, "domReflow", function () {
                            this.invalidateDeferredViewOffsets(), this.processDeferredViews()
                        }), a.listenTo(h, "window.resize", a.processDeferredViews)
                    },
                    initSession: function () {
                        !this.switches.enabled("next_lazy_embed") || this.states.inViewport ? this.fetchSession() : this.listenToOnce(this, "inViewport", this.fetchSession)
                    },
                    bindBusListeners: _.once(function () {
                        this.listenTo(h, {
                            "window.hashchange": function (b) {
                                if (this.discoveryOverride = a(b), this.discoveryOverride) return this.fetchSession();
                                var c = this.getPermalinkOptions(b);
                                c && this.scrollToPost(c.postId, c.options)
                            },
                            "window.scroll": function (a) {
                                this.trigger("scroll", a)
                            },
                            "window.inViewport": function () {
                                this.states.inViewport = !0, this.trigger("inViewport")
                            },
                            "window.nearViewport": function () {
                                this.states.nearViewport = !0, this.trigger("nearViewport")
                            },
                            "window.scrollOffViewport": function () {
                                this.states.inViewport = !1, this.states.nearViewport = !1, this.trigger("scrollOffViewport")
                            },
                            "window.resize": this.resize,
                            "indicator:click": this.handleRealtimeClick,
                            "!auth:success": function (a) {
                                a && (a.sessionId && DISQUS.api.headers({
                                    "X-Sessionid": a.sessionId
                                }), a.message && this.alert(a.message, {
                                    type: "info"
                                }), a.logEvent && this.trigger("uiAction:" + a.logEvent)), this.fetchSession()
                            },
                            "!audiencesync:grant": function () {
                                this.session.set("audienceSyncVerified", !0)
                            }
                        })
                    }),
                    isLinkAffiliatorEnabled: function () {
                        return this.switches.enabled("enable_link_affiliation") && f.extract(this, "initialData.forum.settings.linkAffiliationEnabled") && !this.isHttps() && this.isPublisherIdValid()
                    },
                    isPublisherIdValid: function () {
                        var a = f.extract(this, "initialData.forum.pk");
                        return _.isNumber(a)
                    },
                    initLinkAffiliator: function () {
                        if (this.isLinkAffiliatorEnabled() && !this.initLinkAffiliatorCalled) {
                            this.initLinkAffiliatorCalled = !0;
                            var a = f.extract(this, "initialData.forum.pk"),
                                b = new F({
                                    el: document.body
                                });
                            h.once("affiliationOptions", function (a) {
                                a && _.isNumber(a.timeout) && b.trigger("options.timeout", a.timeout)
                            }), h.sendHostMessage("loadLinkAffiliator", {
                                clientUrl: DISQUS.urls.linkAffiliatorClient,
                                apiUrl: DISQUS.urls.linkAffiliatorAPI,
                                key: DISQUS.keys.viglinkAPI,
                                id: a
                            })
                        }
                    },
                    bindSessionEvents: _.once(function () {
                        this.listenTo(this.session, "change:isReadOnly", function () {
                            this.session.get("isReadOnly") && this.alert(i("The Disqus comment system is temporarily in maintenance mode. " + "You can still read comments during this time, however posting " + "comments and other actions are temporarily delayed."))
                        }), this.listenTo(this.session, "identify change:audienceSyncVerified", function () {
                            this.session.get("audienceSyncVerified") && h.sendHostMessage("session.identify", this.session.user.id)
                        }), this.listenTo(this.session, "change:discoveryVariant", this.initDiscovery)
                    }),
                    fetchSession: function () {
                        var a = {
                            thread: this.thread
                        };
                        return this.switches.enabled("discovery_next:override") && this.discoveryOverride && (a.discovery = this.discoveryOverride), this.session.fetch(a)
                    },
                    initRealtimeIndicators: function () {
                        if (!this.switches.enabled("disable_realtime_indicators") && !this.states.realtimeIndicatorsCreated) {
                            var a = {
                                contents: DISQUS.renderBlock("realtimeIndicator", {
                                    orientation: "north"
                                })
                            }, b = {
                                    contents: DISQUS.renderBlock("realtimeIndicator", {
                                        orientation: "south"
                                    })
                                };
                            h.sendHostMessage("indicator:init", {
                                north: a,
                                south: b
                            }), this.states.realtimeIndicatorsCreated = !0
                        }
                    },
                    insertStreamingComments: _.throttle(function () {
                        var a = this.thread.queue;
                        a.drain(), _.each(a.counters.replies, function (b, c) {
                            a.drain(c)
                        })
                    }, 1e3),
                    updateModeratorText: function () {
                        var a = this.forum.get("settings");
                        a.moderatorText && (DISQUS.strings.translations.Mod = a.moderatorText)
                    },
                    handleRealtimeScroll: function (a) {
                        if (this.states.inViewport && this.states.realtimeIndicatorsCreated && "conversation" === this.currentSection) {
                            var b = _.union([this.queueView], _.values(this.postsView.subViews)),
                                c = 0,
                                d = 0;
                            _.each(b, function (b) {
                                if (b && !b.getDirection && (b = b.queueView), b && !(b.options.count <= 0)) {
                                    var e = b.getDirection(a);
                                    1 === e ? c += b.options.count : e === -1 && (d += b.options.count)
                                }
                            });
                            var e, f;
                            f = {
                                type: "north"
                            }, c > 0 ? (e = "indicator:show", f.content = DISQUS.renderBlock("realtimeIndicatorText", {
                                num: c,
                                orientation: "north"
                            })) : e = "indicator:hide", h.sendHostMessage(e, f), f = {
                                type: "south"
                            }, d > 0 ? (f.content = DISQUS.renderBlock("realtimeIndicatorText", {
                                num: d,
                                orientation: "south"
                            }), e = "indicator:show") : e = "indicator:hide", h.sendHostMessage(e, f)
                        }
                    },
                    handleRealtimeClick: function (a) {
                        var b = this;
                        h.sendHostMessage("indicator:hide", {
                            type: a
                        });
                        var d, e, f, g = _.union([b], _.toArray(b.postsView.subViews));
                        g = _.filter(g, function (c) {
                            if (c = c.queueView, !c || c.options.count <= 0) return !1;
                            var d = "north" === a ? 1 : -1;
                            return c.getDirection(b.position) !== d ? !1 : !0
                        }), g = _.sortBy(g, function (a) {
                            return a === b ? 0 : a.offset.top
                        }), d = "north" === a ? _.last(g) : _.first(g), e = d.queueView, d === b ? (f = 0, e.handleDrain()) : (f = d.offset.top - 100, e.handleDrain()), c.getLounge().once("domReflow", _.bind(h.sendHostMessage, h, "scrollTo", {
                            top: f
                        }))
                    },
                    toggleRealtimeNotifications: function () {
                        var a = this,
                            b = a.thread.queue;
                        a.updateDom(function () {
                            if (_.defer(function () {
                                h.sendHostMessage("fakeScroll")
                            }), !b.length) return void $("[data-role=realtime-notification]").hide();
                            if (a.thread.get("hasStreaming")) return void a.insertStreamingComments();
                            if (b.counters.comments) {
                                var c = a.queueView || new B({
                                    model: a.thread,
                                    el: a.$el.find("button[data-role=realtime-notification]")
                                });
                                a.queueView = c, c.setCount(b.counters.comments), c.render()
                            }
                            _.each(b.counters.replies, function (b, c) {
                                var d = a.thread.posts.get(c);
                                if (d) {
                                    var e = a.postsView.getPostView(d.cid);
                                    if (e) {
                                        var f = e.queueView;
                                        f || (f = new C({
                                            thread: a.thread,
                                            postView: e,
                                            model: d,
                                            el: e.$el.find("[data-role=realtime-notification\\:" + c + "] a")
                                        }), e.queueView = f), f.setCount(b), f.render()
                                    }
                                }
                            })
                        })
                    },
                    renderDebugInfo: t(function () {
                        if (this.session.user.get("isGlobalAdmin")) {
                            for (var a = [], b = 0, c = this.switches.models.length; c > b; b++) this.switches.models[b].attributes.enabled && a.push(this.switches.models[b].id);
                            var d = new D({
                                Shortname: this.thread.get("forum"),
                                "Thread ID": this.thread.get("id"),
                                "Thread slug": this.thread.get("slug"),
                                "Anchor color": f.escapeColor(this.config.anchorColor),
                                Switches: a.join(", ")
                            });
                            d.render(), this.updateDom(function () {
                                var a = document.body;
                                a.insertBefore(d.el, a.firstChild)
                            })
                        }
                    }),
                    repairThread: t(function () {
                        this.session.user.get("isGlobalAdmin") && DISQUS.api.call("internal/threads/repair.json", {
                            method: "GET",
                            data: {
                                thread: this.thread.get("id")
                            },
                            success: _.bind(this.alert, this, "Thread repair has been queued. Refresh in a few seconds."),
                            error: _.bind(this.alert, this, "An error occurred while repairing thread. Please try again.", "error")
                        })
                    }),
                    getPermalinkOptions: function (a) {
                        var b = a && a.match(/(comment|reply|edit)\-([0-9]+)/);
                        if (b) return {
                            postId: b[2],
                            options: {
                                highlight: !0,
                                openReply: "reply" === b[1],
                                openEdit: "edit" === b[1]
                            }
                        }
                    },
                    scrollToPost: function (a, b) {
                        b = b || {};
                        var c = this;
                        "conversation" !== c.currentSection && (b.force = !0), c.mainNav.navTo("conversation");
                        var e = c.$el.find("#post-" + a);
                        return e.length ? (b.highlight && (c.$el.find(".post-content.target").removeClass("target"), e.find(".post-content").first().addClass("target")), b.openReply && c.postsView.openReply(a), b.openEdit && c.postsView.openEdit(a), h.sendHostMessage("scrollTo", {
                            top: e.offset().top + (b.padding || 0),
                            force: b.force || null
                        }), void 0) : (DISQUS.api.call("posts/getContext.json", {
                            method: "GET",
                            data: {
                                post: a
                            },
                            success: function (e) {
                                var f = _.filter(e.response, function (a) {
                                    return a.thread === c.thread.get("id")
                                });
                                0 !== f.length && (_.each(f, function (a) {
                                    a = new d.UniqueModel(d.Post, a), a.requestedByPermalink = !0, c.thread.posts.add(a)
                                }), h.once("embed.resized", _.bind(c.scrollToPost, c, a, b)))
                            }
                        }), void 0)
                    },
                    updateThreadSessionData: function (a) {
                        if (a) {
                            a.get("thread") && this.thread.set(a.get("thread"));
                            var b = a.get("votes");
                            b && "object" == typeof b && _.each(b, function (a, b) {
                                var c = this.postsView.posts.get(b);
                                c && c.set("userScore", a)
                            }, this)
                        }
                    },
                    initDashboard: function () {
                        var a = $("#main-nav [data-nav=dashboard]");
                        return this.session.isAnonymous() ? a.hide() : (a.show(), this.notificationCount = new c.NotificationCountView({
                            el: a.find("[data-role=notification-count]")[0],
                            session: this.session,
                            max: 99
                        }), this.notificationCount.render(), this.listenTo(this.session, "change:notificationCount", function () {
                            this.session.get("notificationCount") <= 0 && this.notificationCount.remove()
                        }), this.dashboard = new m.DashboardView({
                            el: "#dashboard",
                            session: this.session,
                            notifications: this.notifications
                        }), this.dashboard.render(), void 0)
                    },
                    initCommunity: function () {
                        this.community = new n.CommunityView({
                            el: document.getElementById("community"),
                            forum: this.forum
                        })
                    },
                    initUserMenu: function () {
                        var a = this.userMenu = new z({
                            el: this.$el.find("[data-role=logout]")[0],
                            session: this.session,
                            thread: this.thread,
                            referrerUrl: this.config.referrer
                        });
                        this.listenTo(this.thread, "change:isClosed", this.render), a.render()
                    },
                    initThreadShareMenu: function () {
                        this.threadShareMenu = new w({
                            el: $("#thread-share-menu")[0],
                            model: this.thread
                        })
                    },
                    initDiscovery: function (a, b) {
                        function c() {
                            var c = DISQUS.discovery.init(_.extend({}, b, {
                                sourceThread: d.initialData.thread,
                                sourceForum: d.initialData.forum,
                                containerId: "discovery",
                                session: a,
                                sourceThreadUrl: d.thread.currentUrl || document.referrer,
                                position: d.getPosition()
                            }));
                            d.listenTo(c, "resize", d.updateDom)
                        }
                        var d = this;
                        if (!d.states.initDiscoveryCalled && (d.states.initDiscoveryCalled = !0, !d.isFullscreen)) return b ? (curl(["css!styles/discovery.css", "js!discovery.js"]).then(function () {
                            window.Handlebars.discovery.templates(), c()
                        }), void 0) : void DISQUS.log("Discovery seems not enabled. Check Gargoyle switches or forum settings.")
                    },
                    isHttps: function () {
                        return "https:" === window.location.protocol
                    },
                    isRealtimeEnabled: function () {
                        var a = moment.unix(this.initialData.lastModified);
                        return !this.thread.get("isClosed") && (this.switches.enabled("realtime_for_oldies") || moment().diff(a, "days") <= 7)
                    },
                    realtimeHandlers: {
                        Post: function (a) {
                            var b = a.data,
                                c = this.thread;
                            if (!this.thread.get("hasStreaming") || !this.states.streamingPaused) {
                                if (!b.id) return void DISQUS.logError("RT: no post ID");
                                if (!b.author || !b.author.id) return void DISQUS.logError("RT: no author or author ID");
                                if (!b.author.name) return void DISQUS.logError("RT: no author name or email hash");
                                if (!b.post || !b.post.message) return void DISQUS.logError("RT: no post message");
                                if (c.posts.get(b.id) || c.queue.get(b.id)) return void DISQUS.log("RT: duplicate: ", b.id);
                                if ("approved" !== b.type) return void DISQUS.log("RT: unnaproved: ", b.id);
                                if (b.type === b.type_prev) return void DISQUS.log("RT: Post change message, ignoring for now ", b.id);
                                this.thread.incrementPostCount(1);
                                var e = b.post.parent_post.id;
                                if (e = "0" !== e ? e : null, e && !c.posts.get(e) && !c.queue.get(e)) return void DISQUS.log("RT: parent is not on this page: ", b.id);
                                var f = b.author.id,
                                    g = c.users.get(f);
                                g || (g = new d.UniqueModel(d.User, {
                                    id: f,
                                    name: b.author.name,
                                    isAnonymous: "0" === b.author.id
                                }), b.author.avatar && g.set("avatar", {
                                    cache: b.author.avatar,
                                    permalink: b.author.avatar
                                }), c.users.add(g)), c.queue.add({
                                    id: b.id,
                                    userId: g.get("id"),
                                    parentId: e,
                                    message: b.post.message,
                                    createdAt: b.date
                                })
                            }
                        },
                        Vote: function (a) {
                            var b = a.data;
                            if (b.id && b.vote) {
                                var c = this.thread,
                                    e = c.posts.get(b.vote.recipient_post_id);