export const posts = {
    admin(parent,args,ctx) {
       return ctx.customUsers.find((user) => {
            return user.id === parent.adminid
        })
    },
    comments(parent,args,ctx){
        return ctx.customComment.filter(comment => {
            return comment.postid === parent.id
        })
    }
}