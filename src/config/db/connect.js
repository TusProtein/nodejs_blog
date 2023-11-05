import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Healthy-Online-dev');
        console.log('Connect Successfully');
    } catch (error) {
        console.log('Connect Failed');
    }
}

export default { connect };
