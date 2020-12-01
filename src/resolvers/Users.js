export const users = {
    post(parent,args,ctx){
        return ctx.customPosts.filter(post => {
            return post.adminid === parent.id
        })
    },
    comment(parent,args,ctx){
        return ctx.customComment.filter(comment => {
            return comment.userid === parent.id
        })
    }
}