package com.tavisca.workshops.ToDoApplicationWithRESTUsingSpring.service;

import com.tavisca.workshops.ToDoApplicationWithRESTUsingSpring.model.ToDo;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.ArrayList;

@Component
public class ToDoAppServices {
    private static ArrayList<ToDo> todoItemsList = new ArrayList<>();
    private SecureRandom random = new SecureRandom();

    public ToDo addTodoItem(String todoItemContent) {
        String randomId = new BigInteger(130, random).toString(32);
        ToDo newTodo = new ToDo(randomId,todoItemContent);
        todoItemsList.add(newTodo);
        return newTodo;
    }

    public ToDo getContentsOfTodoItem(String todoItemID) {
        for (ToDo todo: todoItemsList) {
            if(todo.getTodoItemID().equals(todoItemID)) {
                return todo;
            }
        }
        return null;
    }

    public ArrayList<ToDo> getContentsOfAllTodoItems() {
        return todoItemsList;
    }

    public ArrayList<ToDo> deleteContentsOfAllTodoItems() {
        todoItemsList.clear();
        return todoItemsList;
    }

    public ArrayList<ToDo> deleteContentsOfTodoItem(String todoItemID) {
        for (ToDo todo: todoItemsList
             ) {
            if(todo.getTodoItemID().equals(todoItemID)) {
                todoItemsList.remove(todo);
                break;
            }
        }
        return todoItemsList;
    }

    public ArrayList<ToDo> updateContentsOfTodoItem(String todoItemID, String todoItemContent) {
        for (ToDo todo: todoItemsList
             ) {
            if(todo.getTodoItemID().equals(todoItemID)) {
                todo.setTodoItemContent(todoItemContent);
                break;
            }
        }
        return todoItemsList;
    }
}
