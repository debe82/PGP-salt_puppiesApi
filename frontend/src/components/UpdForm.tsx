import { SetStateAction, useContext } from "react";
import { Context } from "../helper/context";
import { Puppy, updatePuppy } from "../api/dataManagement";

type Props = {
  id: number
}

function UpdForm(props: Props) {

  const { 
    setPuppyId, puppyId,
    setPuppyName, puppyName, 
    setPuppyBreed, puppyBreed, 
    setPuppyBD, puppyBD,  
    setPuppy, puppy,
    setToggleUpdFormView, toggleUpdFormView,
    setToggleDataView,
    puppyList
  } =
      useContext(Context);

  console.log("puppyList[props.id]", puppyList[props.id].id);
    

  const handleShowUpdForm = (locIndex: number) => {
     if(locIndex===toggleUpdFormView) {
      console.log("===")
      setToggleUpdFormView(-1);
      setToggleDataView(locIndex);
    } else {
      console.log("else")
      setToggleUpdFormView(locIndex);
      setToggleDataView(-1);
    } 
  }

  const updPuppy = async(puppy: Puppy) => {
    console.log("puppy", puppy);
    const updPuppy = await updatePuppy(puppy);
    console.log("updPuppy", updPuppy)
    setPuppy(JSON.parse(JSON.stringify(updPuppy)));
  }

  const handleUpdSubmit = (e: any) => {
    e.preventDefault();
    puppy.id = puppyId;

    puppy.breed = puppyBreed;
    puppy.name = puppyName;
    puppy.birthDate = puppyBD;
    updPuppy(puppy);
    setToggleUpdFormView(-1);
  }   

  return (
    <div>
      <section className='section-edit-puppy'>
        <form onSubmit={handleUpdSubmit}>
          <label className='puppy_label'>Name: </label>
          <input className='puppy-input' type='text' onChange={(e) => {setPuppyName(e.target.value)}}/>
          <label className='puppy_label'>Breed: </label>
          <input className='puppy-input' type='text'  onChange={(e) => {setPuppyBreed(e.target.value)}}/>
          <label className='puppy_label'>Birth date: </label>
          <input className='puppy-input' type='text'  onChange={(e) => {setPuppyBD(e.target.value)}}/>
          <section className='section-buttons'>
            <button className='btn-edit-puppy' onClick={() => {setPuppyId(puppyList[props.id].id); setToggleDataView(props.id);}}>Confirm</button>
            <button className='btn-cancel' onClick={() => {handleShowUpdForm(props.id); }}>Cancel</button >
          </section>
          </form>
      </section>
    </div>
  )
  
}

export default UpdForm;