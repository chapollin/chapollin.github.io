// Inicializar o armazenamento local (se necessário)
let vazamentos = JSON.parse(localStorage.getItem('vazamentos')) || [];

// Selecionar elementos do DOM
const vazamentosList = document.getElementById('vazamentos');
const addVazamentoButton = document.getElementById('addVazamento');
const detalhesSection = document.getElementById('detalhesVazamento');
const vazamentoImage = document.getElementById('vazamentoImage');
const deleteVazamentoButton = document.getElementById('deleteVazamento');
const inputFile = document.getElementById('inputFile');

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

// Função para converter o arquivo em Base64
function fileToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file);
}

// Função para adicionar um novo vazamento
addVazamentoButton.addEventListener('click', () => {
    const descricao = prompt('Descreva o vazamento:');
    if (descricao) {
        // Abrir seletor de arquivo
        inputFile.click();
        
        inputFile.onchange = () => {
            const file = inputFile.files[0];
            if (file) {
                // Converter o arquivo para Base64
                fileToBase64(file, (base64Data) => {
                    vazamentos.push({ descricao, imagem: base64Data });
                    localStorage.setItem('vazamentos', JSON.stringify(vazamentos));
                    exibirVazamentos();
                });
            }
        };
    }
});

// Função para excluir o vazamento
function excluirVazamento(index){
    vazamentos.splice(index, 1);
    localStorage.setItem('vazamentos', JSON.stringify(vazamentos));
    exibirVazamentos();
    detalhesSection.style.display = 'none';
    detalhesVisiveis = false;
}

// Exibir vazamentos ao carregar a página
exibirVazamentos();
