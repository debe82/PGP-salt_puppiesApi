import React, { useEffect, useState } from 'react';
import './App.css';
import { Puppy, PuppyDto, addPuppy, getPuppies, getPuppy, getPuppyImg, removePuppy, updatePuppy } from './api/dataManagement';
import AddForm from './components/AddForm';
import { puppyDto } from './helper/initializer';
import UpdForm from './components/UpdForm';


function App() {

  const [puppyList, setPuppyList] = useState<Puppy[]>([]);
  const [puppiesListSize, setPuppiesListSize] = useState(puppyList.length);

  const [puppy, setPuppy] = useState<Puppy>(
    {
      puppyId: 0,
      breed: "",
      name: "",
      birthDate: ""
    }
  );

  const [puppyId, setPuppyId] = useState(0);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState(""); 

  const [puppyImg, setPuppyImg] = useState("");
  const [puppyImgList, setPuppyImgList] = useState<string[]>([]);

  const [toggleDataView, setToggleDataView] = useState(-1);
  const [toggleAddFormView, setToggleAddFormView] = useState(false);
  const [toggleUpdFormView, setToggleUpdFormView] = useState(false);

  const addNewPuppy = async (puppyDto: PuppyDto) => {
    const addedPuppy = await addPuppy(puppyDto);
    setPuppyList(JSON.parse(JSON.stringify([...puppyList, addedPuppy])));
  }

  const updPuppy = async(puppy: Puppy) => {
    updatePuppy(puppy);
  }

  const deletePuppy = async (id: number) => {
    removePuppy(id);
  }

  const getImg =async () => {
    console.log("getImg");

/*     let puppiesImgResponse = new Array();
    puppiesImgResponse = await getPuppyImg(puppiesListSize);

    let puppiesImgs: string[] = [];

    if (puppiesListSize != 0) {

       for (let i=0; i< puppiesImgResponse.length; i ++) {
        puppiesImgs.push(puppiesImgResponse[i].urls.small);
      } 
    }

    setPuppyImgList(puppiesImgs); */

    setPuppyImg("https://hips.hearstapps.com/hmg-prod/images/chow-chow-portrait-royalty-free-image-1652926953.jpg?crop=0.44455xw:1xh;center,top&resize=980:*");
    
    //return puppyImgList;
    return puppyImg;
  }

  const fetchData = async () => {
    console.log("fetchData");
    const allPuppies = await getPuppies();
    setPuppyList(allPuppies);
    setPuppiesListSize(puppyList.length)
  }

  const handleShowPuppy = (currIndex: number) => {
    if(currIndex===toggleDataView) {
      setToggleDataView(-1);
    } else {
      setToggleDataView(currIndex);
    }
  }

  const handleShowAddFrom = () => {
    setToggleAddFormView(!toggleAddFormView);
  }

  const handleShowUpdFrom = () => {
    setToggleUpdFormView(!toggleUpdFormView);
  }

  const handleAddSubmit = async (e: any) => {
    e.preventDefault();
    puppyDto.breed = breed;
    puppyDto.name = name;
    puppyDto.birthDate = birthDate;
    addNewPuppy(puppyDto);    
  }

  const handleUpdSubmit = (e: any) => {
    e.preventDefault();
    puppy.puppyId = puppyId;
    puppy.breed = breed;
    puppy.name = name;
    puppy.birthDate = birthDate;
    updPuppy(puppy);
    setPuppy(JSON.parse(JSON.stringify(puppy)));
  }

  const handleDelete = (id: number) => {
    console.log("id: ", id);
    deletePuppy(id);
    setPuppy(JSON.parse(JSON.stringify(puppy)));
  }

  useEffect(() => {
    fetchData();
    getImg();
  }, [puppiesListSize, puppy]);

  return (
    <>
      <div className="App">
      <header className="App-header">Puppies Api</header>

      <section className='puppies_section'>
      <h1 className='puppies-h1_title'>List of puppies available:</h1>
      <button className='btn-add' onClick={() => { handleShowAddFrom(); }}>Add new puppy!</button>

        {toggleAddFormView ? 
          <section className='section-add-puppy'>
              <form onSubmit={handleAddSubmit}>
              <label className='puppy_label'>Name: </label>
              <input className='puppy-input' type='text' placeholder="name" onChange={(event) => {
                setName(event.target.value);}}/>
              <label className='puppy_label'>Breed: </label>
              <input className='puppy-input' type='text' placeholder="Breed" onChange={(event) => {
                setBreed(event.target.value);}}/>
              <label className='puppy_label'>Birth date: </label>
              <input className='puppy-input' type='text' placeholder="BirthDate" onChange={(event) => {
                setBirthDate(event.target.value);}}/>
              <section className='section-buttons'>
                <button className='btn-add-puppy'>Add puppy!</button>
                <button className='btn-cancel' onClick={() => { handleShowAddFrom(); }}>Cancel</button >
              </section>
            </form>
          </section>
          : null
        }

        <section className='puppies-puppieslist'>
          {puppyList.map((p: Puppy, index: number) => {
            return (
            <section key={index} className='puppy-container' >
              <img className='puppies-puppieslist_img' src={puppyImg} onClick={() => { handleShowPuppy(index); }}/>
              {toggleDataView == index  ? 
                <article className='puppies-puppieslist_data'>    
                  <p>
                    <label className='puppy_label'>id: </label> {p.puppyId}
                  </p>          
                  <p>
                    <label className='puppy_label'>Name: </label> {p.name}
                  </p>
                  <p>
                    <label className='puppy_label'>Breed: </label> {p.breed}
                  </p>
                  <p>
                    <label className='puppy_label'>Birth date: </label> {p.birthDate}
                  </p>
                  <button className='btn-upd' onClick={() => { handleShowUpdFrom(); }}>Edit puppy</button>
                  <button className='btn-delete-puppy' onClick={() => {
                    console.log("p.puppyId: ", p.puppyId)
                    //setPuppyId(p.puppyId);
                    handleDelete(p.puppyId);}}>Delete</button>

                  {toggleUpdFormView ? 
                  <>
                    <section className='section-edit-puppy'>
                      <form onSubmit={handleUpdSubmit}>
                        <label className='puppy_label'>Name: </label>
                        <input className='puppy-input' type='text'  onChange={(e) => {setName(e.target.value)}}/>
                        <label className='puppy_label'>Breed: </label>
                        <input className='puppy-input' type='text'  onChange={(e) => {setBreed(e.target.value)}}/>
                        <label className='puppy_label'>Birth date: </label>
                        <input className='puppy-input' type='text'  onChange={(e) => {setBirthDate(e.target.value)}}/>
                        <section className='section-buttons'>
                          <button className='btn-edit-puppy' onClick={() => {setPuppyId(p.puppyId)}}>Confirm</button>
                          <button className='btn-cancel' onClick={() => { handleShowUpdFrom(); }}>Cancel</button >
                        </section>
                        </form>
                    </section>
                    <section className='section-delete-puppy'>
                  </section>
                  </>  
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
