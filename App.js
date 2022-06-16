const search =()=>{
    const searchText =document.getElementById('searchText').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res =>res.json())
    .then(data =>searchSong(data.data))
    .catch(error =>{
        displayError('something wrong! please try again later!')
    })
}
const displayError = error=>{
    const syError = document.getElementById('error')
    syError.innerHTML=error; 
}
const searchSong =songs=>{
    console.log(songs)
    const searchSong = document.getElementById('searchSong')
    searchSong.innerHTML='';
    songs.forEach(song => {
        const searchDiv = document.createElement('div')
        
         searchDiv.className ="single-result row align-items-center my-3 p-3";
        searchDiv.innerHTML=`
           <div class="col-md-9">
           <h3 class="lyrics-name">${song.title}</h3>
           <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
           <div class="col-md-3 text-md-right text-center">
               <button onclick="displayShow('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
           </div>
        `
        searchSong.appendChild(searchDiv)
    });

}

const displayShow = async(artist,title)=>{
 const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
 const res = await fetch(url);
  const data =await res.json();
    showLyrics(data.lyrics)
  
}

const showLyrics = lyrics=>{
    const DetailsLyrics = document.getElementById('lyrics')
    DetailsLyrics.innerText=lyrics;
} 