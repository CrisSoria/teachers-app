"use server";

import { otpSchema } from "../interfaces/zod.schemas";

/**
 * Verifica el OTP
 * @param values {email, token}
 * Genera JWT tokens en cookie y guarda el usuario en el store
 */
export async function verifyOtp(values: { email: string; token: string }) {
  try {
    // Server side validation
    const result = otpSchema.safeParse(values);
    if (!result.success) {
      const errorMessages = result.error.issues
        .map((err: any) => err.message)
        .join(", ");
      throw new Error(errorMessages);
    }
    const { email, token } = values;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/otp/validate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      }
    );

    const responseJson = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: responseJson.message,
        isValid: responseJson.isValid,
      };
    } else {
      throw new Error(responseJson.message);
    }
  } catch (error: unknown) {
    console.error("Error al verificar OTP", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Error desconocido al verificar OTP" };
    }
  }
}

/**
 * Genera un OTP para el usuario
 * @param email {email}
 */
export async function generateOtp(email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/otp/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const responseJson = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: responseJson.message,
      };
    } else {
      throw new Error(responseJson.message);
    }
  } catch (error: unknown) {
    console.error("Error al generar OTP", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Error desconocido al generar OTP" };
    }
  }
}
