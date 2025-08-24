function carregarPrompt() {
    console.log('Carregando prompt...');
    const promptGerado = sessionStorage.getItem('promptGerado');
    const promptContainer = document.getElementById('promptContent');
    
    console.log('Prompt encontrado:', promptGerado);
    
    if (promptGerado && promptGerado.trim()) {
        promptContainer.textContent = promptGerado;
    } else {
        promptContainer.innerHTML = '<div class="empty-state">Nenhum prompt foi encontrado. <a href="../Tela5/index.html">Volte para criar um prompt</a>.</div>';
    }
}

// Função para copiar o prompt
function copiarPrompt() {
    const prompt = sessionStorage.getItem('promptGerado');
    if (prompt) {
        navigator.clipboard.writeText(prompt).then(function() {
            alert('Prompt copiado para a área de transferência!');
        }).catch(function(err) {
            console.error('Erro ao copiar: ', err);
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = prompt;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Prompt copiado para a área de transferência!');
        });
    } else {
        alert('Nenhum prompt disponível para copiar.');
    }
}

// Função para voltar ao formulário (mantém os dados)
function voltarParaFormulario() {
    window.location.href = '/Tela5/tela5.html';
}

// Função para criar um novo prompt (limpa os dados)
function novoPrompt() {
    if (confirm('Tem certeza que deseja criar um novo prompt? Os dados atuais serão perdidos.')) {
        sessionStorage.removeItem('promptGerado');
        sessionStorage.removeItem('dadosFormulario');
        window.location.href = '/Tela5/tela5.html';
    }
}

// Carrega o prompt quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando carregamento do prompt...');
    carregarPrompt();
});