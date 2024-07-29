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

route('/users/login', Users.RemoteLogin, 'POST');
route('/users/login/local', Users.LocalLogin, 'POST');
route('/users', Users.Create, 'POST');
route('/users', Users.List, 'GET');
route('/users/:userId', Users.Find, 'GET');
route('/users', Users.Update, 'PUT');
route('/users/password', Users.UpdatePassword, 'PUT');
//Delete handled by Expert due User risks

route('/areas', Areas.Create, 'POST');
route('/areas', Areas.List, 'GET');
route('/areas/:areaId', Areas.Find, 'GET');
route('/areas', Areas.Update, 'PUT');
route('/areas/:areaId', Areas.Delete, 'DELETE');

route('/tabs', Tabs.Create, 'POST');
route('/tabs', Tabs.List, 'GET');
route('/tabs/:tabId', Tabs.Find, 'GET');
route('/tabs', Tabs.Update, 'PUT');
route('/tabs/:tabId', Tabs.Delete, 'DELETE');

route('/reports', Reports.Create, 'POST');
route('/reports', Reports.List, 'GET');
route('/reports/:reportId', Reports.Find, 'GET');
route('/reports', Reports.Update, 'PUT');
route('/reports/:reportId', Reports.Delete, 'DELETE');
route('/reports/areas', Reports.AddArea, 'POST');
route('/reports/areas', Reports.RemoveArea, 'DELETE');
route('/reports/resource', Reports.AddResource, 'POST');
route('/reports/resource', Reports.RemoveResource, 'DELETE');

module.exports = router;