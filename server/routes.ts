import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { setupAuth } from "./auth";

const genAI = new GoogleGenerativeAI("AIzaSyBpYLhnRGqYWNbNX1SPe3PevyP2UlC1pXk");

function requireAuth(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Set up authentication routes
  setupAuth(app);

  // Protected routes
  app.use("/api/users", requireAuth);
  app.use("/api/chat", requireAuth);
  app.use("/api/evaluation", requireAuth);

  // User routes
  app.post("/api/users", async (req, res) => {
    const user = await storage.createUser(req.body);
    res.json(user);
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });

  // Chat routes
  app.post("/api/chat", async (req, res) => {
    const userId = req.user!.id;
    const { message } = req.body;

    // Save user message
    await storage.createMessage({
      userId,
      content: message,
      isUser: true,
      timestamp: new Date()
    });

    // Get Gemini response
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = result.response.text();

    // Save AI response
    const aiMessage = await storage.createMessage({
      userId,
      content: response,
      isUser: false,
      timestamp: new Date()
    });

    res.json(aiMessage);
  });

  app.get("/api/chat/:userId", async (req, res) => {
    const messages = await storage.getMessagesByUser(parseInt(req.params.userId));
    res.json(messages);
  });

  // Evaluation routes
  app.post("/api/evaluation", async (req, res) => {
    const evaluation = await storage.saveEvaluation(req.body);
    res.json(evaluation);
  });

  app.get("/api/evaluation/:userId", async (req, res) => {
    const evaluation = await storage.getEvaluation(parseInt(req.params.userId));
    if (!evaluation) return res.status(404).json({ message: "Evaluation not found" });
    res.json(evaluation);
  });

  return httpServer;
}