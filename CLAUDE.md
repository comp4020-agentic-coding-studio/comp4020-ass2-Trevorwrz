# Your harness

## The course

Closure Studies (SLOP4122): a semester spent on one closed restaurant,
followed through location, menu, service and narrative until you can defend
a verdict on why it died. Single-idea thread — every session, lecture and
assessment traces back to "one specimen, followed all semester." Don't
suggest adding unrelated topics or a second case study; the brief rewards a
narrow, coherent idea over broad coverage.

## Content rules

- Every session/lecture/assessment week number must be unique within its
  collection (1–12 for sessions/lectures if dated by week, matched to the
  `week` field for assessments). Check `spec/closure-studies.test.ts` before
  assuming a new file is fine.
- `related:` is declared once, on whichever side is more natural to write
  (usually the earlier week pointing forward). Don't duplicate the same edge
  on both sides — `symmetriseRelated` renders it both ways automatically.
- Frontmatter YAML: never put a bare `:` inside an unquoted list item body
  (`- a judgement: yes or no` breaks the parser). Rephrase instead of
  quoting if it reads awkwardly quoted.
- `course-config.ts`'s `description` has an 80–300 character budget. Count
  before writing a longer one.
- Two teaching staff, Renata Szabo (evidence you can count) and Desmond
  Achebe (evidence you have to interpret). Keep session `teachers:` split
  along that line rather than assigning at random.

## Known platform quirk

`.mdx` pages under `src/pages/` do **not** get the theme's automatic
`layout:` injection that `.md` pages get — `@astrojs/mdx` runs its own
remark pipeline, separate from the one `remarkDefaultLayout` is registered
on. Any new `.mdx` page needs an explicit
`layout: ../../layouts/PageLayout.astro` in its frontmatter, or it builds
with no `<html>`, no `<title>`, no landmarks, and fails the a11y check with
no obvious cause. `.md` pages don't need this.

## Process

Commit as you go, in small, real steps — this is graded. Never commit a
state where `pnpm check` is red. `pnpm check:evidence` is the last gate
before submitting; run it, don't just assume `pnpm check` covers it.
