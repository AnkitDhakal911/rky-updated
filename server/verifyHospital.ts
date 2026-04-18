import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bloodline';

async function verifyHospital() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB:', MONGO_URI);

    const db = mongoose.connection.db!;
    const users = db.collection('users');

    // Find first hospital user
    const hospital = await users.findOne({ role: 'hospital' });

    if (!hospital) {
        console.log('❌ No hospital user found in the database.');
        process.exit(1);
    }

    console.log('\n📋 Found hospital user:');
    console.log('  Name        :', hospital.name ?? hospital.facilityName);
    console.log('  Email       :', hospital.email);
    console.log('  isVerified  :', hospital.isVerified);
    console.log('  _id         :', hospital._id.toString());

    // Set isVerified = true
    const result = await users.updateOne(
        { _id: hospital._id },
        { $set: { isVerified: true } }
    );

    console.log('\n🎉 Hospital verified! Modified count:', result.modifiedCount);
    console.log('  You can now log in as:', hospital.email);

    await mongoose.disconnect();
    console.log('🔌 Disconnected.');
}

verifyHospital().catch((err) => {
    console.error('Script error:', err);
    process.exit(1);
});
