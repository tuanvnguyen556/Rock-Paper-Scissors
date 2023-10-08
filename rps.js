

let imageObject = ["images/another-group-photo.jpg", "images/group-of-children.jpeg", "images/02.jpg", "images/group-photo.jpeg"];
function goLeft(){
    let val = JSON.parse(localStorage.getItem("val"));
    console.log(val);
    if (val === null){
        val = 0;
    }else{
        val = Number(val);
    }
    if (val === 0){
        val = imageObject.length - 1;
    } else{
        val -= 1;
    }
    localStorage.setItem("val", JSON.stringify(val));
    document.querySelector(".display-image").setAttribute("src", imageObject[val]);
}

function goRight(){
    let val = JSON.parse(localStorage.getItem("val"));
    console.log(val);
    if (val === null){
        val = 0;
    } else{
        val = Number(val);
    }
    if (val === imageObject.length - 1){
        val = 0;
    } else{
        val += 1;
    }
    localStorage.setItem("val", JSON.stringify(val));
    document.querySelector(".display-image").setAttribute("src", imageObject[val]);
}
function buttonBars() {
    const listElement = document.querySelector(".list");
 
    if (listElement.style.display === "none" || listElement.style.display === ""){
        listElement.style.display = "flex";
    }
    else{
        listElement.style.display = "none";
    }
}

const draggables = document.querySelectorAll(".drag-buttons");
const containers = document.querySelectorAll(".button-selection");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragged");
        let computerContain = document.querySelector(".computer-move");
        let changeText = document.querySelector(".Results");
        changeText.innerHTML = "";
        computerContain.removeChild(computerContain.firstChild);
      
    })

    draggable.addEventListener("dragend", ()=>{
        const itemContainer = document.querySelector(".made-move");
        const computerContainer = document.querySelector(".computer-move");

        if (itemContainer.childElementCount == 1){
            let computerMove = Math.random();
            let newItalic = document.createElement("i");
            let newButton = document.createElement("button");
            let changeText = document.querySelector(".Results");
            /*grass is < 0.33*/
            if (computerMove < 0.33){ 
                newButton.className = "drag-buttons grass";
                newItalic.className = "fa-solid fa-road-spikes";
                newButton.appendChild(newItalic);
                
                if (draggable.className === "drag-buttons grass dragged"){
                    changeText.innerHTML = "You tied!";
                } else if(draggable.className === "drag-buttons fire dragged") {
                    changeText.innerHTML = "You won!";
                }
                else{
                    changeText.innerHTML = "You lost!";
                }
                console.log("computer is less than 0.3");
            /*water is >= 0.33 and < 0.66*/
            } else if (computerMove >= 0.33 && computerMove < 0.66){
                newButton.className = "drag-buttons water";
                newItalic.className = "fa-solid fa-hand-holding-droplet";
                newButton.appendChild(newItalic);

                if (draggable.className === "drag-buttons grass dragged"){
                    changeText.innerHTML = "You won!";
                } else if(draggable.className === "drag-buttons fire dragged") {
                    changeText.innerHTML = "You lost!";
                }
                else{
                    changeText.innerHTML = "You tied!";
                }
                console.log("computer is in between");
            /*fire is else*/
            } else{
                newButton.className = "drag-buttons fire";
                newItalic.className = "fa-solid fa-fire";
                newButton.appendChild(newItalic);
                
                if (draggable.className === "drag-buttons grass dragged"){
                    
                    changeText.innerHTML = "You lossed!";
                } else if(draggable.className === "drag-buttons fire dragged") {
                    changeText.innerHTML = "You tied!";
                }
                else{
                    changeText.innerHTML = "You won!";
                }
                console.log("computer is last");
            }
            computerContainer.appendChild(newButton);
        }
        draggable.classList.remove("dragged");
    })
})

containers.forEach(container => {
    container.addEventListener("dragover", e=> {
        e.preventDefault();
        const draggable = document.querySelector(".dragged");
        const itemContainer = document.querySelector(".made-move");

        if (itemContainer.childElementCount === 0){
            container.appendChild(draggable);
        }
        if (container != itemContainer){
            container.appendChild(draggable);
        }
    })
})
