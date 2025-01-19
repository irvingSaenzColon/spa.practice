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
		view: "views/signin.html"
	},
	{
		path:"404",
		view:"views/notFound.html"
	}
];

const session = window.localStorage.getItem('SESSION_V1');


document.addEventListener('DOMContentLoaded', function() {
	const app = document.getElementById("main-content");


	async function handleRoute() {
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

	initAnchors();
  handleRoute();
});
