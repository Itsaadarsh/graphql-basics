export const subscription = {
    count: {
        subscribe(parent,args,ctx, info){
            let count = 0

            setInterval(() => {
                count++
                ctx.pubsub.publish('count', {count})
            }, 1000)
        
            return ctx.pubsub.asyncIterator('count')
        }
    }
}