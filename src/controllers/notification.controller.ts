import { Request, Response } from "express";
import { getnotificationValidation, savenotificationValidation } from "../validations/notification.validation";
import { CustomRequest } from "../middlewares/auth.middleware";
import { deleteNotificationById, getNotification, getNotificationById, notification } from "../services/notification.service";

export const savenotification = async (
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
        const { error } = savenotificationValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const result = await notification(
            req.body.type,
            req.body.message,
            req.body.priority,
            req.user.id
        )

        return res.status(200).json({
            success: true,
            message: "Notification Created successfully",
            data: result,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

export const getNotificationdetails = async (
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
        const result = await getNotification(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Notification fetched successfully",
            data: result,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getNotificationByIddetails = async (
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
        const { error } = getnotificationValidation.validate(req.params);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const result = await getNotificationById(Number(req.params.id), req.user.id);

        return res.status(200).json({
            success: true,
            message: "Notification fetched successfully",
            data: result,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteNotificationByIddetails = async (
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
        const { error } = getnotificationValidation.validate(req.params);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const result = await deleteNotificationById(Number(req.params.id), req.user.id);

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
            data: result,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}