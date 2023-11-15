import type { CurrentSettings } from "@doubles-member-generator/manager";
import { toSettings } from "@doubles-member-generator/manager";

const STORAGE_KEY = "currentSettings";

const get = (): CurrentSettings | null => {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (!json) return null;
  return toSettings(json);
};

const save = (settings: CurrentSettings) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

const clear = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};

export default { get, save, clear };
