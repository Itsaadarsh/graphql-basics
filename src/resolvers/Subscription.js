import { posts } from "./Posts"

export const subscription = {
    count: {
        subscribe(parent,args,ctx){
            let count = 0

            setInterval(() => {
                count++
                ctx.pubsub.publish('count', {count})
            }, 1000)
        
            return ctx.pubsub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent,args,ctx){
            const isPost = ctx.customPosts.find(post => post.id === args.postid)

            if(!isPost) throw new Error('Post not found')
        
            return ctx.pubsub.asyncIterator(`comment: ${args.postid}`)
        }
    }
}