const urlAll = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000';
const input = document.querySelector('#time-name');
const timeName = document.querySelector('#name-team');
const cards = document.querySelectorAll('.card-pokemon');
const randomBtn = document.querySelector('#btn-random');
const inputImg = document.getElementById('input-img')
const questionModal = document.getElementById('question-modal')
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const btnClear = document.getElementById('btn-clear');
const headerImg = document.querySelector('.header-img');
const modal = document.getElementById("myModal");
const span = document.querySelector(".close");
const inputModal = document.querySelector('.input-modal');
const pokeList = document.querySelector('.poke-list');
const saveBtn = document.getElementById('btn-save');
const ulFather = document.querySelector('.team-data-back')
const typesArray = [];


// Função que limpa o nome do time, as cartas e suas informações;
const clear = () => {
  localStorage.clear()
  timeName.innerText = 'Nome do Time';

  cards.forEach((card) => {
    const container = card.firstElementChild;
    const h4 = container.firstElementChild;
    h4.style.display = 'none';
    h4.innerText = '';
    const img = container.lastElementChild;
    img.setAttribute('src', "assets/pokemonquestion.png");
  })
  ulFather.removeChild(ulFather.lastElementChild)
}

// Variável que armazena todos escutadores de evento;
const functionsListeners = () => {
  saveBtn.addEventListener('click', save);
  btnNo.addEventListener('click', noAdd)
  btnYes.addEventListener('click', add)
  btnClear.addEventListener('click', clear);
  randomBtn.addEventListener('click', randomFunction);
  // Ao clicar na logo, o site é recarregado;
  headerImg.addEventListener('click', function reload() {
    document.location.reload(true);
  })
  // Quando clicar no <span>, o modal é fechado. Além disso os elementos internos do modal voltam a ficar escondidos e a classe selected é esvaziada;
  span.onclick = function() {
    modal.style.display = "none";
    removeSelected();
    displayHidden();
    inputModal.value = '';
  }
  // Quando é clicado fora do modal, ele é fechado. Além disso os elementos internos do modal voltam a ficar escondidos e a classe selected é esvaziada;
  window.onclick = function(event) {
    input.addEventListener('input', changeName);
    if (event.target === modal) {
      modal.style.display = "none";
      removeSelected();
      displayHidden();
      inputModal.value = '';
    }
  }
  // Cria uma lista nova filtrada a cada tecla do input;
  inputModal.addEventListener('input', namesFiltered);
}

// Função para inserir o nome do time com base no valor do input;
const changeName = () => {
  timeName.innerText = input.value;

// Adiciona uma chave no localStorage e a atualiza a cada input do nome do time;
const teamName = () => {
  localStorage.setItem('teamName', input.value)
  };
  input.addEventListener('input', teamName)
}

// Salva as informações do time;
const save = () => {
  cards.forEach((card, index) => {
    const filho = card.firstElementChild.innerHTML;
    localStorage.setItem(index, JSON.stringify(filho));
  })
}

// Recupera os valores do localStorage;
const getSaved = () => {
  const tamanho = localStorage.length;
  if (tamanho >= 6) {
    cards.forEach((card, index) => {
      const value = JSON.parse(localStorage.getItem(index));
      const filho = card.firstElementChild;
      filho.innerHTML = value;
    })
    timeName.innerText = localStorage.getItem('teamName')
  }
}

// Retorna objeto com nome e url de todos pokemons;
const allPokemons = async () => {
  const response = await fetch(urlAll);
  const data = await response.json();
  return data.results;
};

// Retorna array com nome de todos pokemons;
const pokeNames = async () => {
  const fun = await allPokemons();
  const names = fun.map((names) => names.name);
  return names;
};

// Função que, ao clicar, move o pokemon da lista até a área de confirmação para adicionar ao time;
const addPokemon = (event) => {
  if (event.target.nodeName === 'LI') {
    inputImg.classList.remove('hidden');
    questionModal.classList.remove('hidden');
    btnYes.classList.remove('hidden');
    btnNo.classList.remove('hidden');
    const img = event.target.firstElementChild;
    const imgLink = img.getAttribute('src');
    inputImg.setAttribute('src', imgLink);
    questionModal.innerText = `Adicionar ${event.target.innerText} ao seu time?`
  } else {
    inputImg.classList.remove('hidden');
    questionModal.classList.remove('hidden');
    btnYes.classList.remove('hidden');
    btnNo.classList.remove('hidden');
    const img = event.target;
    const imgLink = img.getAttribute('src');
    inputImg.setAttribute('src', imgLink);
    questionModal.innerText = `Adicionar ${event.target.parentElement.innerText} ao seu time?`
  }
};

// Se o 'não' for clicado, os elementos voltam a desaparecer;
const noAdd = () => {
  displayHidden();
};

// Se o 'sim' for clicado, o pokemon é adicionado à carta selecionada;
const add = () => {
  modal.style.display = "none";
  const inputImg = document.getElementById('input-img')
  const imgLink = inputImg.getAttribute('src');
  const text = questionModal.innerText;
  const sliced = text.substring(10,text.length - 13);
  const pokeField = document.querySelector('.selected');
  const first = pokeField.firstElementChild;
  const h4 = first.firstElementChild;
  h4.style.display = 'block';
  const img = first.lastElementChild
  h4.innerText = sliced;
  img.setAttribute('src', imgLink)
  removeSelected();
  displayHidden();
  addPokeType();
}

// Função que carrega a lista de Pokemons com base no array dado a ela;
const loadList = (names) => {
  names.forEach(async (name) => {
    pokeList.innerHTML = [];
    const search = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await search.json();
    const li = document.createElement('li')
    li.addEventListener('click', addPokemon);
    const img = document.createElement('img')
    const pokePic = data.sprites.front_default;
    img.setAttribute('src', pokePic);
    img.className = 'poke-image';
    li.className = 'list-item';
    li.innerText = name;
    pokeList.appendChild(li);
    li.append(img);
  });
}

// Ao clicar no botão 'Time Aleatório', gera uma requisição à API para cada carta e o pokemón designado (com base em um número aleatório) é inserido na carta;
const randomFunction = async () => {
  cards.forEach(async (card) => {
    const id = Math.floor((Math.random() * 899) + 1);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    const firstDiv = card.firstElementChild;
    const pokeName = firstDiv.firstElementChild;
    pokeName.innerText = data.name;
    pokeName.style.display = 'block';
    const pokeImg = firstDiv.lastElementChild;
    pokeImg.setAttribute('src', data.sprites.front_default);
    pokeImg.style.width = '120px';
    addPokeType();
  })
}

// Adiciona todos tipos de pokemons presentes nas cartas à lista de tipos;
const addPokeType = () => {
  cards.forEach( async (card) => {
    const h4 = card.firstElementChild.firstElementChild;
    const text = h4.innerText;
    const lower = text.toLowerCase();
    if (lower.length > 0) {
      await getTypes(lower);
    }
  })
}

// Recupera os tipos de pokemon através de requisição na API;
async function getTypes (name) {
  ulFather.removeChild(ulFather.lastChild);
  const ul = document.createElement('ul');
  ulFather.appendChild(ul)
  ul.setAttribute('id', 'type')
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const data = await response.json();
  const types = data.types;
  types.forEach((type) => {
    const typeName = type.type.name;
    typesArray.push(typeName);
  })
  const newArray = [...new Set(typesArray)];
  newArray.forEach((element) => {
    const li = document.createElement('li');
    li.innerText = element;
    ul.appendChild(li)
  })
}

// Função que 'zera' a classe selected;
const removeSelected = () => {
  cards.forEach((card) => {
    if(card.classList.contains('selected'))
    card.classList.remove('selected')
  })
}

// Função que novamente esconde os elementos do modal;
const displayHidden = async () => {
  inputImg.classList.add('hidden');
  questionModal.classList.add('hidden');
  btnYes.classList.add('hidden');
  btnNo.classList.add('hidden');
  inputModal.value = '';
  const pokeNomes = await pokeNames();
  loadList(pokeNomes);
}

// Função que abre o modal;
const cardsFunctions = () => {
  cards.forEach((card) => {
    card.onclick = function() {
      modal.style.display = "block";
      card.classList.add("selected");
    }
  }); 
}


// Recebe os valores do input, os converte em lowerCase e compara com a lista de nomes de pokemons para filtrar e retorna a lista filtrada;
const filterNames = async () => {
  const lower = inputModal.value.toLowerCase();
  const length = lower.length;
  const allNames = await pokeNames();
  const filtered = allNames.filter((nome) => nome.substr(0, length) === lower);
  return filtered;
};

// Armazena a lista filtrada em uma variável e usa ela de parâmetro para carregar a lista;
const namesFiltered = async () => {
  const filtered = await filterNames();
  loadList(filtered);
}

window.onload = async () => {
  const names = await pokeNames();
  loadList(names);
  getSaved();
  cardsFunctions();
  functionsListeners();
  addPokeType();
}

module.exports = { save,
  getSaved,
  pokeNames,
  loadList,
  removeSelected,
  cardsFunctions,
  filterNames, 
}
