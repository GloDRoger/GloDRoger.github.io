

var u = navigator.userAgent;
//Android终端
window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
//iOS终端
window.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (window.isiOS) {
	//如果为iOS
	// 修复点击300ms延迟
	if ("addEventListener" in document) {
		document.addEventListener(
			"DOMContentLoaded",
			() => {
				FastClick.attach(document.body);
			},
			false
		);
	}
	FastClick.prototype.focus = function (targetElement) {
		targetElement.focus();
	};
}
