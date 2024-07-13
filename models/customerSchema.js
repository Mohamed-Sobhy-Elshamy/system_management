const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema (Structure of the customer)
const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
    age: String,
    country: String,
    gender: String,
}, {timestamps: true})

// Create a model based on that schema
const Customer = mongoose.model("Customer", customerSchema);

// export the model 
module.exports = Customer;
