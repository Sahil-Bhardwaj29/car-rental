import multer from 'multer';

// Use memory storage for serverless environment (Vercel has read-only filesystem)
const upload = multer({storage: multer.memoryStorage()})
export default upload;