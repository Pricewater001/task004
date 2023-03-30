const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function DB_GET_All(model) {
  return await model.findMany();
}

async function DB_GET_ONE(model, id) {
  const data = await model.findUnique({
    where: {
      id,
    },
  });
  if (!data) {
    return [];
  }
  return data;
}

async function DB_POST_ONE(model, data) {
  return await model.create({
    data: {
      ...data,
    },
  });
}

async function DB_UPDATE_ONE(model, id, data) {
  return await model.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });
}

async function DB_DELETE_ONE(model, id) {
  const data = await model.findUnique({
    where: {
      id,
    },
  });
  if (data) {
    await model.delete({
      where: {
        id,
      },
    });
    return true;
  } else {
    return false;
  }
}

module.exports = {
  DB_GET_All,
  DB_GET_ONE,
  DB_POST_ONE,
  DB_UPDATE_ONE,
  DB_DELETE_ONE,
};
