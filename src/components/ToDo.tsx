import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, customCategoryState, IToDo, toDoState } from "../atoms";

const LiContainer= styled.li`
    margin: 5px auto;
    max-width: 480px;
    background-color: white;
    padding: 10px 30px;
    border-radius: 20px;
    display: flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;

    span{
        margin-right: 20px;
    }
    button{
        border: none;
        background-color:#F0DBDB;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 30px;
    }
`

function ToDo({text,category,id}:IToDo){
    const setToDos = useSetRecoilState(toDoState);
    const customCategory = useRecoilValue(customCategoryState);
    const onClick =( event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget:{name}} = event;
        setToDos((oldToDos)=>{ 
            const targetIndex = oldToDos.findIndex(toDo => 
                toDo.id ===id);
            const newToDo = {text, id, category:name as any};
            return [...oldToDos.slice(0,targetIndex),newToDo,...oldToDos.slice(targetIndex+1)]})
    };
    return (
        <LiContainer>
        <span>{text}</span>
        <div>
        {category !== Categories.DOING&& (
        <button name={Categories.DOING} onClick={onClick}>Doing</button>)}
        {category !== Categories.TO_DO&& (
        <button name={Categories.TO_DO} onClick={onClick}>To Do</button>)}
        {category !== Categories.DONE&& (
        <button name={Categories.DONE} onClick={onClick}>Done</button>)}
        {customCategory.map((category)=>(
            <button name={category.name} key={category.id} onClick={onClick}>{category.name}</button>
        ))}
        </div>
        
        </LiContainer>
    )
}
export default ToDo;
