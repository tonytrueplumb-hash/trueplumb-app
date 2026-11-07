// Version 2 tuning, applied on top of team.js and ops.js when the courses load.
// - Rebalances which style is the trap, so the leadership profile measures fairly.
// - Adds genuine "Defensible" second options.
// - Adds setting-specific scoring (bySetting), e.g. where site safety changes the right answer.
// - Adds "say": exact words for the best move.
// - Adds "echo": a Day 3 callback to a Day 1 choice.
// Keys are step keys (scenario id, or id + "b" for the follow-up decision). Option numbers are
// positions in the source file (0 = first option listed there).

export const TUNING = {
  team: {
    d1s1: {
      say: "Dan, got five minutes? You've been in after nine three times this week. What's going on? From now on, on time means at your desk for nine.",
      opts: {
        0: { bySetting: { site: {
          why: "On site this isn't just lateness: he's missed the safety talk twice. Have the word today, and he doesn't start work until he's been briefed. Asking what's going on still matters, but the safety rule isn't up for discussion.",
          say: "Dan, you've missed the briefing twice this week. Today you don't start until I've briefed you myself. What's going on? From tomorrow, on time means at the 7:30 briefing."
        } } },
        2: { bySetting: { site: {
          pts: 2,
          why: "Missed safety talks need a record on site, so writing it down is defensible here. Lead with the conversation, though: a note before a chat still reads as 'I'm your boss now, not your mate.'"
        } } }
      },
      echo: {
        0: "Two weeks on, Dan's been on time every day since your chat. Two of the team have started coming to you with problems earlier. People noticed you held your mate to the same standard as everyone else.",
        1: "Two weeks on, Dan still drifts in late now and then. The team noticed the general reminder, and they also noticed you never actually spoke to him.",
        2: "Two weeks on, the record's there and Dan's mostly on time, but things are cooler between you, and he's stopped telling you when something's up.",
        3: "Two weeks on, Dan's late most days, and someone else has started copying him. The team have worked out that the rules bend for your friends."
      }
    },
    d1s2: {
      say: "Yes, we can do the audit pack. To fit it in by Friday, month-end would slip to Monday, or I pull someone off the rota work. Which would you rather move?",
      opts: { 1: { pts: 0, why: "It might work this once. But 'one big push' becomes the normal way of working: your team learns your yes costs them their evenings, and your boss learns the team has capacity it doesn't have." } }
    },
    d1s3: {
      say: "You've dealt with this before. What would you do? … Good, it's yours. Let me know by three how it went.",
      opts: {
        1: { pts: 0, why: "Ten minutes today, and every similar problem lands on you from now on. You've taught your most capable person that the fix is to bring it to you. This is the classic trap for leaders who came up through the team: it feels helpful and does the opposite." },
        2: { pts: 1 }
      }
    },
    d1s4: { say: "Can we agree that jobs for my team come through me? If something's genuinely urgent, ring me and I'll get it moving within the hour." },
    d1s4b: {
      say: "Do yours first. I'll ring them now and tell them theirs will be with them by four.",
      opts: { 3: { pts: 1 } }
    },
    d2s1: { say: "Is it urgent, or can it wait till eleven? … Great, grab me at eleven and it's all yours." },
    d2s2: {
      say: "Jordan, want the weekly figures? I'll walk you through it for fifteen minutes on Tuesday, you send me your draft by Thursday lunchtime, and I'll check it before it goes out.",
      opts: {
        1: { pts: 0, why: "Things never calm down. 'Quicker to do it myself' is how team leaders become the bottleneck while their keenest people get bored and leave. It's the most expensive habit on this list." },
        3: { pts: 2, why: "Starting small and checking closely is a sensible first month, so this is defensible. Set a date to stop checking every line; without one, it tells him you don't trust him and keeps the job on your desk." }
      }
    },
    d2s3: {
      say: "Chris, I've noticed you're staying late and you've been quieter than usual. No judgement. What would help this week?",
      opts: { 1: { pts: 0 } }
    },
    d2s4: {
      say: "Can it wait until nine tomorrow? We're two short and I need to get today's target as close as I can.",
      opts: {
        1: { pts: 0, why: "Your boss gets their numbers, the team gets help, and you get a 9pm finish on an empty tank. Nobody upstairs learns you were two short. That's how mistakes happen on day two." },
        3: { pts: 1 }
      }
    },
    d2s4b: { say: "Heads up: we'll be about 20% short today. Here's what's done, what isn't, and when the rest will be finished: by eleven tomorrow." },
    d3s1: { say: "I want to try a fifteen-minute daily huddle for two weeks instead of Monday's meeting. It's a trial. At the end we'll review it together and keep whichever works better." },
    d3s2: {
      say: "One figure doesn't match the paperwork. I'm checking that one gap now, and you'll have my sign-off by three.",
      opts: {
        0: { bySetting: { site: {
          why: "A safety sign-off is a one-way door. Walk the section you haven't seen today, and say when you'll sign. 'The supervisor said it was fine' won't protect anyone if something happens.",
          say: "I haven't seen that section myself. I'm walking it now, and you'll have the sign-off by half three."
        } } },
        2: { pts: 1, why: "Better than a blind signature, because the gap is at least on paper. But it still pushes the payment through unchecked, and a note won't stop the money leaving." },
        3: { bySetting: { site: {
          pts: 2,
          why: "On a safety handover, insisting on a full recheck isn't over the top; it's defensible. Walking the one section you haven't seen gets the same safety in an hour rather than a day."
        } } }
      }
    },
    d3s3: {
      say: "Lee, I want to talk about the last six weeks. Here are three examples. What's your view? Let's agree what good looks like and look at it again at the end of the month.",
      opts: {
        1: { pts: 1, why: "They're not happy: someone has just told you so. Waiting leaves the people doing the extra work unprotected and lets the standard keep slipping." },
        3: { pts: 0, why: "You're now the third person covering for Lee. Lee still doesn't know there's a problem, so nothing changes, and you've added someone else's job to yours." }
      }
    },
    d3s4: { say: "We'll bring in a temp from Monday. I'll review it on Wednesday, and if we're ahead, I'll stop it." },
    d3s4b: {
      say: "Fair challenge, and thanks for telling me. Here's why I went with the temp. Next time I'll ask who wants overtime before I decide.",
      opts: { 3: { pts: 1, why: "It isn't hostile, and sometimes letting things settle is right. But they'll notice you didn't really listen, and the grievance goes quiet rather than away." } }
    }
  },

  ops: {
    o1s1: {
      say: "I can see how much this matters to you. Mark owns the rota, so I'm going to ask him to look at it again today, and one of us will come back to you by tomorrow.",
      opts: { 2: { pts: 2, why: "The chain of command is right, so sending her back to Mark is defensible. The cost is the coldness: she'll stay quiet about the next thing, even if it's serious." } },
      echo: {
        0: "Two weeks on, Mark looked at the leave again and found a way to cover it. Amy got to the wedding, Mark's authority is intact, and his team still take problems to him first.",
        1: "Two weeks on, three more of Mark's team have come to you to overrule him on something. Mark has stopped making calls without checking with you first.",
        2: "Two weeks on, Amy went back to Mark and got her leave, but she's told colleagues you weren't interested. Nobody from Mark's team has brought you anything since.",
        3: "Two weeks on, nobody did anything. Amy has raised a grievance, and both she and Mark say you knew and did nothing."
      }
    },
    o1s2: { say: "I'll work on it. Here are three ways to get to 10%, and what each one costs in output, risk or time. Which do you want me to go with?" },
    o1s3: {
      say: "Gary, these five kinds of decision are yours: no need to ring. For anything else, ring me with what you'd do and why.",
      opts: { 1: { pts: 0, why: "A minute each, seven times a day, every day. Gary never learns to decide, and you've made yourself the bottleneck for his whole team. Being the person with the answers is the trap that keeps operational managers stuck." } }
    },
    o1s4: {
      say: "Let's agree a rule we use every time: safety-critical work comes first, then client deadlines. For next week, whichever of your jobs is safety-critical gets them first, and the other job gets them straight after.",
      opts: {
        1: { pts: 0, why: "It feels fair, but both priority jobs are now half-resourced. You've avoided the decision, and both supervisors will probably miss." },
        2: { pts: 1 },
        3: { pts: 2, why: "Quick, and it has real logic, so it's defensible this week. The cost is that the rule wasn't agreed: the losing supervisor sees favouritism, and the same fight comes back next Monday." }
      }
    },
    o1s4b: { say: "Mark, we agreed those two go to Kelly's job this week. What happened? Let's sort it with her today." },
    o2s1: {
      say: "I'm moving Tuesday's and Thursday's status meetings to written updates this week. Kelly, Wednesday at ten for an hour?",
      opts: { 3: { pts: 1, why: "Moving a deadline can be right, but here you've protected the meetings and pushed back the one task that stops next quarter's firefighting. That's the wrong way round." } }
    },
    o2s2: {
      say: "Here's a one-page template for your area. Let's go through it together on Monday, and we'll review your numbers side by side for the first three months.",
      opts: { 1: { pts: 0, why: "A day a month, every month, and your supervisors never learn to manage their own costs. You'll still be doing it next year, and they'll still be surprised by their numbers." } }
    },
    o2s3: {
      say: "Kelly, the cover ends on the 30th. I'm pushing the director today to get the hire moving. Until then, what can come off your plate?",
      opts: {
        2: { pts: 0, why: "Kelly gets relief, but your whole operation has lost its manager to one team. The vacancy stops feeling urgent to anyone above you, and now there are two people who can't step back." },
        3: { pts: 1, why: "It's already been six months. Holding on feels patient, but 'coped so far' is how strong supervisors burn out and leave." }
      }
    },
    o2s4: { say: "Thirty minutes at three: what's really behind the slip, and what would you need to recover it? I'll send the plan to the director tonight." },
    o2s4b: { say: "What would you change, and what does that do to the end date? I'll send the director the honest version today." },
    o3s1: {
      say: "Let's trial it in two teams for four weeks. We'll agree now what success looks like, and the three of us will review it at the end.",
      opts: {
        1: { pts: 1, why: "Waiting for everyone sounds respectful, but one person now has a veto over a change you believe in, and the operation pays for that every week." },
        3: { pts: 0 }
      }
    },
    o3s2: {
      say: "We're interested. We'll sign with a three-month break clause, and I'd like to speak to two of their current clients this week.",
      opts: { 3: { bySetting: { site: {
        pts: 2,
        why: "On site, an unproven subcontractor is a safety and competence risk as well as a quality one, so refusing is defensible. A trial with a break clause and checked references is still better: you test the saving without betting the job on it."
      } } } }
    },
    o3s3: { say: "Steve, here are the figures for the last three quarters. What do you think is behind them? Let's agree a plan and look at it together in six weeks." },
    o3s4: {
      say: "I'm moving two people from each team on the 14th. Here's why, and we'll review the balance two weeks in.",
      opts: {
        1: { pts: 1, why: "Waiting for better information sounds careful, but leaving it to the last minute means nobody can plan, and you end up deciding in a panic anyway." },
        3: { pts: 0, why: "You can't run the operation and be a sixth of a team on the new job. Both suffer, and nobody above you sees that the new job was under-resourced from day one." }
      }
    },
    o3s4b: {
      say: "That's a real hit, and I'm sorry it landed on you. Here's why I took them. At the review, you get first call on support.",
      opts: { 3: { pts: 2, why: "The review is the right place to rebalance, so this is defensible. A sentence of thanks and the reason now would stop him feeling brushed off for two weeks." } }
    }
  }
};

// Tips shown on Day 1, based on how long someone has been in the role.
export const ROLE_TIPS = {
  office: {
    "Under 6 months": "You're new, so you're still learning who really decides what. Day 1 on competing requests will matter most this month.",
    "6 months to 2 years": "By now people know you'll get things done, so more lands on you. Watch for 'just a quick extra job' becoming your whole week.",
    "Over 2 years": "You probably know more about how things really work than most managers. Day 3 is about trusting yourself to make the call."
  },
  back: {
    "Under 6 months": "You're new, so people may test whether the rules really apply. Day 1 on holding the line will matter most.",
    "6 months to 2 years": "Watch for becoming the only person who knows how something works. Day 2 is about getting out of that trap.",
    "Over 2 years": "You're experienced, so the risk is that controls have quietly slipped into habits. Day 3's fraud and error scenarios are worth taking slowly."
  },
  directors: {
    "Under 6 months": "You're new to the board, so the hardest shift is stopping doing the work you used to do. Day 1 is about exactly that.",
    "6 months to 2 years": "By now you'll have favourite managers and decisions you keep putting off. Notice which scenarios feel uncomfortably familiar.",
    "Over 2 years": "You're experienced, so the risk is confidence. Use the 'How sure are you?' question honestly: it's where experienced directors learn the most."
  },
  operatives: {
    "Under 6 months": "You're new, which is exactly why your eyes are useful. If something looks wrong, asking is never stupid.",
    "6 months to 2 years": "You know the job now, which is when shortcuts start to feel normal. Watch for the 'only ten minutes' ones.",
    "Over 2 years": "New starters copy what you do, not what they're told. Day 1's scenario about the old hand's shortcut is aimed at you."
  },
  team: {
    "Under 6 months": "You're new in the role, so the scenarios about mates, first standards and saying no upward are the ones that will matter most this month.",
    "6 months to 2 years": "You're past the honeymoon. Watch for habits you've slipped into: doing it yourself and saying yes upward are the usual ones by now.",
    "Over 2 years": "You're experienced, so the risk is confidence. Use the 'How sure are you?' question honestly: it's where experienced leaders learn the most."
  },
  ops: {
    "Under 6 months": "You're new to running through supervisors. The biggest shift is letting them decide, even when you'd do it faster.",
    "6 months to 2 years": "By now you'll have favourite supervisors and ones you avoid. Notice which scenarios feel like real people.",
    "Over 2 years": "You're experienced, so the risk is confidence. Use the 'How sure are you?' question honestly: it's where experienced managers learn the most."
  }
};

// Before/after self-rating statements (1 = not like me, 5 = very like me).
export const RATINGS = {
  office: [
    "When two people want something at once, I tell them and ask them to agree the priority.",
    "I say what will slip before I take on extra work.",
    "I protect time to concentrate on work that needs it.",
    "I make small decisions myself without waiting for permission.",
    "I own my mistakes within the hour, not the week."
  ],
  back: [
    "I hold the line on controls, even when someone senior pushes.",
    "When I say no, I offer the fastest proper route.",
    "Someone else could do my key tasks if I were off for two weeks.",
    "I verify every change of bank details by phone, using details I already hold.",
    "I raise my own errors quickly and honestly."
  ],
  directors: [
    "My managers make the decisions that are theirs without checking with me.",
    "I protect time each week to work on the business, not in it.",
    "I know my cash position for the next eight weeks.",
    "I have honest conversations with long-serving people about their roles.",
    "I make big decisions on time, after testing what would have to be true."
  ],
  operatives: [
    "If I see something unsafe, I say so straight away.",
    "I'd challenge someone more senior if they asked me to do something unsafe.",
    "I ask when I'm not sure, even if I'm new.",
    "I report near misses, not just accidents.",
    "I tell my supervisor when I'm too tired or hurt to work safely."
  ],
  team: [
    "I say no or 'not yet' to my boss when the team is at capacity, and offer options.",
    "I hand problems back to the person who brought them instead of fixing them myself.",
    "I raise performance or behaviour issues within a week, privately and specifically.",
    "I delegate work I could do faster myself.",
    "I make decisions on time, even when I'm only 70% sure."
  ],
  ops: [
    "I push back on targets from above with options and costs, not a flat yes or no.",
    "My supervisors make the decisions that are theirs to make, without checking with me.",
    "I have honest performance conversations with supervisors, including loyal ones.",
    "I protect my own planning time, even in busy weeks.",
    "I make decisions on time, even when I'm only 70% sure."
  ]
};

// Manager discussion guides, keyed by the team's most common trap.
export const GUIDES = {
  rescuer: {
    headline: "Your team leans Rescuer: they carry the load themselves.",
    opener: "Most of us came up by being the person who fixes things. This sprint showed that, under pressure, we still reach for that.",
    questions: [
      "What did you take on yourself last week that someone else could have owned?",
      "What stops you handing it back? Speed, quality, or not wanting to burden people?",
      "What's one recurring job you'll hand over this month, and how will you check it without doing it?"
    ],
    agreement: "Each of us names one task to hand over this month, and we check in on it at our next meeting."
  },
  pleaser: {
    headline: "Your team leans Pleaser: they keep people happy today at tomorrow's cost.",
    opener: "Saying yes feels like being helpful. This sprint showed that our yes often hides a cost someone else pays.",
    questions: [
      "When did you last say yes upward when the honest answer was 'not without something moving'?",
      "Which conversation are you putting off because it'll be awkward?",
      "What would the 90-Second Reset sound like in your next request from above?"
    ],
    agreement: "When we're at capacity, we answer requests with the trade-off, not a bare yes."
  },
  enforcer: {
    headline: "Your team leans Enforcer: they reach for rules and records first.",
    opener: "Standards matter. This sprint showed that we sometimes go to rules or paperwork before we've had the conversation.",
    questions: [
      "When did a rule or an email do a job a five-minute conversation should have done?",
      "What do people stop telling you when they feel told off?",
      "Which situation coming up needs a conversation before any process?"
    ],
    agreement: "We talk first, privately and specifically, before anything goes in writing or to HR."
  },
  avoider: {
    headline: "Your team leans Avoider: they wait, hint or hand problems back.",
    opener: "Most problems feel smaller if we give them time. This sprint showed that waiting usually makes them bigger.",
    questions: [
      "What issue have you known about for more than a week without raising it?",
      "What's the worst realistic outcome of raising it this week?",
      "Which decision are you waiting to be 100% sure about?"
    ],
    agreement: "If something's bothered us for a week, we raise it in the next working day."
  }
};

const clone = o => JSON.parse(JSON.stringify(o));

// Returns a copy of the course with version-2 tuning applied.
export function applyTuning(trackId, course) {
  const c = clone(course);
  const t = TUNING[trackId] || {};
  for (const d of c.days) for (const sc of d.scenarios) {
    for (const [key, opts] of [[sc.id, sc.options], [sc.id + "b", sc.step2 && sc.step2.options]]) {
      const p = t[key]; if (!p || !opts) continue;
      const best = opts.find(o => o.pts === 3);
      if (p.say && best) best.say = p.say;
      for (const [i, patch] of Object.entries(p.opts || {})) Object.assign(opts[+i], patch);
      if (key === sc.id && p.echo) sc.echo = p.echo;
    }
  }
  return c;
}

// Resolves an option for a work setting (setting-specific score, explanation and words).
export function forSetting(o, setting) {
  const s = o.bySetting && o.bySetting[setting];
  if (!s) return o;
  const out = { ...o, ...s };
  delete out.bySetting;
  return out;
}
