const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const characterList = document.getElementById('characterList');

const modal = document.getElementById('characterModal');
const closeModalButton = document.getElementById('closeModal');

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

                const viewMoreBtn = document.createElement('button');
                viewMoreBtn.textContent = 'Ver mais';
                viewMoreBtn.classList.add('view-more');
                viewMoreBtn.addEventListener('click', () => openModal(character));

                listItem.appendChild(characterImage);
                listItem.appendChild(characterName);
                listItem.appendChild(viewMoreBtn);
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

function openModal(character) {
    document.getElementById('modalName').textContent = character.name || 'Nome desconhecido';
    document.getElementById('modalImage').src = `imgs/${normalizeFileName(character.name)}.jpg`;
    document.getElementById('modalVillage').textContent = `Vila: ${character.village || 'Desconhecida'}`;
    document.getElementById('modalRank').textContent = `Patente: ${character.rank || 'Desconhecida'}`;
    document.getElementById('modalStatus').textContent = `Estado: ${character.status || 'Desconhecido'}`;
    document.getElementById('modalGender').textContent = `Gênero: ${character.gender || 'Desconhecido'}`;
    document.getElementById('modalAffiliation').textContent = `Afiliação: ${character.affiliation || 'Nenhuma'}`;

    document.getElementById('modalImage').onerror = () => {
        document.getElementById('modalImage').src = 'imgs/placeholder.png';
    };

    modal.classList.remove('hidden');
}

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

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

function openModal(character) {
    document.getElementById('modalName').textContent = character.name || 'Nome desconhecido';
    document.getElementById('modalImage').src = `imgs/${normalizeFileName(character.name)}.jpg`;
    document.getElementById('modalVillage').textContent = `Vila: ${character.vila || 'Desconhecida'}`;
    document.getElementById('modalRank').textContent = `Patente: ${character.patente || 'Desconhecida'}`;
    document.getElementById('modalStatus').textContent = `Estado: ${character.estado || 'Desconhecido'}`;
    document.getElementById('modalGender').textContent = `Gênero: ${character.genero || 'Desconhecido'}`;
    document.getElementById('modalAffiliation').textContent = `Afiliação: ${character.afiliacao || 'Nenhuma'}`;

    document.getElementById('modalImage').onerror = () => {
        document.getElementById('modalImage').src = 'imgs/placeholder.png';
    };

    modal.classList.remove('hidden');
}
