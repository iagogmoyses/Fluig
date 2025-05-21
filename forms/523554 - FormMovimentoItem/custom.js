$(document).ready(function () {

	$(document).on("change", 'input[name^="entrada_saida"]', function () {
        // Obtendo o índice correto da linha
        var idx = $(this).attr("name").split("___")[1];

        // Pegando o valor do radio selecionado na linha específica
        var entrada_saida = $('input[name="entrada_saida___' + idx + '"]:checked').val();
        
        // Campos que devem ser ativados/desativados
        var campos = ['#localizacao', '#deposito', '#lote', '#dt_validade', '#cod_estabel'];

        if (entrada_saida == "1") {
            // Habilita os campos na linha correspondente
            campos.forEach(function (campo) {
                $(campo + "___" + idx).removeAttr("readonly");
            });
        } else {
            // Desabilita novamente caso selecione "Saída"
            campos.forEach(function (campo) {
                $(campo + "___" + idx).attr("readonly", true);
            });
        }
    });

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


	$("#alerta").hide();

	$("#consultar_custo").on("click", function () {

		var codigoItem = $("#cod_item").val();
		var quantidade = $("#quantidade").val();
		var depositoOrigem = $("#deposito_origem").val();


		$("#alerta").show().empty().append("Escolha o Cliente");

		var filterFields = [];

		filterFields.push(["codigoItem", codigoItem],
			["depositoOrigem", depositoOrigem],
			["quantidade", quantidade]);

		var param = {
			"datasetId": "ems_custo_item",
			"filterFields": filterFields
		};

		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			url: '/api/public/ecm/dataset/search',
			data: JSON.stringify(param),
			success: function (data) {
				if (data.content != null) {



					if (data.content.length > 0) {


					}

				}
			}
		}).done(function () {
			setTimeout(function () {
				$("#overlay").fadeOut(300);
			}, 500);
		});

	});

})

window.parent.$("[data-send]").on("click", function(){	
	
});


window.parent.$("[data-save]").on("click", function(){

});


/*
** Função padrão do Fluig
*/
function addTableRow(tabela){
	var row = wdkAddChild(tabela);

	if (tabela == "tbTransacoesDiversas") {
		$("#idtbTransacoesDiversas___" + row).val(row);
	}

	$("#" + tabela + " tbody tr").not(":first").find("span").each(function(){
		if ($(this).hasClass("fs-md-space")){
			$(this).removeClass("fs-md-space");
		}			
	});	
	
	$('.money').maskNumber({
        decimal: ',',
        thousands: '.'
    });
	
	$(".formato_data").each(function(){
		if ($(this).prop('readonly') == false){			
			var calendario = FLUIGC.calendar(this);
		}
	});
}

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

function validaSaldo(button){
	$("#overlay").fadeIn(300);

	var tr = $(button).closest('tr');
	var index = button.id.substring(button.id.indexOf('___') + 3);

    var it_codigo = tr.find("#it_codigo___" + index).val();
    var quantidade = tr.find("#quantidade___" + index).val();
    var deposito = tr.find("#deposito___" + index).val();
    var lote = tr.find("#lote___" + index).val();
    var localizacao = tr.find("#localizacao___" + index).val();
    var qtd = tr.find("#qtd___" + index).val();
	var entrada_saida = tr.find('input[name="entrada_saida___' + index + '"]:checked').val();
		
		var param = {
			"datasetId": "ems_valida_saldo_transf_item",
			"filterFields": ["it_codigo", it_codigo, "quantidade", quantidade, "deposito", deposito, "lote", lote, "qtd", qtd, "localizacao", localizacao]
		};

		console.log(param);
	
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			url: '/api/public/ecm/dataset/search',
			data: JSON.stringify(param), // Enviar os parâmetros 
			success: function (data) {
				console.log("data completo:", data);

				if(entrada_saida === "1"){
					FLUIGC.toast({
						title: '',
						message: "Operações de entrada não necessitam disponibilidade de saldo!",
						type: 'info'
					});
				}


				else if(it_codigo === "" || quantidade === ""){
					FLUIGC.toast({
						title: '',
						message: "ERRO. Campo 'item' ou 'quantidade' vazio(s). Insira valores válidos.",
						type: 'danger'
					});
				}
				else if (data.content && data.content.length > 0) {
					var saldo = data.content[data.content.length-1];
					console.log("Saldo retornado:", saldo);
					
					if (saldo.valida === true) {
						FLUIGC.toast({
							title: '',
							message: "Saldo disponível para o item: " + it_codigo + ". <br>Saldo ainda disponível: " + (saldo.qtidade - quantidade),
							type: 'info'
						});
					} else if(saldo.valida === false) {
						FLUIGC.toast({
							title: '',
							message: "Saldo indisponível para o item: " + it_codigo + ". <br>Saldo atual: " + saldo.qtidade + ".<br>Quantidade solicitada: " + quantidade,
							type: 'warning'
						});
					} 
				} 
				else {
					FLUIGC.toast({
						title: '',
						message: "Nenhum registro encontrado para o item: " + it_codigo,
						type: 'danger'
					});
				}
			},
			error: function () {
				FLUIGC.toast({
					title: '',
					message: "Erro ao validar saldo" ,
					type: 'danger'
				});
			}
		}).done(function () {
			setTimeout(function () {
				$("#overlay").fadeOut(300);
			}, 500);
		});
	};