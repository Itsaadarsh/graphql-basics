import { v4 as uuidv4 } from 'uuid';

export const mutation = {
    createUser(parent,args,ctx){
        const isEmailTaken = ctx.customUsers.some(user => user.email === args.data.email)
        
        if(isEmailTaken) throw new Error('Email taken!')

        const user = {
            id: uuidv4(),
            ...args.data
        }

        ctx.customUsers.push(user)

        return user 
    },
    createPost(parent,args,ctx){
        const isUserValid = ctx.customUsers.some(user => user.id === args.data.userid)
        
        if(!isUserValid) throw new Error('SignIn to post!')
        
        const post  = {
            id: uuidv4(),
            ...args.data
        }
        
        
        ctx.customPosts.push(post)

        return post
    },
    createComment(parent,args,ctx){
        const isPostValid = ctx.customPosts.some(post => post.id === args.data.postid && post.isActive)

        if(!isPostValid) throw new Error('Something Went Wrong! Try Again.')

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        ctx.customComment.push(comment)
        return comment
    },
    deleteUser(parent,args,ctx){
        const delUserIndex = ctx.customUsers.findIndex(user => user.id === args.id)

        if(delUserIndex === -1) throw new Error('User Not Found')

        const delUser = ctx.customUsers.splice(delUserIndex, 1)

        return delUser[0]
    }
}