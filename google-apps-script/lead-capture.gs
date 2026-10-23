const BASE_HEADERS = [
  'Lead ID',
  'Created At',
  'Full Name',
  'Mobile Number',
  'Email',
  'Employment Sector',
  'Employer',
  'Employment Type',
  'Employment Duration',
  'Gross Monthly Income',
  'Statutory Deductions',
  'Net Monthly Income',
  'Recognised Monthly Commitments',
  'Existing DSR',
  'Projected DSR',
  'Housing Ownership Status',
  'House Under Financing',
  'Enquiry Reason',
  'Contact Preference',
  'Consent Status',
  'Assessment Policy Version',
  'Preliminary Result',
  'Reason Codes',
  'Lead Status',
  'Assigned Staff',
  'Last Contact Date',
  'Next Follow-up Date',
  'Internal Notes'
];

function getSpreadsheet() {
  const scriptProps = PropertiesService.getScriptProperties();
  let spreadsheetId = scriptProps.getProperty('SPREADSHEET_ID');

  if (!spreadsheetId) {
    const spreadsheet = SpreadsheetApp.create('FIN.EXE Leads');
    spreadsheetId = spreadsheet.getId();
    scriptProps.setProperty('SPREADSHEET_ID', spreadsheetId);
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, BASE_HEADERS.length).setValues([BASE_HEADERS]);
    sheet.setFrozenRows(1);
  }

  return { spreadsheet, sheet };
}

function validNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function calcDsr({ grossMonthlyIncome, statutoryDeductions, netMonthlyIncome, recognisedMonthlyCommitments }) {
  const income = typeof netMonthlyIncome === 'number' && netMonthlyIncome > 0
    ? netMonthlyIncome
    : Math.max((Number(grossMonthlyIncome) || 0) - (Number(statutoryDeductions) || 0), 0);

  if (!income || income <= 0) {
    return { recognisedMonthlyIncome: 0, totalRecognisedMonthlyCommitments: 0, dsr: 0 };
  }

  const commitments = Number(recognisedMonthlyCommitments || 0);
  return {
    recognisedMonthlyIncome: income,
    totalRecognisedMonthlyCommitments: commitments,
    dsr: (commitments / income) * 100
  };
}

function policyCheck(payload) {
  const threshold = Number(payload.policyThreshold || 45);
  const minIncome = Number(payload.minIncome || 0);
  const minEmploymentMonths = Number(payload.minEmploymentMonths || 0);

  if (!payload.consented || payload.consentStatus !== 'yes') {
    return { result: 'Further review required', reasonCodes: ['CONSENT_MISSING'] };
  }

  if (payload.income <= 0 || payload.employmentMonths < minEmploymentMonths || payload.monthlyIncome < minIncome) {
    return { result: 'Does not meet configured preliminary criteria', reasonCodes: ['INCOME_OR_HISTORY_FAIL'] };
  }

  if (payload.dsr > threshold) {
    return { result: 'Does not meet configured preliminary criteria', reasonCodes: ['DSR_THRESHOLD_EXCEEDED'] };
  }

  return { result: 'Meets configured preliminary criteria', reasonCodes: ['DSR_WITHIN_POLICY'] };
}

function generateLeadId() {
  const dt = new Date();
  const stamp = dt.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  return `FIN-${stamp}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const { idempotencyKey, ...lead } = payload || {};

    if (!lead || !lead.fullName || !lead.mobileNumber) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Missing required customer fields.' }))
        .setMimeType(ContentType.JSON);
    }

    if (idempotencyKey) {
      const scriptProps = PropertiesService.getScriptProperties();
      const seen = scriptProps.getProperty(`lead-${idempotencyKey}`);
      if (seen) {
        return ContentService
          .createTextOutput(JSON.stringify({ ok: false, error: 'Duplicate submission rejected.' }))
          .setMimeType(ContentType.JSON);
      }
      scriptProps.setProperty(`lead-${idempotencyKey}`, 'submitted');
    }

    const grossIncome = Number(lead.grossMonthlyIncome || 0);
    const statutoryDeductions = Number(lead.statutoryDeductions || 0);
    const netMonthlyIncome = Number(lead.netMonthlyIncome || 0);
    const recognisedCommitments = Number(lead.recognisedMonthlyCommitments || 0);
    const proposedDsr = Number(lead.projectedDsr || 0);

    if (!validNumber(grossIncome) || !validNumber(statutoryDeductions) || !validNumber(recognisedCommitments)) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Invalid numeric values provided.' }))
        .setMimeType(ContentType.JSON);
    }

    const calc = calcDsr({
      grossMonthlyIncome: grossIncome,
      statutoryDeductions: statutoryDeductions,
      netMonthlyIncome: netMonthlyIncome,
      recognisedMonthlyCommitments: recognisedCommitments
    });

    const policy = {
      policyThreshold: Number(lead.policyThreshold || 45),
      minIncome: Number(lead.minIncome || 0),
      minEmploymentMonths: Number(lead.minEmploymentMonths || 0),
      consented: !!lead.consentStatus,
      employmentMonths: Number(lead.employmentDurationMonths || 0),
      monthlyIncome: Number(lead.netMonthlyIncome || lead.grossMonthlyIncome || 0),
      dsr: calc.dsr
    };

    const evaluation = policyCheck(policy);
    const createdAt = new Date().toISOString();
    const leadId = lead.leadId || generateLeadId();
    const { sheet } = getSpreadsheet();

    const row = [
      leadId,
      createdAt,
      lead.fullName || '',
      lead.mobileNumber || '',
      lead.email || '',
      lead.employmentSector || '',
      lead.employer || '',
      lead.employmentType || '',
      lead.employmentDuration || '',
      grossIncome,
      statutoryDeductions,
      netMonthlyIncome,
      recognisedCommitments,
      Number(calc.dsr).toFixed(2),
      Number(proposedDsr).toFixed(2),
      lead.housingOwnershipStatus || '',
      lead.houseUnderFinancing || '',
      lead.enquiryReason || '',
      lead.contactPreference || '',
      lead.consentStatus || '',
      lead.policyVersion || 'POLICY-V1',
      evaluation.result,
      evaluation.reasonCodes.join(', '),
      'NEW',
      '',
      '',
      '',
      ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, leadId, message: 'Lead saved successfully.', result: evaluation.result, reasonCodes: evaluation.reasonCodes }))
      .setMimeType(ContentType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentType.JSON);
  }
}
