import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function fetchTodoById(id: string) {
    const session = await auth() as CustomSession; 
    if (!session || !session.user) redirect('/');

    const accessToken = (session.user.accessToken)

    const todo_request = await fetch(`${process.env.BACKEND_URL}/api/todos/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        cache: 'force-cache'
    });

    console.log('FETCH_TODO_STATUS', todo_request.status, todo_request.statusText);

    if (!todo_request.ok) {
        return { error: 'Failed to load todo', status: todo_request.status };
    }

    const todo: TodoItem = await todo_request.json();
    return todo;

}