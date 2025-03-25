function r(r) {
  return i(nx(a(r), 8 * r.length));
}

function nx(r, n) {
  r[n >> 5] |= 128 << n % 32, r[14 + (n + 64 >>> 9 << 4)] = n;
  for (var t = 1732584193, a = -271733879, i = -1732584194, h = 271733878, l = 0; l < r.length; l += 16) {
    var v = t, g = a, A = i, d = h;
    t = u(t, a, i, h, r[l + 0], 7, -680876936), h = u(h, t, a, i, r[l + 1], 12, -389564586),
      i = u(i, h, t, a, r[l + 2], 17, 606105819), a = u(a, i, h, t, r[l + 3], 22, -1044525330),
      t = u(t, a, i, h, r[l + 4], 7, -176418897), h = u(h, t, a, i, r[l + 5], 12, 1200080426),
      i = u(i, h, t, a, r[l + 6], 17, -1473231341), a = u(a, i, h, t, r[l + 7], 22, -45705983),
      t = u(t, a, i, h, r[l + 8], 7, 1770035416), h = u(h, t, a, i, r[l + 9], 12, -1958414417),
      i = u(i, h, t, a, r[l + 10], 17, -42063), a = u(a, i, h, t, r[l + 11], 22, -1990404162),
      t = u(t, a, i, h, r[l + 12], 7, 1804603682), h = u(h, t, a, i, r[l + 13], 12, -40341101),
      i = u(i, h, t, a, r[l + 14], 17, -1502002290), t = e(t, a = u(a, i, h, t, r[l + 15], 22, 1236535329), i, h, r[l + 1], 5, -165796510),
      h = e(h, t, a, i, r[l + 6], 9, -1069501632), i = e(i, h, t, a, r[l + 11], 14, 643717713),
      a = e(a, i, h, t, r[l + 0], 20, -373897302), t = e(t, a, i, h, r[l + 5], 5, -701558691),
      h = e(h, t, a, i, r[l + 10], 9, 38016083), i = e(i, h, t, a, r[l + 15], 14, -660478335),
      a = e(a, i, h, t, r[l + 4], 20, -405537848), t = e(t, a, i, h, r[l + 9], 5, 568446438),
      h = e(h, t, a, i, r[l + 14], 9, -1019803690), i = e(i, h, t, a, r[l + 3], 14, -187363961),
      a = e(a, i, h, t, r[l + 8], 20, 1163531501), t = e(t, a, i, h, r[l + 13], 5, -1444681467),
      h = e(h, t, a, i, r[l + 2], 9, -51403784), i = e(i, h, t, a, r[l + 7], 14, 1735328473),
      t = o(t, a = e(a, i, h, t, r[l + 12], 20, -1926607734), i, h, r[l + 5], 4, -378558),
      h = o(h, t, a, i, r[l + 8], 11, -2022574463), i = o(i, h, t, a, r[l + 11], 16, 1839030562),
      a = o(a, i, h, t, r[l + 14], 23, -35309556), t = o(t, a, i, h, r[l + 1], 4, -1530992060),
      h = o(h, t, a, i, r[l + 4], 11, 1272893353), i = o(i, h, t, a, r[l + 7], 16, -155497632),
      a = o(a, i, h, t, r[l + 10], 23, -1094730640), t = o(t, a, i, h, r[l + 13], 4, 681279174),
      h = o(h, t, a, i, r[l + 0], 11, -358537222), i = o(i, h, t, a, r[l + 3], 16, -722521979),
      a = o(a, i, h, t, r[l + 6], 23, 76029189), t = o(t, a, i, h, r[l + 9], 4, -640364487),
      h = o(h, t, a, i, r[l + 12], 11, -421815835), i = o(i, h, t, a, r[l + 15], 16, 530742520),
      t = c(t, a = o(a, i, h, t, r[l + 2], 23, -995338651), i, h, r[l + 0], 6, -198630844),
      h = c(h, t, a, i, r[l + 7], 10, 1126891415), i = c(i, h, t, a, r[l + 14], 15, -1416354905),
      a = c(a, i, h, t, r[l + 5], 21, -57434055), t = c(t, a, i, h, r[l + 12], 6, 1700485571),
      h = c(h, t, a, i, r[l + 3], 10, -1894986606), i = c(i, h, t, a, r[l + 10], 15, -1051523),
      a = c(a, i, h, t, r[l + 1], 21, -2054922799), t = c(t, a, i, h, r[l + 8], 6, 1873313359),
      h = c(h, t, a, i, r[l + 15], 10, -30611744), i = c(i, h, t, a, r[l + 6], 15, -1560198380),
      a = c(a, i, h, t, r[l + 13], 21, 1309151649), t = c(t, a, i, h, r[l + 4], 6, -145523070),
      h = c(h, t, a, i, r[l + 11], 10, -1120210379), i = c(i, h, t, a, r[l + 2], 15, 718787259),
      a = c(a, i, h, t, r[l + 9], 21, -343485551), t = f(t, v), a = f(a, g), i = f(i, A),
      h = f(h, d);
  }
  return Array(t, a, i, h);
}

function t(r, n, t, u, e, o) {
  return f((c = f(f(n, r), f(u, o))) << (a = e) | c >>> 32 - a, t);
  var c, a;
}

function u(r, n, u, e, o, c, f) {
  return t(n & u | ~n & e, r, n, o, c, f);
}

function e(r, n, u, e, o, c, f) {
  return t(n & e | u & ~e, r, n, o, c, f);
}

function o(r, n, u, e, o, c, f) {
  return t(n ^ u ^ e, r, n, o, c, f);
}

function c(r, n, u, e, o, c, f) {
  return t(u ^ (n | ~e), r, n, o, c, f);
}

function f(r, n) {
  var t = (65535 & r) + (65535 & n);
  return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
}

function a(r) {
  for (var n = Array(), t = 0; t < 8 * r.length; t += 8) n[t >> 5] |= (255 & r.charCodeAt(t / 8)) << t % 32;
  return n;
}

function i(r) {
  for (var n = '0123456789abcdef', t = '', u = 0; u < 4 * r.length; u++) t += n.charAt(r[u >> 2] >> u % 4 * 8 + 4 & 15) + n.charAt(r[u >> 2] >> u % 4 * 8 & 15);
  return t;
}

// function h(r) {
//   for (var n = '', t = 0; t < 4 * r.length; t += 3) for (var u = (r[t >> 2] >> t % 4 * 8 & 255) << 16 | (r[t + 1 >> 2] >> (t + 1) % 4 * 8 & 255) << 8 | r[t + 2 >> 2] >> (t + 2) % 4 * 8 & 255, e = 0; e < 4; e++) 8 * t + 6 * e > 32 * r.length ? n += '' : n += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(u >> 6 * (3 - e) & 63);
//   return n;
// }



// let instance_id = 23801055
// let g = {'cardContractId':9404475, 'cardType':3, 'reservedNum': 1, 'version': '2.9.305', 'seatNums': [22]}

// let res = Object.keys(g).map(function(e) {
//   return e + '=' + g[e];
// }).sort().join('&') + '&' + instance_id

export function getSign(obj, instance_id) {
  return r(Object.keys(obj).map(key => {
    return key + '=' + obj[key]
  }).sort().join('&') + '&' + instance_id)
}

// let v = Object.keys(g).map(function(e) {
//   return e;
// }).sort().join(',')

// console.log('sign:',r(res))
// console.log('signKeys:',v)
