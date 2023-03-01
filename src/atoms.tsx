import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({
    key: 'todoLocal',
    storage: localStorage,
})

const persistAtomCategory = recoilPersist({
    key: 'categoryLocal',
    storage: localStorage,
})

export enum Categories { 
    "TO_DO"= "TO_DO",
    "DOING"="DOING",
    "DONE"="DONE"
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}
export interface ICustomCategory{
    name:string,
    id: number
}
export const customCategoryState = atom<ICustomCategory[]>({
    key: "customCategory",
    default: [],
    effects_UNSTABLE: [persistAtomCategory.persistAtom],
})

export const categoryState =atom<Categories>({
    key: "category",
    default:Categories.TO_DO,
    effects_UNSTABLE: [persistAtomCategory.persistAtom],
})
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const toDoSelector = selector({
    key:"toDoSelector",
    get:({get})=>{
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo)=> toDo.category ===category);
    }
})

