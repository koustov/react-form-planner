export const getThemeData = (theme, key, default_value = '') => {
  try {
    const key_segments = key.split('.')
    let current_obj = theme
    key_segments.forEach((ks) => {
      current_obj = current_obj[ks]
    })
    return current_obj
  } catch {
    return default_value
  }
}
