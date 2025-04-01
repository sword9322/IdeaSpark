import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateIdeaSchema, insertIdeaSchema } from "@shared/schema";
import { nanoid } from "nanoid";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Real AI function to generate ideas using OpenAI
async function generateIdeasFromAI(prompt: string, category: string): Promise<string[]> {
  try {
    const formattedPrompt = `Generate 3-5 ${category} ideas for: ${prompt}. 
    Each idea should be concise (maximum 150 characters each) and creative.
    Return ONLY the ideas as a numbered list, with no introductions or conclusions.
    Format each idea as a single sentence or short phrase.`;
    
    // Make API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a creative idea generator that provides concise, innovative ideas based on user prompts. Your ideas should be specific, actionable, and focused on the given category." 
        },
        { 
          role: "user", 
          content: formattedPrompt 
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
    });
    
    // Extract and parse the response
    const content = response.choices[0].message.content || "";
    console.log("OpenAI response:", content);
    
    // Parse the numbered list into separate ideas
    const ideas = content
      .split(/\d+\./)
      .map(idea => idea.trim())
      .filter(idea => idea.length > 0)
      .map(idea => idea.replace(/^[\s-]+|[\s-]+$/g, '')); // Remove leading/trailing spaces and dashes
    
    return ideas;
  } catch (error) {
    console.error("Error generating ideas from OpenAI:", error);
    throw new Error("Failed to generate ideas from AI");
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate and store ideas
  app.post('/api/ideas', async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validated = generateIdeaSchema.parse(req.body);
      const { prompt, category } = validated;
      
      try {
        // Generate ideas using AI
        const generatedIdeas = await generateIdeasFromAI(prompt, category);
        
        // Make sure we have at least one idea
        if (!generatedIdeas || generatedIdeas.length === 0) {
          throw new Error("No ideas were generated");
        }
        
        // Create a unique ID for the ideas set
        const uniqueId = nanoid(6);
        
        // Create and store the idea
        const newIdea = {
          uniqueId,
          prompt,
          category,
          ideasList: generatedIdeas
        };
        
        const savedIdea = await storage.createIdea(newIdea);
        
        // Return the idea with the shareable URL
        res.status(201).json({
          id: uniqueId,
          prompt,
          category,
          ideas: generatedIdeas,
          shareUrl: `/ideas/${uniqueId}`
        });
      } catch (aiError) {
        console.error("AI generation error:", aiError);
        return res.status(500).json({ 
          message: "Failed to generate ideas with AI. Please try again with a different prompt."
        });
      }
    } catch (error) {
      console.error("Error creating ideas:", error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: fromZodError(error).message 
        });
      }
      
      res.status(500).json({ message: "Failed to generate ideas" });
    }
  });

  // Get ideas by ID
  app.get('/api/ideas/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const idea = await storage.getIdea(id);
      
      if (!idea) {
        return res.status(404).json({ message: "Ideas not found" });
      }
      
      res.json({
        id: idea.uniqueId,
        prompt: idea.prompt,
        category: idea.category,
        ideas: idea.ideasList
      });
    } catch (error) {
      console.error("Error fetching ideas:", error);
      res.status(500).json({ message: "Failed to fetch ideas" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
