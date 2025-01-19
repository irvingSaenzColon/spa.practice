const routes = [
	{
		path:"",
		view:"views/home.html"
	},
	{
		path:"profile",
		view:"views/profile.html"
	},
	{
		path: "signin",
		view: "views/signin.html",
		controller: "controllers/signin.js"
	},
	{
		path:"404",
		view:"views/notFound.html"
	}
];

const session = window.localStorage.getItem('SESSION_V1');


document.addEventListener('DOMContentLoaded', function() {
	const root = document.getElementById('root');
	const app = document.getElementById("main-content");
	
	
	async function handleRoute() {
		removeControllerFiles();
		let pathname = window.location.pathname.split("/");
		pathname = pathname[pathname.length - 1];
		if(!session && !pathname.includes('signin')) {
			window.location.pathname = 'signin';
		}
		const routeFound = routes.find((route) => route.path === pathname || route.path === "404");
		let htmlData = "";
		if(routeFound) {
			let routeView = window.location.origin+"/"+routeFound.view;
			htmlData = await window.fetch(routeView).then(data => data.text());
			if(routeFound.controller) {
				await window.fetch(routeFound.controller).then(data => data.text);
				loadControllerFile(routeFound.controller);
			}
			app.innerHTML = htmlData;
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

	
	function removeControllerFiles(controllerFile) {
		const scriptsController = document.getElementsByTagName('script');
		for(let i = 0; i < scriptsController.length; i++) {
			if(scriptsController[i].hasAttribute('data-controller')) {
				scriptsController[i].parentNode.removeChild(scriptsController[i]);
			}
		}
	}


	async function loadControllerFile(filePath) {
		const scriptTag = document.createElement('script');
		scriptTag.setAttribute('data-controller', 'true');
		scriptTag.setAttribute('src', filePath);
		scriptTag.setAttribute('type', 'text/javascript');
		root.appendChild(scriptTag);
	}

	initAnchors();
  handleRoute();
});
