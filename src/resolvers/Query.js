export const query = {
    posts(parent,args,ctx) {
        return ctx.customPosts
    },
    users(parent,args,ctx){
        return ctx.customUsers
    },
    comments(parent,args,ctx){
        return ctx.customComment
    }
}