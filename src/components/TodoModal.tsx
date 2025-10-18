import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Todo } from '@/interfaces/todo.interface';

// Props que recibe el componente
interface TodoModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void; // Función para manejar el cambio de estado del modal, sirve para saber si está abierto o cerrado
    todo?: Todo | null; // recibirá una tarea para editar

    onSave: (data: { title: string; description: string }) => void; // función que se ejecuta al guardar la tarea
}

export default function TodoModal({ open, onOpenChange, todo, onSave }: TodoModalProps) {

    const [title, setTitle] = useState(''); // Maneja el estado para el título de la tarea
    const [description, setDescription] = useState(''); // Maneja el estado para la descripción de la tarea

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [todo, open]);

    const handleSave = () => {
        if (!title.trim()) {
            alert('El título es obligatorio');
            return;
        }

        onSave({ title, description });
        handleClose();
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    {/* Titulo dinamico por si se edita o se crea una tarea */}
                    <DialogTitle>{todo ? 'Editar Tarea' : 'Nueva Tarea'}</DialogTitle>
                    <DialogDescription>
                        {todo
                            ? 'Modifica los detalles de tu tarea'
                            : 'Completa los detalles para crear una nueva tarea'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">
                            Título <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="title"
                            placeholder="Ej: Completar proyecto"
                            value={title}
                            // Actualiza el estado del título con cada cambio en el input
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Input
                            id="description"
                            placeholder="Ej: Terminar el frontend del todo-list"
                            value={description}
                            // Actualiza el estado de la descripción con cada cambio en el input
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                        {todo ? 'Guardar Cambios' : 'Crear Tarea'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
