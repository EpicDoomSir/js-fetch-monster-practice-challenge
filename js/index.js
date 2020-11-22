const monsterDiv = document.querySelector("#monster-container")
const monsterForm = document.querySelector("#monster-form")
let currentPageNumber = 1

function renderMonsterPage(pageNumber) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(response => response.json())
        .then(monsters => {
            monsterDiv.innerHTML = ""
            monsters.forEach(monster => {
                renderMonster(monster)
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

function renderMonster(monster) {
    const div = document.createElement("div")
    div.dataset.id = monster.id
    const h2 = document.createElement("h2")
    const h4 = document.createElement("h4")
    const p = document.createElement("p")
    h2.textContent = monster.name
    h4.textContent = monster.age
    p.textContent = monster.description
    div.append(h2, h4, p)
    monsterDiv.append(div)
}

document.addEventListener("click", function (event) {
    if (event.target.matches("#back")) {
        currentPageNumber--
        renderMonsterPage(currentPageNumber)
    } else if (event.target.matches("#forward")) {
        currentPageNumber++
        renderMonsterPage(currentPageNumber)
    }
})

monsterForm.addEventListener("submit", function (event) {
    event.preventDefault()
    newMonster = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMonster),
    })
        .then(response => response.json())
        .then(monster => {
            console.log('Success:', monster);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        debugger
    event.target.reset()
})

renderMonsterPage(currentPageNumber)