"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const UserService = __importStar(require("./user.service"));
const resoponse_1 = require("../../utils/resoponse");
const register = async (req, res, next) => {
    try {
        const result = await UserService.registerUser(req.body);
        res.status(201).json((0, resoponse_1.successResponse)(result, 'User registered successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await UserService.loginUser(email, password);
        res.json((0, resoponse_1.successResponse)(result, 'Login successful'));
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getProfile = async (req, res, next) => {
    try {
        const user = await UserService.getUserProfile(req.params.id);
        res.json((0, resoponse_1.successResponse)(user, 'Profile fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const user = await UserService.updateUserProfile(req.params.id, req.body);
        res.json((0, resoponse_1.successResponse)(user, 'Profile updated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsersService();
        res.json((0, resoponse_1.successResponse)(users, 'Users fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
// New controller for admin to update user role
const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({
                success: false,
                message: 'Role is required',
            });
        }
        const user = await UserService.updateUserRoleService(req.params.id, role);
        res.json((0, resoponse_1.successResponse)(user, 'User role updated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (req, res, next) => {
    try {
        await UserService.deleteUserService(req.params.id);
        res.json((0, resoponse_1.successResponse)(null, 'User deleted successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
