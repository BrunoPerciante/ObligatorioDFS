import app from "./app.js";

const PORT = process.env.PORT || 1010;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    
})