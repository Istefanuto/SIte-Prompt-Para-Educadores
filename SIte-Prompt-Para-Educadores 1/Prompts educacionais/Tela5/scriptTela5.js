document.addEventListener('DOMContentLoaded', function() {     
    console.log('JavaScript carregou!');          
    
    // Código dos placeholders     
    const textareas = document.querySelectorAll('.form-section textarea');     
    console.log('Encontrei', textareas.length, 'textareas');          
    
    textareas.forEach(textarea => {         
        const originalPlaceholder = textarea.placeholder;                  
        
        textarea.addEventListener('focus', function() {             
            console.log('Clicou na textarea');             
            this.placeholder = '';         
        });                  
        
        textarea.addEventListener('blur', function() {             
            console.log('Saiu da textarea');             
            if (this.value === '') {                 
                this.placeholder = originalPlaceholder;             
            }         
        });     
    }); 

    // Script para processar o formulário e enviar para a próxima tela
    const form = document.getElementById('formPrompt');          
    
    if (form) {         
        form.addEventListener('submit', function(e) {             
            e.preventDefault(); // Previne o envio padrão do formulário                          
            
            // Coleta todos os dados do formulário             
            const formData = new FormData(form);                          
            
            // Extrai os valores dos campos             
            const cenario = formData.get('cenario') || '';             
            const especificidade = formData.get('especificidade') || '';             
            const simplificacao = formData.get('simplificacao') || '';             
            const estrutura = formData.get('estrutura') || '';                          
            
            // Valida se pelo menos um campo foi preenchido             
            if (!cenario.trim() && !especificidade.trim() && !simplificacao.trim() && !estrutura.trim()) {                 
                alert('Por favor, preencha pelo menos um campo antes de enviar.');                 
                return;             
            }                          
            
            // Cria o prompt final juntando todas as respostas             
            const promptFinal = criarPromptFinal(cenario, especificidade, simplificacao, estrutura);                          
            
            // Salva o prompt no sessionStorage para usar na próxima tela             
            sessionStorage.setItem('promptGerado', promptFinal);             
            sessionStorage.setItem('dadosFormulario', JSON.stringify({                 
                cenario: cenario,                 
                especificidade: especificidade,                 
                simplificacao: simplificacao,                 
                estrutura: estrutura             
            }));                          
            
            // Redireciona para a próxima tela             
            window.location.href = '../Tela6/Tela6.html';         
        });     
    } 
});  

function criarPromptFinal(cenario, especificidade, simplificacao, estrutura) {     
    let prompt = '';          

    // Adiciona cada seção se foi preenchida
    if (cenario.trim()) {         
        prompt += `${cenario.trim()}\n\n`;     
    }          
    
    if (especificidade.trim()) {         
        prompt += `${especificidade.trim()}\n\n`;     
    }          
    
    if (simplificacao.trim()) {         
        prompt += `${simplificacao.trim()}\n\n`;     
    }          
    
    if (estrutura.trim()) {         
        prompt += `${estrutura.trim()}\n\n`;     
    }          
    
    // Remove quebras de linha extras no final
    return prompt.trim(); 
}

// Função adicional para recuperar dados na próxima tela (para usar em Tela6) 
function recuperarDadosFormulario() {     
    const promptGerado = sessionStorage.getItem('promptGerado');     
    const dadosFormulario = sessionStorage.getItem('dadosFormulario');          
    
    return {         
        prompt: promptGerado || '',         
        dados: dadosFormulario ? JSON.parse(dadosFormulario) : null     
    }; 
}