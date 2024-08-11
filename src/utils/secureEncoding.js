import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || 'attendSystem';
/**
 * Mã hóa ID bằng cách sử dụng AES encryption với secret key
 * @param {number|string} id - ID cần mã hóa
 * @returns {string} - ID đã mã hóa
 */
export function encodeId(id) {
    return CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
}

/**
 * Giải mã ID từ AES encrypted string
 * @param {string} encodedId - ID đã mã hóa
 * @returns {number} - ID gốc sau khi giải mã
 */
export function decodeId(encodedId) {
    const bytes = CryptoJS.AES.decrypt(encodedId, SECRET_KEY);
    const originalId = bytes.toString(CryptoJS.enc.Utf8);
    return parseInt(originalId, 10);
}
