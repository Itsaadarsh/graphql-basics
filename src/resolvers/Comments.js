export const comments = {
    user(parent,args,ctx){
        return ctx.customUsers.find(user => {
            return user.id === parent.userid
        })
    },
    post(parent,args,ctx){
        return ctx.customPosts.find(post => {
            return post.id === parent.postid
        })
    }
}