import { supabase } from './supabaseClient';
import { Todo } from '../types/todo';

export const fetchTodos = async (userId: string) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('inserted_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Todo[];
};

export const addTodo = async ({ title, userId }: { title: string; userId: string }) => {
  const { error } = await supabase.from('todos').insert([
    {
      title,
      user_id: userId,
    },
  ]);
  if (error) throw new Error(error.message);
};

export const deleteTodo = async (id: string) => {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw new Error(error.message);
};

export const toggleTodo = async (id: string, isComplete: boolean) => {
  const { error } = await supabase.from('todos').update({ is_complete: isComplete }).eq('id', id);
  if (error) throw new Error(error.message);
};
