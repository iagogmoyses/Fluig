function displayFields(form,customHTML){ 
		
		var ATIVIDADE = getValue("WKNumState");
		var ativ = parseInt(ATIVIDADE);
		var login = getValue("WKUser");

		var data = new Date();
		var dia  = data.getDate();
		var mes  = data.getMonth() + 1;
		var ano  = data.getFullYear();
	
		dia  = (dia<=9 ? "0"+dia : dia);
		mes  = (mes<=9 ? "0"+mes : mes);
	
		var newData = dia+"/"+mes+"/"+ano;

		customHTML.append("<script>");
		customHTML.append("        function getWKUserReal(){ return '" + login + "'} ");
		customHTML.append("        function getWKNumState(){ return " + getValue("WKNumState") + " }  ");
		customHTML.append("</script>");
		customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");

		customHTML.append('<script>document.getElementById("divCadastro").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("divAlteracao").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("divAlteraFamilia").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("divAlteraUnidade").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("divAlteraStatus").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("divAlteraDescricao").style.display  = "none";</script>');

		if(form.getFormMode() == "VIEW"){

			form.setVisibleById("divCadastroAlteracao", true);

			if(form.getValue("rbTipoSolic") == "cadastro"){
				customHTML.append('<script>document.getElementById("divCadastro").style.display  = "";</script>');
			} else if(form.getValue("rbTipoSolic") == "alteracao"){
				customHTML.append('<script>document.getElementById("divAlteracao").style.display  = "";</script>');

				if (form.getValue("rbTipoAlteracao_familia") == "familia"){
					customHTML.append('<script>document.getElementById("divAlteraFamilia").style.display  = "";</script>');
				}
				if (form.getValue("rbTipoAlteracao_un") == "un"){
					customHTML.append('<script>document.getElementById("divAlteraUnidade").style.display  = "";</script>');
				}
				if (form.getValue("rbTipoAlteracao_status") == "status"){
					customHTML.append('<script>document.getElementById("divAlteraStatus").style.display  = "";</script>');
				}
				if (form.getValue("rbTipoAlteracao_descricao") == "descricao"){
					customHTML.append('<script>document.getElementById("divAlteraDescricao").style.display  = "";</script>');
				}
			}




			if (form.getValue("rbTipoCadastro") == "comprado"){
				form.setVisibleById("divComprados", true);
			}
			if (form.getValue("rbTipoCadastro") == "fabricado"){
				form.setVisibleById("divFabricados", true);
			}
			if (form.getValue("rbTipoCadastro") == "mccain"){
				form.setVisibleById("divFabricados", true);
			}

			if (form.getValue("rbTipoItem") == "servico"){
				form.setVisibleById("divPanelItemServ", true);
			}

			if(form.getValue("rbTipoCadastro") == "embalagem"){
				form.setVisibleById("divEmbalagens", true);
			}			
			
			if (form.getValue("rbTipoItem") == "material"){
				form.setVisibleById("divPanelItemMat", true);
				form.setVisibleById("divTbItemMat", true);
			}
			

			}

			if(ativ == 0 || ativ == 1){
				var fullDate = new Date();
				var hours = fullDate.getHours();
				var minutes = fullDate.getMinutes();
				if (minutes <= 9) {
					minutes = "0" + minutes;
				}
		
				var timeValue = hours + ":" + minutes;
				var date = fullDate.getDate().toString();
				
				if (date.length == 1) {
					date = 0 + date;
				}
				
				var mes = (fullDate.getMonth() + 1).toString();
				if (mes.length == 1) {
					mes = 0 + mes;
				}
				
				var data = date + "/" + mes + "/" + fullDate.getFullYear();
				form.setValue("cad_dt_trans_br", data);
				form.setValue('cad_user_br', login);
			}


		else if (ativ != 0 && ativ != 1){
				if (form.getValue("numDocumento") == "" || form.getValue("numDocumento") == null) {
					form.setValue("numDocumento", getValue("WKNumProces"));
				}
		
			form.setVisibleById("divCadastroAlteracao", true);


			if (form.getValue("rbTipoCadastro") == "comprado"){
				form.setVisibleById("divComprados", true);
			}
			if (form.getValue("rbTipoCadastro") == "fabricado"){
				form.setVisibleById("divFabricados", true);
			}
			if (form.getValue("rbTipoCadastro") == "mccain"){
				form.setVisibleById("divFabricados", true);
			}
			if (form.getValue("rbTipoItem") == "servico"){
				form.setVisibleById("divPanelItemServ", true);
			}
			
			if (form.getValue("rbTipoItem") == "material"){
				form.setVisibleById("divPanelItemMat", true);
				form.setVisibleById("divTbItemMat", true);
			}
			
			if(form.getValue("rbTipoCadastro") == "embalagem"){
				form.setVisibleById("divEmbalagens", true);
			}			

		}

		if (ativ != 97 || ativ != 8 || ativ != 26){
			form.setVisibleById("gestor", false);
		}
		if (ativ == 97){
			if (form.getFormMode() != "VIEW"){
			form.setValue("dt_aprov_gerente", newData);
			form.setValue("gerente", fluigAPI.getUserService().getCurrent().getFullName());
		}
			form.setVisibleById("gestor", true);
			form.setVisibleById("aprovacao", true);
			form.setVisibleById("justificativaGestor", true);

		}
		if (ativ == 8 || ativ == 26){
			form.setVisibleById("gestor", true);
			form.setVisibleById("aprovacao", true);
			form.setVisibleById("justificativaGestor", true);
		}

		switch(ativ){
		case 0:

			var today = new Date();     
		    var year = today.getFullYear();     
		    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);     
		    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();		
			form.setValue('data_solicitacao', day + '/' + month  + '/' + year);

			var USER = fluigAPI.getUserService().getCurrent().getFullName();
			
			form.setValue('nm_solicitante', USER);
	
			
			
		break;

		}



	customHTML.append("<script>");
	customHTML.append("initForm('" + form.getFormMode() + "','" +
									 getValue("WKNumState") + "','" + 
									 getValue("WKUser") + "','" +  
									 getValue("WKNumProces") + "','" +  
									 form.getDocumentId() + "','" +

									 form.getMobile() + "');");
	customHTML.append("</script>");
}