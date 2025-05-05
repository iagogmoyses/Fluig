function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	var numProcesso = getValue("WKNumProces");	
	
	if (numProcesso != null && numProcesso != "" && numProcesso != "0"){
		hAPI.setCardValue("num_solicitacao", numProcesso);
	}		
	
}