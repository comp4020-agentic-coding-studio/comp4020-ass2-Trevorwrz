import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  title: string;
  related: string[];
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((n) => n.type === type);

describe("Closure Studies: the course's own claims", () => {
  it("runs exactly twelve sessions, weeks 1 through 12, each once", () => {
    const weeks = byType("sessions")
      .map((n) => n.meta?.week)
      .sort((a, b) => Number(a) - Number(b));
    expect(weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it("has assessment weights that sum to exactly 100", () => {
    const total = byType("assessments").reduce((sum, n) => sum + Number(n.meta?.weight ?? 0), 0);
    expect(total).toBe(100);
  });

  it("has at least one lecture with a real, linked slide deck", () => {
    const withSlides = byType("lectures").filter(
      (n) => typeof n.meta?.slides === "string" && /^\/decks\/[a-z0-9-]+\/$/.test(n.meta.slides as string),
    );
    expect(withSlides.length).toBeGreaterThanOrEqual(1);
  });

  it("gives the specimen-selection rule a session before the checkpoint that enforces it", () => {
    const dossierRelated = api.nodes.find((n) => n.id === "assessments/specimen-dossier")?.related ?? [];
    const specimenSession = api.nodes.find((n) => n.id === "sessions/01-choosing-your-specimen");
    expect(specimenSession, "week 1 must be the specimen-choosing session").toBeDefined();
    expect(dossierRelated.some((ref) => ref.startsWith("sessions/"))).toBe(true);
  });

  it("names a real teaching team for every session and lecture", () => {
    const peopleIds = new Set(byType("people").map((n) => n.id.replace("people/", "")));
    for (const node of [...byType("sessions"), ...byType("lectures")]) {
      const teachers = (node.meta?.teachers as string[] | undefined) ?? [];
      expect(teachers.length, `${node.id} names no teacher`).toBeGreaterThan(0);
      for (const teacher of teachers) {
        expect(peopleIds.has(teacher), `${node.id} references unknown teacher "${teacher}"`).toBe(true);
      }
    }
  });
});
