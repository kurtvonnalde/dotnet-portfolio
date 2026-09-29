import { API_URL } from "../config/api";

export type ChatRole = "user" | "assistant";

export interface ChatHistoryMessage {
  role: ChatRole;
  content: string;
}

export interface ChatReply {
  answer: string;
  sources: string[];
}

export async function sendChatMessage(
  message: string,
  history: ChatHistoryMessage[],
): Promise<ChatReply> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error(
      response.status === 429
        ? "You're sending messages too quickly. Please wait a moment and try again."
        : "Sorry, I couldn't reach the assistant right now. Please try again later.",
    );
  }

  return response.json();
}
