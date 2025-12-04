import { Request, Response, NextFunction } from 'express';
import * as UserService from './user.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { successResponse } from '../../utils/resoponse';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.registerUser(req.body);
    res.status(201).json(
      successResponse(result, 'User registered successfully')
    );
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    res.json(successResponse(result, 'Login successful'));
  } catch (error: any) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.getUserProfile(req.params.id);
    res.json(successResponse(user, 'Profile fetched successfully'));
  } catch (error: any) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.updateUserProfile(req.params.id, req.body);
    res.json(successResponse(user, 'Profile updated successfully'));
  } catch (error: any) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAllUsersService();
    res.json(successResponse(users, 'Users fetched successfully'));
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUserService(req.params.id);
    res.json(successResponse(null, 'User deleted successfully'));
  } catch (error: any) {
    next(error);
  }
};