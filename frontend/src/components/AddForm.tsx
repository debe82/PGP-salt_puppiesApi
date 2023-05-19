

function AddForm() {


  return (
    <div>
          <section className='section-add-puppy'>
            <form className='add_form' >
              <label className='puppy_label'>Name: </label>
              <input className='puppy-input' type='text' placeholder="name" onChange={(event) => {
                }}/>
              <label className='puppy_label'>Breed: </label>
              <input className='puppy-input' type='text' placeholder="Breed" onChange={(event) => {
              }}/>
              <label className='puppy_label'>Birth date: </label>
              <input className='puppy-input' type='text' placeholder="BirthDate" onChange={(event) => {
                }}/>
              <section className='section-buttons'>
                <button className='btn-add-puppy'>Add!</button>
                <button className='btn-cancel' onClick={() => {  }}>Cancel</button >
              </section>
            </form>
          </section>
    </div>
  )

}

export default AddForm;