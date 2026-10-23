import { z } from 'zod';

export const policySchema = z.object({
  id: z.string(),
  version: z.string(),
  incomeBasis: z.enum(['net', 'gross']),
  minIncome: z.number().nonnegative(),
  minEmploymentMonths: z.number().nonnegative(),
  dsrThreshold: z.number().nonnegative(),
  requireConsent: z.boolean(),
  rules: z.array(z.string())
});

export const leadSubmissionSchema = z.object({
  idempotencyKey: z.string().min(6),
  fullName: z.string().min(2),
  mobileNumber: z.string().min(8),
  income: z.number().positive(),
  statutoryDeductions: z.number().nonnegative(),
  recurringCommitments: z.number().nonnegative(),
  employmentMonths: z.number().nonnegative(),
  consentStatus: z.enum(['yes', 'no'])
});
