function beforeStateEntry(sequenceId){
	var atividade_destino = parseInt(getValue("WKNextState"));
	if(atividade_destino == 13){
		var anexos   = hAPI.listAttachments();	
        if (anexos.size() == 0 || anexos.size() == 1)
        	throw "É obrigatório o anexo da NF de retorno.!";
	}
}