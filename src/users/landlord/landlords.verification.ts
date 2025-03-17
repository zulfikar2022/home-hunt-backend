import { z } from "zod";

const rentalVerificationSchema = z.object({
  location: z.string().nonempty(),
  description: z.string().nonempty(),
  rentAmount: z.number().positive(),
  numberOfBedrooms: z.number().positive(),
  images: z.array(z.string().url()).optional(),
  amenities: z.array(z.string()).optional(),
});

const rentalResponseSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export const rentalValidations = {
  rentalVerificationSchema,
  rentalResponseSchema,
};

/*  



*/
