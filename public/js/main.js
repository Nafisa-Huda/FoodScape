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
const nameInput = document.querySelector('#name') //getting name id
const username = localStorage.getItem('username') || ''; //saving username inputed, else empty string
nameInput.value = username; 
nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
})

//Localstorage for restaurants
// const res_name = document.querySelector("res-name");
// const cui_name = document.querySelector("cui-name");
// const pri_range = document.querySelector("pri-range");
// const vibe = document.querySelector("vibe");

// input.onClick = function () {
//   const key = res_name.value
//   const value = cui_name.value
//   const keys = pri_range.value
//   const values = vibe.value
// }



// res_name.addEventListener('change', (e) => {
// 		localStorage.setItem('res-name', e.target.value);
// })

// cui_name.addEventListener('change', (e) => {
//   localStorage.setItem('cui-name', e.target.value);
// })

// pri_range.addEventListener('change', (e) => {
//   localStorage.setItem('pri-range', e.target.value);
// })

// vibe.addEventListener('change', (e) => {
//   localStorage.setItem('vibe', e.target.value);
// })

