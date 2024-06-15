import { request } from "express";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {searchMessageValidation, getMessageValidation, storeMessageValidation} from "../validation/contact-validation.js";
import Joi from "joi";

const searchMessage = async (request, userid) => {
  request = validate(searchMessageValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];
  
  // check first by user_id
  filters.push({ user_id: userid });

  if (request.name) {
    filters.push({ name: { contains: request.name } });
  }
  if (request.email) {
    filters.push({ email: { contains: request.email } });
  }
  if (request.message) {
    filters.push({ message: { contains: request.message } });
  }

  const messages = await prismaClient.contact.findMany({
    where: { AND: filters },
    take: request.size,
    skip: skip
  });

  const totalItems = await prismaClient.contact.count({
    where: { AND: filters }
  });

  return {
    data: messages,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size)
    }
  };
}

const getMessage = async (request, userid) => {
  const contactId = validate(getMessageValidation, request);

  const result = await prismaClient.contact.findFirst({
    where: {
      AND: [
        { id: contactId },
        { user_id: userid }
      ]
    }
  });

  if(!result){
    throw new ResponseError(404, "Message Not Found")
  }

  return result;
}

const storeMessage = async (username, request) => {
  username = validate(Joi.string().max(100).required(), username);

  const userCount = await prismaClient.user.count({
    where: { username: username }
  });

  if(userCount === 0){
    throw new ResponseError(404, "User Not Found")
  }
  const user = await prismaClient.user.findFirst({
    where: { username: username },
    select: { id: true }
  });

  request.user_id = user.id;

  const data = validate(storeMessageValidation, request);

  const result = await prismaClient.contact.create({
    data: data
  });
  return result;
}

const deleteMessage = async (request, userid) => {
  const contactId = validate(getMessageValidation, request);

  const isExist = await prismaClient.contact.findFirst({
    where: {
      AND: [
        { id: contactId },
        { user_id: userid}
      ]
    }
  });

  if(!isExist){
    throw new ResponseError(404, "Message Not Found")
  }

  const result = await prismaClient.contact.delete({
    where: {
      id: contactId,
    }
  });

  return result
}

export default {
  searchMessage,
  getMessage,
  storeMessage,
  deleteMessage
}