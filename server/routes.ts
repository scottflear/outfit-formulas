import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { supabase } from "./supabase";

const LeadSchema = z.object({
  email: z.string().email(),
  funnel_id: z.string().min(1),
  archetype: z.string().optional(),
  first_name: z.string().optional(),
  quiz_answers: z.record(z.unknown()).optional(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // POST /api/leads — called by the quiz when an email-capture screen is answered.
  // Upserts a lead into Supabase keyed on (email, funnel_id).
  app.post("/api/leads", async (req: Request, res: Response) => {
    const parsed = LeadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { email, funnel_id, archetype, first_name, quiz_answers } = parsed.data;

    const { data, error } = await supabase
      .from("leads")
      .upsert(
        { email, funnel_id, archetype, first_name, quiz_answers: quiz_answers ?? {} },
        { onConflict: "email,funnel_id", ignoreDuplicates: false }
      )
      .select("id, email, funnel_id, created_at")
      .single();

    if (error) {
      console.error("[leads] Supabase error:", error.message);
      res.status(500).json({ error: "Failed to save lead" });
      return;
    }

    res.status(200).json({ ok: true, lead: data });
  });

  // POST /api/email-events — called when an email is sent / opened / clicked.
  // Used for tracking lightweight lifecycle sequences outside of Braze.
  app.post("/api/email-events", async (req: Request, res: Response) => {
    const EventSchema = z.object({
      lead_id: z.string().uuid().optional(),
      email: z.string().email(),
      funnel_id: z.string().min(1),
      event_type: z.enum(["sent", "opened", "clicked", "bounced", "unsubscribed"]),
      sequence_name: z.string().optional(),
      step_number: z.number().int().optional(),
      email_subject: z.string().optional(),
      metadata: z.record(z.unknown()).optional(),
    });

    const parsed = EventSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { error } = await supabase.from("email_events").insert(parsed.data);

    if (error) {
      console.error("[email-events] Supabase error:", error.message);
      res.status(500).json({ error: "Failed to record event" });
      return;
    }

    res.status(200).json({ ok: true });
  });

  return httpServer;
}
