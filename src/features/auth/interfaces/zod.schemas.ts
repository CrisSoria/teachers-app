import { z } from "zod";

// Reusable token validation schema
const tokenValidation = {
  token: z
    .string()
    .length(6, "El token debe tener exactamente 6 caracteres")
    .regex(/^[0-9]+$/, "El token debe contener solo números"),
};

export const otpFormSchema = z.object({
  ...tokenValidation,
});

export const loginSchema = z.object({
  email: z
    .email("El correo debe ser válido")
    .max(30, "El correo debe tener menos de 30 caracteres"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(30, "La contraseña debe tener menos de 30 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un número")
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "La contraseña debe tener al menos un carácter especial"
    ),
  //Todo: revisar si esto es correcto o se esta repitiendo
  otp: z
    .string()
    .length(6, "El token debe tener exactamente 6 caracteres")
    .regex(/^[0-9]+$/, "El token debe contener solo números")
    .optional(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener menos de 30 caracteres"),
  email: z
    .email("El correo debe ser válido")
    .max(30, "El correo debe tener menos de 30 caracteres"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(30, "La contraseña debe tener menos de 30 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un número")
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "La contraseña debe tener al menos un carácter especial"
    ),
});

export const otpSchema = z.object({
  token: z
    .string()
    .length(6, "El token debe tener exactamente 6 caracteres")
    .regex(/^[0-9]+$/, "El token debe contener solo números"),
});
