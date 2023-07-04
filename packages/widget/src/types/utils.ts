export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type Nullable<T> = T | null | undefined;

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
