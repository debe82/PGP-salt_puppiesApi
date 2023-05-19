import React, { useEffect, useState } from 'react';
import './App.css';
import { Puppy, PuppyDto, addPuppy, getPuppies, getPuppy, getPuppyImg, removePuppy, updatePuppy } from './api/dataManagement';
import AddForm from './components/AddForm';
import { puppyDto } from './helper/initializer';
import UpdForm from './components/UpdForm';
import { Context } from './helper/context';



function App() {

  const [puppyList, setPuppyList] = useState<Puppy[]>([]);
  const [puppiesListSize, setPuppiesListSize] = useState(puppyList.length);

  const [puppyId, setPuppyId] = useState(0);
  const [puppyName, setPuppyName] = useState("");
  const [puppyBreed, setPuppyBreed] = useState("");
  const [puppyBD, setPuppyBD] = useState(""); 
  const [puppyImgLink, setPuppyImgLink] = useState(""); 

  const [puppy, setPuppy] = useState<Puppy>(
    {
      id: puppyId,
      breed: puppyBreed,
      name: puppyName,
      birthDate: puppyBD,
      imgLink: puppyImgLink
    }
  );

  const [toggleImgView, setToggleImgView] = useState(-1)
  const [toggleAddFormView, setToggleAddFormView] = useState(false);
  const [toggleDataView, setToggleDataView] = useState(-1);
  const [toggleUpdFormView, setToggleUpdFormView] = useState(-1);
  
  const deletePuppy = async (id: number) => {
    removePuppy(id);
    const updatedPuppiesList = puppyList.filter((p) => p.id != id);
    setPuppyList(JSON.parse(JSON.stringify(updatedPuppiesList))); //qualcosa qui non mi fa rirenderizzare i dati
  }

  const fetchData = async () => {
    console.log("fetchData");
    const allPuppies = await getPuppies();
    setPuppyList(allPuppies);
  }

  const setParameters = async() => {
    setPuppiesListSize(puppyList.length)
  }

  const handleShowPuppyData = (currIndex: number) => {
    if(currIndex===toggleDataView) {
      setToggleDataView(-1);
    } else {
      setToggleDataView(currIndex);
      setToggleImgView(currIndex);
    }
    setToggleUpdFormView(-1);
  }

  const handleShowImg = (currIndex: number) => {
    if(currIndex===toggleImgView) {
      setToggleImgView(-1);
      setToggleDataView(-1);
    } else {
      setToggleImgView(currIndex);
    }
    setToggleUpdFormView(-1);
  }

  const handleShowAddFrom = () => {
    setToggleAddFormView(!toggleAddFormView);
  }

  const handleShowUpdForm = (currIndex: number) => {
    console.log("currIndex:", currIndex);
    console.log("toggleUpdFormView:", toggleUpdFormView);
    if(currIndex===toggleUpdFormView) {
      console.log("===")
      setToggleUpdFormView(-1);
      setToggleDataView(currIndex);
    } else {
      console.log("else")
      setToggleUpdFormView(currIndex);
      setToggleDataView(-1);
    }
  }

  const handleDelete = (id: number, currIndex: number) => {
    deletePuppy(id);
    setToggleImgView(-1);
    setToggleDataView(-1);
  }

  useEffect(() => {
    fetchData();
    setParameters();
  }, [puppiesListSize, puppy]);

  return (
    <>
      <Context.Provider
        value={{
          puppyName,
          setPuppyName,
          puppyId,
          setPuppyId,
          puppyBreed,
          setPuppyBreed,
          puppyBD,
          setPuppyBD,
          puppyImgLink,
          setPuppyImgLink,
          puppyList,
          setPuppyList,
          puppiesListSize,
          setPuppiesListSize,
          toggleAddFormView,
          setToggleAddFormView,
          puppy,
          setPuppy,
          toggleDataView,
          setToggleDataView,
          toggleUpdFormView,
          setToggleUpdFormView,
      }}>


      <div className="App">
      <header className="app-header">Puppies API!</header>

      <section className='puppies_section'>
        <h1 className='puppies-h1_title'></h1>
        <button className='btn-add' onClick={() => { handleShowAddFrom(); }} >Add new puppy!</button>
        
        {toggleAddFormView ? 
        <>
          <AddForm />
        </>
          : null
        }

        <section className='puppies-puppieslist'>
          {puppyList.map((p: Puppy, index: number) => {
            return (
            <section key={index} className='puppy-container' >
              {toggleImgView != index ?
                <img className='puppies-puppieslist_img' src={p.imgLink} onClick={() => { handleShowPuppyData(index);}} alt='A picture of a ${p.breed} named ${p.name}'/>
                : null
              }  

              {toggleDataView == index  ? 
                <section className='puppies-puppieslist_data' >    
                  <p className='p-puppy_data' onClick={() => { handleShowImg(index);}}>
                    <label className='puppy_label'>Id:  {p.id}</label>
                    <br/>
                    <br/>
                    <label className='puppy_label'>Name: {p.name} </label>
                    <br/>
                    <br/>
                    <label className='puppy_label'>Breed: {p.breed} </label> 
                    <br/>
                    <br/>
                    <label className='puppy_label'>Birth date: {p.birthDate} </label> 
                  </p>  
                  <section className='section-buttons'>
                    <button className='btn-upd' onClick={() => { 
                      handleShowUpdForm(index);
                      }}>Edit</button>
                    <button className='btn-delete-puppy' onClick={() => {
                      handleDelete(p.id, index);}}>Delete</button>
                  </section>    
                </section>
                : null
              }  

              {toggleUpdFormView == index ? 
              <>
                <UpdForm id = {index}/>
              </>  
                : null
              }


   
            </section>
            );
          })}
          </section>
      </section>      


      </div>

      </Context.Provider>

    </>
  );
}

export default App;
