import { API_URL } from "../config/api";
import type { Project } from "../types/project";

export const projectApi = {
  async getAll(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    return response.json();
  },
};