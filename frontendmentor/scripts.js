
function init() {
    const routeStrings = ['socialproof', 'iptracker', 'testimonials', 'bookmark'];
    const routes = [];
    routeStrings.map(routeString => {
        routes.push(new Route(routeString))
    });
    console.log(...routes)
    const router = new Router(routes);
}

document.addEventListener("DOMContentLoaded", init);