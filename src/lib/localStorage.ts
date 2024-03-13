export function setLocalStorage(key: string, value?: string) {
  if (value) {
    localStorage.setItem(key, value)
  }
}
