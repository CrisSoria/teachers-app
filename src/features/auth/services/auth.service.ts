import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../interfaces/zod.schemas";
import { z } from "zod";

/**
 * Register
 * @param values {name, email, password}
 * Genera JWT tokens en cookie y guarda el usuario en el store
 */
export async function register(values: z.infer<typeof registerSchema>) {
  try {
    // Server side validation
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      const errorMessages = result.error.issues
        .map((err: any) => err.message)
        .join(", ");
      throw new Error(errorMessages);
    }

    const { name, email, password } = values;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (response.ok) {
      return { success: true, data: responseJson, message: "Registro exitoso" };
    }

    // Manejar diferentes tipos de errores HTTP
    if (response.status === 401) {
      throw new Error(
        "Credenciales incorrectas. Por favor, verifica tu email y contraseña."
      );
    } else if (response.status === 403) {
      throw new Error("Tu cuenta está desactivada. Contacta al administrador.");
    } else if (response.status === 429) {
      throw new Error(
        "Demasiados intentos. Por favor, espera unos minutos antes de intentar nuevamente."
      );
    } else if (response.status >= 500) {
      throw new Error("Error del servidor. Por favor, intenta más tarde.");
    } else {
      throw new Error(responseJson.message || "Error al registrar usuario");
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al registrar usuario");
  }
}

/**
 * Login
 * @param values {email, password}
 * Genera JWT tokens en cookie y guarda el usuario en el store
 */
export const login = async (values: z.infer<typeof loginSchema>) => {
  // Server side validation
  const result = loginSchema.safeParse(values);

  if (!result.success) {
    const errorMessages = result.error.issues
      .map((err: any) => err.message)
      .join(", ");
    throw new Error(errorMessages);
  }

  const { email, password, otp } = values;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This is needed to include cookies
      body: JSON.stringify({ email, password, otp }),
    });

    const responseJson = await response.json();

    if (response.ok) {
      return { success: true, data: responseJson, message: "Login exitoso" };
    } else {
      throw new Error(responseJson.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      // Si ya es un Error con nuestro mensaje personalizado, lo propagamos
      throw error;
    }
    // Errores de red o conexión
    if (error instanceof TypeError) {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    }
    // Error genérico
    throw new Error("Error al iniciar sesión. Por favor, intenta nuevamente.");
  }
};

/**
 * Refresh token
 * @returns true si el refresh token es válido, false si no
 * Genera un nuevo access token y lo guarda en cookie
 */
export const refreshToken = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include", // Enviar cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }

    throw new Error("Refresh token inválido");
  } catch (error) {
    console.error("Error al renovar token:", error);
    throw new Error("Error al renovar token");
  }
};

export async function changePassword(
  values: z.infer<typeof changePasswordSchema>
) {
  try {
    const result = changePasswordSchema.safeParse(values);
    if (!result.success) {
      const errorMessages = result.error.issues
        .map((err: any) => err.message)
        .join(", ");
      throw new Error(errorMessages);
    }
    const { email, password, token } = values;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword: password, token }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      return {
        success: true,
        data: responseJson,
        message: responseJson.message,
      };
    } else {
      throw new Error(responseJson.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al cambiar contraseña");
  }
}

export async function logout() {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      return {
        success: true,
        message: "Sesión cerrada correctamente",
      };
    } else {
      throw new Error("Logout fallido");
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error("Error al cerrar sesión");
  }
}
