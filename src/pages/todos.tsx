import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import TodoModal from '@/components/TodoModal';
import type { Todo } from '@/interfaces/todo.interface';
import { TodoListService } from '@/services/todo-list.service';


export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        const todosResponse = await TodoListService.getTodoLists();
        if (todosResponse) {
            setTodos(todosResponse);
        }
    }

    const handleAddTodo = () => {
        setSelectedTodo(null);
        setIsModalOpen(true);
    };

    const handleEditTodo = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsModalOpen(true);
    };

    const handleSaveTodo = async (data: { title: string; description: string }) => {
        if (selectedTodo) {
            const response = await TodoListService.updateTodoList(selectedTodo.id.toString(), data);
            if (response) {
                loadTodos();
            }
        } else {
            // Crear nuevo todo
            const response = await TodoListService.createTodoList(data);

            if (response) {
                loadTodos();
            }
        }
    };

    const handleToggleTodo = async (id: number) => {
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return;

        const response = await TodoListService.toggleTodoCompletion(id.toString(), !todo.completed);

        if (response){
            loadTodos();
            return;
        } else {
            alert('Error al actualizar el estado de la tarea');
            return;
        }
    };

    const handleDeleteTodo = async (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            const response = await TodoListService.deleteTodoList(id.toString());
            
            if (response) {
                alert('Tarea eliminada correctamente');
                loadTodos();
            } else {
                alert('Error al eliminar la tarea');
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };


    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Lista de Tareas</h1>
                <p className="text-muted-foreground">
                    Gestiona tus tareas de forma eficiente
                </p>
            </div>

            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-end">
                    
                    <Button onClick={handleAddTodo} size="default">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        Nueva Tarea
                    </Button>
                </CardHeader>
                <CardContent>
                    {todos.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg mb-2">
                                No hay tareas aún
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Comienza creando tu primera tarea
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">Estado</TableHead>
                                    <TableHead>Título</TableHead>
                                    <TableHead className="hidden md:table-cell">Descripción</TableHead>
                                    <TableHead className="hidden lg:table-cell">Creada</TableHead>
                                    <TableHead className="hidden lg:table-cell">Actualizada</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {todos.map((todo) => (
                                    <TableRow key={todo.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={todo.completed}
                                                onCheckedChange={() => handleToggleTodo(todo.id)}
                                                aria-label={`Marcar "${todo.title}" como ${todo.completed ? 'pendiente' : 'completada'
                                                    }`}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <span
                                                className={
                                                    todo.completed
                                                        ? 'line-through text-muted-foreground'
                                                        : ''
                                                }
                                            >
                                                {todo.title}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <span className="text-muted-foreground text-sm">
                                                {todo.description || '-'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                                            {formatDate(todo.created_at)}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                                            {formatDate(todo.updated_at)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    onClick={() => handleEditTodo(todo)}
                                                    aria-label={`Editar "${todo.title}"`}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                        <path d="m15 5 4 4" />
                                                    </svg>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    onClick={() => handleDeleteTodo(todo.id)}
                                                    aria-label={`Eliminar "${todo.title}"`}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M3 6h18" />
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <TodoModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                todo={selectedTodo}
                onSave={handleSaveTodo}
            />
        </div>
    );
    
}
