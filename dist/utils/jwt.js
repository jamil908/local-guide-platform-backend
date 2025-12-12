"use strict";
// import jwt from 'jsonwebtoken';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// export const generateToken = (payload: any): string => {
//   return jwt.sign(payload, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '7d',
//   });
// };
// export const verifyToken = (token: string): any => {
//   return jwt.verify(token, process.env.JWT_SECRET!);
// };
// __________________from chatgpt_________________
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const expiresIn = (process.env.JWT_EXPIRES_IN || '7d');
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
