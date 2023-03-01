import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import { Categories, categoryState, customCategoryState, toDoSelector} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
    background-color: #F9F5E7;
    color: #A7727D;
    width: 100%;
    padding: 50px;
`
const Title = styled.h1`
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 20px;
`
const CategoryContainer =styled.div`
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
    select{
        background-color: #DBA39A;
        border-radius: 20px;
        appearance: none;
        font-size: 1rem;
        border: none;
        padding: 0 20px;
        height: 30px;
        min-width: 300px;
        max-width: 580px;
        
    }
    option{
        border: none;
        background-color: #DBA39A;

    }

`
const CategoryTitle=styled.div`
    font-size: 20px;
    margin-top: 25px;
    
`

function ToDoList(){
    const toDos= useRecoilValue(toDoSelector);
    const customCategory = useRecoilValue(customCategoryState);
    const [category,setCategory] = useRecoilState(categoryState);
    const onInput =(e: React.FormEvent<HTMLSelectElement>) =>{
        setCategory(e.currentTarget.value as any)
    }
    return (
        <Container>
            <Title>To Do List</Title> 
            <hr />
            
            <CategoryContainer>
            <CreateCategory />
                <select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>To Do</option>
                    <option value={Categories.DOING}>Doing</option>
                    <option value={Categories.DONE}>Done</option>
                    {customCategory.map((category)=>                        
                    <option key={category.id}>{category.name}</option>
                    )}
                </select>
            </CategoryContainer>
            <hr />
            
            <CategoryTitle>{category}</CategoryTitle>
            <CreateToDo />
            {toDos?.map(toDo=> <ToDo key={toDo.id} {...toDo} />)}
        </Container>
    )
}
export default ToDoList;