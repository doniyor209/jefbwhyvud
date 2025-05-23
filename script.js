const ul = document.getElementById("ul");
const btn = document.getElementById("btn");
const saveBtn = document.getElementById("save");
const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");

async function getUsers() {
  const res = await fetch("https://68288b7c6075e87073a41bab.mockapi.io/Users");
  const data = await res.json();
  chizish(data.reverse());
}

getUsers();

function chizish(malumot) {
  ul.innerHTML = "";
  malumot.map((odam) => {
    const li = document.createElement("li");
    li.innerHTML = `
         <div class="left">
                <img src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png" alt="asd">
                <div>
                    <h2>${odam.name}</h2>
                    <p>${odam.phoneNumber}/${odam.name}</p>
                </div>
             </div>
             <div class="right">
                <button id="edit-btn" onclick='editUser(${JSON.stringify(odam)})'><i class="fa-solid fa-pen-to-square"></i></button>
                <button id="delete-btn" onclick='deleteUser(${odam.id})' ><i class="fa-solid fa-trash-can"></i></button>
             </div>   
    `;
    ul.appendChild(li);
  });
}
async function deleteUser(id) {
  try {
    const res = await fetch(
      "https://68288b7c6075e87073a41bab.mockapi.io/Users/" + id,
      {
        method: "DELETE",
      }
    );
    getUsers();
  } catch (error) {
    console.log(error);
  }
}



async function addUser(ism,tel) {
    try {
       const res= await fetch("https://68288b7c6075e87073a41bab.mockapi.io/Users",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({ name: ism,phoneNumber:+tel })});
        getUsers();
        nameInput.value='';
        numberInput.value='';
       console.log(res);
       
    } catch (error) {
      console.log(error);
      
    }
}


btn.addEventListener("click",()=>{
  if(nameInput.value.trim().length<1 || numberInput.value.length<1){
    alert("Malumotlarni kiriting!!");
  }else{
    addUser(nameInput.value,numberInput.value);
  }
})


async function editUser(odam) {
    btn.style.display="none";
    save.style.display="inline";
    console.log(odam);
    nameInput.value=odam.name;
    numberInput.value=odam.phoneNumber;
    saveBtn.addEventListener("click",async()=>{
      const res=await fetch("https://68288b7c6075e87073a41bab.mockapi.io/Users/"+odam.id,{
        method:"PUT",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({ name: nameInput.value,phoneNumber:numberInput.value })
      });
      getUsers();
      nameInput.value="";
      numberInput.value="";
    })
}