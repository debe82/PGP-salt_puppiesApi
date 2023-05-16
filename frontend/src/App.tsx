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
  const [toggleImgView, setToggleImgView] = useState(true)


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
    setPuppyList(JSON.parse(JSON.stringify([puppyList]))); //qualcosa qui non mi fa rirenderizzare i dati
  }

  const getImg =async () => {
    console.log("getImg");

/*      let puppiesImgResponse = new Array();
    puppiesImgResponse = await getPuppyImg(puppiesListSize);

    let puppiesImgs: string[] = [];

    if (puppiesListSize != 0) {

       for (let i=0; i< puppiesListSize; i ++) {
        console.log("puppiesImgResponse[i].urls.small: ", puppiesImgResponse[i].urls.small);
        puppiesImgs.push(puppiesImgResponse[i].urls.small);
      } 
    }

    setPuppyImgList(puppiesImgs);  

    return puppyImgList; */

    setPuppyImg("https://hips.hearstapps.com/hmg-prod/images/chow-chow-portrait-royalty-free-image-1652926953.jpg?crop=0.44455xw:1xh;center,top&resize=980:*");
    return puppyImg;

  }

  const fetchData = async () => {
    console.log("fetchData");
    const allPuppies = await getPuppies();
    console.log("allPuppies: ",allPuppies);
    setPuppyList(allPuppies);
  }

  const setParameters = async() => {
    console.log("puppyList: ", puppyList);
    setPuppiesListSize(puppyList.length)
    console.log("puppiesListSize: ", puppiesListSize);
  }

  const handleShowPuppyData = (currIndex: number) => {
    if(currIndex===toggleDataView) {
      setToggleDataView(-1);
    } else {
      setToggleDataView(currIndex);
      //setToggleImgView(false);
    }
  }

  const handleShowImg = () => {
 //   setToggleImgView(!toggleImgView)
 ///   setToggleDataView(-1);
  }

  const handleSwitch = (index: number) => {
    handleShowImg();
    handleShowPuppyData(index);
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
    setToggleUpdFormView(!toggleUpdFormView);
  }

  const handleDelete = (id: number) => {
    deletePuppy(id);
  }

  useEffect(() => {
    fetchData();
    console.log("puppyList length: ", puppyList.length);
    setParameters();
    getImg();
  }, [puppiesListSize, puppy]);

  return (
    <>
      <div className="App">
      <header className="App-header">Puppies API!</header>

      <section className='puppies_section'>
        <h1 className='puppies-h1_title'></h1>
        <button className='btn-add' onClick={() => { handleShowAddFrom(); }}>Add new puppy!</button>

        {toggleAddFormView ? 
          <section className='section-add-puppy'>
            <form className='add_form' onSubmit={handleAddSubmit}>
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
              {toggleImgView ?
                <img className='puppies-puppieslist_img' src={puppyImg /*puppyImgList[index]*/} onClick={() => { handleShowPuppyData(index);}}/>
                : null
              }  
              {toggleDataView == index  ? 
                <section className='puppies-puppieslist_data' onClick={() => { handleShowImg();}}>    
                    <label className='puppy_label'>id: </label> {p.puppyId}
                    <br/>
                    <label className='puppy_label'>Name: </label> {p.name}
                    <br/>
                    <label className='puppy_label'>Breed: </label> {p.breed}
                    <br/>
                    <label className='puppy_label'>Birth date: </label> {p.birthDate}
                    <br/>
                    <button className='btn-upd' onClick={() => { 
                      handleShowUpdFrom();
                      }}>Edit</button>
                    <button className='btn-delete-puppy' onClick={() => {
                      handleDelete(p.puppyId);}}>Delete</button>

                  {toggleUpdFormView ? 
                  <>
                    <section className='section-edit-puppy'>
                      <form onSubmit={handleUpdSubmit}>
                        <label className='puppy_label'>Name: </label>
                        <input className='puppy-input' type='text' onChange={(e) => {setName(e.target.value)}}/>
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

                </section>
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
