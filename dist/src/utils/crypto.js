"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptData = encryptData;
exports.generateUniqueId = generateUniqueId;
const crypto_1 = __importDefault(require("crypto"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const SECRET_KEY = process.env.AUTH_SECRET_KEY;
// 16-byte IV for AES
const iv = crypto_1.default.randomBytes(16);
// Encrypt function
function encryptData(data) {
    const key = crypto_1.default.createHash('sha256').update(SECRET_KEY).digest(); // AES-256 requires 32 bytes key
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return { encryptedData };
}
// Decrypt function
function decryptData(encryptedData) {
    const ivd = iv.toString('hex');
    const key = crypto_1.default.createHash('sha256').update(SECRET_KEY).digest(); // AES-256 requires 32 bytes key
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, Buffer.from(ivd, 'hex'));
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}
function generateUniqueId(username) {
    const date = new Date();
    // Format the date to a YYYYMMDD-HHMMSS format
    const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
    // Hash the username to avoid long or repetitive strings
    const usernameHash = crypto_1.default.createHash('sha256').update(username).digest('hex').slice(0, 8); // Take first 8 chars for simplicity
    // Combine the formatted date and username hash to create a unique ID
    const uniqueId = `${formattedDate}-${usernameHash}`;
    return uniqueId;
}
// Example usage
const username = "john_doe";
const uniqueId = generateUniqueId(username);
// Usage
const data = 'Hello, this is a secret message!';
const { encryptedData } = encryptData(data);
console.log('Encrypted:', encryptedData);
const decryptedData = decryptData(encryptedData);
console.log('Decrypted:', decryptedData);
