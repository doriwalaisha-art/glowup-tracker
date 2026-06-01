const express = require('express');
const router = express.Router();
const {createHabit, getHabits, toggleHabit, deleteHabit} = require("../controllers/habitController");
const {protect} = require("../middleware/authMiddleware");

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/:id/toggle", protect, toggleHabit);
router.delete("/:id", protect, deleteHabit);

module.exports = router;