import { request } from "express";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, userUpdateValidation, registerUserValidation } from "../validation/user-validation.js";
import { generateAccessToken, verifyAccessToken } from "../service/jwt-service.js";
import { validate } from "../validation/validation.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";


const register = async (request) =>{
  const user = validate(registerUserValidation, request);
  const countUser = await prismaClient.user.count({
    where: { username: user.username }
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already registered");
  }

  user.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true
    }
  });

  return result;
}

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findFirst({
    where: { username: loginRequest.username },
    select: { id: true, username: true, password: true }
  });
  if (!user) throw new ResponseError(401, "Username or password wrong");

  const passwordMatch = await bcrypt.compare(loginRequest.password, user.password);
  if (!passwordMatch) throw new ResponseError(401, "Username or password wrong");

  delete user.password;

  const accessToken = generateAccessToken(user);
  return {accessToken: accessToken};
}

const get = async (username) => {
  validate(getUserValidation, username);
  const user = await prismaClient.user.findFirst({
    where: {
      username: username
    },
    select: {
      username: true,
      name: true
    }
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
}

const update = async (request) => {
  const user = validate(userUpdateValidation, request);

  const totalUser = await prismaClient.user.count({
    where: { username: user.username }
  });

  if (totalUser === 0) {
    throw new ResponseError(404, "User not found");
  }

  const data = {}
  if(user.name){
    data.name = user.name;
  }
  if(user.password){
    data.password = await bcrypt.hash(user.password, 10);
  }

  const userId = await prismaClient.user.findFirst({
    where: { username: user.username },
    select: { id: true}
  });

  return prismaClient.user.update({
    where: { id: userId.id },
    data: data,
    select: { username: true, name: true }
  });
}

const logout = async (accessToken) => {
  if (!accessToken) throw new ResponseError(401, "Unauthorized");

  const user = verifyAccessToken(accessToken);
  if (!user) throw new ResponseError(401, "Unauthorized");

  const userDb = await prismaClient.user.findFirst({
    where: {username: user.username},
    select: {id: true}
  });
  if (!userDb) throw new ResponseError(401, "Unauthorized");

  return {data: "OK"};
}

const check = async (username) => {
  validate(getUserValidation, username);
  const user = await prismaClient.user.findFirst({
    where: {
      username: username
    },
    select: {
      username: true
    }
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return 'OK';
}

export default { register, login, get, update, logout, check };