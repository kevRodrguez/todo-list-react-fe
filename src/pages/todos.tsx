import { useState } from 'react';
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

const FAKE_TODOS: Todo[] = [
    {
        id: 1,
        title: 'Completar proyecto',
        description: 'Terminar el frontend del todo-list',
        completed: false,
        created_at: '2025-10-17T10:00:00.000Z',
        updated_at: '2025-10-17T10:00:00.000Z',
    },
    {
        id: 2,
        title: 'Revisar documentación',
        description: 'Leer la documentación de la API',
        completed: true,
        created_at: '2025-10-17T09:00:00.000Z',
        updated_at: '2025-10-17T11:00:00.000Z',
    },
    {
        id: 3,
        title: 'Configurar base de datos',
        description: null,
        completed: false,
        created_at: '2025-10-17T08:00:00.000Z',
        updated_at: '2025-10-17T08:00:00.000Z',
    },
    {
        id: 4,
        title: 'Implementar diseño responsive',
        description: 'Asegurar que la aplicación se vea bien en móviles',
        completed: false,
        created_at: '2025-10-17T07:00:00.000Z',
        updated_at: '2025-10-17T07:00:00.000Z',
    },
    {
        id: 5,
        title: 'Hacer testing',
        description: 'Escribir tests unitarios y de integración',
        completed: true,
        created_at: '2025-10-16T10:00:00.000Z',
        updated_at: '2025-10-17T12:00:00.000Z',
    },
];

export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>(FAKE_TODOS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const handleAddTodo = () => {
        setSelectedTodo(null);
        setIsModalOpen(true);
    };

    const handleEditTodo = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsModalOpen(true);
    };

    const handleSaveTodo = (data: { title: string; description: string }) => {
        if (selectedTodo) {
            // Editar todo existente
            setTodos(
                todos.map((todo) =>
                    todo.id === selectedTodo.id
                        ? { ...todo, ...data, updated_at: new Date().toISOString() }
                        : todo
                )
            );
        } else {
            // Crear nuevo todo
            const newTodo: Todo = {
                id: Math.max(...todos.map((t) => t.id)) + 1,
                title: data.title,
                description: data.description || null,
                completed: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            setTodos([newTodo, ...todos]);
        }
    };

    const handleToggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed, updated_at: new Date().toISOString() }
                    : todo
            )
        );
    };

    const handleDeleteTodo = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    };

    const formatDate = (dateString: string) => {
                // Importamos los tipos necesarios y componentes para la gestión de tareas

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
                    // Estado local con la lista de tareas (inicia con FAKE_TODOS)
                    const [todos, setTodos] = useState<Todo[]>(FAKE_TODOS);
                    // Controla si el modal está abierto (crear/editar)
                    const [isModalOpen, setIsModalOpen] = useState(false);
                    // Tarea seleccionada para editar. Null indica que se va a crear una nueva.
                    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
                            <p className="text-muted-foreground text-sm">
                                Comienza creando tu primera tarea
                        // Abrir modal en modo "crear"
                        setSelectedTodo(null); // aseguramos que no hay tarea seleccionada
                        setIsModalOpen(true); // abrir modal
                    ) : (
                        <Table>
                            <TableHeader>
                        // Abrir modal en modo "editar" con la tarea seleccionada
                        setSelectedTodo(todo);
                        setIsModalOpen(true);
                                    <TableHead>Título</TableHead>
                                    <TableHead className="hidden md:table-cell">Descripción</TableHead>
                                    <TableHead className="hidden lg:table-cell">Creada</TableHead>
                                    <TableHead className="hidden lg:table-cell">Actualizada</TableHead>
                            // Editar un todo existente: mapeamos y reemplazamos el que coincide por id
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {todos.map((todo) => (
                                    <TableRow key={todo.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={todo.completed}
                            // Crear nuevo todo en cliente
                            // Nota: id generado en cliente usando Math.max -> en producción preferir id del servidor o UUID
                                                aria-label={`Marcar "${todo.title}" como ${todo.completed ? 'pendiente' : 'completada'
                                                    }`}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <span
                                                className={
                                                    todo.completed
                            // Insertamos al inicio del array para que la nueva tarea aparezca arriba
                            setTodos([newTodo, ...todos]);
                                                        : ''
                                                }
                                            >
                                                {todo.title}
                        // Alterna el estado `completed` del todo con el id dado
                        setTodos(
                            todos.map((todo) =>
                                todo.id === id
                                    ? { ...todo, completed: !todo.completed, updated_at: new Date().toISOString() }
                                    : todo
                            )
                        );
                                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                                            {formatDate(todo.created_at)}
                                        </TableCell>
                        // Confirmación básica usando `confirm`. Considerar reemplazar por un modal no bloqueante.
                        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
                            setTodos(todos.filter((todo) => todo.id !== id));
                        }
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
