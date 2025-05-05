function displayFields(form, customHTML) {
	var atividade = getValue("WKNumState");
	var login = getValue("WKUser");
	var controlaLote = getValue("it_lote");
	
	form.setValue('atividade', atividade);
	
	customHTML.append('<script>document.getElementById("dvFase1").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divComodato").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divArmaz").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divConserto").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvObs").style.display  = "none";</script>');
	customHTML.append("<script>");
	customHTML.append("        function getWKUserReal(){ return '" + login + "'} ");
	customHTML.append("        function getWKNumState(){ return " + getValue("WKNumState") + " }  ");
	customHTML.append("</script>");
	
	customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");
	
	if(form.getFormMode() == "VIEW"){
	    if(form.getValue("aprov_fase1") != "") customHTML.append('<script>document.getElementById("dvFase1").style.display  = "";</script>');

		if (form.getValue("rbTipoSolic") == "comodato"){
			customHTML.append('<script>document.getElementById("divComodato").style.display  = "";</script>');
			customHTML.append('<script>document.getElementById("divArmaz").style.display  = "none";</script>');
			customHTML.append('<script>document.getElementById("divConserto").style.display  = "none";</script>');
			if(form.getValue("tipoRetornoComod") == "total"){
				form.setVisibleById("divPanelItemComod", false);
			}
			if(form.getValue("tipoRetornoComod") == "parcial"){
				form.setVisibleById("divPanelItemComod", true);
			}
		}

		if (form.getValue("rbTipoSolic") == "armazenagem"){
			customHTML.append('<script>document.getElementById("divComodato").style.display  = "none";</script>');
			customHTML.append('<script>document.getElementById("divArmaz").style.display  = "";</script>');
			customHTML.append('<script>document.getElementById("divConserto").style.display  = "none";</script>');
			if(form.getValue("tipoRetornoArmaz") == "total"){
				form.setVisibleById("divPanelItemArmaz", false);
			}
			if(form.getValue("tipoRetornoArmaz") == "parcial"){
				form.setVisibleById("divPanelItemArmaz", true);
			}
		}

		if (form.getValue("rbTipoSolic") == "conserto"){
			customHTML.append('<script>document.getElementById("divComodato").style.display  = "none";</script>');
			customHTML.append('<script>document.getElementById("divArmaz").style.display  = "none";</script>');
			customHTML.append('<script>document.getElementById("divConserto").style.display  = "";</script>');
			if(form.getValue("tipoRetornoConserto") == "total"){
				form.setVisibleById("divPanelItemConserto", false);
			}
			if(form.getValue("tipoRetornoConserto") == "parcial"){
				form.setVisibleById("divPanelItemConserto", true);
			}
		}

		/*if (form.getValue("rbTipoSolic") == "comodato"){
			form.setVisibleById("divComodato",true);
			form.setVisibleById("divArmaz", false);
			form.setVisibleById("divConserto", false);
			if(form.getValue("rbTipoComodato") == "forno"){
				form.setVisibleById("divComodFor", true);
				form.setVisibleById("divComodCli", false)
				if(form.getValue("tipoRetornoComod") == "parcial"){
					form.setVisibleById("divPanelItemComod", true);
				}
			}
			if(form.getValue("rbTipoComodato") == "cliente"){
				form.setVisibleById("divComodFor", false);
				form.setVisibleById("divComodCli", true)
				if(form.getValue("tipoRetornoComod") == "parcial"){
					form.setVisibleById("divPanelItemComodCli", true);
				}
			}
			if(form.getValue("tipoRetornoComod") == "total"){
				form.setVisibleById("divPanelItemComod", false);
				form.setVisibleById("divPanelItemComodCli", false);
			}
		}
	
		if (form.getValue("rbTipoSolic") == "armazenagem"){
			form.setVisibleById("divComodato",false);
			form.setVisibleById("divArmaz", true);
			form.setVisibleById("divConserto", false);
			if(form.getValue("tipoRetornoArmaz") == "total"){
				form.setVisibleById("divPanelItemArmaz", false);
			}
			if(form.getValue("tipoRetornoArmaz") == "parcial"){
				form.setVisibleById("divPanelItemArmaz", true);
			}
		}

		if (form.getValue("rbTipoSolic") == "conserto"){
			form.setVisibleById("divComodato",false);
			form.setVisibleById("divArmaz", false);
			form.setVisibleById("divConserto", true);
			if(form.getValue("tipoRetornoConserto") == "total"){
				form.setVisibleById("divPanelItemConserto", false);
			}
			if(form.getValue("tipoRetornoConserto") == "parcial"){
				form.setVisibleById("divPanelItemConserto", true);
			}
		}*/
	}

	
	if (atividade == 0 || atividade == 2) {
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

		/*if(controlaLote == "true"){
			form.setVisibleById("dvLote", true);
		}*/
	
		
	} 

	if(atividade == 4){
		form.setValue('cad_user_fiscal', login);
	}

	if(form.getValue("rbTipoSolic") == "comodato"){

		form.setVisibleById("divComodato", true);

		if(form.getValue("rbTipoComodato") == "forno"){
			form.setVisibleById("divComodFor", true);
		}
		if(form.getValue("rbTipoComodato") == "cliente"){
			form.setVisibleById("divComodCli", true);
		}
	}

	if(atividade == 13){ //Validacao 2 Fiscal
		customHTML.append('<script>document.getElementById("dvFase1").style.display  = "";</script>');
	}

	if(atividade == 20){
		customHTML.append('<script>document.getElementById("divComodato").style.display  = "";</script>');
	}

	if(atividade == 21){
		customHTML.append('<script>document.getElementById("divArmaz").style.display  = "";</script>');
	}

	if(atividade == 22){
		customHTML.append('<script>document.getElementById("divConserto").style.display  = "";</script>');
	}

	if(atividade == 37){
		customHTML.append('<script>document.getElementById("dvObs").style.display  = "";</script>');
	}
}
