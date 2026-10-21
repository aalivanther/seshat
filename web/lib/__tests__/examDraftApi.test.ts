import { afterEach, describe, expect, it, vi } from "vitest";
import { clearExamDraft, postExamDraft } from "@/lib/api";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("postExamDraft / clearExamDraft — validación en cliente", () => {
  it("un setId o un idx inválidos no llegan a fetch", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("window", { localStorage: { getItem: () => "" }, location: { port: "3000", hostname: "localhost" } });

    expect(await postExamDraft("", 1_000, 0, {})).toBeNull();
    expect(await postExamDraft("SIM-A", 1_000, 0, {})).toBeNull();
    expect(await postExamDraft("sim-a", 0, 0, {})).toBeNull();
    expect(await postExamDraft("sim-a", 1_000, -1, {})).toBeNull();
    expect(await postExamDraft("sim-a", 1_000, 9_999, {})).toBeNull();
    expect(await clearExamDraft("")).toBeNull();
    expect(await clearExamDraft("SIM-A")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
