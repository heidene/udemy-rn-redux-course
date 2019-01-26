// eslint-disable-next-line prefer-default-export
export const selectLibrary = libraryId => ({
  type: 'select_library',
  payload: libraryId,
});
