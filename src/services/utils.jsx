export const getThemeData = (theme, key, defaultvalue = '') => {
  try {
    const val = eval(`theme.${key}`)
    return val
  } catch {
    return defaultvalue
  }
}
