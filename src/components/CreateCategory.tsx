import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { customCategoryState } from "../atoms";

const CategoryForm = styled.form`
    display: flex;
    align-items: center;
	max-width: 480px;
    
	input{
        border:none;
        color: #9E7676;
        font-size: 1.2rem;
        margin-right: 10px;
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
    customCategory: string;
}

function CreateCategory(){
    const setCustomCategory = useSetRecoilState(customCategoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleFormValid =({customCategory}:IForm) => {
        setCustomCategory(prevCategory => [
            {name: customCategory, id:Date.now()}, 
            ...prevCategory])
        setValue("customCategory", "");
    }
    return (
    <CategoryForm onSubmit={handleSubmit(handleFormValid)}>
        <input {...register("customCategory")} placeholder="Add a new category"/>
        <button>ADD</button>
    </CategoryForm>
    )
}

export default CreateCategory;