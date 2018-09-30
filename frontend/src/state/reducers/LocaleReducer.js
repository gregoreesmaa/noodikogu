export const LOCALE_SWAPPED = '[state] Locale swapped';

export const locale = (state = "et", action) =>
  action.type === LOCALE_SWAPPED
    ? (state === "et" ? "et-simplified" : "et")
    : state;

export const swapLocale = () => (
  {
    type: LOCALE_SWAPPED
  }
);
