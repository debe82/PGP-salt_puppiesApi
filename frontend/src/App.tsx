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

  const handleShowPuppy = (index: number) => {
    setToggleDataView(!toggleDataView);
    setPuppy(puppyList[index]);
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
            <button className='btn-add' onClick={() => { handleShowAddFrom(); }}>Add new Puppy</button>
            {toggleAddFormView ?
              <AddForm />
            : null
            }
            <section className='puppies-puppieslist'>
            {puppyList.map((p: Puppy, index: number) => {
            return (
              <>
                <br />
                  <ul className='puppies-puppieslist_ul' key={index}>
                    <button className='puppies-puppieslist_ul_button' onClick={() => { handleShowPuppy(index); }}>
                      <img className='puppies-puppieslist_img' src={puppyImg} />
                    </button>
                    {toggleDataView ?
                        <article className='puppies-puppieslist_data'>
                          <p>
                            <label className='puppies-puppieslist_data_label'>Name: </label>{puppy.name}
                          </p>
                          <p>
                            <label className='puppies-puppieslist_data_label'>Breed: </label>{p.breed}
                          </p>
                          <p>
                            <label className='puppies-puppieslist_data_label'>BD: </label>{p.birthDate}
                          </p>
                          <button className='btn-upd' onClick={() => { handleShowUpdFrom(); }}>Update Puppy</button>
                          {toggleUpdFormView ?
                            <UpdForm />
                            : null
                          }
                        </article>
                        : null
                      }
                  </ul>
              </>
            );
          })}
            </section> 


          </section> 

          <section>

          </section>           


      </div>
    </>
  );
}

export default App;
