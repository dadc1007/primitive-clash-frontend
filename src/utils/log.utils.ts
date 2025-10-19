const IS_DEV = import.meta.env.DEV;

export const log = (...args: unknown[]): void => {
  if (IS_DEV) {
    console.log(...args);
  }
};

export const logError = (message: string, ...details: unknown[]): void => {
  if (IS_DEV) {
    console.error(message, ...details);
  } else {
    // Aquí es donde iría la lógica de reporte en producción.
  }
};
