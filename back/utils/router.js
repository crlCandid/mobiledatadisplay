const express = require('express');
const router = express.Router();
const Users = require('../controllers/users.js');
const Areas = require('../controllers/areas.js');
const Tabs = require('../controllers/tabs.js');
const Reports = require('../controllers/reports.js');

const logRequest = (req, res, next) => {
  console.log(req.url, req.query, req.params, req.body);
  next();
}

const route = (endpoint, handler, method) => {
  if (method === 'GET'){
    return router.get(endpoint, logRequest, handler);
  }
  if (method === 'POST'){
    return router.post(endpoint, logRequest, handler);
  }
  if (method === 'PUT'){
    return router.put(endpoint, logRequest, handler);
  }
  if (method === 'DELETE'){
    return router.delete(endpoint, logRequest, handler);
  }

  return router.get(endpoint, logRequest, handler);
};

route('/api/users/login', Users.RemoteLogin, 'POST');
route('/api/users/login/local', Users.LocalLogin, 'POST');
route('/api/users', Users.Create, 'POST');
route('/api/users', Users.List, 'GET');
route('/api/users/:userId', Users.Find, 'GET');
route('/api/users/complete/:userId', Users.FindComplete, 'GET');
route('/api/users', Users.Update, 'PUT');
route('/api/users/password', Users.UpdatePassword, 'PUT');
//Delete handled by Expert due User risks

route('/api/areas', Areas.Create, 'POST');
route('/api/areas', Areas.List, 'GET');
route('/api/areas/:areaId', Areas.Find, 'GET');
route('/api/areas', Areas.Update, 'PUT');
route('/api/areas/:areaId', Areas.Delete, 'DELETE');

route('/api/tabs', Tabs.Create, 'POST');
route('/api/tabs', Tabs.List, 'GET');
route('/api/tabs/:tabId', Tabs.Find, 'GET');
route('/api/tabs', Tabs.Update, 'PUT');
route('/api/tabs/:tabId', Tabs.Delete, 'DELETE');

route('/api/reports', Reports.Create, 'POST');
route('/api/reports', Reports.List, 'GET');
route('/api/reports/:reportId', Reports.Find, 'GET');
route('/api/reports', Reports.Update, 'PUT');
route('/api/reports/:reportId', Reports.Delete, 'DELETE');
route('/api/reports/areas', Reports.AddArea, 'POST');
route('/api/reports/areas/:relationId', Reports.RemoveArea, 'DELETE');
route('/api/reports/resource', Reports.AddResource, 'POST');
route('/api/reports/resource/:resourceId', Reports.RemoveResource, 'DELETE');

module.exports = router;