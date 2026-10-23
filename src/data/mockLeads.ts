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
  assessmentPolicyVersion: string;
  preliminaryResult: string;
  reasonCodes: string[];
  leadStatus: 'NEW' | 'CONTACTED' | 'REVIEWING' | 'AWAITING_CUSTOMER' | 'QUALIFIED_FOR_FURTHER_REVIEW' | 'NOT_QUALIFIED' | 'CLOSED';
  assignedStaff: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  internalNotes?: string;
};

export const sampleLeadRecords: LeadRecord[] = [
  {
    id: 'FIN-20261015-002',
    createdAt: '2026-10-15T09:00:00.000Z',
    fullName: 'Aisha Rahman',
    mobileNumber: '+60123456789',
    email: 'aisha@example.com',
    employmentSector: 'private-sector',
    employer: 'Nexus Sdn Bhd',
    employmentType: 'permanent',
    employmentDuration: '2 years 4 months',
    grossMonthlyIncome: 5200,
    statutoryDeductions: 560,
    netMonthlyIncome: 4640,
    recognisedMonthlyCommitments: 1760,
    existingDsr: 37.93,
    projectedDsr: 42.24,
    housingOwnershipStatus: 'own',
    houseUnderFinancing: 'yes',
    enquiryReason: 'Need to understand buying power before speaking to a representative.',
    contactPreference: 'whatsapp',
    consentStatus: 'yes',
    assessmentPolicyVersion: 'POLICY-V1',
    preliminaryResult: 'Meets configured preliminary criteria',
    reasonCodes: ['DSR_WITHIN_POLICY'],
    leadStatus: 'NEW',
    assignedStaff: 'Nadia',
    nextFollowUpDate: '2026-10-19'
  },
  {
    id: 'FIN-20261016-011',
    createdAt: '2026-10-16T11:30:00.000Z',
    fullName: 'Farid Ismail',
    mobileNumber: '+60182345678',
    email: 'farid@example.com',
    employmentSector: 'government',
    employer: 'Jabatan Kerajaan',
    employmentType: 'contract',
    employmentDuration: '1 year 2 months',
    grossMonthlyIncome: 3900,
    statutoryDeductions: 430,
    netMonthlyIncome: 3470,
    recognisedMonthlyCommitments: 1890,
    existingDsr: 54.47,
    projectedDsr: 60.89,
    housingOwnershipStatus: 'rent',
    houseUnderFinancing: 'no',
    enquiryReason: 'Trying to understand whether a new financing application is feasible.',
    contactPreference: 'call',
    consentStatus: 'yes',
    assessmentPolicyVersion: 'POLICY-V1',
    preliminaryResult: 'Does not meet configured preliminary criteria',
    reasonCodes: ['DSR_THRESHOLD_EXCEEDED'],
    leadStatus: 'QUALIFIED_FOR_FURTHER_REVIEW',
    assignedStaff: 'Siti',
    nextFollowUpDate: '2026-10-18'
  }
];
