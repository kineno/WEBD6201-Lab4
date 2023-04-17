"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.post('/user/read', (req, res, next) => {
    db_1.User.findOne({ email: req.body.email })
        .then((user) => {
        if (user) {
            res.send(Object.assign({}, user));
        }
        else {
            res.send({ err: "not found" });
        }
    }).catch((e) => {
        console.log("error reading, ", e);
        res.send({ err: "server error" });
    });
});
router.get('/users', (req, res, next) => {
    db_1.User.find()
        .then((user) => {
        if (user) {
            res.send(Object.assign({}, user));
        }
        else {
            res.send({ err: "not found" });
        }
    }).catch((e) => {
        console.log("error reading, ", e);
        res.send({ err: "server error" });
    });
});
router.post('/user/login', (req, res, next) => {
    db_1.User.findOne({ email: req.body.email, password: req.body.password })
        .then((user) => {
        if (user) {
            res.send(Object.assign({}, user));
        }
        else {
            res.send({ err: "not found" });
        }
    }).catch((e) => {
        console.log("error reading, ", e);
        res.send({ err: "server error" });
    });
});
router.post('/user', (req, res, next) => {
    console.log(req.body);
    const u = new db_1.User(Object.assign({}, req.body));
    u.save()
        .then(() => {
        console.log("saved");
        res.send({ ok: "saved" });
    })
        .catch((e) => {
        console.log("saved failed", e);
        res.send({ err: "server error" });
    });
});
router.put('/user', (req, res, next) => {
    console.log(req.body);
    const u = new db_1.User(Object.assign({}, req.body));
    db_1.User.findOneAndUpdate({ email: u.email }, Object.assign({}, req.body), { new: true })
        .then((up) => {
        if (up) {
            console.log('updated');
            res.send({ ok: "updated" });
        }
        else {
            console.log('updating user not found');
            res.send({ err: "not found" });
        }
    })
        .catch((e) => {
        console.log('Failed to update ', e);
    });
});
router.delete('/user', (req, res, next) => {
    console.log(req.body);
    db_1.User.findOneAndDelete({ email: req.body.email })
        .then((up) => {
        if (up) {
            console.log('deleted');
            res.send({ ok: "deleted" });
        }
        else {
            console.log('delete user not found');
            res.send({ err: "not found" });
        }
    })
        .catch((e) => {
        console.log('Failed to delete ', e);
        res.send({ err: "server error" });
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map