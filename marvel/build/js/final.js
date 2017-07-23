"use strict";

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
var MD5 = function MD5(string) {
    function RotateLeft(lValue, iShiftBits) {
        return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
    }
    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 0x80000000;
        lY8 = lY & 0x80000000;
        lX4 = lX & 0x40000000;
        lY4 = lY & 0x40000000;
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
            } else {
                return lResult ^ 0x40000000 ^ lX8 ^ lY8;
            }
        } else {
            return lResult ^ lX8 ^ lY8;
        }
    }
    function F(x, y, z) {
        return x & y | ~x & z;
    }
    function G(x, y, z) {
        return x & z | y & ~z;
    }
    function H(x, y, z) {
        return x ^ y ^ z;
    }
    function I(x, y, z) {
        return y ^ (x | ~z);
    }
    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - lByteCount % 4) / 4;
            lBytePosition = lByteCount % 4 * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
            lByteCount++;
        }
        lWordCount = (lByteCount - lByteCount % 4) / 4;
        lBytePosition = lByteCount % 4 * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    function WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte,
            lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = lValue >>> lCount * 8 & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode(c >> 6 | 192);
                utftext += String.fromCharCode(c & 63 | 128);
            } else {
                utftext += String.fromCharCode(c >> 12 | 224);
                utftext += String.fromCharCode(c >> 6 & 63 | 128);
                utftext += String.fromCharCode(c & 63 | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301;b = 0xEFCDAB89;c = 0x98BADCFE;d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;BB = b;CC = c;DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
};
"use strict";

function getHash() {
	var publicKey = "c97a0c85709eb1a2a71994d9261ffbd6";
	var privateKey = "ba63ece6936566ddc4bf1219499fd705b8e32934";
	var ts = new Date().getTime();
	var hash = MD5(ts + privateKey + publicKey);
	hash = '?apikey=' + publicKey + "&ts=" + ts + "&hash=" + hash;
	return hash;
}

function getMarvelUrl(url) {
	var base = "https://gateway.marvel.com/v1/public/";

	if (url.complement == 'comic') {
		base = url.base + getHash();
	} else {
		base += url.complement + getHash();
	}

	if (url.limit != '') {
		base += "&limit=" + url.limit;
	}

	if (url.offset != '') {
		base += "&offset=" + url.offset;
	}

	if (url.order != '') {
		base += "&orderBy=" + url.order;
	}

	if (url.name != '') {
		base += "&nameStartsWith=" + url.name;
	}

	return base;
};
"use strict";

/*var url = getMarvelUrl( 'characters') ;

ajax_get( url , function(data) {
	var datos = data['data']['results'];
	console.log(datos);
	var listado = "";
	datos.forEach(function(entry){ 
		//console.log(entry);
		//listado = listado + "<li class='character__item' data-name='" + entry["name"] + "'>" + entry["description"] + "</li>";
	});
	//document.getElementById("characters-list").innerHtml = listado;
});
 */
var app = angular.module("marvelApi", ["LocalStorageModule"]);
"use strict";

/**
 * An Angular module that gives you access to the browsers local storage
 * @version v0.7.1 - 2017-06-21
 * @link https://github.com/grevory/angular-local-storage
 * @author grevory <greg@gregpike.ca>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function (a, b) {
  var c = b.isDefined,
      d = b.isUndefined,
      e = b.isNumber,
      f = b.isObject,
      g = b.isArray,
      h = b.isString,
      i = b.extend,
      j = b.toJson;b.module("LocalStorageModule", []).provider("localStorageService", function () {
    this.prefix = "ls", this.storageType = "localStorage", this.cookie = { expiry: 30, path: "/", secure: !1 }, this.defaultToCookie = !0, this.notify = { setItem: !0, removeItem: !1 }, this.setPrefix = function (a) {
      return this.prefix = a, this;
    }, this.setStorageType = function (a) {
      return this.storageType = a, this;
    }, this.setDefaultToCookie = function (a) {
      return this.defaultToCookie = !!a, this;
    }, this.setStorageCookie = function (a, b, c) {
      return this.cookie.expiry = a, this.cookie.path = b, this.cookie.secure = c, this;
    }, this.setStorageCookieDomain = function (a) {
      return this.cookie.domain = a, this;
    }, this.setNotify = function (a, b) {
      return this.notify = { setItem: a, removeItem: b }, this;
    }, this.$get = ["$rootScope", "$window", "$document", "$parse", "$timeout", function (a, b, k, l, m) {
      function n(c) {
        if (c || (c = b.event), s.setItem && h(c.key) && w(c.key)) {
          var d = v(c.key);m(function () {
            a.$broadcast("LocalStorageModule.notification.changed", { key: d, newvalue: c.newValue, storageType: p.storageType });
          });
        }
      }var o,
          p = this,
          q = p.prefix,
          r = p.cookie,
          s = p.notify,
          t = p.storageType;k ? k[0] && (k = k[0]) : k = document, "." !== q.substr(-1) && (q = q ? q + "." : "");var u = function u(a) {
        return q + a;
      },
          v = function v(a) {
        return a.replace(new RegExp("^" + q, "g"), "");
      },
          w = function w(a) {
        return 0 === a.indexOf(q);
      },
          x = function x() {
        try {
          var c = t in b && null !== b[t],
              d = u("__" + Math.round(1e7 * Math.random()));return c && (o = b[t], o.setItem(d, ""), o.removeItem(d)), c;
        } catch (b) {
          return p.defaultToCookie && (t = "cookie"), a.$broadcast("LocalStorageModule.notification.error", b.message), !1;
        }
      },
          y = x(),
          z = function z(b, c, e) {
        var f = J();try {
          if (K(e), c = d(c) ? null : j(c), !y && p.defaultToCookie || "cookie" === p.storageType) return y || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), s.setItem && a.$broadcast("LocalStorageModule.notification.setitem", { key: b, newvalue: c, storageType: "cookie" }), F(b, c);try {
            o && o.setItem(u(b), c), s.setItem && a.$broadcast("LocalStorageModule.notification.setitem", { key: b, newvalue: c, storageType: p.storageType });
          } catch (d) {
            return a.$broadcast("LocalStorageModule.notification.error", d.message), F(b, c);
          }return !0;
        } finally {
          K(f);
        }
      },
          A = function A(b, c) {
        var d = J();try {
          if (K(c), !y && p.defaultToCookie || "cookie" === p.storageType) return y || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), G(b);var e = o ? o.getItem(u(b)) : null;if (!e || "null" === e) return null;try {
            return JSON.parse(e);
          } catch (a) {
            return e;
          }
        } finally {
          K(d);
        }
      },
          B = function B() {
        var b = J();try {
          var c = 0;arguments.length >= 1 && ("localStorage" === arguments[arguments.length - 1] || "sessionStorage" === arguments[arguments.length - 1]) && (c = 1, K(arguments[arguments.length - 1]));var d, e;for (d = 0; d < arguments.length - c; d++) {
            if (e = arguments[d], !y && p.defaultToCookie || "cookie" === p.storageType) y || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), s.removeItem && a.$broadcast("LocalStorageModule.notification.removeitem", { key: e, storageType: "cookie" }), H(e);else try {
              o.removeItem(u(e)), s.removeItem && a.$broadcast("LocalStorageModule.notification.removeitem", { key: e, storageType: p.storageType });
            } catch (b) {
              a.$broadcast("LocalStorageModule.notification.error", b.message), H(e);
            }
          }
        } finally {
          K(b);
        }
      },
          C = function C(b) {
        var c = J();try {
          if (K(b), !y) return a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), [];var d = q.length,
              e = [];for (var f in o) {
            if (f.substr(0, d) === q) try {
              e.push(f.substr(d));
            } catch (b) {
              return a.$broadcast("LocalStorageModule.notification.error", b.Description), [];
            }
          }return e;
        } finally {
          K(c);
        }
      },
          D = function D(b, c) {
        var d = J();try {
          K(c);var e = q ? new RegExp("^" + q) : new RegExp(),
              f = b ? new RegExp(b) : new RegExp();if (!y && p.defaultToCookie || "cookie" === p.storageType) return y || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), I();if (!y && !p.defaultToCookie) return !1;var g = q.length;for (var h in o) {
            if (e.test(h) && f.test(h.substr(g))) try {
              B(h.substr(g));
            } catch (b) {
              return a.$broadcast("LocalStorageModule.notification.error", b.message), I();
            }
          }return !0;
        } finally {
          K(d);
        }
      },
          E = function () {
        try {
          return b.navigator.cookieEnabled || "cookie" in k && (k.cookie.length > 0 || (k.cookie = "test").indexOf.call(k.cookie, "test") > -1);
        } catch (b) {
          return a.$broadcast("LocalStorageModule.notification.error", b.message), !1;
        }
      }(),
          F = function F(b, c, h, i) {
        if (d(c)) return !1;if ((g(c) || f(c)) && (c = j(c)), !E) return a.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), !1;try {
          var l = "",
              m = new Date(),
              n = "";if (null === c ? (m.setTime(m.getTime() + -864e5), l = "; expires=" + m.toGMTString(), c = "") : e(h) && 0 !== h ? (m.setTime(m.getTime() + 24 * h * 60 * 60 * 1e3), l = "; expires=" + m.toGMTString()) : 0 !== r.expiry && (m.setTime(m.getTime() + 24 * r.expiry * 60 * 60 * 1e3), l = "; expires=" + m.toGMTString()), b) {
            var o = "; path=" + r.path;r.domain && (n = "; domain=" + r.domain), "boolean" == typeof i ? i === !0 && (n += "; secure") : r.secure === !0 && (n += "; secure"), k.cookie = u(b) + "=" + encodeURIComponent(c) + l + o + n;
          }
        } catch (b) {
          return a.$broadcast("LocalStorageModule.notification.error", b.message), !1;
        }return !0;
      },
          G = function G(b) {
        if (!E) return a.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), !1;for (var c = k.cookie && k.cookie.split(";") || [], d = 0; d < c.length; d++) {
          for (var e = c[d]; " " === e.charAt(0);) {
            e = e.substring(1, e.length);
          }if (0 === e.indexOf(u(b) + "=")) {
            var f = decodeURIComponent(e.substring(q.length + b.length + 1, e.length));try {
              var g = JSON.parse(f);return "number" == typeof g ? f : g;
            } catch (a) {
              return f;
            }
          }
        }return null;
      },
          H = function H(a) {
        F(a, null);
      },
          I = function I() {
        for (var a = null, b = q.length, c = k.cookie.split(";"), d = 0; d < c.length; d++) {
          for (a = c[d]; " " === a.charAt(0);) {
            a = a.substring(1, a.length);
          }var e = a.substring(b, a.indexOf("="));H(e);
        }
      },
          J = function J() {
        return t;
      },
          K = function K(a) {
        return a && t !== a && (t = a, y = x()), y;
      },
          L = function L(a, b, d, e, g) {
        e = e || b;var h = A(e, g);return null === h && c(d) ? h = d : f(h) && f(d) && (h = i(h, d)), l(b).assign(a, h), a.$watch(b, function (a) {
          z(e, a, g);
        }, f(a[b]));
      };y && (b.addEventListener ? (b.addEventListener("storage", n, !1), a.$on("$destroy", function () {
        b.removeEventListener("storage", n);
      })) : b.attachEvent && (b.attachEvent("onstorage", n), a.$on("$destroy", function () {
        b.detachEvent("onstorage", n);
      })));var M = function M(a) {
        var c = J();try {
          K(a);for (var d = 0, e = b[t], f = 0; f < e.length; f++) {
            0 === e.key(f).indexOf(q) && d++;
          }return d;
        } finally {
          K(c);
        }
      },
          N = function N(a) {
        q = a;
      };return { isSupported: y, getStorageType: J, setStorageType: K, setPrefix: N, set: z, add: z, get: A, keys: C, remove: B, clearAll: D, bind: L, deriveKey: u, underiveKey: v, length: M, defaultToCookie: this.defaultToCookie, cookie: { isSupported: E, set: F, add: F, get: G, remove: H, clearAll: I } };
    }];
  });
}(window, window.angular);
//# sourceMappingURL=angular-local-storage.min.js.map
'use strict';

app.factory('marvelFactory', function ($http, $log, $q) {
  return {
    getData: function getData(config) {
      var deferred = $q.defer();
      var url = getMarvelUrl(config);

      $http.get(url).success(function (data) {
        //console.log(data);
        var pages = [];
        for (var i = 0; i < data.data.total / config.limit; i++) {
          pages.push(i);
        }
        deferred.resolve({
          attribution: data.attributionHTML,
          copyright: data.copyright,
          count: data.data.count,
          pages: pages,
          posts: data.data.results,
          total: data.data.total
        });
      }).error(function (msg, code) {
        deferred.reject(msg);
        $log.error(msg, code);
      });

      return deferred.promise;
    }
  };
});
'use strict';

app.factory('comicFactory', function ($http, $log, $q) {
  return {
    getData: function getData(config) {
      var deferred = $q.defer();
      var url = getMarvelUrl(config);

      $http.get(url).success(function (data) {
        deferred.resolve({
          attribution: data.attributionHTML,
          copyright: data.copyright,
          count: data.data.count,
          comic: data.data.results[0],
          total: data.data.total
        });
      }).error(function (msg, code) {
        deferred.reject(msg);
        $log.error(msg, code);
      });
      return deferred.promise;
    }
  };
});
"use strict";

app.controller('mainController', ["$scope", "$http", "localStorageService", "marvelFactory", function ($scope, $http, $storaged, marvel) {
	$scope.config = {
		complement: 'characters',
		limit: 10,
		name: '',
		offset: 0,
		order: 'name',
		numberPages: 5
	};

	$scope.actualComic = {};
	$scope.posts = [];
	$scope.comicview = false;
	$scope.total = 10;
	$scope.pages = [];
	$scope.currentPage = 0;
	$scope.lastPage = 5;

	$scope.favourites = [];

	if ($storaged.get("favourites-list")) {
		$scope.favourites = $storaged.get("favourites-list");
	} else {
		$scope.favourites = [];
	}

	$scope.$watchCollection('favourites', function (newValue, oldValue) {
		$storaged.set("favourites-list", $scope.favourites);
	});

	//Function that modify the value of the post to change the different interaction in the flow
	$scope.getPost = function (configuration) {
		//$scope.data = marvel.getData( $scope.config );
		marvel.getData($scope.config).then(function (data) {
			$scope.total = data.total;
			$scope.posts = data.posts;
			$scope.pages = data.pages;
		});
	};

	$scope.changeView = function () {
		$scope.comicview = !$scope.comicview;
	};

	//Private functions 
	$scope.changePost = function (value) {
		$scope.posts = value;
		console.log(value);
	};

	$scope.changeActualComic = function (comic) {
		if (comic.title == 'No comic selected') {
			$scope.actualComic.title = 'No comic selected';
			$scope.actualComic.description = 'No comic selected';
			$scope.actualComic.URI = 'No comic selected';
			$scope.actualComic.thumbnail = 'No comic selected';
			$scope.actualComic.price = 'No comic selected';
			$scope.actualComic.url = 'No comic selected';
		} else {
			$scope.actualComic.title = comic.title;
			$scope.actualComic.description = comic.description > 1 ? comic.description : "This comic doesn't have a description";
			$scope.actualComic.URI = comic.resourceURI;
			$scope.actualComic.thumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;
			$scope.actualComic.price = comic.prices[0].price;
			$scope.actualComic.url = comic.urls[0].url;
		}
	};

	$scope.getPost = function (configuration) {
		//$scope.data = marvel.getData( $scope.config );
		marvel.getData($scope.config).then(function (data) {
			$scope.total = data.total;
			$scope.posts = data.posts;
			$scope.pages = data.pages;
		});
	};

	$scope.pushFavourite = function ($nowComic) {
		$scope.favourites.push({
			the_id: $nowComic.id,
			title: $nowComic.title,
			thumbnail: $nowComic.thumbnail.path + '.' + $nowComic.thumbnail.extension
		});
	};

	$scope.spliceFavourite = function ($the_id) {
		$scope.favourites.splice(findWithAttr($scope.favourites, 'the_id', $the_id), 1);
	};

	$scope.getPost($scope.config);
}]);

function findWithAttr(array, attr, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i][attr] === value) {
			return i;
		}
	}
	return -1;
}
"use strict";

app.controller('searchCharacterController', ["$scope", function ($scope) {
  $scope.searchCharacter = function (name) {
    $scope.config.name = name;
    $scope.getPost($scope.config);
  };
}]);
'use strict';

app.controller('moreResultsController', ["$scope", function ($scope) {
  $scope.moreResults = function () {
    var complement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'characters';
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var name = arguments[3];

    var offset = 0;
    $scope.currentPage = n;
    $scope.lastPage = n + $scope.config.numberPages;
    if (n > 1) {
      offset = limit * (n - 1) - 1;
    }
    $scope.config.complement = name;
    $scope.config.complement = complement;
    $scope.config.limit = limit;
    $scope.config.offset = offset;
    $scope.getPost($scope.config);
  };
}]);
"use strict";

app.controller('favouriteController', ["$scope", "$http", "localStorageService", "comicFactory", function ($scope, $http, $storaged, factory) {

  $scope.deleteFavourite = function ($the_id) {
    $scope.spliceFavourite($the_id);
  };

  $scope.getActualComic = function ($resourceURI) {
    $scope.changeView();

    if ($resourceURI === 'reset') {
      var nowComic = {};
      nowComic.title = 'No comic selected';
      $scope.changeActualComic(nowComic);
    } else {
      $resourceURI = $resourceURI.replace('http', 'https');

      $scope.config = {
        base: $resourceURI,
        complement: 'comic',
        limit: 100,
        offset: 0,
        name: '',
        order: 'modified'
      };

      factory.getData($scope.config).then(function (data) {
        $scope.total = data.total;
        console.log(data.comic);
        $scope.changeActualComic(data.comic);
      });
    }
  };

  $scope.addFavourite = function ($resourceURI) {

    var $nowComic = {};

    $scope.config = {
      base: $resourceURI,
      complement: 'comic',
      limit: 100,
      offset: 0,
      name: '',
      order: 'modified'
    };

    factory.getData($scope.config).then(function (data) {
      $scope.total = data.total;
      $nowComic = data.comic;
      var found = $scope.favourites.some(function (el) {
        return el.the_id === $nowComic.id;
      });
      if ($scope.favourites.length < 3) {
        if (!found) {
          $scope.pushFavourite($nowComic);
        } else {
          alert("You can't add the same comic more than 1 time");
        }
      } else {
        alert("You can't add more than 3 comics");
      }
      $scope.getActualComic('reset');
    });
  };
}]);
//# sourceMappingURL=final.js.map
