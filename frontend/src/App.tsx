import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Puppy, PuppyDto, addPuppy, getPuppies, getPuppy, getPuppyImg } from './api/dataManagement';
import AddForm from './components/AddForm';
import { puppyDto } from './helper/initializer';
import UpdForm from './components/UpdForm';


function App() {

  const [puppyList, setPuppyList] = useState<Puppy[]>([]);
  const [puppy, setPuppy] = useState<Puppy>(
    {
      id: 0,
      breed: "",
      name: "",
      birthDate: ""
    }
  );
  const [puppyImg, setPuppyImg] = useState("");
  const [toggleDataView, setToggleDataView] = useState(false);
  const [toggleAddFormView, setToggleAddFormView] = useState(false);
  const [toggleUpdFormView, setToggleUpdFormView] = useState(false);

  const addNewPuppy = async () => {
    console.log("addNewPuppy")
    addPuppy(puppyDto);
  }

  const getImg =async () => {
    console.log("getImg");
    //const img = await getPuppyImg();
    //setPuppyImg(img.urls.small);
    setPuppyImg("https://hips.hearstapps.com/hmg-prod/images/chow-chow-portrait-royalty-free-image-1652926953.jpg?crop=0.44455xw:1xh;center,top&resize=980:*");
  }

  const fetchData = async () => {
    console.log("fetchData")
    const allPuppies = await getPuppies();
    setPuppyList(allPuppies);
    console.log("allPuppies", allPuppies);
  }

  const handleShowPuppy = () => {
    setToggleDataView(!toggleDataView);
  } 

  const handleShowAddFrom = () => {
    setToggleAddFormView(true);
  }

  const handleShowUpdFrom = () => {
    setToggleUpdFormView(true);
  }

  useEffect(() => {
    console.log("userEffect")
    fetchData();
    getImg();
  }, []);

  return (
    <>
      <div className="App">
      <header className="App-header">Puppies Api</header>

      <section className='puppies_section'>
      <h1 className='puppies-h1_title'>List of puppies available:</h1>
      <button className='btn-add' onClick={() => { handleShowAddFrom(); }}>Add new puppy!</button>
        {toggleAddFormView ? 
                    <AddForm />
                    : null
        }

        <section className='puppies-puppieslist'>
          {puppyList.map((p: Puppy, index: number) => {
            return (
            <section className='puppy-container' >
              <img className='puppies-puppieslist_img' src={puppyImg} onClick={() => { handleShowPuppy(); }}/>
              {toggleDataView ?
                <article className='puppies-puppieslist_data'>
                  <p>
                    <label className='puppies-puppieslist_data_label'>Name: </label> {p.name}
                  </p>
                  <p>
                    <label className='puppies-puppieslist_data_label'>Breed</label> {p.breed}
                  </p>
                  <p>
                    <label className='puppies-puppieslist_data_label'>BirthDate</label> {p.birthDate}
                  </p>
                  <button className='btn-upd' onClick={() => { handleShowUpdFrom(); }}>Edit puppy</button>
                  {toggleUpdFormView ? 
                    <UpdForm />
                    : null
                  }
                </article>
                : null
              }
            </section>
            );
          })}
          </section>
      </section>      


      </div>
    </>
  );
}

export default App;
