export const errorMessages = {
  name: {
    required: 'Name is required',
    maxLength: 'Name must be 100 characters or less',
  },
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address (e.g., name@example.com)',
    maxLength: 'Email must be 254 characters or less',
  },
  phone: {
    invalid: 'Please enter a valid phone number (digits, spaces, hyphens, parentheses, or + only)',
    maxLength: 'Phone number must be 20 characters or less',
  },
  message: {
    required: 'Message is required',
    maxLength: 'Message must be 1000 characters or less',
  },
  websiteName: {
    required: 'Website name is required',
    maxLength: 'Website name must be 100 characters or less',
  },
} as const;

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return errorMessages.name.required;
  if (trimmed.length > 100) return errorMessages.name.maxLength;
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return errorMessages.email.required;
  if (trimmed.length > 254) return errorMessages.email.maxLength;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return errorMessages.email.invalid;
  return null;
}

export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > 20) return errorMessages.phone.maxLength;
  if (!/^[0-9\s\-()+ ]+$/.test(trimmed)) return errorMessages.phone.invalid;
  return null;
}

export function validateMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return errorMessages.message.required;
  if (trimmed.length > 1000) return errorMessages.message.maxLength;
  return null;
}

export function validateWebsiteName(value: string, required = false): string | null {
  const trimmed = value.trim();
  if (required && !trimmed) return errorMessages.websiteName.required;
  if (value.length > 100) return errorMessages.websiteName.maxLength;
  return null;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  hasExistingWebsite: boolean;
  websiteName: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  const websiteError = validateWebsiteName(data.websiteName, data.hasExistingWebsite);
  if (websiteError) errors.websiteName = websiteError;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
