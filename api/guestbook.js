// This file runs on Vercel as a SERVERLESS FUNCTION — it's your backend.
// The browser never sees this code or the secret key. The frontend calls
// /api/guestbook, this code talks to the Supabase database, and sends data back.

import { createClient } from "@supabase/supabase-js";

// Secrets come from environment variables (set locally in .env and on Vercel).
// The SECRET key has full database access, so it must stay server-side only.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
  // GET  → read all messages (newest first)
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("guestbook")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ messages: data });
  }

  // POST → add a new message
  if (req.method === "POST") {
    const { name, message } = req.body || {};

    // basic validation / sanitisation
    if (!name?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name and message are required." });
    }

    const { data, error } = await supabase
      .from("guestbook")
      .insert({
        name: name.trim().slice(0, 60),
        message: message.trim().slice(0, 500),
      })
      .select("id, name, message, created_at")
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ message: data });
  }

  // anything else → not allowed
  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}