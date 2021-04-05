import express from 'express';

const router = express.Router();
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.render('dashboard');
  } catch(e) {
    next(e);
  }
});
export default router;