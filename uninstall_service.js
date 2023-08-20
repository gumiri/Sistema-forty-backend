var service = require('node-windows').Service;
// Criando um novo objeto do Serviço
var svc = new service({
//Nome do servico
name:'SitemaFortyflex',
//Descricao que vai aparecer no Gerenciamento de serviço do Windows
description: 'Serviço principal do sistema que acessa os bancos de dados HTD, e gera relatorios. Feiteo em nodejs pro Gustavo Miranda',
//caminho absoluto do seu script
script: 'C:\\Users\\elian\\Documents\\Sistema_de_Cobranca\\lab_eng_software_backend\\server.js'
});
svc.on('uninstall',function(){
console.log('Uninstall complete.');
});
// Desistalar serviço.
svc.uninstall();