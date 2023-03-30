const Joi = require("joi");
const { PrismaClient } = require("@prisma/client");
const { DB_GET_All, DB_GET_ONE, DB_POST_ONE, DB_UPDATE_ONE, DB_DELETE_ONE } = require("../services/DB_query");
const prisma = new PrismaClient();

async function getAllData(req, res) {
  const { dataPrisma } = prisma;

  const data = await DB_GET_All(dataPrisma);
  res.json({
    data: data,
    ...req.userData,
  });
}

async function getData(req, res) {
  try {
    const { error } = Joi.string().required().validate(req.params.id);
    if (error) {
      res.send(error.details[0].message);
      return;
    }

    const { dataPrisma } = prisma;

    const data = await DB_GET_ONE(dataPrisma, req.params.id);

    res.json({
      data: data,
      ...req.userData,
    });
  } catch (err) {
    console.log("err:", err);
  }
}

async function postData(req, res) {
  try {
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

    const { dataPrisma } = prisma;
    const data = await DB_POST_ONE(dataPrisma, req.body);

    res.status(201).send(data);

  } catch (err) {
    console.log("err:", err);
  }
}

async function updateData(req, res) {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().min(3).max(100).required(),
      age: Joi.number().integer().min(18).max(150).required(),
      major: Joi.string().alphanum().min(3).max(100).required(),
    });
    const obj = {
      id: req.params.id,
      ...req.body,
    };

    const { error } = schema.validate(obj);
    if (error) {
      res.send(error.details[0].message);
      return;
    }
    const { dataPrisma } = prisma;
    const updateUser = await DB_UPDATE_ONE(dataPrisma,req.params.id ,req.body);

    res.status(200).send(updateUser);
  } catch (err) {
    console.log("err:", err);
  }
}

async function deleteData(req, res) {
  try {
    const id = parseInt(req.params.id);

    const { error } = Joi.string().required().validate(req.params.id);
    if (error) {
      res.send(error.details[0].message);
      return;
    }

  
    const { dataPrisma } = prisma;
    const result = await DB_DELETE_ONE(dataPrisma,req.params.id );
    if (result) {
        return res.status(200).send("The DELETED");
      } else {
        return res.status(404).send("Not Found with this ID ");
      }
 
  } catch (err) {
    console.log("err:", err);
  }
}

module.exports = {
  getData,
  getAllData,
  postData,
  updateData,
  deleteData,
};
