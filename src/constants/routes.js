const ROUTES = [
	{
		path:"",
		view:"views/home.html",
		controller: "home",
	},
	{
		path:"profile",
		view:"views/profile.html"
	},
	{
		path: "signin",
		view: "views/signin.html",
		controller: "signin"
	},
	{
		path:"404",
		view:"views/notFound.html"
	}
];

export default ROUTES;