
export interface IModel {
    id: string;
  }
  
export interface ICRUD<T extends IModel> {
    create(item: T): Promise<T>;
    find(id: string): Promise<T | null>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    list(): Promise<T[]>;
  }

