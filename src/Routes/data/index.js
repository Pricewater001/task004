/* eslint-disable*/
const express = require("express");
const router = express.Router();
const { logger } = require("../../middlewares");
const client = require("../../connections");
const Joi = require("joi");

client
  .connect()
  .then((_) => console.log("connected"))
  .catch((_) => console.error("error in connection"));

router.get("/", logger, (req, res) => {
  try {
    client.query("SELECT id, name, age FROM users;", (err, result) => {
      if (err) throw err;
      res.json({
        data: result.rows,
        ...req.userData,
      });
      client.end;
    });
  } catch (err) {
    console.log("err:", err);
  }
});

router.get("/:id", logger, (req, res) => {
  try {
    const { error } = Joi.string().pattern(/^[0-9]+$/).required().validate(req.params.id);
    if (error) {
      res.send(error.details[0].message);
      return;
    }

    client.query(
      `SELECT id, name, age FROM users WHERE id='${req.params.id}';`,
      (err, result) => {
        if (err) throw err;
        res.json({
          data: result.rows,
          ...req.userData,
        });
        client.end;
      }
    );
  } catch (err) {
    console.log("err:", err);
  }
});

router.post("/", logger, (req, res) => {
  try {
    const { name, age, major } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      age: Joi.number().integer().min(18).max(150),
      major: Joi.string().alphanum().min(3).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res.send(error.details[0].message);
      return;
    }

    client.query(
      "INSERT INTO users (name, age, major) VALUES ($1, $2, $3) RETURNING *",
      [name, age, major],
      (err, result) => {
        if (err) throw err;
        res.status(201).send(`User added with ID: ${result.rows[0].id}`);
        client.end;
      }
    );
  } catch (err) {
    console.log("err:", err);
  }
});

router.put("/:id", logger, (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, age, major } = req.body;

    const schema = Joi.object({
      id: Joi.string().pattern(/^[0-9]+$/).required(),
      name: Joi.string().min(3).max(100).required(),
      age: Joi.number().integer().min(18).max(150).required(),
      major: Joi.string().alphanum().min(3).max(100).required(),
    });
    const obj={
      id:req.params.id,
      ...req.body
    }

    const { error } = schema.validate(obj);
    if (error) {
      res.send(error.details[0].message);
      return;
    }
    client.query(
      "UPDATE users SET name = $1, age = $2, major = $3 WHERE id = $4 RETURNING *",
      [name, age, major, id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send(results.rows[0]);
        client.end;
      }
    );
  } catch (err) {
    console.log("err:", err);
  }
});

router.delete("/:id", logger, (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { error } = Joi.string().pattern(/^[0-9]+$/).required().validate(req.params.id);
    if (error) {
      res.send(error.details[0].message);
      return;
    }

    client.query("DELETE from users where id = $1", [id], (error, result) => {
      if (error) throw error;
      res.status(200).send(`${id} DELTED`);
      client.end;
    });
  } catch (err) {
    console.log("err:", err);
  }
});

module.exports = router;
