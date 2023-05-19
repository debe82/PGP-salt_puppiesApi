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
  puppyId: number;
  setPuppyId: Dispatch<SetStateAction<number>>;
  puppyBreed: string;
  setPuppyBreed: Dispatch<SetStateAction<string>>;
  puppyBD: string,
  setPuppyBD: Dispatch<SetStateAction<string>>;
  puppyImgLink: string;
  setPuppyImgLink: Dispatch<SetStateAction<string>>;
  puppyList: Puppy[];
  setPuppyList: Dispatch<SetStateAction<Puppy[]>>;
  puppiesListSize: number;
  setPuppiesListSize: Dispatch<SetStateAction<number>>;
  toggleAddFormView: boolean;
  setToggleAddFormView: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<MyContextValue>({
  puppyName: "",
  setPuppyName: () => "",
  puppyId: 0,
  setPuppyId: () => 0,
  puppyBreed: "",
  setPuppyBreed: () => "",
  puppyBD: "",
  setPuppyBD: () => "",
  puppyImgLink: "",
  setPuppyImgLink: () => "",
  puppyList: [],
  setPuppyList: () => "",
  puppiesListSize: 0,
  setPuppiesListSize: () => 0,
  toggleAddFormView: false,
  setToggleAddFormView: () => false
});

