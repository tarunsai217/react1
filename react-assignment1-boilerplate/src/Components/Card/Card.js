import React from 'react'
import { Card } from 'react-bootstrap'
import styles from './Card.module.css'

function Carde({data:allProp}) {
    const save=()=>{
        let newsObj= JSON.parse(localStorage.getItem('news')); 

        if(newsObj){
            localStorage.setItem('news',JSON.stringify([...newsObj,allProp]))
        }
        else{
            localStorage.setItem('news', JSON.stringify([allProp]))
        }

    }
  return (
    <div className="card">
        <img
          src={allProp.urlToImage}
          className="card-img-top"
          alt="News"
        />
        <div className="card-body">
          <h6 className="card-title">{allProp.title}</h6>
          <p className="card-text">{allProp.author}</p>
          <button
            className="btn btn-primary"
          >
        <a style={{color:'white'}} href={allProp.url}> Read More </a>            
          </button>
          <button onClick={save} className="btn btn-primary" style={{float:'right'}}>Save</button>
        </div>
    </div>
    
  )
}

export default Carde