package com.tavisca.workshops.ToDoApplicationWithRESTUsingSpring.model;

public class ToDo {
    private String todoItemID;
    private String todoItemContent;

    public ToDo(String todoItemID, String todoItemContent) {
        this.todoItemID = todoItemID;
        this.todoItemContent = todoItemContent;
    }

    public String getTodoItemID() {
        return this.todoItemID;
    }

    public String getTodoItemContent() {
        return this.todoItemContent;
    }

    public void setTodoItemContent(String todoItemContent) {
        this.todoItemContent = todoItemContent;
    }

}
