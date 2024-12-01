import express from "express";
import authRoute from "./auth";
import docRoute from "./document";
const router = express.Router();

const endPoints = [
  {
    url: "/auth",
    routeName: authRoute,
  },
  {
    url: "/document",
    routeName: docRoute,
  },
];

endPoints.map(({ url, routeName }) => {
  router.use(url, routeName);
});

export default router;
