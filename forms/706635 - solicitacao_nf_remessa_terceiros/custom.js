window.onload = function() {
	document.getElementById("diasParado").value = 0;
	var browser=navigator.appName;  
	var b_version=navigator.appVersion;  
	var version=parseFloat(b_version)
	var userLogin = getWKUserReal();
	 
	var activity = getWKNumState();
  
	/*var situacao = $('input:radio[name=situacao]');

	if (situacao.is(':checked') === false) {
		$('input:radio[name="situacao"][value="true"]').prop('checked', true);
		fnSituacao('add');
	}*/

	if (activity == 0 || activity == 2) {
	  document.getElementById("cad_browser_name").value = browser; 			
	  document.getElementById("cad_browser_version").value = version;
  
  }  else {
		disableFields(activity);
	}
	
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
  
  
  /*
  function setSelectedZoomItem(selectedItem){
  
	  var tipo = selectedItem.type;
	  
	  if (selectedItem.inputId == "cad_banco_br") {
		  var codBanco = selectedItem.banco;
		  codBanco = codBanco.substring(0,codBanco.indexOf("-"));
		  $("#hcad_banco_br").val(codBanco);
		  
	  }
	  
	  if (selectedItem.inputId == "cad_condpagto_br") {
		  document.getElementById('cad_desc_condpagto_br').value = selectedItem.Descricao;
	  }
	  
	  if (selectedItem.inputId == "cad_despesapdr_br") {
		  document.getElementById('cad_desc_despesapdr_br').value = selectedItem.Descricao;
	  }
	  
	  
	  if (selectedItem.inputId == "cad_portador_br") {
		  document.getElementById('cad_desc_portador_br').value = selectedItem.Nome;
		  document.getElementById('cad_modalidade_br').value = "Cb Simples";
	  }
	  
	  
	  if (selectedItem.inputId == "cad_grupo_br") {
		  document.getElementById('cad_desc_grupo_br').value = selectedItem.Descricao;
	  }
	  
	  
	  
  }	
  */
  
  function fnModoView() {
	  var node_list  = document.getElementsByTagName('*');
	  var removeNode = document.getElementsByTagName('@');
	  
	  for (var i = 0; i < node_list.length; i++) {
		  var node = node_list[i];
		  if (node.nodeName == "SPAN"){
			  var nodeValue = node.textContent;
			  nodeValue = nodeValue.replace(/[\\"]/g, ' ');
			  node.textContent = nodeValue;
			  node.style.color = "red";
		  }
	  } 
  }

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

	/*function calcularValorTotal() {
		// Obtém o valor dos campos "valor" e "qtd"
		var valor = parseFloat($("#valor").val()) || 0; // Converte para float, usa 0 se for inválido
		var quantidade = parseFloat($("#qtd").val()) || 0; // Converte para float, usa 0 se for inválido
	
		// Calcula o valor total
		var valorTotal = valor * quantidade;
	
		// Atribui o valor calculado ao campo "valorTotal"
		$("#valorTotal").val(valorTotal.toFixed(2)); // Define o valor com 2 casas decimais
	}
	
	// Dispara o cálculo quando o usuário sai do campo "valor" ou "qtd"
	$("#valor, #qtd").on('blur', calcularValorTotal);*/
	
	

	//calendario
	$(".date").each(function(){
		if ($(this).prop('readonly') == false){			
			var calendario = FLUIGC.calendar(this);
		}
	});

	
	/*$("#validaSaldo").on("click", function () {
		console.log("Botão clicado");
		$("#overlay").fadeIn(300);
	
		var codItem = $("#codItem").val();
		var quantidade = $("#qtd").val();
		var tipoContr = $("#tipoContr").val();
		var codDepos = $("#codDepos").val();
		var lote = $("#lote").val();
		var localizacao = $("#localizacao").val();
		var qtidade_atu = $("#qtidade_atu").val();
		
		var param = {
			"datasetId": "ems_valida_saldo_NF_terc",
			"filterFields": ["codItem", codItem, "quantidade", quantidade, "codDepos", codDepos, "lote", lote, "qtidade_atu", qtidade_atu, "localizacao", localizacao, "tipoContr", tipoContr]
		};
	
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			url: '/api/public/ecm/dataset/search',
			data: JSON.stringify(param), // Enviar os parâmetros 
			success: function (data) {
				console.log("data completo:", data);

				if(item === "" || quantidade === ""){
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
							message: "Saldo disponível para o item: " + codItem + ". <br>Saldo ainda disponível: " + (saldo.qtidade - quantidade),
							type: 'info'
						});
					} else if(saldo.valida === false) {
						FLUIGC.toast({
							title: '',
							message: "Saldo indisponível para o item: " + codItem + ". <br>Saldo atual: " + saldo.qtidade + ".<br>Quantidade solicitada: " + quantidade,
							type: 'warning'
						});
					} 
				} else if(tipoContr === '4'){
					FLUIGC.toast({
						title: '',
						message: "Item de débito direto. Não necessita saldo!",
						type: 'info'
					});
				}
				else {
					FLUIGC.toast({
						title: '',
						message: "Nenhum registro encontrado para o item: " + codItem,
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
	});*/
	

   
	


})

window.parent.$("[data-send]").on("click", function(){	
	
});


window.parent.$("[data-save]").on("click", function(){

});



/*
** Função padrão do Fluig
*/


/*
** Função para limpar uma lista de campos do form
*/



/*
** Função padrão do Fluig
*/
function addTableRow(tabela){
	var row = wdkAddChild(tabela);

	$("#" + tabela + " tbody tr").not(":first").find("span").each(function(){
		if ($(this).hasClass("fs-md-space")){
			$(this).removeClass("fs-md-space");
		}
		
		if(tabela == "tbProduto") {
			$("#idTbProduto___" + row).val(row);
			}
	});	
}


function delTableRow(tabela) {
	var tr = $(tabela).closest('tr');

	//tr.fadeOut(400, function(){ 
	tr.remove();
	doFormTotal();
	//}); 	  

	return false;
}

function init() {
	$("input[id^='qtd___']:last").blur(doLineTotal);
	$("input[id^='valorTotal___']:last").blur(doLineTotal);
}

function doLineTotal() {
	var index = this.id.substring(this.id.indexOf('___') + 3);

	var quantity = $("#qtd___" + index).val();
	var price = $("#valor___" + index).val();

	if (quantity && price) {
		var total = quantity * price;
		$("#valorTotal___" + index).val(total);
		doFormTotal();
	}
}

function doFormTotal() {
	var total = 0;
	$("input[id^='valorTotal___']").each(function () {
		if ($(this).val()) {
			total += parseInt($(this).val());
		}
	});
	$("#valorTotalNF").val(total);
}

function validaSaldo(button){
	$("#overlay").fadeIn(300);

	var tr = $(button).closest('tr');
	var index = button.id.substring(button.id.indexOf('___') + 3);

    var codItem = tr.find("#codItem___" + index).val();
    var quantidade = tr.find("#qtd___" + index).val();
    var tipoContr = tr.find("#tipoContr___" + index).val();
    var codDepos = tr.find("#codDepos___" + index).val();
    var lote = tr.find("#lote___" + index).val();
    var localizacao = tr.find("#localizacao___" + index).val();
    var qtidade_atu = tr.find("#qtidade_atu___" + index).val();
		
		var param = {
			"datasetId": "ems_valida_saldo_NF_terc",
			"filterFields": ["codItem", codItem, "quantidade", quantidade, "codDepos", codDepos, "lote", lote, "qtidade_atu", qtidade_atu, "localizacao", localizacao, "tipoContr", tipoContr]
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

				if(item === "" || quantidade === ""){
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
							message: "Saldo disponível para o item: " + codItem + ". <br>Saldo ainda disponível: " + (saldo.qtidade - quantidade),
							type: 'info'
						});
					} else if(saldo.valida === false) {
						FLUIGC.toast({
							title: '',
							message: "Saldo indisponível para o item: " + codItem + ". <br>Saldo atual: " + saldo.qtidade + ".<br>Quantidade solicitada: " + quantidade,
							type: 'warning'
						});
					} 
				} else if(tipoContr === '4'){
					FLUIGC.toast({
						title: '',
						message: "Item de débito direto. Não necessita saldo!",
						type: 'info'
					});
				}
				else {
					FLUIGC.toast({
						title: '',
						message: "Nenhum registro encontrado para o item: " + codItem,
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

	function showComodato(target){
		if (target.value == "forno"){
			$("#divComodFor").show();
			$("#divComodCli").hide();
		}
		else{
			$("#divComodFor").hide();
			$("#divComodCli").show();
		}
	}

	function showItens(target){
			if (target.value == "total"){
				$("#divPanelItemComodCli").hide();
				$("#divPanelItemComod").hide();
				$("#divPanelItemArmaz").hide();
				$("#divPanelItemConserto").hide();
			}
			else if(target.value == "parcial"){
				$("#divPanelItemComodCli").show();
				$("#divPanelItemComod").show();
				$("#divPanelItemArmaz").show();
				$("#divPanelItemConserto").show();
			}
	
	}

	function getDateNow(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
	
		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd;
		} 
		if(mm<10){
			mm='0'+mm;
		} 
	
		  var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
		var today = dd + ' de ' + month[parseInt(mm - 1)] + ' de ' + yyyy;		
	
		return today;
	}
	
	
	function formatDate(data){
		console.log(data);
	
		   parts = data.split('/') ;
		   var novaData = new Date(parts[2], parts[1] - 1, parts[0]);
		   var dia = ('0' + novaData.getDate()).slice(-2);
		   var mes =  ('0' + (novaData.getMonth() + 1)).slice(-2);
		   var ano = novaData.getFullYear();
		   var dataFormatada = ano + '/' + mes + '/' + dia;
	
		   return new Date(dataFormatada);
	}

/*function showTipo(target){
	console.log(target.id + " - " + target.name);
	if (target.id == "controlaLote"){
		$("#dvLote").show();
	}
	else{
		$("#dvLote").hide();		
	}
}*/

/*function enableLote(){
	var controlaLote = parseInt(document.getElementById("controlaLote").value);

	if(controlaLote == 3){
		$("#dvLote").show();
	}
	else{
		$("#dvLote").hide();		
	}
}*/
