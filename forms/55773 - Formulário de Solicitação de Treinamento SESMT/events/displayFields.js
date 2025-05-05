function displayFields(form,customHTML){ 
	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
	
	var usuario = getValue("WKUser");
	var numForm = form.getDocumentId();
	
	customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");
	
	customHTML.append('<script>document.getElementById("dvFase1").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase2").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase3").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase3_1").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase4").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase5").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase6").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase7").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase8").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase9").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divIntegracao").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divPermissaoTrabalho").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divEncerramento").style.display  = "none";</script>');
	customHTML.append("<script>function getWKUser(){ return '" + usuario + "'}; </script>");
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");
	customHTML.append("<script>function mobile(){ return '" + form.getMobile() + "'; } </script>");
	customHTML.append("<script>function getProcess(){ return " + getValue("WKNumProces") + "; }</script>");

	if(form.getFormMode() == "VIEW"){
	    if(form.getValue("aprov_fase1") != "") customHTML.append('<script>document.getElementById("dvFase1").style.display  = "";</script>');
		if(form.getValue("aprov_fase2") != "") customHTML.append('<script>document.getElementById("dvFase2").style.display  = "";</script>');
	    if(form.getValue("aprov_fase3") != "") customHTML.append('<script>document.getElementById("dvFase3").style.display  = "";</script>');
		if(form.getValue("aprov_fase3_1") != "") customHTML.append('<script>document.getElementById("dvFase3_1").style.display  = "";</script>');
	    if(form.getValue("aprov_fase4") != "") customHTML.append('<script>document.getElementById("dvFase4").style.display  = "";</script>');
	    if(form.getValue("aprov_fase7") != "") customHTML.append('<script>document.getElementById("dvFase7").style.display  = "";</script>');
	    if(form.getValue("aprov_fase8") != "") customHTML.append('<script>document.getElementById("dvFase8").style.display  = "";</script>');
		customHTML.append('<script>document.getElementById("dvFase5").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("dvFase6").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("dvFase9").style.display  = "none";</script>');
	
	}

	if(ativ == 9){ //Emissao Permissao de Trabalho
		customHTML.append('<script>document.getElementById("dvFase1").style.display  = "";</script>');
	}
	if(ativ == 40){ //RH-DP CONFIRMA CAPACITAÇÕES
		customHTML.append('<script>document.getElementById("dvFase2").style.display  = "";</script>');
	}
	if(ativ == 11){ //MED. TRABALHO VERIFICA ASO/PCMSO
		customHTML.append('<script>document.getElementById("dvFase3").style.display  = "";</script>');
	}
	if(ativ == 61){ // Integracao
		
		customHTML.append('<script>document.getElementById("divIntegracao").style.display  = "";</script>');
	} 
	if(ativ == 63){ //Aprova Integração
		customHTML.append('<script>document.getElementById("dvFase3_1").style.display  = "";</script>');
	}
	if(ativ == 20){ //CD AVALIA RISCO
		customHTML.append('<script>document.getElementById("dvFase4").style.display  = "";</script>');
	}
	if(ativ == 22){ //ANEXAR DOC ASSINADO
		customHTML.append('<script>document.getElementById("dvFase5").style.display  = "";</script>');
	}
	if(ativ == 24){ //CQ VALIDAR DOOC
		customHTML.append('<script>document.getElementById("dvFase5").style.display  = "";</script>');
		customHTML.append('<script>document.getElementById("dvFase6").style.display  = "";</script>');
	}
	if(ativ == 78){ //Libera Portaria de Inicio de Trabalho
		customHTML.append('<script>document.getElementById("dvFase7").style.display  = "";</script>');
		//customHTML.append('<script>document.getElementById("divPermissaoTrabalho").style.display  = "";</script>');
		//customHTML.append('<script>document.getElementById("divEncerramento").style.display  = "";</script>');
	}
	if(ativ == 82){ //SESMT AGUARDANDO DOCS
		customHTML.append('<script>document.getElementById("dvFase8").style.display  = "";</script>');
	}
		
	/*
	if(form.getValue("rbTipoSolic") == "emissao"){
		form.setVisibleById(divNumIntegracao);
	}
	*/

		switch(ativ){
		case 1:
			var today = new Date();     
		    var year = today.getFullYear();     
		    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);     
		    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();		
			
			form.setValue('data_solicitacao', day + '/' + month  + '/' + year);   		
			
			if(form.getFormMode() != "VIEW")
				{
				form.setVisibleById("divIntegracao");
				//form.setVisibleById("divPermissaoTrabalho");
				//form.setVisibleById("divEncerramento");
				
				}
		break;
		
		case 0:
			var today = new Date();     
		    var year = today.getFullYear();     
		    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);     
		    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();		
			
			form.setValue('data_solicitacao', day + '/' + month  + '/' + year);   		
			
			var USER = fluigAPI.getUserService().getCurrent().getFullName();
			form.setValue('nm_solicitante', USER);
			
			if(form.getFormMode() != "VIEW")
			{
				form.setVisibleById("divIntegracao",false);
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
			
			}
			
		break;
		
		case 7:
			
			if(form.getFormMode() != "VIEW")
			{
				form.setVisibleById("divIntegracao",false);
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');
			var processo = getValue("WKNumProcess");
			form.setValue("num_solicitacao", processo);
			
		break;
		
		case 15:
			
			if(form.getFormMode() != "VIEW")
			{
				
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');

			
		break;
		
		case 17:
			
			if(form.getFormMode() != "VIEW")
			{
				
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');

			
		break;
		
		case 19:
			
			if(form.getFormMode() != "VIEW")
			{
				
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);

			
		break;
		
		case 9:
			
			
			
			var processo = getValue("WKNumProcess");
			form.setValue("num_solicitacao", processo);
			
			if(form.getFormMode() != "VIEW")
			{
				
				
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');
			
			if (form.getValue("dtIntegracao") == null || form.getValue("dtIntegracao") == ""){
				form.setVisibleById("divIntegracao", false);
			}
			
			
		break;
		
		case 78:
			
			
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');

			
		break;

		case 40:
			
		
			var processo = getValue("WKNumProcess");
			form.setValue("num_solicitacao", processo);
			
			if(form.getFormMode() != "VIEW")
			{
				
				
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');
			
			if (form.getValue("dtIntegracao") == null || form.getValue("dtIntegracao") == ""){
				form.setVisibleById("divIntegracao", false);
			}
		
		break;
		
		}
}
	
			
	
	