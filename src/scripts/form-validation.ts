/**
 * Form Validation Logic for Home Town Web Host
 * Enforces rigorous constraints specified in Requirement 4.
 */

export interface ContactFormData {
  name: string;
  hasExistingWebsite: 'yes' | 'no';
  websiteName?: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  websiteName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Error message constants matching Acceptance Criteria - Req 4.4 to 4.10
export const errorMessages = {
  name: {
    required: 'Name is required.',
    maxLength: 'Name must be 100 characters or less.',
  },
  websiteName: {
    required: 'Website name is required when you have an existing site.',
    maxLength: 'Website name must be 100 characters or less.',
  },
  email: {
    required: 'Email is required.',
    invalidFormat: 'Please enter a valid email address with a domain (e.g., name@example.com).',
    maxLength: 'Email must be 254 characters or less.',
  },
  phone: {
    invalidFormat: 'Phone number format is invalid. Use digits, spaces, hyphens, parentheses, or plus sign only.',
    maxLength: 'Phone number must be 20 characters or less.',
  },
  message: {
    required: 'Message is required.',
    maxLength: 'Message must be 1000 characters or less.',
  }
};

/**
 * Validates the 'name' field
 */
export function validateName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) {
    return errorMessages.name.required;
  }
  if (trimmed.length > 100) {
    return errorMessages.name.maxLength;
  }
  return undefined;
}

/**
 * Validates the 'websiteName' field (conditional on hasExistingWebsite === 'yes')
 */
export function validateWebsiteName(websiteName: string | undefined, hasExistingWebsite: 'yes' | 'no'): string | undefined {
  if (hasExistingWebsite === 'no') {
    return undefined;
  }
  
  const trimmed = (websiteName || '').trim();
  if (!trimmed) {
    return errorMessages.websiteName.required;
  }
  if (trimmed.length > 100) {
    return errorMessages.websiteName.maxLength;
  }
  return undefined;
}

/**
 * Validates the 'email' field
 */
export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) {
    return errorMessages.email.required;
  }
  if (trimmed.length > 254) {
    return errorMessages.email.maxLength;
  }
  // Standard email validation (must contain @ followed by a domain - Req 4.7)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return errorMessages.email.invalidFormat;
  }
  return undefined;
}

/**
 * Validates the 'phone' field
 */
export function validatePhone(phone: string | undefined): string | undefined {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return undefined; // Optional field
  }
  if (trimmed.length > 20) {
    return errorMessages.phone.maxLength;
  }
  // Allowed chars: digits, spaces, hyphens, parentheses, plus sign (Req 4.9)
  const phoneRegex = /^[0-9\s\-()+]*$/;
  if (!phoneRegex.test(trimmed)) {
    return errorMessages.phone.invalidFormat;
  }
  return undefined;
}

/**
 * Validates the 'message' field
 */
export function validateMessage(message: string): string | undefined {
  const trimmed = message.trim();
  if (!trimmed) {
    return errorMessages.message.required;
  }
  if (trimmed.length > 1000) {
    return errorMessages.message.maxLength;
  }
  return undefined;
}

/**
 * Validates an individual field by key and value
 */
export function validateField(key: keyof ContactFormData, data: ContactFormData): string | undefined {
  switch (key) {
    case 'name':
      return validateName(data.name);
    case 'websiteName':
      return validateWebsiteName(data.websiteName, data.hasExistingWebsite);
    case 'email':
      return validateEmail(data.email);
    case 'phone':
      return validatePhone(data.phone);
    case 'message':
      return validateMessage(data.message);
    default:
      return undefined;
  }
}

/**
 * Performs full validation on a set of Contact Form Data
 */
export function validateForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};
  
  const nameErr = validateName(data.name);
  if (nameErr) errors.name = nameErr;

  const websiteErr = validateWebsiteName(data.websiteName, data.hasExistingWebsite);
  if (websiteErr) errors.websiteName = websiteErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  const messageErr = validateMessage(data.message);
  if (messageErr) errors.message = messageErr;

  return errors;
}
