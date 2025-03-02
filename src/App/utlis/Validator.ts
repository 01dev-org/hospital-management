interface IValidator {
    validate(data: Record<string, any>, rules: Record<string, string[]>): Record<string, string[]> | null;
  }
  
  class Validator implements IValidator {
    private errors: Record<string, string[]> = {};
    private data: Record<string, any> = {};
  
    public validate(data: Record<string, any>, rules: Record<string, string[]>): Record<string, string[]> | null {
      this.data = data;
      this.errors = {};
      
      for (const name in rules) {
        if (name in data) {
          for (const rule of rules[name]) {
            this.applyRule(name, data[name], rule);
          }
        } else {
          if (!this.errors[name]) this.errors[name] = [];
          this.errors[name].push(`${name} est requis.`);
        }
      }
      
      return Object.keys(this.errors).length === 0 ? null : this.errors;
    }
  
    private applyRule(name: string, value: any, rule: string): void {
      const ruleMap: Record<string, () => void> = {
        "required": () => this.required(name, value),
        "email": () => this.email(name, value),
        "phone": () => this.phone(name, value),
        "alpha": () => this.alpha(name, value),
        "alphaNum": () => this.alphaNum(name, value),
        "numeric": () => this.numeric(name, value),
        "url": () => this.url(name, value),
        "boolean": () => this.boolean(name, value),
        "date": () => this.date(name, value),
        "integer": () => this.integer(name, value),
        "float": () => this.float(name, value),
       
      };
  
      const paramRuleMap: Record<string, () => void> = {
        "min": () => this.min(name, value, rule),
        "max": () => this.max(name, value, rule),
        "same": () => this.same(name, value, rule),
        "different": () => this.different(name, value, rule),
        "in": () => this.in(name, value, rule),
        "notIn": () => this.notIn(name, value, rule),
        "regex": () => this.regex(name, value, rule),
      };
  
      if (rule in ruleMap) {
        ruleMap[rule]();
      } else {
        for (const paramRule in paramRuleMap) {
          if (rule.startsWith(`${paramRule}:`)) {
            paramRuleMap[paramRule]();
            break;
          }
        }
      }
    }
  
    private parseRuleParameter(rule: string, type: string): string {
      const regex = new RegExp(`${type}:(.+)`);
      const matches = rule.match(regex);
      return matches ? matches[1] : "";
    }
  
    private required(name: string, value: any): void {
      const strValue = String(value).trim();
      if (!strValue) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} est requis.`);
      }
    }
  
    private min(name: string, value: any, rule: string): void {
      const min = parseInt(this.parseRuleParameter(rule, "min"));
      if (String(value).length < min) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit avoir au minimum ${min} caractères.`);
      }
    }
  
    private max(name: string, value: any, rule: string): void {
      const max = parseInt(this.parseRuleParameter(rule, "max"));
      if (String(value).length > max) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit avoir au maximum ${max} caractères.`);
      }
    }
  
    private email(name: string, value: any): void {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} n'est pas un email valide.`);
      }
    }
  
    private phone(name: string, value: any): void {
      const phoneRegex = /^(?:\+221)?(70|76|77|78)[0-9]{7}$/;
      if (!phoneRegex.test(String(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} n'est pas un numéro de téléphone sénégalais valide.`);
      }
    }
  
    private alpha(name: string, value: any): void {
      const alphaRegex = /^[A-Za-z\s]+$/;
      if (!alphaRegex.test(String(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit contenir uniquement des lettres.`);
      }
    }
  
    private alphaNum(name: string, value: any): void {
      const alphaNumRegex = /^[A-Za-z0-9]+$/;
      if (!alphaNumRegex.test(String(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit contenir uniquement des lettres et des chiffres.`);
      }
    }
  
    private numeric(name: string, value: any): void {
      if (isNaN(Number(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit être un nombre.`);
      }
    }
  
    private url(name: string, value: any): void {
      try {
        new URL(String(value));
      } catch {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} n'est pas une URL valide.`);
      }
    }
  
    private boolean(name: string, value: any): void {
      const validValues = [true, false, 'true', 'false', 1, 0, '1', '0'];
      if (!validValues.includes(value)) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit être un booléen.`);
      }
    }
  
    private date(name: string, value: any): void {
      const date = new Date(String(value));
      if (isNaN(date.getTime())) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} n'est pas une date valide.`);
      }
    }
  
    private same(name: string, value: any, rule: string): void {
      const otherField = this.parseRuleParameter(rule, "same");
      if (value !== this.data[otherField]) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit être identique à ${otherField}.`);
      }
    }
  
    private different(name: string, value: any, rule: string): void {
      const otherField = this.parseRuleParameter(rule, "different");
      if (value === this.data[otherField]) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit être différent de ${otherField}.`);
      }
    }
  
    private in(name: string, value: any, rule: string): void {
      const allowedValues = this.parseRuleParameter(rule, "in").split(',');
      if (!allowedValues.includes(String(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit être l'une des valeurs suivantes : ${allowedValues.join(', ')}.`);
      }
    }
  
    private notIn(name: string, value: any, rule: string): void {
      const disallowedValues = this.parseRuleParameter(rule, "notIn").split(',');
      if (disallowedValues.includes(String(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} ne doit pas être l'une des valeurs suivantes : ${disallowedValues.join(', ')}.`);
      }
    }
  
    private integer(name: string, value: any): void {
      if (!Number.isInteger(Number(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit être un entier.`);
      }
    }
  
    private float(name: string, value: any): void {
      const num = Number(value);
      if (isNaN(num) || !isFinite(num)) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} doit être un nombre à virgule flottante.`);
      }
    }
  
  
    private regex(name: string, value: any, rule: string): void {
      const pattern = this.parseRuleParameter(rule, "regex");
      const regex = new RegExp(pattern);
      
      if (!regex.test(String(value))) {
        if (!this.errors[name]) this.errors[name] = [];
        this.errors[name].push(`${name} ne correspond pas au format attendu.`);
      }
    }
  }

  export default Validator;