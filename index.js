const mainform = document.getElementById("mainform");
const arrangeAll = document.querySelector('#arrangeAll');
const completedarea = document.querySelector('#completedarea')

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
            title.style.textAlign = "center";
            cardBody.appendChild(title);

            /*
            const completeButton = document.createElement("a");
            completeButton.className = "btn btn-primary";
            completeButton.innerText = "Completed Task";
            completeButton.addEventListener("click", function(){
                task.completed = "true";
                console.log(task);I'm sure this will be ridiculously simple, but whatever... I'm trying to display a text area with a button to its right, similar to how StackOverflow displays a comment field with button when one clicks the 'Add Comment' link...the problem I'm experiencing is with the button alignment; it appears to align at the top right of its div (see image), I want to align it at the bottom left. I've tried using text-align, align, nothing works to move that pesky button, I used padding-top to move the button down, but padding-right appears to have no effect, but there's got to be a better way than padding. I need it to be cross-browser compatible as well.


                completed(task.id);
            })
            cardBody.appendChild(completeButton);
            */
           
            const updateButton = document.createElement("a");
            updateButton.className = "btn btn-info";
            updateButton.innerText = "Update Task";
            updateButton.addEventListener("click", function(){

                const title =  document.querySelector("#card-title");
                updateButton.className = "btn btn-info active"
                const inputfield = document.createElement("INPUT");
                inputfield.setAttribute("type", "text");    
            
                cardBody.appendChild(inputfield)
 
                const saveB = document.createElement("button");
                saveB.innerHTML = "SAVE";
                saveB.className = "btn btn-primary"
                cardBody.appendChild(saveB);
                saveB.addEventListener("click", function(){
                    updateTask(task.id, inputfield);
                })
                title.innerText = inputfield.value;
            })
            cardBody.appendChild(updateButton);
            
            const deleteButton = document.createElement("a");
            deleteButton.className = "btn btn-danger";
            deleteButton.innerText = "Delete Task";
            deleteButton.addEventListener("click", function(){
                deleteTask(task.id);
            })
            cardBody.appendChild(deleteButton);
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

function completed(id) {
    fetch("http://localhost:8083/complete/" + id, {
        method: "PATCH",
        body: JSON.stringify({
            completed: true,
        }),
        headers: {
            'Content-Type': "application/json"
        }
        })
    .then(response => response.json()) 
    .then(tasks => { 
        completedarea.innerHTML = '';
        tasks.filter( function(tasks) {
            return isCompleted;
        }),
        tasks.forEach( function(task) {
            
            const card = document.createElement('div');
            card.className = "card";
            completedarea.appendChild(card);

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";
                card.appendChild(cardBody);

                const title = document.createElement("h4");
                title.className = "card-title";
                title.innerText = task.description;
                title.style.textAlign = "center";
                cardBody.appendChild(title);

                const deleteButton = document.createElement("a");
                deleteButton.className = "btn btn-danger";
                deleteButton.innerText = "Delete Task";
                deleteButton.addEventListener("click", function(){
                    deleteTask(task.id);
                })
                cardBody.appendChild(deleteButton);
        
        });    
        }).catch(error => console.log(error));
    }
