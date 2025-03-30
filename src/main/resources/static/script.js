const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const characterList = document.getElementById('characterList');

function normalizeFileName(name) {
    return name.trim().replace(/\s+/g, '_');
}

function searchCharacters(query) {
    const encodedQuery = encodeURIComponent(query);

    fetch(`/api/characters/search?name=${encodedQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);
            characterList.innerHTML = '';

            if (!data || data.length === 0) {
                const noResult = document.createElement('p');
                noResult.textContent = 'Nenhum personagem encontrado.';
                noResult.classList.add('no-results');
                characterList.appendChild(noResult);
                return;
            }

            data.forEach(character => {
                console.log('Personagem:', character.name);

                const listItem = document.createElement('div');
                listItem.classList.add('characterItem');

                const normalizedFileName = normalizeFileName(character.name);
                const imageName = `${normalizedFileName}.jpg`;
                const characterImage = document.createElement('img');
                characterImage.src = `imgs/${imageName}`;
                characterImage.alt = character.name || 'Personagem sem nome';

                characterImage.onerror = () => {
                    console.error(`Erro ao carregar a imagem: imgs/${imageName}`);
                    characterImage.src = 'imgs/placeholder.png';
                };

                const characterName = document.createElement('p');
                characterName.textContent = character.name || 'Nome desconhecido';

                listItem.appendChild(characterImage);
                listItem.appendChild(characterName);
                characterList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar personagens:', error);
            characterList.innerHTML = '<p class="no-results">Erro ao buscar personagens. Tente novamente mais tarde.</p>';
        });
}

searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query) {
        searchCharacters(query);
    } else {
        alert('Por favor, digite um nome para buscar.');
    }
});

searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        searchCharacters(query);
    } else {
        characterList.innerHTML = '';
    }
});