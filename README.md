# FIN.EXE Portal

FIN.EXE is a Malaysian financing pre-screening portal for DSR calculation, preliminary eligibility screening, lead capture to Google Sheets, and an internal staff dashboard.

## Overview

- Public customer portal with DSR calculator and lead form.
- Configurable financing policy logic and reason codes.
- Google Apps Script backend for saving leads to Google Sheets.
- Staff dashboard with analytics and lead management.
- Local development fallback when backend config is not yet available.

## Stack

- React + TypeScript + Vite
- Recharts for dashboard analytics
- Zod for validation
- Google Apps Script for initial spreadsheet capture

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Demo admin access

The app includes a local demo login flow for development. Configure the values in `.env` or use the defaults in the environment sample file.

- Admin email: `admin@finexe.local`
- Admin password: `changeme`

This is for local demonstration only. Production deployments must use a secure identity provider and backend role-based access controls.

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required values:

- `VITE_GOOGLE_SHEETS_WEBAPP_URL` – Google Apps Script deployment URL for the public lead endpoint.
- `VITE_ADMIN_EMAIL` – staff login email for the local demo login page.
- `VITE_ADMIN_PASSWORD` – staff login password for the local demo login page.
- `VITE_WHATSAPP_NUMBER` – official WhatsApp business number placeholder.
- `VITE_DEFAULT_POLICY_VERSION` – product policy version string.

Do not commit real secrets or production credentials to GitHub.

## Google Apps Script backend

See the Google Apps Script source in `google-apps-script/lead-capture.gs`.

### Deployment steps

1. Open Google Apps Script.
2. Create a new project.
3. Paste the script from `google-apps-script/lead-capture.gs`.
4. Save and deploy as a Web App.
5. Set access to "Anyone" for the public lead submission endpoint.
6. Set the script property `SPREADSHEET_ID` or create a spreadsheet from the script.
7. Copy the Web App URL into `VITE_GOOGLE_SHEETS_WEBAPP_URL`.
8. Update the spreadsheet ID when using a custom file.

Security note: Apps Script only provides a lightweight server layer for lead capture. It is not a secure long-term admin dashboard backend. For production staff operations, use authenticated Supabase or another secure backend with row-level security and audit logs.

## Google Sheets lead schema

The script creates a spreadsheet and adds these headers automatically:

- Lead ID
- Created At
- Full Name
- Mobile Number
- Email
- Employment Sector
- Employer
- Employment Type
- Employment Duration
- Gross Monthly Income
- Statutory Deductions
- Net Monthly Income
- Recognised Monthly Commitments
- Existing DSR
- Projected DSR
- Housing Ownership Status
- House Under Financing
- Enquiry Reason
- Contact Preference
- Consent Status
- Assessment Policy Version
- Preliminary Result
- Reason Codes
- Lead Status
- Assigned Staff
- Last Contact Date
- Next Follow-up Date
- Internal Notes

## Testing

```bash
npm run test
```

## Known limitations

- The public portal uses a demo local-storage fallback if no Apps Script URL is configured.
- The admin dashboard’s login is local-only for demo use and must be replaced by a real secure identity provider before live production use.
- Static hosting cannot provide a secure privileged backend. Use authenticated server-side storage for production customer records and employee access.

## Privacy and compliance notes

This portal is a planning tool and does not approve or guarantee financing. It uses a privacy notice and explicit contact consent in the lead form. Malaysian personal data obligations and internal retention policies should be reviewed by a professional before public launch.

## License

MIT
