import { Puppy, PuppyDto } from "../api/dataManagement";
  
import { puppyDto } from "./initializer";
import {
  Dispatch,
  SetStateAction,
  createContext,
} from "react";

export interface MyContextValue {
  puppyName: string;
  setPuppyName: Dispatch<SetStateAction<string>>;

}

export const Context = createContext<MyContextValue>({
  puppyName: "",
  setPuppyName: () => "",
});