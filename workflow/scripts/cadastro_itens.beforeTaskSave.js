function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
    var atividade  = getValue("WKNumState");
    var comentario = getValue("WKUserComment"); 
    var atividade_destino = parseInt(getValue("WKNextState"));
   
      
    
    if (atividade_destino == 91 || atividade_destino == 83 || atividade_destino == 87) {
    	if (comentario == "") {
            throw "Gentileza adicionar um comentário informando as inconformidades encontradas."
        }
    }
    if (atividade_destino == 69 || atividade_destino == 78 || atividade_destino == 75) {
    	if (comentario == "") {
            throw "Gentileza adicionar um comentário com as informações solicitadas."
        }
    }
    if (atividade == 69 || atividade == 75 || atividade == 78){
    	if (comentario == "") {
            throw "Gentileza inserir nos comentários as informações solicitadas."
        }
    }

    if (atividade == 26 && atividade_destino == 50){
    	if(comentario == ""){
    		throw "Gentileza adicionar um comentário informando as inconformidades encontradas."
       	}
    }

    if (atividade == 26 && atividade_destino == 8){
    	if(comentario == ""){
    		throw "Gentileza adicionar um comentário informando as inconformidades encontradas."
       	}
    }
}

