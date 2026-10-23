import { defaultPolicy, type PolicyConfig } from '../lib/dsr';

export const policyConfig: PolicyConfig = defaultPolicy;

export const sampleLeads = [
  {
    id: 'FIN-20260101-101',
    createdAt: '2026-01-15T09:00:00.000Z',
    fullName: 'Aina Rahman',
    mobileNumber: '+60123456789',
    employmentSector: 'private-sector',
    employmentType: 'permanent',
    grossMonthlyIncome: 5200,
    statutoryDeductions: 620,
    netMonthlyIncome: 4600,
    recognisedMonthlyCommitments: 1750,
    existingDsr: 38.04,
    projectDsr: 42.39,
    housingOwnershipStatus: 'own',
    enquiryReason: 'Need to understand financing options',
    contactPreference: 'whatsapp',
    consentStatus: 'yes',
    preliminaryResult: 'Meets configured preliminary criteria',
    reasonCodes: ['DSR_WITHIN_POLICY'],
    leadStatus: 'NEW',
    assignedStaff: 'Nadia',
    nextFollowUpDate: '2026-01-20'
  },
  {
    id: 'FIN-20260104-208',
    createdAt: '2026-01-14T16:30:00.000Z',
    fullName: 'Hafiz Mohamed',
    mobileNumber: '+60182345678',
    employmentSector: 'government',
    employmentType: 'contract',
    grossMonthlyIncome: 4100,
    statutoryDeductions: 510,
    netMonthlyIncome: 3590,
    recognisedMonthlyCommitments: 1820,
    existingDsr: 50.7,
    projectDsr: 57.1,
    housingOwnershipStatus: 'rent',
    enquiryReason: 'Concerns about home loan eligibility',
    contactPreference: 'call',
    consentStatus: 'yes',
    preliminaryResult: 'Further review required',
    reasonCodes: ['DSR_THRESHOLD_EXCEEDED'],
    leadStatus: 'REVIEWING',
    assignedStaff: 'Siti',
    nextFollowUpDate: '2026-01-18'
  }
];
