function Swipe(e, t) {
    "use strict";

    function c() {
        o = s.children, u = new Array(o.length), a = e.getBoundingClientRect().width || e.offsetWidth, s.style.width = o.length * a + "px";
        var t = o.length;
        while (t--) {
            var n = o[t];
            n.style.width = a + "px", n.setAttribute("data-index", t), i.transitions && (n.style.left = t * -a + "px", v(t, f > t ? -a : f < t ? a : 0, 0))
        }
        i.transitions || (s.style.left = f * -a + "px"), e.style.visibility = "visible"
    }

    function h() {
        f ? d(f - 1) : t.continuous && d(o.length - 1)
    }

    function p() {
        f < o.length - 1 ? d(f + 1) : t.continuous && d(0)
    }

    function d(e, n) {
        if (f == e) return;
        if (i.transitions) {
            var s = Math.abs(f - e) - 1,
                u = Math.abs(f - e) / (f - e);
            while (s--) v((e > f ? e : f) - s - 1, a * u, 0);
            v(f, a * u, n || l), v(e, 0, n || l)
        } else g(f * -a, e * -a, n || l);
        f = e, r(t.callback && t.callback(f, o[f]))
    }

    function v(e, t, n) {
        m(e, t, n), u[e] = t
    }

    function m(e, t, n) {
        var r = o[e],
            i = r && r.style;
        if (!i) return;
        i.webkitTransitionDuration = i.MozTransitionDuration = i.msTransitionDuration = i.OTransitionDuration = i.transitionDuration = n + "ms", i.webkitTransform = "translate(" + t + "px,0)" + "translateZ(0)", i.msTransform = i.MozTransform = i.OTransform = "translateX(" + t + "px)"
    }

    function g(e, n, r) {
        if (!r) {
            s.style.left = n + "px";
            return
        }
        var i = +(new Date),
            u = setInterval(function() {
                var a = +(new Date) - i;
                if (a > r) {
                    s.style.left = n + "px", y && w(), t.transitionEnd && t.transitionEnd.call(event, f, o[f]), clearInterval(u);
                    return
                }
                s.style.left = (n - e) * (Math.floor(a / r * 100) / 100) + e + "px"
            }, 4)
    }

    function w() {
        b = setTimeout(p, y)
    }

    function E() {
        y = 0, clearTimeout(b)
    }
    var n = function() {},
        r = function(e) {
            setTimeout(e || n, 0)
        },
        i = {
            addEventListener: !!window.addEventListener,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: function(e) {
                var t = ["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"];
                for (var n in t)
                    if (e.style[t[n]] !== undefined) return !0;
                return !1
            }(document.createElement("swipe"))
        };
    if (!e) return;
    var s = e.children[0],
        o, u, a;
    t = t || {};
    var f = parseInt(t.startSlide, 10) || 0,
        l = t.speed || 300;
    t.continuous = t.continuous ? t.continuous : !0;
    var y = t.auto || 0,
        b, S = {},
        x = {},
        T, N = {
            handleEvent: function(e) {
                switch (e.type) {
                    case "touchstart":
                        this.start(e);
                        break;
                    case "touchmove":
                        this.move(e);
                        break;
                    case "touchend":
                        r(this.end(e));
                        break;
                    case "webkitTransitionEnd":
                    case "msTransitionEnd":
                    case "oTransitionEnd":
                    case "otransitionend":
                    case "transitionend":
                        r(this.transitionEnd(e));
                        break;
                    case "resize":
                        r(c.call())
                }
                t.stopPropagation && e.stopPropagation()
            },
            start: function(e) {
                var t = e.touches[0];
                S = {
                    x: t.pageX,
                    y: t.pageY,
                    time: +(new Date)
                }, T = undefined, x = {}, s.addEventListener("touchmove", this, !1), s.addEventListener("touchend", this, !1)
            },
            move: function(e) {
                if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
                t.disableScroll && e.preventDefault();
                var n = e.touches[0];
                x = {
                    x: n.pageX - S.x,
                    y: n.pageY - S.y
                }, typeof T == "undefined" && (T = !!(T || Math.abs(x.x) < Math.abs(x.y))), T || (e.preventDefault(), E(), x.x = x.x / (!f && x.x > 0 || f == o.length - 1 && x.x < 0 ? Math.abs(x.x) / a + 1 : 1), m(f - 1, x.x + u[f - 1], 0), m(f, x.x + u[f], 0), m(f + 1, x.x + u[f + 1], 0))
            },
            end: function(e) {
                var n = +(new Date) - S.time,
                    r = Number(n) < 250 && Math.abs(x.x) > 20 || Math.abs(x.x) > a / 2,
                    i = !f && x.x > 0 || f == o.length - 1 && x.x < 0,
                    c = x.x < 0;
                T || (r && !i ? (c ? (v(f - 1, -a, 0), v(f, u[f] - a, l), v(f + 1, u[f + 1] - a, l), f += 1) : (v(f + 1, a, 0), v(f, u[f] + a, l), v(f - 1, u[f - 1] + a, l), f += -1), t.callback && t.callback(f, o[f])) : (v(f - 1, -a, l), v(f, 0, l), v(f + 1, a, l))), s.removeEventListener("touchmove", N, !1), s.removeEventListener("touchend", N, !1)
            },
            transitionEnd: function(e) {
                parseInt(e.target.getAttribute("data-index"), 10) == f && (y && w(), t.transitionEnd && t.transitionEnd.call(e, f, o[f]))
            }
        };
    return c(), y && w(), i.addEventListener ? (i.touch && s.addEventListener("touchstart", N, !1), i.transitions && (s.addEventListener("webkitTransitionEnd", N, !1), s.addEventListener("msTransitionEnd", N, !1), s.addEventListener("oTransitionEnd", N, !1), s.addEventListener("otransitionend", N, !1), s.addEventListener("transitionend", N, !1)), window.addEventListener("resize", N, !1)) : window.onresize = function() {
        c()
    }, {
        setup: function() {
            c()
        },
        slide: function(e, t) {
            d(e, t)
        },
        prev: function() {
            E(), h()
        },
        next: function() {
            E(), p()
        },
        getPos: function() {
            return f
        },
        kill: function() {
            E(), s.style.width = "auto", s.style.left = 0;
            var e = o.length;
            while (e--) {
                var t = o[e];
                t.style.width = "100%", t.style.left = 0, i.transitions && m(e, 0, 0)
            }
            i.addEventListener ? (s.removeEventListener("touchstart", N, !1), s.removeEventListener("webkitTransitionEnd", N, !1), s.removeEventListener("msTransitionEnd", N, !1), s.removeEventListener("oTransitionEnd", N, !1), s.removeEventListener("otransitionend", N, !1), s.removeEventListener("transitionend", N, !1), window.removeEventListener("resize", N, !1)) : window.onresize = null
        }
    }
}(window.jQuery || window.Zepto) && function(e) {
    e.fn.Swipe = function(t) {
        return this.each(function() {
            e(this).data("Swipe", new Swipe(e(this)[0], t))
        })
    }
}(window.jQuery || window.Zepto)

//轮播效果，上面代码也是轮播的，下面的是可变参数的
$(document).ready(function() {
        var bullets = document.getElementById('yyg-position').getElementsByTagName('li');
        var banner = Swipe(document.getElementById('mySwipe'), {
            auto: 2000,
            continuous: true,
            disableScroll: false,
            callback: function(pos) {
                var i = bullets.length;
                while (i--) {
                    bullets[i].className = ' ';
                }
                bullets[pos].className = 'cur';
            }
        });
    })

//首页的底部点击效果
$(document).ready(function(){
	 $(".homeFootNav ul li a").bind("click",function(){
            $('a').removeClass('yyg-homeSelected');
            $(this).addClass('yyg-homeSelected');
        })
})
