// True Plumb Execution Sprint · Operational Managers track
const OPS = {
  track: "Operational Managers",
  lessonsFrom: "team",
  days: [
  {
    n: 1,
    title: "Hold the Line",
    tool: "The 90-Second Reset",
    minutes: 15,
    lesson: [
      { h: "The squeeze, multiplied", p: "You're squeezed from above by targets and from below by several supervisors and their teams. Every yes you give upward lands on someone's team. Every problem you take from below makes you the bottleneck." },
      { h: "The 90-Second Reset", p: "When you need to say no, or not yet: Acknowledge what they need. Anchor on what the operation is already committed to, as a plain fact. Pivot to options, and hand the choice to whoever owns the priority." },
      { h: "Lead through your supervisors", p: "Your job is to make your supervisors stronger, not to replace them. When their team comes to you, back the supervisor and send it back through them. When they bring you a decision, ask for their recommendation." },
      { h: "Set the rules once", p: "Most conflicts between teams are about shared things: people, plant, vehicles, budget. Agree the rule for who gets what, in writing, so you don't have to referee every week." }
    ],
    mission: "Use the 90-Second Reset once this week on a request from above. Write the options you'll offer and who you'll ask to choose.",
    scenarios: [
      {
        id: "o1s1",
        title: "Over the supervisor's head",
        ctx: {
          office: "Amy, a team member in Mark's team, comes to your office upset. Mark has refused her leave request for the week of her sister's wedding, and she wants you to overrule him.",
          site: "Amy, one of the operatives in Mark's crew, finds you in the site office upset. Mark has refused her leave request for the week of her sister's wedding, and she wants you to overrule him.",
          hybrid: "Amy, from Mark's team, books a call with you directly. Mark has refused her leave request for the week of her sister's wedding, and she wants you to overrule him.",
          mixed: "Amy, from Mark's team on site, rings you while you're in the office. Mark has refused her leave request for the week of her sister's wedding, and she wants you to overrule him."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Listen properly, then say you'll ask Mark to look at it again today, and speak to Mark first yourself.", fx: [6, 2, -2], why: "Amy feels heard, Mark keeps his authority, and the decision goes back to the person who owns the rota. You can still push Mark privately if his reason doesn't hold up." },
          { s: "pleaser", pts: 1, t: "Approve the leave yourself. It's her sister's wedding, and you can square it with Mark afterwards.", fx: [2, -2, 2], why: "Amy is happy, but Mark has just learned that his decisions can be overturned behind his back, and so has his whole team. Expect more people going round him." },
          { s: "enforcer", pts: 1, t: "Tell Amy that leave decisions sit with Mark, and she needs to take it up with him, not come to you.", fx: [-6, 2, 2], why: "The chain of command is right, but turning her away cold tells Amy you don't care. She'll stay quiet about the next thing, even if it's serious." },
          { s: "avoider", pts: 0, t: "Tell Amy you'll look into it, then leave it a few days and see whether Mark ends up sorting it himself.", fx: [-8, 0, 0], why: "Amy thinks you're on it, Mark doesn't know there's a problem, and the wedding is getting closer. When it blows up, both of them will blame you." }
        ],
        insight: "When a team member goes over their supervisor, back the supervisor and still help the person. Send the issue back through the supervisor, and talk to the supervisor first.",
        coach: "Which of your supervisors do people go round most often, and why?"
      },
      {
        id: "o1s2",
        title: "Cut 10% by month end",
        ctx: {
          office: "The operations director emails: \"Need 10% off labour costs by month end, with no drop in output.\" Your teams are already lean after two people left in the summer.",
          site: "The operations director rings the site: \"Need 10% off labour costs on this job by month end, with no drop in output.\" Your crews are already lean after two operatives left in the summer.",
          hybrid: "The operations director messages: \"Need 10% off labour costs by month end, with no drop in output.\" Your teams are already lean after two people left in the summer.",
          mixed: "The operations director catches you in the office: \"Need 10% off labour costs across your sites by month end, with no drop in output.\" Your teams are already lean after two people left in the summer."
        },
        q: "How do you respond?",
        options: [
          { s: "leader", pts: 3, t: "Agree to work on it, then come back with three options and what each would cost in output, risk or time.", fx: [4, 6, 2], why: "You haven't refused. You've made the trade-offs visible and put the choice with the person who owns the target. Directors usually move once they can see the cost." },
          { s: "pleaser", pts: 0, t: "Commit to the 10%, then tell each supervisor to find their share of the saving and make it work.", fx: [-8, -4, 2], why: "You've passed an impossible target down without a plan. Supervisors will cut corners or cut people, and when output drops, it's your name on it." },
          { s: "rescuer", pts: 1, t: "Commit to the 10%, and cover the gaps yourself by taking on more of the supervising and the admin.", fx: [2, 0, -12], why: "It might hit the number for a month. But the saving is really your evenings, nobody upstairs sees the true cost, and you can't keep it up." },
          { s: "enforcer", pts: 2, t: "Tell the director it can't be done without hurting output or safety, and that the target needs to change.", fx: [2, -2, 2], why: "You may be right, but a flat no makes you the problem. Showing the options and their costs gets you the same protection without the fight." }
        ],
        insight: "Never just absorb a target, and never just refuse one. Show the options and what each one costs, and let the person who owns the target choose.",
        coach: "Which target are you carrying that nobody upstairs knows the real cost of?"
      },
      {
        id: "o1s3",
        title: "\"What do you want me to do?\"",
        ctx: {
          office: "Gary, one of your supervisors, rings you six or seven times a day: \"What do you want me to do about...?\" Most of it he could decide himself. It's eating your whole day.",
          site: "Gary, one of your supervisors, finds you six or seven times a day: \"What do you want me to do about...?\" Most of it he could decide himself. It's eating your whole day.",
          hybrid: "Gary, one of your supervisors, messages you six or seven times a day: \"What do you want me to do about...?\" Most of it he could decide himself. It's eating your whole day.",
          mixed: "Gary, one of your supervisors, rings you from site six or seven times a day: \"What do you want me to do about...?\" Most of it he could decide himself. It's eating your whole day."
        },
        q: "What do you change?",
        options: [
          { s: "leader", pts: 3, t: "Agree which decisions are his to make, and ask him to bring a recommendation with anything else.", fx: [6, 4, 8], why: "Gary probably isn't sure where his authority ends. Making it clear, and asking for his recommendation, builds his confidence and gives you your day back." },
          { s: "rescuer", pts: 1, t: "Keep answering quickly. Each call takes a minute, and you'd rather it was done right than his way.", fx: [0, 2, -10], why: "A minute each, seven times a day, every day. Gary never learns to decide, and you've made yourself the bottleneck for his whole team." },
          { s: "avoider", pts: 1, t: "Start telling him to use his own judgement, and stop answering the smaller questions he sends.", fx: [-4, -2, 4], why: "He doesn't know which ones are 'smaller'. Without clear limits he'll either freeze or guess wrong on something that matters." },
          { s: "enforcer", pts: 1, t: "Tell him plainly he's a supervisor and needs to stop running every little decision past you.", fx: [-6, 0, 6], why: "He gets the message, but feels told off rather than trusted. The next time something genuinely needs you, he might not ring." }
        ],
        insight: "Supervisors who escalate everything usually don't know where their authority ends. Spell out what's theirs, and ask for a recommendation with everything else.",
        coach: "Which decisions are you still making that one of your supervisors should own?"
      },
      {
        id: "o1s4",
        title: "Two supervisors, one resource",
        twoStep: true,
        ctx: {
          office: "Mark and Kelly both need the same two experienced staff next week for their priority jobs. They've each told you the other is being unreasonable, and both want you to decide in their favour.",
          site: "Mark and Kelly both need the telehandler and the same two experienced operatives next week. They've each told you the other is being unreasonable, and both want you to decide in their favour.",
          hybrid: "Mark and Kelly both need the same two specialists next week for their priority projects. They've each messaged you saying the other is being unreasonable, and both want you to decide in their favour.",
          mixed: "Mark and Kelly, on different sites, both need the same van and two experienced staff next week. They've each rung you saying the other is being unreasonable, and both want you to decide in their favour."
        },
        q: "Step 1: What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Get both of them together, agree a simple rule for shared resources, and apply it to next week.", fx: [6, 6, 2], why: "You're not just settling this week. A shared rule, such as client deadline first and then safety-critical work, stops the same fight every Monday.", next: "You agree a rule together, and next week is sorted by it." },
          { s: "pleaser", pts: 1, t: "Split it down the middle, half the week each, so nobody feels they've lost out to the other.", fx: [0, -6, 2], why: "It feels fair, but both priority jobs are now half-resourced. You've avoided a decision and both of them will probably miss.", next: "Both jobs fall behind by midweek." },
          { s: "avoider", pts: 0, t: "Tell them they're both experienced supervisors and should be able to sort it out between them.", fx: [-6, -4, 4], why: "If they could, they wouldn't have come to you. The louder one wins, and the other one stops trusting you to be fair.", next: "Mark takes the resources without asking. Kelly is furious." },
          { s: "enforcer", pts: 1, t: "Give it to whoever has the bigger contract, and tell the other one that's simply how it works.", fx: [-4, 2, 2], why: "It's quick and has some logic, but you haven't heard either case. The rule also wasn't agreed, so the losing supervisor sees favouritism.", next: "Kelly accepts it, but goes quiet and stops sharing problems with you." }
        ],
        step2: {
          q: "Step 2: The following week, Mark takes a resource that the agreed priority says should have gone to Kelly.",
          options: [
            { s: "leader", pts: 3, t: "Speak to Mark privately today, point to the agreement, ask what happened, and fix it with Kelly.", fx: [6, 4, -2], why: "Raising it straight away, in private and referring to what you all agreed, makes the rule real. Asking what happened gives Mark the chance to explain." },
            { s: "avoider", pts: 0, t: "Let it go this once. Mark probably had his reasons, and raising it might restart the argument.", fx: [-8, -2, 2], why: "You've just shown the agreement doesn't count. Kelly will notice, and next time she'll take things too." },
            { s: "enforcer", pts: 1, t: "Send both supervisors a firm email restating the rule, saying any future breach will be escalated.", fx: [-4, 2, 2], why: "Kelly did nothing wrong but gets the telling-off too, and Mark gets an email instead of a conversation. It looks like you're avoiding him." },
            { s: "rescuer", pts: 1, t: "Find Kelly a replacement resource yourself, so her job isn't hit and you avoid a row with Mark.", fx: [2, 4, -8], why: "Kelly is fine this week, but Mark learns he can take what he wants and you'll tidy up after him." }
          ]
        },
        insight: "Most conflicts between supervisors are about shared resources. Agree the rule once, then enforce it straight away the first time it's broken.",
        coach: "What shared resource causes the most arguments between your teams?"
      }
    ]
  },
  {
    n: 2,
    title: "Protect the Operation's Capacity",
    tool: "Drain, Neutral, Fuel",
    minutes: 15,
    lesson: [
      { h: "Your calendar is the operation's bottleneck", p: "If every hour is meetings and calls, nobody is planning ahead. The work that prevents next month's problems is always the first thing to get squeezed out." },
      { h: "Heaviest drain first", p: "Protect one block a week for planning and one for your supervisors. Batch status updates. Decline meetings where you're only there to listen." },
      { h: "Delegate the outcome, with a review", p: "Give supervisors the result, the template and a review point. You can hand over the work, but you can't hand over the responsibility." },
      { h: "Watch your supervisors' load", p: "Supervisors covering a gap 'for now' become permanent cover. Put an end date on every temporary arrangement." }
    ],
    mission: "Block two hours next week for planning, with no meetings. Pick one recurring report to hand to a supervisor. Write both down.",
    scenarios: [
      {
        id: "o2s1",
        title: "The week with no gaps",
        ctx: {
          office: "Your week is booked solid: four status meetings, two client calls and a budget review. The resourcing plan for next quarter, due Friday, has no time against it. Kelly asks for an hour to talk through a problem.",
          site: "Your week is booked solid: site meetings, client walkarounds and a budget review. The labour plan for next quarter, due Friday, has no time against it. Kelly asks for an hour on her site to talk through a problem.",
          hybrid: "Your week is booked solid with video calls: four status meetings, two client calls and a budget review. The resourcing plan for next quarter, due Friday, has no time against it. Kelly asks for an hour to talk through a problem.",
          mixed: "Your week is booked solid: office meetings, two site visits and a budget review. The labour plan for next quarter, due Friday, has no time against it. Kelly asks you to come to her site for an hour."
        },
        q: "How do you fix the week?",
        options: [
          { s: "leader", pts: 3, t: "Drop two status meetings for written updates, block two hours for the plan, and book Kelly in.", fx: [4, 6, 6], why: "Status meetings are the easiest thing to cut, because a written update does the same job. That frees time for the planning only you can do and for the supervisor who needs you." },
          { s: "rescuer", pts: 1, t: "Keep everything in, see Kelly at lunch, and do the quarterly plan on Thursday evening at home.", fx: [2, 2, -10], why: "Everyone gets what they asked for, and you get a late Thursday doing the most important piece of work while tired." },
          { s: "pleaser", pts: 1, t: "Give Kelly a quick ten minutes on the phone instead, and keep the rest of the week as it is.", fx: [-4, 0, 2], why: "Ten minutes on the phone for something she asked an hour for tells Kelly she's not a priority, and the planning still has no time." },
          { s: "avoider", pts: 0, t: "Ask for the quarterly plan deadline to move back a week, and keep the rest of the diary as it is.", fx: [0, -6, 2], why: "You've protected the meetings and pushed back the one task that stops next quarter's firefighting. That's the wrong way round." }
        ],
        insight: "Status meetings are the cheapest time to win back. Spend it on planning and on your supervisors.",
        coach: "Which recurring meeting could be replaced by a written update this week?"
      },
      {
        id: "o2s2",
        title: "Your forecast or theirs?",
        ctx: {
          office: "Every month you spend a full day building the labour and cost forecast for all your teams. Your supervisors know their numbers better than you, but they've never done it.",
          site: "Every month you spend a full day building the labour and cost forecast for the job. Your supervisors know their sections better than you, but they've never done it.",
          hybrid: "Every month you spend a full day building the labour and cost forecast for all your teams. Your team leads know their numbers better than you, but they've never done it.",
          mixed: "Every month you spend a full day building the labour and cost forecast across your sites. Your supervisors know their sites better than you, but they've never done it."
        },
        q: "What do you do with it?",
        options: [
          { s: "leader", pts: 3, t: "Give each supervisor a simple template for their area, walk them through it, and review it together.", fx: [6, 4, 8], why: "The people closest to the numbers make the forecast better, and they start owning their costs. The review stops errors getting through in the first few months." },
          { s: "rescuer", pts: 1, t: "Keep doing it yourself. The numbers have to be right, and the supervisors are busy enough already.", fx: [0, 2, -8], why: "A day a month, every month, and your supervisors never learn to manage their own costs. You'll still be doing it next year." },
          { s: "avoider", pts: 1, t: "Email the supervisors the template and a deadline, and let them work it out from last month's version.", fx: [-2, -6, 6], why: "That's dumping the work, not delegating it. You'll get six different interpretations, and fixing them could take longer than doing it yourself." },
          { s: "enforcer", pts: 1, t: "Hand it over, but require every line to be justified to you in writing before you accept it.", fx: [-6, 4, -4], why: "It feels rigorous, but it's an interrogation. Supervisors will pad the numbers to protect themselves, and you'll still spend the day checking." }
        ],
        insight: "The forecast should belong to the people who control the costs. Your job is the template, the walkthrough and the review.",
        coach: "Which piece of 'manager admin' would be better owned by your supervisors?"
      },
      {
        id: "o2s3",
        title: "Temporary cover, six months on",
        ctx: {
          office: "Kelly has been covering two teams since a supervisor left in May. It was meant to be temporary. Recently she's been short with her teams and missed two deadlines, which is unlike her.",
          site: "Kelly has been running two sections since a supervisor left in May. It was meant to be temporary. Recently she's been short with the crews and missed two handovers, which is unlike her.",
          hybrid: "Kelly has been covering two teams since a team lead left in May. It was meant to be temporary. Recently she's been short in calls and missed two deadlines, which is unlike her.",
          mixed: "Kelly has been covering two sites since a supervisor left in May. It was meant to be temporary. Recently she's been short with both crews and missed two handovers, which is unlike her."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Talk to Kelly privately, set an end date for the cover, and push the hire forward with your director.", fx: [8, 4, -2], why: "Kelly needs to know when it ends, not just to be thanked. An end date plus a real push on the hire fixes the cause rather than the symptoms." },
          { s: "pleaser", pts: 1, t: "Thank Kelly properly for all the extra effort and ask your director for a one-off bonus to recognise it.", fx: [2, 0, 0], why: "Recognition is good, but money doesn't fix exhaustion. She's still covering two teams with no end in sight." },
          { s: "rescuer", pts: 1, t: "Take over one of the two teams yourself until the vacancy is filled, so Kelly can breathe again.", fx: [4, 0, -10], why: "Kelly gets relief, but now your whole operation has lost its manager to one team. The vacancy also stops feeling urgent to anyone above you." },
          { s: "avoider", pts: 0, t: "Hold on until recruitment finishes. It shouldn't be much longer, and Kelly has coped so far.", fx: [-8, -4, 2], why: "It's already been six months. 'Coped so far' is how strong supervisors burn out and leave, which would leave you with two gaps." }
        ],
        insight: "Every temporary cover needs an end date. Without one, 'temporary' quietly becomes permanent, and your best people burn out.",
        coach: "Who in your operation is covering a gap 'for now', and since when?"
      },
      {
        id: "o2s4",
        title: "Month end, two teams behind",
        twoStep: true,
        ctx: {
          office: "It's the 24th. Two of your five teams are behind on the monthly target. The director wants a recovery plan on his desk by 9am tomorrow.",
          site: "It's the 24th. Two of your five sections are behind programme. The director wants a recovery plan by 9am tomorrow.",
          hybrid: "It's the 24th. Two of your five teams are behind on the monthly target. The director wants a recovery plan in his inbox by 9am tomorrow.",
          mixed: "It's the 24th. Two of your sites are behind programme. The director wants a recovery plan by 9am tomorrow, and you're on site all afternoon."
        },
        q: "Step 1: How do you build the plan?",
        options: [
          { s: "leader", pts: 3, t: "Get the two supervisors on a 30-minute call today, build the plan with them, and send it tonight.", fx: [6, 6, 0], why: "They know what's really behind the slip, and they'll be the ones doing the recovery. A plan they helped build is one they'll actually deliver.", next: "The plan goes in, built with both supervisors. One of them has doubts about part of it." },
          { s: "rescuer", pts: 1, t: "Write the plan yourself tonight from the figures, so the supervisors can keep working on recovery.", fx: [-2, 2, -8], why: "Kind to them, but you're guessing at causes from the numbers, and the supervisors will see the plan for the first time when it's already promised.", next: "You send it. The next day one of the supervisors says part of it won't work." },
          { s: "enforcer", pts: 1, t: "Tell both supervisors to send you their own recovery plans by 7am, ready for you to combine.", fx: [-6, 2, 0], why: "You'll get two rushed plans written late at night in fear, and no conversation about what's really going wrong.", next: "You combine the two rushed plans. One supervisor quietly disagrees with the result." },
          { s: "avoider", pts: 0, t: "Ask the director for until the end of the week, so you can get proper information before planning.", fx: [-2, -8, 2], why: "There are six days left in the month. A plan on Friday is a plan for next month. A rough plan today is worth more.", next: "The director refuses and you scramble a plan late at night. A supervisor disagrees with it." }
        ],
        step2: {
          q: "Step 2: One supervisor tells you the part of the plan that relies on his team is unrealistic.",
          options: [
            { s: "leader", pts: 3, t: "Ask what he'd change and what that does to the end date, then update the director with the real version.", fx: [6, 6, -2], why: "A plan that's honest about its weak spots is worth more than a confident one that fails. Updating the director early protects your credibility." },
            { s: "enforcer", pts: 0, t: "Tell him the plan has gone to the director now, and he needs to find a way to make his part work.", fx: [-10, -2, 2], why: "You've chosen your credibility with the director over the truth. When his part fails, you'll both be explaining why." },
            { s: "rescuer", pts: 1, t: "Tell him not to worry, and plan to cover his shortfall from the other teams without telling the director.", fx: [2, 0, -6], why: "You've quietly taken from other teams to keep a promise that was wrong. That creates new gaps you'll find out about next week." },
            { s: "avoider", pts: 1, t: "Agree to look at it again next week once the plan's had a chance to run and you can see the results.", fx: [-2, -6, 2], why: "You've been warned that it won't work. Waiting a week to prove it costs a week you don't have." }
          ]
        },
        insight: "Build recovery plans with the people who'll deliver them. When the plan turns out to be wrong, update upward straight away.",
        coach: "When did you last defend a plan you already suspected wouldn't work?"
      }
    ]
  },
  {
    n: 3,
    title: "Make the Call",
    tool: "One-Way and Two-Way Doors",
    minutes: 15,
    lesson: [
      { h: "Two kinds of decision", p: "One-way doors are hard to undo: contracts, restructures, people's jobs, safety sign-offs. Two-way doors can be reversed: a trial shift pattern, a rota change, a new reporting format." },
      { h: "The 70% Rule", p: "For two-way doors, decide once you're about 70% sure, and set a review date. Operations lose more to slow decisions than to wrong ones that get corrected quickly." },
      { h: "Build exits into one-way doors", p: "When a decision is hard to undo, make it more reversible: a trial period, a break clause, a pilot site. Pressure isn't a reason to skip this." },
      { h: "Explain the why, especially to the people who lose out", p: "Every operational decision has someone who loses out. Tell them first, privately, with your reasoning. That's what keeps their trust." }
    ],
    mission: "Pick one operational decision you've been delaying. Decide whether it's a one-way or two-way door. Make it reversible if you can, set a date, and tell the person it affects most.",
    scenarios: [
      {
        id: "o3s1",
        title: "The shift pattern",
        ctx: {
          office: "You believe a staggered start (7 to 3 and 9 to 5) would cover peak demand much better. Two supervisors like the idea, and one long-serving supervisor is dead against it.",
          site: "You believe a four-day, ten-hour pattern would get more done on the job and cut travel time. Two supervisors like the idea, and one long-serving supervisor is dead against it.",
          hybrid: "You believe set office days for each team would make in-person time far more useful. Two team leads like the idea, and one long-serving team lead is dead against it.",
          mixed: "You believe moving the site start to 7am and office days to Tuesday and Thursday would fix coordination. Two supervisors like the idea, and one long-serving supervisor is dead against it."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Trial it in one or two teams for four weeks, agree what success looks like, and review it with all three.", fx: [6, 6, 2], why: "It's a two-way door, so pilot it. Agreeing success measures in advance gives the doubtful supervisor a fair test rather than a fight." },
          { s: "avoider", pts: 0, t: "Hold off until all three supervisors are on board, because forcing it would damage the relationships.", fx: [-2, -6, 0], why: "One person now has a veto over a change you believe in. The operation pays for that every week the old pattern carries on." },
          { s: "enforcer", pts: 1, t: "Roll it out across every team from next month. It's your call to make, and debate won't change that.", fx: [-6, 4, 0], why: "It is your call, but going all in skips the chance to learn and turns the doubtful supervisor into an opponent." },
          { s: "pleaser", pts: 1, t: "Let each supervisor choose whether their own team switches, so nobody is made to change against their will.", fx: [4, -6, 0], why: "Everyone's happy, and you now run two patterns across one operation. Coordination gets worse, which was the problem you were trying to fix." }
        ],
        insight: "Pilot changes in part of the operation, and agree what success looks like before you start.",
        coach: "What change have you been waiting for a consensus on that you'll never get?"
      },
      {
        id: "o3s2",
        title: "The cheaper contract",
        ctx: {
          office: "Procurement has found a supplier 18% cheaper than your current one. They want you to sign a 12-month exclusive contract by Friday to lock in the price. You've never used them.",
          site: "Procurement has found a subcontractor 18% cheaper than your current one. They want you to sign a 12-month exclusive contract by Friday to lock in the rate. You've never used them on site.",
          hybrid: "Procurement has found a service provider 18% cheaper than your current one. They want you to sign a 12-month exclusive contract by Friday to lock in the price. You've never used them.",
          mixed: "Procurement has found a supplier for all your sites who's 18% cheaper. They want you to sign a 12-month exclusive contract by Friday to lock in the price. You've never used them."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Ask for a three-month break clause or a trial, and speak to two of their clients before you sign.", fx: [4, 4, 0], why: "Twelve months exclusive is a one-way door. A break clause and two reference calls make it reversible and cost you a day, not the saving." },
          { s: "pleaser", pts: 0, t: "Sign it by Friday. The saving is significant, and procurement and finance will both be pleased.", fx: [0, 2, 2], why: "An 18% saving disappears quickly if quality drops, jobs get delayed or there's rework. You'd be locked in for a year with no way out." },
          { s: "avoider", pts: 1, t: "Say you need more time to think it over, and let the Friday deadline pass without making a decision.", fx: [-2, -4, 2], why: "Letting a deadline lapse is still a decision, just one you didn't own. Procurement will go round you next time." },
          { s: "enforcer", pts: 1, t: "Refuse. Your current supplier is reliable, and you won't risk quality to save money for finance.", fx: [-2, -2, 2], why: "Loyalty to a good supplier is reasonable, but turning down an 18% saving without even testing it looks closed-minded upstairs." }
        ],
        insight: "When a decision is hard to undo, build in a way out: break clauses, trials, references. A deadline someone else set isn't a reason to skip that.",
        coach: "What's the last thing you signed that you couldn't get out of?"
      },
      {
        id: "o3s3",
        title: "The loyal supervisor",
        ctx: {
          office: "Steve has been a supervisor for twelve years and is fiercely loyal to you. His team has had the worst results in your operation for three quarters running. Other supervisors are starting to comment.",
          site: "Steve has been a site supervisor for twelve years and is fiercely loyal to you. His section has had the worst productivity and snagging for three quarters running. Other supervisors are starting to comment.",
          hybrid: "Steve has been a team lead for twelve years and is fiercely loyal to you. His team has had the worst results in your operation for three quarters running. Other team leads are starting to comment.",
          mixed: "Steve has run a site for twelve years and is fiercely loyal to you. His site has had the worst results in your operation for three quarters running. Other supervisors are starting to comment."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Meet Steve one-to-one with the figures, ask for his view of the causes, and agree a plan and a review.", fx: [6, 8, -2], why: "Twelve years of loyalty earns him a straight conversation, not silence. Figures, curiosity and a plan respect both him and the standard." },
          { s: "avoider", pts: 0, t: "Give it another quarter. Steve has earned some patience, and the figures might pick up on their own.", fx: [-6, -8, 2], why: "Three quarters is already a pattern. The other supervisors are watching to see whether loyalty buys an exemption." },
          { s: "rescuer", pts: 1, t: "Spend more of your own time with his team each week to lift their results without making it an issue.", fx: [0, 4, -8], why: "Results may improve while you're there, but Steve never hears there's a problem, and you've now taken on a second job." },
          { s: "enforcer", pts: 1, t: "Put Steve on a formal performance improvement plan through HR, so it's handled fairly and by the book.", fx: [-10, 2, 2], why: "Going formal before you've had an honest conversation feels like a betrayal to someone this loyal. It could turn an ally into a grievance." }
        ],
        insight: "Long-serving, loyal people deserve the most honest conversation, not the most patience.",
        coach: "Whose loyalty are you trading against the standard?"
      },
      {
        id: "o3s4",
        title: "Moving people for the big job",
        twoStep: true,
        ctx: {
          office: "A big new contract starts in two weeks and needs six experienced people. You could move two from each of three teams. You don't yet know exactly how hard each team will be hit.",
          site: "A big new job starts in two weeks and needs six experienced operatives. You could move two from each of three crews. You don't yet know exactly how hard each crew will be hit.",
          hybrid: "A big new contract starts in two weeks and needs six experienced people. You could move two from each of three teams. You don't yet know exactly how hard each team will be hit.",
          mixed: "A big new job on a new site starts in two weeks and needs six experienced people. You could move two from each of three sites. You don't yet know exactly how hard each site will be hit."
        },
        q: "Step 1: You're about 70% confident in the split. What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Make the call this week, explain why to the supervisors, and agree a two-week review to rebalance.", fx: [4, 8, 2], why: "Two weeks' notice lets teams plan. A review point turns a 70% decision into a safe one, and explaining it reduces the pushback.", next: "You make the move. By week two it's mostly working, but one supervisor is unhappy." },
          { s: "avoider", pts: 0, t: "Wait until the job is about to start, so you have the latest information before moving anyone.", fx: [-4, -8, 0], why: "Leaving it to the last minute means nobody gets time to plan, and you end up deciding in a panic anyway.", next: "You move people at two days' notice. Everyone is rushed, and one supervisor is very unhappy." },
          { s: "pleaser", pts: 1, t: "Ask each supervisor who they can spare, and take whoever they offer for the new job, no questions.", fx: [2, -6, 0], why: "Supervisors will give up their least experienced people. The biggest new job starts with the weakest team.", next: "The new job struggles, and you have to take stronger people anyway. One supervisor is upset." },
          { s: "rescuer", pts: 1, t: "Take fewer from each team and cover the gap on the new job yourself until things have settled down.", fx: [2, 0, -10], why: "You can't run the operation and be a sixth of a team on the new job. Both will suffer.", next: "You're stretched across everything. By week two a supervisor complains." }
        ],
        step2: {
          q: "Step 2: One supervisor says you took his two best people and his team is now struggling.",
          options: [
            { s: "leader", pts: 3, t: "Hear him out privately, explain why, and agree what support or rebalancing he gets at the review.", fx: [8, 4, -2], why: "You don't have to undo the decision, but he needs to be heard, understand your reasoning and get something concrete." },
            { s: "pleaser", pts: 1, t: "Send one of his people straight back to him, so he feels supported and his team is able to recover.", fx: [4, -6, 0], why: "It fixes his problem and creates one on the new job. Everyone else learns that complaining loudest gets results." },
            { s: "enforcer", pts: 0, t: "Remind him the new contract is the business priority, and every team has had to give something up.", fx: [-8, 2, 2], why: "True, but it dismisses him. He'll stop flagging problems, and you'll find out about the next one too late." },
            { s: "avoider", pts: 1, t: "Tell him you'll look at it properly at the review, then move on to the next item on the agenda.", fx: [-4, 0, 2], why: "The review is the right place to rebalance, but brushing him off now leaves him feeling unheard for two weeks." }
          ]
        },
        insight: "Decide early, set a review date, and talk to whoever loses out first. That keeps operational moves from damaging trust.",
        coach: "Who lost out from your last big decision, and did you tell them why yourself?"
      }
    ]
  }
  ]
};
export default OPS;
