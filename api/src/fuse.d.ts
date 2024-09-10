
declare module 'fuse.js' {
    export interface IFuseOptions<T> {
      shouldSort?: boolean;
      threshold?: number;
      location?: number;
      distance?: number;
      maxPatternLength?: number;
      minMatchCharLength?: number;
      keys: Array<keyof T>;
    }
  
    export interface IFuseResult<T> {
      item: T;
      score: number;
    }
  
    export default class Fuse<T> {
      constructor(list: T[], options: IFuseOptions<T>);
      search(query: string): IFuseResult<T>[];
    }
  }
  