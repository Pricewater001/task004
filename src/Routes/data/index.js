/* eslint-disable*/
const express = require("express");
const router = express.Router();
const { logger } = require("../../Middlewares/middlewares");
const {
  getData,
  getAllData,
  postData,
  updateData,
  deleteData,
} = require("../../controllers/dataControllers");


router.get("/", logger, getAllData);

router.get("/:id", logger, getData);

router.post("/", logger, postData);

router.put("/:id", logger, updateData);

router.delete("/:id", logger, deleteData);

module.exports = router;
