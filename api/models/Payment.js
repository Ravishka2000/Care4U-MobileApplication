import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId:{
        type: String
    },
    name:{
        type: String
    },

    
    foodId:{
        type: Object
    },
    

    cardNumber:{
        type: String
    },
    date:{
        type: String
    },
    cvv:{
        type: String
    },
    billingAddress:{
        type: String
    },
    zip:{
        type: String
    },
    state:{
        type: String
    },
    time: { type: Number, default: Date.now }
});  

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;