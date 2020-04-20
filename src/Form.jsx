import React, { useState } from 'react';
import './Form.css';




const Form = () => {

    const [myMovie, updateMyMovie] = useState({
            title: '',
            poster: '',
            // director: '',
            // year: '',
            // genre: '',
            comment: ''
    })

    const submitInfo = async (event) => {
        event.preventDefault();
        console.log('Success!')
        await fetch('https://post-a-form.herokuapp.com/api/movies', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: myMovie.title,
                poster: myMovie.poster,
                // director: myMovie.director,
                // year: myMovie.year,
                // genre: myMovie.genre,
                comment: myMovie.comment
            })
        })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            alert(`your favourite movie #${res} has been successfully added!`);
          }
        }).catch(e => {
          console.error(e);
          alert('There was an error when adding the movie.');
        });

        console.log('succesful fetch')
    }


    return (
        <div className= 'Form'>
            <form className='formulario' onSubmit={(event) => submitInfo(event)}>
                
                <label className= 'movie_title' htmlFor="title">Movie</label>
                <input type="text" id='title' name='title' value={myMovie.title} onChange={(event) =>updateMyMovie({...myMovie, title: event.target.value})} />
                
                <label className= 'poster' htmlFor="poster" img='url'>Poster</label>
                <input type="url" id='urlPoster' value={myMovie.poster} onChange={(event) =>updateMyMovie({...myMovie, poster: event.target.value})}/>

                <label className= 'director' htmlFor="director">Director</label>
                <input type="text" id='director' name='director' value={myMovie.director} onChange={(event) =>updateMyMovie({...myMovie, director: event.target.value})}/>

                <label className= 'year' htmlFor="year">Year</label>
                <input type="date" id='year' name='year' value={myMovie.year} onChange={(event) => updateMyMovie({...myMovie, year: event.target.value})}/>

                <label className= 'genre' htmlFor="genre">Genre</label>
                <input type="text" id='genre' name='genre' value={myMovie.genre} onChange={(event) => updateMyMovie({...myMovie, genre: event.target.value})}/>

                <p className='about'>About the movie...
                    <textarea className='comment' rows="8" cols="100" name="comment" form="usrform" value={myMovie.comment} onChange={(event) => updateMyMovie({...myMovie, comment: event.target.value})}/>
                </p>
                
                <button className='submitting' type='submit'>SEND</button> 
            
            </form>
        </div>
    )
}

export default Form;