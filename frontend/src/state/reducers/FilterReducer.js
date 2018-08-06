export const FILTER_CRITERIA_CHANGED = '[state] Filter criteria changed';
export const FILTERED_LIST_CHANGED = '[state] Filter list changed';

export const filter = (state = "", action) =>
  action.type === FILTER_CRITERIA_CHANGED
    ? action.criteria
    : state;

export const filteredList = (state = null, action) =>
  action.type === FILTERED_LIST_CHANGED
    ? action.filteredList
    : state;

export const changeFilterCriteria = (criteria) => (
  {
    type: FILTER_CRITERIA_CHANGED,
    criteria
  }
);

export const filteredListChanged = (filteredList) => (
  {
    type: FILTERED_LIST_CHANGED,
    filteredList
  }
);
