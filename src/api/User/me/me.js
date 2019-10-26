import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: (_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            return prisma.user({id: user.id}).$fragment(USER_FRAGMENT);
        }
    }
}