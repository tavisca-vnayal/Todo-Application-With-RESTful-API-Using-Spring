package com.tavisca.workshops.ToDoApplicationWithRESTUsingSpring.controller;


import com.tavisca.workshops.ToDoApplicationWithRESTUsingSpring.model.ToDo;
import com.tavisca.workshops.ToDoApplicationWithRESTUsingSpring.service.ToDoAppServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;

@RestController
public class ToDoAppController {
    @Autowired
    private ToDoAppServices toDoAppServices;

    @GetMapping("/")
    public String homePage() {
        return "<h1><u>ToDo Application</u></h1><br>Copyright @tavisca-vnayal";
    }

    @GetMapping("/todolist")
    public ArrayList<ToDo> fetchContentsOfAllTodoItems() {
        return toDoAppServices.getContentsOfAllTodoItems();
    }

    @GetMapping("/todolist/{todoItemID}")
    public ToDo fetchContentsOfTodOItem(@PathVariable String todoItemID) {
        return toDoAppServices.getContentsOfTodoItem(todoItemID);
    }

    @PostMapping("/todolist")
    public ResponseEntity<Void> addTodoItemIntoTodoList(
            @RequestBody String todoItemContent) {

        ToDo todo = toDoAppServices.addTodoItem(todoItemContent);

        if (todo == null)
            return ResponseEntity.noContent().build();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path(
                "/{id}").buildAndExpand(todo.getTodoItemID()).toUri();

        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/todolist")
    public ArrayList<ToDo> deleteContentsOfAllTodoItems() {
        return toDoAppServices.deleteContentsOfAllTodoItems();
    }

    @DeleteMapping("/todolist/{todoItemID}")
    public ArrayList<ToDo> deleteContentsOfTodoItem(@PathVariable String todoItemID) {
        return toDoAppServices.deleteContentsOfTodoItem(todoItemID);
    }

    @PutMapping("/todolist/{todoItemID}")
    public ArrayList<ToDo> updateContentsOfTodoItem(@PathVariable String todoItemID, @RequestBody String todoItemContent) {
        return toDoAppServices.updateContentsOfTodoItem(todoItemID, todoItemContent);
    }
}
