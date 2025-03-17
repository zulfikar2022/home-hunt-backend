import { Router } from "express";
import userRoutes from "./users/users.routes";
import landlordRoutes from "./users/landlord/landlords.routes";
import tenantsRoutes from "./users/tenant/tenants.routes";
import adminRoutes from "./users/admin/admin.routes";
import publicRoutes from "./public/public.routes";

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/landlords",
    route: landlordRoutes,
  },
  {
    path: "/tenants",
    route: tenantsRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/public",
    route: publicRoutes,
  },
];

const router = Router();
routes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
