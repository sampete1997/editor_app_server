"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const document_1 = __importDefault(require("./document"));
const router = express_1.default.Router();
const endPoints = [
    {
        url: "/auth",
        routeName: auth_1.default,
    },
    {
        url: "/document",
        routeName: document_1.default,
    },
];
endPoints.map(({ url, routeName }) => {
    router.use(url, routeName);
});
exports.default = router;
