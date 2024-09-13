const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dlovej:Dheeraj009@cluster0.vkf2a5b.mongodb.net/?retryWrites=true&w=majority&Bix-Interns-ecom=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,  // Use TLS/SSL
      tlsAllowInvalidCertificates: true,  // If using a self-signed certificate
    });


    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;