import  crypto from 'crypto'
import * as dotenv from 'dotenv';

dotenv.config()

const SECRET_KEY = process.env.AUTH_SECRET_KEY as string
 // 16-byte IV for AES
const iv = crypto.randomBytes(16);
// Encrypt function
export function encryptData(data: any ){

  const key = crypto.createHash('sha256').update(SECRET_KEY).digest(); // AES-256 requires 32 bytes key
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return { encryptedData };
}

// Decrypt function
function decryptData(encryptedData: any) {
  const ivd = iv.toString('hex')
  const key = crypto.createHash('sha256').update(SECRET_KEY).digest(); // AES-256 requires 32 bytes key
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(ivd, 'hex'));
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}



export function generateUniqueId(username: string) {
  const date = new Date();
  
  // Format the date to a YYYYMMDD-HHMMSS format
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
  
  // Hash the username to avoid long or repetitive strings
  const usernameHash = crypto.createHash('sha256').update(username).digest('hex').slice(0, 8);  // Take first 8 chars for simplicity
  
  // Combine the formatted date and username hash to create a unique ID
  const uniqueId = `${formattedDate}-${usernameHash}`;
  
  return uniqueId;
}

// Example usage
const username = "john_doe";
const uniqueId = generateUniqueId(username);


// Usage
const data = 'Hello, this is a secret message!';
const { encryptedData } = encryptData(data,);
console.log('Encrypted:', encryptedData);

const decryptedData = decryptData(encryptedData);
console.log('Decrypted:', decryptedData);
