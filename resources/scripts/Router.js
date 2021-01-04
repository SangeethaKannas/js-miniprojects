function Route(name, defaultRoute){
    try {
        if(!name) {
            //TODO: Go to index.html page
        } else {
            this.constructor(name, defaultRoute);
        }
    }catch(error) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    defaultRoute: undefined,
    constructor(name, defaultRoute) {
        this.name = name;
        this.defaultRoute = defaultRoute;
    },
    isActiveRoute: (hashedPath, name ) => hashedPath === name
}

function Router(routes, rootElem) {
  try {
    if(!routes) {
      throw 'error: router param is mandatory'
    }
    this.constructor(routes, rootElem);
    this.init();
  }catch(e) {
    console.error(e);
  }

}

Router.prototype = {
  routes: undefined,
  rootElem: undefined,
  constructor: function(routes, rootElem) {
    this.routes = routes;
    this.rootElem  = rootElem;
  },
  init: function() {
    let routes = this.routes;
    (function(scope, routes) {
      window.addEventListener('hashchange', (event) => {
        scope.hasChanged(scope, routes);
      })
    })(this, routes);
  },
  hasChanged: function(scope, routes) {
    if(window.location.hash.length > 0) {
      scope.goToRoute(
        routes.filter(
          route => {
            return route.isActiveRoute(window.location.hash.substr(1), route.name)
          }
        )[0].name
      )
    } else {
      scope.goToRoute(
        routes.filter(route => route.default)[0].name
      );
    }
  },
  appendHtml: function(url) {

  },
  injectScript: function(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', e => reject(e.error));
        document.head.appendChild(script);
    });
  },
  injectStyles: function(href) {
    return new Promise((resolve, reject) => {
        const styles = document.createElement('link');
        styles.href = href;
        styles.rel = "stylesheet";
        styles.addEventListener('load', resolve);
        styles.addEventListener('error', e => reject(e.error));
        document.head.appendChild(styles);
    });
  },
  goToRoute: function(name) {
    (
      function(scope) {
        request({url: name + '/' + name + '.html'})
          .then(data => {
              scope.rootElem.innerHTML = data;
              scope.injectScript(name + '/' + name + '.js')
                .then(() => {
                  console.log('Script loaded!');
                }).catch(error => {
                  console.error(error);
                });
          })
          .catch(error => {
              console.log(error);
          });

        scope.injectStyles(name + '/' + name + '.css')
          .then(() => {
            console.log('Styles loaded!');
          }).catch(error => {
            console.error(error);
          });


      }
    )(this);
  }
}

let request = obj => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
            xhr.setRequestHeader(key, obj.headers[key]);
        });
    }
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
        } else {
            reject(xhr.statusText);
        }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  });
};