function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	var quantidade = "";
	var it_codigo = "";
	var deposito = "";
	var lote = "";
	var qtd = "";
	var localizacao = "";
	        
    if (constraints != null) {
    	    	
    	for (var i = 0; i < constraints.length; i++) {
    		
    		log.info("MAVM - contraints: " + constraints[i].fieldName + " - " + constraints[i].initialValue);
    		
    		if (constraints[i].fieldName == "it_codigo"){
    			it_codigo = constraints[i].initialValue;
    		}    	
    		if(constraints[i].fieldName == "quantidade"){
    		    quantidade = constraints[i].initialValue;
    		}
    		if (constraints[i].fieldName == "deposito"){
    			deposito = constraints[i].initialValue;
    		} 
    		if (constraints[i].fieldName == "lote"){
    			lote = constraints[i].initialValue;
    		}  
    		if (constraints[i].fieldName == "qtd"){
    			qtd = constraints[i].initialValue;
    		}  
    		if (constraints[i].fieldName == "localizacao"){
    			localizacao = constraints[i].initialValue;
    		}  
    	}
    	log.info("Codigo: " + it_codigo);
    	log.info("quantidade: " + quantidade);
    	log.info("Depósito: " + deposito);
    	log.info("Lote: " + lote);
    	log.info("Localização: " + localizacao);
    	log.info("Quantidade atual: " + qtd)
    	log.info("MAVM - Tipo de quantidade: " + typeof quantidade);
    }        
       
    try{
		
	    var serviceProvider = ServiceManager.getService('WSEXECBO');
	    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    var service = serviceLocator.getWebServiceExecBOPort();			
		
	    // campos da temp-table
	    var itemValida = new Object();
	    itemValida.type = "character";
	    itemValida.name = "itemValida";
	    itemValida.label = "itemValida";	 

		var qtidade = new Object();
		qtidade.type = "decimal";
		qtidade.name = "qtidade";
		qtidade.label = "qtidade";	  

    	var valida = new Object();
		valida.type = "logical";
		valida.name = "valida";
		valida.label = "valida";	    

	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "ttValidaSaldo";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [itemValida, qtidade, valida];
	    
	    // temp-table 
	    var  ttValidaSaldo = new Object();
	    ttValidaSaldo.dataType = "temptable";
	    ttValidaSaldo.name = "ttValidaSaldo";
	    ttValidaSaldo.type = "output";
	    ttValidaSaldo.value = campos_tabela;

	    // parametro
	    var param_it_codigo = new Object();
	    param_it_codigo.dataType = "character";
	    param_it_codigo.name = "it_codigo";
	    param_it_codigo.type = "input";
	    param_it_codigo.value = String(it_codigo);
	    
	    var param_quantidade = new Object();
	    param_quantidade.dataType = "decimal";
	    param_quantidade.name = "quantidade";
	    param_quantidade.type = "input";
	    param_quantidade.value = parseFloat(quantidade);
	    
	    var param_deposito = new Object();
	    param_deposito.dataType = "character";
	    param_deposito.name = "deposito";
	    param_deposito.type = "input";
	    param_deposito.value = String(deposito);
	    
	    var param_lote = new Object();
	    param_lote.dataType = "character";
	    param_lote.name = "lote";
	    param_lote.type = "input";
	    param_lote.value = String(lote);
	    
	    var param_qtd = new Object();
	    param_qtd.dataType = "decimal";
	    param_qtd.name = "qtd";
	    param_qtd.type = "input";
	    param_qtd.value = parseFloat(qtd);
	    
	    var param_localizacao = new Object();
	    param_localizacao.dataType = "character";
	    param_localizacao.name = "localizacao";
	    param_localizacao.type = "input";
	    param_localizacao.value = String(localizacao);
	    		
		var params = [param_it_codigo, param_quantidade, param_deposito, param_lote, param_qtd, param_localizacao, ttValidaSaldo];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
		log.info("MAVM-JSON: " + jsonParams);
    	
		// token para acesso ao servico 
		var token = service.userLogin("super");
		
		// chamada do programa totvs
	    var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/api_valida_saldo_itens.p", "pi-valida-saldo-item", jsonParams);
	    
	    // json para objeto
	    var responseObj = JSON.parse(response);
	    var callProcedureWithTokenResponse = JSON.parse(responseObj[0].value);	    
	    
		if(response && response != null) {
			
		    response = eval('(' + response + ')')[0];		    
		    var records = eval('(' + response.value + ')');
		    
		    for(var i = 0; i < records.fields.length; i++) {
		    	newDataset.addColumn(records.fields[i].name);
		    }
		    
		    for(var i = 0; i < records.records.length; i++) {
		    	var row = [];
		    	for(var j = 0; j < records.fields.length; j++) {
		    		row.push(records.records[i][records.fields[j].name]);
		    	}
		    	newDataset.addRow(row);
		    }
		    
		}
		        
	} catch (e) {
		var Arr = new Array();
		newDataset.addRow(new Array(e.message,
									"", 
									""));
		log.error("erro dataset pi-valida-saldo-item: " + e.message);       
    }
		
	return newDataset;
}
