function beforeStateEntry(sequenceId) {
    var arraySolic = new Array();
    var numProcesso = getValue("WKNumProces");
    var atividade = parseInt(getValue("WKNumState")); 
    var atividade_destino = parseInt(getValue("WKNextState"));
    
    try {
        if (sequenceId == 8) {
            var fieldsForm = hAPI.getCardData(parseInt(getValue("WKNumProces")));
            var fields = fieldsForm.keySet().iterator();
            
            while (fields.hasNext()) {
                var id = fields.next();
                
                if (id.match(/idtbCancela___/)) {
                    var aux = id.split("___");
                    id = aux[1];                
                    var camposTabela = new Object();                
                    camposTabela.id = new String(fieldsForm.get("idtbCancela___" + id));
                    camposTabela.numSolic = new String(fieldsForm.get("numSolic___" + id));
                    
                    arraySolic.push(camposTabela);
                }
            }
            
            // Agora precisamos cancelar cada solicitação individualmente
            for (var i = 0; i < arraySolic.length; i++) {
                var vo = new com.fluig.sdk.api.workflow.CancelInstanceVO();
                vo.setProcessInstanceId(parseInt(arraySolic[i].numSolic)); // Usar o numSolic como ID da instância
                vo.setCancelText("Cancelamento via script de evento de processos");
                
                fluigAPI.getWorkflowService().cancelInstance(vo);
            }
        }
    } catch(e) {
        throw "ERRO AO REALIZAR O CANCELAMENTO. MENSAGEM: " + e.message;
    }
}