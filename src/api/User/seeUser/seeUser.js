import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser:  async (_, args, {request, isAuthencitaed}) => {
            isAuthencitaed(request);
            const {id} = args;
            const user = await prisma.user({id});
            const posts = await prisma.user({id}).posts();
            return {
                user,
                posts
            };
        }
    }
}