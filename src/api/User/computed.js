import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent =>  {
            return `${parent.firstName} ${parent.lastName}`;
        },
        amIFollowing: async(parent, _, {request}) => {
            const {user} = request;
            const {id: parnetId} = parent;
            try {
                const exists = await prisma.$exists.user({
                    AND: [{id: parnetId}, {followers_some: [user.id]}]
                });
                if(exists) {
                    return true;
                } else {
                    return false;
                }
            } catch(error) {
                console.log(error);
                return false;
            }
        },
        itsMe: (parent, _, {request}) => {
            const {user} = request;
            const {id: parentId} = parent;
            return user.id === parentId;
        }
    }
};