const mainform = document.getElementById("mainform");
const arrangeAll = document.querySelector('#arrangeAll');

mainform.addEventListener("submit", function(event) {
    event.preventDefault();
    const data = {
        description: this.description.value
    }

    fetch("http://localhost:8083/create", { 
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(response => { 
        return response.json(); 
    }).then(data => { 
        getAll();
        this.reset();
        console.log(data);
    }).catch(error => console.log(error));
});

function getAll(){
    fetch("http://localhost:8083/get")
    .then(response => response.json()) 
    .then(tasks => { 
        arrangeAll.innerHTML = '';
        tasks.forEach( function(task) {
            console.log(task);
        
            const card = document.createElement('div');
            card.className = "card";
            arrangeAll.appendChild(card);

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            card.appendChild(cardBody);

            const title = document.createElement("h4");
            title.className = "card-title";
            title.innerText = task.description;
            cardBody.appendChild(title);

            const deleteButton = document.createElement("a");
            deleteButton.className = "btn btn-primary";
            deleteButton.innerText = "Delete Task";
            deleteButton.addEventListener("click", function(){
                deleteTask(task.id);
            })
            cardBody.appendChild(deleteButton);

            const updateButton = document.createElement("a");
            updateButton.className = "btn btn-primary";
            updateButton.innerText = "Update Task";
            updateButton.addEventListener("click", function(){

                const title =  document.querySelector("#card-title");

                const inputfield = document.createElement("INPUT");
                inputfield.setAttribute("type", "text");
            
                cardBody.appendChild(inputfield)
 
                const saveB = document.createElement("button");
                saveB.innerHTML = "SAVE";
                cardBody.appendChild(saveB);
                saveB.addEventListener("click", function(){
                    updateTask(task.id, inputfield);
                })
                title.innerText = inputfield.value;
                
                
            })
            cardBody.appendChild(updateButton);

    });    
    }).catch(error => console.log(error));
}   

getAll();

function deleteTask(id) {
    fetch("http://localhost:8083/delete/" +id, {
        method: "DELETE"
    })
    .then(response => {
        console.log(response);
        getAll();
    }).catch(error => console.error(error));
}


function updateTask(id, input) {
    const data = {
            description: input.value
        }
        debugger;
    fetch("http://localhost:8083/update?id=" +id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
        
    }).then(response => { 
        return response.json(); 
    }).then(data => {
        console.log(response);
        getAll();
    }).catch(error => console.log(error));
}

