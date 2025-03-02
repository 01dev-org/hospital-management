import { ICRUD, IModel } from "../interfaces/Model";


class Model<T extends IModel> implements ICRUD<T> {
    private items: T[] = [];

    async create(item: T): Promise<T> {
      this.items.push(item);
      return item;
    }
  
    async find(id: string): Promise<T | null> {
      return this.items.find((item) => item.id === id) || null;
    }
  
    async update(id: string, item: Partial<T>): Promise<T | null> {
      const index = this.items.findIndex((el) => el.id === id);
      if (index === -1) return null;
  
      this.items[index] = { ...this.items[index], ...item };
      return this.items[index];
    }
  
    async delete(id: string): Promise<boolean> {
      const index = this.items.findIndex((el) => el.id === id);
      if (index === -1) return false;
  
      this.items.splice(index, 1);
      return true;
    }
  
    async list(): Promise<T[]> {
      return this.items;
    }
  }
  

  export default Model;