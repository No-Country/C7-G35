import { Router } from 'express';
import glob from 'glob';

export function registerRoutes(router: Router) {
  const dir = __dirname.split(`\\`).join('/')

  const routes = glob.sync(dir + '/../**/*.route.*');
  
  routes.map(routePath => register(routePath, router));
}

function register(routePath: string, router: Router) {
  const route = require(routePath);
  route.register(router);
}
