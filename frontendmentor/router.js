'use strict';

class Router {
    constructor(routes) {
        if (!Router.instance) {
            try {
                if (!routes) {
                    throw 'error: routes param is mandatory';
                }
                this.routes = routes;
                this.rootElem = document.getElementById('app');
                window.addEventListener('hashchange', () => {
                    this.hasChanged();
                });
                this.hasChanged();

                Router.instance = this;
            } catch (e) {
                console.error(e);
            }
        }
    }

    hasChanged() {
        if (window.location.hash.length > 0) {
            this.routes.forEach(route => {
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    this.goToRoute(route.name);
                }
            });
        } else {
            this.routes.filter(route => route.defaultRoute === true).forEach(route => {
                this.goToRoute(route.name);
            });
        }
    }

    scriptLoaded() {
        console.log("Script is ready to rock and roll!");
    }

    async goToRoute(name) {
        var url = name + '/' + name + '.html';

        let response = await fetch(url);
        this.rootElem.innerHTML = await response.text();

        url = name + '/' + name + '.js';
        //TODO:        response = await fetch(url);

        var xhttpjs = new XMLHttpRequest();
        xhttpjs.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let script = document.createElement("script");
                script.setAttribute("src", url);
                document.body.appendChild(script);

                script.addEventListener("load", this.scriptLoaded, false);
            }
        };
        xhttpjs.open('GET', url, true);
        xhttpjs.send();
    }
}

const instance = new Router();
Object.freeze(instance);