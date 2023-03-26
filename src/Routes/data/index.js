/* eslint-disable*/
const express = require("express");
const router = express.Router();
const { logger } = require("../../middlewares");

let arr = [];

router.get("/", logger, (req, res) => {
  res.json({
    data: arr,
    ...req.userData,
  });
});
router.get("/:id", logger, (req, res) => {
  const newArr = arr.filter((item) => item.id == req.params.id);

  if (!newArr.length) {
    res.status(404).json({
      message: "Error : not Found",
    });
    return;
  }
  res.json({
    data: newArr,
    ...req.userData,
  });
});

router.post("/", logger, (req, res) => {
  const data = {
    id: Date.now(),
    ...req.body,
  };
  arr.push(data);
  res.status(201).json({
    data: arr,
    ...req.userData,
  });
});

router.put("/:id", logger, (req, res) => {
  let flag = false;
  arr = arr.map((item) => {
    if (item.id == req.params.id) {
      flag = true;
      return {
        id:item.id,
        ...req.body
      };
    }
    return item;
  });

  if (!flag) {
    res.status(404).json({
      message: "Error : not Found",
    });
    return;
  }

  res.status(201).json({
    data: arr,
    ...req.userData,
  });
});

router.delete("/:id", logger, (req, res) => {
  arr = arr.filter((item) => {
    if (item.id != req.params.id) return true;
  });

  if (!arr.length) {
    res.status(404).json({
      message: "Error : not Found",
    });
    return;
  }
  res.json({
    message: "deleted",
    ...req.userData,
  });
});

module.exports = router;
