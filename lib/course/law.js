// True Plumb · legal and industry basis for each scenario.
// Shown to learners after they answer, as "The rules behind this".
// Scope: Great Britain (England, Wales and Scotland). Northern Ireland has its own equivalents.
// Every entry is reviewed on the date in LAW_REVIEWED. Update the date whenever any line changes.

export const LAW_REVIEWED = "7 November 2026";
export const LAW_SCOPE = "Great Britain";
export const LAW_NOTE = "Training, not legal advice. Check your own company policy, and take advice on specific cases.";

// Reusable references
const R = {
  hswa2: { ref: "Health and Safety at Work etc. Act 1974, s2", note: "Employers must, so far as is reasonably practicable, keep people safe, including safe systems of work, training and supervision." },
  hswa7: { ref: "Health and Safety at Work etc. Act 1974, s7", note: "Every employee must take reasonable care of themselves and others affected by their work, and co-operate with their employer on safety." },
  hswa37: { ref: "Health and Safety at Work etc. Act 1974, s37", note: "Directors and senior managers can be personally prosecuted if a company offence happened with their consent, connivance or neglect." },
  mhsw3: { ref: "Management of Health and Safety at Work Regulations 1999, reg 3", note: "Employers must assess risks, including work-related stress. With five or more employees, the significant findings must be recorded." },
  mhsw8: { ref: "Management of Health and Safety at Work Regulations 1999, reg 8", note: "Employers must have procedures for serious and imminent danger, so people can stop work and move to safety." },
  mhsw13: { ref: "Management of Health and Safety at Work Regulations 1999, reg 13", note: "Training is required when people are recruited, and again when they face new or increased risks, for example after a move or promotion." },
  mhsw14: { ref: "Management of Health and Safety at Work Regulations 1999, reg 14", note: "Employees must report serious and immediate dangers, and shortcomings in safety arrangements, to their employer." },
  era44: { ref: "Employment Rights Act 1996, ss44 and 100", note: "Employees and workers are protected from detriment, and employees from dismissal, for leaving or refusing to return to serious and imminent danger, or for raising safety concerns. No qualifying service is needed." },
  wahr: { ref: "Work at Height Regulations 2005, regs 6 and 8", note: "Work at height must be properly planned. Falls must be prevented with guardrails and edge protection first; fall-arrest equipment comes after that." },
  wahr10: { ref: "Work at Height Regulations 2005, reg 10", note: "Steps must be taken to prevent materials or objects falling, and to stop people being struck if they do." },
  wahr12: { ref: "Work at Height Regulations 2005, reg 12 and Schedule 7", note: "A scaffold must be inspected by a competent person before first use, after any substantial addition, dismantling or alteration, after any event that could affect its safety (such as high winds), and at least every 7 days." },
  nasc: { ref: "NASC TG20 and SG4 (industry guidance)", note: "Scaffolds are erected, altered and dismantled only by competent scaffolders, to a recognised design. Other trades must not alter them." },
  weather: { ref: "Work at Height Regulations 2005, reg 4(3)", note: "Work at height must only be carried out when the weather doesn't put anyone's health or safety at risk." },
  puwer: { ref: "Provision and Use of Work Equipment Regulations 1998, regs 4 and 5", note: "Work equipment must be suitable and kept in good repair. Damaged kit must be taken out of use." },
  eawr: { ref: "Electricity at Work Regulations 1989; HSE guidance HSG141", note: "Electrical equipment must be maintained to prevent danger. On construction sites, 110V reduced-voltage tools are recommended." },
  mhor: { ref: "Manual Handling Operations Regulations 1992", note: "Avoid hazardous lifting where you can, assess what can't be avoided, and reduce the risk, for example with lifting aids." },
  riddor: { ref: "RIDDOR 2013", note: "Deaths, specified injuries, over-7-day injuries (report within 15 days) and certain dangerous occurrences must be reported to HSE. Over-3-day injuries must be recorded." },
  book: { ref: "Social Security (Claims and Payments) Regulations 1979, reg 25; HSE accident book BI 510", note: "Employers with 10 or more employees must keep an accident book. A record helps if an injury gets worse or a claim is made later." },
  hsg245: { ref: "HSE guidance HSG245, Investigating accidents and incidents", note: "Near misses should be reported and investigated like accidents. They point to the same causes." },
  wtr: { ref: "Working Time Regulations 1998, regs 4, 10, 11 and 12", note: "Adult workers are entitled to 11 hours' rest each day, a 20-minute break over 6 hours, and weekly rest. The average week is limited to 48 hours unless the worker opts out in writing." },
  drink: { ref: "Road Traffic Act 1988, ss4 and 5; HSE guidance on drugs and alcohol at work", note: "Driving while unfit through drink or drugs is a criminal offence. Employers who knowingly allow someone under the influence to keep working can be prosecuted under HSWA." },
  cdm8: { ref: "Construction (Design and Management) Regulations 2015, reg 8", note: "Anyone appointed to do construction work must have the skills, knowledge, experience and organisational capability to do it safely." },
  cdm15: { ref: "Construction (Design and Management) Regulations 2015, regs 13 and 15", note: "Contractors must plan, manage and supervise their work, give workers a suitable site induction, and use only people with the right skills, knowledge, training and experience." },
  bsa: { ref: "Building Safety Act 2022 and the 2023 competence regulations", note: "Everyone carrying out building work must be competent for it, and organisations must be able to show it." },
  hseMS: { ref: "HSE Management Standards for work-related stress", note: "Six areas to manage: demands, control, support, relationships, role and change." },
  eqa: { ref: "Equality Act 2010", note: "Treat people fairly regardless of the nine protected characteristics. For disabled people, including some mental health conditions, employers must make reasonable adjustments." },
  eqa77: { ref: "Equality Act 2010, s77", note: "People can discuss their own pay to find out if there's discrimination. That doesn't let someone who processes payroll disclose others' pay." },
  acas: { ref: "Acas Code of Practice on disciplinary and grievance procedures", note: "Deal with issues promptly and fairly: investigate, tell the person in writing, hold a meeting, allow a companion, and offer an appeal. Tribunals can adjust awards by up to 25% if the Code is ignored." },
  ud: { ref: "Employment Rights Act 1996, ss94, 98 and 108; Employment Rights Act 2025", note: "Dismissal must have a fair reason and a fair process. The qualifying period for ordinary unfair dismissal falls from two years to six months for dismissals from 1 January 2027, and the cap on compensation is removed. Discrimination, whistleblowing and safety claims need no service." },
  wages: { ref: "Employment Rights Act 1996, Part II (s13)", note: "Paying less than is owed, or not paying on payday, can be an unlawful deduction from wages. Arrears should be corrected promptly." },
  nmw: { ref: "National Minimum Wage Act 1998", note: "If an error takes anyone below the minimum wage, arrears must be paid. It is enforced by the state, now through the Fair Work Agency, which can name employers." },
  variation: { ref: "Contract law; Employment Rights Act 2025 (fire and rehire)", note: "Changing pay, hours or other key terms needs the person's agreement or a clear contractual right. New fire-and-rehire restrictions apply from January 2027." },
  redund: { ref: "Trade Union and Labour Relations (Consolidation) Act 1992, ss188 and 193; Employment Rights Act 1996, s98", note: "For 20 to 99 redundancies at one establishment within 90 days, collective consultation must start at least 30 days before the first dismissal (45 days for 100+), and the government must be notified on form HR1. The protective award for failing to consult is up to 180 days' pay from April 2026." },
  gdpr: { ref: "UK GDPR, Articles 5, 32 and 33; Data Protection Act 2018", note: "Personal data must be kept secure and shared only when there's a lawful reason. A breach likely to risk people's rights must be reported to the ICO within 72 hours of becoming aware of it." },
  fraud: { ref: "Payment diversion (mandate) fraud: UK Finance Take Five and NCSC guidance", note: "Always check a change of bank details by phoning a number you already hold, never one from the email. If money has gone, contact your bank immediately." },
  controls: { ref: "Financial control good practice", note: "Separate who sets up suppliers from who approves payments, keep approval limits, and check for duplicates before every payment run." },
  ca172: { ref: "Companies Act 2006, ss172 and 174", note: "Directors must promote the success of the company, considering employees, suppliers and customers, and act with reasonable care, skill and diligence." },
  insolv: { ref: "Insolvency Act 1986, s214; HMRC Time to Pay", note: "When insolvency is likely, directors must act to minimise losses to creditors, and should take advice early. HMRC may agree payment plans for tax if asked before the deadline." },
  indg417: { ref: "HSE and IoD, Leading health and safety at work (INDG417)", note: "Boards should lead on safety, review performance regularly, and make sure safety is considered in business decisions." },
  late: { ref: "Late Payment of Commercial Debts (Interest) Act 1998; Housing Grants, Construction and Regeneration Act 1996", note: "Businesses can claim statutory interest on late payments. Construction contracts have rights to payment notices and to suspend work for non-payment." },
  dse: { ref: "Health and Safety (Display Screen Equipment) Regulations 1992", note: "Workstations of regular screen users must be assessed, and eye tests offered on request." },
  fire: { ref: "Regulatory Reform (Fire Safety) Order 2005", note: "The responsible person must assess fire risk, keep escape routes clear, and make sure staff know what to do in an emergency." }
};

export const LAW = {
  // General Operatives
  p1s1: [R.wahr, R.hswa7, R.mhsw14],
  p1s2: [R.mhor, R.mhsw13, R.hswa7],
  p1s3: [R.wahr, R.hswa7],
  p1s4: [R.puwer, R.eawr, R.hswa7],
  p2s1: [R.weather, R.era44, R.mhsw8],
  p2s2: [R.wahr12, R.nasc, R.cdm15],
  p2s3: [R.mhsw14, R.mhsw13, R.era44],
  p2s4: [R.drink, R.hswa7],
  p3s1: [R.wahr10, R.hsg245],
  p3s2: [R.wahr, R.hswa7],
  p3s3: [R.wtr, R.mhsw3],
  p3s4: [R.book, R.riddor, R.mhor],
  // Team Leaders
  d1s1: [R.acas],
  d2s3: [R.hseMS, R.mhsw3, R.eqa],
  d3s3: [R.acas, R.eqa],
  d3s4: [R.wtr],
  // Operations Managers
  o1s2: [R.variation, R.wtr],
  o2s3: [R.hseMS, R.mhsw3],
  o3s1: [R.variation, R.wtr],
  o3s2: [R.cdm8, R.bsa],
  o3s3: [R.acas],
  o3s4: [R.cdm15, R.mhsw13],
  // Office & Admin
  a1s4: [R.wages],
  a2s3: [R.hseMS, R.eqa],
  a2s4: [R.wtr],
  a3s3: [R.gdpr, R.eqa77],
  a3s4: [R.gdpr],
  // Back Office
  b1s1: [R.fraud, R.controls],
  b1s3: [R.wages],
  b1s4: [R.controls],
  b2s1: [R.controls],
  b2s3: [R.wtr],
  b2s4: [R.ud, R.acas],
  b3s1: [R.wages, R.nmw],
  b3s2: [R.fraud],
  b3s4: [R.controls],
  // Directors
  r1s4: [R.acas, R.ud],
  r2s2: [R.late, R.hswa2],
  r2s3: [R.insolv, R.wages],
  r2s4: [R.hswa37, R.hsg245, R.indg417],
  r3s1: [R.ca172, R.cdm8, R.mhsw13],
  r3s2: [R.eqa, R.mhsw13],
  r3s4: [R.redund, R.ud, R.eqa]
};
