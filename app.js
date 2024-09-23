const routes = [
	{
		path:"",
		view:"src/views/home.html"
	},
	{
		path:"profile",
		view:"src/views/profile.html"
	},
	{
		path:"404",
		view:"src/views/notFound.html"
	}
];


document.addEventListener('DOMContentLoaded', function() {
	const app = document.getElementById("main-content");
   	const location = window.location;


	async function handleRoute() {
		let pathname = window.location.pathname.split("/");
		pathname.splice(0, 2);
		pathname = pathname.join("/");
		const routeFound = routes.find((route) => route.path === pathname || route.path === "404");
		console.log(routeFound);
		let htmlData = "";
		if(routeFound) {
			let routeView = window.location.origin+"/Lifter.io/"+routeFound.view;
			console.log(routeView);
			htmlData = await window.fetch(routeView).then(data => data.text());
			app.innerHTML = htmlData;	
		} else {
			app.innerHTML = "No se contró nada";	
		}
	}


	const aTags = document.getElementsByTagName("a");
	for(let i = 0; i < aTags.length; i++) {
		aTags[i].addEventListener("click", function(event) {
			event.preventDefault();
			const newRoute = event.target.href;
			console.log(newRoute);
			history.pushState({}, null,newRoute);
			handleRoute();
		});

	}


    // Escuchar popstate
   	handleRoute();
});
