window.onload = function() {
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
	
	
	if(getModePage() == "VIEW") {
	  document.getElementById("dvAprovar").style.display = "none";
	  document.getElementById("dvFinanceiro").style.display = "";
	  $(".fs-cursor-pointer").hide();
	  $(".btn-primary").hide()
	  $(".btn-info").hide()
  
		fnModoView();    
	} 
	
	
	if (activity == 0 || activity == 4) {  
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

	function calcularValorTotal() {
		// Obtém o valor dos campos "valor" e "qtd"
		var valor = parseFloat($("#valor").val()) || 0; // Converte para float, usa 0 se for inválido
		var quantidade = parseFloat($("#qtd").val()) || 0; // Converte para float, usa 0 se for inválido
	
		// Calcula o valor total
		var valorTotal = valor * quantidade;
	
		// Atribui o valor calculado ao campo "valorTotal"
		$("#valorTotal").val(valorTotal.toFixed(2)); // Define o valor com 2 casas decimais
	}
	
	// Dispara o cálculo quando o usuário sai do campo "valor" ou "qtd"
	$("#valor, #qtd").on('blur', calcularValorTotal);
	
	

	//calendario
	$(".date").each(function(){
		if ($(this).prop('readonly') == false){			
			var calendario = FLUIGC.calendar(this);
		}
	});


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
	var price = $("#valorTotal___" + index).val();

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
	$("#VlTotalNF").val(total);
}

function showTipo(target){
	console.log(target.id + " - " + target.name);
	if (target.id == "controlaLote"){
		$("#dvLote").show();
	}
	else{
		$("#dvLote").hide();		
	}
}

var atividade = "";
var processo = "";
var isView = false;

$(document).ready(function(){
	
	$(".date").each(function(count,target){
                var isDisabled = $(target).prop('readonly');
                if (isDisabled == false){
                    FLUIGC.calendar(target);
                }

            })
            
            $(".date").mask("00/00/0000");
            $('.money').mask('##.###.###.###.##0,00', {reverse: true});

})

function setSelectedZoomItem(selectedItem) {
           
            if (selectedItem.inputName == "refer"){
               $("#fornecTit").val(selectedItem["Fornec"]);
               $("#estabTit").val(selectedItem["codEstab"]);
               $("#especieTit").val(selectedItem["codEsp"]);
               $("#vencTit").val(selectedItem["dtvenc"]);
               $("#moedaTit").val(selectedItem["cmoeda"]);
               $("#valorTit").val(selectedItem["devalor"]);

              
                

            }
        }
function showCamera(param) {
              JSInterface.showCamera(param);
 }

 function showTipo(target){
	console.log(target.id + " - " + target.name);
	if (target.value == "comex"){
		$("#dvFormaPgto").show();
	}
    else{
		$("#dvFormaPgto").hide();		
	}
}

   