type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number): DebouncedFunction<T> => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, delay, ...args);
    };
};
