type ValidationRule<T> = (value: T) => string | null;

class Validator<T extends Record<string, any>> {
  private rules: Partial<Record<keyof T, ValidationRule<T[keyof T]>[]>> = {};


  addRule<K extends keyof T>(field: K, rule: ValidationRule<T[K]>): void {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    (this.rules[field] as ValidationRule<T[K]>[]).push(rule);
  }


  validate(data: T): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    for (const field in this.rules) {
      const fieldRules = this.rules[field] as ValidationRule<T[keyof T]>[];
      const value = data[field];

      const fieldErrors = fieldRules
        .map((rule) => rule(value))
        .filter((error): error is string => error !== null);

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    return errors;
  }

  isValid(data: T): boolean {
    return Object.keys(this.validate(data)).length === 0;
  }

  static validatePhoneSN(phone: string): string | null {
    const regex = /^(?:\+221|00221)?(70|75|76|77|78)[0-9]{7}$/;
    return regex.test(phone) ? null : "❌ Numéro de téléphone sénégalais invalide.";
  }

  static validateDate(date: string): string | null {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      return "❌ Format de date invalide. Utilisez YYYY-MM-DD.";
    }
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? "❌ Date invalide." : null;
  }
}

export default Validator;
