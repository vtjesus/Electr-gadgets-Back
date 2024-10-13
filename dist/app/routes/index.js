"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const product_routes_1 = require("../modules/product/product.routes");
const order_routes_1 = require("../modules/order/order.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/product",
        route: product_routes_1.ProductRoutes,
    },
    {
        path: "/order",
        route: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach((e) => router.use(e.path, e.route));
exports.default = router;
