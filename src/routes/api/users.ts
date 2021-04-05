import express from 'express';
import UserModel from '../../models/UserModel';
import UserAuthentication from '../../authentication/UserAuthentication';

const router = express.Router();

/**
 * Update user.
 */
router.put('/:id(\\d+)', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.body.passwordChange) {
      const passwordMatch = await UserModel.count({where: {id: req.params.id, password: req.body.password}}) > 0;
      if (!passwordMatch)
        return void res.json({error: 'wrongPassword'});
    }
    const set: {[key: string]: string} = {name: req.body.name};
    if (req.body.passwordChange)
      set.password = req.body.newPassword;
    await UserModel.update(set, {where: {id: req.params.id}});
    res.json(true);
  } catch(e) {
    next(e);
  }
});

/**
 * Login.
 */
router.post('/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userAuthentication = new UserAuthentication();
    const success  = await userAuthentication.signin(req, res, next);
    res.json(success);
  } catch(e) {
    next(e);
  }
});

/**
 * Logout.
 */
router.get('/logout', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const userAuthentication = new UserAuthentication();
    userAuthentication.signout(req, res, next);
    res.redirect('/');
  } catch(e) {
    next(e);
  }
});
export default router;