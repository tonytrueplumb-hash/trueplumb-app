// True Plumb · end-of-day knowledge checks.
// Styled on the CITB Health, Safety and Environment test: single best answer, and
// multiple-response questions that tell you how many to pick. A multiple-response
// question only scores if every correct answer, and nothing else, is picked.
// Scope: Great Britain. Reviewed on LAW_REVIEWED (see law.js).
// Each question: { id, type: "single" | "multi", q, options, correct: [indexes], why, ref }

export const CHECK_PASS = 0.8;

const OPERATIVES = {
  1: [
    { id: "k-p1a", type: "single", q: "Under the Health and Safety at Work etc. Act 1974, what must every employee do?",
      options: ["Take reasonable care of themselves and others, and co-operate on safety", "Follow the safety rules only while a supervisor is on site watching them", "Leave all safety matters to the site manager, who answers for everyone", "Provide and pay for their own personal protective equipment"],
      correct: [0], why: "Safety isn't only the employer's job. Section 7 puts a legal duty on every employee.", ref: "HSWA 1974, s7" },
    { id: "k-p1b", type: "single", q: "A guardrail is missing on a working platform. What does the law say should come first?",
      options: ["Fixing collective protection, such as putting the guardrail back", "Working carefully and staying a safe distance back from the open edge", "Wearing a harness and carrying on with the job as planned", "Putting up a sign so everyone knows the edge is unprotected"],
      correct: [0], why: "The Work at Height Regulations put preventing a fall, with guardrails and edge protection, ahead of arresting a fall with a harness. Being careful isn't a control.", ref: "Work at Height Regulations 2005, regs 6 and 8" },
    { id: "k-p1c", type: "multi", q: "You're handed a power tool with a split lead wrapped in tape. Which TWO should you do?",
      options: ["Stop using it", "Label it as faulty and report it so nobody else uses it", "Re-tape it more neatly", "Use it, but only for short jobs"],
      correct: [0, 1], why: "Damaged kit must be taken out of use and reported. Tape over a split lead hides the danger.", ref: "PUWER 1998, reg 5; Electricity at Work Regulations 1989" }
  ],
  2: [
    { id: "k-p2a", type: "single", q: "You reasonably believe there's serious and imminent danger. What does the law protect you for doing?",
      options: ["Leaving or refusing to return to the danger, and protecting others", "Walking off site for the rest of the week without telling anyone why", "Damaging the equipment so that nobody else is able to use it", "Refusing to do any work at all for the rest of the contract period"],
      correct: [0], why: "You can't be disciplined, treated badly or dismissed for stopping in serious and imminent danger. You don't need any length of service for this protection.", ref: "Employment Rights Act 1996, ss44 and 100" },
    { id: "k-p2b", type: "single", q: "Who is allowed to alter a scaffold, for example to remove ties?",
      options: ["A competent scaffolder, with an inspection before it's used again", "Anyone on site, as long as it's all put back by the end of the day", "The client's own team, because they're the ones who asked for it", "Whoever is nearest and quickest, so the job isn't held up"],
      correct: [0], why: "Scaffolds are altered only by competent scaffolders, and must be inspected after a substantial alteration before anyone uses them.", ref: "Work at Height Regulations 2005, reg 12; NASC SG4" },
    { id: "k-p2c", type: "multi", q: "A colleague arrives unfit through drink. Which TWO are true?",
      options: ["They must not drive or operate plant", "You should tell a supervisor so it can be dealt with", "It's legal for them to drive if they feel fine", "It's only the employer's problem, not yours"],
      correct: [0, 1], why: "Driving while unfit is a criminal offence, and your own duty of care means you shouldn't stay quiet.", ref: "Road Traffic Act 1988, ss4 and 5; HSWA 1974, s7" }
  ],
  3: [
    { id: "k-p3a", type: "single", q: "After an accident at work, someone can't do their normal job for more than 7 days in a row (not counting the day of the accident). What does RIDDOR require?",
      options: ["The employer reports it to HSE within 15 days", "Nothing more, provided it's written in the accident book", "A phone call to HSE within one hour of the accident happening", "The injured person reports it to the police within a week"],
      correct: [0], why: "Over-7-day injuries must be reported within 15 days. Injuries over 3 days must still be recorded.", ref: "RIDDOR 2013" },
    { id: "k-p3b", type: "single", q: "What is a near miss?",
      options: ["An event that didn't cause harm, but could have", "An accident where the injury turned out to be only minor", "An accident that someone forgot to write in the accident book", "A hazard that has been spotted and has already been fixed"],
      correct: [0], why: "Near misses share the same causes as accidents. Reporting them is how the accident is prevented.", ref: "HSE guidance HSG245" },
    { id: "k-p3c", type: "multi", q: "Under the Working Time Regulations, which TWO are adult workers generally entitled to?",
      options: ["11 hours' rest in a row in every 24 hours", "A 20-minute break when working over 6 hours", "Three full days off work every single week, paid", "A two-hour lunch break on any shift over eight hours"],
      correct: [0, 1], why: "Rest rules exist because tired people get hurt. There's also a weekly rest entitlement.", ref: "Working Time Regulations 1998, regs 10 and 12" }
  ]
};

const TEAM = {
  1: [
    { id: "k-t1a", type: "single", q: "Under the Management of Health and Safety at Work Regulations 1999, when must employers give health and safety training?",
      options: ["On recruitment, and when they face new or increased risks", "Only once, during the first week after someone joins the company", "Only when the employee asks for it, so it's their responsibility", "Only when a card or certificate is about to expire"],
      correct: [0], why: "Training isn't a one-off. A promotion into a new role is exactly when the law expects it.", ref: "MHSWR 1999, reg 13" },
    { id: "k-t1b", type: "single", q: "Someone in your team keeps turning up late. What's usually the best first step?",
      options: ["A private, informal chat to understand why and agree a change", "Issue a final written warning straight away so they take it seriously", "Ignore it unless HR raises it with you, as it's their job to manage", "Raise it in the team meeting, so everyone hears the standard"],
      correct: [0], why: "The Acas Code encourages dealing with issues promptly and informally where possible. Formal steps come later if needed.", ref: "Acas Code of Practice on disciplinary and grievance procedures" },
    { id: "k-t1c", type: "multi", q: "If a formal disciplinary meeting is needed, which TWO does the Acas Code say should happen?",
      options: ["Written notice of the problem before the meeting", "The right to bring a colleague or union rep", "Automatic dismissal if they miss the first meeting date", "No right of appeal once the manager has made a decision"],
      correct: [0, 1], why: "Written notice, the right to be accompanied and a right of appeal are core parts of a fair process.", ref: "Acas Code; Employment Relations Act 1999, s10" }
  ],
  2: [
    { id: "k-t2a", type: "single", q: "Which list matches the six areas in the HSE Management Standards for work-related stress?",
      options: ["Demands, control, support, relationships, role and change", "Pay, bonuses, holidays, uniforms, vans and overtime", "Hours, breaks, parking, canteen, heating and lighting", "Targets, appraisals, promotions, training, discipline and sickness"],
      correct: [0], why: "These six areas are what a manager can actually influence day to day.", ref: "HSE Management Standards" },
    { id: "k-t2b", type: "single", q: "Do employers have a legal duty to assess the risk of work-related stress?",
      options: ["Yes, it's part of the general duty to assess risks", "No, stress is a personal matter that sits outside work law", "Only for office staff, as site work is covered by other rules", "Only once someone has been signed off sick because of it"],
      correct: [0], why: "Stress is a workplace health risk like any other, and has to be assessed and managed.", ref: "MHSWR 1999, reg 3; HSWA 1974, s2" },
    { id: "k-t2c", type: "multi", q: "Someone tells you they're struggling and it may be affecting their health. Which TWO are good responses?",
      options: ["Talk privately and listen", "Agree practical changes to their workload and point them to support, such as an employee assistance line or their GP", "Tell the team so they can cover", "Wait to see if they go off sick"],
      correct: [0, 1], why: "Listening and acting early works best. If a condition is a disability, the employer must also consider reasonable adjustments.", ref: "HSE Talking Toolkit; Equality Act 2010" }
  ],
  3: [
    { id: "k-t3a", type: "single", q: "What does 'so far as is reasonably practicable' mean in health and safety law?",
      options: ["Balancing the risk against the cost of control, weighted towards safety", "Doing whatever is cheapest, as long as some precaution is in place", "Removing every single possible risk completely, whatever it ends up costing", "Taking action only once somebody has actually been hurt by it"],
      correct: [0], why: "It's a balance, but heavily weighted towards safety. Cost alone is rarely a good reason.", ref: "HSWA 1974, s2; Edwards v National Coal Board (1949)" },
    { id: "k-t3b", type: "single", q: "How many protected characteristics are there under the Equality Act 2010?",
      options: ["Nine", "Five", "Seven", "Twelve"],
      correct: [0], why: "Age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.", ref: "Equality Act 2010, s4" },
    { id: "k-t3c", type: "multi", q: "Which TWO must a risk assessment do?",
      options: ["Identify the hazards and who could be harmed", "Set out the controls, and be reviewed when things change", "Be written only after an accident has already happened", "Be kept confidential from the workers doing the job"],
      correct: [0, 1], why: "Risk assessments are working documents. The people doing the job should know what's in them.", ref: "MHSWR 1999, reg 3; HSE INDG163" }
  ]
};

const OPS = {
  1: [
    { id: "k-o1a", type: "single", q: "To cut labour costs, you want to reduce someone's pay or hours. Without their agreement, this is usually:",
      options: ["A breach of contract, unless the contract clearly allows it", "Fine, as long as you give them at least a week's notice of it", "Fine, if the business can show it's struggling financially", "Allowed, provided HR has looked at it and signed it off"],
      correct: [0], why: "Key terms need agreement. From January 2027, dismissing and re-engaging people to force changes is heavily restricted.", ref: "Contract law; Employment Rights Act 2025" },
    { id: "k-o1b", type: "single", q: "You propose 20 or more redundancies at one establishment within 90 days. What does the law require?",
      options: ["Collective consultation, and notifying the government on form HR1", "Nothing more than giving each person their contractual notice period", "Only a personal letter to each person explaining the decision", "Written permission from Acas before any notices are issued"],
      correct: [0], why: "Failing to consult can cost up to 180 days' pay per person from April 2026.", ref: "TULRCA 1992, ss188 and 193" },
    { id: "k-o1c", type: "multi", q: "Under CDM 2015, which TWO are duties of the principal contractor?",
      options: ["Plan, manage and monitor the construction phase", "Make sure every worker gets a site induction", "Produce the design drawings for the building or structure", "Appoint the client and agree the client's own duties"],
      correct: [0, 1], why: "The principal contractor runs the construction phase safely. Design duties sit with designers and the principal designer.", ref: "CDM 2015, regs 12 and 13" }
  ],
  2: [
    { id: "k-o2a", type: "single", q: "Under the Working Time Regulations, a worker's average week is limited to 48 hours unless:",
      options: ["They've signed a voluntary opt-out in writing", "The work is urgent and the client needs it finished", "They're being paid at an overtime rate for the extra hours", "Their manager has agreed to it verbally with them"],
      correct: [0], why: "The opt-out must be voluntary and in writing, and rest-break rules still apply.", ref: "Working Time Regulations 1998, regs 4 and 5" },
    { id: "k-o2b", type: "single", q: "Which of these is a RIDDOR-reportable dangerous occurrence, even if nobody is hurt?",
      options: ["The collapse of a scaffold more than 5 metres high", "A hand tool dropped from a step 1 metre off the ground", "A company van found with a flat tyre in the yard", "A delivery of materials arriving two hours late"],
      correct: [0], why: "Some events must be reported because of what could have happened, not what did.", ref: "RIDDOR 2013, Schedule 2" },
    { id: "k-o2c", type: "multi", q: "Before appointing a subcontractor under CDM 2015, which TWO should you check?",
      options: ["The skills, knowledge and experience to work safely", "Their arrangements for managing safety on site", "That they're the cheapest of all the quotes you received", "That they've worked for you before on a similar job"],
      correct: [0, 1], why: "Price matters, but you must be satisfied they can do the work safely. Competence must be shown, not assumed.", ref: "CDM 2015, reg 8; Building Safety Act 2022" }
  ],
  3: [
    { id: "k-o3a", type: "single", q: "Which employers must write down the significant findings of their risk assessments?",
      options: ["Those with five or more employees", "Those with ten or more employees", "Those with fifty or more employees", "Only those in construction"],
      correct: [0], why: "Everyone must assess risk. With five or more employees, the findings must be recorded.", ref: "MHSWR 1999, reg 3(6)" },
    { id: "k-o3b", type: "single", q: "For dismissals from 1 January 2027, what's the qualifying period for an ordinary unfair dismissal claim?",
      options: ["Six months", "Two years", "One year", "Three months"],
      correct: [0], why: "The Employment Rights Act 2025 cuts it from two years and removes the cap on compensation. Fair process matters for nearly everyone.", ref: "Employment Rights Act 2025; ERA 1996, s108" },
    { id: "k-o3c", type: "multi", q: "You move six experienced people onto a new contract. Which TWO must happen?",
      options: ["A site induction for the new site", "A check of their competence for the new tasks", "An automatic change to the terms of their contracts", "Nothing, because they're experienced and know the job"],
      correct: [0, 1], why: "Experience on one job doesn't cover a new site's risks. Induction and training on new risks are legal duties.", ref: "CDM 2015, regs 13 and 15; MHSWR 1999, reg 13" }
  ]
};

const OFFICE = {
  1: [
    { id: "k-a1a", type: "single", q: "Paying someone less than they're owed, or not paying on payday, without a lawful reason can be:",
      options: ["An unlawful deduction from wages", "Fine if payroll was busy", "Only a problem if it happens twice", "Legal, as long as you apologise"],
      correct: [0], why: "People can claim at a tribunal for unpaid wages. Getting pay right, on time, is a legal duty.", ref: "Employment Rights Act 1996, Part II" },
    { id: "k-a1b", type: "single", q: "Under the Display Screen Equipment Regulations, what must employers do for people who use screens daily?",
      options: ["Assess their workstations, and offer eye tests on request", "Limit everyone's screen use to no more than two hours a day", "Supply laptops only, because they're safer than desktop screens", "Nothing at all, because office work is exempt from these rules"],
      correct: [0], why: "Posture, breaks and eyesight are real risks for desk-based work.", ref: "Health and Safety (Display Screen Equipment) Regulations 1992" },
    { id: "k-a1c", type: "multi", q: "Which TWO are employee duties under health and safety law?",
      options: ["Take reasonable care of yourself and others", "Co-operate with your employer on safety", "Write and sign off the company's own risk assessments", "Buy the first-aid kits for the office out of their own pay"],
      correct: [0, 1], why: "Office staff have the same legal duties as anyone else.", ref: "HSWA 1974, s7" }
  ],
  2: [
    { id: "k-a2a", type: "single", q: "Under the Working Time Regulations, how much daily rest is an adult worker entitled to?",
      options: ["11 hours in a row", "6 hours in a row", "8 hours in a row", "No set amount in law"],
      correct: [0], why: "Regular late-night work messages can eat into rest. It's worth agreeing what's genuinely urgent.", ref: "Working Time Regulations 1998, reg 10" },
    { id: "k-a2b", type: "single", q: "A colleague has seemed withdrawn for weeks. What's a good first step?",
      options: ["Ask privately how they are, and listen", "Tell your manager that she seems to be underperforming", "Leave it alone, because it's probably something personal", "Ask the rest of the team what they think is going on"],
      correct: [0], why: "A private, kind question is the most useful thing a colleague can do. What happens next is their choice.", ref: "HSE Management Standards" },
    { id: "k-a2c", type: "multi", q: "Under the Regulatory Reform (Fire Safety) Order 2005, which TWO must the responsible person make sure of?",
      options: ["A fire risk assessment is carried out", "Escape routes and fire exits are kept clear", "Fire drills happen only after a real fire", "Fire doors are propped open on busy days"],
      correct: [0, 1], why: "Admin and reception teams often run visitor logs and fire registers, so this is part of the job.", ref: "Regulatory Reform (Fire Safety) Order 2005" }
  ],
  3: [
    { id: "k-a3a", type: "single", q: "Personal data is sent to the wrong person. If the breach is likely to risk people's rights, when must the organisation tell the ICO?",
      options: ["Within 72 hours", "Within 7 days", "Within 30 days", "Only if someone complains"],
      correct: [0], why: "The clock starts when the organisation knows. That's why telling your manager in the first hour matters.", ref: "UK GDPR, Article 33" },
    { id: "k-a3b", type: "single", q: "A manager asks you what a colleague is paid. You process payroll. What's right?",
      options: ["Don't share it. Other people's pay is confidential", "Share it, because he's a manager and has a right to know", "Share it, as long as he promises to keep it to himself", "Give a rough figure, so you're not sharing the exact amount"],
      correct: [0], why: "People can discuss their own pay, but someone with access to payroll mustn't disclose others'.", ref: "UK GDPR, Article 5; Equality Act 2010, s77" },
    { id: "k-a3c", type: "multi", q: "Which TWO are principles of UK GDPR?",
      options: ["Personal data must be kept secure", "Personal data must be accurate and kept up to date", "Data can be kept forever, just in case", "Anyone in the company can see any file"],
      correct: [0, 1], why: "Security, accuracy and only keeping what you need are core principles.", ref: "UK GDPR, Article 5" }
  ]
};

const BACK = {
  1: [
    { id: "k-b1a", type: "single", q: "An email asks you to change a supplier's bank details. What's the recommended check?",
      options: ["Phone them on a number you already hold", "Reply to the email and ask them to confirm the change", "Check that the email has their usual logo and signature", "Ask them to send the request again from the same address"],
      correct: [0], why: "Hacked email accounts are the usual route for payment diversion fraud, so any check by email checks nothing.", ref: "UK Finance Take Five; NCSC guidance" },
    { id: "k-b1b", type: "single", q: "Overtime was missed because it came in after the payroll cut-off. What happens to it?",
      options: ["It's still owed, and should be paid as soon as practical", "It's lost, because the hours were sent in after the payroll cut-off", "It's carried forward and paid at the end of the tax year", "It can only be recovered by making a tribunal claim"],
      correct: [0], why: "A missed cut-off is an internal deadline. It doesn't cancel what people have earned.", ref: "Employment Rights Act 1996, Part II" },
    { id: "k-b1c", type: "multi", q: "Which TWO records must employers keep?",
      options: ["Payroll (PAYE) records", "Records showing workers have been paid at least the National Minimum Wage", "Employees' social media passwords", "Copies of employees' personal bank statements"],
      correct: [0, 1], why: "Payroll and minimum wage records must be kept, and can be inspected.", ref: "PAYE Regulations; National Minimum Wage Regulations 2015" }
  ],
  2: [
    { id: "k-b2a", type: "single", q: "An employee with 18 months' service is dismissed on 15 January 2027 with no fair process. Can they claim ordinary unfair dismissal?",
      options: ["Yes. The qualifying period is now six months", "No. They still need two years' continuous service to claim", "No. Ordinary unfair dismissal needs five years' service", "Only if they are a member of a recognised trade union"],
      correct: [0], why: "The Employment Rights Act 2025 cuts the qualifying period and removes the compensation cap.", ref: "Employment Rights Act 2025; ERA 1996, s108" },
    { id: "k-b2b", type: "single", q: "Some claims need no length of service at all. Which?",
      options: ["Discrimination, whistleblowing, and raising safety concerns", "Being moved to a different desk or team without being asked", "Any claim at all, provided the employee is unhappy about it", "None. Every claim needs a minimum qualifying period of service"],
      correct: [0], why: "This is why 'he hasn't been here long' is never a reason to skip a fair process.", ref: "Equality Act 2010; ERA 1996, ss100, 103A and 108(3)" },
    { id: "k-b2c", type: "multi", q: "Which TWO does a fair dismissal for conduct or capability generally need?",
      options: ["A potentially fair reason", "A fair procedure, following the Acas Code", "A manager's verbal instruction", "A payment in lieu of notice"],
      correct: [0, 1], why: "A fair reason and a fair process. Money doesn't make an unfair dismissal fair.", ref: "ERA 1996, s98; Acas Code" }
  ],
  3: [
    { id: "k-b3a", type: "single", q: "You find twelve people were underpaid last month. What does the law expect?",
      options: ["Pay the arrears promptly and explain what happened", "Nothing, unless one of the twelve people complains about it", "Correct it at the end of the tax year with other adjustments", "Only correct it if the shortfall is more than £100 each"],
      correct: [0], why: "Underpaying can be an unlawful deduction, and if anyone falls below the minimum wage it is enforced by the state. Prompt, honest correction protects everyone.", ref: "ERA 1996, Part II; National Minimum Wage Act 1998" },
    { id: "k-b3b", type: "single", q: "You think you've just paid a fraudster. What should you do first?",
      options: ["Contact your bank immediately", "Wait to see whether the real supplier complains", "Delete the email so it can't cause any more problems", "Pay the real supplier again and say nothing about it"],
      correct: [0], why: "Speed is everything. Banks can sometimes freeze funds if told within hours. Then tell your manager and report it.", ref: "UK Finance guidance on payment diversion fraud" },
    { id: "k-b3c", type: "multi", q: "Which TWO are good controls on supplier payments?",
      options: ["Separate who sets up suppliers from who approves payments", "Check for duplicate invoices before each run", "Let anyone in the team approve a payment if it's urgent", "Change bank details whenever a supplier asks by email"],
      correct: [0, 1], why: "Segregation of duties and duplicate checks stop most expensive mistakes and frauds.", ref: "Financial control good practice" }
  ]
};

const DIRECTORS = {
  1: [
    { id: "k-r1a", type: "single", q: "Under section 37 of the Health and Safety at Work Act, when can a director be personally prosecuted for a company's safety offence?",
      options: ["With their consent, connivance or neglect", "Only if they were personally on site at the time", "Never, because only the company itself can be liable", "Only if they hold shares in the company concerned"],
      correct: [0], why: "Directors can't delegate away responsibility for safety. Courts can fine and imprison individuals.", ref: "HSWA 1974, s37" },
    { id: "k-r1b", type: "single", q: "Which is a director's statutory duty under the Companies Act 2006?",
      options: ["Promote the company's success, considering employees and others", "Maximise this year's profit, whatever it costs in the long run", "Follow the instructions of whoever is the largest shareholder", "Make every significant decision in the business personally"],
      correct: [0], why: "Section 172 expects long-term thinking, including how you treat your people.", ref: "Companies Act 2006, s172" },
    { id: "k-r1c", type: "multi", q: "HSE and IoD guidance on leading health and safety says boards should do which TWO?",
      options: ["Give one board member responsibility for safety", "Review safety performance regularly", "Leave health and safety to the safety adviser to manage", "Discuss safety at board level only after an accident"],
      correct: [0, 1], why: "Safety is led from the top. Boards should see the numbers, near misses included.", ref: "HSE/IoD INDG417" }
  ],
  2: [
    { id: "k-r2a", type: "single", q: "When a company is, or is likely to become, insolvent, what must directors do?",
      options: ["Act to minimise creditors' losses, and take advice early", "Keep trading as normal and hope that things pick up again", "Make sure the directors are paid first, before anyone else", "Stop paying HMRC, so there's more cash for everything else"],
      correct: [0], why: "Directors can be made personally liable for wrongful trading. Early advice keeps options open.", ref: "Insolvency Act 1986, s214" },
    { id: "k-r2b", type: "single", q: "Materials fell where someone had just been standing. Nobody was hurt. What should happen?",
      options: ["Record and investigate it, and fix the cause", "Find out who was to blame and start disciplinary action", "Nothing formal, because nobody was actually hurt this time", "Report it to the police so there's an official record"],
      correct: [0], why: "Investigate without blame, and check whether it counts as a RIDDOR dangerous occurrence. That's how the next accident is prevented.", ref: "HSE guidance HSG245; RIDDOR 2013" },
    { id: "k-r2c", type: "multi", q: "Payroll is due and cash is short. Which TWO are sensible steps?",
      options: ["Talk to your bank and accountant early", "Contact HMRC before the deadline about Time to Pay", "Delay wages without telling staff, and hope cash comes in", "Use the tax deducted from staff wages to pay your suppliers"],
      correct: [0, 1], why: "Acting early keeps options open. Paying wages late can be an unlawful deduction.", ref: "HMRC Time to Pay; ERA 1996, Part II" }
  ],
  3: [
    { id: "k-r3a", type: "single", q: "You propose 20 to 99 redundancies at one establishment within 90 days. How long before the first dismissal must collective consultation start?",
      options: ["At least 30 days", "At least 7 days", "At least 14 days", "At least 90 days"],
      correct: [0], why: "It's 45 days for 100 or more. Failing to consult can cost up to 180 days' pay per person.", ref: "TULRCA 1992, s188" },
    { id: "k-r3b", type: "single", q: "How should people be selected for redundancy?",
      options: ["Fair, objective criteria, applied consistently", "Whoever the directors and managers like least", "Last in, first out, whatever else applies", "Most sickness absence, including disability-related absence"],
      correct: [0], why: "Unfair or discriminatory selection makes a dismissal unfair, and discrimination claims are uncapped.", ref: "ERA 1996, s98; Equality Act 2010" },
    { id: "k-r3c", type: "multi", q: "For dismissals from 1 January 2027, which TWO changes does the Employment Rights Act 2025 bring in for most employees?",
      options: ["Unfair dismissal claims after six months' service", "No cap on the unfair dismissal compensatory award", "Statutory redundancy pay is abolished for all employees", "Employers no longer need a fair reason to dismiss someone"],
      correct: [0, 1], why: "Fair reasons and fair processes now matter for almost everyone, and mistakes cost more.", ref: "Employment Rights Act 2025" }
  ]
};

export const CHECKS = { operatives: OPERATIVES, team: TEAM, ops: OPS, office: OFFICE, back: BACK, directors: DIRECTORS };

// Scores one answer. picks is an array of option indexes.
export function checkRight(q, picks) {
  const a = [...(picks || [])].sort((x, y) => x - y), c = [...q.correct].sort((x, y) => x - y);
  return a.length === c.length && a.every((v, i) => v === c[i]);
}

// Knowledge score for one person's progress on one track.
export function checkScore(trackId, prog) {
  const bank = CHECKS[trackId]; if (!bank) return null;
  let got = 0, max = 0;
  for (const n of Object.keys(bank)) {
    const ans = prog && prog.days && prog.days[n] && prog.days[n].check;
    if (!ans) continue;
    for (const q of bank[n]) { max++; if (checkRight(q, ans[q.id])) got++; }
  }
  return max ? { got, max, pct: Math.round((got / max) * 100) } : null;
}
