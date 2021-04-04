"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const UserAuthentication_1 = __importDefault(require("../../authentication/UserAuthentication"));
const router = express_1.default.Router();
/**
 * Get users.
 */
router.put('/:id(\\d+)', async (req, res, next) => {
    if (req.body.passwordChange) {
        const passwordMatch = await UserModel_1.default.count({ where: { id: req.params.id, password: req.body.password } }) > 0;
        if (!passwordMatch)
            return void res.json({ error: 'wrongPassword' });
    }
    const set = { name: req.body.name };
    if (req.body.passwordChange)
        set.password = req.body.newPassword;
    await UserModel_1.default.update(set, { where: { id: req.params.id } });
    res.json(true);
});
/**
 * Sign in.
 */
router.post('/login', async (req, res, next) => {
    const userAuthentication = new UserAuthentication_1.default();
    const success = await userAuthentication.signin(req, res, next);
    res.json(success);
});
/**
 * Sign out.
 */
router.get('/logout', async (req, res, next) => {
    const userAuthentication = new UserAuthentication_1.default();
    userAuthentication.signout(req, res, next);
    res.redirect('/');
});
exports.default = router;
