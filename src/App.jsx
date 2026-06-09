import './App.css'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import Card from '../components/Card'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setcurrentNote] = useState({title:"",desc:""})

  useEffect(()=>{
    let localNotes = localStorage.getItem("notes")
    if(localNotes){
      setNotes(JSON.parse(localNotes))
    }
  },[])



  const handleSubmit = (e)=>{
    e.preventDefault()
    setNotes([...notes, currentNote])
    setcurrentNote({title:"",desc:""})
    localStorage.setItem("notes", JSON.stringify([...notes, currentNote]))
  }

   const deleteNote=(title)=>{
    setNotes(notes.filter(item =>item.title != title))
    localStorage.setItem("notes", JSON.stringify(notes.filter(item => item.title != title)))
  }

  const handleChange = (e) =>{
    setcurrentNote({...currentNote, [e.target.name]:e.target.value})  
  }

 

  return (
    <>
      <Navbar> </Navbar>

      <main>
        <h1>Create your note</h1>
        <form  onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className='title'>Title</label>
            <input value={currentNote.title} onChange={handleChange} type="text" name='title' id='title' />
          </div>
          <div>
            <label htmlFor="desc" className='desc-txt'>Description</label>
            <textarea name="desc" id="desc" onChange={handleChange} value={currentNote.desc}></textarea>
          </div>
          <button><span className='button-txt'>Add</span></button>
        </form>
      </main>

      <section className='noteSection'>
        <h2>Notes</h2>
        <div className="container">
        {notes && notes.map(note=>{
          
       return  <Card key={note.title} title={note.title} deleteNote={deleteNote} desc={note.desc}></Card>
        })}
        {notes.length == 0 && <div>Add A Note To Continue</div>}
        </div>
      </section>

    </>
  )


}

export default App
