import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";

export default {
    Mutation: {
        sendMessage: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            const {roomId, message, toId} = args;
            let room;
            if(roomId === undefined) {
                if(user.id !== toId) {
                    room = await prisma.createRoom({
                        participants: {
                            connect: [{id: toId}, {id: user.id}]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            } else {
                room = await prisma.rooms({id: roomId}).$fragment(ROOM_FRAGMENT);
            }
            if(!room) {
                throw Error("room not found");
            }
            const getTo = room.participants.filter(
                participants => participants.id !== user.id
            )[0];
            return prisma.createMessage({
                text: message,
                from: {
                    connect: {id: user.request}
                },
                to: {
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
}