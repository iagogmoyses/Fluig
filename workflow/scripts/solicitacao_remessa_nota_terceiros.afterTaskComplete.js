function afterTaskComplete(colleagueId, nextSequenceId, userList) {
    var atividade = getValue("WKNumState");
    var diasParado = parseInt(hAPI.getCardValue("diasParado")) || 0;
    
    
    log.info("Valor do campo diasParado antes do parse: " + hAPI.getCardValue("diasParado"));
    log.info("afterTaskComplete - Atividade atual: " + atividade);
    log.info("afterTaskComplete - Valor atual de diasParado: " + diasParado);

    if (atividade == 43) {
    	diasParado +=30
        hAPI.setCardValue("diasParado", diasParado.toString());
        log.info("afterTaskComplete - Novo valor de diasParado: " + diasParado);
        log.info("Valor salvo no formulário: " + hAPI.getCardValue("diasParado"));
    }
}
