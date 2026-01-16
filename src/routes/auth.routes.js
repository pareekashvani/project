const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const {
  adminLogin,
  createCandidateByAdmin,
  candidateLogin,
  registerAdmin
} = require('../controllers/auth.controller');

/* =========================
   ADMIN REGISTRATION
========================= */
router.post('/admin/register', registerAdmin);

// ================= ADMIN =================
router.post('/admin/login', adminLogin);

router.post(
  '/admin/create-candidate',
  authMiddleware,
  roleMiddleware('ADMIN'),
  createCandidateByAdmin
);

// ================= CANDIDATE =================
router.post('/candidate/login', candidateLogin);

module.exports = router;
