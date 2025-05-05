function intermediateconditional45() {
    var diasParado = parseInt(hAPI.getCardValue("diasParado")) || 0;

    try {
        var user = hAPI.getCardValue("emailRequester");
        var userName = hAPI.getCardValue("nomeRequester");
        var solic = hAPI.getCardValue("numDocumento");
        var dataSolic = hAPI.getCardValue("cad_dt_trans_br");
        var remetente = hAPI.getCardValue("loginFiscal");
        var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 

        var parametros = new java.util.HashMap();
        parametros.put("subject", "ATRASO NA SOLICITAÇÃO");
        parametros.put("SOLICITANTE", user);
        parametros.put("NOME_SOLICITANTE", userName);
        parametros.put("NUM_SOLIC", solic);
        parametros.put("DT_SOLIC", dataSolic);
        parametros.put("DIAS_PARADO", diasParado);
        parametros.put("LINK", link);

        var destinatarios = new java.util.ArrayList();
        destinatarios.add(user);

        if (diasParado < 150) {
            notifier.notify(remetente, "TPL_ENVIA__EMAIL_ATRASO_NF_TERC", parametros, destinatarios, "text/html");
        } else {
            destinatarios.add("equipefiscal@fornodeminas.com.br");
            notifier.notify(remetente, "TPL_ENVIA__EMAIL_ATRASO_FINAL_NF_TERC", parametros, destinatarios, "text/html");
        }

    } catch (e) {
        log.error("MAVM - Erro ao enviar email ATRASO NF REMESSA: " + e.message);
    }

    return true; 
}
