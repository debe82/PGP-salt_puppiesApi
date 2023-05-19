import React, { useEffect, useState } from 'react';
import './App.css';
import { Puppy, PuppyDto, addPuppy, getPuppies, getPuppy, getPuppyImg, removePuppy, updatePuppy } from './api/dataManagement';
import AddForm from './components/AddForm';
import { puppyDto } from './helper/initializer';
import UpdForm from './components/UpdForm';


function App() {

  const [puppyList, setPuppyList] = useState<Puppy[]>([]);
  const [puppiesListSize, setPuppiesListSize] = useState(puppyList.length);

  const [puppyId, setPuppyId] = useState(0);
  const [puppyName, setPuppyName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState(""); 
  const [imgLink, setImgLink] = useState(""); 

  const [puppy, setPuppy] = useState<Puppy>(
    {
      puppyId: puppyId,
      breed: breed,
      name: puppyName,
      birthDate: birthDate,
      imgLink: imgLink
    }
  );

  const [puppyImg, setPuppyImg] = useState("");
  const [puppyImgList, setPuppyImgList] = useState<string[]>([]);

  const [toggleDataView, setToggleDataView] = useState(-1);
  const [toggleAddFormView, setToggleAddFormView] = useState(false);
  const [toggleUpdFormView, setToggleUpdFormView] = useState(-1);
  const [toggleImgView, setToggleImgView] = useState(-1)


  const addNewPuppy = async (puppyDto: PuppyDto) => {
    const addedPuppy = await addPuppy(puppyDto);
    setPuppyList(JSON.parse(JSON.stringify([...puppyList, addedPuppy])));
  }

  const updPuppy = async(puppy: Puppy) => {
    const updPuppy = await updatePuppy(puppy);
    setPuppy(JSON.parse(JSON.stringify(updPuppy)));
  }

  const deletePuppy = async (id: number) => {
    removePuppy(id);
    const updatedPuppiesList = puppyList.filter((p) => p.puppyId != id);
    setPuppyList(JSON.parse(JSON.stringify(updatedPuppiesList))); //qualcosa qui non mi fa rirenderizzare i dati
  }

  const getImg =async () => {
    console.log("getImg");

    let puppiesImgResponse = new Array();
    puppiesImgResponse = await getPuppyImg();

    if (puppiesListSize != 0) {
      setPuppyImg(puppiesImgResponse[0].urls.thumb);
    }
    setImgLink(puppiesImgResponse[0].urls.small);
    return puppiesImgResponse[0].urls.small;
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

  const handleAddSubmit = async (e: any) => {
    e.preventDefault();
    puppyDto.breed = breed;
    puppyDto.name = puppyName;
    puppyDto.birthDate = birthDate;
    puppyDto.imgLink = await getImg();
    addNewPuppy(puppyDto);    
    setToggleAddFormView(!toggleAddFormView);
  }

  const handleUpdSubmit = (e: any) => {
    e.preventDefault();

    puppy.puppyId = puppyId;
    puppy.breed = breed;
    puppy.name = puppyName;
    puppy.birthDate = birthDate;
    updPuppy(puppy);
    setToggleUpdFormView(-1);
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
      <div className="App">
      <header className="app-header">Puppies API!</header>

      <section className='puppies_section'>
        <h1 className='puppies-h1_title'></h1>
        <button className='btn-add' onClick={() => { handleShowAddFrom(); }} >Add new puppy!</button>

        {toggleAddFormView ? 
          <section className='section-add-puppy'>
            <form className='add_form' onSubmit={handleAddSubmit}>
              <label className='puppy_label'>Name: </label>
              <input className='puppy-input' type='text' placeholder="name" onChange={(event) => {
                setPuppyName(event.target.value);}}/>
              <label className='puppy_label'>Breed: </label>
              <input className='puppy-input' type='text' placeholder="Breed" onChange={(event) => {
                setBreed(event.target.value);}}/>
              <label className='puppy_label'>Birth date: </label>
              <input className='puppy-input' type='text' placeholder="BirthDate" onChange={(event) => {
                setBirthDate(event.target.value);}}/>
              <br/>  
              <section className='section-buttons'>
                <button className='btn-add-puppy'>Add!</button>
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
              {toggleImgView != index ?
                <img className='puppies-puppieslist_img' src={p.imgLink} onClick={() => { handleShowPuppyData(index);}} alt='A picture of a ${p.breed} named ${p.name}'/>
                : null
              }  
              {toggleDataView == index  ? 
                <section className='puppies-puppieslist_data' >    
                  <p className='p-puppy_data' onClick={() => { handleShowImg(index);}}>
                    <label className='puppy_label'>Id:  {p.puppyId}</label>
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
                      handleDelete(p.puppyId, index);}}>Delete</button>
                  </section>    
                </section>
                : null
              }  

              {toggleUpdFormView == index ? 
              <>
                <section className='section-edit-puppy'>
                  <form onSubmit={handleUpdSubmit}>
                    <label className='puppy_label'>Name: </label>
                    <input className='puppy-input' type='text' onChange={(e) => {setPuppyName(e.target.value)}}/>
                    <label className='puppy_label'>Breed: </label>
                    <input className='puppy-input' type='text'  onChange={(e) => {setBreed(e.target.value)}}/>
                    <label className='puppy_label'>Birth date: </label>
                    <input className='puppy-input' type='text'  onChange={(e) => {setBirthDate(e.target.value)}}/>
                    <section className='section-buttons'>
                      <button className='btn-edit-puppy' onClick={() => {setPuppyId(p.puppyId); setToggleDataView(index);}}>Confirm</button>
                      <button className='btn-cancel' onClick={() => { handleShowUpdForm(index); }}>Cancel</button >
                    </section>
                    </form>
                </section>
              </>  
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
