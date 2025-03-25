const express = require ("express");

const { fetchTotalTenants } = require ('../controllers/TenantController.js');

const router = express.Router();

router.get ('/tenant/getTotal', fetchTotalTenants);

module.exports = router;
