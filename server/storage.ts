import { 
  User, InsertUser, 
  Message, InsertMessage,
  EvaluationResponse, InsertEvaluation 
} from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUserStressLevel(id: number, level: number): Promise<User>;

  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByUser(userId: number): Promise<Message[]>;

  // Evaluation operations
  saveEvaluation(evaluation: InsertEvaluation): Promise<EvaluationResponse>;
  getEvaluation(userId: number): Promise<EvaluationResponse | undefined>;

  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private evaluations: Map<number, EvaluationResponse>;
  private currentId: number;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.evaluations = new Map();
    this.currentId = 1;
    this.sessionStore = new SessionStore({
      checkPeriod: 86400000 // 24h
    });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user = { 
      ...insertUser, 
      id,
      userType: null,
      stressLevel: null,
      createdAt: new Date()
    } as User;
    this.users.set(id, user);
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async updateUserStressLevel(id: number, level: number): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");

    const updated = { ...user, stressLevel: level };
    this.users.set(id, updated);
    return updated;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    const message = { 
      ...insertMessage, 
      id,
      timestamp: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesByUser(userId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.userId === userId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async saveEvaluation(insertEvaluation: InsertEvaluation): Promise<EvaluationResponse> {
    const id = this.currentId++;
    const evaluation = { ...insertEvaluation, id };
    this.evaluations.set(id, evaluation);
    return evaluation;
  }

  async getEvaluation(userId: number): Promise<EvaluationResponse | undefined> {
    return Array.from(this.evaluations.values())
      .find(evaluation => evaluation.userId === userId);
  }
}

export const storage = new MemStorage();