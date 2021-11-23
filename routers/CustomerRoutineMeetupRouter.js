const express = require("express");
const router = express.Router();
const customerRoutineMeetupController = require("../controllers/CustomerRoutineMeetupController");

router.get("/:idCO", customerRoutineMeetupController.findCRMByIdCo);

router.post(
    "/detail/create/:idCRM",
    customerRoutineMeetupController.createCRMDetail
);

router.get(
    "/detail/endsummary/:idCRM",
    customerRoutineMeetupController.endCRMDetail
);

router.get(
    "/detail/history/:idCRM",
    customerRoutineMeetupController.historyCRMDetail
);

router.put(
    "/detail/endsummary/:idCRM",
    customerRoutineMeetupController.updateCRMDetail
);

module.exports = router;
