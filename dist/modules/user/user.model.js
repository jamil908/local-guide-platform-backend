"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.updateUser = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createUser = async (userData) => {
    return await prisma_1.default.user.create({
        data: userData,
    });
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return await prisma_1.default.user.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    return await prisma_1.default.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            profilePic: true,
            bio: true,
            languages: true,
            expertise: true,
            dailyRate: true,
            travelPreferences: true,
            createdAt: true,
        },
    });
};
exports.findUserById = findUserById;
const updateUser = async (id, data) => {
    return await prisma_1.default.user.update({
        where: { id },
        data,
    });
};
exports.updateUser = updateUser;
const getAllUsers = async () => {
    return await prisma_1.default.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            profilePic: true,
            createdAt: true,
        },
    });
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (id) => {
    return await prisma_1.default.user.delete({
        where: { id },
    });
};
exports.deleteUser = deleteUser;
