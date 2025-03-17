import { Router } from "express";
import { publicControllers } from "./public.controllers";

const publicRoutes = Router();

// get all rentals
publicRoutes.get("/rentals", publicControllers.getRentals);

// get rental by id
publicRoutes.get("/rentals/:id", publicControllers.getRentalById);

export default publicRoutes;
