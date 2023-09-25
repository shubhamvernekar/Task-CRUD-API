"use strict";
const router = express.Router();
router.get("/get", (req, res) => {
    res.send(200);
});
module.exports = router;
