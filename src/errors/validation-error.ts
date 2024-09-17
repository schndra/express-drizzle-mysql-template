import { ZodError } from "zod";

export function handleValidationError(err: ZodError): {
  invalidFields: string[];
  requiredFields: string[];
  tooSmallErrors?: { path: string; msg: string }[];
} {
  const invalidFields = [];
  const requiredFields = [];
  const tooSmallErrors = [];

  // console.log(err.errors);

  for (const error of err.errors) {
    if (error.code === "invalid_type") invalidFields.push(error.path.join("."));
    else if (error.message === "Required")
      requiredFields.push(error.path.join("."));
    else if (error.code === "too_small")
      tooSmallErrors.push({ path: error.path.join("."), msg: error.message });
  }

  return {
    invalidFields,
    requiredFields,
    tooSmallErrors,
  };
}
