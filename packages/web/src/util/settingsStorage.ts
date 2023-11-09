import type { CurrentSettings } from "@doubles-member-generator/manager";
import { settingsSchema } from "./settingsSchema";

const STORAGE_KEY = "currentSettings";

const get = (): CurrentSettings | null => {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (!json) return null;

  const result = settingsSchema.safeParse(JSON.parse(json));
  if (!result.success) return null;

  return result.data;
};

const save = (settings: CurrentSettings) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

const clear = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};

export default { get, save, clear };
