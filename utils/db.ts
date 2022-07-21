import mongoose from 'mongoose'
const dbUrl = process.env.DB_URL as string


const connection = {
    isConnected:0
}

const connect = async () => {
    if (connection.isConnected) {
        console.log('Already Connected')
        return
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState
        if (connection.isConnected === 1) {
            console.log('Use Previous connection')
            return
        }
        await mongoose.disconnect()
    }

    const db = await mongoose.connect(dbUrl);
    console.log('new connection')

    connection.isConnected = db.connections[0].readyState
}

const disconnect = async () => {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
            connection.isConnected  = 0
        } else {
            console.log('not disconnect')
        }
    }
}

    const db = {connect,disconnect}
export default db



