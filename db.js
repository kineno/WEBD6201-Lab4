"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
exports.User = mongoose_1.default.model('User', userSchema);
mongoose_1.default.connect('mongodb+srv://kinen:123456abc@cluster0.qln9tjx.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('Connected to mongo');
})
    .catch(() => {
    console.log('faild to connect to mongo');
});
//# sourceMappingURL=db.js.map