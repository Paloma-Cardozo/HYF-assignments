# Portfolio — AI-Assisted Code Review Sprint

**Branch:** `portfolio-sprint1` · **Program:** Hack Your Future, Denmark

This repository contains my personal portfolio website, rebuilt and reviewed
as part of the HYF AI-Advance module. The sprint covered four rounds of
AI-assisted code review: readability, best practices, potential bugs, and
security, followed by content improvements and layout enhancements.

---

## Table of Contents

1. [About This Project](#1-about-this-project)
2. [Project Structure](#2-project-structure)
3. [Reflections on Learning](#3-reflections-on-learning)

---

## 1. About This Project

A static front-end portfolio built with semantic HTML5, CSS custom properties,
CSS Grid, and vanilla JavaScript. It presents my professional background at the
intersection of law, data, and technology, designed to be readable, secure,
accessible, and honest.

The code review was structured across four rounds, each producing concrete
changes to the codebase: readability, best practices, potential bugs, and
security.

**Stack:** HTML · CSS · JavaScript

> For detailed before/after comparisons and explanations of each change,
> see [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md).

> For ethical considerations and reflections on AI use,
> see [REFLECTION.md](REFLECTION.md).

---

## 2. Project Structure

**Files**

```
portfolio/
├── .github/
│    └── copilot-instructions.md
├── index.html                    ← structure & content
├── styles.css                    ← visual design & layout
├── script.js                     ← interactive behavior
├── paloma-cardozo-profile.jpg
├── DEVELOPMENT_LOG.md            ← best practices study guide
├── REFLECTION.md                 ← ethical considerations on AI use
├── README.md                     ← this file
└── .gitignore                    ← excludes *.pdf
```

**HTML Document Tree**

```
<html lang="en">
│
├── <head>
│   ├── <meta charset="UTF-8">
│   ├── <meta name="viewport">
│   ├── <meta name="description">
│   ├── <meta http-equiv="Content-Security-Policy">   ← CSP
│   ├── <link rel="stylesheet" href="styles.css">
│   ├── <script src="script.js" defer>
│   └── <title>
│
└── <body>
    │
    ├── <header>
    │   └── <div.intro>
    │       ├── <h1>  Paloma Cardozo
    │       ├── <p>   Lawyer & Tech Specialist
    │       ├── <p>   📍 location + email (obfuscated)
    │       └── <p>   LinkedIn | GitHub | Portfolio
    │
    └── <main>
        ├── <section.about>
        │   ├── <h2>  About Me
        │   └── <p.main-text> × 3
        │
        ├── <section.skills>           ← 2-column CSS Grid
        │   ├── <h2>  Skills & Stack
        │   └── <ul>
        │       ├── <li>  🌐 Web Development
        │       ├── <li>  📊 Data & Analytics
        │       ├── <li>  🔐 Cybersecurity
        │       ├── <li>  🤖 AI
        │       ├── <li>  ⚖️  Legal expertise
        │       └── <li>  🛠️  Tools
        │
        ├── <section.experience>
        │   ├── <h2>  Professional Experience
        │   └── <ul>
        │       └── <li> [item-title + item-meta + p] × 3
        │
        ├── <section.projects>         ← 2-column CSS Grid
        │   ├── <h2>  Projects
        │   └── <ul>
        │       ├── <li>  Employee Insights
        │       └── <li>  Frog Hunter  [Live demo ↗]
        │
        ├── <section.focus>
        │   ├── <h2>  Education & Training
        │   └── <ul>
        │       └── <li> [item-title + item-meta] × 8
        │
        ├── <section.languages>        ← Flexbox row
        │   ├── <h2>  Languages
        │   └── <ul.language-list>
        │       └── <li> × 4  🇩🇰 🇬🇧 🇧🇷 🇪🇸
        │
        ├── <section.volunteering>
        │   ├── <h2>  Volunteering
        │   └── <ul>
        │       └── <li> × 3
        │
        ├── <figure>
        │   ├── <img>         profile photo
        │   └── <figcaption>  "Lawyer by training..."
        │
        └── <button#colorBtn>  Change Background Color!
```

**Visual Page Layout**

```
┌──────────────────────────────────────────┐
│                 <header>                 │
│             Paloma Cardozo               │
│          Lawyer & Tech Specialist        │
│         Rødovre, Denmark  |  email       │
│      LinkedIn  |  GitHub  |  Portfolio   │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  About Me                                │
│  I'm a criminal lawyer who codes...      │
├──────────────────┬───────────────────────┤
│   Web Dev        │   Data & Analytics    │
├──────────────────┼───────────────────────┤
│   Cybersec       │   AI                  │  ← Skills & Stack (2-col grid)
├──────────────────┼───────────────────────┤
│   Legal Exp      │   Tools               │
├──────────────────┴───────────────────────┤
│  Professional Experience                 │
│  ┌──────────────────────────────────┐    │
│  │  item × 3                        │    │
│  └──────────────────────────────────┘    │
├──────────────────┬───────────────────────┤
│  Employee        │  Frog Hunter          │  ← Projects (2-col grid)
│  Insights        │  Live demo            │
├──────────────────┴───────────────────────┤
│  Education & Training                    │
│  ┌──────────────────────────────────┐    │
│  │  item × 8                        │    │
│  └──────────────────────────────────┘    │
├──────────────────────────────────────────┤
│   🇩🇰 Danish · 🇬🇧 English · 🇧🇷 PT · 🇪🇸 ES  │  ← Languages (flex row)
├──────────────────────────────────────────┤
│  Volunteering                            │
│  ┌──────────────────────────────────┐    │
│  │  item × 3                        │    │
│  └──────────────────────────────────┘    │
│               [ photo ]                  │
│     "Lawyer by training. Developer by    │
│      choice. Researcher at heart."       │
│        [ Change Background Color! ]      │
└──────────────────────────────────────────┘
```

**Technology Layers**

```
┌─────────────────────────────────────────────────┐
│              STATIC FRONT-END SITE              │
├─────────────────┬──────────────────┬────────────┤
│   index.html    │   styles.css     │ script.js  │
│                 │                  │            │
│  · Semantics    │  · CSS variables │  · IIFE    │
│  · Sections     │  · Grid / Flex   │  · strict  │
│  · Accessibility│  · Animations    │  · CSS var │
│  · CSP headers  │  · Transitions   │    via JS  │
│  · Secure links │  · Responsive    │  · Null    │
│  · Obfuscated   │    breakpoints   │    guard   │
│    email        │  · prefers-      │            │
│                 │  reduced-motion  │            │
└─────────────────┴──────────────────┴────────────┘
```

---

## 3. Reflections on Learning

**On the process itself**

I found the structured code review approach genuinely eye-opening. Writing the
code first and then submitting it to a four-part AI review (readability, best
practices, potential bugs, security), gave me a completely different perspective
on my own work.

The security round was the most surprising: things like Content Security Policy
headers, tab-napping via `target="_blank"`, and email obfuscation were entirely
new to me, and I wouldn't have found them on my own at this stage.
It felt less like a correction and more like a conversation with a very patient,
very knowledgeable senior dev.

This sprint also left me with a strong pull to take this portfolio further,
to build out the back end, connect a real server, and turn it into a full-stack
project.

**On AI as a learning tool**

AI gives you access to an enormous amount of information, and with the right
prompts, you can accomplish things that would have taken much longer alone.
But having access to AI doesn't make you an expert, the same way having an
encyclopedia at home doesn't make you smarter. The knowledge has to be built
and the understanding has to be earned.

What I do believe is that AI, used with discipline and genuine curiosity, can
accelerate real learning. It's a tool. A very powerful one.

And I think the comparison holds with other tools we've already normalized:

- A calculator doesn't make you unable to do arithmetic, but it lets you attempt
  more complex operations.
- An air fryer doesn't replace cooking knowledge, but it frees up time and energy
  for other things.
- Computers didn't make handwriting obsolete, but they changed what we use it for.

The problem is never the tool. The problem is using it as a substitute for thinking,
stopping to learn, deciding to be dependent.

That's not the wheel being invented, that's choosing to never walk again once cars exist.

**On where this is going**

This week alone I attended three AI-focused networking events. Different
audiences, different industries, different angles, but one shared conclusion:
AI is not going away. It's here, it's accelerating, and it is already reshaping
every profession, including ours.

The response to that can't be fear or denial. It has to be preparation.

For us, as developers, that means really learning the code, not just running
it. Understanding what we build, why it works, and how to explain it. Solving
actual user problems, not just completing tasks. Communicating clearly with
stakeholders. Thinking through edge cases. And above all: using our imagination,
which may be the one thing AI cannot replicate, and the most important
differentiator we have.

---

_Paloma Cardozo_
