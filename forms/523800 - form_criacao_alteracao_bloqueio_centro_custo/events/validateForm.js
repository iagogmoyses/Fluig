function validateForm(form){

	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
	var ativ_destino = parseInt(getValue("WKNextState"));

	if(ativ == 0 || ativ == 4 || ativ == 14){
		validaCampo("Tipo de solicitação", form.getValue("rb_tipo_solic"));
		if(form.getValue("rb_tipo_solic") == "criacao"){
            validaCampo("Título", form.getValue("titulo"));
            validaCampo("Data Início", form.getValue("dataInicio"));
            validaCampo("Data de Validade", form.getValue("dataValidade"));
        }else if(form.getValue("rb_tipo_solic") == "alteracao"){
            validaCampo("Centro de Custo", form.getValue("centro_custo"));
            /*validaCampo("Tipo de Alteração", form.getValue("rb_tipo_alteracao"));*/
            if(form.getValue("rb_tipo_alteracao") == "cod"){
                validaCampo("Código", form.getValue("cod_altera"));
            }
            else if(form.getValue("rb_tipo_alteracao") == "titulo"){
                validaCampo("Título", form.getValue("tit_altera"));
            }
            else if(form.getValue("rb_tipo_alteracao") == "dtIni"){
                validaCampo("Data de Início", form.getValue("dtIni_altera"));
            }
            else if(form.getValue("rb_tipo_alteracao") == "dtFim"){
                validaCampo("Data de fim da validade", form.getValue("dtFim_altera"));
            }
        }
        else if(form.getValue("rb_tipo_solic") == "bloqueio"){
            validaCampo("Centro de custo a ser bloqueado", form.getValue("centro_custo_bloq"));
            validaCampo("Data do bloqueio", form.getValue("dtBloqueio"));
        }
		
	}

	if(ativ == 5){
        if(form.getValue("rb_tipo_solic") == "criacao"){
            if(form.getValue("aprov_custos") == "true"){
            validaCampo("Código", form.getValue("codigo"));
            }
        }
		validaCampo("Validação", form.getValue("aprov_custos"));
		validaCampo("Justificativa", form.getValue("just_aprov"));
        
	}
}

function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}

