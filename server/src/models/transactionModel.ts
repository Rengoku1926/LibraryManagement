import mongoose,{Schema, Document} from "mongoose";

export interface ITransaction extends Document{
    bookId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    issueDate: Date,
    returnDate: Date,
    rent?: Number
}

const transactionSchema: Schema = new Schema({
    bookId: {type: Schema.Types.ObjectId, ref:'Book', required:true},
    userId: {type: Schema.Types.ObjectId, ref:'User', required:true},
    issueDate: {type: Date, required: true},
    returnDate: {type: Date},
    return: {type:Number}
})

export default mongoose.model<ITransaction>('Transaction', transactionSchema)