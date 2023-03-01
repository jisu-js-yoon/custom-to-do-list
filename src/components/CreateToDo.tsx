import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const ToDoForm = styled.form`
    display: flex;
	position: relative;
	align-items: center;
	width: 100%;
	height: 3rem;
	margin: 20px auto;
	justify-content: center;

    input{
        min-width: 500px;
        border:none;
        color: #9E7676;
        font-size: 1.2rem;
        margin-right: 10px;
        &::placeholder{
            color: #9E7676;
            font-style: italic;
            padding-left: 20px;
            font-weight: 100;
        }
        
    }
    
    button{
        background-color: #F8CBA6;
        border: none;
        border-radius: 10%;
        font-size: 0.9rem;
        padding: 3px 5px;
        display: flex;
		align-items: center;
		justify-content: center;
        
    }
`

    


interface IForm{
    toDo:string;
}
function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}:IForm) => {
        setToDos(oldToDos => [{text:toDo, id:Date.now(), category:category},...oldToDos])
        setValue("toDo","");
    }
    return (
        <ToDoForm onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo",{
                    required: "Please write a to do",
                })} placeholder="Write a to do"/> 
                <button>ADD</button>
        </ToDoForm>
    )
}
export default CreateToDo;