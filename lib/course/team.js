// True Plumb Execution Sprint · Team Leaders track
// Styles: leader (best), rescuer (does it all themselves), pleaser (keeps everyone happy),
// enforcer (rules and rank), avoider (delays or dodges).
// pts: 3 best, 2 defensible, 1 risky, 0 trap. fx: change to Trust, Delivery, You (your capacity).
const COURSE = {
  track: "Team Leaders",
  settings: {
    office: { label: "Office-based", hint: "Your team works together in one office or building." },
    site: { label: "Site-based", hint: "You lead a crew or shift on a site, floor, depot or plant." },
    hybrid: { label: "Hybrid (home & office)", hint: "Your team is split between home, office and video calls." },
    mixed: { label: "Hybrid (office & site)", hint: "You split your week between the office and one or more sites." }
  },
  styles: {
    leader: { name: "Leader", line: "Deals with it early, directly and fairly, and keeps both the work and the people moving." },
    rescuer: { name: "Rescuer", line: "Takes the weight off everyone else by carrying it yourself. Feels kind; ends in burnout and a team that never grows." },
    pleaser: { name: "Pleaser", line: "Keeps people happy in the moment. Trades tomorrow's trust and delivery for today's comfort." },
    enforcer: { name: "Enforcer", line: "Reaches for rules, rank or records first. Gets compliance, loses goodwill and honesty." },
    avoider: { name: "Avoider", line: "Waits, hints or hands the problem back. Small issues quietly become big ones." }
  },
  days: [
  {
    n: 1,
    title: "Hold the Line",
    tool: "The 90-Second Reset",
    minutes: 15,
    lesson: [
      { h: "The squeeze", p: "Team leaders get pushed from both sides. Your boss adds work. Your team brings you problems. The easy move is to say yes upward and fix things downward. Both feel helpful, and both slowly break the team." },
      { h: "The 90-Second Reset", p: "When you need to say no, or not yet: Acknowledge what they need. Anchor on what you're already committed to, as a plain fact. Pivot to what you can offer, and hand them the choice." },
      { h: "Hand problems back", p: "When someone brings you a problem they could own, ask: \"What do you think we should do?\" Agree who owns it and when you'll hear back. Taking it off them feels quick and costs you twice." },
      { h: "Say it early, privately and specifically", p: "Small issues are cheapest in week one. Talk to the person, not the whole team. Name what you saw, ask what's going on, and agree what happens next." }
    ],
    mission: "Use the 90-Second Reset once in the next two working days, upward or downward. Write the exact words you plan to say.",
    scenarios: [
      {
        id: "d1s1",
        title: "The mate who's slipping",
        ctx: {
          office: "You were promoted to lead the team you used to be part of. Dan, your closest mate on the team, has walked in at 9:15 three times this week while everyone else is already on the phones. Two people have made comments.",
          site: "You were promoted to lead the crew you used to work in. Dan, your closest mate on the crew, has turned up after the 7:30 briefing three times this week and missed the start-of-day safety talk twice. Two of the crew have made comments.",
          hybrid: "You were promoted to lead the team you used to be part of. Dan, your closest mate on the team, has joined the 9am stand-up late three times this week with his camera off. Two people have mentioned it in chat.",
          mixed: "You were promoted to lead the team you used to be part of, and you split your week between the office and site. Dan, your closest mate on the team, has turned up late to site three times this week, on days you were in the office. The site lead and one of the crew have both mentioned it to you."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Have a private word with him today. Say what you've seen, ask what's going on, and agree what on time means.", fx: [8, 4, -2], why: "It's early and private, and it treats Dan as an adult. Asking first might uncover a real reason, and agreeing the standard resets the friendship and the working relationship in one go." },
          { s: "pleaser", pts: 1, t: "Remind the whole team at the next briefing that start times apply to everyone, so nobody feels singled out.", fx: [-6, 0, 0], why: "Everyone knows who it's aimed at, including Dan. The people who are on time feel scolded, and the one person who needed the message can tell himself it wasn't for him." },
          { s: "enforcer", pts: 1, t: "Log the late starts and send him a short written note, so there's a clear record in place if it carries on.", fx: [-8, 2, 0], why: "A written note before any conversation says 'I'm your boss now, not your mate.' You may need records later, but leading with paperwork kills the honest talk you need first." },
          { s: "avoider", pts: 0, t: "Leave it for now. He's a good worker, and raising it so soon after your promotion could look like a power trip.", fx: [-10, -4, 2], why: "The team is watching what you do about your mate. Doing nothing tells them the rules bend for friends, which is the fastest way to lose a team you've just taken over." }
        ],
        insight: "Your first test as a new leader is usually a friend. The team doesn't need you to be harsh. They need to see the same standard for everyone.",
        coach: "Who on your team are you most likely to let off, and why?"
      },
      {
        id: "d1s2",
        title: "Friday's extra job",
        ctx: {
          office: "Your manager stops by: \"Need your team to pull together a client audit pack by Friday.\" Your team is already flat out on month-end, which is also due Friday.",
          site: "Your manager rings: \"I need your crew to get the next area ready for handover by Friday.\" Your crew is already stretched finishing the current section, which is also due Friday.",
          hybrid: "Your manager messages: \"Can your team produce a new client report by Friday?\" Two of your team are on leave this week and the rest are flat out on a deadline that's also Friday.",
          mixed: "You're in the office when your manager stops by: \"I need your lot to get the next area ready for handover by Friday.\" Your team on site is already stretched finishing the current section, which is also due Friday, and you're only out there two days this week."
        },
        q: "What's your reply?",
        options: [
          { s: "leader", pts: 3, t: "Say you can deliver it, then show them what has to slip to make room, and ask them to choose which job moves.", fx: [6, 6, 4], why: "That's the 90-Second Reset. You haven't refused, so you stay helpful, but the trade-off is now visible and the person who owns the priorities makes the call." },
          { s: "pleaser", pts: 1, t: "Agree to Friday and ask the team for one big push. They've pulled through before, and your boss will remember it.", fx: [-6, 2, -2], why: "It might work this once. But 'one big push' becomes the normal way of working, and your team learns that your yes costs them their evenings." },
          { s: "rescuer", pts: 1, t: "Agree to Friday and do the extra work yourself in the evenings, so the team's current workload isn't touched.", fx: [2, 2, -12], why: "It protects the team this week, but nobody upstairs sees what it really cost. Next time they'll ask again, because last time it was 'fine'." },
          { s: "enforcer", pts: 2, t: "Push back firmly. Tell them the team is at full capacity and it can't be done this week without extra people.", fx: [2, -2, 4], why: "It's honest, and it protects the team. But a flat no with no options puts your boss on the defensive. Offering the choice gets the same protection with less friction." }
        ],
        insight: "Your boss can't see your team's workload unless you show it. A yes with no trade-off hides the cost. A no with no options starts a fight.",
        coach: "When did you last say yes upward and quietly pay for it yourself?"
      },
      {
        id: "d1s3",
        title: "\"Can you sort it?\"",
        ctx: {
          office: "Priya, one of your most experienced people, walks over: \"The booking system's double-booked again and the customer's kicking off. Can you sort it?\" She has handled this before.",
          site: "Priya, one of your most experienced hands, finds you: \"The delivery's come with the wrong materials and the gang's stood waiting. Can you sort it?\" She knows the supplier well.",
          hybrid: "Priya, one of your most experienced people, messages: \"Client says the shared files are out of date and they're chasing. Can you sort it?\" She set those files up.",
          mixed: "You're in the office when Priya, one of your most experienced people, rings from site: \"The delivery's come with the wrong materials and the gang's stood waiting. Can you sort it?\" She knows the supplier well."
        },
        q: "What do you say?",
        options: [
          { s: "leader", pts: 3, t: "Ask what she thinks the fix is, agree that she owns it, and set a time today for her to tell you how it went.", fx: [6, 4, 6], why: "She almost certainly knows the answer. Asking for her fix builds her confidence, keeps the problem with the person closest to it, and the check-in means it doesn't fall through the cracks." },
          { s: "rescuer", pts: 1, t: "Take it off her and deal with it yourself. You know the right contacts, and it'll be done in about ten minutes.", fx: [0, 4, -8], why: "Ten minutes today, and every similar problem lands on you from now on. You've taught your most capable person that the fix is to bring it to you." },
          { s: "avoider", pts: 0, t: "Tell her you'll look at it as soon as you're free, so she knows it's in hand and can crack on with her day.", fx: [-4, -8, -2], why: "Now nobody's working on it. The customer, the crew or the client keeps waiting, and when you finally get to it, you're fixing it under more pressure than before." },
          { s: "enforcer", pts: 1, t: "Tell her it's her job to sort out problems like that, and she really shouldn't need to bring them to you.", fx: [-8, 2, 4], why: "You're right that she can handle it, but saying it that way makes her feel told off for asking. Next time she'll stay quiet about something you actually needed to hear." }
        ],
        insight: "Most problems that land on your desk can go back to the person who brought them, as long as you ask for their fix and agree when you'll hear back.",
        coach: "What problem do you keep taking on that someone else could own?"
      },
      {
        id: "d1s4",
        title: "Going round you",
        twoStep: true,
        ctx: {
          office: "A manager from another department has started giving Sam, one of your team, jobs directly. Sam's own work is now running late, and Sam hasn't said anything to you.",
          site: "The main contractor's manager has been pulling two of your crew onto his jobs without asking you. Your programme is slipping, and your crew didn't feel they could say no.",
          hybrid: "A senior manager has been messaging Sam directly on Teams with 'urgent' requests. Sam's own work is now running late, and Sam hasn't raised it.",
          mixed: "The client's site manager has been pulling two of your team onto his jobs on the days you're in the office. Your programme is slipping, and they didn't feel they could say no without you there."
        },
        q: "Step 1: What do you do first?",
        options: [
          { s: "leader", pts: 3, t: "Speak to the manager directly. Agree that requests come through you, and offer a fast lane for urgent ones.", fx: [6, 6, 0], why: "This deals with the cause, not just the symptom. Offering a fast lane for genuinely urgent requests means you're making things easier for them, not putting up a wall.", next: "The manager agrees, a little surprised, and says that from now on requests will come through you." },
          { s: "avoider", pts: 1, t: "Tell Sam to say he's busy next time, so you don't end up falling out with someone more senior than you.", fx: [-6, 0, 2], why: "You've handed your job to the most junior person in the situation. Sam now has to refuse a senior manager on his own, which is exactly what he couldn't do in the first place.", next: "Sam tries it once. The manager goes over his head and messages him again an hour later." },
          { s: "pleaser", pts: 0, t: "Let it go. Keeping a senior manager on side is worth more to you than a few late jobs on your team's list.", fx: [-6, -8, 0], why: "Those 'few late jobs' are your team's work. Your team notices that their priorities come second whenever someone senior asks, and nothing changes.", next: "Nothing changes. Sam's own work slips further, and he's starting to look stressed." },
          { s: "enforcer", pts: 1, t: "Email the manager's boss with the impact on your deadlines, so it's on record and somebody puts a stop to it.", fx: [0, 4, 0], why: "It might stop it, but going over someone's head before speaking to them makes a lasting enemy of a peer you'll need later.", next: "The requests stop, but the manager now ignores your emails and leaves you out of a planning meeting." }
        ],
        step2: {
          q: "Step 2: A few days later, Sam has an urgent job for that manager and an urgent job for you, both due by 3pm. He asks you which one to do.",
          options: [
            { s: "leader", pts: 3, t: "Decide for him now. Tell him which one comes first, and you go and tell the manager what's happening.", fx: [8, 4, -2], why: "Deciding priorities is the leader's job, not Sam's. You make the decision and you deliver the awkward message yourself, which is what protects him." },
            { s: "avoider", pts: 0, t: "Tell Sam to use his own judgement. He knows both jobs better than you, and you trust him to make the call.", fx: [-8, -2, 2], why: "It sounds like trust, but it hands him a political decision he can't win. Whichever he chooses, someone senior is unhappy with him, not you." },
            { s: "rescuer", pts: 1, t: "Tell Sam to do the manager's job, and you'll finish your own team's job yourself before three.", fx: [2, 2, -10], why: "Everything gets done today, but you've taught everyone that the fix for a clash is you working twice as hard. It doesn't scale past this week." },
            { s: "pleaser", pts: 0, t: "Ask Sam to try to get both done by three, and say you'll back him up if one of them ends up running late.", fx: [-4, -6, 0], why: "This dodges the decision and leaves Sam carrying it. When both jobs end up half done, he takes the blame, and your offer to back him up doesn't help much." }
          ]
        },
        insight: "When someone goes round you, sort it out with them directly, and make it easy for them to work with you. When two priorities clash, you decide. Never leave your team member to choose.",
        coach: "Who in your workplace goes round you, and what would make it easier for them to come through you?"
      }
    ]
  },
  {
    n: 2,
    title: "Protect the Team's Capacity",
    tool: "Drain, Neutral, Fuel",
    minutes: 15,
    lesson: [
      { h: "Energy is the real budget", p: "Hours are fixed, but energy isn't. Some tasks drain you, some are neutral and some give energy back. A team leader runs on energy for themselves and for everyone else." },
      { h: "Heaviest drain first", p: "Do the hardest thinking job while your battery is full, usually first thing. Batch neutral tasks like email and admin into one block. Protect one fuel moment a day." },
      { h: "Delegate the outcome, not the task", p: "Hand over what 'done' looks like, give a short walkthrough, and agree a check-in. You can hand over the work, but you can't hand over the responsibility." },
      { h: "Spot the quiet drain", p: "Your most reliable people burn out the quietest. Watch for changes: late finishes, short tempers, going quiet. Ask early and privately." }
    ],
    mission: "Hand one recurring task to a team member this week, with a 15-minute walkthrough and a check-in date. Write down the task, the person and the date.",
    scenarios: [
      {
        id: "d2s1",
        title: "The 8am list",
        ctx: {
          office: "It's 8am and you're at your desk. Your list: prepare for a difficult one-to-one at 2pm, 34 unread emails, next week's rota, a report for your boss due Wednesday. Jordan pops over: \"Got two minutes?\"",
          site: "It's 7am in the cabin. Your list: prepare for a difficult one-to-one at 1pm, a pile of messages and texts, next week's labour plan, a report for your boss due Wednesday. Jordan sticks his head in: \"Got two minutes?\"",
          hybrid: "It's 8am at your laptop. Your list: prepare for a difficult one-to-one on video at 2pm, 34 unread messages, next week's rota, a report for your boss due Wednesday. Jordan pings: \"Got two minutes for a quick call?\"",
          mixed: "It's 8am and you're in the office before heading to site at 11. Your list: prepare for a difficult one-to-one at 2pm on site, 34 unread emails, next week's labour plan, a report for your boss due Wednesday. Jordan rings: \"Got two minutes?\""
        },
        q: "How do you start the day?",
        options: [
          { s: "leader", pts: 3, t: "Check in sixty seconds whether Jordan's issue is really urgent, then lock in an hour on the one-to-one prep.", fx: [4, 6, 6], why: "You don't brush Jordan off, but you don't let 'two minutes' take over the morning either. The hardest job gets your best energy, which is when a difficult conversation needs the most thought." },
          { s: "avoider", pts: 1, t: "Clear the inbox first so nothing urgent slips through, then get into the bigger jobs with a clear head.", fx: [0, 0, -6], why: "Email feels productive, but it's reacting to other people's priorities. Your freshest hour goes on low-value work, and the one-to-one gets your tired 1:45 brain." },
          { s: "rescuer", pts: 2, t: "Sit down with Jordan properly first, because people come before tasks, then work through the rest of the list.", fx: [4, -2, -4], why: "The instinct is good, and sometimes it's right. But you didn't check whether it was urgent. Ten minutes becomes forty, and the conversation you most need to prepare for gets squeezed." },
          { s: "pleaser", pts: 1, t: "Start the boss's report first because it's the most visible job, and leave the one-to-one prep for later.", fx: [-2, 2, -2], why: "It's due Wednesday, not today. Working on whatever your boss will see first means the hard conversation is the thing that gets rushed." }
        ],
        insight: "Choose the hardest job for your best hour on purpose. Check urgency quickly instead of assuming.",
        coach: "What's the 'drain' job you keep pushing to the end of the day?"
      },
      {
        id: "d2s2",
        title: "Quicker to do it yourself",
        ctx: {
          office: "You do the weekly figures report in one hour. Jordan has asked to take on more. The first time, it would take him about three hours, and he'd probably make mistakes.",
          site: "You put the weekly programme and look-ahead together in one hour. Jordan, one of your leading hands, wants to step up. The first time, it would take him about three hours, and he'd probably make mistakes.",
          hybrid: "You write the weekly client update in one hour. Jordan has asked to take on more. The first time, it would take him about three hours, and he'd probably make mistakes.",
          mixed: "You put the weekly programme and look-ahead together in the office in one hour. Jordan, who runs things on site when you're not there, wants to step up. The first time, it would take him about three hours, and he'd probably make mistakes."
        },
        q: "What do you do with it?",
        options: [
          { s: "leader", pts: 3, t: "Hand it to Jordan this week with a 15-minute walkthrough, and check his first draft before it goes out.", fx: [8, 2, 6], why: "It costs more this week and saves you about fifty hours a year. The walkthrough and the draft check stop the mistakes reaching anyone outside the team." },
          { s: "rescuer", pts: 1, t: "Keep doing it yourself for now. It's quicker, and you'll hand it over once things have calmed down.", fx: [-4, 2, -6], why: "Things never calm down. 'Quicker to do it myself' is how team leaders end up as the bottleneck, while their keenest people get bored and leave." },
          { s: "avoider", pts: 1, t: "Give it to Jordan with last week's copy as a guide, and let him learn it by working it out himself.", fx: [0, -6, 4], why: "That's dumping the task, not delegating it. He'll copy last week's mistakes along with the format, and the first time you'll find out is when someone else complains." },
          { s: "enforcer", pts: 1, t: "Give Jordan one small part to start with, and check every line yourself until it's perfect each week.", fx: [-6, 4, -4], why: "Starting small is fine, but checking every line forever tells him you don't trust him. It also keeps the job on your desk anyway." }
        ],
        insight: "Delegating costs time up front. Each week you put it off costs you the same hour again.",
        coach: "What's one thing only you do that someone on your team could learn in a fortnight?"
      },
      {
        id: "d2s3",
        title: "The quiet one",
        ctx: {
          office: "Chris is your most reliable person. For two weeks Chris has stayed late every night, been short with colleagues and gone quiet in meetings. You need Chris on a big job next week.",
          site: "Chris is your most reliable hand. For two weeks Chris has stayed on after the crew leaves, been short with the apprentices and gone quiet at briefings. You need Chris on a big job next week.",
          hybrid: "Chris is your most reliable person. For two weeks Chris has been online at 10pm, sent short replies in chat and kept the camera off in meetings. You need Chris on a big job next week.",
          mixed: "Chris runs things on site on the days you're in the office, and is your most reliable person. For two weeks Chris has stayed on after everyone leaves, been short with the apprentices on the phone and gone quiet on your site visits. You need Chris on a big job next week."
        },
        q: "What's your move?",
        options: [
          { s: "leader", pts: 3, t: "Find a private moment, say what you've noticed without judging, and ask what would help this week.", fx: [10, 2, -2], why: "Saying what you've noticed, without guessing at the reason, opens the door. Asking 'what would help?' gives Chris some control back, which is what overloaded people are usually missing." },
          { s: "pleaser", pts: 1, t: "Thank Chris in front of the team for all the extra effort. Feeling valued might be exactly what's needed.", fx: [-2, 2, 0], why: "Public praise for working late rewards the very thing that's wearing Chris down, and tells the rest of the team that late nights are what gets noticed." },
          { s: "enforcer", pts: 1, t: "Tell Chris to stop the late finishes and stick to normal hours from now on, for their own good.", fx: [-4, -2, 2], why: "You've set a rule but haven't removed any work. Chris now has the same load and less time to do it in, so the stress goes up." },
          { s: "rescuer", pts: 2, t: "Quietly move some of Chris's work onto your own list, so the load is lighter without making a fuss.", fx: [2, 2, -8], why: "Kind, and it might help this week. But you're guessing at the problem, and you've added to your own load. It could be home life rather than workload." }
        ],
        insight: "Your best people burn out the quietest. Say what you've noticed, then ask. Don't guess at the fix.",
        coach: "Who on your team is quieter than usual right now?"
      },
      {
        id: "d2s4",
        title: "The 2pm crunch",
        twoStep: true,
        ctx: {
          office: "It's 2pm. You're two people short, behind on today's target, and running on empty. Your boss calls: \"Quick one: can you pull some numbers for me?\" It's about an hour's work.",
          site: "It's 2pm. You're two people short, behind on today's target, and running on empty. Your boss rings: \"Quick one: can you price up a variation for me?\" It's about an hour's work.",
          hybrid: "It's 2pm. Two people are off sick, you're behind on today's target, and you've been on calls since 8. Your boss messages: \"Quick one: can you pull some numbers for me?\" It's about an hour's work.",
          mixed: "It's 2pm. You're on site, two people short, behind on today's target, and running on empty after the drive in. Your boss rings from the office: \"Quick one: can you price up a variation for me?\" It's about an hour's work."
        },
        q: "Step 1: How do you respond to your boss?",
        options: [
          { s: "leader", pts: 3, t: "Ask if it can wait until first thing tomorrow, and explain today's priority to them in one sentence.", fx: [4, 6, 6], why: "Most 'quick ones' aren't urgent. You've asked the question, given the reason, and left your boss to decide with the full picture.", next: "Your boss says first thing tomorrow is fine. You go back to the team." },
          { s: "rescuer", pts: 1, t: "Do the boss's request now yourself, then stay on late to help the team catch up on today's target.", fx: [2, 2, -10], why: "Your boss gets their numbers, the team gets help, and you get a 9pm finish on an empty tank. That's how mistakes happen on day two.", next: "You get the request done, but the team has been without you for an hour." },
          { s: "pleaser", pts: 1, t: "Say yes, and pass the request to your most capable team member, even though they're stretched too.", fx: [-6, -2, 2], why: "You've moved the overload onto your best person without asking or explaining. Your boss is happy, but your team is down another pair of hands.", next: "Your strongest person is pulled away for an hour and the target slips further." },
          { s: "avoider", pts: 0, t: "Say yes, then quietly leave it till the end of the day and hope it isn't actually needed straight away.", fx: [-4, -4, -4], why: "Now it's hanging over you all afternoon, and if it was needed at 3pm you've let your boss down without warning them.", next: "At 3:30 your boss chases the numbers. You still haven't started them." }
        ],
        step2: {
          q: "Step 2: At 4pm it's clear today's target will be missed by about 20%.",
          options: [
            { s: "leader", pts: 3, t: "Tell your manager now: what will get done today, what won't, and when the rest will be finished.", fx: [6, 6, 4], why: "Bad news delivered early, with a plan, builds trust. Your manager can adjust their own plans instead of finding out tomorrow." },
            { s: "rescuer", pts: 1, t: "Roll your sleeves up and work alongside the team to close the gap, even if it means a late finish.", fx: [4, 2, -10], why: "It's admirable, and it might close half the gap. But nobody above you knows there's a problem, and tomorrow you start with no energy left." },
            { s: "enforcer", pts: 0, t: "Get the team together and make it clear the target is the target, and you expect it to be hit today.", fx: [-10, 0, 0], why: "They were already two people short and doing their best. Pressure without extra resource only breeds resentment, and quality drops to make the numbers." },
            { s: "avoider", pts: 1, t: "Say nothing yet. Get done what you can today, and explain the shortfall in tomorrow's update instead.", fx: [-2, -6, 2], why: "It feels calmer, but your manager finds out late and with no time to react. Next time they'll start checking up on you." }
          ]
        },
        insight: "Protecting your team's capacity means asking 'can it wait?' upward, and giving bad news early with a plan.",
        coach: "What's the earliest point you could have flagged your last missed target?"
      }
    ]
  },
  {
    n: 3,
    title: "Make the Call",
    tool: "One-Way and Two-Way Doors",
    minutes: 15,
    lesson: [
      { h: "Two kinds of decision", p: "A one-way door can't easily be undone: signing off safety, money, people's jobs or someone's data. A two-way door can be reversed: a new meeting format, a trial rota, a different supplier for one order." },
      { h: "The 70% Rule", p: "For two-way doors, decide once you're about 70% sure, and set a date to review. Waiting for certainty costs more momentum than a small correction does." },
      { h: "Slow down for one-way doors", p: "When it can't be undone, pressure is not a reason. Check the gap yourself, and tell people exactly when you'll be done." },
      { h: "Explain your reasoning", p: "People accept decisions they disagree with when they understand why the decision was made. Share the 'why', listen properly, and say what would change your mind." }
    ],
    mission: "Pick one decision you've been sitting on. Decide whether it's a one-way or two-way door. Make the call or set a date, and tell the person it affects.",
    scenarios: [
      {
        id: "d3s1",
        title: "The meeting nobody likes",
        ctx: {
          office: "For weeks you've wanted to swap the team's 45-minute Monday meeting for a 15-minute daily huddle. A couple of the longest-serving people have grumbled whenever it comes up.",
          site: "For weeks you've wanted to change the morning briefing into a quicker, standing ten-minute huddle with a clear plan for the day. A couple of the old hands have grumbled whenever it comes up.",
          hybrid: "For weeks you've wanted to swap the team's hour-long Monday video call for a 15-minute daily check-in. A couple of the longest-serving people have grumbled whenever it comes up.",
          mixed: "For weeks you've wanted to swap the long Monday office meeting for a 15-minute call each morning that the site joins too. A couple of the old hands have grumbled whenever it comes up."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Run it as a two-week trial, tell the team that's what it is, and review it with them together at the end.", fx: [6, 6, 2], why: "It's a two-way door, so treat it like one. A trial lowers resistance, gives you real evidence instead of opinions, and the review gives the grumblers a proper say." },
          { s: "avoider", pts: 0, t: "Wait until everyone's on board, because a change the team resists will only create more friction.", fx: [-2, -6, -2], why: "'Everyone on board' rarely happens. Meanwhile the meeting everyone dislikes carries on, and the team learns that grumbling is enough to block change." },
          { s: "enforcer", pts: 1, t: "Bring in the new format from Monday. You're the team leader now, and someone has to make the decision.", fx: [-6, 4, 2], why: "You're right that someone has to decide, but calling it permanent turns a small change into a power struggle. You'll spend the next month defending it." },
          { s: "pleaser", pts: 1, t: "Put three options to a team vote and go with whatever most people choose, even if it's the old way.", fx: [2, -4, 0], why: "It sounds fair, but a vote lets you avoid owning a decision you already believe in. And if the old way wins, you're stuck with it." }
        ],
        insight: "Most of the things you're stuck on are two-way doors. Call it a trial, set a review date, and get going.",
        coach: "What change have you been waiting for 'everyone to agree' on?"
      },
      {
        id: "d3s2",
        title: "Sign it off",
        ctx: {
          office: "Finance needs your sign-off on a supplier payment by 4pm or it misses this month's run. One figure doesn't match the paperwork, and the person who prepared it is adamant it's fine.",
          site: "The client wants an area signed off as ready and safe to hand over by 4pm. You haven't personally seen one section, and the supervisor who checked it is adamant it's fine.",
          hybrid: "A client data release needs your sign-off by 4pm. One file hasn't been checked by you, and the colleague who prepared it is adamant it's fine.",
          mixed: "You're in the office. The client wants an area signed off as ready and safe to hand over by 4pm. You haven't personally seen one section since last week, and the supervisor on site who checked it is adamant it's fine."
        },
        q: "It's 3:15. What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Hold the sign-off until you've checked the gap yourself, and tell them now when you'll be finished.", fx: [4, 2, 0], why: "This is a one-way door: money, safety or data. You only check the gap, not the whole thing, and telling them up front exactly when you'll be done takes the drama out of the delay." },
          { s: "pleaser", pts: 0, t: "Sign it off. The person who did the work is reliable, and delaying it will cause a lot of upset.", fx: [2, 4, 0], why: "Usually it'll be fine, and that's the trap. Your signature says you've checked it. If it goes wrong, 'they said it was fine' won't protect anyone." },
          { s: "avoider", pts: 0, t: "Sign it off with a note saying one part wasn't personally checked, so the responsibility is shared.", fx: [-2, 2, 0], why: "A signature with a disclaimer gives no real assurance. It protects your name on paper while the risk carries on." },
          { s: "enforcer", pts: 1, t: "Refuse to sign until the whole job has been redone and rechecked from scratch, to be completely sure.", fx: [-8, -6, -2], why: "The caution is right, but this goes far too far. Redoing everything punishes the person who did good work and turns a one-hour check into a week's delay." }
        ],
        insight: "For one-way doors, a deadline isn't a reason. Check the gap, not the whole job, and give an exact finish time.",
        coach: "Where are you signing things you haven't actually checked?"
      },
      {
        id: "d3s3",
        title: "The popular one",
        ctx: {
          office: "Lee is well liked and has been on the team for years. For six weeks Lee's work has had errors, and others have quietly been fixing them. One of them has just come to you about it.",
          site: "Lee is well liked and has been on the crew for years. For six weeks Lee's work has needed snagging, and others have quietly been putting it right. One of them has just come to you about it.",
          hybrid: "Lee is well liked and has been on the team for years. For six weeks Lee's work has had errors, and others have quietly been fixing it before clients see it. One of them has just messaged you about it.",
          mixed: "Lee is well liked and has been on the team for years. For six weeks Lee's work has needed putting right, mostly on days you're in the office. Others on site have quietly been fixing it, and one of them has just rung you about it."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Meet one-to-one with specific examples, ask for Lee's view, and agree a standard and review date.", fx: [6, 8, -2], why: "Specific examples stop it being a matter of opinion. Asking for Lee's view gives them a chance to explain, and the review date makes sure it doesn't just fade away." },
          { s: "avoider", pts: 0, t: "Give it a few more weeks. Lee's had a tough year, and the team seem happy enough to help out.", fx: [-8, -6, 2], why: "They're not happy. Someone has just told you so. Waiting leaves the people doing the extra work unprotected and lets the standard keep slipping." },
          { s: "enforcer", pts: 1, t: "Pass it straight to HR as a performance issue, so it's handled properly and done by the book.", fx: [-8, 2, 4], why: "HR may be needed later, but going there first, before you've had a single conversation, turns a fixable issue into a formal process and frightens Lee." },
          { s: "rescuer", pts: 1, t: "Quietly redo the work that falls short yourself, so the customer and the team aren't affected.", fx: [2, 2, -10], why: "You're now the third person covering for Lee. Lee still doesn't know there's a problem, so nothing will change." }
        ],
        insight: "A difficult conversation needs specific examples, curiosity about the reasons and a follow-up date. Avoiding it isn't kind to anyone, Lee included.",
        coach: "Whose standards have you been quietly covering for?"
      },
      {
        id: "d3s4",
        title: "70% sure",
        twoStep: true,
        ctx: {
          office: "Next week's deadline needs about 20 more hours than your team has. You could approve overtime or bring in a temp. Your manager is away until Thursday, and the deadline is Friday.",
          site: "Next week needs about two more people than you have. You could put your own crew on overtime or bring in agency labour. Your manager is away until Thursday, and the deadline is Friday.",
          hybrid: "Next week needs about 20 more hours than your team has. You could approve overtime or bring in a freelancer. Your manager is away until Thursday, and the deadline is Friday.",
          mixed: "Next week needs about two more people on site than you have. You could put your own team on overtime or bring in agency labour. Your manager is away until Thursday, and the deadline is Friday."
        },
        q: "Step 1: You're about 70% sure the temporary help is the better option. What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Make the call today on what you know now, and set a check-in on Wednesday to review it and adjust.", fx: [4, 8, 4], why: "It's within your authority and it's a two-way door: you can stop the temp or add overtime later. The Wednesday check turns 70% into a safe decision.", next: "You bring in temporary help. By Wednesday it's working, and you're on track." },
          { s: "avoider", pts: 0, t: "Wait for your manager to get back on Thursday. It's a spending decision and you don't want it wrong.", fx: [0, -10, 0], why: "By Thursday the choice has gone, because there's no time left to bring anyone in. Not deciding was still a decision, and it was the expensive one.", next: "On Thursday your manager asks why you didn't just sort it. You're now a day behind." },
          { s: "pleaser", pts: 1, t: "Ask the team which option they'd prefer and go with the majority, so everyone is behind the decision.", fx: [2, -2, 0], why: "Asking for input is good, but people who'd earn the overtime will vote for overtime. You've handed over a decision that was yours to make.", next: "The team votes for overtime. By Wednesday they're tired and the work is behind." },
          { s: "rescuer", pts: 1, t: "Avoid the spend and cover the gap yourself with extra hours, so there's no decision to get wrong.", fx: [0, 2, -12], why: "Twenty hours of you is a week of 14-hour days. You've avoided making a decision by spending your own health on it.", next: "You cover the gap yourself. By Wednesday you're exhausted, and things are starting to slip." }
        ],
        step2: {
          q: "Step 2: Wednesday. One of your team tells you the decision was unfair to them, because they needed the extra money.",
          options: [
            { s: "leader", pts: 3, t: "Hear them out in private, explain your reasoning, and say what you'd weigh differently next time.", fx: [8, 2, -2], why: "You don't have to reverse the decision to respect the person. Explaining your reasoning and being open about next time is what keeps their trust." },
            { s: "pleaser", pts: 1, t: "Offer them some overtime next week anyway, so they feel looked after and the complaining stops.", fx: [2, -2, 0], why: "It eases things today and teaches the team that complaining gets results. You've created a new expectation without meaning to." },
            { s: "enforcer", pts: 0, t: "Remind them it was your decision to make, and that you made it for the good of the team as a whole.", fx: [-8, 0, 2], why: "It's true, but it shuts them down. They'll stop telling you when something feels unfair, and you'll lose the early warnings." },
            { s: "avoider", pts: 0, t: "Say you understand, then change the subject. It's done now, and dwelling on it won't help anyone.", fx: [-6, 0, 2], why: "They'll notice you didn't really listen. The grievance doesn't go away; it just goes quiet and spreads around the team." }
          ]
        },
        insight: "At 70% sure, make the call and set a review date. Afterwards, explain your reasoning. You don't have to undo the decision to respect the people it affected.",
        coach: "Which decision are you waiting on someone else for, when it's actually yours to make?"
      }
    ]
  }
  ]
};
export default COURSE;
