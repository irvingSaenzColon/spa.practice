import ROUTES from "./constants/routes.js";
import controllers from "./controllers/index.js";
import { getContext, contextListener } from './helpers/context.js';
const context = getContext();


document.addEventListener('DOMContentLoaded', function() {
	const app = document.getElementById("main-content");
	
	async function handleRoute() {
		let pathname = window.location.pathname.split("/");
		pathname = pathname[pathname.length - 1];
		if(context.session && pathname.includes('signin')) {
			if (window.location.pathname !== '/') {
				history.pushState({}, null, '/');
			}
			pathname = '';
		} else if(!context.session && !pathname.includes('signin')) {
			if (window.location.pathname !== '/signin') {
				history.pushState({}, null, '/signin');
			}
			pathname = 'signin';
		}
		const routeFound = ROUTES.find((route) => route.path === pathname || route.path === "404");
		console.log('El valor de routeFound: ', routeFound);
		let htmlData = "";
		if(routeFound) {
			let routeView = window.location.origin+"/"+routeFound.view;
			htmlData = await window.fetch(routeView).then(data => data.text());
			app.innerHTML = htmlData;
			if(routeFound.controller && controllers[routeFound.controller]) {
				controllers[routeFound.controller]();
			}
		} else {
			app.innerHTML = "No se contró nada";
		}
	}


	function initAnchors() {
		const aTags = document.getElementsByTagName("a");
		for(let i = 0; i < aTags.length; i++) {
			aTags[i].addEventListener("click", function(event) {
				event.preventDefault();
				const newRoute = event.target.href;
				history.pushState({}, null, newRoute);
				handleRoute();
			});
		}
	}


	initAnchors();
  handleRoute();
	contextListener('session', (newSession) => {
		console.log('El nuevo valor es: ', newSession);
		initAnchors();
		handleRoute();
	})
});