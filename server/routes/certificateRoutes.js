const express = require('express');
const {
  generateCertificate,
  getCertificate,
  verifyCertificate,
  getUserCertificates,
  getCourseCertificates,
  revokeCertificate,
  downloadCertificate
} = require('../controllers/certificateController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/verify/:certificateNumber', verifyCertificate);

// Protected routes (all users)
router.use(protect);
router.get('/user/:userId', getUserCertificates);
router.get('/:id', getCertificate);
router.get('/:id/download', downloadCertificate);

// Teacher/Admin routes
router.use(authorize('teacher', 'admin'));
router.post('/generate',
  generateCertificate
);
router.get('/course/:courseId', getCourseCertificates);
router.put('/:id/revoke', revokeCertificate);

module.exports = router;