const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRestaurant)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteRestaurant(){
    const rName = this.parentNode.childNodes[1].innerText
    const cName = this.parentNode.childNodes[3].innerText
    const pRange = this.parentNode.childNodes[1].innerText
    const resVibe = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteRestaurant', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'restaurantNameS': rName,
              'cuisineNameS': cName,
              'priceRangeS': pRange,
              'resVibeS': resVibe
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const rName = this.parentNode.childNodes[1].innerText
    const cName = this.parentNode.childNodes[3].innerText
    const pRange = this.parentNode.childNodes[1].innerText
    const resVibe = this.parentNode.childNodes[3].innerText
    // const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'restaurantNameS': rName,
              'cuisineNameS': cName,
              'priceRangeS': pRange,
              'resVibeS': resVibe,
              // 'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}


//Modal Popup
const modal = document.querySelector("#modal"); //getting the modal
const openModal = document.querySelector(".open-button"); //getting the button to open the modal
const closeModal = document.querySelector(".close-button"); //getting the button to close the modal

openModal.addEventListener("click", () => {
  modal.showModal();
}); //when you click the open button, the modal pops up

closeModal.addEventListener("click", () => {
  modal.close();
}); //when you click the close button, the modal closes



//Localstorage for username
// const nameInput = document.querySelector('#name') //getting name id
// const username = localStorage.getItem('username') || ''; //saving username inputed, else empty string
// nameInput.value = username; 
// nameInput.addEventListener('change', (e) => {
// 		localStorage.setItem('username', e.target.value);
// })



// Localstorage for restaurants
// check localstorage for restaurant data
const resInfo = JSON.parse(localStorage.getItem("resInfo"));


if(resInfo) {
  resInfo.res_name;
  resInfo.cui_name;
  resInfo.pri_range;
  resInfo.vibe
}

document.getElementById("submit").addEventListener('click', function (event){
  
  //get values from form inputs
  const res_name = document.getElementById("restaurantName").value;
  const cui_name = document.getElementById("cuisineName").value;
  const pri_range = document.getElementById("priceRange").value;
  const vibe = document.getElementById("vibeID").value;

  // if values are valid 
  if(!res_name || !cui_name || !pri_range || !vibe) {
    return;
  }

  //save them in local storage
  const resInfo = {
    res_name,
    cui_name,
    pri_range,
    vibe
  };

    localStorage.setItem('resInfo', JSON.stringify(resInfo));
})