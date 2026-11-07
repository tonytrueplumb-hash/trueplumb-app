// True Plumb Execution Sprint · Directors track (SME directors and owner-directors)
const DIRECTORS = {
  track: "Directors",
  days: [
  {
    n: 1,
    title: "Lead Through Your Managers",
    tool: "Decision Rights",
    minutes: 15,
    lesson: [
      { h: "You built it by doing", p: "Most SME directors got there by being the best at the work and the fastest to decide. Past about 20 people, that strength becomes the ceiling: every decision waits for you, and your managers never grow." },
      { h: "Decision Rights", p: "For each manager, write down three lists: decisions that are theirs (don't tell me), theirs but tell me after, and ones that come to you. Review it every quarter and move things down the list." },
      { h: "Back them in public, challenge in private", p: "If you overrule a manager in front of their team, you've just made yourself their team's manager. Disagree behind a closed door." },
      { h: "Loyalty and capability are different things", p: "The people who helped you build the business aren't always the right people to run it at its next size. Being honest about that, early and kindly, is part of the job." }
    ],
    mission: "Write the three Decision Rights lists for one of your managers, and go through them with that manager this week.",
    scenarios: [
      {
        id: "r1s1",
        title: "Everything comes to you",
        ctx: {
          office: "Your operations manager brings you six or seven decisions a day: supplier choices, overtime, small client queries. You could answer each in a minute. Your own work is piling up.",
          site: "Your contracts manager rings you six or seven times a day from site: crew moves, small variations, plant hire. You could answer each in a minute. Your own work is piling up.",
          hybrid: "Your operations manager sends six or seven Teams messages a day asking for decisions: suppliers, overtime, client queries. Each takes a minute. Your own work is piling up.",
          mixed: "Your operations manager rings or messages you six or seven times a day, from the office and from site. Each decision takes a minute. Your own work is piling up."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Sit down with him and agree which decisions are his to make from now on, without asking.", fx: [6, 6, 6], why: "An hour now buys back several hours a week, and he grows into the job. Most managers who ask too much are waiting to be told they can decide.", say: "You're asking me about things you're perfectly able to decide. Let's agree which ones are yours from now on. Just tell me at our Friday catch-up what you decided." , next: "He starts deciding more for himself." },
          { s: "rescuer", pts: 0, t: "Keep answering. It only takes a minute each, and it means the decisions are made the way you'd make them.", fx: [0, 2, -10], why: "Seven minutes a day is easy. Seven interruptions a day is not. And he'll never make a decision you haven't approved, which means you can never step away." , next: "The calls continue, until one day you're unreachable and he has to decide himself." },
          { s: "avoider", pts: 1, t: "Start taking longer to reply, so he has to make more of the decisions himself.", fx: [-4, -4, 2], why: "He'll either keep waiting, slowing everything down, or decide nervously and wonder whether you'll overrule him. Neither builds a confident manager." , next: "He starts making some decisions himself while he waits for you." },
          { s: "enforcer", pts: 1, t: "Tell him firmly that he's paid to make decisions and you don't want to be asked about small things any more.", fx: [-6, 2, 4], why: "The message is right, but without saying which things are small, he'll guess. Expect him to decide some big things alone and still ask about small ones." , next: "He stops asking, and starts deciding for himself." }
        ],
        step2: {
          q: "Step 2: A month on, he makes a decision you wouldn't have made. A supplier choice that costs an extra £1,200.",
          options: [
            { s: "leader", pts: 3, t: "Ask him privately how he got there, share what you'd have weighed, and leave it with him.", fx: [6, 2, 2], why: "£1,200 is the price of a manager learning. Taking the decision back costs far more over a year.", say: "Talk me through the supplier choice. I'd have weighed the delivery terms a bit more, but it was your call, and it still is next time." },
            { s: "enforcer", pts: 0, t: "Tell him that supplier decisions come back to you from now on, as he's shown he's not ready.", fx: [-10, 2, -6], why: "You've told him one mistake cancels the trust, and you've got your interruptions back. He won't risk deciding anything again." },
            { s: "pleaser", pts: 1, t: "Say nothing about it. You don't want to knock his confidence just as he's starting to decide things.", fx: [2, -2, 0], why: "He won't learn what you'd have weighed differently, and he might make the same choice again on something bigger." },
            { s: "rescuer", pts: 1, t: "Quietly renegotiate with the supplier yourself to get the £1,200 back, without mentioning it to him.", fx: [-4, 2, -4], why: "You've undone his decision behind his back. When he finds out, and he will, he'll know his decisions aren't really his." }
          ]
        },
        echo: {
          0: "Two weeks on, he's down to one or two questions a day, and those are the right ones. You've cleared your backlog and had a whole afternoon on next year's plan.",
          1: "Two weeks on, the calls haven't stopped, and you're still clearing your own work at night. He's started copying you into emails 'just so you know' as well.",
          2: "Two weeks on, things are slower, and a client has mentioned that your team seems to take a while to get back to them.",
          3: "Two weeks on, he's stopped asking, but he's also made two calls you'd have wanted to know about. He's not sure which things count as small."
        },
        insight: "Managers who ask too much are usually waiting to be told what they can decide. Tell them, in writing, and then live with their decisions.",
        coach: "Which decisions do you make that someone else in the business could make just as well?"
      },
      {
        id: "r1s2",
        title: "Cut your price or we tender",
        ctx: {
          office: "Your biggest client, 30% of turnover, tells you they want 10% off next year's rates or they'll put the work out to tender. Your margin on their work is already 12%.",
          site: "Your biggest client, a main contractor worth 30% of turnover, says they want 10% off next year's rates or they'll tender the work. Your margin on their jobs is already 12%.",
          hybrid: "On a call, your biggest client (30% of turnover) says they want 10% off next year or they'll tender. Your margin on their work is 12%.",
          mixed: "Your biggest client, 30% of turnover, tells you at a site meeting that they want 10% off next year or they'll go to tender. Your margin is already 12%."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Find out what's behind it, and offer options that change the scope as well as the price.", fx: [4, 6, 0], why: "Price cuts with no change in scope come straight out of margin. Options let them save money without you working for nothing, and a quiet push for new work reduces how much power they have.", say: "I understand the pressure you're under. A straight 10% would take us close to break-even, but here are three ways to get your costs down by a similar amount. Which would help most?" },
          { s: "pleaser", pts: 0, t: "Agree to the 10%. Losing 30% of turnover would be far worse than a thinner margin on the work.", fx: [4, -8, -4], why: "You've cut your margin to 2% and shown them that threatening a tender works. They'll do it again next year." },
          { s: "enforcer", pts: 1, t: "Tell them your rates are fair and they're welcome to tender, but they won't get better quality elsewhere.", fx: [-8, -2, 2], why: "It might be true, but daring your biggest client to leave is a big bet. And you've given them no way to back down." },
          { s: "avoider", pts: 1, t: "Say you'll consider it and get back to them, then wait to see whether they actually go to tender.", fx: [-2, -4, 2], why: "Delay doesn't make it go away. And while you wait, they may already be talking to your competitors." }
        ],
        insight: "When a big client demands a cut, change the deal, not just the price. And treat it as a warning about how much you depend on them.",
        coach: "What would happen to the business if your biggest client left tomorrow?"
      },
      {
        id: "r1s3",
        title: "Your co-director undermines you",
        ctx: {
          office: "In the Monday team meeting, your fellow director openly contradicts a decision you made last week, in front of twelve staff. People look at you to see what happens next.",
          site: "On site, in front of the crew, your fellow director tells the supervisor to ignore the change of plan you agreed with him on Friday. The crew are watching.",
          hybrid: "On the Monday all-hands call, your fellow director openly contradicts a decision you made last week, in front of everyone. The chat goes quiet.",
          mixed: "In the weekly ops meeting, with site supervisors dialling in, your fellow director contradicts a decision you made last week. Everyone waits."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Stay calm in the meeting, and take it up with him privately straight after it finishes.", fx: [6, 2, -2], why: "Arguing in front of staff makes everyone take sides. Dealing with it straight after, privately, protects both of you and fixes the real problem.", say: "We've clearly got different views on this. Let's pick it up straight after the meeting." },
          { s: "enforcer", pts: 1, t: "Correct him there and then, so the team knows the decision stands and who made it.", fx: [-8, 2, 0], why: "You may win the point, but the team has just watched their directors argue. They'll learn to play you off against each other." },
          { s: "avoider", pts: 0, t: "Let it go. You don't want a scene, and it's not worth falling out with your co-director over.", fx: [-6, -6, -2], why: "The team now doesn't know which decision stands. And your co-director has learned he can overrule you publicly without any comeback." },
          { s: "pleaser", pts: 1, t: "Agree with his version on the spot to show a united front, even though you think he's wrong.", fx: [2, -4, -4], why: "It looks united, but you've reversed your own decision in public because of pressure. Your managers will notice whose word counts." }
        ],
        insight: "Directors who disagree in public create a team that picks sides. Agree how you'll disagree, and do it behind closed doors.",
        coach: "Have you and your co-directors ever agreed how you'll handle disagreement?"
      },
      {
        id: "r1s4",
        title: "He's been with you since the start",
        ctx: {
          office: "Your office manager joined when there were five of you. The business is now 60 people, and the job has outgrown him: reporting is late, the team works around him, and two good people have left.",
          site: "Your longest-serving contracts manager started as your first scaffolder. The business now runs 15 sites, and the role has outgrown him: programmes slip, and two good supervisors have left.",
          hybrid: "Your operations manager joined when there were five of you. The business is now 60 people, and the job has outgrown him. The team works around him, and two good people have left.",
          mixed: "Your first employee now runs operations across the office and sites. At 60 people, the role has outgrown him: reporting is late and two good supervisors have left."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Talk to him honestly about how the role has changed, and explore what would suit him now.", fx: [6, 6, -4], why: "Hard, but honest and respectful. Many long-serving people know before you say it and are relieved to talk about it. Leaving it costs your good people.", say: "The business has changed a lot since you joined, and so has your job. I want to talk honestly about what's working, what isn't, and what role would really suit you. You've earned that conversation." },
          { s: "avoider", pts: 0, t: "Leave things as they are. He's been loyal for years, and the business owes him for that.", fx: [-4, -8, -2], why: "Loyalty matters, but your good people are paying for it, and some have already left. The longer this goes on, the harder the conversation becomes, for both of you." },
          { s: "rescuer", pts: 1, t: "Hire someone above him to do the parts he can't, without saying why, so he can keep his title.", fx: [-2, 4, -4], why: "It may solve the work, but he'll work out what's happened. Being quietly replaced is worse than being told honestly." },
          { s: "enforcer", pts: 1, t: "Start a formal performance process. He'll either improve or it'll give you grounds for the next step.", fx: [-8, 2, 0], why: "Going straight to formal process with someone who helped build the business will feel like betrayal to him and to everyone watching." }
        ],
        insight: "Long service deserves honesty, not avoidance. The kindest thing is usually an early, respectful conversation.",
        coach: "Who in your business has the role outgrown, and have you told them?"
      }
    ]
  },
  {
    n: 2,
    title: "Protect the Business",
    tool: "Drain, Neutral, Fuel",
    minutes: 15,
    lesson: [
      { h: "Your diary is the strategy", p: "If every hour of your week is spent in the operation, nobody is working on the business. The things that only a director can do (direction, money, key relationships, people) get done at night or not at all." },
      { h: "Drain, Neutral, Fuel", p: "Apply it to clients and work as well as your diary. Drain: costs more than it earns in money or morale. Neutral: steady and fair. Fuel: profitable, and your people like doing it. Grow the fuel; fix or end the drains." },
      { h: "Cash is the oxygen", p: "Profitable businesses fail when the cash runs out. Know your cash position every week, and talk to the bank and key suppliers early, not when you're desperate." },
      { h: "Safety is a director's job", p: "When something goes wrong on site, the way directors respond in the first 24 hours sets the culture for years: whether people report problems or hide them." }
    ],
    mission: "Look at your diary for last week. Mark each meeting Drain, Neutral or Fuel, and cancel or delegate one Drain from next week.",
    scenarios: [
      {
        id: "r2s1",
        title: "No time to think",
        ctx: {
          office: "You're in 28 hours of meetings a week, most of them operational. The three-year plan, the sales strategy and a key hire have all been 'next week' for two months.",
          site: "You're on site three days a week, sorting problems your managers could handle. The growth plan and a key hire have been 'next week' for two months.",
          hybrid: "You're on video calls 28 hours a week, most of them operational. The three-year plan and a key hire have been 'next week' for two months.",
          mixed: "Between the office and sites, you're in meetings or on the road almost all week. The three-year plan and a key hire have been 'next week' for two months."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Block one morning a week for director work, and hand three regular meetings to managers.", fx: [4, 6, 8], why: "Protected time is the only way strategic work gets done. Telling the team why makes them help protect it.", say: "From now on, Tuesday mornings are for planning the business, not running it. Mark and Kelly are taking over the Monday and Thursday meetings, and they'll brief me after." },
          { s: "rescuer", pts: 0, t: "Do the strategic work at weekends, so the team still has you available during the week.", fx: [2, 2, -10], why: "Your team gets you, the business gets a tired director, and your family gets less of you. And it teaches managers that you'll always be there to fix things." },
          { s: "avoider", pts: 1, t: "Keep going as you are until things calm down, then make time for the bigger picture.", fx: [0, -6, -4], why: "Things don't calm down. Two months of 'next week' tells you that." },
          { s: "pleaser", pts: 1, t: "Hire an assistant to manage your diary and fit the strategy work in around everything else.", fx: [2, 2, -2], why: "An assistant can help, but if you keep every meeting, there's still no room. The meetings themselves are the problem." }
        ],
        insight: "If you don't decide where your time goes, the operation decides for you.",
        coach: "What's the most important thing only you can do that hasn't been done this month?"
      },
      {
        id: "r2s2",
        title: "Profitable, and toxic",
        ctx: {
          office: "One client is profitable but pays 60 days late, constantly changes the brief, and their manager regularly shouts at your staff on calls. Your team dread working on the account.",
          site: "One main contractor pays well but 60 days late, keeps changing the programme, and their site manager regularly swears at your crews. Your best supervisor has asked not to work on their jobs.",
          hybrid: "One client is profitable but pays late, keeps changing the brief and is rude to your staff on video calls. Your team dread the account.",
          mixed: "One client pays well but late, keeps changing the plan, and their site manager regularly shouts at your crews. Your best supervisor has asked to be moved off their jobs."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Raise it with their senior person, set clear terms going forward, and be ready to walk.", fx: [8, 2, 2], why: "Your people are watching whether you'll protect them. Setting terms, and meaning them, either fixes the account or tells you it's time to let it go.", say: "We value working with you, but two things have to change: payments at 30 days as agreed, and the way your site manager speaks to my crews. If we can fix both, I'd love to keep working together." },
          { s: "pleaser", pts: 0, t: "Keep the client happy. The money's good, and your team need to toughen up a bit.", fx: [-10, 2, -2], why: "You've told your people that revenue matters more than how they're treated. Your best supervisor will be the next to leave." },
          { s: "enforcer", pts: 1, t: "Write to the client terminating the contract with immediate effect, and tell your team why.", fx: [6, -6, 0], why: "It shows your people you'll protect them, but walking away without first trying to fix it loses good revenue, and may breach the contract." },
          { s: "avoider", pts: 1, t: "Move your best people off the account and put newer staff on it, so the complaints stop.", fx: [-6, -2, 2], why: "The complaints stop because the people least able to push back are now taking the abuse. That's not fixing it." }
        ],
        insight: "How you deal with a toxic client tells your team what you really value.",
        coach: "Which client costs you more in morale than it earns?"
      },
      {
        id: "r2s3",
        title: "Payroll on Friday",
        ctx: {
          office: "It's Tuesday. Payroll of £86,000 goes out Friday. A client owing £120,000 has just said payment will be 'a couple of weeks late'. Without it, you're £30,000 short.",
          site: "It's Tuesday. Wages of £86,000 go out Friday. A main contractor owing £120,000 has just said payment will be 'a couple of weeks late'. Without it, you're £30,000 short.",
          hybrid: "It's Tuesday. Payroll of £86,000 goes out Friday. A client owing £120,000 has just emailed to say they'll pay 'a couple of weeks late'. You're £30,000 short.",
          mixed: "It's Tuesday. Wages of £86,000 go out Friday. Your biggest debtor says their £120,000 will be 'a couple of weeks late'. You're £30,000 short."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Today, call the client's finance director, your bank, and one or two key suppliers.", fx: [4, 6, -2], why: "Three calls, early, with honest numbers. Banks and suppliers help people who come to them early; they don't help people who come on Thursday night.", say: "We've had a large payment delayed, and I want to talk to you before it becomes a problem, not after. Can we extend our overdraft by £30,000 for three weeks?" },
          { s: "avoider", pts: 0, t: "Wait until Thursday and see if the client pays after all, before doing anything drastic.", fx: [-4, -8, -6], why: "If they don't pay, it's Thursday night and you've no time to arrange anything. Waiting is the most dangerous option here." },
          { s: "rescuer", pts: 1, t: "Lend the business the £30,000 from your own savings, without telling anyone, so payroll goes out as normal.", fx: [2, 4, -8], why: "It works this week, and it's generous. But it hides a cash problem from your co-directors and the bank, and it may happen again next month." },
          { s: "pleaser", pts: 1, t: "Tell the staff that pay may be a few days late this month and apologise.", fx: [-8, 2, 0], why: "Honest, but you've passed the problem to the people least able to absorb it, before trying the options that don't involve them." }
        ],
        insight: "Cash problems get smaller when you act early and bigger when you wait.",
        coach: "Do you know your cash position for the next eight weeks today?"
      },
      {
        id: "r2s4",
        title: "A near miss",
        ctx: {
          office: "A heavy box of files fell from the top of a storage rack in the office, landing where a colleague had been standing a minute earlier. Nobody was hurt. The office manager says it was 'just a one-off'.",
          site: "A bundle of materials fell from a loading bay onto a walkway the crew had just left. Nobody was hurt. The supervisor says it was 'just a one-off' and wants to keep the job moving.",
          hybrid: "A heavy box fell from a storage rack in the office, landing where a colleague had been standing a minute earlier. Nobody was hurt. You hear about it on a call.",
          mixed: "On one of your sites, materials fell from a loading bay onto a walkway the crew had just left. Nobody was hurt. The client's site manager wants to 'keep it between us'."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Get it reported and investigated, and publicly thank whoever raised it for doing so.", fx: [8, 2, -2], why: "The near miss is free information about the accident that hasn't happened yet. How you respond decides whether the next one gets reported.", say: "Thank you for telling me. This is exactly what I want to hear about. Nobody's in trouble for reporting it. Let's find out why it happened so it doesn't happen again." , next: "The investigation goes ahead." },
          { s: "pleaser", pts: 0, t: "Go along with keeping it quiet. Nobody was hurt, and making a fuss could upset the client or the team.", fx: [-6, 2, -4], why: "You've taught everyone that near misses are hidden when it suits. Next time someone may be hurt, and the history will show you knew." , next: "A week later, a worker mentions it to the safety advisor, and an investigation starts anyway." },
          { s: "enforcer", pts: 1, t: "Find out who was responsible and issue a formal warning, so everyone knows you take safety seriously.", fx: [-8, 2, 0], why: "Blame first, and people stop reporting near misses. You'll get fewer reports and more accidents." , next: "The supervisor is warned, and the investigation carries on." },
          { s: "rescuer", pts: 1, t: "Sort out the cause yourself straight away, so it's fixed before anyone needs to report it formally.", fx: [2, 4, -4], why: "It gets fixed, but it isn't recorded and nobody learns why it happened. The same cause can be sitting on another site." , next: "The safety advisor hears about it and insists on a proper investigation." }
        ],
        step2: {
          q: "Step 2: The investigation finds the cause was rushing to hit a programme date that you agreed with the client.",
          options: [
            { s: "leader", pts: 3, t: "Own your part openly, and go back to the client to reset the programme date.", fx: [8, 2, -2], why: "When the cause is pressure from the top, the fix has to start at the top. Owning it is what makes the safety message believable.", say: "The investigation shows we were under pressure from a date I agreed. That's on me. I'm going back to the client to reset the programme, and from now on safety comes before any date." },
            { s: "enforcer", pts: 0, t: "Remind the supervisors that safety is their responsibility on site, whatever the programme says.", fx: [-10, 0, 2], why: "Technically true, and it tells them you'll keep setting dates and blame them for what follows. That's how near misses become accidents." },
            { s: "avoider", pts: 1, t: "Close the investigation with a reminder to everyone to take care, and move on.", fx: [-6, 0, 2], why: "A reminder without a change in pressure changes nothing. The same programme pressure will cause the next one." },
            { s: "pleaser", pts: 1, t: "Keep the programme as it is so the client isn't let down, but add an extra person to the job.", fx: [2, 2, -4], why: "More people under the same pressure isn't the same as less pressure. It may help, but the real cause hasn't been addressed." }
          ]
        },
        insight: "How directors react to near misses decides whether people report them. Thank, investigate, learn, and look at your own part.",
        coach: "When something nearly goes wrong in your business, does it get reported?"
      }
    ]
  },
  {
    n: 3,
    title: "Make the Big Calls",
    tool: "One-Way and Two-Way Doors",
    minutes: 15,
    lesson: [
      { h: "Big doors, few of them", p: "Most directors make too many small decisions and put off the few big ones: who to hire, which work to chase, when to cut costs. Those are the ones that shape the business." },
      { h: "One-Way and Two-Way Doors", p: "A two-way door is reversible: delegate it or decide it fast. A one-way door (a major contract, a senior hire, redundancies) deserves time, data and challenge. But not forever: a late one-way decision is still a decision." },
      { h: "Ask: what would have to be true?", p: "Before a big call, write down what would have to be true for it to work. Then check those things, rather than how you feel about the decision." },
      { h: "How you do it matters as much as what you do", p: "Hard decisions done fairly, openly and quickly are remembered as hard. Done slowly, secretly or clumsily, they're remembered as betrayal." }
    ],
    mission: "Take one big decision you've been putting off. Write down what would have to be true for each option to work, and set a date to decide.",
    scenarios: [
      {
        id: "r3s1",
        title: "The contract that would stretch you",
        ctx: {
          office: "You're offered a contract worth 40% of current turnover over two years. To deliver it, you'd need to hire 15 people in three months and take on new systems. It's the biggest opportunity you've had.",
          site: "A major contractor offers you a framework worth 40% of current turnover over two years. You'd need 15 more scaffolders in three months, more vans and a new yard. It's the biggest opportunity you've had.",
          hybrid: "You're offered a two-year contract worth 40% of current turnover. You'd need to hire 15 people in three months, many working remotely. It's the biggest opportunity you've had.",
          mixed: "You're offered a two-year contract worth 40% of current turnover across four new sites. You'd need 15 more people in three months. It's the biggest opportunity you've had."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Test what would have to be true, ask for a phased start, and decide within two weeks.", fx: [4, 8, 2], why: "It's a one-way door, so it deserves real checking. But a fixed decision date stops it drifting, and a phased start reduces the risk.", say: "We're very interested. To do this well, we'd want to start with two sites in the first quarter and add the rest from April. Can we talk about that?" },
          { s: "rescuer", pts: 0, t: "Accept it, and plan to run the new contract yourself to make sure it's delivered properly.", fx: [-2, 4, -10], why: "You'd be running the new contract and the rest of the business. Something will give, and it will probably be you, or the existing clients." },
          { s: "pleaser", pts: 1, t: "Accept it straight away. Opportunities like this don't come often, and you'll work out the details as you go.", fx: [4, -2, -6], why: "Growth that outruns your people and cash is one of the most common ways good businesses fail. The details are the risk." },
          { s: "avoider", pts: 2, t: "Turn it down politely. It's too much of a risk for the business at its current size.", fx: [0, -2, 4], why: "Turning it down is a legitimate call, so this is defensible. But deciding without testing whether it could work may mean giving up a real opportunity out of caution." }
        ],
        insight: "Big opportunities are one-way doors. Test what would have to be true, change the deal to reduce the risk, and set a decision date.",
        coach: "What would have to be true for your next big opportunity to work?"
      },
      {
        id: "r3s2",
        title: "Promote or hire in?",
        ctx: {
          office: "You need an operations director. Your most senior manager wants it and is popular, but lacks experience at this level. An external candidate has done the job before at a bigger firm.",
          site: "You need a contracts director. Your longest-serving contracts manager wants it and the crews love him, but he's never managed managers. An external candidate has done it at a bigger firm.",
          hybrid: "You need an operations director. A popular internal manager wants it but hasn't worked at this level. An external candidate has done the job before at a bigger firm.",
          mixed: "You need an operations director covering office and sites. Your senior site manager wants it and is respected, but hasn't worked at this level. An external candidate has done it before."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Run a fair process against what the role needs, and be honest with your manager throughout.", fx: [6, 6, -2], why: "A fair process with an honest conversation lets you hire the best person and keep your manager's respect, whichever way it goes.", say: "I'm going to run a proper process for this role, and I'd like you to be part of it. I'll be honest with you about where I think you're strong and where you'd need to grow." },
          { s: "enforcer", pts: 0, t: "Hire the external candidate and announce it to the business, then tell your manager he didn't get it.", fx: [-10, 4, 0], why: "He'll hear it with everyone else, and so will the people who were rooting for him. You may lose him, and you've shown the team how you treat loyal people." },
          { s: "pleaser", pts: 1, t: "Promote your manager. He's earned it, the team will be pleased, and he'll grow into it.", fx: [6, -4, -2], why: "He might grow into it, but you've set him up in a role he may not be ready for without support. If he struggles, you've lost a good manager and a director." },
          { s: "avoider", pts: 1, t: "Leave the role empty for now and carry the extra work yourself until the right answer becomes obvious.", fx: [-2, -4, -8], why: "It won't become obvious, and while you wait, you're doing two jobs. Your manager's frustration will grow too." }
        ],
        insight: "Senior hires are one-way doors. Decide on evidence, and be honest with internal candidates throughout.",
        coach: "Who in your business is waiting to hear where they stand?"
      },
      {
        id: "r3s3",
        title: "Your best manager is leaving",
        ctx: {
          office: "Your best manager hands in her notice. A competitor has offered her 20% more and a director title. She says she'd prefer to stay if things were different.",
          site: "Your best contracts manager hands in his notice. A competitor has offered 20% more and a company van. He says he'd prefer to stay if things were different.",
          hybrid: "Your best manager tells you on a call that she's leaving. A competitor has offered her 20% more and a director title. She'd prefer to stay if things were different.",
          mixed: "Your best operations manager hands in her notice. A competitor has offered her 20% more. She says she'd prefer to stay if things were different."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Ask her what 'different' would mean to her, before you start talking about money.", fx: [6, 4, 0], why: "People rarely leave for money alone. Finding out what really matters lets you make a real offer, or part well if you can't.", say: "I'd really like you to stay. Before we talk about money, tell me honestly what would need to be different for you to want to." },
          { s: "pleaser", pts: 0, t: "Match the offer immediately: 20% more and the title. You can't afford to lose her.", fx: [4, -4, -4], why: "A quick counter-offer often keeps people for months, not years, because whatever made them look is still there. And everyone else learns that resigning is how you get a pay rise." },
          { s: "enforcer", pts: 1, t: "Accept the resignation and wish her well. People who want to leave should leave.", fx: [-6, -4, 2], why: "That may be true, but she's told you she'd prefer to stay. Not even asking why risks losing your best person for something you could have fixed." },
          { s: "rescuer", pts: 1, t: "Take on her responsibilities yourself during her notice period, so the business isn't caught out when she goes.", fx: [0, 2, -6], why: "Sensible planning, but you've skipped the conversation that might have kept her." }
        ],
        insight: "When good people leave, the reason is rarely only money. Ask before you offer.",
        coach: "If your best person resigned tomorrow, what would they say was missing?"
      },
      {
        id: "r3s4",
        title: "The work is drying up",
        ctx: {
          office: "Orders have fallen 25% for six months, and the pipeline doesn't show a recovery. On current numbers, you'll need to reduce headcount by about eight people to stay viable.",
          site: "Work has fallen 25% for six months, and the order book doesn't show a recovery. On current numbers, you'll need to reduce the workforce by about eight to stay viable.",
          hybrid: "Revenue has fallen 25% for six months, with no recovery in the pipeline. On current numbers, you'll need to reduce headcount by about eight.",
          mixed: "Work has fallen 25% for six months across office and sites, with no recovery in sight. You'll need to reduce headcount by about eight to stay viable."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Take advice, look properly at alternatives, then run a fair and open process.", fx: [4, 6, -4], why: "Redundancies are a one-way door for the people involved. Considering alternatives properly, following a fair process and being honest is what decides whether your remaining staff trust you afterwards.", say: "Work has been down a quarter for six months. I want to be straight with you about what that means, what we're looking at to protect jobs, and how we'll make any decisions fairly." , next: "After advice and a look at the alternatives, the numbers still don't work." },
          { s: "avoider", pts: 0, t: "Hold off. It might pick up in the spring, and you don't want to lose good people if you can avoid it.", fx: [-4, -8, -6], why: "Hoping without a plan risks the whole business and every job in it. If you wait too long, the cuts will have to be deeper and faster." , next: "By spring there's no recovery, and the bank is asking questions." },
          { s: "enforcer", pts: 1, t: "Pick the eight weakest performers and tell them on Friday, to get it over with quickly.", fx: [-10, 4, 0], why: "Quick, and very likely unfair and unlawful without a proper process. The people who stay will watch how you treated the people who went." , next: "Your HR adviser stops you and insists on a proper process." },
          { s: "pleaser", pts: 1, t: "Cut everyone's pay by 10% instead, so nobody has to lose their job.", fx: [4, 2, -2], why: "Well meant, and sometimes right, but it needs proper consultation and agreement, and it may just delay the problem while your best people leave for better pay." , next: "Two of your best people leave over the pay cut, and the numbers still don't work." }
        ],
        step2: {
          q: "Step 2: You've decided redundancies are needed. Who has the conversations with the people affected?",
          options: [
            { s: "leader", pts: 3, t: "You and each person's own manager together, in private, with HR there to support.", fx: [6, 4, -6], why: "People deserve to hear it from someone they know, with a director there to show it's taken seriously. It's hard on you, and it should be.", say: "I'm sorry to be having this conversation. Your role is one of those at risk. I'll explain why, what happens next, and the support that's available to you." },
            { s: "rescuer", pts: 0, t: "You do every conversation yourself, alone, so the managers don't have to go through it.", fx: [2, 2, -10], why: "It feels protective, but it takes away the familiar face people need, and leaves you carrying all of it." },
            { s: "avoider", pts: 1, t: "HR handles the conversations. They know the process, and it keeps the directors out of the firing line.", fx: [-8, 2, 2], why: "People notice when the directors who made the decision aren't in the room. It reads as hiding." },
            { s: "pleaser", pts: 2, t: "Each person's own manager does it, with HR alongside, so the news comes from someone they trust.", fx: [4, 2, 0], why: "Hearing it from your own manager is kinder than a stranger, so this is defensible. But without a director there, it can feel like the decision-makers stayed away." }
          ]
        },
        insight: "The hardest decisions test whether people trust you. Do them fairly, openly and in person.",
        coach: "What hard decision have you been delaying in the hope it fixes itself?"
      }
    ]
  }
  ]
};
export default DIRECTORS;
