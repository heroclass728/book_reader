this.ol = function (n) {
  var e = {};

  function t(a) {
    if (e[a]) return e[a].exports;
    var o = e[a] = {i: a, l: !1, exports: {}};
    return n[a].call(o.exports, o, o.exports, t), o.l = !0, o.exports
  }

  return t.m = n, t.c = e, t.d = function (n, e, a) {
    t.o(n, e) || Object.defineProperty(n, e, {enumerable: !0, get: a})
  }, t.r = function (n) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
  }, t.t = function (n, e) {
    if (1 & e && (n = t(n)), 8 & e) return n;
    if (4 & e && "object" == typeof n && n && n.__esModule) return n;
    var a = Object.create(null);
    if (t.r(a), Object.defineProperty(a, "default", {
      enumerable: !0,
      value: n
    }), 2 & e && "string" != typeof n) for (var o in n) t.d(a, o, function (e) {
      return n[e]
    }.bind(null, o));
    return a
  }, t.n = function (n) {
    var e = n && n.__esModule ? function () {
      return n.default
    } : function () {
      return n
    };
    return t.d(e, "a", e), e
  }, t.o = function (n, e) {
    return Object.prototype.hasOwnProperty.call(n, e)
  }, t.p = "", t(t.s = 6)
}([function (module, __webpack_exports__, __webpack_require__) {
  "use strict";

  function _typeof(n) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
      return typeof n
    } : function (n) {
      return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    })(n)
  }

  function plot_tooltip_graph(n, e, t) {
    for (var a = 0; a < e.length; ++a) e[a][0] += 36e5;
    $.plot(n, [e], {
      series: {
        bars: {
          show: !0,
          fill: 1,
          fillColor: "#748d36",
          color: "#748d36",
          align: "left",
          barWidth: 864e5
        }, points: {show: !1}, color: "#748d36"
      }, grid: {hoverable: !0, show: !1}, xaxis: {mode: "time"}
    });
    n.bind("plothover", function (n, e, a) {
      if ($("#x").text(e.x), $("#y").text(e.y.toFixed(0)), a) {
        $("#chartLabelA").remove();
        var o = a.datapoint[0], i = new Date(o).toDateString(), r = a.datapoint[1].toFixed(0);
        !function (n, e, t) {
          $('<div id="chartLabelA">' + t + "</div>").css({
            position: "absolute",
            display: "none",
            top: e + 12,
            left: n + 12,
            border: "1px solid #ccc",
            padding: "2px",
            backgroundColor: "#efefef",
            color: "#454545",
            fontSize: "11px",
            webkitBoxShadow: "1px 1px 3px #333",
            mozBoxShadow: "1px 1px 1px #000",
            boxShadow: "1px 1px 1px #000"
          }).appendTo("body").fadeIn(200)
        }(a.pageX, a.pageY, r + " " + t + " " + i)
      } else $("#chartLabelA").remove()
    })
  }

  function plot_minigraph(n, e) {
    $.plot(n, [e], {
      series: {lines: {show: !0, fill: 0, color: "#748d36"}, points: {show: !1}, color: "#748d36"},
      grid: {hoverable: !1, show: !1}
    })
  }

  __webpack_require__.d(__webpack_exports__, "b", function () {
    return plot_tooltip_graph
  }), __webpack_require__.d(__webpack_exports__, "a", function () {
    return plot_minigraph
  }), function (n) {
    var e = n.scrollTo = function (e, t, a) {
      n(window).scrollTo(e, t, a)
    };

    function t(n) {
      return "object" == _typeof(n) ? n : {top: n, left: n}
    }

    e.defaults = {axis: "xy", duration: parseFloat(n.fn.jquery) >= 1.3 ? 0 : 1}, e.window = function (e) {
      return n(window)._scrollable()
    }, n.fn._scrollable = function () {
      return this.map(function () {
        var e = this;
        if (!(!e.nodeName || -1 != n.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]))) return e;
        var t = (e.contentWindow || e).document || e.ownerDocument || e;
        return n.browser.safari || "BackCompat" == t.compatMode ? t.body : t.documentElement
      })
    }, n.fn.scrollTo = function (a, o, i) {
      return "object" == _typeof(o) && (i = o, o = 0), "function" == typeof i && (i = {onAfter: i}), "max" == a && (a = 9e9), i = n.extend({}, e.defaults, i), o = o || i.speed || i.duration, i.queue = i.queue && i.axis.length > 1, i.queue && (o /= 2), i.offset = t(i.offset), i.over = t(i.over), this._scrollable().each(function () {
        var r, s = this, l = n(s), d = a, c = {}, u = l.is("html,body");
        switch (_typeof(d)) {
          case"number":
          case"string":
            if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(d)) {
              d = t(d);
              break
            }
            d = n(d, this);
          case"object":
            (d.is || d.style) && (r = (d = n(d)).offset())
        }

        function p(n) {
          l.animate(c, o, i.easing, n && function () {
            n.call(this, a, i)
          })
        }

        n.each(i.axis.split(""), function (n, t) {
          var a = "x" == t ? "Left" : "Top", o = a.toLowerCase(), f = "scroll" + a, h = s[f], g = e.max(s, t);
          if (r) c[f] = r[o] + (u ? 0 : h - l.offset()[o]), i.margin && (c[f] -= parseInt(d.css("margin" + a)) || 0, c[f] -= parseInt(d.css("border" + a + "Width")) || 0), c[f] += i.offset[o] || 0, i.over[o] && (c[f] += d["x" == t ? "width" : "height"]() * i.over[o]); else {
            var b = d[o];
            c[f] = b.slice && "%" == b.slice(-1) ? parseFloat(b) / 100 * g : b
          }
          /^\d+$/.test(c[f]) && (c[f] = c[f] <= 0 ? 0 : Math.min(c[f], g)), !n && i.queue && (h != c[f] && p(i.onAfterFirst), delete c[f])
        }), p(i.onAfter)
      }).end()
    }, e.max = function (e, t) {
      var a = "x" == t ? "Width" : "Height", o = "scroll" + a;
      if (!n(e).is("html,body")) return e[o] - n(e)[a.toLowerCase()]();
      var i = "client" + a, r = e.ownerDocument.documentElement, s = e.ownerDocument.body;
      return Math.max(r[o], s[o]) - Math.min(r[i], s[i])
    }
  }(jQuery), function (n) {
    n.fn.hoverIntent = function (e, t) {
      var a, o, i, r, s = {sensitivity: 7, interval: 100, timeout: 0};
      s = n.extend(s, t ? {over: e, out: t} : e);
      var l = function (n) {
        a = n.pageX, o = n.pageY
      }, d = function (e) {
        if (-1 == n.fn.dataTableExt.oPagination.iPagingLoopStart || null == n.fn.dataTableExt.oPagination.iPagingLoopStart) {
          for (var t = ("mouseover" == e.type ? e.fromElement : e.toElement) || e.relatedTarget; t && t != this;) try {
            t = t.parentNode
          } catch (e) {
            t = this
          }
          if (t == this) return !1;
          var d = jQuery.extend({}, e), c = this;
          c.hoverIntent_t && (c.hoverIntent_t = clearTimeout(c.hoverIntent_t)), "mouseover" == e.type ? (i = d.pageX, r = d.pageY, n(c).bind("mousemove", l), 1 != c.hoverIntent_s && (c.hoverIntent_t = setTimeout(function () {
            !function e(t, d) {
              if (d.hoverIntent_t = clearTimeout(d.hoverIntent_t), Math.abs(i - a) + Math.abs(r - o) < s.sensitivity) return n(d).unbind("mousemove", l), d.hoverIntent_s = 1, s.over.apply(d, [t]);
              i = a, r = o, d.hoverIntent_t = setTimeout(function () {
                e(t, d)
              }, s.interval)
            }(d, c)
          }, s.interval))) : (n(c).unbind("mousemove", l), 1 == c.hoverIntent_s && (c.hoverIntent_t = setTimeout(function () {
            !function (n, e) {
              e.hoverIntent_t = clearTimeout(e.hoverIntent_t), e.hoverIntent_s = 0, s.out.apply(e, [n])
            }(d, c)
          }, s.timeout)))
        }
      };
      return this.mouseover(d).mouseout(d)
    }
  }(jQuery), function ($) {
    $.fn.dataTableSettings = [];
    var _aoSettings = $.fn.dataTableSettings;
    $.fn.dataTableExt = {};
    var _oExt = $.fn.dataTableExt;
    _oExt.sVersion = "1.6.2", _oExt.iApiIndex = 0, _oExt.oApi = {}, _oExt.afnFiltering = [], _oExt.aoFeatures = [], _oExt.ofnSearch = {}, _oExt.afnSortData = [], _oExt.oStdClasses = {
      sPagePrevEnabled: "paginate_enabled_previous",
      sPagePrevDisabled: "paginate_disabled_previous",
      sPageNextEnabled: "paginate_enabled_next",
      sPageNextDisabled: "paginate_disabled_next",
      sPageJUINext: "",
      sPageJUIPrev: "",
      sPageButton: "paginate_button",
      sPageButtonActive: "paginate_active",
      sPageButtonStaticDisabled: "paginate_button",
      sPageFirst: "first",
      sPagePrevious: "previous",
      sPageNext: "next",
      sPageLast: "last",
      sStripOdd: "odd",
      sStripEven: "even",
      sRowEmpty: "dataTables_empty",
      sWrapper: "dataTables_wrapper",
      sFilter: "dataTables_filter",
      sInfo: "dataTables_info",
      sPaging: "dataTables_paginate paging_",
      sLength: "dataTables_length",
      sProcessing: "dataTables_processing",
      sSortAsc: "sorting_asc",
      sSortDesc: "sorting_desc",
      sSortable: "sorting",
      sSortableAsc: "sorting_asc_disabled",
      sSortableDesc: "sorting_desc_disabled",
      sSortableNone: "sorting_disabled",
      sSortColumn: "sorting_",
      sSortJUIAsc: "",
      sSortJUIDesc: "",
      sSortJUI: "",
      sSortJUIAscAllowed: "",
      sSortJUIDescAllowed: ""
    }, _oExt.oJUIClasses = {
      sPagePrevEnabled: "fg-button ui-state-default ui-corner-left",
      sPagePrevDisabled: "fg-button ui-state-default ui-corner-left ui-state-disabled",
      sPageNextEnabled: "fg-button ui-state-default ui-corner-right",
      sPageNextDisabled: "fg-button ui-state-default ui-corner-right ui-state-disabled",
      sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
      sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
      sPageButton: "fg-button ui-state-default",
      sPageButtonActive: "fg-button ui-state-default ui-state-disabled",
      sPageButtonStaticDisabled: "fg-button ui-state-default ui-state-disabled",
      sPageFirst: "first ui-corner-tl ui-corner-bl",
      sPagePrevious: "previous",
      sPageNext: "next",
      sPageLast: "last ui-corner-tr ui-corner-br",
      sStripOdd: "odd",
      sStripEven: "even",
      sRowEmpty: "dataTables_empty",
      sWrapper: "dataTables_wrapper",
      sFilter: "dataTables_filter",
      sInfo: "dataTables_info",
      sPaging: "dataTables_paginate fg-buttonset fg-buttonset-multi paging_",
      sLength: "dataTables_length",
      sProcessing: "dataTables_processing",
      sSortAsc: "ui-state-default",
      sSortDesc: "ui-state-default",
      sSortable: "ui-state-default",
      sSortableAsc: "ui-state-default",
      sSortableDesc: "ui-state-default",
      sSortableNone: "ui-state-default",
      sSortColumn: "sorting_",
      sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
      sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
      sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
      sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
      sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s"
    }, _oExt.oPagination = {
      two_button: {
        fnInit: function (n, e, t) {
          var a, o, i, r;
          n.bJUI ? (a = document.createElement("a"), o = document.createElement("a"), (r = document.createElement("span")).className = n.oClasses.sPageJUINext, o.appendChild(r), (i = document.createElement("span")).className = n.oClasses.sPageJUIPrev, a.appendChild(i)) : (a = document.createElement("div"), o = document.createElement("div")), a.className = n.oClasses.sPagePrevDisabled, o.className = n.oClasses.sPageNextDisabled, a.title = n.oLanguage.oPaginate.sPrevious, o.title = n.oLanguage.oPaginate.sNext, e.appendChild(a), e.appendChild(o), $(a).click(function () {
            n.oApi._fnPageChange(n, "previous") && t(n)
          }), $(o).click(function () {
            n.oApi._fnPageChange(n, "next") && t(n)
          }), $(a).bind("selectstart", function () {
            return !1
          }), $(o).bind("selectstart", function () {
            return !1
          }), "" !== n.sTableId && void 0 === n.aanFeatures.p && (e.setAttribute("id", n.sTableId + "_paginate"), a.setAttribute("id", n.sTableId + "_previous"), o.setAttribute("id", n.sTableId + "_next"))
        }, fnUpdate: function (n, e) {
          if (n.aanFeatures.p) for (var t = n.aanFeatures.p, a = 0, o = t.length; a < o; a++) 0 !== t[a].childNodes.length && (t[a].childNodes[0].className = 0 === n._iDisplayStart ? n.oClasses.sPagePrevDisabled : n.oClasses.sPagePrevEnabled, t[a].childNodes[1].className = n.fnDisplayEnd() == n.fnRecordsDisplay() ? n.oClasses.sPageNextDisabled : n.oClasses.sPageNextEnabled)
        }
      }, iFullNumbersShowPages: 5, full_numbers: {
        fnInit: function (n, e, t) {
          var a = document.createElement("span"), o = document.createElement("span"),
            i = document.createElement("span"), r = document.createElement("span"), s = document.createElement("span");
          a.innerHTML = n.oLanguage.oPaginate.sFirst, o.innerHTML = n.oLanguage.oPaginate.sPrevious, r.innerHTML = n.oLanguage.oPaginate.sNext, s.innerHTML = n.oLanguage.oPaginate.sLast;
          var l = n.oClasses;
          a.className = l.sPageButton + " " + l.sPageFirst, o.className = l.sPageButton + " " + l.sPagePrevious, r.className = l.sPageButton + " " + l.sPageNext, s.className = l.sPageButton + " " + l.sPageLast, e.appendChild(a), e.appendChild(o), e.appendChild(i), e.appendChild(r), e.appendChild(s), $(a).click(function () {
            n.oApi._fnPageChange(n, "first") && t(n)
          }), $(o).click(function () {
            n.oApi._fnPageChange(n, "previous") && t(n)
          }), $(r).click(function () {
            n.oApi._fnPageChange(n, "next") && t(n)
          }), $(s).click(function () {
            n.oApi._fnPageChange(n, "last") && t(n)
          }), $("span", e).bind("mousedown", function () {
            return !1
          }).bind("selectstart", function () {
            return !1
          }), "" !== n.sTableId && void 0 === n.aanFeatures.p && (e.setAttribute("id", n.sTableId + "_paginate"), a.setAttribute("id", n.sTableId + "_first"), o.setAttribute("id", n.sTableId + "_previous"), r.setAttribute("id", n.sTableId + "_next"), s.setAttribute("id", n.sTableId + "_last"))
        }, fnUpdate: function (n, e) {
          if (n.aanFeatures.p) {
            var t, a, o, i, r = _oExt.oPagination.iFullNumbersShowPages, s = Math.floor(r / 2),
              l = Math.ceil(n.fnRecordsDisplay() / n._iDisplayLength),
              d = Math.ceil(n._iDisplayStart / n._iDisplayLength) + 1, c = "", u = n.oClasses;
            for (l < r ? (t = 1, a = l) : d <= s ? (t = 1, a = r) : d >= l - s ? (t = l - r + 1, a = l) : a = (t = d - Math.ceil(r / 2) + 1) + r - 1, o = t; o <= a; o++) c += d != o ? '<span class="' + u.sPageButton + '">' + o + "</span>" : '<span class="' + u.sPageButtonActive + '">' + o + "</span>";
            var p, f, h, g = n.aanFeatures.p, b = function () {
              var t = 1 * this.innerHTML - 1;
              return n._iDisplayStart = t * n._iDisplayLength, e(n), !1
            }, m = function () {
              return !1
            };
            for (o = 0, i = g.length; o < i; o++) 0 !== g[o].childNodes.length && ((h = g[o].childNodes[2]).innerHTML = c, $("span", h).click(b).bind("mousedown", m).bind("selectstart", m), f = [(p = g[o].getElementsByTagName("span"))[0], p[1], p[p.length - 2], p[p.length - 1]], $(f).removeClass(u.sPageButton + " " + u.sPageButtonActive + " " + u.sPageButtonStaticDisabled), 1 == d ? (f[0].className += " " + u.sPageButtonStaticDisabled, f[1].className += " " + u.sPageButtonStaticDisabled) : (f[0].className += " " + u.sPageButton, f[1].className += " " + u.sPageButton), 0 === l || d == l || -1 == n._iDisplayLength ? (f[2].className += " " + u.sPageButtonStaticDisabled, f[3].className += " " + u.sPageButtonStaticDisabled) : (f[2].className += " " + u.sPageButton, f[3].className += " " + u.sPageButton))
          }
        }
      }
    }, _oExt.oSort = {
      "string-asc": function (n, e) {
        var t = n.toLowerCase(), a = e.toLowerCase();
        return t < a ? -1 : t > a ? 1 : 0
      }, "string-desc": function (n, e) {
        var t = n.toLowerCase(), a = e.toLowerCase();
        return t < a ? 1 : t > a ? -1 : 0
      }, "html-asc": function (n, e) {
        var t = n.replace(/<.*?>/g, "").toLowerCase(), a = e.replace(/<.*?>/g, "").toLowerCase();
        return t < a ? -1 : t > a ? 1 : 0
      }, "html-desc": function (n, e) {
        var t = n.replace(/<.*?>/g, "").toLowerCase(), a = e.replace(/<.*?>/g, "").toLowerCase();
        return t < a ? 1 : t > a ? -1 : 0
      }, "date-asc": function (n, e) {
        var t = Date.parse(n), a = Date.parse(e);
        return isNaN(t) && (t = Date.parse("01/01/1970 00:00:00")), isNaN(a) && (a = Date.parse("01/01/1970 00:00:00")), t - a
      }, "date-desc": function (n, e) {
        var t = Date.parse(n), a = Date.parse(e);
        return isNaN(t) && (t = Date.parse("01/01/1970 00:00:00")), isNaN(a) && (a = Date.parse("01/01/1970 00:00:00")), a - t
      }, "numeric-asc": function (n, e) {
        return ("-" == n ? 0 : n) - ("-" == e ? 0 : e)
      }, "numeric-desc": function (n, e) {
        return ("-" == e ? 0 : e) - ("-" == n ? 0 : n)
      }
    }, _oExt.aTypes = [function (n) {
      if ("number" == typeof n) return "numeric";
      if ("function" != typeof n.charAt) return null;
      var e, t = !1;
      if (e = n.charAt(0), -1 == "0123456789-".indexOf(e)) return null;
      for (var a = 1; a < n.length; a++) {
        if (e = n.charAt(a), -1 == "0123456789.".indexOf(e)) return null;
        if ("." == e) {
          if (t) return null;
          t = !0
        }
      }
      return "numeric"
    }, function (n) {
      var e = Date.parse(n);
      return null === e || isNaN(e) ? null : "date"
    }], _oExt._oExternConfig = {iNextUnique: 0}, $.fn.dataTable = function (oInit) {
      function classSettings() {
        this.fnRecordsTotal = function () {
          return this.oFeatures.bServerSide ? this._iRecordsTotal : this.aiDisplayMaster.length
        }, this.fnRecordsDisplay = function () {
          return this.oFeatures.bServerSide ? this._iRecordsDisplay : this.aiDisplay.length
        }, this.fnDisplayEnd = function () {
          return this.oFeatures.bServerSide ? this._iDisplayStart + this.aiDisplay.length : this._iDisplayEnd
        }, this.sInstance = null, this.oFeatures = {
          bPaginate: !0,
          bLengthChange: !0,
          bFilter: !0,
          bSort: !0,
          bInfo: !0,
          bAutoWidth: !0,
          bProcessing: !1,
          bSortClasses: !0,
          bStateSave: !1,
          bServerSide: !1
        }, this.aanFeatures = [], this.oLanguage = {
          sProcessing: "Processing...",
          sLengthMenu: "Show _MENU_ entries",
          sZeroRecords: "No matching records found",
          sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
          sInfoEmpty: "Showing 0 to 0 of 0 entries",
          sInfoFiltered: "(filtered from _MAX_ total entries)",
          sInfoPostFix: "",
          sSearch: "Search:",
          sUrl: "",
          oPaginate: {sFirst: "First", sPrevious: "Previous", sNext: "Next", sLast: "Last"}
        }, this.aoData = [], this.aiDisplay = [], this.aiDisplayMaster = [], this.aoColumns = [], this.iNextId = 0, this.asDataSearch = [], this.oPreviousSearch = {
          sSearch: "",
          bEscapeRegex: !0
        }, this.aoPreSearchCols = [], this.aaSorting = [[0, "asc", 0]], this.aaSortingFixed = null, this.asStripClasses = [], this.fnRowCallback = null, this.fnHeaderCallback = null, this.fnFooterCallback = null, this.aoDrawCallback = [], this.fnInitComplete = null, this.sTableId = "", this.nTable = null, this.iDefaultSortIndex = 0, this.bInitialised = !1, this.aoOpenRows = [], this.sDom = "lfrtip", this.sPaginationType = "two_button", this.iCookieDuration = 7200, this.sAjaxSource = null, this.bAjaxDataGet = !0, this.fnServerData = $.getJSON, this.iServerDraw = 0, this._iDisplayLength = 10, this._iDisplayStart = 0, this._iDisplayEnd = 10, this._iRecordsTotal = 0, this._iRecordsDisplay = 0, this.bJUI = !1, this.oClasses = _oExt.oStdClasses, this.bFiltered = !1, this.bSorted = !1
      }

      function _fnExternApiFunc(n) {
        return function () {
          var e = [_fnSettingsFromNode(this[_oExt.iApiIndex])].concat(Array.prototype.slice.call(arguments));
          return _oExt.oApi[n].apply(this, e)
        }
      }

      for (var sFunc in this.oApi = {}, this.fnDraw = function (n) {
        var e = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        void 0 !== n && !1 === n ? (_fnCalculateEnd(e), _fnDraw(e)) : _fnReDraw(e)
      }, this.fnFilter = function (n, e, t) {
        var a = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        void 0 === t && (t = !0), null == e ? _fnFilterComplete(a, {
          sSearch: n,
          bEscapeRegex: t
        }, 1) : (a.aoPreSearchCols[e].sSearch = n, a.aoPreSearchCols[e].bEscapeRegex = t, _fnFilterComplete(a, a.oPreviousSearch, 1))
      }, this.fnSettings = function (n) {
        return _fnSettingsFromNode(this[_oExt.iApiIndex])
      }, this.fnVersionCheck = function (n) {
        for (var e = function (n, e) {
          for (; n.length < e;) n += "0";
          return n
        }, t = _oExt.sVersion.split("."), a = n.split("."), o = "", i = "", r = 0, s = a.length; r < s; r++) o += e(t[r], 3), i += e(a[r], 3);
        return parseInt(o, 10) >= parseInt(i, 10)
      }, this.fnSort = function (n) {
        var e = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        e.aaSorting = n, _fnSort(e)
      }, this.fnSortListener = function (n, e, t) {
        _fnSortAttachListener(_fnSettingsFromNode(this[_oExt.iApiIndex]), n, e, t)
      }, this.fnAddData = function (n, e) {
        if (0 === n.length) return [];
        var t, a = [], o = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        if ("object" == _typeof(n[0])) for (var i = 0; i < n.length; i++) {
          if (-1 == (t = _fnAddData(o, n[i]))) return a;
          a.push(t)
        } else {
          if (-1 == (t = _fnAddData(o, n))) return a;
          a.push(t)
        }
        return o.aiDisplay = o.aiDisplayMaster.slice(), _fnBuildSearchArray(o, 1), (void 0 === e || e) && _fnReDraw(o), a
      }, this.fnDeleteRow = function (n, e, t) {
        var a, o, i = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        for (o = "object" == _typeof(n) ? _fnNodeToDataIndex(i, n) : n, a = 0; a < i.aiDisplayMaster.length; a++) if (i.aiDisplayMaster[a] == o) {
          i.aiDisplayMaster.splice(a, 1);
          break
        }
        for (a = 0; a < i.aiDisplay.length; a++) if (i.aiDisplay[a] == o) {
          i.aiDisplay.splice(a, 1);
          break
        }
        _fnBuildSearchArray(i, 1), "function" == typeof e && e.call(this), i._iDisplayStart >= i.aiDisplay.length && (i._iDisplayStart -= i._iDisplayLength, i._iDisplayStart < 0 && (i._iDisplayStart = 0)), _fnCalculateEnd(i), _fnDraw(i);
        var r = i.aoData[o]._aData.slice();
        return void 0 !== t && !0 === t && (i.aoData[o] = null), r
      }, this.fnClearTable = function (n) {
        var e = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        _fnClearTable(e), (void 0 === n || n) && _fnDraw(e)
      }, this.fnOpen = function (n, e, t) {
        var a = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        this.fnClose(n);
        var o = document.createElement("tr"), i = document.createElement("td");
        o.appendChild(i), i.className = t, i.colSpan = _fnVisbleColumns(a), i.innerHTML = e;
        var r = $("tbody tr", a.nTable);
        return -1 != $.inArray(n, r) && $(o).insertAfter(n), a.oFeatures.bServerSide || a.aoOpenRows.push({
          nTr: o,
          nParent: n
        }), o
      }, this.fnClose = function (n) {
        for (var e = _fnSettingsFromNode(this[_oExt.iApiIndex]), t = 0; t < e.aoOpenRows.length; t++) if (e.aoOpenRows[t].nParent == n) {
          var a = e.aoOpenRows[t].nTr.parentNode;
          return a && a.removeChild(e.aoOpenRows[t].nTr), e.aoOpenRows.splice(t, 1), 0
        }
        return 1
      }, this.fnGetData = function (n) {
        var e = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        if (void 0 !== n) {
          var t = "object" == _typeof(n) ? _fnNodeToDataIndex(e, n) : n;
          return e.aoData[t]._aData
        }
        return _fnGetDataMaster(e)
      }, this.fnGetNodes = function (n) {
        var e = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        return void 0 !== n ? e.aoData[n].nTr : _fnGetTrNodes(e)
      }, this.fnGetPosition = function (n) {
        var e = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        if ("TR" == n.nodeName) return _fnNodeToDataIndex(e, n);
        if ("TD" == n.nodeName) for (var t = _fnNodeToDataIndex(e, n.parentNode), a = 0, o = 0; o < e.aoColumns.length; o++) if (e.aoColumns[o].bVisible) {
          if (e.aoData[t].nTr.getElementsByTagName("td")[o - a] == n) return [t, o - a, o]
        } else a++;
        return null
      }, this.fnUpdate = function (n, e, t, a) {
        var o, i, r = _fnSettingsFromNode(this[_oExt.iApiIndex]),
          s = "object" == _typeof(e) ? _fnNodeToDataIndex(r, e) : e;
        if ("object" != _typeof(n)) i = n, r.aoData[s]._aData[t] = i, null !== r.aoColumns[t].fnRender && (i = r.aoColumns[t].fnRender({
          iDataRow: s,
          iDataColumn: t,
          aData: r.aoData[s]._aData,
          oSettings: r
        }), r.aoColumns[t].bUseRendered && (r.aoData[s]._aData[t] = i)), null !== (o = _fnColumnIndexToVisible(r, t)) && (r.aoData[s].nTr.getElementsByTagName("td")[o].innerHTML = i); else {
          if (n.length != r.aoColumns.length) return alert("DataTables warning: An array passed to fnUpdate must have the same number of columns as the table in question - in this case " + r.aoColumns.length), 1;
          for (var l = 0; l < n.length; l++) i = n[l], r.aoData[s]._aData[l] = i, null !== r.aoColumns[l].fnRender && (i = r.aoColumns[l].fnRender({
            iDataRow: s,
            iDataColumn: l,
            aData: r.aoData[s]._aData,
            oSettings: r
          }), r.aoColumns[l].bUseRendered && (r.aoData[s]._aData[l] = i)), null !== (o = _fnColumnIndexToVisible(r, l)) && (r.aoData[s].nTr.getElementsByTagName("td")[o].innerHTML = i)
        }
        return _fnBuildSearchArray(r, 1), void 0 !== a && a && _fnReDraw(r), 0
      }, this.fnSetColumnVis = function (n, e) {
        var t, a, o, i, r = _fnSettingsFromNode(this[_oExt.iApiIndex]), s = r.aoColumns.length;
        if (r.aoColumns[n].bVisible != e) {
          var l = $("thead:eq(0)>tr", r.nTable)[0], d = $("tfoot:eq(0)>tr", r.nTable)[0], c = [], u = [];
          for (t = 0; t < s; t++) c.push(r.aoColumns[t].nTh), u.push(r.aoColumns[t].nTf);
          if (e) {
            var p = 0;
            for (t = 0; t < n; t++) r.aoColumns[t].bVisible && p++;
            if (p >= _fnVisbleColumns(r)) for (l.appendChild(c[n]), d && d.appendChild(u[n]), t = 0, a = r.aoData.length; t < a; t++) o = r.aoData[t]._anHidden[n], r.aoData[t].nTr.appendChild(o); else {
              var f;
              for (t = n; t < s && null === (f = _fnColumnIndexToVisible(r, t)); t++) ;
              for (l.insertBefore(c[n], l.getElementsByTagName("th")[f]), d && d.insertBefore(u[n], d.getElementsByTagName("th")[f]), i = _fnGetTdNodes(r), t = 0, a = r.aoData.length; t < a; t++) o = r.aoData[t]._anHidden[n], r.aoData[t].nTr.insertBefore(o, $(">td:eq(" + f + ")", r.aoData[t].nTr)[0])
            }
            r.aoColumns[n].bVisible = !0
          } else {
            for (l.removeChild(c[n]), d && d.removeChild(u[n]), i = _fnGetTdNodes(r), t = 0, a = r.aoData.length; t < a; t++) o = i[t * r.aoColumns.length + n], r.aoData[t]._anHidden[n] = o, o.parentNode.removeChild(o);
            r.aoColumns[n].bVisible = !1
          }
          for (t = 0, a = r.aoOpenRows.length; t < a; t++) r.aoOpenRows[t].nTr.colSpan = _fnVisbleColumns(r);
          _fnSaveState(r)
        }
      }, this.fnPageChange = function (n, e) {
        var t = _fnSettingsFromNode(this[_oExt.iApiIndex]);
        _fnPageChange(t, n), _fnCalculateEnd(t), (void 0 === e || e) && _fnDraw(t)
      }, _oExt.oApi) sFunc && (this[sFunc] = _fnExternApiFunc(sFunc));

      function _fnInitalise(n) {
        if (!1 !== n.bInitialised) {
          if (_fnAddOptionsHtml(n), _fnDrawHead(n), n.oFeatures.bSort ? (_fnSort(n, !1), _fnSortingClasses(n)) : (n.aiDisplay = n.aiDisplayMaster.slice(), _fnCalculateEnd(n), _fnDraw(n)), null !== n.sAjaxSource && !n.oFeatures.bServerSide) return _fnProcessingDisplay(n, !0), void n.fnServerData(n.sAjaxSource, null, function (e) {
            for (var t = 0; t < e.aaData.length; t++) _fnAddData(n, e.aaData[t]);
            n.iInitDisplayStart = n._iDisplayStart, n.oFeatures.bSort ? _fnSort(n) : (n.aiDisplay = n.aiDisplayMaster.slice(), _fnCalculateEnd(n), _fnDraw(n)), _fnProcessingDisplay(n, !1), "function" == typeof n.fnInitComplete && n.fnInitComplete(n, e)
          });
          "function" == typeof n.fnInitComplete && n.fnInitComplete(n), n.oFeatures.bServerSide || _fnProcessingDisplay(n, !1)
        } else setTimeout(function () {
          _fnInitalise(n)
        }, 200)
      }

      function _fnLanguageProcess(n, e, t) {
        _fnMap(n.oLanguage, e, "sProcessing"), _fnMap(n.oLanguage, e, "sLengthMenu"), _fnMap(n.oLanguage, e, "sZeroRecords"), _fnMap(n.oLanguage, e, "sInfo"), _fnMap(n.oLanguage, e, "sInfoEmpty"), _fnMap(n.oLanguage, e, "sInfoFiltered"), _fnMap(n.oLanguage, e, "sInfoPostFix"), _fnMap(n.oLanguage, e, "sSearch"), void 0 !== e.oPaginate && (_fnMap(n.oLanguage.oPaginate, e.oPaginate, "sFirst"), _fnMap(n.oLanguage.oPaginate, e.oPaginate, "sPrevious"), _fnMap(n.oLanguage.oPaginate, e.oPaginate, "sNext"), _fnMap(n.oLanguage.oPaginate, e.oPaginate, "sLast")), t && _fnInitalise(n)
      }

      function _fnAddColumn(n, e, t) {
        n.aoColumns[n.aoColumns.length++] = {
          sType: null,
          _bAutoType: !0,
          bVisible: !0,
          bSearchable: !0,
          bSortable: !0,
          asSorting: ["asc", "desc"],
          sSortingClass: n.oClasses.sSortable,
          sSortingClassJUI: n.oClasses.sSortJUI,
          sTitle: t ? t.innerHTML : "",
          sName: "",
          sWidth: null,
          sClass: null,
          fnRender: null,
          bUseRendered: !0,
          iDataSort: n.aoColumns.length - 1,
          sSortDataType: "std",
          nTh: t || document.createElement("th"),
          nTf: null
        };
        var a = n.aoColumns.length - 1, o = n.aoColumns[a];
        null != e && (void 0 !== e.sType && (o.sType = e.sType, o._bAutoType = !1), _fnMap(o, e, "bVisible"), _fnMap(o, e, "bSearchable"), _fnMap(o, e, "bSortable"), _fnMap(o, e, "sTitle"), _fnMap(o, e, "sName"), _fnMap(o, e, "sWidth"), _fnMap(o, e, "sClass"), _fnMap(o, e, "fnRender"), _fnMap(o, e, "bUseRendered"), _fnMap(o, e, "iDataSort"), _fnMap(o, e, "asSorting"), _fnMap(o, e, "sSortDataType")), n.oFeatures.bSort || (o.bSortable = !1), !o.bSortable || -1 == $.inArray("asc", o.asSorting) && -1 == $.inArray("desc", o.asSorting) ? (o.sSortingClass = n.oClasses.sSortableNone, o.sSortingClassJUI = "") : -1 != $.inArray("asc", o.asSorting) && -1 == $.inArray("desc", o.asSorting) ? (o.sSortingClass = n.oClasses.sSortableAsc, o.sSortingClassJUI = n.oClasses.sSortJUIAscAllowed) : -1 == $.inArray("asc", o.asSorting) && -1 != $.inArray("desc", o.asSorting) && (o.sSortingClass = n.oClasses.sSortableDesc, o.sSortingClassJUI = n.oClasses.sSortJUIDescAllowed), void 0 === n.aoPreSearchCols[a] || null === n.aoPreSearchCols[a] ? n.aoPreSearchCols[a] = {
          sSearch: "",
          bEscapeRegex: !0
        } : void 0 === n.aoPreSearchCols[a].bEscapeRegex && (n.aoPreSearchCols[a].bEscapeRegex = !0)
      }

      function _fnAddData(n, e) {
        if (e.length != n.aoColumns.length) return alert("DataTables warning: Added data does not match known number of columns"), -1;
        var t, a, o = n.aoData.length;
        n.aoData.push({
          nTr: document.createElement("tr"),
          _iId: n.iNextId++,
          _aData: e.slice(),
          _anHidden: [],
          _sRowStripe: ""
        });
        for (var i = 0; i < e.length; i++) {
          if (t = document.createElement("td"), "function" == typeof n.aoColumns[i].fnRender) {
            var r = n.aoColumns[i].fnRender({iDataRow: o, iDataColumn: i, aData: e, oSettings: n});
            t.innerHTML = r, n.aoColumns[i].bUseRendered && (n.aoData[o]._aData[i] = r)
          } else t.innerHTML = e[i];
          null !== n.aoColumns[i].sClass && (t.className = n.aoColumns[i].sClass), n.aoColumns[i]._bAutoType && "string" != n.aoColumns[i].sType && (a = _fnDetectType(n.aoData[o]._aData[i]), null === n.aoColumns[i].sType ? n.aoColumns[i].sType = a : n.aoColumns[i].sType != a && (n.aoColumns[i].sType = "string")), n.aoColumns[i].bVisible ? n.aoData[o].nTr.appendChild(t) : n.aoData[o]._anHidden[i] = t
        }
        return n.aiDisplayMaster.push(o), o
      }

      function _fnGatherData(n) {
        var e, t, a, o, i, r, s, l, d, c, u, p, f, h;
        if (null === n.sAjaxSource) for (e = 0, t = (s = n.nTable.getElementsByTagName("tbody")[0].childNodes).length; e < t; e++) if ("TR" == s[e].nodeName) for (c = n.aoData.length, n.aoData.push({
          nTr: s[e],
          _iId: n.iNextId++,
          _aData: [],
          _anHidden: [],
          _sRowStripe: ""
        }), n.aiDisplayMaster.push(c), d = n.aoData[c]._aData, i = 0, a = 0, o = (r = s[e].childNodes).length; a < o; a++) "TD" == r[a].nodeName && (d[i] = r[a].innerHTML, i++);
        for (r = [], e = 0, t = (s = _fnGetTrNodes(n)).length; e < t; e++) for (a = 0, o = s[e].childNodes.length; a < o; a++) "TD" == (l = s[e].childNodes[a]).nodeName && r.push(l);
        for (r.length != s.length * n.aoColumns.length && alert("DataTables warning: Unexpected number of TD elements. Expected " + s.length * n.aoColumns.length + " and got " + r.length + ". DataTables does not support rowspan / colspan in the table body, and there must be one cell for each row/column combination."), f = 0, h = n.aoColumns.length; f < h; f++) {
          null === n.aoColumns[f].sTitle && (n.aoColumns[f].sTitle = n.aoColumns[f].nTh.innerHTML);
          var g, b, m, v = n.aoColumns[f]._bAutoType, _ = "function" == typeof n.aoColumns[f].fnRender,
            y = null !== n.aoColumns[f].sClass, x = n.aoColumns[f].bVisible;
          if (v || _ || y || !x) for (u = 0, p = n.aoData.length; u < p; u++) g = r[u * h + f], v && "string" != n.aoColumns[f].sType && (b = _fnDetectType(n.aoData[u]._aData[f]), null === n.aoColumns[f].sType ? n.aoColumns[f].sType = b : n.aoColumns[f].sType != b && (n.aoColumns[f].sType = "string")), _ && (m = n.aoColumns[f].fnRender({
            iDataRow: u,
            iDataColumn: f,
            aData: n.aoData[u]._aData,
            oSettings: n
          }), g.innerHTML = m, n.aoColumns[f].bUseRendered && (n.aoData[u]._aData[f] = m)), y && (g.className += " " + n.aoColumns[f].sClass), x || (n.aoData[u]._anHidden[f] = g, g.parentNode.removeChild(g))
        }
      }

      function _fnDrawHead(n) {
        var e, t, a, o = 0;
        if (0 !== n.nTable.getElementsByTagName("thead")[0].getElementsByTagName("th").length) for (e = 0, a = n.aoColumns.length; e < a; e++) t = n.aoColumns[e].nTh, n.aoColumns[e].bVisible ? (null !== n.aoColumns[e].sWidth && (t.style.width = n.aoColumns[e].sWidth), n.aoColumns[e].sTitle != t.innerHTML && (t.innerHTML = n.aoColumns[e].sTitle)) : (t.parentNode.removeChild(t), o++); else {
          var i = document.createElement("tr");
          for (e = 0, a = n.aoColumns.length; e < a; e++) (t = n.aoColumns[e].nTh).innerHTML = n.aoColumns[e].sTitle, n.aoColumns[e].bVisible && (null !== n.aoColumns[e].sClass && (t.className = n.aoColumns[e].sClass), null !== n.aoColumns[e].sWidth && (t.style.width = n.aoColumns[e].sWidth), i.appendChild(t));
          $("thead:eq(0)", n.nTable).html("")[0].appendChild(i)
        }
        if (n.bJUI) for (e = 0, a = n.aoColumns.length; e < a; e++) n.aoColumns[e].nTh.insertBefore(document.createElement("span"), n.aoColumns[e].nTh.firstChild);
        if (n.oFeatures.bSort) {
          for (e = 0; e < n.aoColumns.length; e++) !1 !== n.aoColumns[e].bSortable ? _fnSortAttachListener(n, n.aoColumns[e].nTh, e) : $(n.aoColumns[e].nTh).addClass(n.oClasses.sSortableNone);
          $("thead:eq(0) th", n.nTable).mousedown(function (n) {
            if (n.shiftKey) return this.onselectstart = function () {
              return !1
            }, !1
          })
        }
        var r = n.nTable.getElementsByTagName("tfoot");
        if (0 !== r.length) {
          o = 0;
          var s = r[0].getElementsByTagName("th");
          for (e = 0, a = s.length; e < a; e++) n.aoColumns[e].nTf = s[e - o], n.aoColumns[e].bVisible || (s[e - o].parentNode.removeChild(s[e - o]), o++)
        }
      }

      function _fnDraw(n) {
        var e, t, a = [], o = 0, i = !1, r = n.asStripClasses.length, s = n.aoOpenRows.length;
        if (!n.oFeatures.bServerSide || _fnAjaxUpdate(n)) {
          if (void 0 !== n.iInitDisplayStart && -1 != n.iInitDisplayStart && (n._iDisplayStart = n.iInitDisplayStart >= n.fnRecordsDisplay() ? 0 : n.iInitDisplayStart, n.iInitDisplayStart = -1, _fnCalculateEnd(n)), 0 !== n.aiDisplay.length) {
            var l = n._iDisplayStart, d = n._iDisplayEnd;
            n.oFeatures.bServerSide && (l = 0, d = n.aoData.length);
            for (var c = l; c < d; c++) {
              var u = n.aoData[n.aiDisplay[c]], p = u.nTr;
              if (0 !== r) {
                var f = n.asStripClasses[o % r];
                u._sRowStripe != f && ($(p).removeClass(u._sRowStripe).addClass(f), u._sRowStripe = f)
              }
              if ("function" == typeof n.fnRowCallback && ((p = n.fnRowCallback(p, n.aoData[n.aiDisplay[c]]._aData, o, c)) || i || (alert("DataTables warning: A node was not returned by fnRowCallback"), i = !0)), a.push(p), o++, 0 !== s) for (var h = 0; h < s; h++) p == n.aoOpenRows[h].nParent && a.push(n.aoOpenRows[h].nTr)
            }
          } else {
            a[0] = document.createElement("tr"), void 0 !== n.asStripClasses[0] && (a[0].className = n.asStripClasses[0]);
            var g = document.createElement("td");
            g.setAttribute("valign", "top"), g.colSpan = n.aoColumns.length, g.className = n.oClasses.sRowEmpty, g.innerHTML = n.oLanguage.sZeroRecords, a[o].appendChild(g)
          }
          "function" == typeof n.fnHeaderCallback && n.fnHeaderCallback($("thead:eq(0)>tr", n.nTable)[0], _fnGetDataMaster(n), n._iDisplayStart, n.fnDisplayEnd(), n.aiDisplay), "function" == typeof n.fnFooterCallback && n.fnFooterCallback($("tfoot:eq(0)>tr", n.nTable)[0], _fnGetDataMaster(n), n._iDisplayStart, n.fnDisplayEnd(), n.aiDisplay);
          var b = n.nTable.getElementsByTagName("tbody");
          if (b[0]) {
            var m = b[0].childNodes;
            for (e = m.length - 1; e >= 0; e--) m[e].parentNode.removeChild(m[e]);
            for (e = 0, t = a.length; e < t; e++) b[0].appendChild(a[e])
          }
          for (e = 0, t = n.aoDrawCallback.length; e < t; e++) n.aoDrawCallback[e].fn(n);
          n.bSorted = !1, n.bFiltered = !1, void 0 === n._bInitComplete && (n._bInitComplete = !0, n.oFeatures.bAutoWidth && 0 !== n.nTable.offsetWidth && (n.nTable.style.width = n.nTable.offsetWidth + "px"))
        }
      }

      function _fnReDraw(n) {
        n.oFeatures.bSort ? _fnSort(n, n.oPreviousSearch) : n.oFeatures.bFilter ? _fnFilterComplete(n, n.oPreviousSearch) : (_fnCalculateEnd(n), _fnDraw(n))
      }

      function _fnAjaxUpdate(n) {
        if (n.bAjaxDataGet) {
          _fnProcessingDisplay(n, !0);
          var e, t = n.aoColumns.length, a = [];
          if (n.iServerDraw++, a.push({name: "sEcho", value: n.iServerDraw}), a.push({
            name: "iColumns",
            value: t
          }), a.push({name: "sColumns", value: _fnColumnOrdering(n)}), a.push({
            name: "iDisplayStart",
            value: n._iDisplayStart
          }), a.push({
            name: "iDisplayLength",
            value: !1 !== n.oFeatures.bPaginate ? n._iDisplayLength : -1
          }), !1 !== n.oFeatures.bFilter) for (a.push({
            name: "sSearch",
            value: n.oPreviousSearch.sSearch
          }), a.push({
            name: "bEscapeRegex",
            value: n.oPreviousSearch.bEscapeRegex
          }), e = 0; e < t; e++) a.push({
            name: "sSearch_" + e,
            value: n.aoPreSearchCols[e].sSearch
          }), a.push({
            name: "bEscapeRegex_" + e,
            value: n.aoPreSearchCols[e].bEscapeRegex
          }), a.push({name: "bSearchable_" + e, value: n.aoColumns[e].bSearchable});
          if (!1 !== n.oFeatures.bSort) {
            var o = null !== n.aaSortingFixed ? n.aaSortingFixed.length : 0, i = n.aaSorting.length;
            for (a.push({name: "iSortingCols", value: o + i}), e = 0; e < o; e++) a.push({
              name: "iSortCol_" + e,
              value: n.aaSortingFixed[e][0]
            }), a.push({name: "sSortDir_" + e, value: n.aaSortingFixed[e][1]});
            for (e = 0; e < i; e++) a.push({
              name: "iSortCol_" + (e + o),
              value: n.aaSorting[e][0]
            }), a.push({name: "sSortDir_" + (e + o), value: n.aaSorting[e][1]});
            for (e = 0; e < t; e++) a.push({name: "bSortable_" + e, value: n.aoColumns[e].bSortable})
          }
          return n.fnServerData(n.sAjaxSource, a, function (e) {
            _fnAjaxUpdateDraw(n, e)
          }), !1
        }
        return !0
      }

      function _fnAjaxUpdateDraw(n, e) {
        if (void 0 !== e.sEcho) {
          if (1 * e.sEcho < n.iServerDraw) return;
          n.iServerDraw = 1 * e.sEcho
        }
        _fnClearTable(n), n._iRecordsTotal = e.iTotalRecords, n._iRecordsDisplay = e.iTotalDisplayRecords;
        var t = _fnColumnOrdering(n), a = void 0 !== e.sColumns && "" !== t && e.sColumns != t;
        if (a) var o = _fnReOrderIndex(n, e.sColumns);
        for (var i = 0, r = e.aaData.length; i < r; i++) if (a) {
          for (var s = [], l = 0, d = n.aoColumns.length; l < d; l++) s.push(e.aaData[i][o[l]]);
          _fnAddData(n, s)
        } else _fnAddData(n, e.aaData[i]);
        n.aiDisplay = n.aiDisplayMaster.slice(), n.bAjaxDataGet = !1, _fnDraw(n), n.bAjaxDataGet = !0, _fnProcessingDisplay(n, !1)
      }

      function _fnAddOptionsHtml(n) {
        var e = document.createElement("div");
        n.nTable.parentNode.insertBefore(e, n.nTable);
        var t = document.createElement("div");
        t.className = n.oClasses.sWrapper, "" !== n.sTableId && t.setAttribute("id", n.sTableId + "_wrapper");
        for (var a, o, i, r, s, l, d, c = t, u = n.sDom.replace("H", "fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"), p = (u = u.replace("F", "fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix")).split(""), f = 0; f < p.length; f++) {
          if (o = 0, "<" == (i = p[f])) {
            if (r = document.createElement("div"), "'" == (s = p[f + 1]) || '"' == s) {
              for (l = "", d = 2; p[f + d] != s;) l += p[f + d], d++;
              r.className = l, f += d
            }
            c.appendChild(r), c = r
          } else if (">" == i) c = c.parentNode; else if ("l" == i && n.oFeatures.bPaginate && n.oFeatures.bLengthChange) a = _fnFeatureHtmlLength(n), o = 1; else if ("f" == i && n.oFeatures.bFilter) a = _fnFeatureHtmlFilter(n), o = 1; else if ("r" == i && n.oFeatures.bProcessing) a = _fnFeatureHtmlProcessing(n), o = 1; else if ("t" == i) a = n.nTable, o = 1; else if ("i" == i && n.oFeatures.bInfo) a = _fnFeatureHtmlInfo(n), o = 1; else if ("p" == i && n.oFeatures.bPaginate) a = _fnFeatureHtmlPaginate(n), o = 1; else if (0 !== _oExt.aoFeatures.length) for (var h = _oExt.aoFeatures, g = 0, b = h.length; g < b; g++) if (i == h[g].cFeature) {
            (a = h[g].fnInit(n)) && (o = 1);
            break
          }
          1 == o && ("object" != _typeof(n.aanFeatures[i]) && (n.aanFeatures[i] = []), n.aanFeatures[i].push(a), c.appendChild(a))
        }
        e.parentNode.replaceChild(t, e)
      }

      function _fnFeatureHtmlFilter(n) {
        var e = document.createElement("div");
        "" !== n.sTableId && void 0 === n.aanFeatures.f && e.setAttribute("id", n.sTableId + "_filter"), e.className = n.oClasses.sFilter;
        var t = "" === n.oLanguage.sSearch ? "" : " ";
        e.innerHTML = n.oLanguage.sSearch + t + '<input type="text" />';
        var a = $("input", e);
        return a.val(n.oPreviousSearch.sSearch.replace('"', "&quot;")), a.keyup(function (e) {
          for (var t = n.aanFeatures.f, a = 0, o = t.length; a < o; a++) t[a] != this.parentNode && $("input", t[a]).val(this.value);
          _fnFilterComplete(n, {sSearch: this.value, bEscapeRegex: n.oPreviousSearch.bEscapeRegex})
        }), a.keypress(function (n) {
          if (13 == n.keyCode) return !1
        }), e
      }

      function _fnFilterComplete(n, e, t) {
        _fnFilter(n, e.sSearch, t, e.bEscapeRegex);
        for (var a = 0; a < n.aoPreSearchCols.length; a++) _fnFilterColumn(n, n.aoPreSearchCols[a].sSearch, a, n.aoPreSearchCols[a].bEscapeRegex);
        0 !== _oExt.afnFiltering.length && _fnFilterCustom(n), n.bFiltered = !0, n._iDisplayStart = 0, _fnCalculateEnd(n), _fnDraw(n), _fnBuildSearchArray(n, 0)
      }

      function _fnFilterCustom(n) {
        for (var e = _oExt.afnFiltering, t = 0, a = e.length; t < a; t++) for (var o = 0, i = 0, r = n.aiDisplay.length; i < r; i++) {
          var s = n.aiDisplay[i - o];
          e[t](n, n.aoData[s]._aData, s) || (n.aiDisplay.splice(i - o, 1), o++)
        }
      }

      function _fnFilterColumn(n, e, t, a) {
        if ("" !== e) for (var o = a ? _fnEscapeRegex(e) : e, i = new RegExp(o, "i"), r = n.aiDisplay.length - 1; r >= 0; r--) {
          var s = _fnDataToSearch(n.aoData[n.aiDisplay[r]]._aData[t], n.aoColumns[t].sType);
          i.test(s) || (n.aiDisplay.splice(r, 1), 0)
        }
      }

      function _fnFilter(n, e, t, a) {
        var o;
        null == t && (t = 0), 0 !== _oExt.afnFiltering.length && (t = 1);
        var i = "^(?=.*?" + (a ? _fnEscapeRegex(e).split(" ") : e.split(" ")).join(")(?=.*?") + ").*$",
          r = new RegExp(i, "i");
        if (e.length <= 0) n.aiDisplay.splice(0, n.aiDisplay.length), n.aiDisplay = n.aiDisplayMaster.slice(); else if (n.aiDisplay.length == n.aiDisplayMaster.length || n.oPreviousSearch.sSearch.length > e.length || 1 == t || 0 !== e.indexOf(n.oPreviousSearch.sSearch)) for (n.aiDisplay.splice(0, n.aiDisplay.length), _fnBuildSearchArray(n, 1), o = 0; o < n.aiDisplayMaster.length; o++) r.test(n.asDataSearch[o]) && n.aiDisplay.push(n.aiDisplayMaster[o]); else {
          var s = 0;
          for (o = 0; o < n.asDataSearch.length; o++) r.test(n.asDataSearch[o]) || (n.aiDisplay.splice(o - s, 1), s++)
        }
        n.oPreviousSearch.sSearch = e, n.oPreviousSearch.bEscapeRegex = a
      }

      function _fnBuildSearchArray(n, e) {
        n.asDataSearch.splice(0, n.asDataSearch.length);
        for (var t = void 0 !== e && 1 == e ? n.aiDisplayMaster : n.aiDisplay, a = 0, o = t.length; a < o; a++) {
          n.asDataSearch[a] = "";
          for (var i = 0, r = n.aoColumns.length; i < r; i++) if (n.aoColumns[i].bSearchable) {
            var s = n.aoData[t[a]]._aData[i];
            n.asDataSearch[a] += _fnDataToSearch(s, n.aoColumns[i].sType) + " "
          }
        }
      }

      function _fnDataToSearch(n, e) {
        return "function" == typeof _oExt.ofnSearch[e] ? _oExt.ofnSearch[e](n) : "html" == e ? n.replace(/\n/g, " ").replace(/<.*?>/g, "") : "string" == typeof n ? n.replace(/\n/g, " ") : n
      }

      function _fnSort(oSettings, bApplyClasses) {
        var aaSort = [], oSort = _oExt.oSort, aoData = oSettings.aoData, iDataSort, iDataType, i, j, jLen;
        if (!oSettings.oFeatures.bServerSide && (0 !== oSettings.aaSorting.length || null !== oSettings.aaSortingFixed)) {
          for (aaSort = null !== oSettings.aaSortingFixed ? oSettings.aaSortingFixed.concat(oSettings.aaSorting) : oSettings.aaSorting.slice(), i = 0; i < aaSort.length; i++) {
            var iColumn = aaSort[i][0], sDataType = oSettings.aoColumns[iColumn].sSortDataType;
            if (void 0 !== _oExt.afnSortData[sDataType]) {
              var iCorrector = 0, aData = _oExt.afnSortData[sDataType](oSettings, iColumn);
              for (j = 0, jLen = aoData.length; j < jLen; j++) null !== aoData[j] && (aoData[j]._aData[iColumn] = aData[iCorrector], iCorrector++)
            }
          }
          if (window.runtime) {
            var aAirSort = [], iLen = aaSort.length;
            for (i = 0; i < iLen; i++) iDataSort = oSettings.aoColumns[aaSort[i][0]].iDataSort, aAirSort.push([iDataSort, oSettings.aoColumns[iDataSort].sType + "-" + aaSort[i][1]]);
            oSettings.aiDisplayMaster.sort(function (n, e) {
              for (var t, a = 0; a < iLen; a++) if (0 !== (t = oSort[aAirSort[a][1]](aoData[n]._aData[aAirSort[a][0]], aoData[e]._aData[aAirSort[a][0]]))) return t;
              return 0
            })
          } else {
            var fnLocalSorting, sDynamicSort = "fnLocalSorting = function(a,b){var iTest;";
            for (i = 0; i < aaSort.length - 1; i++) iDataSort = oSettings.aoColumns[aaSort[i][0]].iDataSort, iDataType = oSettings.aoColumns[iDataSort].sType, sDynamicSort += "iTest = oSort['" + iDataType + "-" + aaSort[i][1] + "']( aoData[a]._aData[" + iDataSort + "], aoData[b]._aData[" + iDataSort + "] ); if ( iTest === 0 )";
            iDataSort = oSettings.aoColumns[aaSort[aaSort.length - 1][0]].iDataSort, iDataType = oSettings.aoColumns[iDataSort].sType, sDynamicSort += "iTest = oSort['" + iDataType + "-" + aaSort[aaSort.length - 1][1] + "']( aoData[a]._aData[" + iDataSort + "], aoData[b]._aData[" + iDataSort + "] );if (iTest===0) return oSort['numeric-" + aaSort[aaSort.length - 1][1] + "'](a, b); return iTest;}", eval(sDynamicSort), oSettings.aiDisplayMaster.sort(fnLocalSorting)
          }
        }
        (void 0 === bApplyClasses || bApplyClasses) && _fnSortingClasses(oSettings), oSettings.bSorted = !0, oSettings.oFeatures.bFilter ? _fnFilterComplete(oSettings, oSettings.oPreviousSearch, 1) : (oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), oSettings._iDisplayStart = 0, _fnCalculateEnd(oSettings), _fnDraw(oSettings))
      }

      function _fnSortAttachListener(n, e, t, a) {
        $(e).click(function (e) {
          if (!1 !== n.aoColumns[t].bSortable) {
            var o = function () {
              var a, o;
              if (e.shiftKey) {
                for (var i = !1, r = 0; r < n.aaSorting.length; r++) if (n.aaSorting[r][0] == t) {
                  i = !0, a = n.aaSorting[r][0], o = n.aaSorting[r][2] + 1, void 0 === n.aoColumns[a].asSorting[o] ? n.aaSorting.splice(r, 1) : (n.aaSorting[r][1] = n.aoColumns[a].asSorting[o], n.aaSorting[r][2] = o);
                  break
                }
                !1 === i && n.aaSorting.push([t, n.aoColumns[t].asSorting[0], 0])
              } else 1 == n.aaSorting.length && n.aaSorting[0][0] == t ? (a = n.aaSorting[0][0], o = n.aaSorting[0][2] + 1, void 0 === n.aoColumns[a].asSorting[o] && (o = 0), n.aaSorting[0][1] = n.aoColumns[a].asSorting[o], n.aaSorting[0][2] = o) : (n.aaSorting.splice(0, n.aaSorting.length), n.aaSorting.push([t, n.aoColumns[t].asSorting[0], 0]));
              _fnSort(n)
            };
            n.oFeatures.bProcessing ? (_fnProcessingDisplay(n, !0), setTimeout(function () {
              o(), n.oFeatures.bServerSide || _fnProcessingDisplay(n, !1)
            }, 0)) : o(), "function" == typeof a && a(n)
          }
        })
      }

      function _fnSortingClasses(n) {
        var e, t, a, o, i, r, s = n.aoColumns.length, l = n.oClasses;
        for (e = 0; e < s; e++) n.aoColumns[e].bSortable && $(n.aoColumns[e].nTh).removeClass(l.sSortAsc + " " + l.sSortDesc + " " + n.aoColumns[e].sSortingClass);
        for (i = null !== n.aaSortingFixed ? n.aaSortingFixed.concat(n.aaSorting) : n.aaSorting.slice(), e = 0; e < n.aoColumns.length; e++) if (n.aoColumns[e].bSortable) {
          for (r = n.aoColumns[e].sSortingClass, o = -1, t = 0; t < i.length; t++) if (i[t][0] == e) {
            r = "asc" == i[t][1] ? l.sSortAsc : l.sSortDesc, o = t;
            break
          }
          if ($(n.aoColumns[e].nTh).addClass(r), n.bJUI) {
            var d, c = $("span", n.aoColumns[e].nTh);
            c.removeClass(l.sSortJUIAsc + " " + l.sSortJUIDesc + " " + l.sSortJUI + " " + l.sSortJUIAscAllowed + " " + l.sSortJUIDescAllowed), d = -1 == o ? n.aoColumns[e].sSortingClassJUI : "asc" == i[o][1] ? l.sSortJUIAsc : l.sSortJUIDesc, c.addClass(d)
          }
        } else $(n.aoColumns[e].nTh).addClass(n.aoColumns[e].sSortingClass);
        if (r = l.sSortColumn, n.oFeatures.bSort && n.oFeatures.bSortClasses) {
          var u = _fnGetTdNodes(n);
          if (u.length >= s) for (e = 0; e < s; e++) if (-1 != u[e].className.indexOf(r + "1")) for (t = 0, a = u.length / s; t < a; t++) u[s * t + e].className = u[s * t + e].className.replace(" " + r + "1", ""); else if (-1 != u[e].className.indexOf(r + "2")) for (t = 0, a = u.length / s; t < a; t++) u[s * t + e].className = u[s * t + e].className.replace(" " + r + "2", ""); else if (-1 != u[e].className.indexOf(r + "3")) for (t = 0, a = u.length / s; t < a; t++) u[s * t + e].className = u[s * t + e].className.replace(" " + r + "3", "");
          var p, f = 1;
          for (e = 0; e < i.length; e++) {
            for (p = parseInt(i[e][0], 10), t = 0, a = u.length / s; t < a; t++) u[s * t + p].className += " " + r + f;
            f < 3 && f++
          }
        }
      }

      function _fnFeatureHtmlPaginate(n) {
        var e = document.createElement("div");
        return e.className = n.oClasses.sPaging + n.sPaginationType, _oExt.oPagination[n.sPaginationType].fnInit(n, e, function (n) {
          _fnCalculateEnd(n), _fnDraw(n)
        }), void 0 === n.aanFeatures.p && n.aoDrawCallback.push({
          fn: function (n) {
            _oExt.oPagination[n.sPaginationType].fnUpdate(n, function (n) {
              _fnCalculateEnd(n), _fnDraw(n)
            })
          }, sName: "pagination"
        }), e
      }

      function _fnPageChange(n, e) {
        var t = n._iDisplayStart;
        if ("first" == e) n._iDisplayStart = 0; else if ("previous" == e) n._iDisplayStart = n._iDisplayLength >= 0 ? n._iDisplayStart - n._iDisplayLength : 0, n._iDisplayStart < 0 && (n._iDisplayStart = 0); else if ("next" == e) n._iDisplayLength >= 0 ? n._iDisplayStart + n._iDisplayLength < n.fnRecordsDisplay() && (n._iDisplayStart += n._iDisplayLength) : n._iDisplayStart = 0; else if ("last" == e) if (n._iDisplayLength >= 0) {
          var a = parseInt((n.fnRecordsDisplay() - 1) / n._iDisplayLength, 10) + 1;
          n._iDisplayStart = (a - 1) * n._iDisplayLength
        } else n._iDisplayStart = 0; else alert("DataTables warning: unknown paging action: " + e);
        return t != n._iDisplayStart
      }

      function _fnFeatureHtmlInfo(n) {
        var e = document.createElement("div");
        return e.className = n.oClasses.sInfo, void 0 === n.aanFeatures.i && (n.aoDrawCallback.push({
          fn: _fnUpdateInfo,
          sName: "information"
        }), "" !== n.sTableId && e.setAttribute("id", n.sTableId + "_info")), e
      }

      function _fnUpdateInfo(n) {
        if (n.oFeatures.bInfo && 0 !== n.aanFeatures.i.length) {
          var e = n.aanFeatures.i[0];
          0 === n.fnRecordsDisplay() && n.fnRecordsDisplay() == n.fnRecordsTotal() ? e.innerHTML = n.oLanguage.sInfoEmpty + n.oLanguage.sInfoPostFix : 0 === n.fnRecordsDisplay() ? e.innerHTML = n.oLanguage.sInfoEmpty + " " + n.oLanguage.sInfoFiltered.replace("_MAX_", n.fnRecordsTotal()) + n.oLanguage.sInfoPostFix : n.fnRecordsDisplay() == n.fnRecordsTotal() ? e.innerHTML = n.oLanguage.sInfo.replace("_START_", n._iDisplayStart + 1).replace("_END_", n.fnDisplayEnd()).replace("_TOTAL_", n.fnRecordsDisplay()) + n.oLanguage.sInfoPostFix : e.innerHTML = n.oLanguage.sInfo.replace("_START_", n._iDisplayStart + 1).replace("_END_", n.fnDisplayEnd()).replace("_TOTAL_", n.fnRecordsDisplay()) + " " + n.oLanguage.sInfoFiltered.replace("_MAX_", n.fnRecordsTotal()) + n.oLanguage.sInfoPostFix;
          var t = n.aanFeatures.i;
          if (t.length > 1) for (var a = e.innerHTML, o = 1, i = t.length; o < i; o++) t[o].innerHTML = a
        }
      }

      function _fnFeatureHtmlLength(n) {
        var e = '<select size="1" ' + ("" === n.sTableId ? "" : 'name="' + n.sTableId + '_length"') + '><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>',
          t = document.createElement("div");
        return "" !== n.sTableId && void 0 === n.aanFeatures.l && t.setAttribute("id", n.sTableId + "_length"), t.className = n.oClasses.sLength, t.innerHTML = n.oLanguage.sLengthMenu.replace("_MENU_", e), $('select option[value="' + n._iDisplayLength + '"]', t).attr("selected", !0), $("select", t).change(function (e) {
          for (var t = $(this).val(), a = n.aanFeatures.l, o = 0, i = a.length; o < i; o++) a[o] != this.parentNode && $("select", a[o]).val(t);
          n._iDisplayLength = parseInt(t, 10), _fnCalculateEnd(n), n._iDisplayEnd == n.aiDisplay.length && (n._iDisplayStart = n._iDisplayEnd - n._iDisplayLength, n._iDisplayStart < 0 && (n._iDisplayStart = 0)), -1 == n._iDisplayLength && (n._iDisplayStart = 0), _fnDraw(n)
        }), t
      }

      function _fnFeatureHtmlProcessing(n) {
        var e = document.createElement("div");
        return "" !== n.sTableId && void 0 === n.aanFeatures.r && e.setAttribute("id", n.sTableId + "_processing"), e.innerHTML = n.oLanguage.sProcessing, e.className = n.oClasses.sProcessing, n.nTable.parentNode.insertBefore(e, n.nTable), e
      }

      function _fnProcessingDisplay(n, e) {
        if (n.oFeatures.bProcessing) for (var t = n.aanFeatures.r, a = 0, o = t.length; a < o; a++) t[a].style.visibility = e ? "visible" : "hidden"
      }

      function _fnVisibleToColumnIndex(n, e) {
        for (var t = -1, a = 0; a < n.aoColumns.length; a++) if (!0 === n.aoColumns[a].bVisible && t++, t == e) return a;
        return null
      }

      function _fnColumnIndexToVisible(n, e) {
        for (var t = -1, a = 0; a < n.aoColumns.length; a++) if (!0 === n.aoColumns[a].bVisible && t++, a == e) return !0 === n.aoColumns[a].bVisible ? t : null;
        return null
      }

      function _fnNodeToDataIndex(n, e) {
        for (var t = 0, a = n.aoData.length; t < a; t++) if (null !== n.aoData[t] && n.aoData[t].nTr == e) return t;
        return null
      }

      function _fnVisbleColumns(n) {
        for (var e = 0, t = 0; t < n.aoColumns.length; t++) !0 === n.aoColumns[t].bVisible && e++;
        return e
      }

      function _fnCalculateEnd(n) {
        !1 === n.oFeatures.bPaginate ? n._iDisplayEnd = n.aiDisplay.length : n._iDisplayStart + n._iDisplayLength > n.aiDisplay.length || -1 == n._iDisplayLength ? n._iDisplayEnd = n.aiDisplay.length : n._iDisplayEnd = n._iDisplayStart + n._iDisplayLength
      }

      function _fnConvertToWidth(n, e) {
        if (!n || null === n || "" === n) return 0;
        var t;
        void 0 === e && (e = document.getElementsByTagName("body")[0]);
        var a = document.createElement("div");
        return a.style.width = n, e.appendChild(a), t = a.offsetWidth, e.removeChild(a), t
      }

      function _fnCalculateColumnWidths(n) {
        var e, t, a = n.nTable.offsetWidth, o = 0, i = 0, r = n.aoColumns.length, s = $("thead:eq(0)>th", n.nTable);
        for (t = 0; t < r; t++) n.aoColumns[t].bVisible && (i++, null !== n.aoColumns[t].sWidth && (o += e = _fnConvertToWidth(n.aoColumns[t].sWidth, n.nTable.parentNode), n.aoColumns[t].sWidth = e + "px"));
        if (r == s.length && 0 === o && i == r) for (t = 0; t < n.aoColumns.length; t++) n.aoColumns[t].sWidth = s[t].offsetWidth + "px"; else {
          var l = n.nTable.cloneNode(!1);
          l.setAttribute("id", "");
          var d = '<table class="' + l.className + '">', c = "<tr>", u = "<tr>";
          for (t = 0; t < r; t++) if (n.aoColumns[t].bVisible) if (c += "<th>" + n.aoColumns[t].sTitle + "</th>", null !== n.aoColumns[t].sWidth) {
            var p = "";
            null !== n.aoColumns[t].sWidth && (p = ' style="width:' + n.aoColumns[t].sWidth + ';"'), u += "<td" + p + ' tag_index="' + t + '">' + fnGetMaxLenString(n, t) + "</td>"
          } else u += '<td tag_index="' + t + '">' + fnGetMaxLenString(n, t) + "</td>";
          (l = $(d + (c += "</tr>") + (u += "</tr>") + "</table>")[0]).style.width = a + "px", l.style.visibility = "hidden", l.style.position = "absolute", n.nTable.parentNode.appendChild(l);
          var f, h = $("tr:eq(1)>td", l);
          for (t = 0; t < h.length; t++) {
            f = h[t].getAttribute("tag_index");
            var g = $("td", l).eq(t).width(), b = n.aoColumns[t].sWidth ? n.aoColumns[t].sWidth.slice(0, -2) : 0;
            n.aoColumns[f].sWidth = Math.max(g, b) + "px"
          }
          n.nTable.parentNode.removeChild(l)
        }
      }

      function fnGetMaxLenString(n, e) {
        for (var t = 0, a = -1, o = 0; o < n.aoData.length; o++) n.aoData[o]._aData[e].length > t && (t = n.aoData[o]._aData[e].length, a = o);
        return a >= 0 ? n.aoData[a]._aData[e] : ""
      }

      function _fnArrayCmp(n, e) {
        if (n.length != e.length) return 1;
        for (var t = 0; t < n.length; t++) if (n[t] != e[t]) return 2;
        return 0
      }

      function _fnDetectType(n) {
        for (var e = _oExt.aTypes, t = e.length, a = 0; a < t; a++) {
          var o = e[a](n);
          if (null !== o) return o
        }
        return "string"
      }

      function _fnSettingsFromNode(n) {
        for (var e = 0; e < _aoSettings.length; e++) if (_aoSettings[e].nTable == n) return _aoSettings[e];
        return null
      }

      function _fnGetDataMaster(n) {
        for (var e = [], t = n.aoData.length, a = 0; a < t; a++) null === n.aoData[a] ? e.push(null) : e.push(n.aoData[a]._aData);
        return e
      }

      function _fnGetTrNodes(n) {
        for (var e = [], t = n.aoData.length, a = 0; a < t; a++) null === n.aoData[a] ? e.push(null) : e.push(n.aoData[a].nTr);
        return e
      }

      function _fnGetTdNodes(n) {
        var e, t, a, o, i, r, s = _fnGetTrNodes(n), l = [], d = [];
        for (a = 0, o = s.length; a < o; a++) {
          for (l = [], i = 0, r = s[a].childNodes.length; i < r; i++) "TD" == (e = s[a].childNodes[i]).nodeName && l.push(e);
          for (t = 0, i = 0, r = n.aoColumns.length; i < r; i++) n.aoColumns[i].bVisible ? d.push(l[i - t]) : (d.push(n.aoData[a]._anHidden[i]), t++)
        }
        return d
      }

      function _fnEscapeRegex(n) {
        var e = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "g");
        return n.replace(e, "\\$1")
      }

      function _fnReOrderIndex(n, e) {
        for (var t = e.split(","), a = [], o = 0, i = n.aoColumns.length; o < i; o++) for (var r = 0; r < i; r++) if (n.aoColumns[o].sName == t[r]) {
          a.push(r);
          break
        }
        return a
      }

      function _fnColumnOrdering(n) {
        for (var e = "", t = 0, a = n.aoColumns.length; t < a; t++) e += n.aoColumns[t].sName + ",";
        return e.length == a ? "" : e.slice(0, -1)
      }

      function _fnClearTable(n) {
        n.aoData.length = 0, n.aiDisplayMaster.length = 0, n.aiDisplay.length = 0, _fnCalculateEnd(n)
      }

      function _fnSaveState(n) {
        if (n.oFeatures.bStateSave) {
          var e, t = "{";
          for (t += '"iStart": ' + n._iDisplayStart + ",", t += '"iEnd": ' + n._iDisplayEnd + ",", t += '"iLength": ' + n._iDisplayLength + ",", t += '"sFilter": "' + n.oPreviousSearch.sSearch.replace('"', '\\"') + '",', t += '"sFilterEsc": ' + n.oPreviousSearch.bEscapeRegex + ",", t += '"aaSorting": [ ', e = 0; e < n.aaSorting.length; e++) t += "[" + n.aaSorting[e][0] + ",'" + n.aaSorting[e][1] + "'],";
          for (t = t.substring(0, t.length - 1), t += "],", t += '"aaSearchCols": [ ', e = 0; e < n.aoPreSearchCols.length; e++) t += "['" + n.aoPreSearchCols[e].sSearch.replace("'", "'") + "'," + n.aoPreSearchCols[e].bEscapeRegex + "],";
          for (t = t.substring(0, t.length - 1), t += "],", t += '"abVisCols": [ ', e = 0; e < n.aoColumns.length; e++) t += n.aoColumns[e].bVisible + ",";
          t = t.substring(0, t.length - 1), t += "]", t += "}", _fnCreateCookie("SpryMedia_DataTables_" + n.sInstance, t, n.iCookieDuration)
        }
      }

      function _fnLoadState(oSettings, oInit) {
        if (oSettings.oFeatures.bStateSave) {
          var oData, sData = _fnReadCookie("SpryMedia_DataTables_" + oSettings.sInstance);
          if (null !== sData && "" !== sData) {
            try {
              oData = "object" == ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && "function" == typeof JSON.parse ? JSON.parse(sData.replace(/'/g, '"')) : eval("(" + sData + ")")
            } catch (n) {
              return
            }
            if (oSettings._iDisplayStart = oData.iStart, oSettings.iInitDisplayStart = oData.iStart, oSettings._iDisplayEnd = oData.iEnd, oSettings._iDisplayLength = oData.iLength, oSettings.oPreviousSearch.sSearch = oData.sFilter, oSettings.aaSorting = oData.aaSorting.slice(), oSettings.saved_aaSorting = oData.aaSorting.slice(), void 0 !== oData.sFilterEsc && (oSettings.oPreviousSearch.bEscapeRegex = oData.sFilterEsc), void 0 !== oData.aaSearchCols) for (var i = 0; i < oData.aaSearchCols.length; i++) oSettings.aoPreSearchCols[i] = {
              sSearch: oData.aaSearchCols[i][0],
              bEscapeRegex: oData.aaSearchCols[i][1]
            };
            if (void 0 !== oData.abVisCols) for (oInit.saved_aoColumns = [], i = 0; i < oData.abVisCols.length; i++) oInit.saved_aoColumns[i] = {}, oInit.saved_aoColumns[i].bVisible = oData.abVisCols[i]
          }
        }
      }

      function _fnCreateCookie(n, e, t) {
        var a = new Date;
        a.setTime(a.getTime() + 1e3 * t), n += "_" + window.location.pathname.replace(/[\/:]/g, "").toLowerCase(), document.cookie = n + "=" + encodeURIComponent(e) + "; expires=" + a.toGMTString() + "; path=/"
      }

      function _fnReadCookie(n) {
        for (var e = n + "_" + window.location.pathname.replace(/[\/:]/g, "").toLowerCase() + "=", t = document.cookie.split(";"), a = 0; a < t.length; a++) {
          for (var o = t[a]; " " == o.charAt(0);) o = o.substring(1, o.length);
          if (0 === o.indexOf(e)) return decodeURIComponent(o.substring(e.length, o.length))
        }
        return null
      }

      function _fnGetUniqueThs(n) {
        var e = n.getElementsByTagName("tr");
        if (1 == e.length) return e[0].getElementsByTagName("th");
        var t, a, o, i, r, s, l = [], d = [], c = function (n, e, t) {
          for (; void 0 !== n[e][t];) t++;
          return t
        }, u = function (n) {
          void 0 === l[n] && (l[n] = [])
        };
        for (t = 0, i = e.length; t < i; t++) {
          u(t);
          var p = 0, f = [];
          for (a = 0, r = e[t].childNodes.length; a < r; a++) "TD" != e[t].childNodes[a].nodeName && "TH" != e[t].childNodes[a].nodeName || f.push(e[t].childNodes[a]);
          for (a = 0, r = f.length; a < r; a++) {
            var h = 1 * f[a].getAttribute("colspan"), g = 1 * f[a].getAttribute("rowspan");
            if (h && 0 !== h && 1 !== h) {
              for (s = c(l, t, p), o = 0; o < h; o++) l[t][s + o] = 3;
              p += h
            } else {
              if (s = c(l, t, p), l[t][s] = "TD" == f[a].nodeName ? 4 : f[a], g || 0 === g || 1 === g) for (o = 1; o < g; o++) u(t + o), l[t + o][s] = 2;
              p++
            }
          }
        }
        for (t = 0, i = l[0].length; t < i; t++) for (a = 0, r = l.length; a < r; a++) "object" == _typeof(l[a][t]) && d.push(l[a][t]);
        return d
      }

      function _fnMap(n, e, t, a) {
        void 0 === a && (a = t), void 0 !== e[t] && (n[a] = e[t])
      }

      this.oApi._fnInitalise = _fnInitalise, this.oApi._fnLanguageProcess = _fnLanguageProcess, this.oApi._fnAddColumn = _fnAddColumn, this.oApi._fnAddData = _fnAddData, this.oApi._fnGatherData = _fnGatherData, this.oApi._fnDrawHead = _fnDrawHead, this.oApi._fnDraw = _fnDraw, this.oApi._fnAjaxUpdate = _fnAjaxUpdate, this.oApi._fnAddOptionsHtml = _fnAddOptionsHtml, this.oApi._fnFeatureHtmlFilter = _fnFeatureHtmlFilter, this.oApi._fnFeatureHtmlInfo = _fnFeatureHtmlInfo, this.oApi._fnFeatureHtmlPaginate = _fnFeatureHtmlPaginate, this.oApi._fnPageChange = _fnPageChange, this.oApi._fnFeatureHtmlLength = _fnFeatureHtmlLength, this.oApi._fnFeatureHtmlProcessing = _fnFeatureHtmlProcessing, this.oApi._fnProcessingDisplay = _fnProcessingDisplay, this.oApi._fnFilterComplete = _fnFilterComplete, this.oApi._fnFilterColumn = _fnFilterColumn, this.oApi._fnFilter = _fnFilter, this.oApi._fnSortingClasses = _fnSortingClasses, this.oApi._fnVisibleToColumnIndex = _fnVisibleToColumnIndex, this.oApi._fnColumnIndexToVisible = _fnColumnIndexToVisible, this.oApi._fnNodeToDataIndex = _fnNodeToDataIndex, this.oApi._fnVisbleColumns = _fnVisbleColumns, this.oApi._fnBuildSearchArray = _fnBuildSearchArray, this.oApi._fnDataToSearch = _fnDataToSearch, this.oApi._fnCalculateEnd = _fnCalculateEnd, this.oApi._fnConvertToWidth = _fnConvertToWidth, this.oApi._fnCalculateColumnWidths = _fnCalculateColumnWidths, this.oApi._fnArrayCmp = _fnArrayCmp, this.oApi._fnDetectType = _fnDetectType, this.oApi._fnGetDataMaster = _fnGetDataMaster, this.oApi._fnGetTrNodes = _fnGetTrNodes, this.oApi._fnGetTdNodes = _fnGetTdNodes, this.oApi._fnEscapeRegex = _fnEscapeRegex, this.oApi._fnReOrderIndex = _fnReOrderIndex, this.oApi._fnColumnOrdering = _fnColumnOrdering, this.oApi._fnClearTable = _fnClearTable, this.oApi._fnSaveState = _fnSaveState, this.oApi._fnLoadState = _fnLoadState, this.oApi._fnCreateCookie = _fnCreateCookie, this.oApi._fnReadCookie = _fnReadCookie, this.oApi._fnGetUniqueThs = _fnGetUniqueThs, this.oApi._fnReDraw = _fnReDraw;
      var _that = this;
      return this.each(function () {
        var n, e, t, a = 0;
        for (a = 0, n = _aoSettings.length; a < n; a++) if (_aoSettings[a].nTable == this) return alert("DataTables warning: Unable to re-initialise DataTable. Please use the API to make any configuration changes required."), _aoSettings[a];
        var o = new classSettings;
        _aoSettings.push(o);
        var i = !1, r = !1, s = this.getAttribute("id");
        null !== s ? (o.sTableId = s, o.sInstance = s) : o.sInstance = _oExt._oExternConfig.iNextUnique++, o.nTable = this, o.oApi = _that.oApi, null != oInit ? (_fnMap(o.oFeatures, oInit, "bPaginate"), _fnMap(o.oFeatures, oInit, "bLengthChange"), _fnMap(o.oFeatures, oInit, "bFilter"), _fnMap(o.oFeatures, oInit, "bSort"), _fnMap(o.oFeatures, oInit, "bInfo"), _fnMap(o.oFeatures, oInit, "bProcessing"), _fnMap(o.oFeatures, oInit, "bAutoWidth"), _fnMap(o.oFeatures, oInit, "bSortClasses"), _fnMap(o.oFeatures, oInit, "bServerSide"), _fnMap(o, oInit, "asStripClasses"), _fnMap(o, oInit, "fnRowCallback"), _fnMap(o, oInit, "fnHeaderCallback"), _fnMap(o, oInit, "fnFooterCallback"), _fnMap(o, oInit, "fnInitComplete"), _fnMap(o, oInit, "fnServerData"), _fnMap(o, oInit, "aaSorting"), _fnMap(o, oInit, "aaSortingFixed"), _fnMap(o, oInit, "sPaginationType"), _fnMap(o, oInit, "sAjaxSource"), _fnMap(o, oInit, "iCookieDuration"), _fnMap(o, oInit, "sDom"), _fnMap(o, oInit, "oSearch", "oPreviousSearch"), _fnMap(o, oInit, "aoSearchCols", "aoPreSearchCols"), _fnMap(o, oInit, "iDisplayLength", "_iDisplayLength"), _fnMap(o, oInit, "bJQueryUI", "bJUI"), "function" == typeof oInit.fnDrawCallback && o.aoDrawCallback.push({
          fn: oInit.fnDrawCallback,
          sName: "user"
        }), o.oFeatures.bServerSide && o.oFeatures.bSort && o.oFeatures.bSortClasses && o.aoDrawCallback.push({
          fn: _fnSortingClasses,
          sName: "server_side_sort_classes"
        }), void 0 !== oInit.bJQueryUI && oInit.bJQueryUI && (o.oClasses = _oExt.oJUIClasses, void 0 === oInit.sDom && (o.sDom = '<"H"lfr>t<"F"ip>')), void 0 !== oInit.iDisplayStart && void 0 === o.iInitDisplayStart && (o.iInitDisplayStart = oInit.iDisplayStart, o._iDisplayStart = oInit.iDisplayStart), void 0 !== oInit.bStateSave && (o.oFeatures.bStateSave = oInit.bStateSave, _fnLoadState(o, oInit), o.aoDrawCallback.push({
          fn: _fnSaveState,
          sName: "state_save"
        })), void 0 !== oInit.aaData && (r = !0), void 0 !== oInit && void 0 !== oInit.aoData && (oInit.aoColumns = oInit.aoData), void 0 !== oInit.oLanguage && (void 0 !== oInit.oLanguage.sUrl && "" !== oInit.oLanguage.sUrl ? (o.oLanguage.sUrl = oInit.oLanguage.sUrl, $.getJSON(o.oLanguage.sUrl, null, function (n) {
          _fnLanguageProcess(o, n, !0)
        }), i = !0) : _fnLanguageProcess(o, oInit.oLanguage, !1))) : oInit = {}, void 0 === oInit.asStripClasses && (o.asStripClasses.push(o.oClasses.sStripOdd), o.asStripClasses.push(o.oClasses.sStripEven));
        var l = this.getElementsByTagName("thead"), d = 0 === l.length ? null : _fnGetUniqueThs(l[0]),
          c = void 0 !== oInit.aoColumns;
        for (a = 0, n = c ? oInit.aoColumns.length : d.length; a < n; a++) {
          var u = c ? oInit.aoColumns[a] : null, p = d ? d[a] : null;
          void 0 !== oInit.saved_aoColumns && oInit.saved_aoColumns.length == n && (null === u && (u = {}), u.bVisible = oInit.saved_aoColumns[a].bVisible), _fnAddColumn(o, u, p)
        }
        for (a = 0, n = o.aaSorting.length; a < n; a++) {
          var f = o.aoColumns[o.aaSorting[a][0]];
          for (void 0 === o.aaSorting[a][2] && (o.aaSorting[a][2] = 0), void 0 === oInit.aaSorting && void 0 === o.saved_aaSorting && (o.aaSorting[a][1] = f.asSorting[0]), e = 0, t = f.asSorting.length; e < t; e++) if (o.aaSorting[a][1] == f.asSorting[e]) {
            o.aaSorting[a][2] = e;
            break
          }
        }
        if (0 === this.getElementsByTagName("thead").length && this.appendChild(document.createElement("thead")), 0 === this.getElementsByTagName("tbody").length && this.appendChild(document.createElement("tbody")), r) for (a = 0; a < oInit.aaData.length; a++) _fnAddData(o, oInit.aaData[a]); else _fnGatherData(o);
        o.aiDisplay = o.aiDisplayMaster.slice(), o.oFeatures.bAutoWidth && _fnCalculateColumnWidths(o), o.bInitialised = !0, !1 === i && _fnInitalise(o)
      })
    }
  }(jQuery), $.fn.dataTableExt.oApi.fnLengthChangeRelative = function (n, e) {
    n._iDisplayLength += e, n.oApi._fnCalculateEnd(n), n._iDisplayLength < 10 && (n._iDisplayLength = 10), n._iDisplayEnd == n.aiDisplay.length && (n._iDisplayStart = n._iDisplayEnd - n._iDisplayLength, n._iDisplayStart < 0 && (n._iDisplayStart = 0)), -1 == n._iDisplayLength && (n._iDisplayStart = 0), n.oApi._fnDraw(n), $("select", n.oFeatures.l).val(e)
  }, $.fn.dataTableExt.oPagination.iTweenTime = 50, $.fn.dataTableExt.oPagination.fnRunAnimation = function (n, e) {
    var t = $.fn.dataTableExt.oPagination.iTweenTime;
    !function a() {
      n.iPagingLoopStart > n.iPagingEnd ? (n.iPagingLoopStart--, n._iDisplayStart = n.iPagingLoopStart, e(n), setTimeout(function () {
        a()
      }, t)) : n.iPagingLoopStart < n.iPagingEnd ? (n.iPagingLoopStart++, n._iDisplayStart = n.iPagingLoopStart, e(n), setTimeout(function () {
        a()
      }, t)) : n.iPagingLoopStart = -1
    }()
  }, $.fn.dataTableExt.oPagination.full_numbers = {
    fnInit: function (n, e, t) {
      var a = document.createElement("span"), o = document.createElement("span"), i = document.createElement("span"),
        r = document.createElement("span"), s = document.createElement("span");
      a.innerHTML = n.oLanguage.oPaginate.sFirst, o.innerHTML = n.oLanguage.oPaginate.sPrevious, r.innerHTML = n.oLanguage.oPaginate.sNext, s.innerHTML = n.oLanguage.oPaginate.sLast;
      var l = n.oClasses;
      a.className = l.sPageButton + " " + l.sPageFirst, o.className = l.sPageButton + " " + l.sPagePrevious, r.className = l.sPageButton + " " + l.sPageNext, s.className = l.sPageButton + " " + l.sPageLast, e.appendChild(a), e.appendChild(o), e.appendChild(i), e.appendChild(r), e.appendChild(s), $(a).click(function () {
        void 0 !== n.iPagingLoopStart && -1 != n.iPagingLoopStart || (n.iPagingLoopStart = n._iDisplayStart, n.iPagingEnd = 0, $.fn.dataTableExt.oPagination.fnRunAnimation(n, t))
      }), $(o).click(function () {
        void 0 !== n.iPagingLoopStart && -1 != n.iPagingLoopStart || (n.iPagingLoopStart = n._iDisplayStart, n.iPagingEnd = n._iDisplayStart - n._iDisplayLength, n.iPagingEnd < 0 && (n.iPagingEnd = 0), $.fn.dataTableExt.oPagination.fnRunAnimation(n, t))
      }), $(r).click(function () {
        void 0 !== n.iPagingLoopStart && -1 != n.iPagingLoopStart || (n._iDisplayStart + n._iDisplayLength < n.fnRecordsDisplay() && (n.iPagingEnd = n._iDisplayStart + n._iDisplayLength), n.iPagingLoopStart = n._iDisplayStart, $.fn.dataTableExt.oPagination.fnRunAnimation(n, t))
      }), $(s).click(function () {
        if (void 0 === n.iPagingLoopStart || -1 == n.iPagingLoopStart) {
          if (n._iDisplayLength >= 0) {
            var e = parseInt((n.fnRecordsDisplay() - 1) / n._iDisplayLength, 10) + 1;
            n.iPagingEnd = (e - 1) * n._iDisplayLength
          } else n.iPagingEnd = 0;
          n.iPagingLoopStart = n._iDisplayStart, $.fn.dataTableExt.oPagination.fnRunAnimation(n, t)
        }
      }), $("span", e).bind("mousedown", function () {
        return !1
      }).bind("selectstart", function () {
        return !1
      })
    }, fnUpdate: function (n, e) {
      if (n.aanFeatures.p) {
        var t, a, o, i, r = $.fn.dataTableExt.oPagination.iFullNumbersShowPages, s = Math.floor(r / 2),
          l = Math.ceil(n.fnRecordsDisplay() / n._iDisplayLength),
          d = Math.ceil(n._iDisplayStart / n._iDisplayLength) + 1, c = "", u = n.oClasses;
        for (l < r ? (t = 1, a = l) : d <= s ? (t = 1, a = r) : d >= l - s ? (t = l - r + 1, a = l) : a = (t = d - Math.ceil(r / 2) + 1) + r - 1, o = t; o <= a; o++) c += d != o ? '<span class="' + u.sPageButton + '">' + o + "</span>" : '<span class="' + u.sPageButtonActive + '">' + o + "</span>";
        var p, f, h, g = n.aanFeatures.p, b = function () {
          var t = 1 * this.innerHTML - 1;
          return n.iPagingLoopStart = n._iDisplayStart, n.iPagingEnd = t * n._iDisplayLength, n.iPagingEnd < 0 && (n.iPagingEnd = 0), $.fn.dataTableExt.oPagination.fnRunAnimation(n, e), !1
        }, m = function () {
          return !1
        };
        for (o = 0, i = g.length; o < i; o++) 0 !== g[o].childNodes.length && ((h = g[o].childNodes[2]).innerHTML = c, $("span", h).click(b).bind("mousedown", m).bind("selectstart", m), f = [(p = g[o].getElementsByTagName("span"))[0], p[1], p[p.length - 2], p[p.length - 1]], $(f).removeClass(u.sPageButton + " " + u.sPageButtonActive + " " + u.sPageButtonStaticDisabled), 1 == d ? (f[0].className += " " + u.sPageButtonStaticDisabled, f[1].className += " " + u.sPageButtonStaticDisabled) : (f[0].className += " " + u.sPageButton, f[1].className += " " + u.sPageButton), 0 === l || d == l || -1 == n._iDisplayLength ? (f[2].className += " " + u.sPageButtonStaticDisabled, f[3].className += " " + u.sPageButtonStaticDisabled) : (f[2].className += " " + u.sPageButton, f[3].className += " " + u.sPageButton))
      }
    }
  }, jQuery.fn.highlight = function (n) {
    return this.each(function () {
      !function n(e, t) {
        var a = 0;
        if (3 == e.nodeType) {
          var o = e.data.toUpperCase().indexOf(t);
          if (o >= 0) {
            var i = document.createElement("span");
            i.className = "highlight";
            var r = e.splitText(o), s = (r.splitText(t.length), r.cloneNode(!0));
            i.appendChild(s), r.parentNode.replaceChild(i, r), a = 1
          }
        } else if (1 == e.nodeType && e.childNodes && !/(script|style)/i.test(e.tagName)) for (var l = 0; l < e.childNodes.length; ++l) l += n(e.childNodes[l], t);
        return a
      }(this, n.toUpperCase())
    })
  }, jQuery.fn.removeHighlight = function () {
    return this.find("span.highlight").each(function () {
      var n = this.parentNode;
      n.replaceChild(this.firstChild, this), n.normalize()
    }).end()
  }, function (n) {
    n.fn.jTruncate = function (e) {
      e = n.extend({
        length: 300,
        minTrail: 20,
        moreText: "more",
        lessText: "less",
        ellipsisText: "...",
        moreAni: "",
        lessAni: ""
      }, e);
      return this.each(function () {
        obj = n(this);
        var t = obj.html();
        if (t.length > e.length + e.minTrail && -1 != (a = t.indexOf(" ", e.length))) {
          var a = t.indexOf(" ", e.length), o = t.substring(0, a), i = t.substring(a, t.length - 1);
          obj.html(o + '<span class="truncate_ellipsis">' + e.ellipsisText + '</span><span class="truncate_more">' + i + "</span>"), obj.find(".truncate_more").css("display", "none"), obj.append('<div class="clearboth"><a href="#" class="truncate_more_link">' + e.moreText + "</a></div>");
          var r = n(".truncate_more_link", obj), s = n(".truncate_more", obj), l = n(".truncate_ellipsis", obj);
          r.click(function () {
            return r.text() == e.moreText ? (s.show(e.moreAni), r.text(e.lessText), l.css("display", "none")) : (s.hide(e.lessAni), r.text(e.moreText), l.css("display", "inline")), !1
          })
        }
      })
    }
  }(jQuery), function () {
    var n = new Object, e = new Object, t = 0;
    jQuery.fn.columnize = function (a) {
      return a = jQuery.extend({
        column: "column",
        continued: "continued",
        columns: 2,
        balance: !0,
        height: !1,
        minHeight: !1,
        cache: !0,
        dontsplit: ""
      }, a), this.each(function () {
        var o = jQuery(this), i = this.id;
        i || (i = "jcols_" + t, this.id = i, t++), n[this.id] && a.cache || (n[this.id] = o.clone(!0)), function (t, a, o) {
          var i, r, s, l, d = new Array, c = jQuery(t);

          function u() {
            (s = document.createElement("DIV")).className = a.column, c.append(s), l = s, r = jQuery(s).width(), d.push(s);
            for (var n = 0; n < v.length; n++) x = v[n].cloneNode(!1), (0 == n || k) && jQuery(x).addClass(a.continued), l.appendChild(x), l = x
          }

          function p(n) {
            var e = parseInt(jQuery(n).css("marginBottom"));
            "NaN" == e.toString() && (e = 0);
            for (var a = jQuery(n).parents(), o = 0; o < a.length && a[o] != t; o++) {
              var i = parseInt(jQuery(a[o]).css("marginBottom"));
              "NaN" != i.toString() && (e = Math.max(e, i))
            }
            return e
          }

          function f() {
            for (; m && l && !m.nextSibling;) m = m.parentNode, l = l.parentNode, v.pop();
            m && (m = m.nextSibling)
          }

          e[t.id] = a.columns, c.empty();
          var h = a.height ? a.height : parseInt(c.css("maxHeight"));
          if (o || isNaN(h) || 0 == h) {
            (s = document.createElement("DIV")).className = a.column, jQuery(s).append(jQuery(n[t.id]).html()), c.append(s);
            var g = parseInt(c.css("lineHeight"));
            g || (g = Math.ceil(1.2 * parseInt(c.css("fontSize")))), (i = Math.ceil(jQuery(s).height() / a.columns)) % g > 0 && (i += g), t.removeChild(s), h > 0 && i > h && (i = h)
          } else i = h;
          var b = a.minHeight ? a.minHeight : parseInt(c.css("minHeight"));
          b && (i = Math.max(i, b));
          var m = n[t.id].children(":first")[0], v = new Array, _ = 0;
          if (u(), 0 == i || 0 == r) return !1;
          for (; m;) if (1 == m.nodeType) {
            var y = jQuery(m);
            if (y.hasClass("dontSplit") || y.is(a.dontsplit)) {
              var x = m.cloneNode(!0);
              l.appendChild(x), s.offsetHeight > i && u(), f()
            } else {
              if (x = m.cloneNode(!1), l.appendChild(x), s.offsetHeight - p(l) > i) {
                l.removeChild(x);
                var S = x;
                u(), l.appendChild(S), x = S
              }
              m.firstChild ? (v.push(m.cloneNode(!1)), l = x, m = m.firstChild) : f()
            }
            _ = 1
          } else if (3 == m.nodeType) {
            x = document.createTextNode(""), l.appendChild(x);
            for (var C = p(l), D = m.data.split(" "), w = 0; w < D.length; w++) {
              var k;
              3 == _ && x.appendData(" "), x.appendData(D[w]), l.removeChild(x), l.appendChild(x), s.offsetHeight - C > i && (x.data = x.data.substr(0, x.data.length - D[w].length - 1), "" == jQuery(l).text() ? (jQuery(l).remove(), k = !1) : k = !0, u(), x = document.createTextNode(D[w]), l.appendChild(x)), _ = 3
            }
            f(), _ = 0
          } else f(), _ = m.nodeType;
          return d
        }(this, a, a.balance) || o.append(n[this.id].children().clone(!0))
      }), this
    }
  }()
}, function (n, e, t) {
  var a = t(2);
  "string" == typeof a && (a = [[n.i, a, ""]]);
  var o = {hmr: !0, transform: void 0, insertInto: void 0};
  t(4)(a, o);
  a.locals && (n.exports = a.locals)
}, function (n, e, t) {
  (n.exports = t(3)(!1)).push([n.i, '/**\n * Styles here will load for all users, but only if JavaScript is enabled.\n * At time of writing, this stylesheet is render blocking unless a page that\n * is passed through the template engine enables \'v2\' via `page.v2 = True`\n * The long term plan for this stylesheet is not to be render blocking\n * on all pages.\n */\n/**\n * JS only module.\n * Defined in:\n * - vendor/js/jquery-datatables/jquery.dataTables.min.js\n * It will be refactored at the earliest opportunity.\n * DO NOT ADD NEW CSS here\n * Unless... you are removing an inline style and moving it into here.\n *\n * We are currently in the process of:\n * - moving styles from this file into the components\n * - removing dead code\n * - removing redundant CSS in favor of common reusable styles\n *\n * DO NOT ADD NEW CSS HERE\n */\n.FixedHeader_Cloned th {\n  background-color: hsl(0, 0%, 100%);\n}\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n * DataTables features\n */\n.dataTables_wrapper {\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  position: relative;\n  z-index: 1;\n  margin: 15px 0;\n  clear: both;\n  zoom: 1;\n  /* Feeling sorry for IE */\n}\n.dataTables_processing {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 250px;\n  height: 30px;\n  margin-left: -125px;\n  margin-top: -15px;\n  padding: 14px 0 5px;\n  border: 1px solid hsl(0, 0%, 87%);\n  text-align: center;\n  color: hsl(0, 0%, 80%);\n  font-size: 14px;\n  background-color: hsl(0, 0%, 100%);\n}\n.dataTables_length {\n  width: 40%;\n  font-size: 12px;\n  color: hsl(40, 32%, 29%);\n  display: none;\n}\n.dataTables_filter {\n  width: 50%;\n  float: right;\n  text-align: right;\n  font-size: 12px;\n  color: hsl(40, 32%, 29%);\n}\n.dataTables_info {\n  width: 100%;\n  font-size: 12px;\n  color: hsl(40, 32%, 29%);\n  margin-top: 20px;\n}\n.dataTables_paginate {\n  width: 44px;\n  *width: 50px;\n  text-align: right;\n  font-size: 12px;\n  color: hsl(40, 32%, 29%);\n}\n/* Pagination nested */\n.paginate_disabled_previous,\n.paginate_enabled_previous,\n.paginate_disabled_next,\n.paginate_enabled_next {\n  height: 19px;\n  width: 19px;\n  margin-left: 3px;\n  float: left;\n}\n.paginate_disabled_previous {\n  background-image: url(/images/back_disabled.png);\n}\n.paginate_enabled_previous {\n  background-image: url(/images/back_enabled.png);\n}\n.paginate_disabled_next {\n  background-image: url(/images/forward_disabled.png);\n}\n.paginate_enabled_next {\n  background-image: url(/images/forward_enabled.png);\n}\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n * DataTables display\n */\ntable.display {\n  float: left;\n  margin: 0 auto;\n  width: 918px;\n  clear: both;\n}\ntable.display thead th {\n  cursor: pointer;\n  *cursor: hand;\n}\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n * DataTables sorting\n */\n.sorting_asc {\n  background-image: url(/images/sort_asc.png);\n  background-repeat: no-repeat;\n  background-position: 90% 6px;\n}\n.sorting_desc {\n  background-image: url(/images/sort_desc.png);\n  background-repeat: no-repeat;\n  background-position: 90% 6px;\n}\n.sorting {\n  background-image: url(/images/sort_both.png);\n  background-repeat: no-repeat;\n  background-position: 90% 6px;\n}\n.sorting_asc_disabled {\n  background-image: url(/images/sort_asc_disabled.png);\n  background-repeat: no-repeat;\n  background-position: 90% 6px;\n}\n.sorting_desc_disabled {\n  background-image: url(/images/sort_desc_disabled.png);\n  background-repeat: no-repeat;\n  background-position: 90% 6px;\n}\n.sorting:hover {\n  text-decoration: none;\n}\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n * DataTables row classes\n */\ntable.display tr.odd.gradeA {\n  background-color: hsl(120, 100%, 93%);\n}\ntable.display tr.even.gradeA {\n  background-color: hsl(120, 100%, 93%);\n}\ntable.display tr.odd.gradeC {\n  background-color: hsl(240, 100%, 93%);\n}\ntable.display tr.even.gradeC {\n  background-color: hsl(240, 100%, 93%);\n}\ntable.display tr.odd.gradeX {\n  background-color: hsl(0, 100%, 93%);\n}\ntable.display tr.even.gradeX {\n  background-color: hsl(0, 100%, 93%);\n}\ntable.display tr.odd.gradeU {\n  background-color: hsl(0, 0%, 87%);\n}\ntable.display tr.even.gradeU {\n  background-color: hsl(0, 0%, 93%);\n}\ntr.even,\ntr.odd {\n  background-color: hsl(0, 0%, 100%);\n  border-bottom: 1px solid hsl(0, 0%, 60%);\n}\n/*\n * KeyTable\n */\ntable.KeyTable td {\n  border: 3px solid transparent;\n}\ntable.KeyTable td.focus {\n  border: 3px solid hsl(225, 100%, 60%);\n}\ntable.display tr.gradeA {\n  background-color: hsl(120, 100%, 93%);\n}\ntable.display tr.gradeC {\n  background-color: hsl(240, 100%, 93%);\n}\ntable.display tr.gradeX {\n  background-color: hsl(0, 100%, 93%);\n}\ntable.display tr.gradeU {\n  background-color: hsl(0, 0%, 87%);\n}\ndiv.box {\n  height: 100px;\n  padding: 10px;\n  overflow: auto;\n  border: 1px solid hsl(240, 100%, 75%);\n  background-color: hsl(240, 100%, 93%);\n}\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n * Misc\n */\n.dataTable_wrapper .top,\n.dataTable_wrapper .bottom {\n  padding: 15px;\n  background-color: transparent;\n  border: none;\n}\n.top .dataTables_info {\n  float: none;\n}\n.dataTables_empty {\n  text-align: center;\n  font-size: 14px;\n  font-weight: normal;\n  padding: 15px 0;\n  color: hsl(8, 78%, 53%);\n}\ntfoot input {\n  margin: 0.5em 0;\n  width: 100%;\n  color: hsl(0, 0%, 27%);\n}\ntfoot input.search_init {\n  color: hsl(0, 0%, 80%);\n}\ntd.group {\n  background-color: hsl(330, 2%, 82%);\n  border-bottom: 2px solid hsl(330, 3%, 62%);\n  border-top: 2px solid hsl(330, 3%, 62%);\n}\ntd.details {\n  background-color: hsl(330, 2%, 82%);\n  border: 2px solid hsl(330, 3%, 62%);\n}\n.example_alt_pagination div.dataTables_info {\n  width: 60%;\n}\n.paging_full_numbers {\n  width: 100%;\n  margin-top: 15px;\n  line-height: 20px;\n}\n.paging_full_numbers span.paginate_button,\n.paging_full_numbers span.paginate_active {\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  font-size: 11px;\n  border: 1px solid hsl(0, 0%, 87%);\n  padding: 7px;\n  margin: 0 5px;\n  color: hsl(202, 96%, 28%);\n  cursor: pointer;\n  *cursor: hand;\n}\n.paging_full_numbers span.paginate_button {\n  background-color: hsl(0, 0%, 100%);\n}\n.paging_full_numbers span.paginate_button:hover {\n  background: hsl(202, 96%, 28%);\n  color: hsl(0, 0%, 100%);\n  text-decoration: none;\n}\n.paging_full_numbers span.paginate_active {\n  color: hsl(0, 0%, 0%);\n  background-color: hsl(0, 0%, 95%);\n}\ntable.display tr.even.row_selected td {\n  background-color: hsl(220, 35%, 77%);\n}\ntable.display tr.odd.row_selected td {\n  background-color: hsl(221, 35%, 72%);\n}\n/*\n * Sorting classes for columns\n */\n/* For the standard odd/even */\ntr.odd td.sorting_1 {\n  background-color: hsl(0, 0%, 100%);\n}\ntr.odd td.sorting_2 {\n  background-color: hsl(0, 0%, 100%);\n}\ntr.odd td.sorting_3 {\n  background-color: hsl(0, 0%, 100%);\n}\ntr.even td.sorting_1 {\n  background-color: hsl(0, 0%, 100%);\n}\ntr.even td.sorting_2 {\n  background-color: hsl(0, 0%, 100%);\n}\ntr.even td.sorting_3 {\n  background-color: hsl(0, 0%, 100%);\n}\n/* For the Conditional-CSS grading rows */\n/*\n \tColour calculations (based off the main row colours)\n  Level 1:\n\t\tdd > c4\n\t\tee > d5\n\tLevel 2:\n\t  dd > d1\n\t  ee > e2\n */\ntr.odd.gradeA td.sorting_1 {\n  background-color: hsl(120, 100%, 88%);\n}\ntr.odd.gradeA td.sorting_2 {\n  background-color: hsl(120, 100%, 93%);\n}\ntr.odd.gradeA td.sorting_3 {\n  background-color: hsl(120, 100%, 93%);\n}\ntr.even.gradeA td.sorting_1 {\n  background-color: hsl(120, 100%, 93%);\n}\ntr.even.gradeA td.sorting_2 {\n  background-color: hsl(120, 100%, 93%);\n}\ntr.even.gradeA td.sorting_3 {\n  background-color: hsl(120, 100%, 93%);\n}\ntr.odd.gradeC td.sorting_1 {\n  background-color: hsl(240, 100%, 88%);\n}\ntr.odd.gradeC td.sorting_2 {\n  background-color: hsl(240, 100%, 93%);\n}\ntr.odd.gradeC td.sorting_3 {\n  background-color: hsl(240, 100%, 93%);\n}\ntr.even.gradeC td.sorting_1 {\n  background-color: hsl(240, 100%, 93%);\n}\ntr.even.gradeC td.sorting_2 {\n  background-color: hsl(240, 100%, 93%);\n}\ntr.even.gradeC td.sorting_3 {\n  background-color: hsl(240, 100%, 93%);\n}\ntr.odd.gradeX td.sorting_1 {\n  background-color: hsl(0, 100%, 88%);\n}\ntr.odd.gradeX td.sorting_2 {\n  background-color: hsl(0, 100%, 93%);\n}\ntr.odd.gradeX td.sorting_3 {\n  background-color: hsl(0, 100%, 93%);\n}\ntr.even.gradeX td.sorting_1 {\n  background-color: hsl(0, 100%, 93%);\n}\ntr.even.gradeX td.sorting_2 {\n  background-color: hsl(0, 100%, 93%);\n}\ntr.even.gradeX td.sorting_3 {\n  background-color: hsl(0, 100%, 93%);\n}\ntr.odd.gradeU td.sorting_1 {\n  background-color: hsl(0, 0%, 60%);\n}\ntr.odd.gradeU td.sorting_2 {\n  background-color: hsl(0, 0%, 60%);\n}\ntr.odd.gradeU td.sorting_3 {\n  background-color: hsl(0, 0%, 60%);\n}\ntr.even.gradeU td.sorting_1 {\n  background-color: hsl(0, 0%, 87%);\n}\ntr.even.gradeU td.sorting_2 {\n  background-color: hsl(0, 0%, 87%);\n}\ntr.even.gradeU td.sorting_3 {\n  background-color: hsl(0, 0%, 87%);\n}\n/*\n * Row highlighting example\n */\n.ex_highlight #example tbody tr.even:hover,\n#example tbody tr.even td.highlighted {\n  background-color: hsl(75, 100%, 85%);\n}\n.ex_highlight #example tbody tr.odd:hover,\n#example tbody tr.odd td.highlighted {\n  background-color: hsl(75, 100%, 85%);\n}\n@media only screen and (max-width: 768px) {\n  .dataTables_paginate.paging_full_numbers {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-wrap: wrap;\n  }\n  span.number {\n    order: 4;\n    margin: 10px;\n  }\n}\n/**\n * DO NOT ADD NEW CSS here\n * Unless... you are removing an inline style and moving it into here.\n *\n * We are currently in the process of:\n * - moving styles from this file into the components\n * - removing dead code\n * - removing redundant CSS in favor of common reusable styles\n *\n * DO NOT ADD NEW CSS HERE\n */\n.ui-widget-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: hsl(0, 0%, 0%);\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  z-index: 9999 !important;\n}\n.ui-sortable {\n  min-height: 90px;\n  max-height: 270px;\n  overflow: auto;\n}\n.ui-sortable-placeholder {\n  border: 1px dotted hsl(0, 0%, 60%);\n  visibility: visible !important;\n  height: 70px !important;\n  border-radius: 6px;\n}\n.ui-sortable-placeholder * {\n  visibility: hidden;\n}\n/* Slider */\n.slick-slider {\n  position: relative;\n  display: block;\n  box-sizing: border-box;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -khtml-user-select: none;\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n  -webkit-tap-highlight-color: transparent;\n}\n.slick-list {\n  position: relative;\n  display: block;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n}\n.slick-list:focus {\n  outline: none;\n}\n.slick-list.dragging {\n  cursor: pointer;\n  cursor: hand;\n}\n.slick-slider .slick-track,\n.slick-slider .slick-list {\n  -webkit-transform: translate3d(0, 0, 0);\n  -moz-transform: translate3d(0, 0, 0);\n  -ms-transform: translate3d(0, 0, 0);\n  -o-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.slick-track {\n  position: relative;\n  top: 0;\n  left: 0;\n  display: block;\n}\n.slick-track:before,\n.slick-track:after {\n  display: table;\n  content: \'\';\n}\n.slick-track:after {\n  clear: both;\n}\n.slick-loading .slick-track {\n  visibility: hidden;\n}\n.slick-slide {\n  display: none;\n  min-height: 1px;\n}\n[dir=\'rtl\'] .slick-slide {\n  float: right;\n}\n.slick-slide img {\n  display: block;\n}\n.slick-slide.slick-loading img {\n  display: none;\n}\n.slick-slide.dragging img {\n  pointer-events: none;\n}\n.slick-initialized .slick-slide {\n  display: block;\n}\n.slick-loading .slick-slide {\n  visibility: hidden;\n}\n.slick-vertical .slick-slide {\n  display: block;\n  height: auto;\n  border: 1px solid transparent;\n}\n.slick-arrow.slick-hidden {\n  display: none;\n}\n/* Slider */\n.slick-loading .slick-list {\n  background: #fff url(/static/css/ajax-loader.gif) center center no-repeat;\n}\n/* Icons */\n@font-face {\n  font-family: \'slick\';\n  font-weight: normal;\n  font-style: normal;\n  src: url(/static/css/fonts/slick.eot);\n  src: url(/static/css/fonts/slick.eot?#iefix) format(\'embedded-opentype\'), url(/static/css/fonts/slick.woff) format(\'woff\'), url(/static/css/fonts/slick.ttf) format(\'truetype\'), url(/static/css/fonts/slick.svg#slick) format(\'svg\');\n}\n/* Arrows */\n.slick-prev,\n.slick-next {\n  font-size: 0;\n  line-height: 0;\n  position: absolute;\n  top: 50%;\n  display: block;\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  padding: 0;\n  cursor: pointer;\n  color: transparent;\n  border: none;\n  outline: none;\n  background: transparent;\n}\n.slick-prev:hover,\n.slick-prev:focus,\n.slick-next:hover,\n.slick-next:focus {\n  color: transparent;\n  outline: none;\n  background: transparent;\n}\n.slick-prev:hover:before,\n.slick-prev:focus:before,\n.slick-next:hover:before,\n.slick-next:focus:before {\n  opacity: 1;\n}\n.slick-prev.slick-disabled:before,\n.slick-next.slick-disabled:before {\n  opacity: 0.25;\n}\n.slick-prev:before,\n.slick-next:before {\n  font-family: \'slick\';\n  font-size: 20px;\n  line-height: 1;\n  opacity: 0.75;\n  color: white;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.slick-prev {\n  left: -25px;\n}\n[dir=\'rtl\'] .slick-prev {\n  right: -25px;\n  left: auto;\n}\n.slick-prev:before {\n  content: \'←\';\n}\n[dir=\'rtl\'] .slick-prev:before {\n  content: \'→\';\n}\n.slick-next {\n  right: -25px;\n}\n[dir=\'rtl\'] .slick-next {\n  right: auto;\n  left: -25px;\n}\n.slick-next:before {\n  content: \'→\';\n}\n[dir=\'rtl\'] .slick-next:before {\n  content: \'←\';\n}\n/* Dots */\n.slick-dots {\n  position: absolute;\n  bottom: -45px;\n  display: block;\n  width: 100%;\n  padding: 0;\n  list-style: none;\n  text-align: center;\n}\n.slick-dots li {\n  position: relative;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 0 5px;\n  padding: 0;\n  cursor: pointer;\n}\n.slick-dots li button {\n  font-size: 0;\n  line-height: 0;\n  display: block;\n  width: 20px;\n  height: 20px;\n  padding: 5px;\n  cursor: pointer;\n  color: transparent;\n  border: 0;\n  outline: none;\n  background: transparent;\n}\n.slick-dots li button:hover,\n.slick-dots li button:focus {\n  outline: none;\n}\n.slick-dots li button:hover:before,\n.slick-dots li button:focus:before {\n  opacity: 1;\n}\n.slick-dots li button:before {\n  font-family: \'slick\';\n  font-size: 6px;\n  line-height: 20px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 20px;\n  height: 20px;\n  content: \'•\';\n  text-align: center;\n  opacity: 0.25;\n  color: black;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.slick-dots li.slick-active button:before {\n  opacity: 0.75;\n  color: black;\n}\n.carousel-container .slick-slider {\n  overflow: visible;\n}\n.carousel .slick-prev,\n.carousel .slick-next {\n  width: auto;\n  height: auto;\n}\n.carousel .slick-prev:before,\n.carousel .slick-next:before,\n.carousel .slick-prev:before,\n.carousel .slick-next:before {\n  color: hsl(211, 97%, 61%);\n  font-size: 35px;\n}\n.carousel .slick-prev:before {\n  margin-left: 15px;\n}\n.carousel .slick-next {\n  margin-right: 11px;\n}\n/**\n * HeaderBar (JS)\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#headerbar\n * This stylesheet will only apply if JS is present on the page.\n */\n.search-facet select {\n  padding: 10px;\n  top: 2px;\n  left: 2px;\n}\n/* COLORBOX POP-UP */\n#colorbox,\n#cboxOverlay,\n#cboxWrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 999999;\n}\n#colorbox {\n  box-sizing: content-box;\n}\n#colorbox > * {\n  box-sizing: content-box;\n}\n#cboxOverlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background: hsl(39, 32%, 17%);\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n#cboxMiddleLeft,\n#cboxBottomLeft {\n  clear: left;\n}\n#cboxTitle {\n  margin: 0;\n  display: none !important;\n}\n#cboxLoadingOverlay,\n#cboxLoadingGraphic {\n  position: absolute;\n  top: 25px;\n  left: 25px;\n  width: 100%;\n}\n#cboxPrevious,\n#cboxNext,\n#cboxClose,\n#cboxSlideshow {\n  cursor: pointer;\n}\n#cboxContent {\n  position: relative;\n  background: hsl(0, 0%, 100%);\n  padding: 0;\n  border: 10px solid hsl(40, 32%, 29%);\n  border-radius: 12px;\n  -webkit-box-shadow: 1px 3px 10px hsl(0, 0%, 0%);\n  box-shadow: 1px 3px 10px hsl(0, 0%, 0%);\n}\n#cboxLoadedContent {\n  background: hsl(0, 0%, 100%);\n  margin: 0;\n  overflow: visible !important;\n}\n#cboxLoadedContent iframe {\n  display: block;\n  border: 0;\n}\n#cboxLoadingOverlay {\n  background: transparent;\n}\n#cboxClose {\n  display: none !important;\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 32px;\n  height: 32px;\n  background-image: url(/images/icons/icon_close-pop.png);\n  background-position: 0 0;\n  background-repeat: no-repeat;\n}\n#cboxClose:hover {\n  background-position: 0 -32px;\n}\ndiv.imageIntro {\n  margin: 10px;\n}\na.floaterShut {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: block;\n  width: 32px;\n  height: 32px;\n  background-image: url(/images/icons/icon_close-pop.png);\n  background-position: 0 0;\n  background-repeat: no-repeat;\n}\na.floaterShut:hover {\n  background-position: 0 -32px;\n}\na.floaterClose {\n  color: hsl(8, 78%, 53%);\n  font-size: 1em;\n  padding-left: 20px;\n}\n/* VIEW LARGER COVER POP-UP */\ndiv.coverFloat {\n  position: relative;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  background: hsl(0, 0%, 100%);\n  text-align: left;\n}\ndiv.coverFloat a.floaterShut {\n  text-indent: 999px;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: block;\n  width: 16px;\n  height: 16px;\n  background-image: url(/images/icons/icon_close-pop-sm.png);\n  background-position: 0 0;\n  background-repeat: no-repeat;\n}\ndiv.coverFloat a.floaterShut:hover {\n  background-position: 0 -16px;\n}\ndiv.coverFloatHead {\n  background-color: hsl(40, 32%, 29%);\n  height: 16px;\n  padding: 0 10px 10px 0;\n  font-size: 1em;\n  font-weight: 700;\n  color: hsl(0, 0%, 100%);\n}\n/* ADD IMAGE/COVER POP-UP */\ndiv.floater {\n  position: relative;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  width: 640px;\n  min-height: 670px;\n  background: hsl(0, 0%, 100%);\n  text-align: left;\n}\ndiv.floaterHead {\n  background-color: hsl(40, 32%, 29%);\n  padding: 0 10px 10px;\n}\ndiv.floaterHead h2 {\n  color: hsl(0, 0%, 100%);\n  font-size: 1.75em;\n  margin: 0;\n  padding: 0;\n}\ndiv.floaterBody {\n  padding: 20px;\n  font-size: 14px;\n}\ndiv.floaterBody p {\n  margin-bottom: 14px;\n}\n.floatform {\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, sans-serif;\n}\n.floatform .label {\n  width: 560px;\n  padding-top: 20px;\n}\n.floatform .label label {\n  font-size: 1em;\n  font-family: "Lucida Grande", "Trebuchet MS", Geneva, Helvetica, Arial, sans-serif;\n  font-weight: 700;\n}\n.floatform .label span {\n  font-weight: normal;\n}\n.floatform .input {\n  width: 560px;\n  padding-top: 20px;\n}\n.floatform div#covers.input {\n  width: 560px;\n  max-height: 132px;\n  overflow: hidden;\n  padding-top: 20px;\n  margin-left: -80px;\n  text-align: center;\n}\n.floatform input[type=text],\n.floatform input[type=file] {\n  width: 350px;\n  font-size: 1.125em;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  padding: 3px;\n  margin-left: 30px;\n}\n.floatform button[type=submit] {\n  font-size: 1.125em;\n  width: auto !important;\n}\n/* ADD ROLES, ETC. */\ndiv.floaterAdd {\n  position: relative;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  width: 640px;\n  background: hsl(0, 0%, 100%);\n  text-align: left;\n}\ndiv.floaterAdd .formElement {\n  margin: 0 20px;\n}\ndiv.floaterAdd form.floatform .input {\n  width: 560px;\n  padding-top: 5px;\n}\ndiv.floaterAdd form.floatform .label {\n  width: 560px;\n  padding-top: 20px;\n}\ndiv.floaterAdd form.floatform .label label {\n  font-size: 1em;\n  font-family: "Lucida Grande", "Trebuchet MS", Geneva, Helvetica, Arial, sans-serif;\n  font-weight: 700;\n}\ndiv.floaterAdd form.floatform input[type=text],\ndiv.floaterAdd form.floatform textarea {\n  width: 560px;\n  margin-left: 0;\n}\ndiv.floaterAdd form.floatform textarea {\n  padding: 3px;\n}\n/**\n * FlashMessage\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#flashmessage\n */\n.flash-messages {\n  font-size: 1em;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  clear: both;\n}\n.flash-messages span {\n  display: block;\n  background-color: hsl(58, 100%, 90%);\n  background-position: 10px 50%;\n  background-repeat: no-repeat;\n  padding: 15px 52px;\n  text-align: left;\n  background-image: url(/images/icons/icon_check.png);\n}\n.flash-messages .error span {\n  background-image: url(/images/icons/icon_alert.png);\n}\n.flash-messages .bookadded span {\n  background: hsl(58, 100%, 90%) url(/images/icons/icon_check.png) no-repeat 40px 40px;\n  padding: 40px 40px 40px 80px;\n  font-family: "Georgia", "Times New Roman", serif;\n  position: relative;\n}\n.flash-messages .bookadded span span {\n  display: inline;\n  padding: 0;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, sans-serif;\n}\n.flash-messages .bookadded h3 {\n  font-family: "Georgia", "Times New Roman", serif;\n  font-size: 1.5em;\n  font-weight: normal;\n  margin: 0;\n  color: hsl(0, 0%, 0%);\n}\n.flash-messages .bookadded .brown {\n  font-size: 1.125em;\n  margin: 15px 0 30px;\n}\n.flash-messages .bookadded .list {\n  font-size: 1.5em;\n  margin: 0;\n}\n.flash-messages .bookadded h3 em {\n  font-style: italic;\n  font-weight: 700;\n  color: hsl(113, 38%, 29%);\n}\n.flash-messages .bookadded .red {\n  font-family: "Georgia", "Times New Roman", serif;\n}\n.flash-messages .bookadded .close {\n  position: absolute;\n  display: block;\n  top: 20px;\n  right: 20px;\n  width: 16px;\n  height: 16px;\n}\n.ac_results {\n  padding: 0;\n  overflow: hidden;\n  z-index: 99999;\n  position: absolute;\n  display: none;\n  top: -5px;\n  width: 493px;\n  max-height: 290px;\n  background-color: hsl(0, 0%, 100%);\n  border: 1px solid hsl(0, 0%, 80%);\n  opacity: 0.95;\n  text-align: left;\n}\n.ac_results li {\n  margin: 0;\n  padding: 5px;\n  cursor: default;\n  display: block;\n  font: menu, sans-serif;\n  font-size: 12px;\n  /*\n    it is very important, if line-height not set or set\n    in relative units scroll will be broken in firefox\n    */\n  line-height: 16px;\n  overflow: hidden;\n  border-bottom: 1px solid hsl(0, 0%, 80%);\n}\n.ac_results li:last-child {\n  border-bottom: 0;\n}\n.ac_results ul {\n  width: 100%;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.ac_results ul li {\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, sans-serif;\n  cursor: pointer;\n  color: hsl(0, 0%, 20%);\n  line-height: normal;\n}\n.ac_results ul li.ac_over {\n  background-color: hsl(58, 100%, 90%);\n}\n.ac_results .ac_language {\n  font-size: 16px;\n  color: hsl(0, 0%, 0%);\n}\n.ac_results .ac_author .action {\n  font-size: 9px;\n  color: hsl(77, 45%, 38%);\n}\n.ac_results .ac_author .books {\n  font-size: 12px;\n  color: hsl(113, 38%, 29%);\n  font-weight: 700;\n  padding: 0;\n}\n.ac_results .ac_author .subject {\n  font-size: 11px;\n}\n.ac_results .ac_author .olid {\n  font-family: monospace;\n}\n.ac_results .ac_author .name {\n  font-size: 16px;\n  display: block;\n  color: hsl(0, 0%, 0%);\n}\n.ac_results .ac_author .work {\n  font-size: 11px;\n}\n.ac_results .ac_author .work i {\n  color: hsl(40, 32%, 29%);\n}\n.ac_results .ac_work .cover {\n  float: left;\n  margin-right: 5px;\n  width: 5em;\n  height: 5em;\n  overflow: hidden;\n  border-radius: 2px;\n  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), black 15%);\n}\n.ac_results .ac_work .cover img {\n  width: 100%;\n}\n.ac_results .ac_work .edition_count {\n  font-size: 12px;\n  color: hsl(113, 38%, 29%);\n  font-weight: 700;\n  padding: 0;\n}\n.ac_results .ac_work .olid {\n  font-family: monospace;\n}\n.ac_results .ac_work .name {\n  display: block;\n}\n.ac_results .ac_work .title {\n  font-size: 16px;\n  color: hsl(0, 0%, 0%);\n}\n.ac_results .ac_work .first_publish_year {\n  font-size: 12px;\n}\n.ac_loading {\n  background: hsl(0, 0%, 100%) url(/images/indicator.gif) right center no-repeat;\n}\n.ac_odd {\n  background-color: hsl(0, 0%, 93%);\n}\n.ac_over {\n  background-color: hsl(224, 83%, 23%);\n  color: hsl(0, 0%, 100%);\n}\n.ac_even,\n.ac_odd {\n  background-color: inherit;\n}\n/**\n * ReadStatuses\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#readstatuses\n */\n.read-statuses {\n  border-bottom: 1px solid hsl(0, 0%, 93%);\n  /* stylelint-disable selector-max-specificity */\n  /* stylelint-enable selector-max-specificity */\n}\n.read-statuses button {\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: hsl(0, 0%, 20%);\n  font-weight: bold;\n  width: 100%;\n  text-align: left;\n  font-size: 0.8em;\n  padding: 10px;\n  border-bottom: 1px solid hsl(0, 0%, 93%);\n}\n.read-statuses button:hover {\n  color: hsl(0, 0%, 0%);\n  background-color: hsl(0, 0%, 100%);\n}\n.read-statuses form:last-child button.nostyle-btn {\n  border: none;\n}\n/**\n * ManageCoversBtn\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#manage-covers\n */\n.manageCovers {\n  max-width: 140px;\n  margin: 0 auto;\n  padding: 8px;\n  border-radius: 3px;\n  border: 3px solid hsl(0, 0%, 20%);\n  background-color: hsl(0, 0%, 100%);\n  color: hsl(0, 0%, 20%);\n  font-size: 12px;\n}\n.manageCovers a {\n  color: hsl(0, 0%, 20%);\n}\n.manageCoversContainer {\n  width: 100%;\n  z-index: 99999;\n  position: absolute;\n  bottom: 15px;\n}\n.manageCoversContainer a {\n  display: block;\n  text-decoration: none;\n  opacity: 0;\n}\n.manageCoversContainer a:hover,\n.manageCoversContainer a:focus {\n  text-decoration: underline;\n}\ndiv:hover > .manageCoversContainer a {\n  opacity: 0.9;\n}\n/**\n * CtaBtn\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#ctabtn\n * This stylesheet will only apply if JS is present on the page.\n */\n.cta-btn--available--load,\na.cta-btn--available--load {\n  background-color: hsl(211, 97%, 61%) !important;\n  background: url(/static/images/indicator.gif) center center no-repeat;\n  opacity: 0.6;\n}\n.cta-btn--unavailable--load,\na.cta-btn--unavailable--load {\n  background-color: hsl(32, 100%, 61%) !important;\n  background: url(/static/images/indicator.gif) center center no-repeat;\n  opacity: 0.6;\n}\n/**\n * TabPanel\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#tabspanel\n */\n.ui-tabs-nav,\n.ui-tabs-panel {\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n}\n.ui-tabs-nav {\n  list-style: none !important;\n  margin: 0 0 18px !important;\n  clear: right;\n  /* stylelint-disable selector-max-specificity */\n  /* stylelint-disable no-descending-specificity */\n  /* stylelint-enable no-descending-specificity */\n  /* stylelint-enable selector-max-specificity */\n}\n.ui-tabs-nav:after {\n  /* clearing without presentational markup, IE gets extra treatment */\n  display: block;\n  clear: both;\n  content: " ";\n}\n.ui-tabs-nav li {\n  list-style: none !important;\n  margin: 0 0 0 1px;\n  min-width: 54px;\n  /* be nice to Opera */\n}\n.ui-tabs-nav a {\n  display: block;\n  font-weight: 600;\n  font-size: 0.6875em;\n  background: hsl(0, 0%, 100%);\n  border-bottom: 3px solid hsl(0, 0%, 93%);\n  padding: 4px 8px 3px;\n  text-decoration: none;\n  text-transform: uppercase;\n  white-space: nowrap;\n  /* required in IE 6 */\n  outline: 0;\n  /* prevent dotted border in Firefox */\n  /* stylelint-disable max-nesting-depth */\n  /* stylelint-enable max-nesting-depth */\n}\n.ui-tabs-nav a:link,\n.ui-tabs-nav a:visited {\n  color: hsl(202, 96%, 28%);\n}\n.ui-tabs-nav a:hover {\n  color: hsl(202, 96%, 28%);\n  text-decoration: underline;\n}\n.ui-tabs-nav .ui-tabs-active {\n  /* stylelint-disable max-nesting-depth */\n  /* stylelint-enable max-nesting-depth */\n}\n.ui-tabs-nav .ui-tabs-active a:link,\n.ui-tabs-nav .ui-tabs-active a:visited {\n  /* @ Opera, use pseudo classes otherwise it confuses cursor... */\n  background: hsl(0, 0%, 93%);\n  border: 1px solid hsl(0, 0%, 93%);\n  border-bottom: 3px solid hsl(0, 0%, 93%);\n  color: hsl(184, 100%, 21%);\n  text-transform: capitalize !important;\n  cursor: default;\n}\n.ui-tabs-nav a:hover,\n.ui-tabs-nav a:focus,\n.ui-tabs-nav a:active,\n.ui-tabs-nav .ui-tabs-deselectable a:hover,\n.ui-tabs-nav .ui-tabs-deselectable a:focus,\n.ui-tabs-nav .ui-tabs-deselectable a:active {\n  /* @ Opera, we need to be explicit again here now... */\n  cursor: pointer;\n}\n.ui-tabs-disabled {\n  opacity: 0.4;\n  filter: alpha(opacity=40);\n}\n.ui-tabs-panel {\n  border: 3px solid hsl(0, 0%, 93%);\n  background: hsl(0, 0%, 100%);\n  /* declare background color for container to avoid distorted fonts in IE while fading */\n}\n.ui-tabs-loading em {\n  padding: 0 0 0 20px;\n}\n.floater .ui-tabs-panel {\n  border: none;\n  border-top: 3px solid hsl(0, 0%, 93%);\n  padding: 15px 30px !important;\n  background: hsl(0, 0%, 100%);\n  /* declare background color for container to avoid distorted fonts in IE while fading */\n}\n/* Additional IE specific bug fixes... */\n* html .ui-tabs-nav {\n  /* auto clear, @ IE 6 & IE 7 Quirks Mode */\n  display: inline-block;\n}\n*:first-child + html .ui-tabs-nav {\n  /* @ IE 7 Standards Mode - do not group selectors,\n  otherwise IE 6 will ignore complete rule (because of the unknown + combinator)... */\n  display: inline-block;\n}\n@media only screen and (min-width: 768px) {\n  .tabs-panel {\n    padding: 15px 30px 20px !important;\n  }\n  .ui-tabs-nav {\n    margin-bottom: -3px !important;\n  }\n  .ui-tabs-nav li {\n    float: left;\n  }\n  .ui-tabs-nav a {\n    margin: 8px 3px 0;\n  }\n  .ui-tabs-nav .ui-tabs-active a {\n    margin: 0 3px !important;\n    padding: 4px 8px 3px;\n    margin: 8px 3px 0;\n    font-size: 1.125em !important;\n  }\n}\n/* Caution! Ensure accessibility in print and other media types... */\n@media projection, screen, print {\n  /* Use class for showing/hiding tab content,\n  so that visibility can be better controlled in different media types... */\n  .ui-tabs-hide {\n    display: none;\n  }\n}\n/**\n * UI-Dialog\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#ui-dialog\n */\n.ui-dialog {\n  position: relative;\n  padding: 0;\n  width: 400px;\n  border: 10px solid hsl(40, 32%, 29%);\n  background-color: hsl(0, 0%, 100%);\n  border-radius: 12px;\n  -webkit-box-shadow: 1px 3px 10px hsl(0, 0%, 0%);\n  box-shadow: 1px 3px 10px hsl(0, 0%, 0%);\n  z-index: 10000 !important;\n}\n.ui-dialog .ui-dialog-titlebar {\n  position: relative;\n  background-color: hsl(40, 32%, 29%);\n  color: hsl(0, 0%, 100%);\n  font-size: 1.75em;\n  margin: 0;\n  padding: 8px 0;\n}\n.ui-dialog .ui-dialog-titlebar-close {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  background: none;\n  border: none;\n  text-indent: -99px;\n  overflow: hidden;\n}\n.ui-dialog .ui-dialog-titlebar-close span {\n  display: block;\n}\n.ui-dialog .ui-dialog-titlebar-close:hover,\n.ui-dialog .ui-dialog-titlebar-close:focus {\n  padding: 0;\n}\n.ui-dialog .ui-dialog-content {\n  padding: 0.5em 1em;\n  background: none;\n  overflow: auto;\n  zoom: 1;\n}\n.ui-dialog .ui-dialog-content p {\n  min-height: 28px;\n  padding: 6px 33px 0;\n  background: url(/images/icons/icon_alert.png) no-repeat 0 0;\n  margin: 0;\n}\n.ui-dialog .ui-dialog-buttonpane {\n  text-align: center;\n  margin-bottom: 10px;\n}\n.ui-dialog .ui-dialog-buttonpane button {\n  cursor: pointer;\n  width: auto;\n  overflow: visible;\n  font-size: 18px;\n  margin: 0 8px;\n}\n.ui-draggable .ui-dialog-titlebar {\n  cursor: move;\n}\n.ui-icon {\n  display: block;\n  text-indent: -99999px;\n  overflow: hidden;\n  width: 32px;\n  height: 32px;\n}\n.ui-icon-closethick {\n  background-image: url(/images/icons/icon_close-pop.png);\n  background-position: 0 0;\n  background-repeat: no-repeat;\n}\n.ui-icon-closethick:hover {\n  background-position: 0 -32px;\n}\n* html .ui-helper-clearfix {\n  height: 1%;\n}\n/**\n * Wmd Prompt Dialog\n * https://github.com/internetarchive/openlibrary/wiki/Design-Pattern-Library#wmdpromptdialog\n * these dialogs can be seen when wmd-button-bar icon is clicked e.g. add link\n */\n@media all and (max-width: 768px) {\n  .wmd-prompt-dialog {\n    margin-left: 10px !important;\n    margin-top: 10px !important;\n    top: 100px   !important;\n    left: 0 !important;\n    right: 0 !important;\n    width: 300px !important;\n  }\n}\n.wmd-prompt-dialog {\n  width: 400px;\n  border: 10px solid hsl(40, 32%, 29%);\n  background-color: hsl(0, 0%, 100%);\n  -webkit-border-radius: 12px;\n  -moz-border-radius: 12px;\n  border-radius: 12px;\n  -moz-box-shadow: 1px 3px 10px hsl(0, 0%, 0%);\n  -webkit-box-shadow: 1px 3px 10px hsl(0, 0%, 0%);\n  box-shadow: 1px 3px 10px hsl(0, 0%, 0%);\n  text-align: left;\n}\n.wmd-prompt-dialog > div {\n  font-size: 14px;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, sans-serif;\n  color: hsl(0, 0%, 27%);\n  padding: 20px !important;\n}\n.wmd-prompt-dialog > div p {\n  margin-bottom: 0 !important;\n  position: relative;\n}\n.wmd-prompt-dialog > form {\n  width: 480px;\n  padding: 20px;\n  padding-top: 0;\n}\n.wmd-prompt-dialog > form > input[type=text] {\n  float: left;\n  margin-left: 20px !important;\n  clear: both;\n  width: 350px;\n  font-size: 1.125em;\n  font-family: "Lucida Grande", Verdana, Geneva, Helvetica, Arial, sans-serif;\n  padding: 3px;\n}\n.wmd-prompt-dialog > form > input[type="button"] {\n  font-size: 1.125em;\n  width: auto !important;\n}\n.wmd-prompt-dialog p b {\n  display: block;\n  position: relative;\n  background-color: hsl(40, 32%, 29%);\n  padding: 0 10px 10px;\n  color: hsl(0, 0%, 100%);\n  font-family: "News Gothic MT", "Arial Rounded MT", Geneva, Helvetica, sans-serif;\n  font-size: 1.75em;\n  top: -20px;\n  left: -21px;\n  width: 282px;\n}\n@media all and (min-width: 768px) {\n  .wmd-prompt-dialog p b {\n    width: 380px;\n  }\n}\n.coverEbook {\n  cursor: pointer;\n  z-index: 1000;\n}\n.coverEbook img {\n  opacity: 0.85;\n  filter: alpha(opacity=85);\n}\n.coverEbook a.cta-btn {\n  position: absolute;\n  padding: 0 5px;\n  right: 0;\n  bottom: 3px;\n  border-radius: 3px;\n}\n.tools a.on,\n.tools a.on:hover,\n.tools a.on:active {\n  color: hsl(0, 0%, 20%);\n  cursor: default;\n  text-decoration: none;\n}\n', ""])
}, function (n, e, t) {
  "use strict";
  n.exports = function (n) {
    var e = [];
    return e.toString = function () {
      return this.map(function (e) {
        var t = function (n, e) {
          var t = n[1] || "", a = n[3];
          if (!a) return t;
          if (e && "function" == typeof btoa) {
            var o = (r = a, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */"),
              i = a.sources.map(function (n) {
                return "/*# sourceURL=" + a.sourceRoot + n + " */"
              });
            return [t].concat(i).concat([o]).join("\n")
          }
          var r;
          return [t].join("\n")
        }(e, n);
        return e[2] ? "@media " + e[2] + "{" + t + "}" : t
      }).join("")
    }, e.i = function (n, t) {
      "string" == typeof n && (n = [[null, n, ""]]);
      for (var a = {}, o = 0; o < this.length; o++) {
        var i = this[o][0];
        null != i && (a[i] = !0)
      }
      for (o = 0; o < n.length; o++) {
        var r = n[o];
        null != r[0] && a[r[0]] || (t && !r[2] ? r[2] = t : t && (r[2] = "(" + r[2] + ") and (" + t + ")"), e.push(r))
      }
    }, e
  }
}, function (n, e, t) {
  var a, o, i = {}, r = (a = function () {
    return window && document && document.all && !window.atob
  }, function () {
    return void 0 === o && (o = a.apply(this, arguments)), o
  }), s = function (n) {
    var e = {};
    return function (n, t) {
      if ("function" == typeof n) return n();
      if (void 0 === e[n]) {
        var a = function (n, e) {
          return e ? e.querySelector(n) : document.querySelector(n)
        }.call(this, n, t);
        if (window.HTMLIFrameElement && a instanceof window.HTMLIFrameElement) try {
          a = a.contentDocument.head
        } catch (n) {
          a = null
        }
        e[n] = a
      }
      return e[n]
    }
  }(), l = null, d = 0, c = [], u = t(5);

  function p(n, e) {
    for (var t = 0; t < n.length; t++) {
      var a = n[t], o = i[a.id];
      if (o) {
        o.refs++;
        for (var r = 0; r < o.parts.length; r++) o.parts[r](a.parts[r]);
        for (; r < a.parts.length; r++) o.parts.push(v(a.parts[r], e))
      } else {
        var s = [];
        for (r = 0; r < a.parts.length; r++) s.push(v(a.parts[r], e));
        i[a.id] = {id: a.id, refs: 1, parts: s}
      }
    }
  }

  function f(n, e) {
    for (var t = [], a = {}, o = 0; o < n.length; o++) {
      var i = n[o], r = e.base ? i[0] + e.base : i[0], s = {css: i[1], media: i[2], sourceMap: i[3]};
      a[r] ? a[r].parts.push(s) : t.push(a[r] = {id: r, parts: [s]})
    }
    return t
  }

  function h(n, e) {
    var t = s(n.insertInto);
    if (!t) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
    var a = c[c.length - 1];
    if ("top" === n.insertAt) a ? a.nextSibling ? t.insertBefore(e, a.nextSibling) : t.appendChild(e) : t.insertBefore(e, t.firstChild), c.push(e); else if ("bottom" === n.insertAt) t.appendChild(e); else {
      if ("object" != typeof n.insertAt || !n.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
      var o = s(n.insertAt.before, t);
      t.insertBefore(e, o)
    }
  }

  function g(n) {
    if (null === n.parentNode) return !1;
    n.parentNode.removeChild(n);
    var e = c.indexOf(n);
    e >= 0 && c.splice(e, 1)
  }

  function b(n) {
    var e = document.createElement("style");
    if (void 0 === n.attrs.type && (n.attrs.type = "text/css"), void 0 === n.attrs.nonce) {
      var a = function () {
        0;
        return t.nc
      }();
      a && (n.attrs.nonce = a)
    }
    return m(e, n.attrs), h(n, e), e
  }

  function m(n, e) {
    Object.keys(e).forEach(function (t) {
      n.setAttribute(t, e[t])
    })
  }

  function v(n, e) {
    var t, a, o, i;
    if (e.transform && n.css) {
      if (!(i = "function" == typeof e.transform ? e.transform(n.css) : e.transform.default(n.css))) return function () {
      };
      n.css = i
    }
    if (e.singleton) {
      var r = d++;
      t = l || (l = b(e)), a = x.bind(null, t, r, !1), o = x.bind(null, t, r, !0)
    } else n.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (t = function (n) {
      var e = document.createElement("link");
      return void 0 === n.attrs.type && (n.attrs.type = "text/css"), n.attrs.rel = "stylesheet", m(e, n.attrs), h(n, e), e
    }(e), a = function (n, e, t) {
      var a = t.css, o = t.sourceMap, i = void 0 === e.convertToAbsoluteUrls && o;
      (e.convertToAbsoluteUrls || i) && (a = u(a));
      o && (a += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
      var r = new Blob([a], {type: "text/css"}), s = n.href;
      n.href = URL.createObjectURL(r), s && URL.revokeObjectURL(s)
    }.bind(null, t, e), o = function () {
      g(t), t.href && URL.revokeObjectURL(t.href)
    }) : (t = b(e), a = function (n, e) {
      var t = e.css, a = e.media;
      a && n.setAttribute("media", a);
      if (n.styleSheet) n.styleSheet.cssText = t; else {
        for (; n.firstChild;) n.removeChild(n.firstChild);
        n.appendChild(document.createTextNode(t))
      }
    }.bind(null, t), o = function () {
      g(t)
    });
    return a(n), function (e) {
      if (e) {
        if (e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) return;
        a(n = e)
      } else o()
    }
  }

  n.exports = function (n, e) {
    if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
    (e = e || {}).attrs = "object" == typeof e.attrs ? e.attrs : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = r()), e.insertInto || (e.insertInto = "head"), e.insertAt || (e.insertAt = "bottom");
    var t = f(n, e);
    return p(t, e), function (n) {
      for (var a = [], o = 0; o < t.length; o++) {
        var r = t[o];
        (s = i[r.id]).refs--, a.push(s)
      }
      n && p(f(n, e), e);
      for (o = 0; o < a.length; o++) {
        var s;
        if (0 === (s = a[o]).refs) {
          for (var l = 0; l < s.parts.length; l++) s.parts[l]();
          delete i[s.id]
        }
      }
    }
  };
  var _, y = (_ = [], function (n, e) {
    return _[n] = e, _.filter(Boolean).join("\n")
  });

  function x(n, e, t, a) {
    var o = t ? "" : a.css;
    if (n.styleSheet) n.styleSheet.cssText = y(e, o); else {
      var i = document.createTextNode(o), r = n.childNodes;
      r[e] && n.removeChild(r[e]), r.length ? n.insertBefore(i, r[e]) : n.appendChild(i)
    }
  }
}, function (n, e) {
  n.exports = function (n) {
    var e = "undefined" != typeof window && window.location;
    if (!e) throw new Error("fixUrls requires window.location");
    if (!n || "string" != typeof n) return n;
    var t = e.protocol + "//" + e.host, a = t + e.pathname.replace(/\/[^\/]*$/, "/");
    return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (n, e) {
      var o, i = e.trim().replace(/^"(.*)"$/, function (n, e) {
        return e
      }).replace(/^'(.*)'$/, function (n, e) {
        return e
      });
      return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? n : (o = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? t + i : a + i.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
    })
  }
}, function (n, e, t) {
  "use strict";
  t.r(e);
  var a, o, i, r;
  r = {
    "^/account/books/[^/]+": {filter: !1},
    "^/authors/[^/]+": {filter: !0},
    "^/people/[^/]+": {filter: !1},
    "^/stats/[^/]+": {filter: !1}
  }, a = function (n, e, t) {
    if (!e.length) return t({});
    var a = "/availability/v2?type=" + n;
    $.ajax({
      url: a,
      type: "POST",
      data: JSON.stringify({ids: e}),
      dataType: "json",
      contentType: "application/json",
      beforeSend: function (n) {
        n.setRequestHeader("Content-Type", "application/json"), n.setRequestHeader("Accept", "application/json")
      },
      success: function (n) {
        return t(n)
      }
    })
  }, o = function (n) {
    n = (n || "") + "[data-ocaid]";
    var e = {}, t = [];
    $(n).each(function (n, a) {
      var o = $(a).attr("data-ocaid");
      if (o) {
        var i = o.split(",").filter(function (n) {
          return "" !== n
        }), r = $(a).attr("data-key");
        i.length && (e[r] = i, Array.prototype.push.apply(t, i))
      }
    }), a("identifier", t, function (t) {
      var a = null;
      for (var o in t) if ("borrow_available" === t[o].status) for (a in e) e[a].indexOf(o) > -1 && ($(n + "[data-key=" + a + "]").attr("href", "/borrow/ia/" + o), $(n + "[data-key=" + a + "]").addClass("cta-btn--available").addClass("cta-btn"), $(n + "[data-key=" + a + "]").text("Borrow"), delete e[a]); else if ("borrow_unavailable" === t[o].status) for (a in e) e[a].indexOf(o) > -1 && ($(n + "[data-key=" + a + "]").attr("title", "Join waitlist"), $(n + "[data-key=" + a + "]").addClass("cta-btn--unavailable").addClass("cta-btn"), $(n + "[data-key=" + a + "]").text("Join Waitlist"), delete e[a]); else for (a in e) e[a].indexOf(o) > -1 && ($(n + "[data-key=" + a + "]").attr("href", $(n + "[data-key=" + a + "]").attr("data-key")), $(n + "[data-key=" + a + "]").attr("title", "Check Availability"), $(n + "[data-key=" + a + "]").removeClass("borrow-link"), $(n + "[data-key=" + a + "]").addClass("check-book-availability").addClass("cta-btn"), $(n + "[data-key=" + a + "]").text("Check Availability"), delete e[a])
    })
  }, i = function () {
    var n = !1, e = !1;
    for (var t in r) window.location.pathname.match(t) && (n = !0, e = r[t].filter);
    if (n) if ("printdisabled" !== localStorage.getItem("mode")) {
      var i = [], s = [], l = $("a.results");
      $.each(l, function (n, e) {
        var t = $(e).attr("href").split("/"), a = t[1], o = t[2];
        "works" === a ? s.push(o) : "books" === a && i.push(o)
      }), a("openlibrary_edition", i, function (n) {
        a("openlibrary_work", s, function (t) {
          var a = {books: n, works: t};
          $.each(l, function (n, t) {
            var o = $(t).attr("href").split("/"), i = o[1], r = o[2];
            if (a[i]) {
              var s = a[i][r], l = $(t).closest("li"), d = l.find(".searchResultItemCTA-lending"),
                c = e ? localStorage.getItem("mode") : "everything";
              "printdisabled" !== c && ("error" === s.status || "private" === s.status ? "ebooks" === c && l.remove() : "open" === s.status || "borrow_available" === s.status ? $(d).append('<a href="/books/' + s.openlibrary_edition + '/x/borrow" class="cta-btn cta-btn--available" data-ol-link-track="' + s.status + '">' + ("open" === s.status ? "Read" : " Borrow") + "</a>") : "borrow_unavailable" === s.status && $(d).append('<form method="POST" action="/books/' + s.openlibrary_edition + '/x/borrow?action=join-waitinglist" class="join-waitlist waitinglist-form"><input type="hidden" name="action" value="join-waitinglist"><button type="submit" class="cta-btn cta-btn--unavailable" data-ol-link-track="' + s.status + '">Join Waitlist' + ("0" !== s.num_waitlist ? ' <span class="cta-btn__badge">' + s.num_waitlist + "</span>" : "") + "</button></form>" + ("0" === s.num_waitlist ? '<div class="waitlist-msg">You will be first in line!</div>' : "")))
            }
          })
        })
      }), o()
    } else {
      var d = $(".print-disabled-only");
      $.each(d, function () {
        $(this).removeClass("hidden")
      })
    }
  };
  var s = {
    add: function (n, e, t, a, o, i, r, s) {
      e = e || 6;
      var l = [{
        breakpoint: 1200,
        settings: {slidesToShow: t = t || 5, slidesToScroll: t, infinite: !1}
      }, {breakpoint: 1024, settings: {slidesToShow: a = a || 4, slidesToScroll: a, infinite: !1}}, {
        breakpoint: 600,
        settings: {slidesToShow: o = o || 3, slidesToScroll: o}
      }, {breakpoint: 480, settings: {slidesToShow: i = i || 2, slidesToScroll: i}}];
      (r = r || 1) && l.push({
        breakpoint: 360,
        settings: {slidesToShow: r, slidesToScroll: r}
      }), $(n).slick({infinite: !1, speed: 300, slidesToShow: e, slidesToScroll: e, responsive: l});
      var d = {
        open: {cls: "cta-btn--available", cta: "Read"},
        borrow_available: {cls: "cta-btn--available", cta: "Borrow"},
        borrow_unavailable: {cls: "cta-btn--unavailable", cta: "Join Waitlist"},
        error: {cls: "cta-btn--missing", cta: "No eBook"}
      };
      if (s && s.url) {
        var c;
        try {
          c = new URL(s.url)
        } catch (i) {
          c = new URL(window.location.origin + s.url)
        }
        c.searchParams.set("limit", s.limit || 18), s.pageMode = "page" === s.pageMode ? "page" : "offset", s.locked = !1, $(n).on("afterChange", function () {
          var e = $(n + ".slick-slider").slick("getSlick").$slides.length, t = $(n + " .slick-active").length,
            a = $(n + ".slick-slider").slick("slickCurrentSlide") + t, o = e - t;
          !s.locked && a >= o && (s.locked = !0, document.body.style.cursor = "wait", "page" == s.pageMode ? s.page = s.page ? s.page + 1 : 2 : s.page = e, c.searchParams.set(s.pageMode, s.page), $.ajax({
            url: c,
            type: "GET",
            success: function (e) {
              $.each(e.works, function (t) {
                var a = e.works[t], o = $(n + ".slick-slider").slick("getSlick").$slides.length - 1;
                $(n).slick("slickAdd", function (n) {
                  var e = n.availability.status, t = n.covers ? n.covers[0] : n.cover_id, a = n.availability.identifier,
                    o = d[e].cls,
                    i = "cta-btn--available" == o ? "/borrow/ia/" + a : "cta-btn--unavailable" == o ? "/books/" + n.availability.openlibrary_edition : n.key,
                    r = d[e].cta, s = "error" == e ? "disabled" : "";
                  return '<div class="book carousel__item slick-slide slick-active" "aria-hidden="false" role="option"><div class="book-cover"><a href="' + n.key + '" ' + s + '><img class="bookcover" width="130" height="200" title="' + n.title + '" src="//covers.openlibrary.org/b/id/' + t + '-M.jpg"></a></div><div class="book-cta"><a class="btn cta-btn ' + o + '" href="' + i + '" data-ol-link-track="subjects" title="' + r + ": " + n.title + '" data-key="subjects" data-ocaid="' + a + '">' + r + "</a></div></div>"
                }(a), o)
              }), document.body.style.cursor = "default", s.locked = !1
            }
          }))
        })
      }
    }
  };

  function l(n) {
    return n
  }

  jQuery.fn.fadeToggle = function (n, e, t) {
    return this.animate({opacity: "toggle"}, n, e, t)
  }, jQuery.fn.toggleText = function (n, e) {
    return this.each(function () {
      jQuery(this).text(jQuery(this).text() == n ? e : n)
    })
  };
  var d = function (n) {
    var e = void 0 === n("body").on;
    n.fn.repeat = function (t) {
      var a, o;
      t = t || {};
      var i = "#" + this.attr("id"), r = {
        _this: this,
        add: n(i + "-add"),
        form: n(i + "-form"),
        display: n(i + "-display"),
        template: n(i + "-template")
      };
      var s,
        l = (s = n(i + "-template").html().replace(/%7B%7B/gi, "<%=").replace(/%7D%7D/gi, "%>").replace(/{{/g, "<%=").replace(/}}/g, "%>"), Template(s));

      function d(e) {
        e.preventDefault();
        var a = r.display.children().length, o = function () {
          var e = {};
          return n(":input", r.form).each(function () {
            var t = n(this), a = t.attr("type"), o = t.attr("name");
            e[o] = t.val().trim(), "text" === a && t.val("")
          }), e
        }();
        if (o.index = a, !t.validate || 0 != t.validate(o)) {
          n.extend(o, t.vars || {});
          var i = r._this.attr("id") + "--" + a;
          r.template.clone().attr("id", i).html(l(o)).show().appendTo(r.display), r._this.trigger("repeat-add")
        }
      }

      function c(e) {
        e.preventDefault(), n(this).parents(".repeat-item:eq(0)").remove(), r._this.trigger("repeat-remove")
      }

      a = i + " .repeat-add", o = i + " .repeat-remove", e ? (n(a).on("click", a, d), n(o).on("click", o, c)) : (n(document).on("click", a, d), n(document).on("click", o, c))
    }
  };

  function c(n, e) {
    this.parent = n, this.seq = e, this.length = e.length, this.index0 = -1
  }

  function u(n) {
    return n = (n = (n = (n = (n = (n = String(n)).replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;")).replace(/'/g, "&#39;")).replace(/"/g, "&quot;")
  }

  c.prototype.next = function () {
    var n = this.index0 + 1;
    this.index0 = n, this.index = n + 1, this.first = 0 == n, this.last = n == this.length - 1, this.odd = this.index % 2 == 1, this.even = this.index % 2 == 0, this.parity = ["even", "odd"][this.index % 2], this.revindex0 = this.length - n, this.revindex = this.length - n + 1
  };
  var p = t(0);
  var f = {
    getJsonFromUrl: function () {
      var n = location.search.substr(1), e = {};
      return n.split("&").forEach(function (n) {
        var t = n.split("=");
        e[t[0]] = decodeURIComponent(t[1])
      }), e
    }, change_url: function (n) {
      var e = window.location, t = e.protocol + "//" + e.host + "/" + e.pathname.split("/")[1];
      window.history.pushState({html: document.html, pageTitle: document.title + " " + n}, "", t + "?id=" + n)
    }, removeURLParameter: function (n, e) {
      var t = n.split("?"), a = t[0];
      if (t.length >= 2) {
        for (var o = t[1], i = encodeURIComponent(e) + "=", r = o.split(/[&;]/g), s = r.length; s-- > 0;) -1 !== r[s].lastIndexOf(i, 0) && r.splice(s, 1);
        return n = a + (r.length > 0 ? "?" + r.join("&") : "")
      }
      return n
    }
  };

  function h(n) {
    var e = $(window).scrollTop(), t = e + $(window).height();
    if ($(n).offset()) {
      var a = $(n).offset().top, o = a + $(n).height();
      return e < a && t > o
    }
    return !1
  }

  function g(n, e) {
    e = e || {};
    this.settings = $.extend({pagesize: 12}, e), this.slug = n.name.replace(/\s+/g, "-").toLowerCase(), this.filter = {}, this.published_in = e.published_in ? e.published_in : void 0, this.has_fulltext = e.readable ? "true" : "false", this.sort = e.sort ? e.sort : "editions", this.init(n), this._data = n
  }

  function b(n) {
    var e = [];
    for (var t in n) e.push(t + "=" + n[t]);
    return e.join("&")
  }

  function m(n, e, t) {
    var a = "<" + n + " ";
    for (var o in e) {
      var i = e[o];
      a += "" == i ? o + " " : o + '="' + i + '" '
    }
    return "img" === n ? a + "/>" : (a += ">", t && (a += t), a += "</" + n + ">")
  }

  function v(n, e, t) {
    for (var a = [], o = e; o < Math.min(n.length, t); o++) a.push(n[o]);
    return a
  }

  jQuery.fn.exists = function () {
    return jQuery(this).length > 0
  }, $.extend(g.prototype, {
    init: function (n) {
      $.log(["init", this, arguments]), $.extend(this, n), this.page_count = Math.ceil(this.work_count / this.settings.pagesize), this.epage_count = Math.ceil(this.ebook_count / this.settings.pagesize), this._pages = {}, "true" != this.has_fulltext && (this._pages[0] = {works: v(n.works, 0, this.settings.pagesize)})
    }, bind: function (n, e) {
      $(this).bind(n, e)
    }, getPageCount: function () {
      return "true" == this.has_fulltext ? this.epage_count : this.page_count
    }, renderWork: function (n) {
      var e = [];
      for (var t in n.authors) e.push(n.authors[t].name);
      var a = "edition" + (n.edition_count > 1 ? "s" : ""),
        o = n.title + " by " + e.join(", ") + " (" + n.edition_count + " " + a + ")",
        i = "//covers.openlibrary.org/b/id/" + n.cover_id + "-M.jpg",
        r = n.public_scan ? "public" : n.printdisabled && !n.ia_collection.includes("inlibrary") ? "daisy" : "borrow",
        s = n.public_scan ? "//archive.org/stream/" + n.ia + "?ref=ol" : "/borrow/ia/" + n.ia;
      return m("div", {class: "coverMagic"}, m("span", {
        itemtype: "https://schema.org/Book",
        itemscope: ""
      }, m("div", {class: "SRPCover"}, m("a", {
        href: n.key,
        title: o,
        "data-ol-link-track": "subject-" + this.slug
      }, m("img", {
        src: i,
        itemprop: "image",
        alt: o,
        class: "cover"
      }))) + m("div", {class: "coverEbook"}, "public" === r ? m("a", {
        href: s,
        title: "Read online",
        class: "cta-btn--available cta-btn"
      }, "Read") : m("a", {
        href: s,
        title: "Read this book",
        class: "cta-btn cta-btn--available",
        "data-ocaid": n.ia,
        "data-key": n.key
      }))))
    }, loadPage: function (n, e) {
      var t = n * this.settings.pagesize, a = this.settings.pagesize;
      if (t > this.bookCount && e && e([]), this._pages[n]) e(this._pages[n]); else {
        var o = {limit: a, offset: t, has_fulltext: this.has_fulltext, sort: this.sort};
        this.published_in && (o.published_in = this.published_in), $.extend(o, this.filter);
        var i = this.key.replace(/\s+/g, "_") + ".json?" + b(o), r = this;
        $.getJSON(i, function (t) {
          r._pages[n] = t, e(t)
        })
      }
    }, _ajax: function (n, e) {
      n = $.extend({limit: this.settings.pagesize, offset: 0}, this.filter, n);
      var t = this.key.replace(/\s+/g, "_") + ".json?" + b(n);
      $.getJSON(t, e)
    }, setFilter: function (n, e) {
      for (var t in n) null == n[t] && delete n[t];
      this.filter = n;
      var a = this;
      this._ajax({details: "true"}, function (n) {
        a.init(n), e && e()
      })
    }, setSort: function (n) {
      this.sort != n && (this.sort = n, this._pages = {})
    }, setFulltext: function (n) {
      this.has_fulltext != n && (this.has_fulltext = n, this._pages = {})
    }, addFilter: function (n, e) {
      this.setFilter($.extend({}, this.filter, n), e)
    }, reset: function (n) {
      this.filter = {}, this.init(this._data), n && n()
    }
  }), $.fn.toggleText = function (n, e) {
    return this.each(function () {
      $(this).text($(this).text() == n ? e : n)
    })
  }, $.fn.focusNextInputField = function () {
    return this.each(function () {
      var n = $(this).parents("form:eq(0),body").find(":input:visible"), e = n.index(this);
      return e > -1 && e + 1 < n.length && n.eq(e + 1).focus(), !1
    })
  }, $.fn.ol_confirm_dialog = function (n, e) {
    var t = this, a = {
      autoOpen: !1, width: 400, modal: !0, resizable: !1, buttons: {
        "Yes, I'm sure": function () {
          n.apply(t)
        }, "No, cancel": function () {
          $(t).dialog("close")
        }
      }
    };
    e = $.extend(a, e), this.dialog(e)
  }, $.fn.tap = function (n) {
    return n(this), this
  }, $.log = function () {
    window.console
  };
  t(1);
  window.bookCovers = function () {
    $("img.cover").error(function () {
      $(this).closest(".SRPCover").hide(), $(this).closest(".coverMagic").find(".SRPCoverBlank").show()
    })
  }, window.closePop = function () {
    $("#popClose").click(function () {
      parent.$.fn.colorbox.close()
    })
  }, window.closePopup = function () {
    parent.jQuery.fn.colorbox.close()
  }, window.commify = function (n) {
    for (var e = n.toString(), t = /(\d+)(\d{3})/; t.test(e);) e = e.replace(t, "$1,$2");
    return e
  }, window.cond = function (n, e, t) {
    return n ? e : t
  }, window.enumerate = function (n) {
    var e = new Array(n.length);
    for (var t in n) e[t] = [t, n[t]];
    return e
  }, window.foreach = function (n, e, t) {
    for (var a = new c(e, n), o = 0; o < n.length; o++) {
      a.next();
      var i = [a];
      if (t.length > 2) for (var r in n[o]) i.push(n[o][r]); else i[1] = n[o];
      t.apply(this, i)
    }
  }, window.getAvailabilityV2 = a, window.isScrolledIntoView = h, window.htmlquote = u, window.len = function (n) {
    return n.length
  }, window.plot_tooltip_graph = p.b, window.plot_minigraph = p.a, window.range = function (n, e, t) {
    t = t || 1, null == e && (e = n, n = 0);
    for (var a = [], o = n; o < e; o += t) a[a.length] = o;
    return a
  }, window.renderTag = m, window.slice = v, window.sprintf = function (n) {
    var e = arguments, t = 1;
    return n.replace(/%[%s]/g, function (n) {
      return "%%" == n ? "%" : e[t++]
    })
  }, window.truncate = function (n, e) {
    return n.length > e ? n.substr(0, e) + "..." : n
  }, window.updateBookAvailability = o, window.updateWorkAvailability = i, window.urlencode = b, window.validateEmail = function () {
    $("form.email").validate({
      invalidHandler: function (n, e) {
        var t = e.numberOfInvalids();
        t ? ($("div#contentMsg span").html("Hang on... You forgot to provide an updated email address."), $("div#contentMsg").show().fadeTo(3e3, 1).slideUp(), $("span.remind").css("font-weight", "700").css("text-decoration", "underline")) : $("div#contentMsg").hide()
      }, errorClass: "invalid", validClass: "success", highlight: function (n, e) {
        $(n).addClass(e), $(n.form).find("label[for=" + n.id + "]").addClass(e)
      }
    }), $("#email").rules("add", {
      required: !0,
      email: !0,
      messages: {required: "", email: "Are you sure that's an email address?"}
    })
  }, window.validatePassword = function () {
    $("form.password").validate({
      invalidHandler: function (n, e) {
        var t = e.numberOfInvalids();
        if (t) {
          var a = 1 == t ? "Hang on... you missed a field." : "Hang on... to change your password, we need your current and your new one.";
          $("div#contentMsg span").html(a), $("div#contentMsg").show().fadeTo(3e3, 1).slideUp(), $("span.remind").css("font-weight", "700").css("text-decoration", "underline")
        } else $("div#contentMsg").hide()
      }, errorClass: "invalid", validClass: "success", highlight: function (n, e) {
        $(n).addClass(e), $(n.form).find("label[for=" + n.id + "]").addClass(e)
      }
    }), $("#password").rules("add", {
      required: !0,
      messages: {required: "."}
    }), $("#new_password").rules("add", {required: !0, messages: {required: ""}})
  }, window.websafe = function (n) {
    try {
      return null == n || null == n ? "" : u(n.toString())
    } catch (n) {
      return ""
    }
  }, window._ = l, window.ungettext = function (n, e, t) {
    return 1 == t ? n : e
  }, window.uggettext = l, window.Browser = f, window.Carousel = s, window.Subject = g, window.Template = function (n) {
    var e = [], t = ["var _p=[];", "with(env) {"];

    function a(n) {
      t.push(n)
    }

    function o(n) {
      t.push("_p.push(__s[" + e.length + "]);"), e.push(n)
    }

    var i, r = n.split("<%");
    o(r[0]);
    for (var s = 1; s < r.length; s++) {
      var l = r[s].split("%>");
      "=" == l[0][0] ? (i = l[0].substr(1), t.push("_p.push(htmlquote(" + i + "));")) : a(l[0]), o(l[1])
    }
    t.push("}", "return _p.join('');");
    var d = new Function(["__s", "env"], t.join("\n")), c = function (n) {
      return d(e, n)
    };
    return c.toString = function () {
      return n
    }, c.toCode = function () {
      return d.toString()
    }, c
  }, String.prototype.join = function (n) {
    return n.join(this)
  }, $(function () {
    var n;
    ($), function (n) {
      n.fn.add_new_field = function (e) {
        n(this).each(function () {
          var t = e || {href: "#" + this.id + "-popup"}, a = n(this),
            o = n('<input type="hidden">').attr("name", this.id + "-json").addClass("repeat-ignore").val("[]").insertBefore(a);
          return a.change(function () {
            "__add__" == a.val() && (t.onshow && t.onshow.apply(a, []), n.fn.colorbox({
              inline: !0,
              opacity: "0.5",
              href: t.href,
              open: !0
            }))
          }), n(t.href).bind("cbox_closed", function () {
            "__add__" == a.val() && (a.val(""), a.focus()), t.cancel && t.cancel()
          }), n("form:first", n(t.href)).submit(function (e) {
            e.preventDefault();
            var i = n(this).serializeArray(), r = {};
            for (var s in i) r[i[s].name] = n.trim(i[s].value);
            if (!t.validate || 0 != t.validate.apply(a, [r])) {
              n.fn.colorbox.close(), n("<option/>").html(r.label || r.value).attr("value", r.value).insertBefore(a.find("option:last").prev()).parent().val(r.value);
              var l = null;
              try {
                l = JSON.parse(o.val())
              } catch (n) {
                l = []
              }
              l.push(r), o.val(JSON.stringify(l)), a.focusNextInputField()
            }
          }), this
        })
      }
    }($), function () {
      var n = $("header#header-bar .search-component ul.search-results"),
        e = $('header#header-bar .search-component .search-bar-input input[type="text"]'), t = !1;
      var a = ["everything", "ebooks", "printdisabled"], o = {
        title: "books",
        author: "authors",
        lists: "lists",
        subject: "subjects",
        all: "all",
        advanced: "advancedsearch",
        text: "inside"
      }, r = function (n) {
        return n && -1 == n.indexOf(":") && -1 == n.indexOf('"') && (n = 'title: "' + n + '"'), n
      }, s = function (e) {
        var t = o[localStorage.getItem("facet")];
        if ("" !== e) {
          "books" === t && (e = r(e));
          var a = i(e, !0, 10), s = "all" === t ? "books" : t;
          n.css("opacity", .5), $.getJSON(a, function (e) {
            for (var t in n.css("opacity", 1).empty(), e.docs) y[s](e.docs[t])
          })
        }
      }, l = function (n) {
        var t = n.toLowerCase();
        if ("advanced" === t) return localStorage.setItem("facet", ""), void window.location.assign("/advancedsearch");
        localStorage.setItem("facet", t), $("header#header-bar .search-facet-selector select").val(t);
        var a = $("header#header-bar .search-facet-selector select").find("option:selected").text();
        $("header#header-bar .search-facet-value").html(a), $("header#header-bar .search-component ul.search-results").empty(), p = e.val();
        var o = i(p);
        $(".search-bar-input").attr("action", o), s(p)
      }, d = function (n) {
        if ($(n).length) {
          $("input[value='Protected DAISY']").remove(), $("input[name='has_fulltext']").remove();
        }
      }, c = function (n) {
        var e = n || localStorage.getItem("mode"), t = -1 != a.indexOf(e);
        localStorage.setItem("mode", t ? e : "ebooks"), $(".instantsearch-mode").val(localStorage.getItem("mode")), $("input[name=mode][value=" + localStorage.getItem("mode") + "]").attr("checked", "true"), d(".olform"), d(".search-bar-input")
      }, u = f.getJsonFromUrl();
      if (o[localStorage.getItem("facet")] || localStorage.setItem("facet", "all"), l(u.facet || localStorage.getItem("facet") || "all"), c(u.mode), u.q) {
        var p = u.q.replace(/\+/g, " ");
        if ("title" === localStorage.getItem("facet") && -1 != p.indexOf("title:")) {
          var g = p.split('"');
          3 === g.length && (p = g[1])
        }
        $(".search-bar-input [type=text]").val(p)
      }
      updateWorkAvailability();
      var b = function (n, e, t) {
        var a;
        return function () {
          var o = this, i = arguments;
          a ? clearTimeout(a) : t && n.apply(o, i), a = setTimeout(function () {
            t || n.apply(o, i), a = null
          }, e || 100)
        }
      };
      $(document).on("submit", ".trigger", function (n) {
        n.preventDefault(n), _(), $(".search-bar-input [type=text]").focus()
      });
      var m = !1, v = !1;
      $(window).width() < 568 && (m || $(".search-bar-input").addClass("trigger"), m = !0), $(window).resize(function () {
        if ($(this).width() < 568) m || ($(".search-bar-input").addClass("trigger"), $("header#header-bar .search-component ul.search-results").empty()), m = !0; else {
          if (m) {
            $(".search-bar-input").removeClass("trigger");
            var n = e.val();
            n && t && s(n)
          }
          m = !1, v = !1, $("header#header-bar .logo-component").removeClass("hidden"), $("header#header-bar .search-component").removeClass("search-component-expand")
        }
      });
      var _ = function () {
        (v = !v) ? ($("header#header-bar .logo-component").addClass("hidden"), $("header#header-bar .search-component").addClass("search-component-expand"), $(".search-bar-input").removeClass("trigger")) : ($("header#header-bar .logo-component").removeClass("hidden"), $("header#header-bar .search-component").removeClass("search-component-expand"), $(".search-bar-input").addClass("trigger"))
      };
      $("header#header-bar .search-facet-selector select").change(function (n) {
        var e = $("header .search-facet-selector select").val();
        "advanced" === e.toLowerCase() && n.preventDefault(n), l(e)
      });

      $("form.search-bar-input").on("submit", function () {
        p = e.val(), "books" === o[localStorage.getItem("facet")] && $("header#header-bar .search-component .search-bar-input input[type=text]").val(r(p)), d(".search-bar-input")
      }), $(".search-mode").change(function () {
        $("html,body").css("cursor", "wait"), c($(this).val()), $(".olform").length ? $(".olform").submit() : location.reload()
      }), $("li.instant-result a").on("click", function () {
        $("html,body").css("cursor", "wait"), $(this).css("cursor", "wait")
      }), $("header#header-bar .search-component .search-results li a").on("click", b(function () {
        $(document.body).css({cursor: "wait"})
      }, 300, !1)), e.on("keyup", b(function (n) {
        t = !0, [13, 37, 38, 39, 40].includes(n.keyCode) || s($(this).val())
      }, 500, !1)), e.on("focus", b(function (n) {
        t = !0, n.stopPropagation();
        var e = $(this).val();
        s(e)
      }, 300, !1)), $("textarea.markdown").focus(function () {
        $(".wmd-preview").show(), 0 == $("#prevHead").length && $(".wmd-preview").before('<h3 id="prevHead" style="margin:15px 0 10px;padding:0;">Preview</h3>')
      }), $(".dropclick").on("click", b(function () {
        $(this).next(".dropdown").slideToggle(25), $(this).parent().next(".dropdown").slideToggle(25), $(this).parent().find(".arrow").toggleClass("up")
      }, 300, !1)), $("a.add-to-list").on("click", b(function () {
        $(this).closest(".dropdown").slideToggle(25), $(this).closest(".arrow").toggleClass("up")
      }, 300, !1)), $(document).on("click", function () {
        var n;
        (n = $("#widget-add")).find(".dropdown").slideUp(25), n.find(".arrow").removeClass("up")
      }), $("#widget-add").on("click", function (n) {
        n.stopPropagation()
      }), $(".reading-log-lite select").change(function (n) {
        var e = this, t = $(e).closest("form"),
          a = "remove" === $(e).children("option").filter(":selected").text().toLowerCase(), o = $(t).attr("action");
        $.ajax({
          url: o, type: "POST", data: {bookshelf_id: $(e).val()}, datatype: "json", success: function (n) {
            a ? $(e).closest(".searchResultItem").remove() : location.reload()
          }
        }), n.preventDefault()
      }), $(document).ready(function () {
        $("#borrow_ebook,#read_ebook").on("click", function () {
          $(this).removeClass("cta-btn cta-btn--available").addClass("cta-btn cta-btn--available--load")
        })
      }), $(document).ready(function () {
        $("#waitlist_ebook").on("click", function () {
          $(this).removeClass("cta-btn cta-btn--unavailable").addClass("cta-btn cta-btn--unavailable--load")
        })
      })
    }($), function (n) {
      n.fn.extend({
        showPasswords: function (e) {
          return this.each(function () {
            var t = function (n, e) {
              e.val(n.val())
            }, a = function () {
              r.is(":checked") ? (t(i, o), o.show(), i.hide()) : (t(o, i), o.hide(), i.show())
            }, o = function (e) {
              e = n(e);
              var t = n("<input type='text' />");
              return t.insertAfter(e).attr({class: e.attr("class"), style: e.attr("style")}), t
            }(this), i = n(this), r = n(e);
            r.click(function () {
              a()
            }), i.keyup(function () {
              t(i, o)
            }), o.keyup(function () {
              t(o, i)
            }), a()
          })
        }
      })
    }($)
  })
}]);
//# sourceMappingURL=all.js.map