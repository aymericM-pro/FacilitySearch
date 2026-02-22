export function useLocalStorage() {
    const getItem = <T = string>(key: string): T | null => {
        const value = localStorage.getItem(key)
        if (value === null) return null
        try {
            return JSON.parse(value) as T
        } catch {
            return value as unknown as T
        }
    }

    const setItem = <T>(key: string, value: T): void => {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
    }

    const removeItem = (key: string): void => {
        localStorage.removeItem(key)
    }

    const clear = (): void => {
        localStorage.clear()
    }

    return { getItem, setItem, removeItem, clear }
}
