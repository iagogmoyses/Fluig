$(document).ready(function () {

	var formADIComplementar = (function() {
		var today = new Date();
		var current = null;
		var loading = FLUIGC.loading(window);
		var index = 0;
		return {
			start : function() {//inicia processo
	
				events.setup();
	
			}
		}
	})();

    //calendario
	var dataAtual = new Date();
	dataAtual.setDate(dataAtual.getDate());

	var dataInt = new Date();
	var dias = 1;
	dataInt.setDate(dataInt.getDate() + dias);
	var dtInicio = FLUIGC.calendar('#dataInicio');
	dtInicio.setMinDate(dataAtual);
    var dtValidade = FLUIGC.calendar('#dataValidade');
	dtInicio.setMinDate(dataAtual);
    var dtFim_altera = FLUIGC.calendar('#dtFim_altera');
	
    var dtBloqueio = FLUIGC.calendar('#dtBloqueio');
	

	var events = (function() {
		return {
			setup : function() {
				$(document).on("click", ".zoom-click", function() {
					var ev = $(this).data("event");
					var idObj = $(this).attr("id");
					
					
					zooms(ev, idObj);
				});
			}
		}
	})();
	
	
	//calendario
	$(".formato_data").each(function(){
		if ($(this).prop('readonly') == false){			
			var calendario = FLUIGC.calendar(this);
		}
	});
	
	
	$('.money').maskNumber({
        decimal: ',',
        thousands: '.'
    });

})

window.parent.$("[data-send]").on("click", function(){	
	
});


window.parent.$("[data-save]").on("click", function(){

});


/*
** Função padrão do Fluig
*/


function fnEnableButtonField(nomeObj, stat){
	if(stat) 
	$('#'+nomeObj).removeClass('input-group-addon group-zoom no-view zoom-click btn-primary').addClass('input-group-addon group-zoom no-view zoom-click btn-info');
	else
	$('#'+nomeObj).removeClass('input-group-addon group-zoom no-view zoom-click btn-info').addClass('input-group-addon group-zoom no-view zoom-click btn-primary');
}


function fnEnableRSButtonField(nomeObj, stat){
	if(stat) 
	$('#'+nomeObj).removeClass('input-group-addon btn-primary').addClass('input-group-addon btn-info');
	else
	$('#'+nomeObj).removeClass('input-group-addon btn-info').addClass('input-group-addon btn-primary');
}

function validaTipo(target){
    if (target.id === "rb_tipo_solic_criacao") {
    $("#dvCriacao").show();
    $("#dvAlteracao").hide();
    $("#dvBloqueio").hide();
    } else if(target.id === "rb_tipo_solic_alteracao"){
        $("#dvCriacao").hide();
        $("#dvAlteracao").show();
        $("#dvBloqueio").hide();
    }else if(target.id === "rb_tipo_solic_bloqueio"){
        $("#dvCriacao").hide();
        $("#dvAlteracao").hide();
        $("#dvBloqueio").show();
    }
}

function validaAlteracao(target){
    if (target.id === "rb_tipo_alteracao_cod") {
        $("#dvAlteraCod").show();
        $("#dvAlteraTitulo").hide();
        $("#dvAlteraDtIni").hide();
        $("#dvAlteraDtFim").hide();
    } else if(target.id === "rb_tipo_alteracao_titulo"){
        $("#dvAlteraCod").hide();
        $("#dvAlteraTitulo").show();
        $("#dvAlteraDtIni").hide();
        $("#dvAlteraDtFim").hide();
    }else if(target.id === "rb_tipo_alteracao_dtIni"){
        $("#dvAlteraCod").hide();
        $("#dvAlteraTitulo").hide();
        $("#dvAlteraDtIni").show();
        $("#dvAlteraDtFim").hide();
    }else if(target.id === "rb_tipo_alteracao_dtFim"){
        $("#dvAlteraCod").hide();
        $("#dvAlteraTitulo").hide();
        $("#dvAlteraDtIni").hide();
        $("#dvAlteraDtFim").show();
    }
}