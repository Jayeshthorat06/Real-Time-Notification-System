import { User, Notification } from "../models";

export const notification = async (
    type: string,
    message: string,
    priority: string,
    user_id: number
) => {
    const result = await Notification.create({
        type,
        message,
        priority,
        user_id
    });

    return result;
}

export const getNotification = async (
    user_id: number
) => {
    const result = await Notification.findAll(
        {
            where: {
                user_id
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"]
                    }
                },
            ],

        }
    );

    return result
}

export const getNotificationById = async (
    id: number,
    user_id: number
) => {
    const result = await Notification.findOne(
        {
            where: {
                id,
                user_id
            },

            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"]
                    }
                }
            ],
        }
    );

    return result;
}

export const deleteNotificationById = async (
    id: number,
    user_id: number
) => {
    const result = await Notification.destroy(
        {
            where: {
                id,
                user_id
            }
        }
    );

    return result;
}