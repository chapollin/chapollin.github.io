// Inicializar o armazenamento local (se necessário)
let vazamentos = JSON.parse(localStorage.getItem('vazamentos')) || [];

// Selecionar elementos do DOM
const vazamentosList = document.getElementById('vazamentos');
const addVazamentoButton = document.getElementById('addVazamento');
const detalhesSection = document.getElementById('detalhesVazamento');
const vazamentoImage = document.getElementById('vazamentoImage');
const deleteVazamentoButton = document.getElementById('deleteVazamento');

// Variável para controlar se os detalhes estão visíveis ou não
let detalhesVisiveis = false;
let vazamentoAtualIndex = null; // Variável para controlar o índice do vazamento atual

// Função para exibir a lista de vazamentos
function exibirVazamentos() {
    vazamentosList.innerHTML = '';
    vazamentos.forEach((vazamento, index) => {
        const li = document.createElement('li');
        li.textContent = `Vazamento ${index + 1} - ${vazamento.descricao}`;
        li.addEventListener('click', () => alternarDetalhesVazamento(index));
        vazamentosList.appendChild(li);
    });
}

// Função para alternar os detalhes do vazamento (mostrar/ocultar)
function alternarDetalhesVazamento(index) {
    // Se o mesmo vazamento for clicado novamente, alternar a visibilidade
    if (vazamentoAtualIndex === index && detalhesVisiveis) {
        detalhesSection.style.display = 'none'; // Esconder os detalhes
        detalhesVisiveis = false;
    } else {
        const vazamento = vazamentos[index];
        vazamentoImage.src = vazamento.imagem;
        detalhesSection.style.display = 'block'; // Mostrar os detalhes
        vazamentoAtualIndex = index;
        detalhesVisiveis = true; // Definir como visível
    }

    deleteVazamentoButton.onclick = () => excluirVazamento(index);
}

// Função para adicionar um novo vazamento
addVazamentoButton.addEventListener('click', () => {
    const descricao = prompt('Descreva o vazamento:');
    const imagem = prompt('Insira o link da imagem ou vídeo do vazamento:');
    vazamentos.push({ descricao, imagem });
    localStorage.setItem('vazamentos', JSON.stringify(vazamentos));
    exibirVazamentos();
});

// Função para excluir o vazamento
function excluirVazamento(index) {
    vazamentos.splice(index, 1);
    localStorage.setItem('vazamentos', JSON.stringify(vazamentos));
    exibirVazamentos();
    detalhesSection.style.display = 'none';
    detalhesVisiveis = false;
}

// Exibir vazamentos ao carregar a página
exibirVazamentos();
