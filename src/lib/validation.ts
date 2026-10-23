import { z } from 'zod';

const currencySchema = z.coerce.number().finite().nonnegative().refine((n) => n >= 0, 'Value must be 0 or greater');

export const leadFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  mobileNumber: z.string().regex(/^\+?6?0\d{1,2}-?\d{7,8}$/, 'Provide a valid Malaysian mobile number.'),
  email: z.string().email('Please enter a valid email.').optional().or(z.literal('')),
  employmentSector: z.enum(['government', 'glc', 'private-sector', 'self-employed', 'other']),
  employerName: z.string().min(1, 'Employer name is required.').optional().or(z.literal('')),
  employmentType: z.enum(['permanent', 'contract', 'temporary', 'self-employed', 'other']),
  employmentDurationYears: z.coerce.number().nonnegative(),
  employmentDurationMonths: z.coerce.number().min(0).max(11),
  grossMonthlyIncome: currencySchema,
  statutoryDeductions: currencySchema,
  netMonthlyIncome: currencySchema,
  existingMonthlyCommitments: currencySchema,
  housingOwnershipStatus: z.enum(['own', 'rent', 'living-with-family', 'other']),
  houseUnderFinancing: z.enum(['yes', 'no', 'not-applicable']),
  contactPreference: z.enum(['call', 'sms', 'whatsapp', 'email']),
  enquiryReason: z.string().min(3, 'Tell us why you are enquiring.'),
  consentStatus: z.enum(['yes', 'no']),
  preferredContact: z.enum(['call', 'sms', 'whatsapp', 'email'])
});

export function getLeadValidationError(input: unknown) {
  const result = leadFormSchema.safeParse(input);
  return result.success ? null : result.error.issues[0]?.message ?? 'Validation failed.';
}
