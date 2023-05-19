import { useContext } from "react";
import { Context } from "../helper/context";
import { puppyDto } from "../helper/initializer";
import { PuppyDto, addPuppy, getPuppyImg } from "../api/dataManagement";



function AddForm() {
  const { 
    setPuppyName, puppyName, 
    setPuppyBreed, puppyBreed, 
    setPuppyBD, puppyBD,  
    setPuppyList, puppyList,
    puppiesListSize,
    setPuppyImgLink,
    setToggleAddFormView, toggleAddFormView
  } =
      useContext(Context);

  const handleShowAddFrom = () => {
    setToggleAddFormView(!toggleAddFormView);
  }

  const addNewPuppy = async (puppyDto: PuppyDto) => {
    const addedPuppy = await addPuppy(puppyDto);
    setPuppyList(JSON.parse(JSON.stringify([...puppyList, addedPuppy])));
  }    

  const getImg =async (breed: string) => {
    console.log("getImg");
    let puppiesImgResponse = new Array();
    puppiesImgResponse = await getPuppyImg(breed);

    if (puppiesListSize != 0) {
      setPuppyImgLink(puppiesImgResponse[0].urls.small);
    }
    
    return puppiesImgResponse[0].urls.small;
  }

  const handleAddSubmit = async (e: any) => {
    e.preventDefault();
    puppyDto.breed = puppyBreed;
    puppyDto.name = puppyName;
    puppyDto.birthDate = puppyBD;
    puppyDto.imgLink = await getImg(puppyDto.breed);
    addNewPuppy(puppyDto);    
    setToggleAddFormView(!toggleAddFormView);
  }      

  return (
    <div>
          <section className='section-add-puppy'>
            <form className='add_form' onSubmit={handleAddSubmit}>
              <label className='puppy_label'>Name: </label>
              <input className='puppy-input' type='text' placeholder="name" onChange={(event) => {
                setPuppyName(event.target.value);}}/>
              <label className='puppy_label'>Breed: </label>
              <input className='puppy-input' type='text' placeholder="Breed" onChange={(event) => {
                setPuppyBreed(event.target.value);}}/>
              <label className='puppy_label'>Birth date: </label>
              <input className='puppy-input' type='text' placeholder="BirthDate" onChange={(event) => {
                setPuppyBD(event.target.value);}}/>
              <section className='section-buttons'>
                <button className='btn-add-puppy'>Add!</button>
                <button className='btn-cancel' onClick={() => { handleShowAddFrom();}}>Cancel</button >
              </section>
            </form>
          </section>
    </div>
  )

}

export default AddForm;