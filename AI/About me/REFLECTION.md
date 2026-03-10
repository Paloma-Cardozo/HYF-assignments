# Ethical Considerations

Three risks I think are worth naming honestly and how I'm personally
navigating them.

---

## Risk 1: Intellectual dependency

**The issue**

The most tempting and perhaps most dangerous misuse of AI in development is
accepting its output without really understanding it. It is easy to get working
code in minutes that would have taken hours of research, trial, and error to
build from scratch. The risk is not the speed: it is skipping the understanding
that the slower process would have built. You end up with a codebase that runs
but that you cannot explain, debug, or extend on your own.

There is also a subtler version of this: using AI as a shortcut to avoid the
discomfort of not knowing. Real learning lives in that discomfort.

**How I'm mitigating it**

I try to think of AI the way I think of a senior colleague who's always
available and unfailingly patient, helpful, but not a replacement for my own
judgment. When AI gives me an answer, I make myself explain it back: why does
this work? What would break it? Could I write it differently?

AI is also not infallible. It is trained on data produced by humans, which
means it inherits our errors, gaps, and biases. Knowing that keeps me
appropriately skeptical. And personally, I have an addictive relationship with
understanding things. I find it genuinely hard to stop once I have grasped a
concept, which turns out to be a useful guardrail against dependency.

---

## Risk 2: Impostor syndrome

**The issue**

At a Women in AI networking event this week, the conversation centred entirely
on this: how AI is intensifying impostor syndrome. Especially among developers
who are earlier in their careers, when a tool can generate something in seconds
that you couldn't have produced alone, it is hard not to ask: _how much of
this is actually me?_ That question, left unchecked, can quietly erode
confidence and make it harder to recognize your own genuine growth.

This is not a small problem. Impostor syndrome was already widespread before
AI entered the picture. Social media has been compounding it for years.
AI adds another layer and a more intimate one, because it lives inside your
workflow.

**How I'm mitigating it**

Writing down what I actually learned in my own words, with my own before/after
comparisons, is a concrete record of real understanding.

I think the antidote to impostor syndrome is not reassurance but deliberate,
documented learning. Knowing your limits clearly and committing to moving them
is more grounding than any external validation.

AI can fill knowledge gaps faster than a library can. That is genuinely useful,
if you use it to understand more, not to perform more.

---

## Risk 3: Privacy and data protection

**The issue**

It is easy to paste code, logs, or context into an AI prompt without thinking
about what that data contains. Personal data (yours or someone else's) fed
into a third-party AI tool may be stored, used for training, or exposed in ways
you cannot control. For developers working with real user data, this is not
hypothetical. It is a GDPR risk with real legal consequences.

**How I'm mitigating it**

We need a rule: nothing that belongs to someone else goes into an AI prompt
without first asking whether it should. No client data, no third-party credentials,
no personal information that isn't mine to share.

My legal background makes data protection less abstract for me than it might be
for others. I have seen what careless handling of sensitive information costs.

---

## Risk 4: Honesty

**The issue**

As AI becomes embedded in daily workflows, the line between "I built this"
and "AI built this and I submitted it" can blur quickly. In a hiring or
educational context, presenting AI-generated code or writing as entirely your
own, without understanding it, without disclosing it, and without being
able to defend it in a conversation, is a form of misrepresentation.

It also creates a practical trap: if you cannot explain your own code in an
interview or code review, the gap between what you claimed and what you
actually know becomes visible fast. And the person most hurt by that gap
is you.

**How I'm mitigating it**

Attribution, not avoidance. The question is not whether to use AI, but
whether you are honest about how you used it and whether you genuinely
understand what it produced.

In my projects, I have to record what I actually learned, in my own words.
That is not a formality. It is how I hold myself accountable to the standard
I want to work by.

---

## Risk 5: Bias

**The issue**

AI models are trained on data produced by humans, and that data reflects
human patterns, including human blind spots. A model trained predominantly
on code written in English, by developers from particular cultural and
geographic contexts, will carry assumptions: about naming conventions,
about what a "default" user looks like, about which languages or character
sets are edge cases rather than primary use cases.

Those assumptions can surface quietly in generated code, UI copy, or
accessibility decisions, not as obvious errors, but as invisible defaults
that were never consciously chosen.

**How I'm mitigating it**

Not accepting AI output as neutral. When AI suggests a solution that
involves user-facing content, interface design, or data about people,
we need to ask explicitly: who is this designed for? Who might it exclude?

These kinds of questions should feel natural rather than optional, because
the assumptions behind a rule matter as much as the rule itself.
