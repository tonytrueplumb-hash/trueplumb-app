// True Plumb Execution Sprint · Office & Admin track
const ADMIN = {
  track: "Office & Admin",
  days: [
  {
    n: 1,
    title: "Own the Queue",
    tool: "The 90-Second Reset",
    minutes: 15,
    lesson: [
      { h: "Everyone's urgent", p: "Admin roles sit where every request lands. Managers, site teams, clients and suppliers all think theirs comes first. If you answer every request in the order it arrives, the loudest person sets your priorities." },
      { h: "The 90-Second Reset", p: "When you can't do it all: Acknowledge what they need. Anchor on what you're already committed to, as a plain fact. Pivot to options and, if two people outrank you, let them decide between themselves which comes first." },
      { h: "Process protects you", p: "A clear process (how jobs reach you, by when, in what form) isn't red tape. It's what lets you say 'not like this' without it becoming personal." },
      { h: "Helpful isn't the same as available", p: "Being the person who always says yes feels good for a month. Then your own work slips, and the people who rely on it stop trusting you." }
    ],
    mission: "Use the 90-Second Reset once this week on a request you'd normally just squeeze in. Write down the options you'll offer.",
    scenarios: [
      {
        id: "a1s1",
        title: "Two bosses, one afternoon",
        ctx: {
          office: "At 2pm, the finance director asks for a board pack to be formatted and printed by 4pm. Ten minutes later, the operations manager asks you to rebook a client meeting and sort travel for six people, also by 4pm. You can do one properly.",
          site: "In the site office at 2pm, the contracts manager asks for the client's weekly report to be compiled by 4pm. Ten minutes later, the site manager asks you to sort a lorry delivery and six inductions for tomorrow, also by 4pm. You can do one properly.",
          hybrid: "Working from home, you get a Teams message at 2pm from the finance director wanting a board pack formatted by 4pm. Ten minutes later, the operations manager emails asking you to rebook a client meeting and travel for six, also by 4pm. You can do one properly.",
          mixed: "At 2pm, the finance director emails for a board pack by 4pm. Ten minutes later, a site manager rings asking you to sort a delivery and six site inductions for tomorrow, also by 4pm. You can do one properly."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Tell both what's landed and that you can do one well by four, then ask them to agree which.", fx: [4, 6, 2], why: "You've stated the facts and handed the priority call to the people who own it. Whatever they decide, nobody gets a surprise at 4pm.", say: "I've had two jobs land for 4pm and I can do one of them well. Can you two agree which comes first? I'll start on it the moment you tell me." , next: "You message both of them at 2:10 and wait for an answer." },
          { s: "pleaser", pts: 0, t: "Say yes to both and work through your break to try and get them both done, even if it's a rush.", fx: [2, -6, -6], why: "Both bosses think it's fine, so neither changes their plans. At four you have two half-finished jobs and nobody was warned." , next: "By 2:40 you've started both jobs and finished neither." },
          { s: "enforcer", pts: 2, t: "Do whichever request came in first, and tell the second person it'll have to wait until tomorrow morning.", fx: [-2, 2, 2], why: "First come, first served is fair and defensible. But it ignores which job actually matters more to the business, and the second person may not be able to wait." , next: "You start the board pack and message the operations manager about the travel." },
          { s: "rescuer", pts: 1, t: "Do the board pack yourself and quietly ask a colleague to pick up the travel, without telling either manager.", fx: [0, 2, -4], why: "It might work, but you've added to someone else's day without asking, and neither manager knows there was a clash. Next time, they'll do it again." , next: "Your colleague says she's swamped and can't take the travel after all." }
        ],
        step2: {
          q: "Step 2: Neither manager replies. It's now 2:40 and both jobs are still due at four.",
          options: [
            { s: "leader", pts: 3, t: "Ring both, say you'll start the board pack unless they object in ten minutes.", fx: [4, 6, 0], why: "Silence isn't a decision. Naming a default with a deadline gets an answer or gives you permission, and you're no longer just waiting.", say: "I haven't heard back, so unless either of you objects in the next ten minutes, I'm doing the board pack first. The travel will be done by ten tomorrow." },
            { s: "avoider", pts: 0, t: "Wait for them to reply. It's their call, and you don't want to be blamed for choosing the wrong job.", fx: [-4, -8, 0], why: "Every minute you wait comes out of the job you'll end up doing. At four, you'll have neither, and you'll be blamed anyway." },
            { s: "pleaser", pts: 1, t: "Start doing both at once, switching back and forth, so neither manager can say you ignored them.", fx: [2, -6, -4], why: "Switching between jobs is the slowest way to do two jobs. You're protecting yourself from blame at the cost of the work." },
            { s: "enforcer", pts: 1, t: "Email them both saying that unless you hear back, neither job is guaranteed, and copy in their manager.", fx: [-6, 0, 2], why: "It protects you on paper, but copying in their boss turns a scheduling clash into a complaint. It will be remembered." }
          ]
        },
        echo: {
          0: "Two weeks on, both managers now check with each other before sending you a 4pm deadline. One of them thanked you for flagging the clash instead of just struggling through it.",
          1: "Two weeks on, it's happened twice more. Both managers assume you'll somehow manage, because last time you did, at the cost of your break and a rushed board pack.",
          2: "Two weeks on, the person who came second still mentions that their travel was a day late. The rule was fair, but they wish someone had asked them.",
          3: "Two weeks on, your colleague has started saying no when you ask for help. They didn't mind the work; they minded not being asked."
        },
        insight: "When two people who outrank you both want something first, the decision isn't yours to make alone, and it isn't yours to absorb. Make the clash visible and let them choose.",
        coach: "Who sends you clashing deadlines most often, and do they know they clash?"
      },
      {
        id: "a1s2",
        title: "Just a quick extra job",
        ctx: {
          office: "Your manager asks you to take on the new supplier onboarding process 'as it's only a few forms'. You're already behind on invoicing and holiday cover. It's actually several hours a week.",
          site: "The site manager asks you to take on all the new starters' paperwork and CSCS card checks 'as it's only a few forms'. You're already behind on timesheets and deliveries. It's actually several hours a week.",
          hybrid: "On a video call, your manager asks you to take on the new supplier onboarding 'as it's only a few forms'. You're already behind on invoicing. It's actually several hours a week.",
          mixed: "Your manager asks you to take on all the new starters' site paperwork 'as it's only a few forms'. You're already behind on invoicing and site orders. It's actually several hours a week."
        },
        q: "What do you say?",
        options: [
          { s: "leader", pts: 3, t: "Say yes in principle, show what's already on your plate, and ask what should drop or move to fit it in.", fx: [4, 6, 4], why: "You're not refusing. You're making the cost visible, so your manager makes the trade-off with the full picture.", say: "Happy to take it on. It's about four hours a week, though, and invoicing is already behind. Which would you rather I let slip, or can someone else take holiday cover?" },
          { s: "rescuer", pts: 0, t: "Take it on, and plan to do it before nine and after five so nothing else suffers.", fx: [2, 2, -10], why: "Nothing suffers except you, for now. Your manager learns your capacity is endless, and the next 'quick job' is already on its way." },
          { s: "avoider", pts: 1, t: "Say yes, then let it slide to the bottom of the pile and hope it's forgotten about.", fx: [-6, -4, 2], why: "It won't be forgotten. It'll come back as 'why haven't the forms been done?', and you'll look unreliable." },
          { s: "enforcer", pts: 1, t: "Tell your manager it isn't in your job description and you won't take on extra work unless your hours change.", fx: [-6, 2, 4], why: "You may be right, but leading with the job description makes it a dispute. Starting with what would have to give gets you the same result without the stand-off." }
        ],
        insight: "Saying yes without naming the cost isn't being helpful. It's hiding information your manager needs.",
        coach: "What did you last say yes to that quietly cost you evenings?"
      },
      {
        id: "a1s3",
        title: "You're better at it than me",
        ctx: {
          office: "A colleague on the same grade keeps passing you their spreadsheets to fix, saying 'you're so much better at Excel than me'. It's taking an hour or two of your week.",
          site: "The other site administrator keeps passing you the plant hire orders, saying 'you're so much better at the system than me'. It's taking an hour or two of your week.",
          hybrid: "A colleague keeps messaging you their spreadsheets to fix, saying 'you're so much better at Excel than me'. It's taking an hour or two of your week.",
          mixed: "A colleague who covers the site office keeps passing you their orders and spreadsheets, saying 'you're so much better at it than me'. It's taking an hour or two of your week."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Offer to show them how, once, properly, then hand the next one back to them to try first.", fx: [4, 4, 6], why: "Teaching once costs an hour and saves you dozens. And it treats your colleague as capable rather than hopeless.", say: "Let's do this one together so you can see how I do it. Next time, have a go first and I'll check it if you're stuck." },
          { s: "pleaser", pts: 0, t: "Keep doing them. It's flattering, it keeps the peace, and it's only an hour or two a week.", fx: [2, 0, -8], why: "An hour or two a week is a working week a year. It won't stay at an hour or two, and they'll never learn while you keep doing it." },
          { s: "enforcer", pts: 1, t: "Tell them straight that it's their job, not yours, and you won't be doing any more of them.", fx: [-8, 2, 6], why: "You've protected your time, but you've also made a colleague look and feel useless. They still don't know how, so it'll go wrong somewhere else." },
          { s: "avoider", pts: 1, t: "Start taking longer and longer to get round to it, so they eventually stop asking you.", fx: [-4, -2, 2], why: "They'll stop asking, but they'll also stop trusting you, and they still can't do it. The work just goes wrong somewhere else." }
        ],
        insight: "Compliments can be a way of handing work over. Teaching once is kinder and cheaper than fixing forever.",
        coach: "What do you do for others that you could teach them in an hour?"
      },
      {
        id: "a1s4",
        title: "Late timesheets, your fault",
        ctx: {
          office: "Every week, the same two managers send their teams' timesheets after the cut-off. This week, three people were paid late, and you've been told 'admin messed up payroll'.",
          site: "Every week, the same two supervisors hand in their crews' timesheets after the Monday cut-off. This week, three operatives were paid late, and the word on site is 'the office messed up wages'.",
          hybrid: "Every week, the same two managers email their teams' timesheets after the cut-off. This week, three people were paid late, and you've heard 'admin messed up payroll'.",
          mixed: "Every week, two site supervisors send their crews' timesheets after the cut-off. This week, three operatives were paid late, and the site is saying 'the office messed up wages'."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Speak to the two of them privately, show them the dates, and agree a reminder and a fix for next week.", fx: [6, 6, 0], why: "Facts, in private, with a fix both of you can live with. It corrects the story without humiliating anyone, and stops it happening again.", say: "Your timesheets came in after Monday's cut-off for the last four weeks, which is why three people were paid late. What would help you get them in on time? I can send a reminder on Friday afternoon." },
          { s: "enforcer", pts: 0, t: "Email everyone on site the list of late timesheets by name, so they know it wasn't the office's fault.", fx: [-10, 2, 2], why: "You've cleared your name by publicly shaming two people. They'll be slower to help you next time, and the operatives were still paid late." },
          { s: "rescuer", pts: 1, t: "Start chasing them on Monday morning yourself and filling in the gaps from memory so payroll goes on time.", fx: [2, 4, -6], why: "People get paid, but you've taken over their job and added an hour to your Monday. If you guess a figure wrong, that will be your fault too." },
          { s: "avoider", pts: 1, t: "Say nothing. The people who matter know it wasn't you, and it'll blow over by next week.", fx: [-4, -4, 0], why: "It won't blow over. It'll happen next week, because nothing has changed, and the story about the office will stick." }
        ],
        insight: "When you're blamed for someone else's lateness, correct the facts privately and fix the process. Public blame wins the argument and loses the relationship.",
        coach: "Which process do other people keep breaking, and have you ever told them what it costs?"
      }
    ]
  },
  {
    n: 2,
    title: "Protect Your Focus",
    tool: "Drain, Neutral, Fuel",
    minutes: 15,
    lesson: [
      { h: "Death by quick questions", p: "Five interruptions an hour can wipe out a morning. Most aren't urgent; they're just easier for the other person than waiting or checking themselves." },
      { h: "Drain, Neutral, Fuel", p: "Look at your week and sort tasks three ways. Drain: takes energy and doesn't need to be you. Neutral: has to be done, fine. Fuel: you're good at it and it matters. Move one Drain off your plate each month." },
      { h: "Blocks, not walls", p: "You don't have to be unavailable all day. Two protected hours, with a clear 'I'm back at eleven', is usually enough to do the work that needs thinking." },
      { h: "Notice the person, not just the task", p: "When a colleague is struggling, the job in front of you can wait five minutes. A quiet question at the right time stops a small problem becoming a sick note." }
    ],
    mission: "Sort one ordinary day into Drain, Neutral and Fuel. Pick one Drain to hand back, teach or stop.",
    scenarios: [
      {
        id: "a2s1",
        title: "Have you got a sec?",
        ctx: {
          office: "You're halfway through the quarterly supplier reconciliation, which needs concentration. The same colleague has stopped by your desk four times this morning with quick questions.",
          site: "You're halfway through the month's plant hire reconciliation in the site cabin. The same supervisor has put his head round the door four times this morning with quick questions.",
          hybrid: "You're halfway through the quarterly reconciliation. The same colleague has messaged you four times this morning, and now they're asking for a quick call.",
          mixed: "You're halfway through the month's reconciliation. The same site supervisor has rung you four times this morning with quick questions."
        },
        q: "The fifth question arrives. What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Check it isn't urgent, say when you'll be free, and suggest they save the rest for one go at eleven.", fx: [2, 6, 6], why: "You've protected the work without shutting them out. They get a reliable time, and you get two hours of real focus.", say: "Is it urgent, or can it wait until eleven? I'm in the middle of the reconciliation. Bring me everything at eleven and I'm all yours." },
          { s: "pleaser", pts: 1, t: "Answer it. It's only a quick question, and they'll feel fobbed off if you put them on hold.", fx: [4, -4, -4], why: "Each question is quick, but losing your place five times costs you an hour. The reconciliation will have mistakes in it." },
          { s: "enforcer", pts: 2, t: "Put on headphones and set your status to 'busy, do not disturb' until the reconciliation is finished.", fx: [-2, 6, 4], why: "Protecting deep work is right, so this is defensible. But with no time to come back, people either interrupt anyway or sit on something that really was urgent." },
          { s: "avoider", pts: 0, t: "Pretend you didn't see the message and carry on, then reply later saying you've only just seen it.", fx: [-6, 2, 0], why: "It works once. Then they learn that messages to you get ignored and start going to your manager instead." }
        ],
        insight: "Most interruptions aren't urgent. A clear 'not now, but at eleven' protects your focus and keeps the relationship.",
        coach: "When in your day would two protected hours make the biggest difference?"
      },
      {
        id: "a2s2",
        title: "Can you cover reception for good?",
        ctx: {
          office: "The receptionist has left and won't be replaced 'for now'. You've been asked to cover the front desk and the phones as well as your own job, with no end date.",
          site: "The site's gate clerk has left and won't be replaced 'for now'. You've been asked to sign in visitors and deliveries as well as your own job, with no end date.",
          hybrid: "The office receptionist has left and won't be replaced. You've been asked to take the main line, diverted to your mobile, on top of your own job, with no end date.",
          mixed: "The office receptionist has left. You've been asked to cover reception and the phones as well as your own office and site work, with no end date."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Agree to cover for a set period, list what will slip, and ask for a review date in your diary now.", fx: [4, 4, 4], why: "Temporary only stays temporary if it has an end date. You've been helpful and made the cost visible.", say: "I can cover it for the next four weeks. While I do, month-end will be about two days late. Can we book in a review on the 30th to decide what happens next?" },
          { s: "rescuer", pts: 0, t: "Cover it all and work longer hours so nobody notices the gap, until they eventually replace the receptionist.", fx: [2, 2, -10], why: "If nobody notices the gap, nobody fills it. You've just become the reason the receptionist was never replaced." },
          { s: "pleaser", pts: 1, t: "Agree without fuss. It's the team spirit they're looking for, and complaining would look bad.", fx: [4, -2, -6], why: "It feels like team spirit now, but 'for now' with no end date quietly becomes your job, at your current pay." },
          { s: "enforcer", pts: 1, t: "Refuse unless it's added to your contract with a pay rise, and put that request in writing to HR.", fx: [-6, 0, 4], why: "You may well deserve both, but making a formal demand first turns a request into a negotiation with HR. Starting with a time limit gets you there more easily." }
        ],
        insight: "Temporary cover with no end date is a permanent change nobody had to agree to. Give it a limit and a review date.",
        coach: "What are you covering 'temporarily' that's been going on for months?"
      },
      {
        id: "a2s3",
        title: "She's not herself",
        ctx: {
          office: "A colleague who's usually chatty has been quiet for two weeks, eating lunch at her desk and leaving the moment five o'clock comes. This morning her eyes were red when she came in.",
          site: "The other site administrator, usually the life of the cabin, has gone quiet for two weeks and snapped at a supervisor yesterday. This morning she looked like she'd been crying.",
          hybrid: "A colleague who's usually chatty on Teams has had her camera off for two weeks and replies in one-word messages. This morning she missed the team catch-up altogether.",
          mixed: "A colleague you share the office with has been quiet for two weeks and has stopped coming out to site with you. This morning she looked like she'd been crying."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Find a quiet moment, say you've noticed she seems down, and ask if there's anything that would help.", fx: [8, 0, -2], why: "Private, kind and specific. You're not prying or fixing; you're letting her know someone noticed. What she does next is up to her.", say: "I've noticed you've seemed a bit down lately. No pressure at all, but if there's anything I can do, or you just want a coffee and a chat, I'm here." },
          { s: "enforcer", pts: 0, t: "Mention to your manager that she's been underperforming and seems distracted, so they can deal with it.", fx: [-10, 0, 2], why: "You've turned a colleague who's struggling into a performance problem, without speaking to her first. If she finds out, she won't trust you again." },
          { s: "avoider", pts: 1, t: "Leave it. It's probably personal, and she'll say something if she wants to talk about it.", fx: [-4, 0, 2], why: "Most people who are struggling don't bring it up themselves. Saying nothing isn't respecting her privacy; it's leaving her on her own." },
          { s: "rescuer", pts: 1, t: "Quietly start taking some of her work so she has less on, without mentioning why you're doing it.", fx: [2, 0, -6], why: "Kind, but it adds to your load and doesn't touch whatever is really going on. She may also find it hard to explain to her manager." }
        ],
        insight: "You don't need to fix someone's problems to help. Noticing, privately, and offering is usually enough.",
        coach: "Who around you has changed lately, and has anyone asked them about it?"
      },
      {
        id: "a2s4",
        title: "Fix my diary by tomorrow",
        ctx: {
          office: "At 6:30pm, the managing director messages you: he's double-booked himself three times tomorrow, including with a client, and wants it all sorted by the morning. You're about to leave for your child's school play.",
          site: "At 6:30pm, the contracts director rings: he's promised to be at two sites and a client meeting at the same time tomorrow, and wants it sorted by the morning. You're about to leave for your child's school play.",
          hybrid: "At 6:30pm, the managing director sends a Teams message: he's double-booked three times tomorrow, including a client, and wants it sorted by the morning. You're logging off for your child's school play.",
          mixed: "At 6:30pm, the managing director rings: he's double-booked a site visit and a client meeting tomorrow, plus an internal meeting, and wants it sorted by the morning. You're about to leave for your child's school play."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Reply now that you'll sort it first thing, ask which meeting matters most, and go to the play.", fx: [4, 4, 6], why: "He knows it's in hand, you've got the one answer you need, and the fix will be done by 8:30. Nothing tonight needed you specifically.", say: "I'll sort this first thing; it'll be done by half eight. Which of the three matters most to you, so I protect that one?" , next: "He replies with a thumbs up and says the client meeting matters most." },
          { s: "pleaser", pts: 0, t: "Miss the start of the play and sort the diary tonight, so he wakes up to it all done.", fx: [4, 2, -10], why: "He'll be impressed, and he'll do it again, because he's learned your evenings are available. You'll miss the play for something that could wait twelve hours." , next: "You miss the start of the play. By 9pm two meetings have moved, but the client hasn't replied." },
          { s: "avoider", pts: 1, t: "Don't reply tonight and deal with it in the morning without mentioning that you saw the message.", fx: [-4, 2, 4], why: "Leaving it to the morning is right, but saying nothing leaves him unsure whether it's being done. A one-line reply costs you a minute." , next: "He sends two more messages that evening asking if you've seen it." },
          { s: "enforcer", pts: 1, t: "Reply that you've finished for the day and he'll need to sort his own diary out next time.", fx: [-8, 0, 4], why: "Your evening matters, but this reply lectures the managing director when a one-line 'I'll sort it first thing' would do the same job." , next: "He replies 'Noted.' Things feel frosty in the morning." }
        ],
        step2: {
          q: "Step 2: In the morning, the client can only do the slot that clashes with the MD's site visit.",
          options: [
            { s: "leader", pts: 3, t: "Message the MD with the two options and your recommendation, and ask him to pick by nine.", fx: [4, 6, 2], why: "It's his call, but you've done the thinking for him. A recommendation with a deadline gets a quick decision.", say: "The client can only do 10am, which clashes with the site visit. I'd suggest moving the site visit to 2pm, as the site manager can do either. Shall I go ahead? I need to confirm by nine." },
            { s: "rescuer", pts: 0, t: "Move the site visit yourself and tell the site manager the MD is no longer coming at all this week.", fx: [-2, 0, -4], why: "You've made a decision about the MD's priorities that wasn't yours to make, and cancelled something he may care about more than you know." },
            { s: "pleaser", pts: 1, t: "Ask the client if they could possibly find another time, even though they've said they can't.", fx: [2, -4, 0], why: "You're pushing the problem onto a client to avoid bothering your boss. The client has already told you the answer." },
            { s: "avoider", pts: 1, t: "Leave both in the diary and let the MD choose on the day when he sees the clash himself.", fx: [-4, -6, 2], why: "Someone gets let down at the last minute, and it won't be the MD who looks bad. It'll be the person who manages his diary." }
          ]
        },
        insight: "Urgent for them doesn't always mean urgent tonight. A quick 'first thing' reply keeps their trust and your evening.",
        coach: "What do you do in the evening that could genuinely wait until morning?"
      }
    ]
  },
  {
    n: 3,
    title: "Make the Call",
    tool: "One-Way and Two-Way Doors",
    minutes: 15,
    lesson: [
      { h: "Not every decision needs a boss", p: "If you ask permission for every small call, you slow everything down and teach your manager you can't be trusted with more." },
      { h: "One-Way and Two-Way Doors", p: "A two-way door can be walked back through: rebooking a meeting, choosing a supplier for a one-off order. Decide it yourself, quickly. A one-way door can't: sending confidential information, paying money out, committing the company. Slow down and check." },
      { h: "Mistakes are two-way doors if you move fast", p: "Most admin mistakes can be fixed if you own them in the first hour. Hidden for a week, the same mistake becomes a one-way door." },
      { h: "Confidential means confidential", p: "You often see pay, disciplinary and personal details. Who you share them with is a one-way door every single time." }
    ],
    mission: "This week, make one small decision you'd normally ask permission for, and tell your manager afterwards what you decided and why.",
    scenarios: [
      {
        id: "a3s1",
        title: "An error in the board report",
        ctx: {
          office: "Your manager's board report goes out in an hour. While formatting it, you spot that the headline cost figure doesn't match the spreadsheet it came from. Your manager is in back-to-back meetings.",
          site: "The weekly client report goes out in an hour. While compiling it, you spot that the progress figure the site manager gave you doesn't match the programme. He's up on the scaffold all morning.",
          hybrid: "Your manager's board report goes out in an hour. You spot that the headline cost figure doesn't match the spreadsheet it came from. Your manager has a 'do not disturb' on Teams.",
          mixed: "The monthly client report goes out in an hour. You spot that one of the site figures doesn't match the spreadsheet. Your manager is out on site and isn't answering his phone."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Get a short note to your manager now, showing both figures, and hold the report until they reply.", fx: [6, 4, 0], why: "Sending a wrong figure to the board or client is a one-way door. A two-line note gets your manager's attention without guessing which figure is right.", say: "Sorry to interrupt: the cost figure on page 2 says £184k, but the spreadsheet says £148k. Which is right? I'm holding the report until I hear from you." },
          { s: "avoider", pts: 0, t: "Send it as it is. It's your manager's report, their figures, and it isn't your place to question them.", fx: [-6, -8, 2], why: "You knew it was probably wrong and sent it anyway. When it's spotted, 'it wasn't my place' won't feel like a good answer." },
          { s: "rescuer", pts: 1, t: "Change the figure to match the spreadsheet yourself and send it on time without mentioning it.", fx: [0, 2, -2], why: "You might be right, but the spreadsheet might be the thing that's wrong. Quietly changing a manager's figure is a one-way door you've walked through alone." },
          { s: "enforcer", pts: 1, t: "Copy your manager's boss in on an email pointing out the mistake, so it's on record that you spotted it.", fx: [-8, 2, 2], why: "It's on record, and so is the fact that you went over your manager's head. A quiet word to them first gets the same fix without the fallout." }
        ],
        insight: "Spotting an error is the easy part. Raising it quickly, privately and with evidence is what makes you trusted.",
        coach: "When did you last spot something and say nothing because it wasn't your place?"
      },
      {
        id: "a3s2",
        title: "The trains are cancelled",
        ctx: {
          office: "Five of the team are due in Leeds for a client meeting at nine tomorrow. At 7pm, their trains are cancelled. The cheapest fix is a hire car at £180. Your manager is on holiday.",
          site: "Four operatives are due on a new site in Leeds at seven tomorrow. At 7pm, you hear the van they were booked to use has failed its check. A hire van is £180. The contracts manager is on holiday.",
          hybrid: "Five colleagues are due in Leeds for a client meeting at nine tomorrow. At 7pm, their trains are cancelled. A hire car is £180. Your manager is on holiday and you're at home.",
          mixed: "Four of the team are due on a Leeds site at seven tomorrow. At 7pm, their transport falls through. A hire van is £180. Your manager is on holiday."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Book the hire vehicle, tell the team tonight, and leave your manager a note.", fx: [6, 8, 0], why: "This is a two-way door: small cost, easily explained, and the alternative is a missed client or lost day on site. Decide, act, and keep a record.", say: "Trains cancelled, so I've booked a hire car for £180 to keep the 9am meeting. Details below. Happy to talk it through when you're back." },
          { s: "avoider", pts: 1, t: "Tell the team the trip's off and to work from home tomorrow, and let your manager sort it out when they're back.", fx: [-4, -8, 2], why: "You've avoided spending £180 of someone else's money and lost a client meeting or a day's work instead. That's the expensive option." },
          { s: "rescuer", pts: 0, t: "Ring your manager on holiday to ask whether it's OK to spend £180, and keep trying until they answer.", fx: [-2, 2, -4], why: "You've interrupted their holiday for a decision you were perfectly able to make. Next time they go away, they'll leave a longer list of instructions and less trust." },
          { s: "enforcer", pts: 2, t: "Ask the team to find their own way there and claim it back on expenses, as per the travel policy.", fx: [-4, 4, 4], why: "It follows the policy and gets them there, so it's defensible. But at 7pm, leaving five people to sort it themselves means five different plans and some late arrivals." }
        ],
        insight: "Small, reversible decisions are yours to make. Make them, act, and tell your manager afterwards.",
        coach: "What do you ask permission for that you could just do and report?"
      },
      {
        id: "a3s3",
        title: "What's he on?",
        ctx: {
          office: "A manager you get on well with stops by your desk and asks, half joking, what a new starter in his team is being paid. You process the payroll, so you know.",
          site: "A supervisor you get on well with asks you in the cabin what the new chargehand is on. You handle the site's timesheets and pay rates, so you know.",
          hybrid: "A manager you get on well with messages you privately asking what a new starter in his team is being paid. You process the payroll, so you know.",
          mixed: "A site supervisor you get on well with rings you and asks what the new chargehand is on. You handle the pay rates, so you know."
        },
        q: "What do you say?",
        options: [
          { s: "leader", pts: 3, t: "Say kindly that you can't share anyone's pay, and point him to HR.", fx: [4, 2, 2], why: "Firm on the principle and friendly about it. He'll respect it more than he lets on, and he'll trust you with his own details.", say: "You know I can't share anyone's pay, mate, the same as I wouldn't share yours. If you need it to manage him, HR can tell you." },
          { s: "pleaser", pts: 0, t: "Tell him roughly. He's a manager, he probably has a right to know, and you don't want to seem awkward.", fx: [2, 0, -2], why: "It feels harmless, but pay is a one-way door. Once it's out, it's out, and you've shown you'll share confidential information when asked nicely." },
          { s: "enforcer", pts: 1, t: "Tell him that asking is against data protection rules and you'll have to report it if he asks again.", fx: [-8, 0, 2], why: "The principle's right, but a threat over a half-joking question damages a good relationship. A friendly 'I can't' does the same job." },
          { s: "avoider", pts: 1, t: "Laugh it off, change the subject, and hope he doesn't bring it up again.", fx: [0, 0, 0], why: "He'll probably ask again, and next time he may catch you off guard. A clear answer now saves you from having to dodge it repeatedly." }
        ],
        insight: "Confidential information is a one-way door every time. Say no to the request, not to the person.",
        coach: "What do you know at work that you'd find hard to keep to yourself if asked nicely?"
      },
      {
        id: "a3s4",
        title: "Wrong document, wrong client",
        ctx: {
          office: "At 3pm you realise the quote you emailed to a client at 11am was meant for a different client. It shows the other client's name and their discounted rates. Nobody has said anything yet.",
          site: "At 3pm you realise the method statement you sent to the client's site manager at 11am was for a different job, with another client's name and details on it. Nobody has said anything yet.",
          hybrid: "At 3pm you realise the quote you emailed to a client at 11am was meant for another client, showing their name and discounted rates. Nobody has said anything yet.",
          mixed: "At 3pm you realise the document you sent to a client at 11am was for another client, with their name and rates on it. Nobody has said anything yet."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Tell your manager straight away, with what went out and to whom, and suggest how to contact the client.", fx: [6, 4, -4], why: "Owning it in the first hours is what turns a serious mistake into a fixable one. There may also be a data breach to log, and your manager needs to know now.", say: "I've made a mistake: at 11am I sent the Harris quote to Brooks by mistake. It shows Harris's rates. I wanted you to know straight away. I'd suggest we call Brooks and ask them to delete it." , next: "Your manager rings the client, who agrees to delete it." },
          { s: "avoider", pts: 0, t: "Say nothing. They might not even have opened it, and raising it will only draw attention to it.", fx: [-10, -6, 0], why: "If they have opened it, the other client's details are out and nobody's managing it. When it comes out, the cover-up will be worse than the mistake." , next: "At 4:30 the client rings your manager asking why they've got another client's prices." },
          { s: "rescuer", pts: 1, t: "Email the client yourself asking them to delete it, without involving your manager.", fx: [-2, 2, -2], why: "Quick, but you've handled a possible data breach and a sensitive client conversation alone. Your manager may hear about it from the client first." , next: "The client replies to your manager, not you, asking what's going on." },
          { s: "pleaser", pts: 1, t: "Send the correct document with a cheerful 'please use this version instead!' and hope they don't look at the first one.", fx: [0, 0, 0], why: "It looks tidy, but it practically invites them to compare the two. The other client's details are still sitting in their inbox." , next: "The client replies asking why there are two different quotes." }
        ],
        step2: {
          q: "Step 2: Your manager asks how it happened, in front of two colleagues.",
          options: [
            { s: "leader", pts: 3, t: "Explain plainly what happened and what you'll change to prevent it.", fx: [6, 2, 2], why: "No excuses, no grovelling. A plain explanation and a fix is what makes a manager trust you with the next mistake.", say: "I had both quotes open and attached the wrong one. From now on, I'll check the file name against the client before I press send." },
            { s: "enforcer", pts: 0, t: "Point out that the system names files confusingly, and the sales team never labels quotes properly.", fx: [-8, 0, 2], why: "Those things may be true, but leading with them sounds like blame. Your manager wants to know you've got it, not whose fault the system is." },
            { s: "pleaser", pts: 1, t: "Apologise repeatedly and promise it will never, ever happen again, whatever it takes.", fx: [2, 0, -6], why: "Over-apologising makes it bigger than it is and doesn't say what you'll change. 'Never again' is a promise nobody can keep." },
            { s: "avoider", pts: 2, t: "Ask if you can talk it through privately after the meeting, rather than in front of the others.", fx: [2, 0, 2], why: "Asking to speak privately is reasonable, so this is defensible. A short, plain answer now often does more for your credibility than delaying it." }
          ]
        },
        insight: "The first hour after a mistake decides how big it becomes. Own it, say what went out, and suggest the fix.",
        coach: "What's the hardest mistake you've had to own up to, and what happened when you did?"
      }
    ]
  }
  ]
};
export default ADMIN;
