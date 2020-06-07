// Escrever texto no console
// console.log("Hello - texto que aparece no console")

// Escolher um item e abaixo escolher todos os itens
// document.querySelector("form input")
// document.querySelectorAll("form input")

//fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) {return res.json()}).then(function(data){console.log(data)})

// document
//     //Seleciona o select com nome uf
//     .querySelector("select[name="uf"]")
//     // Ficar sempre atento a eventos
//     // Arrow function - porcausa da setinha
//     .addEventListener("change", () => {
//         console.log("mudei")
//     } )

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json () })
    .then( states =>{

        for(state of states){
            // o += significa concatenar
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
    })
    
}

populateUFs()

function getCities (event) {
    const loading = document.querySelector("#loading")
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state")
    const ufValue = event.target.value

    // Adicionar e remover tela de carregando
    loading.classList.remove("hide")
    citySelect.classList.add("ocultar")
    setTimeout(() => {
        loading.classList.add("hide")
        citySelect.classList.remove("ocultar")
        }, 200)

    // Atribui o nome do estado para o input invisível
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => {return res.json()})
    .then( cities =>{
        
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
    

}

document
    .querySelector("select[name=uf]")
    // Não colocar os parênteses () para não rodar a função getCities automaticamente, apenas quando o uf mudar
    .addEventListener("change", getCities)



// Ítens de coleta

//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem() {
    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId= itemLi.dataset.id

    // verificar se existem itens selecionados, se sim
    // pegar os items selecionados
    // um igual = é para atribuir. dois iguais == é para comparar
    const alreadySelected = selectedItems.findIndex(item =>  {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })


    // se já estiver selecionado, tirar da seleção
    if(alreadySelected >=  0) { // diferente é !=
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems

}

