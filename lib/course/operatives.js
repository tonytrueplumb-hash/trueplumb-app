// True Plumb Execution Sprint · General Operatives track (speaking up on safety)
const OPERATIVES = {
  track: "General Operatives",
  days: [
  {
    n: 1,
    title: "See It, Say It",
    tool: "Stop, Say, Sort",
    minutes: 15,
    lesson: [
      { h: "Most accidents were seen coming", p: "After almost every serious accident, someone says 'I thought that looked wrong.' They saw it. They just didn't say it, because the crew wanted to crack on, or they didn't want to look soft, or it wasn't their job." },
      { h: "Stop, Say, Sort", p: "Stop: if something could hurt someone, pause the work. Say: name what you've seen, plainly, without blaming anyone. Sort: agree the fix, or get the person who can sort it. It takes a minute." },
      { h: "Calm beats loud", p: "You don't need to shout or make a scene. 'Hang on, that edge isn't protected, let's sort it before we go up' gets a better response than a lecture." },
      { h: "It's never 'just ten minutes'", p: "Shortcuts are always 'only quick'. Falls, crushes and cuts don't care how long the job was meant to take." }
    ],
    mission: "Once this week, use Stop, Say, Sort on something small. Write down what you said and what happened.",
    scenarios: [
      {
        id: "p1s1",
        title: "It's fine for ten minutes",
        ctx: {
          office: "In the yard, you're about to go up a loading platform to sort out stock. The guardrail on one side has been taken off and not put back. The chargehand says, 'It's fine, it's only ten minutes, crack on.'",
          site: "You're about to go up to the next lift. A guardrail on one side is missing, taken off for a delivery and not put back. The chargehand says, 'It's fine, it's only ten minutes, crack on.'",
          hybrid: "On a site you've only been on twice, you're about to go up to a working platform. A guardrail is missing on one side. The lad in charge says, 'It's fine, only ten minutes, crack on.'",
          mixed: "You're about to go up to a platform you'll work from for the morning. One guardrail is missing. The chargehand says, 'It's fine, it's only ten minutes, crack on.'"
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Stop, and say you're not going up until the rail's back on. Offer to help put it back on now.", fx: [4, 4, 8], why: "Calm, clear and helpful. You're not refusing to work; you're fixing the problem so everyone can. It takes five minutes.", say: "Hang on, that rail's off. I'm not going up till it's back on. Give me a hand and we'll have it on in five minutes." },
          { s: "pleaser", pts: 0, t: "Go up. The chargehand knows what he's doing, and you don't want to be the one holding everyone up.", fx: [4, 2, -10], why: "Ten minutes is plenty of time to fall. If you go up, everyone else will too, and nobody will put the rail back." },
          { s: "enforcer", pts: 1, t: "Refuse loudly in front of the whole crew, and say you'll be reporting the chargehand to the office.", fx: [-8, 0, 6], why: "You've stayed safe, but you've humiliated the chargehand and made it about him. The rail could have been back on in the time it took to argue." },
          { s: "rescuer", pts: 1, t: "Go up anyway, but stay well away from that edge, and tell the others to be careful near it.", fx: [2, 2, -6], why: "Careful isn't the same as safe. You're still working next to an open edge, and so is everyone you've just warned." }
        ],
        echo: {
          0: "Two weeks on, the chargehand has started checking the rails himself before anyone goes up. He hasn't said anything about it, but a new lad mentioned you're 'the one who makes sure it's done right'.",
          1: "Two weeks on, the missing rail was still off three days later. Nobody fell. Yet.",
          2: "Two weeks on, the chargehand still won't make eye contact with you. The rail went back on, but the crew now go quiet when you're around.",
          3: "Two weeks on, the edge was left open all week because everyone was 'being careful'. Someone nearly stepped back off it on Thursday."
        },
        insight: "Speaking up doesn't mean refusing to work. It means fixing the problem before you start.",
        coach: "What's the most common 'only ten minutes' shortcut where you work?"
      },
      {
        id: "p1s2",
        title: "The old hand's shortcut",
        ctx: {
          office: "In the yard, an experienced lad is showing a new starter how to move a heavy load. He tells him to skip the trolley and 'just lift it with your back, it's quicker'.",
          site: "An experienced scaffolder is showing a new starter how to pass tube up. He tells him not to bother with the gin wheel rope on the short lifts: 'just hand it up, it's quicker'.",
          hybrid: "On a site you don't know well, an experienced lad is showing a new starter a shortcut that skips the proper lifting kit: 'it's quicker'.",
          mixed: "An experienced lad is showing a new starter how to do a job, and teaches him to skip a safety step because 'it's quicker'."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Have a quiet word with the old hand away from the new lad, then show him the right way.", fx: [6, 2, 4], why: "You've protected the new lad without embarrassing the old hand in front of him. New starters copy what they see in their first weeks.", say: "Mate, he's brand new. Let's show him the proper way first; he can find his own shortcuts in five years when he knows what he's doing." },
          { s: "avoider", pts: 0, t: "Say nothing. He's been doing it twenty years, and it's not your place to correct him.", fx: [0, 2, -4], why: "Twenty years without an accident isn't the same as being safe. The new lad will do it the old hand's way for the rest of his career." },
          { s: "enforcer", pts: 1, t: "Tell the old hand, in front of the new starter, that he's teaching him dangerous habits.", fx: [-8, 0, 4], why: "Right message, wrong place. He'll dig his heels in, and the new lad learns that safety means arguments." },
          { s: "pleaser", pts: 1, t: "Laugh along with the shortcut, but tell the new lad later on not to do it when the gaffer's around.", fx: [2, 0, -4], why: "You've taught him that safety is about not getting caught. That's exactly how shortcuts become habits." }
        ],
        insight: "New starters learn more from what they see than what they're told. Correct the habit quietly, and model the right way.",
        coach: "What shortcut did you learn in your first year that you'd stop a new starter copying?"
      },
      {
        id: "p1s3",
        title: "Not clipped on",
        ctx: {
          office: "You see a workmate up on a high racking platform in the warehouse without his harness clipped on. 'Only quick, mate.'",
          site: "You see a mate working at height on an open lift without his harness clipped on. He sees you looking and says, 'Only quick, mate.'",
          hybrid: "On a site you're visiting, you see a lad working at height without being clipped on. He says, 'Only quick.'",
          mixed: "You see a workmate at height, not clipped on. He shrugs: 'Only quick.'"
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Ask him by name to clip on, and wait there until he does.", fx: [4, 0, 6], why: "Direct, friendly and you don't walk away. Most people clip on when a mate asks; it's harder to ignore someone who's waiting.", say: "Dave, clip on, mate. I'll wait." , next: "He looks at you and laughs." },
          { s: "avoider", pts: 0, t: "Leave it. He's a grown man, he knows the risk, and it's his decision.", fx: [0, 2, -8], why: "If he falls, you'll be the person who saw it and walked past. And it's never only his decision: someone has to deal with what happens." , next: "You walk off, then turn back. You can't leave it." },
          { s: "pleaser", pts: 1, t: "Make a joke about it so it doesn't feel like nagging, and hope he takes the hint.", fx: [4, 0, -4], why: "A joke is easy to laugh off. If you want him to clip on, ask him to." , next: "He laughs at the joke and carries on unclipped. You try again." },
          { s: "rescuer", pts: 1, t: "Go up and finish the job for him so he can come down, as you're clipped on.", fx: [2, 2, -4], why: "Kind, but he still thinks not clipping on is fine, and he'll do it again on the next job when you're not there." , next: "You offer, and he waves you away." }
        ],
        step2: {
          q: "Step 2: He laughs it off: 'Calm down, I've been doing this longer than you.'",
          options: [
            { s: "leader", pts: 3, t: "Stay calm, say why it matters, and that you'll tell the gaffer if not.", fx: [4, 0, 6], why: "You've kept it about him, not about who's right. Telling him your next step is honest, not a threat.", say: "I know, mate. I'm not having a go, I just want you going home tonight. If you won't clip on, I'll have to tell the gaffer." },
            { s: "enforcer", pts: 0, t: "Shout at him that he's an idiot and you're reporting him to the safety manager right now.", fx: [-10, 0, 2], why: "He'll stay unclipped out of pride. Shouting turns a safety issue into a fight he doesn't want to lose." },
            { s: "avoider", pts: 1, t: "Leave it there. You've said your piece, and the rest is up to him.", fx: [0, 0, -4], why: "You've done more than most, but he's still unclipped. One more calm sentence or a word with the supervisor would finish the job." },
            { s: "pleaser", pts: 1, t: "Apologise for making a fuss and say you were only looking out for him.", fx: [4, 0, -6], why: "Backing down tells him, and anyone watching, that it really wasn't important." }
          ]
        },
        insight: "Asking a mate to stay safe isn't nagging. Ask directly, and don't walk off until it's sorted.",
        coach: "Who would you find hardest to ask to clip on, and why?"
      },
      {
        id: "p1s4",
        title: "The damaged lead",
        ctx: {
          office: "In the workshop, you're handed a power tool with tape wrapped around a split in the cable. 'It's fine, it's been like that for weeks.'",
          site: "You're handed a 110V drill with tape wrapped round a split in the lead. The chargehand says, 'It's fine, it's been like that for weeks, crack on.'",
          hybrid: "On a site you've just started on, you're handed a tool with tape around a split in the cable. 'It's been like that for weeks.'",
          mixed: "You're handed a power tool with tape wrapped round a split in the lead. 'It's been like that for weeks.'"
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Don't use it. Tag it as faulty, and tell the chargehand straight away.", fx: [4, 2, 6], why: "You've taken it out of use so nobody else picks it up, and you've given the chargehand a way to keep the job moving.", say: "I'm not using that, the lead's split. I've tagged it as faulty. Is there another one, or what do you want me on in the meantime?" },
          { s: "rescuer", pts: 0, t: "Re-tape it yourself more neatly and carry on, so the job isn't held up.", fx: [2, 4, -8], why: "Neater tape on a split lead is still a split lead. Now it looks repaired, so the next person is even less likely to question it." },
          { s: "pleaser", pts: 1, t: "Use it carefully. It's been fine for weeks, and you don't want to be the awkward one.", fx: [2, 4, -8], why: "'It's been fine' is what people say right up until it isn't. You're the one holding it if it goes." },
          { s: "avoider", pts: 1, t: "Put it back in the van and quietly use a different one, without saying anything.", fx: [0, 2, 4], why: "You're safe, but the damaged one is still in the van for the next person to pick up." }
        ],
        insight: "Faulty kit doesn't fix itself. Take it out of use, so it can't hurt the next person.",
        coach: "What faulty kit is sitting in a van or store right now?"
      }
    ]
  },
  {
    n: 2,
    title: "When It's Someone Senior",
    tool: "The Two-Sentence Challenge",
    minutes: 15,
    lesson: [
      { h: "The hardest person to challenge", p: "It's one thing telling a mate to clip on. It's much harder when the person telling you to cut a corner is your supervisor, the client, or someone with twenty years more experience." },
      { h: "The Two-Sentence Challenge", p: "Sentence one: what you've seen, as a fact. Sentence two: what you need before you carry on. 'The wind's picked up a lot. I want to check it with you before we go back up.' No blame, no lecture." },
      { h: "You have the right to stop", p: "Nobody can make you do work you believe is seriously unsafe. Stopping and raising it isn't being difficult; it's what the law expects and what good employers want." },
      { h: "Being new isn't a reason to stay quiet", p: "If you're unsure, ask. 'I might be wrong, but is that meant to be like that?' is a perfectly good question at any experience level." }
    ],
    mission: "Practise the Two-Sentence Challenge once this week, even on something small. Notice how the other person reacts.",
    scenarios: [
      {
        id: "p2s1",
        title: "The gaffer wants it done today",
        ctx: {
          office: "The yard foreman wants a delivery unloaded from height before the end of the day. The wind has picked up so much that sheets are flapping off the racking. 'We need it done, just get on with it.'",
          site: "The wind has picked up badly and boards are lifting on the top lift. Your supervisor says, 'The client wants it handed over today. Just get it finished.'",
          hybrid: "On a site you're helping out on, the wind has picked up badly and materials are lifting at height. The supervisor says, 'We need it finished today.'",
          mixed: "The wind has picked up badly where you're working at height, and loose materials are moving. Your supervisor says, 'It needs finishing today.'"
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Come down, tell the supervisor what you've seen, and say you think it's unsafe.", fx: [4, 0, 8], why: "You've used the Two-Sentence Challenge: the facts, and what you need. It gives the supervisor the information to make the right call, and a way to make it.", say: "The boards are lifting up top and it's getting worse. I don't think it's safe to carry on. Can we look at it together and decide?" , next: "The supervisor isn't happy." },
          { s: "pleaser", pts: 0, t: "Carry on. The supervisor knows best, and you don't want to be seen as someone who can't handle a bit of wind.", fx: [4, 4, -10], why: "Wind at height doesn't care about deadlines or reputations. If you go, everyone working alongside you goes too." , next: "Halfway through, a board lifts and nearly catches you. You come down and tell him you're stopping." },
          { s: "enforcer", pts: 1, t: "Tell the supervisor it's ridiculous, down tools, and tell the rest of the crew to come down too.", fx: [-6, -2, 6], why: "You might be right, but you've made it a stand-off and taken over his crew. A calm word first would probably get the same result." , next: "The supervisor squares up to you." },
          { s: "avoider", pts: 2, t: "Stop and come down, and say you'll wait in the van until the wind drops.", fx: [-2, -2, 8], why: "You've kept yourself safe, so this is defensible. But without telling the supervisor why, the others may still be up there." , next: "The supervisor comes over to the van." }
        ],
        step2: {
          q: "Step 2: The supervisor says, 'If you won't do it, I'll find someone who will.'",
          options: [
            { s: "leader", pts: 3, t: "Stay calm, say you're not refusing to work, and ask to ring the contracts manager.", fx: [2, 0, 8], why: "You've held your ground without making it personal, and you've taken it to someone who can make a decision. That's your right.", say: "I'm not refusing to work. I'm saying it's not safe up there in this wind. Can we ring the contracts manager and get their view?" },
            { s: "enforcer", pts: 0, t: "Tell him he's putting lives at risk, he's a disgrace, and you'll never work under him again.", fx: [-10, -2, 4], why: "Everything you've said may be true, but it ends any chance of him changing his mind, and of you working well together." },
            { s: "pleaser", pts: 1, t: "Go back up. You can't afford to lose shifts, and maybe you're overreacting.", fx: [2, 2, -10], why: "The pressure has worked, and the risk hasn't changed. This is exactly the moment the law protects your right to stop." },
            { s: "avoider", pts: 1, t: "Say nothing and walk off to the van. Let him find someone else if he wants.", fx: [-4, -2, 6], why: "You're safe, but the next person he asks may go up. Telling someone more senior is what protects them too." }
          ]
        },
        insight: "When someone senior pushes you, stay calm, stick to the facts, and take it up a level if you need to.",
        coach: "Who would you ring if your supervisor told you to keep going in conditions you thought were unsafe?"
      },
      {
        id: "p2s2",
        title: "The client wants a section moved",
        ctx: {
          office: "A customer visiting the yard asks you to quickly move some racking supports so their forklift can get through. That's not your job, and it's not been checked.",
          site: "The client's foreman asks you to take out a couple of ties and a section so his lads can get a pallet through. 'It's five minutes, the scaffold's fine.' It hasn't been inspected for that change.",
          hybrid: "On a site you're visiting, the client's foreman asks you to remove a section that's in his way. 'It's five minutes.' It hasn't been checked for the change.",
          mixed: "The client's site manager asks you to alter something you've put up so his team can get through. 'It's five minutes.' It hasn't been checked for the change."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Say politely that you can't alter it without a check, and ring your supervisor now.", fx: [4, 4, 4], why: "You've protected everyone who'll use it after the change, and you're helping get the foreman what he needs, properly.", say: "I can't alter it without my gaffer's OK and it being checked after, as it's not safe otherwise. Let me ring him now and see how quickly we can do it." },
          { s: "rescuer", pts: 0, t: "Do it quickly yourself. It's only a couple of ties, and it keeps the client happy.", fx: [4, 2, -8], why: "Ties hold a structure up. Changing it without a check puts everyone on it at risk, and if anything happens, it's your hands that made the change." },
          { s: "pleaser", pts: 1, t: "Tell him you're not allowed to, but you won't mind if his lads do it themselves.", fx: [2, 0, -6], why: "You've stepped back from the risk and handed it to people who know even less about the structure." },
          { s: "enforcer", pts: 1, t: "Tell him flatly it's not happening and walk off. It's not your problem if his pallet can't get through.", fx: [-6, -2, 4], why: "You've kept it safe, but the client still has a problem, so he'll ask someone else, who might say yes." }
        ],
        insight: "Changes to anything that keeps people safe need the right person and a check, however quick they seem.",
        coach: "What do clients ask you to do that isn't your call to make?"
      },
      {
        id: "p2s3",
        title: "You're new and not sure",
        ctx: {
          office: "You're three weeks in. Something about how the stock is stacked on the top rack looks unstable to you, but everyone else walks past it, and you're not sure you know enough to say.",
          site: "You're three weeks in. A section of the job looks wrong to you: a board seems to be overhanging too far. Everyone else walks past it, and you're not sure you know enough to say.",
          hybrid: "You're on a site for the first time. Something at height looks wrong to you, but everyone else walks past it, and you're not sure you know enough to say.",
          mixed: "You're three weeks into the job. Something looks wrong to you, but everyone else walks past it, and you're not sure you know enough to say."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Ask your chargehand as a question: 'I might be wrong, but is that meant to be like that?'", fx: [4, 2, 4], why: "A question is easy to ask and easy to answer. If it's fine, you've learned something. If it's not, you might have prevented an accident.", say: "I might be wrong, but is that board meant to stick out that far?" },
          { s: "pleaser", pts: 0, t: "Keep quiet. You're new, everyone else seems fine with it, and you don't want to look like you're trying to show off.", fx: [2, 0, -6], why: "Everyone else may be walking past it for the same reason you are. Being new is a reason to ask, not a reason to stay quiet." },
          { s: "avoider", pts: 1, t: "Keep away from that part of the job yourself, but don't say anything to anyone.", fx: [0, 0, 2], why: "You're safer, but if it is wrong, everyone else is still walking past it." },
          { s: "enforcer", pts: 1, t: "Report it straight to the site safety advisor, without mentioning it to your own crew first.", fx: [-6, 2, 4], why: "It gets looked at, but your crew will feel you went round them, and you might find it was fine all along." }
        ],
        insight: "You don't need to be sure to ask. 'I might be wrong, but…' is one of the most useful sentences on any site.",
        coach: "What have you noticed lately that you weren't sure enough to mention?"
      },
      {
        id: "p2s4",
        title: "He's still drunk",
        ctx: {
          office: "A colleague arrives at the yard smelling strongly of drink, slurring slightly. He's due to drive the forklift this morning.",
          site: "Your driver for the day turns up smelling strongly of drink and slurring slightly. He's due to drive the crew to site in the van.",
          hybrid: "A colleague you're meeting on site arrives smelling strongly of drink, slurring slightly. He's about to drive plant.",
          mixed: "A colleague turns up smelling strongly of drink and slurring slightly. He's due to drive the van with you and two others in it."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Tell him privately he can't drive, then tell the supervisor before anyone gets in.", fx: [4, 2, 6], why: "You've given him the chance to hear it from you first, but you haven't let it go. Telling the supervisor before anyone moves is what keeps everyone safe.", say: "Mate, I can smell it on you and you're not right. You're not driving today. I'm telling the gaffer before we go, not to drop you in it, but so nobody gets hurt." },
          { s: "avoider", pts: 0, t: "Say nothing and get in the van. It's not your business, and you don't want to get him sacked.", fx: [2, 0, -10], why: "You've just got in a vehicle with a drink driver, and so have your mates. If it goes wrong, nobody will care that you didn't want to get him in trouble." },
          { s: "rescuer", pts: 1, t: "Offer to drive instead, and keep it between the two of you so he doesn't get in trouble.", fx: [4, 4, -2], why: "Nobody's in danger on the road today, which matters. But he may still be working, and the same thing will happen next week." },
          { s: "enforcer", pts: 1, t: "Tell him in front of everyone that he's a disgrace and you're reporting him for being drunk.", fx: [-10, 0, 4], why: "He shouldn't be driving, but humiliating him in front of the crew makes it harder for him to accept, and harder for him to get help if he needs it." }
        ],
        insight: "Covering for someone who's unfit for work isn't loyalty. Speak to them, and make sure someone who can stop it knows.",
        coach: "What would make it easier for people on your crew to speak up about this?"
      }
    ]
  },
  {
    n: 3,
    title: "Own It",
    tool: "One-Way and Two-Way Doors",
    minutes: 15,
    lesson: [
      { h: "Some mistakes can't be undone", p: "A two-way door can be walked back through: a delivery in the wrong place, a job done in the wrong order. A one-way door can't: a fall, a crush, a back injury. Treat anything that could cause a one-way door with real care." },
      { h: "Near misses are free lessons", p: "A near miss is an accident that didn't happen this time. Reporting it costs a few minutes. Not reporting it means the same thing happens again, maybe to someone else." },
      { h: "Tired people get hurt", p: "Long hours, early starts and no days off make people slower and less careful. Saying 'I'm too tired to do this safely' is a safety call, not a weakness." },
      { h: "Report it, even when people don't want you to", p: "Sometimes the pressure not to report comes from your own crew, because of stats, bonuses or not wanting a fuss. Report it anyway. If it gets worse, the record matters." }
    ],
    mission: "This week, report one near miss or hazard you'd normally ignore. Write down what happened when you did.",
    scenarios: [
      {
        id: "p3s1",
        title: "You dropped something",
        ctx: {
          office: "While working on the top rack, you knock a heavy box off the edge. It lands on the floor below, in an area where people walk. Nobody was there. Nobody saw.",
          site: "Working at height, you drop a fitting. It lands on a walkway below that people use all day. Nobody was there. Nobody saw.",
          hybrid: "Working at height on a site you don't know well, you drop a tool. It lands on a walkway below. Nobody was there. Nobody saw.",
          mixed: "Working at height, you drop a fitting onto an area below where people walk. Nobody was there. Nobody saw."
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Report it as a near miss to your supervisor, and suggest how to stop it happening.", fx: [4, 2, 6], why: "Nobody got hurt this time. Reporting it, with an idea for the fix, is how you make sure nobody gets hurt next time either.", say: "I had a near miss: I dropped a fitting onto the walkway. Nobody was there, but there should be a barrier or toe boards along there. Can we sort it?" },
          { s: "avoider", pts: 0, t: "Say nothing. Nobody was hurt, nobody saw, and reporting it would just get you in trouble.", fx: [0, 2, -6], why: "Nobody will fix the reason it fell. The next thing that drops from there could hit someone." },
          { s: "rescuer", pts: 1, t: "Put a couple of boards up along the edge yourself, so it can't happen again, but don't report it.", fx: [2, 2, -2], why: "Good instinct, but a fix nobody knows about can be taken down by the next crew. And the same problem may be on every other job." },
          { s: "pleaser", pts: 2, t: "Mention it casually to your chargehand at break, so someone knows, without making it formal.", fx: [4, 2, 2], why: "Telling someone is far better than nothing, so this is defensible. But without a report, it's easy for it to be forgotten by the afternoon." }
        ],
        insight: "Near misses are the warnings you get for free. Report them, and suggest the fix.",
        coach: "What near miss have you seen that never got reported?"
      },
      {
        id: "p3s2",
        title: "Caught not clipped on",
        ctx: {
          office: "The safety advisor catches you on the top racking platform without your harness clipped on. You'd only been up there a minute.",
          site: "The safety advisor catches you working at height without being clipped on. You'd only been up there a minute, and you were about to clip on.",
          hybrid: "On a site visit, the client's safety advisor catches you at height without being clipped on. You'd only been up a minute.",
          mixed: "The safety advisor catches you at height without being clipped on. You'd only been up there a minute."
        },
        q: "What do you say?",
        options: [
          { s: "leader", pts: 3, t: "Own it straight away, clip on, and tell him you'll make sure it doesn't happen again.", fx: [6, 2, 4], why: "No excuses, no arguing. Owning it calmly is what makes people trust you next time you're the one speaking up.", say: "You're right, I should've clipped on before I started. I'm clipping on now, and it won't happen again." },
          { s: "enforcer", pts: 0, t: "Tell him to get off your back. Everyone does it, and he should be picking on the people who never clip on.", fx: [-10, 0, -2], why: "Arguing turns a one-minute conversation into a disciplinary. And it tells everyone watching that you think the rules are for other people." },
          { s: "avoider", pts: 1, t: "Say you were just about to clip on, and hope he leaves it at that.", fx: [-2, 0, 0], why: "It might even be true, but it sounds like an excuse. A straight 'you're right' gets you further." },
          { s: "pleaser", pts: 1, t: "Apologise over and over and promise you'll never do it again, so he doesn't report it.", fx: [2, 0, -2], why: "Over-apologising to avoid a report isn't owning it; it's trying to make it go away." }
        ],
        insight: "When you're caught out, own it calmly. That's what makes people listen when you're the one who speaks up.",
        coach: "How do you react when someone points out your safety slip?"
      },
      {
        id: "p3s3",
        title: "Twelve days straight",
        ctx: {
          office: "You've worked twelve days straight, mostly early starts. You're making silly mistakes and nearly reversed the forklift into someone yesterday. The foreman asks if you'll do Saturday.",
          site: "You've worked twelve days straight on 6am starts. You're making silly mistakes and nearly put your foot through a gap yesterday. The supervisor asks if you'll do Saturday.",
          hybrid: "You've worked twelve days straight across different sites. You're making silly mistakes and nearly missed a step yesterday. You're asked to do Saturday.",
          mixed: "You've worked twelve days straight, mostly early starts. You're making silly mistakes and had a near miss yesterday. You're asked to do Saturday."
        },
        q: "What do you say?",
        options: [
          { s: "leader", pts: 3, t: "Say honestly that you're too tired to work safely, and mention yesterday's near miss.", fx: [2, -2, 10], why: "Tiredness is a safety issue, not a weakness. Telling him about the near miss explains why, and helps him plan the rota better.", say: "I can't do Saturday. I've done twelve straight and I'm getting sloppy. I nearly put my foot through a gap yesterday. I need the weekend to be safe on Monday." },
          { s: "rescuer", pts: 0, t: "Say yes, and offer Sunday as well, so the crew isn't short and the job stays on track.", fx: [4, 4, -10], why: "You're the person most likely to get hurt this weekend, and you've just volunteered for more of it." },
          { s: "pleaser", pts: 1, t: "Say yes. The money's good, the job needs it, and you'll get some rest next week.", fx: [4, 4, -8], why: "'Next week' often doesn't come. You've told him you're fine when you're not, and he'll plan around that." },
          { s: "avoider", pts: 1, t: "Say you've got something on, rather than admit you're too tired to do it safely.", fx: [0, 0, 6], why: "You get the rest, but he doesn't know the real reason, so he'll keep planning crews on twelve-day stretches." }
        ],
        insight: "'I'm too tired to do this safely' is a safety call. Say it, and say why.",
        coach: "When did you last work while too tired to be safe?"
      },
      {
        id: "p3s4",
        title: "Don't report it",
        ctx: {
          office: "You've hurt your back lifting in the yard. It's not terrible, but it's sore. A colleague says, 'Don't report it, it'll mess up our accident-free record.'",
          site: "You've hurt your back lifting tube. It's not terrible, but it's sore. The chargehand says, 'Don't report it, we're on 200 days accident-free and there's a bonus on it.'",
          hybrid: "You've hurt your back lifting on a site you're helping out on. It's sore. Someone says, 'Don't report it, it'll mess up the stats.'",
          mixed: "You've hurt your back lifting. It's sore. Your chargehand says, 'Don't report it, it'll mess up our accident-free run.'"
        },
        q: "What do you do?",
        options: [
          { s: "leader", pts: 3, t: "Report it, and tell the chargehand why you need it on file in case it gets worse.", fx: [2, 0, 8], why: "If your back gets worse and it was never reported, you may struggle to get support or show it happened at work. The record exists for people like you.", say: "I get it about the record, mate, but if this gets worse I need it on file. I'm reporting it. It's not about anyone getting in trouble." , next: "It's logged in the accident book." },
          { s: "pleaser", pts: 0, t: "Don't report it. You don't want to be the one who ruined the record and cost everyone their bonus.", fx: [4, 2, -10], why: "If it gets worse, there's no record it happened at work. And a bonus that depends on injuries not being reported is a reason to report them." , next: "Overnight it gets worse." },
          { s: "avoider", pts: 1, t: "Don't report it now, but see how it is in a week and report it then if it's still bad.", fx: [0, 2, -6], why: "A report a week later, after you've kept working, is much harder to link to what happened." , next: "Overnight it gets worse." },
          { s: "enforcer", pts: 1, t: "Report it, and also report the chargehand for pressuring you not to.", fx: [-8, 0, 6], why: "Reporting it is right. Going after the chargehand straight away, before speaking to him, will make the whole crew wary of you." , next: "It's logged, and the chargehand isn't speaking to you." }
        ],
        step2: {
          q: "Step 2: Next morning your back's still sore. You're down to carry materials all day.",
          options: [
            { s: "leader", pts: 3, t: "Tell your supervisor before you start, and ask for lighter work today.", fx: [2, -2, 8], why: "Carrying on with a back injury is how a sore back becomes months off. Telling him first lets him plan around you.", say: "My back's still sore from yesterday. I don't think I should be carrying today. Can I go on something lighter until I've had it looked at?" },
            { s: "rescuer", pts: 0, t: "Push through it. The crew's short, and you don't want them carrying your share.", fx: [4, 4, -10], why: "You're turning a minor injury into a serious one to save your crew a day's extra work. They'd rather you were fit next week." },
            { s: "pleaser", pts: 1, t: "Do the carrying, but take painkillers and go slower than usual, so nobody notices.", fx: [2, 2, -8], why: "Painkillers hide the warning your body is giving you. Going slower doesn't make the lifting safer." },
            { s: "avoider", pts: 2, t: "Ring in sick for the day and get it looked at, without saying it's from yesterday.", fx: [-2, -2, 6], why: "Getting it checked is right, so this is defensible. But not linking it to yesterday weakens the record you made, and leaves the supervisor short with no warning." }
          ]
        },
        insight: "Report injuries, however small, even when others don't want you to. The record protects you, and the next person.",
        coach: "What would stop you reporting an injury at work?"
      }
    ]
  }
  ]
};
export default OPERATIVES;
