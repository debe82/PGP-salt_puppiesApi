

function UpdForm() {

  return (
    <div>
                    <section className='section-edit-puppy'>
                      <form >
                        <label className='puppy_label'>Name: </label>
                        <input className='puppy-input' type='text' onChange={(e) => {}}/>
                        <label className='puppy_label'>Breed: </label>
                        <input className='puppy-input' type='text'  onChange={(e) => {}}/>
                        <label className='puppy_label'>Birth date: </label>
                        <input className='puppy-input' type='text'  onChange={(e) => {}}/>
                        <section className='section-buttons'>
                          <button className='btn-edit-puppy' onClick={() => {}}>Confirm</button>
                          <button className='btn-cancel' onClick={() => {  }}>Cancel</button >
                        </section>
                        </form>
                    </section>
    </div>
  )
  
}

export default UpdForm;