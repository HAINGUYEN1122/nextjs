"use client";

import { Button, Input, Row, Card, message, Space, Tag, Switch } from "antd";
import * as React from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { useState } from "react";
import {
  TodoListState,
  addTodo,
  deleteTask,
  setIsDoneTask,
} from "@/lib/features/todo/todoSlice";

const TodoList = () => {
  const todos = useAppSelector((state) => state.todo.todoList);
  return (
    <ul className="tasks-list">
      {todos?.map((todo: { id: string; content: string; isDone: boolean }) => (
        <TodoItem key={todo} />
      ))}
    </ul>
  );
};

const TodoItem = (key: {
  isDone: any; id: string; content: string 
}) => {
  const dispatch = useAppDispatch();
  const [Done, setDone] = useState(false);
  const removeTask = () => {
    dispatch(
      deleteTask({
        id: key.id,
      })
    );
  };
  const checkDone = () => {
    setDone(true);
    dispatch(
      setIsDoneTask({
        id: key.id,
      })
    );
  };
  return (
    <Row justify="space-between" style={{ marginTop: 12 }}>
      {!key.isDone ? (
        <Tag color="red">{key.content}</Tag>
      ) : (
        <Tag color="green">{key.content}</Tag>
      )}
      <Space>
        <Switch onChange={checkDone} />
        <Button onClick={removeTask}>Delete</Button>
      </Space>
    </Row>
  );
};

export default function Todos() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const onSubmit = (event: any) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      message.warning("Enter a task before adding !!");
      setValue("");
      return;
    }

    dispatch(
      addTodo({
        todo: value,
      })
    );
    setValue("");
  };

  return (
    <>
      <Row justify="center" align="middle">
        <Card title="Create New Todo">
          <Input
            placeholder="input placeholder"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            style={{ minWidth: "100vh" }}
          />
          <Button
            style={{ marginTop: 24 }}
            type="primary"
            onClick={onSubmit}
            icon={<PlusCircleTwoTone />}
          >
            Add Todo
          </Button>
        </Card>
      </Row>
      <Row justify="center" align="middle">
        <Card title="Todo List" style={{ width: "100%", marginTop: 24 }}>
          <TodoList />
        </Card>
      </Row>
    </>
  );
}
