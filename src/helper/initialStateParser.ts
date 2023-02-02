export default function InitialStateParser<T>(
  key: string,
  altInitialState: T
): T {
  try {
    const localStorageState = localStorage.getItem(key);
    if (!localStorageState) return altInitialState;

    return JSON.parse(localStorageState);
  } catch (e) {
    return altInitialState;
  }
}
