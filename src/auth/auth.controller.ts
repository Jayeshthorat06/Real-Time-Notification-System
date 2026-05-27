import { Request, Response } from "express";
import { createUser, fetchAllUser, fetchUser, loginwithtokenUser } from "./auth.service";
import { loginValidation, registerValidation } from "./auth.validation";
import { CustomRequest } from "../middlewares/auth.middleware";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {

    /**
     * Validate Request
     */
    const { error } = registerValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    /**
     * Create User
     */
    const result = await createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {

    /**
     * Validate Request
     */
    const { error } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await loginwithtokenUser(req.body);

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token: result,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const userProfile = async (
  req: CustomRequest,
  res: Response
) => {
  try {

    if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const userid:number = req.user.id;

    const result = await fetchUser(userid);

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: result,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const allUser = async (
  req: CustomRequest,
  res: Response
) => {
  try {

     /**
     * Only Admin Access
     */
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const result = await fetchAllUser();

    return res.status(200).json({
      success: true,
      message: "All Users details fetched successfully",
      data: result,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};