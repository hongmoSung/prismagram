import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent =>  {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async(parent, _, {request}) => {
            const {user} = request;
            const {id: parnetId} = parent;
            try {
                return await prisma.$exists.user({
                    AND: [
                        {
                            id: user.id
                        },
                        {
                            followers_some: {
                                id: parnetId
                            }
                        }
                    ]
                });
            } catch {
                return false;
            }
        },
        isSelf: (parent, _, {request}) => {
            const {user} = request;
            const {id: parentId} = parent;
            return user.id === parentId;
        },
    }
};