export type LeadStatus = 'NEW' | 'CONTACTED' | 'REVIEWING' | 'AWAITING_CUSTOMER' | 'QUALIFIED_FOR_FURTHER_REVIEW' | 'NOT_QUALIFIED' | 'CLOSED';

export type DsrBand = '0-20' | '20-30' | '30-40' | '40-50' | '50-60' | '60+';

export type LeadRecord = {
  id: string;
  createdAt: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  employmentSector: string;
  employer?: string;
  employmentType: string;
  employmentDuration: string;
  grossMonthlyIncome: number;
  statutoryDeductions: number;
  netMonthlyIncome: number;
  recognisedMonthlyCommitments: number;
  existingDsr: number;
  projectedDsr?: number;
  housingOwnershipStatus: string;
  houseUnderFinancing: string;
  enquiryReason: string;
  contactPreference: string;
  consentStatus: 'yes' | 'no';
  policyVersion: string;
  preliminaryResult: string;
  reasonCodes: string[];
  leadStatus: LeadStatus;
  assignedStaff: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  internalNotes?: string;
};

export type PolicyConfig = {
  id: string;
  label: string;
  version: string;
  incomeBasis: 'net' | 'gross';
  minIncome: number;
  minEmploymentMonths: number;
  dsrThreshold: number;
  minEmploymentType: string[];
  housingRequirement?: string;
  requireConsent: boolean;
  rules: string[];
};

export type AssessmentResult = {
  category: 'meets' | 'review' | 'fail' | 'manual';
  label: string;
  reasonCodes: string[];
  dsr: number;
  projectedDsr?: number;
};
