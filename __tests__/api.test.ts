import { GET as getBosses } from "@/app/api/bosses/route";
import { GET as getItems } from "@/app/api/items/route";
import { GET as getWeapons } from "@/app/api/weapons/route";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockBoss = {
  id: "1",
  name: "Margit, the Fell Omen",
  image: "https://example.com/margit.png",
  description: "A mysterious figure.",
  location: "Stormveil Castle",
  drops: ["Shabriri's Woe"],
  healthPoints: 3490,
};

const mockWeapon = {
  id: "1",
  name: "Uchigatana",
  image: "https://example.com/uchigatana.png",
  description: "A katana of the Land of Reeds.",
  category: "Katana",
  weight: 5.5,
  attack: [{ name: "Phy", amount: 115 }],
  defence: [{ name: "Phy", amount: 45 }],
  requiredAttributes: [{ name: "Str", amount: 11 }],
  scalesWith: [{ name: "Dex", scaling: "D" }],
};

const mockItem = {
  id: "1",
  name: "Rowa Raisin",
  image: "https://example.com/rowa.png",
  description: "Gives a small amount of HP to your horse.",
  type: "Consumable",
  effect: "Restores a small amount of Torrent's HP.",
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("GET /api/bosses", () => {
  it("returns mapped bosses from the external API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ data: [mockBoss] }),
      }),
    );

    const response = await getBosses();
    const data = await response.json();

    expect(fetch).toHaveBeenCalledWith(
      "https://eldenring.fanapis.com/api/bosses?limit=100",
    );
    expect(data).toHaveLength(1);
    expect(data[0]).toMatchObject({
      id: mockBoss.id,
      name: mockBoss.name,
      location: mockBoss.location,
      healthPoints: mockBoss.healthPoints,
    });
  });

  it("returns an empty array when the API returns no bosses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ data: [] }),
      }),
    );

    const response = await getBosses();
    const data = await response.json();

    expect(data).toEqual({ message: "No bosses found" });
  });
});

describe("GET /api/weapons", () => {
  it("returns mapped weapons from the external API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ data: [mockWeapon] }),
      }),
    );

    const response = await getWeapons();
    const data = await response.json();

    expect(fetch).toHaveBeenCalledWith(
      "https://eldenring.fanapis.com/api/weapons?limit=100",
    );
    expect(data).toHaveLength(1);
    expect(data[0]).toMatchObject({
      id: mockWeapon.id,
      name: mockWeapon.name,
      category: mockWeapon.category,
      weight: mockWeapon.weight,
    });
  });

  it("returns an empty array when the API returns no weapons", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ data: [] }),
      }),
    );

    const response = await getWeapons();
    const data = await response.json();

    expect(data).toEqual({ message: "No weapons found" });
  });
});

describe("GET /api/items", () => {
  it("returns mapped items from the external API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ data: [mockItem] }),
      }),
    );

    const response = await getItems();
    const data = await response.json();

    expect(fetch).toHaveBeenCalledWith(
      "https://eldenring.fanapis.com/api/items?limit=100",
    );
    expect(data).toHaveLength(1);
    expect(data[0]).toMatchObject({
      id: mockItem.id,
      name: mockItem.name,
      type: mockItem.type,
      effect: mockItem.effect,
    });
  });

  it("returns a not found message when the API returns no items", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ data: [] }),
      }),
    );

    const response = await getItems();
    const data = await response.json();

    expect(data).toEqual({ message: "No items found" });
  });
});
