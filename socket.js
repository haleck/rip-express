import {Server} from "socket.io";

const io = new Server({cors: "*"})

let onlineUsers = []
io.on('connection', (socket) => {
    console.log('new socket connection:', socket.id)

    // listen to a connection
    socket.on("addNewUser", (userId)=>{
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
    })

    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find(user => user.userId === message.receiver)

        if (user) {
            io.to(user.socketId).emit('getMessage', message)
        }
    })

    socket.on('disconnect', ()=>{
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    })
})

io.listen(8080)
