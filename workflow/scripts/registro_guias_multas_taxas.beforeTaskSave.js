function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
    var atividade  = getValue("WKNumState");
    var comentario = getValue("WKUserComment"); 
    var atividade_destino = parseInt(getValue("WKNextState"));
   
      
    // anexar investigação
    if (atividade == 1 || atividade == 0){
    	
        var anexos   = hAPI.listAttachments();
        var temAnexo = false;

        if (anexos.size() > 0) {
            temAnexo = true;
        }

        if (!temAnexo) {
            throw "Gentileza anexar o documento para pagamento.";
        }    	
        
    }
	
    
	if (atividade == 2 && atividade_destino == 6){

		if (comentario == "") {
            throw "Gentileza adicionar um complemento justifando a devolução da solicitação."
        }
        
    }

    if (atividade == 6 && atividade_destino == 20){
		
		if (comentario == "") {
            throw "Gentileza adicionar um complemento respondendo ao questionamento do setor fiscal."
        }
	}

}