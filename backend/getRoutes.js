// getRoutes.js
const getRoutes = (app) => {
    const routes = [];
  
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        // If middleware has a route, it's an actual route
        const path = middleware.route.path;
        if (!path.startsWith('/api')) {
          routes.push(path);
        }
      } else if (middleware.name === 'router') {
        // If middleware is a router, iterate its stack
        middleware.handle.stack.forEach((handler) => {
          const path = handler.route ? handler.route.path : '';
          if (path && !path.startsWith('/api')) {
            routes.push(path);
          }
        });
      }
    });
  
    return routes;
  };
  
  module.exports = getRoutes;
  