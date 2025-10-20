import { randomBytes } from 'crypto';

export class Task {
  constructor(id = null, userId = null, tittle, description = null, status) {
    this.id = id ?? randomBytes(4).toString('hex');
    this.userId = userId ?? null;
    this.tittle = tittle;
    this.description = description;
    this.status = status;
    this.createdAt = new Date();
  }
}
