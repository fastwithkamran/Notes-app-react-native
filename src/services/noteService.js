import { ID, Query } from "react-native-appwrite";
import databaseService from "./databaseService";

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get Notes
  async getNotes(userId) {
    if (!userId) {
      console.error("Error: Missing userId");
      return {
        data: [],
        error: "User ID is missing",
      };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal("user_id", userId),
      ]);

      return response;
    } catch (error) {
      console.error("Error fetching notes: ", error.message);
      return {
        data: [],
        error: error.message,
      };
    }
  },

  // Add Note
  async addNote(text, user_id) {
    if (!text) return { error: "Note is empty" };

    const data = {
      text: text,
      user_id: user_id,
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      ID.unique(),
      data,
    );

    if (response?.error) return { error: response.error };

    return { data: response };
  },

  // Update Note
  async updateNote(id, text) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text,
    });

    if (response?.error) return { error: response.error };

    return { data: response };
  },

  // Delete Note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);

    if (response?.error) return { error: error.message };

    return { success: true };
  },
};

export default noteService;
