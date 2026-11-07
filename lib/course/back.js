// True Plumb Execution Sprint · Back Office track (finance, payroll, HR, procurement)
const BACK = {
  track: "Back Office",
  days: [
  {
    n: 1,
    title: "Hold the Line",
    tool: "The 90-Second Reset",
    minutes: 15,
    lesson: [
      { h: "You're the last check", p: "Finance, payroll, HR and procurement exist to stop the business making expensive mistakes. That means some of your most important work is saying 'not like that' to people more senior than you." },
      { h: "The 90-Second Reset", p: "When the answer is no or not yet: Acknowledge what they're trying to do. Anchor on the rule or deadline, as a plain fact rather than your opinion. Pivot to the fastest legitimate way to get them what they need." },
      { h: "Controls aren't personal", p: "A purchase order, a payroll cut-off or an approval limit protects everyone, including the person asking you to skip it. Explain the risk it prevents, not just the rule." },
      { h: "Find the yes inside the no", p: "'No, not without a PO' leaves them stuck. 'Raise the PO now and I'll pay it this afternoon' gets the work done properly. Always offer the route." }
    ],
    mission: "Next time someone asks you to bend a process, use the 90-Second Reset and offer the fastest proper route. Write down what you said.",
    scenarios: [
      {
        id: "b1s1",
        title: "Just pay it today",
        ctx: {
          office: "A department head asks you to pay a new supplier £6,400 today. There's no purchase order and the supplier isn't set up on the system. 'They won't deliver until they're paid, and the boss wants it.'",
          site: "A contracts manager asks you to pay a new plant hire company £6,400 today so the kit arrives on site tomorrow. There's no purchase order and they're not set up as a supplier. 'The job stops without it.'",
          hybrid: "A department head messages you to pay a new supplier £6,400 today. There's no purchase order and the supplier isn't on the system. 'They won't deliver until they're paid.'",
          mixed: "A site manager rings asking you to pay a new supplier £6,400 today so materials arrive tomorrow. There's no purchase order and the supplier isn't set up. 'The job stops without it.'"
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Explain the fraud risk, and offer to set them up and pay today if the PO and checks are in by two.", fx: [4, 6, 0], why: "You've held the control and given them a route that still gets the delivery. Most people will happily do the paperwork once they know it gets them what they need.", say: "I can't pay a supplier we haven't checked, because that's exactly how invoice fraud happens. If you raise the PO and send me their details by two, I'll set them up and pay it this afternoon." , next: "The manager goes to raise the PO, but copies in a director." },
          { s: "pleaser", pts: 0, t: "Pay it now and sort the paperwork out next week. It's urgent, and the boss apparently wants it done.", fx: [4, 4, -4], why: "You've paid £6,400 to a supplier nobody has checked, on the strength of a phone call. If it's fraudulent, the money's gone, and so is your defence." , next: "You set up the payment, but it needs a second approval before it'll go." },
          { s: "enforcer", pts: 1, t: "Say no. No PO, no payment. They'll have to wait until it goes through the normal process.", fx: [-6, -4, 2], why: "The control holds, but you've given them nothing to work with. They'll go over your head, and next time they'll skip you altogether." , next: "The manager goes straight to a director." },
          { s: "avoider", pts: 1, t: "Tell them you'll need to check with your manager, and leave it with your manager to decide.", fx: [-2, -4, 2], why: "Checking a big or unusual payment is fine, but this one has a clear answer. Passing it up makes your manager the bottleneck and you look unsure of your own rules." , next: "Your manager is out all afternoon, so the manager goes to a director." }
        ],
        step2: {
          q: "Step 2: Ten minutes later, a director emails: 'Just pay it. I'll sign the PO later.'",
          options: [
            { s: "leader", pts: 3, t: "Agree to pay it today, once you've checked their bank details by phone.", fx: [4, 6, 0], why: "The PO can follow with a director's approval, but checking bank details can't be skipped. That's the bit fraudsters rely on.", say: "Thanks, I'll pay it today with your approval. I just need to confirm their bank details with them by phone first, which I'm doing now. Ten minutes." },
            { s: "rescuer", pts: 0, t: "Pay it immediately. A director has approved it, so it's their responsibility now, not yours.", fx: [4, 4, -6], why: "A director's email doesn't verify a bank account. If the details are fake, the money's gone, and 'the director said so' is exactly what fraudsters count on." },
            { s: "enforcer", pts: 1, t: "Reply that process is process and it can't be paid until the PO is fully signed off.", fx: [-6, -4, 2], why: "A director has the authority to approve it. Refusing on the PO alone makes you look rigid, when the real risk is the bank details." },
            { s: "avoider", pts: 1, t: "Don't reply. Wait for the PO to arrive and pay it when it does, whenever that is.", fx: [-6, -6, 2], why: "The director thinks it's being paid. The supplier doesn't deliver. Silence makes it look like you've just ignored them." }
          ]
        },
        echo: {
          0: "Two weeks on, managers have started raising POs before they ring you, because they know you'll pay quickly when the paperwork's right. The 'just pay it' calls have almost stopped.",
          1: "Two weeks on, the same manager has asked you to 'just pay' two more suppliers. Word has got round that you'll do it if someone senior is mentioned.",
          2: "Two weeks on, that manager now goes straight to a director whenever he needs something paid. You only find out afterwards.",
          3: "Two weeks on, people have noticed that urgent payments get stuck with you. Your manager has asked why everything is coming to them."
        },
        insight: "A control without a route through it feels like obstruction. Hold the line on the risk and offer the fastest proper way.",
        coach: "Which of your rules do people most often ask you to bend, and do they know why it exists?"
      },
      {
        id: "b1s2",
        title: "Month end vs the director's report",
        ctx: {
          office: "It's two days before month-end close. A director asks for a detailed cost analysis by tomorrow for a meeting with the bank. Both jobs need the same person: you.",
          site: "It's two days before month-end. The operations director asks for a cost breakdown of three site jobs by tomorrow for a client meeting. Both jobs need you.",
          hybrid: "It's two days before month-end. A director messages asking for a detailed cost analysis by tomorrow for a meeting with the bank. Both jobs need you.",
          mixed: "It's two days before month-end. A director asks for a cost breakdown of three jobs by tomorrow, including site costs you'd have to chase. Both jobs need you."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Explain the clash with month end, and ask whether a lighter version tomorrow would do the job.", fx: [4, 6, 2], why: "You've made the trade-off visible and offered a real option. Often a simpler version is all they needed.", say: "I can do it, but month-end closes on Thursday, so something has to give. Would a one-page summary tomorrow work for the bank, with the full analysis next week?" },
          { s: "rescuer", pts: 1, t: "Do both. Work late tonight and tomorrow to get the analysis done without month end slipping.", fx: [2, 4, -8], why: "You'll probably manage it, but tired people make mistakes in month-end figures. And the director never learns this was a big ask." },
          { s: "avoider", pts: 0, t: "Say yes to the director and let month end slip quietly, hoping nobody notices it's a day or two late.", fx: [-2, -8, 2], why: "Someone will notice, probably your finance manager, and you'll have made the trade-off without telling anyone who could have helped." },
          { s: "enforcer", pts: 1, t: "Tell the director month-end takes priority and the analysis will have to wait until next week.", fx: [-6, 2, 4], why: "Month-end may well matter more, but a bank meeting may matter even more, and that's for the director to judge, not you. Ask, don't tell." }
        ],
        insight: "When two important jobs clash, your job is to show the cost and offer options, not to quietly decide which one fails.",
        coach: "What's the lighter version of the thing you're asked for most?"
      },
      {
        id: "b1s3",
        title: "After the cut-off",
        ctx: {
          office: "Payroll closed at noon. At 3pm, a manager rings: two of his team's overtime hours were missed. 'They can't wait a month. Just add it in.' The payroll file goes to the bank tomorrow morning.",
          site: "Payroll closed at noon. At 3pm, a site supervisor rings: two lads' overtime was missed off the timesheets. 'They won't wait a month. Just add it.' The file goes to the bank tomorrow.",
          hybrid: "Payroll closed at noon. At 3pm, a manager messages: two of his team's overtime hours were missed. 'Just add it in.' The file goes to the bank tomorrow morning.",
          mixed: "Payroll closed at noon. At 3pm, a site manager rings: two operatives' overtime was missed. 'Just add it in.' The file goes to the bank tomorrow morning."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Check whether it can go in safely, and if not, offer a separate payment this week.", fx: [6, 4, -2], why: "Two people's wages matter, and so does getting a payroll file right. Checking first, then offering the fastest safe option, protects both.", say: "Payroll's closed, but let me see if I can add it safely before the file goes. If I can't, I'll do a separate payment on Friday as soon as you email me the approved hours." },
          { s: "enforcer", pts: 0, t: "Tell him the cut-off is the cut-off and the overtime will be in next month's pay, no exceptions.", fx: [-10, 2, 2], why: "The rule is right, but two people will be short on rent for a month because of an admin mistake that wasn't theirs. They'll remember who said no." },
          { s: "pleaser", pts: 1, t: "Add it straight into the file now from what he's told you on the phone, without the timesheets.", fx: [4, 0, -2], why: "They get paid, but you've changed the payroll on a phone call with no record. If the hours are wrong, it's on you." },
          { s: "rescuer", pts: 1, t: "Stay late, re-check the whole payroll yourself and add it in, to be sure nothing else was missed.", fx: [2, 2, -8], why: "Thorough, but it's three hours of your evening because someone else missed a deadline. A separate payment does the same job." }
        ],
        insight: "Cut-offs exist for accuracy. When someone misses one, protect the people affected without making the error worse.",
        coach: "When rules and people's money collide, how do you decide?"
      },
      {
        id: "b1s4",
        title: "Can we just credit them?",
        ctx: {
          office: "A salesperson asks you to issue a 15% credit note to a client who's complained, 'to keep them sweet'. Anything over 10% needs a director's approval. 'He's busy, it's only a few hundred quid.'",
          site: "A contracts manager asks you to knock 15% off a client's final account because they've complained about a delay. Anything over 10% needs a director's approval. 'It's only a few hundred quid.'",
          hybrid: "A salesperson messages asking you to issue a 15% credit to a client who's complained. Anything over 10% needs a director's sign-off. 'He's busy, it's only a few hundred quid.'",
          mixed: "A site manager asks you to reduce a client's invoice by 15% after a complaint about a delay. Over 10% needs a director's approval. 'It's only a few hundred quid.'"
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Offer to send the director a one-line approval request now, so the credit can go out today if he agrees.", fx: [4, 4, 2], why: "You've made getting approval as easy as possible. Usually a busy director answers a one-line request in minutes.", say: "Over 10% needs the director's OK. I'll send him a one-line request now with the reason, and if he agrees, the credit goes out today." },
          { s: "pleaser", pts: 0, t: "Issue the 15% credit. It's a small amount, the salesperson knows the client, and it'll keep everyone happy.", fx: [4, -2, -4], why: "The amount is small. The precedent isn't. You've shown that approval limits can be ignored if someone asks nicely." },
          { s: "enforcer", pts: 1, t: "Tell the salesperson to get the director's approval themselves and come back to you when it's done.", fx: [-4, 0, 2], why: "Correct, but unhelpful. They're likely to just not bother, and the client's complaint sits there." },
          { s: "avoider", pts: 2, t: "Issue a 10% credit, which you can approve yourself, and tell them anything more needs the director.", fx: [2, 2, 2], why: "It's within your authority and gets something to the client today, so it's defensible. It may not settle the complaint, though, and the salesperson may still go round you." }
        ],
        insight: "Approval limits only work if they're used. Make the right route the easy route.",
        coach: "Where do people skip approval because asking feels like too much effort?"
      }
    ]
  },
  {
    n: 2,
    title: "Protect Your Capacity",
    tool: "Drain, Neutral, Fuel",
    minutes: 15,
    lesson: [
      { h: "The one who knows", p: "In many back offices, one person knows how payroll, the bank or the HR system really works. That feels like job security. It's actually a risk for the business and a trap for that person: no holidays, no illness, no promotion." },
      { h: "Drain, Neutral, Fuel", p: "Sort a normal week. Drain: takes energy and could be someone else's. Neutral: has to be done. Fuel: you're good at it and it matters. Move one Drain each month, by teaching, automating or stopping it." },
      { h: "Fixing quietly costs twice", p: "If you silently correct a colleague's errors, you pay for them in time and they never improve. Feedback is kinder than fixing." },
      { h: "HR isn't a shortcut", p: "When managers want someone gone, the pressure lands on HR and payroll to make it quick. A fair process protects the business, the employee and you." }
    ],
    mission: "List three things only you know how to do. Pick one and write it down as simple steps someone else could follow.",
    scenarios: [
      {
        id: "b2s1",
        title: "Only you can run payroll",
        ctx: {
          office: "You're the only person who knows how to run payroll. You haven't had more than three days off in two years. Your manager suggests training a colleague, but 'it'll take longer to teach her than to do it'.",
          site: "You're the only person who knows how to process the site timesheets into payroll. You haven't had a full week off in two years. Your manager suggests training the site administrator.",
          hybrid: "You're the only one who knows how to run payroll. You've logged on from holiday twice this year. Your manager suggests training a colleague.",
          mixed: "You're the only one who knows how site timesheets turn into payroll. You haven't had a full week off in two years. Your manager suggests training a colleague."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Agree, and plan the handover over the next three payroll runs, with you checking.", fx: [4, 4, 6], why: "Three cycles and you have cover, and a proper holiday. It costs some time now and removes a real risk to the business.", say: "Let's do it over the next three payrolls. You watch this one, we do the next together, and you run the third with me checking." },
          { s: "rescuer", pts: 0, t: "Say it's fine, you'll keep doing it. It's quicker, and it means it's always done right.", fx: [0, 2, -10], why: "Quicker this month, but you've made yourself a single point of failure. The day you're ill, people don't get paid." },
          { s: "avoider", pts: 1, t: "Agree to it, then keep putting off the training because there's always something more urgent.", fx: [-2, 0, -4], why: "There will always be something more urgent. Without dates in the diary, this never happens." },
          { s: "pleaser", pts: 1, t: "Write a 30-page manual and send it to her, so she can learn it in her own time.", fx: [2, 0, -4], why: "Well meant, but nobody learns payroll from a manual alone. She'll still ring you on your holiday." }
        ],
        insight: "Being the only one who knows feels safe. It's actually the thing that keeps you stuck.",
        coach: "What would happen if you were off sick for two weeks starting tomorrow?"
      },
      {
        id: "b2s2",
        title: "Fixing his invoices again",
        ctx: {
          office: "For three months, a colleague's purchase invoices have had coding errors. You've been quietly correcting them before month-end, which takes you two or three hours.",
          site: "For three months, a site administrator's delivery notes have had wrong job codes. You've been quietly correcting them before invoicing, which takes you two or three hours.",
          hybrid: "For three months, a colleague's invoices have had coding errors. You've been quietly fixing them before month-end, which takes two or three hours.",
          mixed: "For three months, the site's purchase invoices have had wrong job codes. You've been quietly correcting them, which takes two or three hours."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Show him three examples privately, and go through the right codes with him.", fx: [6, 4, 4], why: "Specific, private and helpful. He probably has no idea, because you've been hiding the problem from him.", say: "I've noticed a few coding errors on your invoices. Here are three examples. Can we go through the right codes? I'll look over your next batch with you." },
          { s: "rescuer", pts: 1, t: "Keep fixing them. It's quicker than having an awkward conversation, and he's a nice guy.", fx: [2, 2, -8], why: "Three hours a month is a week a year. He doesn't know there's a problem, so it will never get better." },
          { s: "avoider", pts: 0, t: "Stop fixing them without saying anything, and let the errors show up at month-end so he learns.", fx: [-6, -8, 2], why: "He'll find out in the worst way, in front of the finance manager, with no idea it's been happening for months. That's not a lesson; that's an ambush." },
          { s: "enforcer", pts: 1, t: "Raise it with your manager as a performance issue and let them speak to him.", fx: [-6, 2, 2], why: "He's never been told. Going straight to a manager makes it formal before he's had a chance to fix it." }
        ],
        insight: "Fixing someone's mistakes quietly isn't kindness. It takes away their chance to get better.",
        coach: "Whose mistakes are you quietly fixing right now?"
      },
      {
        id: "b2s3",
        title: "The 10pm email",
        ctx: {
          office: "The finance director often emails at 10pm asking for figures. You've been replying within the hour, and now he seems to expect it.",
          site: "The operations director often emails at 10pm asking for job costs. You've been replying within the hour, and now he seems to expect it.",
          hybrid: "The finance director often sends Teams messages at 10pm asking for figures. You've been replying within the hour, and now he seems to expect it.",
          mixed: "A director often emails at 10pm asking for job costs. You've been replying within the hour, and now he seems to expect it."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Ask him whether he needs replies that night, and agree together what counts as urgent.", fx: [4, 2, 8], why: "He may not even expect a reply; you may have taught him to. A short, honest conversation usually fixes it for good.", say: "I've been answering your evening emails straight away. Do you actually need them that night? If not, I'll reply first thing, unless you mark it urgent." },
          { s: "pleaser", pts: 0, t: "Keep replying in the evening. He's a director, and it shows you're committed to the job.", fx: [4, 2, -10], why: "It shows him your evenings are his. It will spread to weekends, and you'll burn out without anyone asking you to." },
          { s: "avoider", pts: 1, t: "Stop replying in the evenings without saying anything and see if he notices or complains.", fx: [-4, 0, 4], why: "He might be fine, or he might think you're ignoring something urgent. A one-minute conversation removes the guessing." },
          { s: "enforcer", pts: 1, t: "Turn off notifications and set an auto-reply saying you don't check email outside working hours.", fx: [-2, 0, 6], why: "Reasonable, but announced by auto-reply it can feel like a statement aimed at him. Agree it first, then the auto-reply is just a reminder." }
        ],
        insight: "People often expect what you've taught them to expect. A short, honest conversation resets it.",
        coach: "Which of your habits have quietly become other people's expectations?"
      },
      {
        id: "b2s4",
        title: "Just get rid of him",
        ctx: {
          office: "A department manager asks HR to 'get rid of' a team member who's been there 18 months. 'He's useless, just give him notice, we'll pay him off.' There's no record of any performance conversation.",
          site: "A site manager asks HR to 'get rid of' an operative who's been there 18 months. 'He's bone idle, give him his notice.' There's no record of any performance conversation.",
          hybrid: "A manager messages HR to 'get rid of' a team member who's been there 18 months. 'Just give him notice.' There's no record of any performance conversation.",
          mixed: "A site manager rings HR to 'get rid of' an operative with 18 months' service. 'He's useless, give him his notice.' There's no record of any conversation about it."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Explain the risk of a claim, and offer to help the manager start a fair process this week.", fx: [4, 6, 0], why: "You're not blocking the manager; you're protecting the business from a claim and giving the employee a fair chance. Offering to help makes it more likely to happen properly.", say: "He's got 18 months' service and there's nothing on record. From January the qualifying period for unfair dismissal drops to six months, and some claims need no service at all, so this is a real tribunal risk. Let's start a fair process this week. I'll help you plan the first conversation." , next: "The manager agrees, reluctantly." },
          { s: "pleaser", pts: 1, t: "Do what the manager asks: draft the notice letter and work out a payment so it's over quickly.", fx: [2, 2, -4], why: "It's quick for the manager, but you've helped dismiss someone with no process. If he challenges it, HR will be asked why it allowed this." , next: "As you draft the letter, your own manager asks you to slow down and do it properly." },
          { s: "enforcer", pts: 0, t: "Tell the manager it's not happening, quote the employment law, and refuse to discuss it further.", fx: [-8, -2, 2], why: "You're right on the law and wrong on the approach. The manager still has a problem and no help with it. They'll probably try to handle it themselves, badly." , next: "The manager complains to the MD, who asks you both to find a way forward." },
          { s: "avoider", pts: 1, t: "Say you'll look into it and leave it with the manager, hoping they calm down and drop it.", fx: [-4, -4, 2], why: "They won't drop it. They'll come back angrier, or they'll act without you." , next: "Two days later, the manager comes back." }
        ],
        step2: {
          q: "Step 2: The manager says, 'Fine, we'll do a process. But I want it done in two weeks.'",
          options: [
            { s: "leader", pts: 3, t: "Agree a fair plan: a first meeting this week, clear targets, and a realistic review date.", fx: [4, 4, 2], why: "A fair process has a pace. Agreeing it up front gives the manager certainty and the employee a genuine chance.", say: "Let's meet him this week, set two or three clear targets, and review it in four weeks. If nothing's changed by then, we'll have a fair basis to take it further." },
            { s: "pleaser", pts: 1, t: "Agree to two weeks. It keeps the manager happy, and you can make the paperwork fit the timescale.", fx: [2, 0, -2], why: "A process designed to reach a set answer in two weeks isn't fair, and it will look that way if it's challenged." },
            { s: "enforcer", pts: 1, t: "Tell the manager the timescale isn't up to them, and HR will decide how long the process takes.", fx: [-6, 0, 2], why: "You've turned a manager who's just agreed to do it properly into an opponent again." },
            { s: "avoider", pts: 0, t: "Say nothing about the timescale and let the process drift, so it takes as long as it takes.", fx: [-4, -6, 0], why: "Drift is unfair to everyone. The employee is left wondering, and the manager will go round you when two weeks pass." }
          ]
        },
        insight: "HR's job isn't to say no to managers. It's to help them get to the right outcome in a way that stands up.",
        coach: "When managers come to you wanting a quick fix, what do you offer them instead?"
      }
    ]
  },
  {
    n: 3,
    title: "Make the Call",
    tool: "One-Way and Two-Way Doors",
    minutes: 15,
    lesson: [
      { h: "Your decisions move money and lives", p: "In the back office, many decisions are one-way doors: money paid out, a payslip wrong, a personal file shared. Others, like choosing a report format, are not. Treat them differently." },
      { h: "One-Way and Two-Way Doors", p: "Two-way door: reversible and low-cost, so decide quickly and move on. One-way door: hard to reverse, so slow down, verify, and involve the right person." },
      { h: "Fraud loves a rush", p: "Almost every payment fraud relies on urgency and a change of bank details. When both appear together, stop and verify by phone using details you already hold." },
      { h: "Own errors fast", p: "If you find a mistake, the speed and honesty of your response matter more than the mistake itself." }
    ],
    mission: "Look at your checks for changes to supplier or employee bank details. Write down one gap and tell your manager.",
    scenarios: [
      {
        id: "b3s1",
        title: "Twelve people underpaid",
        ctx: {
          office: "Reconciling payroll, you find that last month's pay rise wasn't applied to 12 people. They've each been underpaid around £85. Nobody has noticed yet, and next payroll is in two weeks.",
          site: "Reconciling site wages, you find a new pay rate wasn't applied to 12 operatives last month. They're each down around £85. Nobody has noticed yet, and next payroll is in two weeks.",
          hybrid: "Reconciling payroll from home, you find last month's pay rise wasn't applied to 12 people. They've each been underpaid around £85. Nobody has noticed yet.",
          mixed: "Reconciling payroll, you find 12 operatives didn't get last month's new rate. They're each down around £85. Nobody has noticed yet."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Tell your manager today, and propose paying the difference this week with a note to each.", fx: [8, 4, -2], why: "Being underpaid when nobody tells you is what destroys trust. Fixing it quickly, and saying so, is what builds it.", say: "I've found that last month's pay rise wasn't applied to 12 people, about £85 each. I'd like to pay the difference on Friday and send each of them a short note. Can I go ahead?" },
          { s: "avoider", pts: 0, t: "Correct it quietly in next month's payroll without saying anything, so nobody makes a fuss.", fx: [-8, 2, 2], why: "Some of them will notice the extra and wonder. Some will have noticed the shortfall and think nobody cared. Either way, quietly fixing it looks like hiding it." },
          { s: "rescuer", pts: 1, t: "Pay them all yourself today through a manual payment run before anyone finds out.", fx: [2, 2, -4], why: "Fast, but you've made a significant unplanned payment without approval and without telling anyone why. Your manager will hear it from the bank first." },
          { s: "pleaser", pts: 1, t: "Email all 12 straight away to apologise and promise they'll be paid back as soon as possible.", fx: [4, -2, -2], why: "Honest, but you've promised something before checking with your manager or knowing when you can pay it." }
        ],
        insight: "When people have been underpaid, speed and honesty matter more than tidiness.",
        coach: "What would you want to be told if you'd been underpaid?"
      },
      {
        id: "b3s2",
        title: "New bank details",
        ctx: {
          office: "An email arrives from a regular supplier's accounts address: they've changed bank, and could you update their details before Friday's payment run? It's £23,000. The email looks genuine.",
          site: "An email arrives from your main scaffolding fittings supplier: they've changed bank, please update their details before Friday's payment. It's £23,000. The email looks genuine.",
          hybrid: "An email arrives from a regular supplier: they've changed bank and need their details updated before Friday's £23,000 payment. It looks genuine.",
          mixed: "An email arrives from a regular materials supplier asking you to update their bank details before Friday's £23,000 payment. It looks genuine."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Ring the supplier on the number you already have on file, and only change it if they confirm.", fx: [4, 6, 0], why: "This is the most common business fraud there is, and the most expensive one-way door in your job. A two-minute call using a number you trust stops it.", say: "Hi, it's accounts at True Plumb. We've had an email asking us to change your bank details. Can you confirm that came from you?" },
          { s: "pleaser", pts: 0, t: "Update the details. It's from their usual email address, and you don't want to hold up their payment.", fx: [2, -10, -6], why: "Fraudsters use real, hacked email accounts. If this is one, £23,000 goes to them, and it's very unlikely you'll get it back." },
          { s: "enforcer", pts: 1, t: "Reply to the email asking them to confirm the change in writing on headed paper before you'll do it.", fx: [-2, 0, 2], why: "If the email account has been hacked, the fraudster will happily send you a letter. Replying to the same email checks nothing." },
          { s: "avoider", pts: 1, t: "Leave the old details in place and pay as normal on Friday, saying nothing about the email.", fx: [-2, 2, 2], why: "You've avoided the fraud by accident, but if the change is real, the payment bounces and the supplier's angry. And nobody knows there may be an attack under way." }
        ],
        insight: "Urgency plus new bank details means stop and verify by phone, using a number you already hold.",
        coach: "What's your process for checking a change of bank details, and does everyone follow it?"
      },
      {
        id: "b3s3",
        title: "Which expenses system?",
        ctx: {
          office: "You've been asked to choose between two expenses apps for the company. Both do the job; one is slightly cheaper, the other is easier to use. You've been comparing them for three weeks.",
          site: "You've been asked to choose between two apps for site teams to submit receipts and mileage. Both do the job. You've been comparing them for three weeks.",
          hybrid: "You've been asked to choose between two expenses apps. Both do the job. You've been comparing them for three weeks, and people keep asking when it's coming.",
          mixed: "You've been asked to choose an expenses app that works for both office and site teams. Both options do the job. You've been comparing them for three weeks."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Pick one this week on a monthly contract, and review it with the users after a month.", fx: [4, 8, 4], why: "This is a two-way door: either app works and you can switch if it doesn't. Three weeks of comparison is costing more than the difference between them.", say: "Both apps would work. I'm going with the easier one on a monthly contract, and we'll review it with users after a month." },
          { s: "avoider", pts: 1, t: "Keep comparing until you're certain which one is better. It's an important decision for the business.", fx: [-2, -6, -2], why: "You'll never be certain, and both would work. Meanwhile, people are still doing paper expenses." },
          { s: "enforcer", pts: 0, t: "Choose the cheaper one and send out a rule that everyone must use it from Monday, with no exceptions.", fx: [-8, 2, 2], why: "Cheaper isn't the only thing that matters if people won't use it. A hard mandate with no trial means the problems come out after you've committed." },
          { s: "pleaser", pts: 1, t: "Send a survey to all staff asking which one they'd prefer, and go with the majority.", fx: [4, -4, 0], why: "Asking users is good, but a vote on two apps most people haven't tried adds weeks and doesn't tell you much." }
        ],
        insight: "Reversible decisions should be made quickly. Save your caution for the ones you can't undo.",
        coach: "What two-way decision have you been treating like a one-way door?"
      },
      {
        id: "b3s4",
        title: "Paid twice",
        ctx: {
          office: "You discover that a supplier invoice for £8,200 was paid twice last week, once from the scanned copy and once from the posted copy. It was your payment run.",
          site: "You discover a plant hire invoice for £8,200 was paid twice last week, once from the site copy and once from the posted one. It was your payment run.",
          hybrid: "You discover that an £8,200 supplier invoice was paid twice last week. It was your payment run.",
          mixed: "You discover that an £8,200 invoice, sent by both the site and the supplier, was paid twice last week. It was your payment run."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Tell your manager today, ask the supplier for a refund, and suggest a duplicate check.", fx: [6, 6, -2], why: "Owning it, fixing it and preventing it. That's what makes a finance manager trust your payment runs.", say: "I've found a mistake: the Hargreaves invoice for £8,200 was paid twice in last week's run. I've asked them for a refund, and I'd like to add a duplicate check to the run. Sorry about this." , next: "The supplier says they'll look into it." },
          { s: "rescuer", pts: 0, t: "Quietly ask the supplier to refund it and fix it before your manager notices it ever happened.", fx: [-4, 2, -4], why: "It may come back, but if it doesn't, your manager finds out from a reconciliation weeks later, and the question becomes why you didn't say." , next: "You email the supplier asking for the money back." },
          { s: "avoider", pts: 1, t: "Leave it as a credit on the supplier's account to come off the next invoice, and say nothing.", fx: [-4, 0, 2], why: "It may well come back that way, but £8,200 is sitting with a supplier with nobody aware of it. If they go bust, it's gone." , next: "Your manager spots it at month end and asks you to chase it." },
          { s: "pleaser", pts: 1, t: "Tell your manager, but play it down as a system glitch rather than your mistake.", fx: [-4, 2, 0], why: "If the system is to blame, it'll happen again and nothing gets fixed. And if they find out it wasn't the system, your credibility takes the hit." , next: "Your manager asks you to get the money back." }
        ],
        step2: {
          q: "Step 2: The supplier says they'll 'look into it' and stops replying. It's been ten days.",
          options: [
            { s: "leader", pts: 3, t: "Update your manager, ring the supplier's accounts lead directly, and agree a refund date in writing.", fx: [4, 6, 0], why: "Polite persistence, the right person and a date. And your manager isn't surprised.", say: "I'm chasing the £8,200 duplicate payment from last month. Can we agree a date for the refund? I'll confirm it in an email." },
            { s: "rescuer", pts: 0, t: "Hold back their next invoice payment until the money comes back, without telling them or your manager.", fx: [-6, -2, -2], why: "Withholding payment without agreement can damage a supplier relationship the business depends on, and it's not your call alone." },
            { s: "avoider", pts: 1, t: "Leave it. They'll probably take it off the next invoice anyway, and chasing again might annoy them.", fx: [-2, -4, 2], why: "'Probably' isn't good enough for £8,200. Your manager still thinks it's being sorted." },
            { s: "enforcer", pts: 2, t: "Send a formal letter requesting repayment within 14 days, copying in your finance manager.", fx: [-2, 4, 2], why: "Formal and clear, so it's defensible, and your manager's in the loop. A phone call first is often quicker and keeps the relationship warmer." }
          ]
        },
        insight: "Owning a mistake in money matters more, not less. The speed of your honesty is what people remember.",
        coach: "What check would have caught your last mistake?"
      }
    ]
  }
  ]
};
export default BACK;
