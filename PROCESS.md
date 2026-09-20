# Process overview

## What I built

Closure Studies (SLOP4000) is a course built around one idea: every closed
restaurant leaves a trail, and reading that trail is a teachable skill. A
student picks one specific, verifiably closed restaurant in week 1 and
spends the whole semester on it — location economics, menu-as-financial-
disclosure, review-history forensics, the landlord's-alibi test, a
peer-run cross-examination of their own draft — building toward a single
defensible verdict they present and defend live at a Coroner's Inquest.
There is no second case study and no unrelated topic; the twelve weeks,
three lectures and three assessments all point at the same specimen.

## How I got here

The topic went through two real changes before I started building. I
first proposed a "post-mortem analysis of lost games" angle, then asked
about pivoting to catering entrepreneurship generally — I flagged that
"restaurant entrepreneurship" on its own reads too close to a real
business-school elective to satisfy the brief's "no real university would
run this" bar, and asked for a narrower angle. The version that survived,
"post-mortem analysis of closed restaurants," keeps the original
post-mortem structure but gives it a genuinely single, absurdly narrow
object of study.

Building started with the course record —
[`2dd4352`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Trevorwrz/commit/2dd4352)
sets the code, title, dates and renames the `sessions` vocabulary to
"autopsies." The content swap in
[`c856a39`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Trevorwrz/commit/c856a39)
replaces the starter's two staff and two sample weeks with the real
teaching team and all twelve sessions, three lectures and three graded
pieces at once — it had to land together, since the old sessions
reference the old staff by slug and a partial swap would leave a dangling
reference.
[`8f2b1b3`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Trevorwrz/commit/8f2b1b3)
and
[`f1d99e9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Trevorwrz/commit/f1d99e9)
write the actual page copy and the opening lecture's slide deck, and drop
the two remaining starter images rather than source replacement art —
the theme's hero/social image props are optional, so going without one is
a design decision, not a missing asset.

`f1d99e9` also fixes a real bug `pnpm check`'s accessibility pass caught:
four `.mdx` index pages built with no `<html>`, `<title>` or landmark at
all, because `@astrojs/mdx` runs its own remark pipeline and never picks
up the theme's automatic `layout:` injection the way `.md` pages do. I
diagnosed this by reading `remark-default-layout.ts` and diffing the
built HTML of a passing `.md` page against a failing `.mdx` one, then
fixed it with an explicit `layout:` frontmatter field and wrote the quirk
into `CLAUDE.md` (`38e671d`) so it isn't rediscovered.

[`2b0a1b0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Trevorwrz/commit/2b0a1b0)
adds `spec/closure-studies.test.ts`: exactly twelve unique weeks, assessment
weights summing to 100, at least one lecture with a real linked deck, and
every named teacher resolving to a real person — the course's own claims,
made checkable rather than just asserted in prose.

I verified correctness by running `pnpm check` after each content stage
rather than at the end, which is how the YAML bug in week 3's frontmatter
(an unquoted colon inside a list item) and the `.mdx` layout bug both
surfaced as build failures instead of shipping silently.

A final re-read before shipping caught a spec violation neither check
could: the course code's last three digits had drifted to 122 somewhere
before this record of commits begins. Diffing against the repo's own
provisioning commit showed the actually-allocated digits are 000, so
[`7d153d6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Trevorwrz/commit/7d153d6)
corrects the code to SLOP4000 — a reminder that some spec lines need
checking against the repo's own history, not just against `pnpm check`.
