function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	//Recupera o numero da solicitação
    var processo = getValue("WKNumProces");
    hAPI.setCardValue("num_solicitacao", processo);
    
}