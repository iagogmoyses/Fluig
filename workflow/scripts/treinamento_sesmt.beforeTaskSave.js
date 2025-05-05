function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
    var atividade  = getValue("WKNumState");
    var comentario = getValue("WKUserComment"); 
    var atividade_destino = parseInt(getValue("WKNextState"));

    if (atividade == 0 || atividade == 4){
    	
        var anexos   = hAPI.listAttachments();
        var temAnexo = false;

        if (anexos.size() > 0) {
            temAnexo = true;
        }

        if (!temAnexo) {
            throw "Gentileza anexar a Documentos Obrigatórios!";
        }    	
        
    }
   
   /*   
    // anexar nfe
    if (atividade_destino == 7){
    	
        var anexos   = hAPI.listAttachments();
        var temAnexo = false;

        if (anexos.size() > 0) {
            temAnexo = true;
        }

        if (!temAnexo) {
            throw "Gentileza anexar a documentação para seguir com o processo!";
        }    	
        
    }
	
    
    if (atividade_destino == 0) {
    	if (comentario == "") {
            throw "Gentileza adicionar um comentário informando as inconformidades encontradas."
        }
    }
    if (atividade_destino == 4) {
    	if (comentario == "") {
            throw "Gentileza adicionar um comentário informando as inconformidades encontradas."
        }
    }
    if ((atividade == 11) && (atividade_destino == 9)) {
    	if (comentario == "") {
            throw "Gentileza informar qual a nova data de previsão para o fim da atividade."
        }
    }
if (atividade_destino == 19){
    	
        var anexos   = hAPI.listAttachments();
        var temAnexo = false;

        if (anexos.size() > 0) {
            temAnexo = true;
        }

        if (!temAnexo) {
            throw "Gentileza anexar a lista de presença!";
        }    	
        
    }

if (atividade == 19 && atividade_destino == 9){
	
    var anexos   = hAPI.listAttachments();
    var temAnexo = false;

    if (anexos.size() > 0) {
        temAnexo = true;
    }

    if (!temAnexo) {
        throw "Gentileza anexar a lista de presença assinada!";
    }    	
    
}	
*/
    
}