const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const characterList = document.getElementById('characterList');

function searchCharacters(query = '', filter = '') {
    const encodedQuery = encodeURIComponent(query);
    const encodedFilter = encodeURIComponent(filter);

    fetch(`/api/characters/search?name=${encodedQuery}&filter=${encodedFilter}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            characterList.innerHTML = '';

            if (!data || data.length === 0) {
                const noResult = document.createElement('p');
                noResult.textContent = 'Nenhum personagem encontrado.';
                noResult.classList.add('no-results');
                characterList.appendChild(noResult);
                return;
            }

            data.forEach(character => {
                const listItem = document.createElement('div');
                listItem.classList.add('characterItem');

                const normalizedFileName = normalizeFileName(character.name);
                const imageName = `${normalizedFileName}.jpg`;
                const characterImage = document.createElement('img');
                characterImage.src = `imgs/${imageName}`;
                characterImage.alt = character.name || 'Personagem sem nome';

                characterImage.onerror = () => {
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
            characterList.innerHTML = '<p class="no-results">Erro ao buscar personagens. Tente novamente mais tarde.</p>';
        });
}

function normalizeFileName(name) {
    return name
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '')
        .toLowerCase();
}

searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    const filter = filterType.value;
    searchCharacters(query, filter);
});

filterType.addEventListener('change', function () {
    const query = searchInput.value.trim();
    const filter = filterType.value;
    searchCharacters(query, filter);
});

window.addEventListener('DOMContentLoaded', () => {
    searchCharacters();
});