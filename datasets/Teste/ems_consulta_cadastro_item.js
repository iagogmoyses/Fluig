function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();	
	var filtroItem = "";
		if (constraints != null) {
	    	
	    	for (var i = 0; i < constraints.length; i++) {
	    		log.info("brunoxyz"+constraints[i].fieldName);
	    		if (constraints[i].fieldName == "descItem")
	    			{
	    			filtroItem = constraints[i].initialValue;
	    			} 
	    		
	    		}
			}  
	
	try{
		
	    var serviceProvider = ServiceManager.getService('WSEXECBO');      
	    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');    
		var service = serviceLocator.getWebServiceExecBOPort();
		
		var token = service.userLogin("super");
		
		var parametrosProgress = 
		    [  
		     	{
		     		"name":"cFiltro", "dataType":"character", "type":"input", "value":new String(filtroItem)
		     	},
		       {
		    	   "name":"ttItem",
		    	   "type":"output",
		    	   "dataType":"tempTable",
		    	   "value":{		    		   
		    	       "name": "ttItem",		    	       
		    	       "fields":[		    	                		    	                 
		    	            {"name":"itCodigo", "label":"itCodigo", "type":"character"},
		    	            {"name":"un", "label":"un", "type":"character"},
		    	            {"name":"descItem", "label":"descItem", "type":"character"},
		    	            {"name":"precoVenda", "label":"precoVenda", "type":"decimal"},
		    	            {"name":"imagem", "label":"imagem", "type":"character"} 

		    	   	   ],
		    	   	   "records":[]
		    	   }
		       }		       
		    ];   
		
		var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/zoom.p", "pi-zoom-item-nfs", JSON.stringify(parametrosProgress) );
		
		log.info("response: " + response);
		log.info(JSON.parse(response));
		
		
		
		if (response && response != null) {
			
			var responseObj = JSON.parse(response);
			
			var registros = JSON.parse(responseObj[0].value);
			
		    
		    log.info("Registros fields: " + registros.fields.length);		    
											    			
		    for(var i = 0; i < registros.fields.length; i++) {
		    	log.info("registros: " + i + " - " + registros.fields[i].name);
		    	dataset.addColumn(registros.fields[i].name);
		    }
		    
		    for(var i = 0; i < registros.records.length; i++) {
		    	var row = [];
		    	for(var j = 0; j < registros.fields.length; j++) {
		    		row.push(registros.records[i][registros.fields[j].name]);
		    	}
		    	dataset.addRow(row);
		    }
		    
		}		
		
		
	}catch(e){
		
		dataset.addRow(new Array(e.message));
		
	}
	
	return dataset;
	    	
}

