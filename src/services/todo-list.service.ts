import api from "@/lib/axios";

export class TodoListService {
    public static async getTodoLists(): Promise<any> {
        try {
            const {data} = await api.get("/todos");
            return data.data;
        } catch (error) {
            console.error("Error fetching todo lists:", error);
        }
    }

    public static async createTodoList(data: { title: string; description: string }): Promise<any> {
        try {
            const todo = await api.post("/todos", data);
            return todo;
        } catch (error) {
            console.error("Error creating todo list:", error);
        }
    }

    public static async deleteTodoList(id: string): Promise<any> {
        try {
            const response = await api.delete(`/todos/${id}`);
            return response;
        } catch (error) {
            console.error("Error deleting todo list:", error);
        }
    }

    public static async updateTodoList(id: string, data: { title?: string; description?: string }): Promise<any> {
        try {
            const todo = await api.put(`/todos/${id}`, data);
            return todo;
        } catch (error) {
            console.error("Error updating todo list:", error);
        }
    }

    public static async toggleTodoCompletion(id: string, completed: boolean): Promise<any> {
        try {
            const todo = await api.patch(`/todos/${id}/toggle`, { completed });
            return todo;
        } catch (error) {
            console.error("Error toggling todo completion:", error);
        }
    }
}