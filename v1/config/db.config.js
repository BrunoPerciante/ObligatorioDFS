import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1); // Salir del proceso con un código de error
    }
};

export default connectDB;