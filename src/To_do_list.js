import React, { useState , useEffect} from 'react'
import './index.css'
import img from'./images.jpg'

const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists)
    }else{
        return []
    }
}

const To_do_list = () => {

    const [Input, setInput] = useState("")
    const [Items, setItems] = useState(getLocalData())
    const [Edit, setEdit] = useState("")
    const [ToggelEdit, setToggelEdit] = useState(false)

    // Adding Item Function
    const additem = () =>{
        if(!Input){
            alert (" pLz fill the data")
        }else if (Input && ToggelEdit){
            setItems(
                Items.map((currEle) => {
                    if (currEle.id === Edit){
                        return {...currEle, name:Input}
                    }
                    return currEle
                })
            )
            setInput([])
            setEdit(null)
            setToggelEdit(false)
        }
        else{
            const MynewData = {
                id:new Date().getTime().toString(),
                name:Input
            }
            setItems([...Items, MynewData])
            setInput("")
        }
    }
    // Edit Click Function
    const editItem = (index) => {
        const item_todo_edit = Items.find((currEle) => {
            return currEle.id === index
        })
        setInput(item_todo_edit.name)
        setEdit(index)
        setToggelEdit(true)
    }
    // Delete Click Function
    const deleteItem = (index) =>{
        const updatedItem = Items.filter((currEle) => {
            return currEle.id !== index
        })
        setItems(updatedItem)
    }
    // Remove All Function
    const removeAll = () => {
        setItems([])
    }

    // Adding localStorage
    useEffect(() => {
        localStorage.setItem('mytodolist',JSON.stringify(Items)) 
    }, [Items])

    return (
        <div className='main_div'>
            <div className='child_div'>
                    <img src={img} alt='image_name'/>
                    <figcaption> Add your List Here </figcaption>
                <div className='add_iteam'>
                    <input type="text"
                        placeholder='✍ add iteams here '
                        className='form-control'
                        value={Input}
                        onChange={(event) => {setInput(event.target.value)} }
                    />
                    {ToggelEdit ? <button className='edit' onClick={additem}> ✍ </button>: <button className='plus' onClick={additem}> ➕ </button>} 
                </div>
                    {Items.map((currEle) => {
                        return (
                            <div className='eachItems' key={currEle.id}>
                                <h3>{currEle.name}</h3>
                                <div className='edit_btu'>
                                    <i className='delet_btu' onClick={() => deleteItem(currEle.id)}> 🗑 </i>
                                    <i className='delet_edit' onClick={() => editItem(currEle.id)}> ✍ </i>
                                </div>
                            </div>
                        )
                    })}
                    <button className='btn' onClick={removeAll}> Clear All </button>
            </div>
        </div>
    )
}
export default To_do_list