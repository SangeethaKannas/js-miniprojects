class Route {

    constructor(name, defaultRoute) {

        try {
            if (!name) {
                throw 'error: name and htmlName parameters are mandatories';
            }
            this.name = name;
            this.defaultRoute = defaultRoute;
        } catch (error) {
            console.error(error);
        }

    }

    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }

}