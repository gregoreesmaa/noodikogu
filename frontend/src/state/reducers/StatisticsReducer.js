export const STATISTICS_LOADED = '[state] Statistics loaded';

export const statistics = (state = null, action) =>
  action.type === STATISTICS_LOADED
    ? action.statistics
    : state;

export const setStatistics = (statistics) => (
  {
    type: STATISTICS_LOADED,
    statistics
  }
);
