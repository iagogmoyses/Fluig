function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	var codItem = "";
	        
    if (constraints != null) {
    	    	
    	for (var i = 0; i < constraints.length; i++) {
    		
    		log.info("MAVM - contraints: " + constraints[i].fieldName + " - " + constraints[i].initialValue);
    		
    		if (constraints[i].fieldName == "codItem"){
    			codItem = constraints[i].initialValue;
    		}    	
    	}
    	log.info("Codigo: " + codItem);
    }        
       
    try{
		
	    var serviceProvider = ServiceManager.getService('WSEXECBO');
	    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    var service = serviceLocator.getWebServiceExecBOPort();			
		
	    // campos da temp-table
	    var itemCod = new Object();
	    itemCod.type = "character";
	    itemCod.name = "itemCod";
	    itemCod.label = "Código Item";
	    
	    var deposCod = new Object();
		deposCod.type = "character";
		deposCod.name = "deposCod";
		deposCod.label = "Código Depósito";
		
		var loteLoc = new Object();
		loteLoc.type = "character";
		loteLoc.name = "loteLoc";
		loteLoc.label = "Lote";
		
		var localizacao = new Object();
		localizacao.type = "character";
		localizacao.name = "localizacao";
		localizacao.label = "Localização";
		
		var dataValidade = new Object();
		dataValidade.type = "character";
		dataValidade.name = "dataValidade";
		dataValidade.label = "Data de Validade";
		
		var codEstab = new Object();
		codEstab.type = "character";
		codEstab.name = "codEstab";
		codEstab.label = "Estabelecimento";

		var quant = new Object();
		quant.type = "decimal";
		quant.name = "quant";
		quant.label = "Quantidade";


	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "ttLocalizacao";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [itemCod, deposCod, loteLoc, localizacao, dataValidade, codEstab, quant];
	    
	    // temp-table 
	    var  ttLocalizacao = new Object();
	    ttLocalizacao.dataType = "temptable";
	    ttLocalizacao.name = "ttLocalizacao";
	    ttLocalizacao.type = "output";
	    ttLocalizacao.value = campos_tabela;

	    // parametro
	    var param_codItem = new Object();
	    param_codItem.dataType = "character";
	    param_codItem.name = "codItem";
	    param_codItem.type = "input";
	    param_codItem.value = String(codItem);
	    
		var params = [param_codItem, ttLocalizacao];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
		log.info("MAVM-JSON: " + jsonParams);
    	
		// token para acesso ao servico 
		var token = service.userLogin("super");
		
		// chamada do programa totvs
	    var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/api_busca_localizacao_itens.p", "pi-zoom-loc", jsonParams);
	    
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
		log.error("erro dataset ems_consulta_localizacao_NF_terc: " + e.message);       
    }
		
	return newDataset;
}
