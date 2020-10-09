/*
	Author: Asmir BELKIC
	Date: last update on 10/10/2020
	Licence: MIT © Copyright All rights reserved.
*/
fetch("data/heroes.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		appendData(data);
	})
	.catch(function (err) {
		console.log("error: " + err);
	});

function appendData(data) {
	var mainContainer = document.getElementById("list-data");
	var data = data["heroes"];
	data.forEach((i) => {
		var div = document.createElement("li");
		var img = document.createElement("img");
		var tipsClose = document.querySelector(".tips-close");
		var tips = document.querySelector(".tips-content");

		//var id = i.id
		var tag = i.tag;
		var name = i.name;
		var bio = i.tips;
		div.innerHTML = `<span>` + name + `</span>`;
		//div.setAttribute('data-index', id)
		img.src = "../img/heroes/" + tag + ".png";

		/*
		Solution : https://softauthor.com/javascript-for-loop-click-event-issues-solutions/
		*/

		div.addEventListener("click", clickHandler);

		/*
		Click handler Solution : https://stackoverflow.com/a/45760635
		*/

		function clickHandler() {
			if (bio === undefined || bio.length == 0) {
				tips.parentNode.classList.add("active");
				tips.innerHTML =
					"<h2>" +
					name +
					"</h2>" +
					`<p>Désolé, aucune astuce n'as été trouvée pour ` +
					name;
			} else {
				tips.parentNode.classList.add("active");
				tips.innerHTML = "<h2>" + name + "</h2>";
				Object.keys(bio).forEach(function (element) {
					tips.innerHTML += `<p> ${bio[element]} </p>`;
				});
				var tipsContent = document.querySelector(".tips-content");
				var arr = document.querySelectorAll(".tips-content > p");

				var showMore = document.createElement("a");
				var divHidden = document.createElement("div");

				var pArr = Array.prototype.slice.call(arr);
				var last5 = pArr.slice(3);

				if (pArr.length >= 3) {
					tipsContent.appendChild(showMore);
					tipsContent.appendChild(divHidden);
					for (let i = 0; i < last5.length; i++) {
						divHidden.appendChild(last5[i]);
					}
				}

				showMore.className = "read-more-btn";
				showMore.text = "Show more";
				divHidden.className = "hidden";

				showMore.addEventListener("click", function () {
					divHidden.classList.add("active");
					this.style.display = "none";
				});
			}
			var div = document.querySelectorAll("li");
			for (var n = 0; n < div.length; ++n) {
				if (div[n] !== this) {
					div[n].className = "";
				}
			}
			this.className = "focus";
		}

		tipsClose.addEventListener("click", function () {
			this.parentNode.classList.remove("active");
			div.className = "";
		});

		document.addEventListener("keydown", function (event) {
			if (event.keyCode === 27) {
				tips.parentNode.classList.remove("active");
				div.className = "";
			}
		});

		mainContainer.appendChild(div);
		div.append(img);
	});
}

// search input
(function searchListInput() {
	var inputFilter = document.querySelector("[data-filter]");
	inputFilter.addEventListener("keyup", function () {
		var inputValue = this.value,
			i;
		var filterList = document.getElementById(this.dataset.filter);
		var filterItem = filterList.querySelectorAll("li");
		for (i = 0; i < filterItem.length; i++) {
			var _this = filterItem[i];
			var phrase = _this.innerHTML;
			if (phrase.search(new RegExp(inputValue, "i")) < 0) {
				_this.style.display = "none";
			} else {
				_this.style.display = "flex";
			}
		}
	});
})();

// cookie
var purecookieTitle = "We use cookies";
var purecookieDesc =
	"En utilisant ce site Web, vous acceptez automatiquement que nous utilisions des cookies."; // Description
var purecookieLink =
	'<a href="cookie-policy.html" target="_blank">Pourquoi ?</a>';
var purecookieButton = "Accepter & Fermer";

function pureFadeIn(elem, display) {
	var el = document.getElementById(elem);
	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
		var val = parseFloat(el.style.opacity);
		if (!((val += 0.02) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
}
function pureFadeOut(elem) {
	var el = document.getElementById(elem);
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= 0.02) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
}

function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function eraseCookie(name) {
	document.cookie = name + "=; Max-Age=-99999999;";
}

var reference = (function cookieConsent() {
	if (!getCookie("purecookieDismiss")) {
		document.body.innerHTML +=
			'<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><h2>' +
			purecookieTitle +
			'</h2></div><div class="cookieDesc"><p>' +
			purecookieDesc +
			" " +
			purecookieLink +
			'</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' +
			purecookieButton +
			"</a></div></div>";
		pureFadeIn("cookieConsentContainer");
	}
	return cookieConsent;
})();

function purecookieDismiss() {
	setCookie("purecookieDismiss", "1", 7);
	pureFadeOut("cookieConsentContainer");
	location.reload();
}

reference();
