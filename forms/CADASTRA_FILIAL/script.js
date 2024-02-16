/**
 *
 * @copyright   2024 Leticia Ingrid
 * @version     1.0.0
 * @author      Leticia Ingrid <leticiaingrid53@gmail.com>
 *
 */

$(document).ready(function(){

	//Máscara para o campos de CEP
	$('.cepmask').mask("00000-000", {placeholder: "_____-___"});

	$('[name="txtNumero"]').on("input", function(){
		var texto = $('[name="txtNumero"]').val();
		var textoFormatado = texto.replace(/[^0-9]/g, '');

		$('[name="txtNumero"]').val(textoFormatado);
	});

	//esconde botões no mod mod e view
	if (modForm == 'VIEW' || modForm == 'MOD') {
        $('.input-group-btn').hide();
    }

});

/**
 *
 * @desc Funções que consomem as API'S
 *
**/
//Função para buscar o CEP utilizando a API viacep
function buscaCEP(){

    $.getJSON("https://viacep.com.br/ws/"+ $('[name = "txtCEP"]').val().replace("-","") +"/json/?callback=?", function(dados) {
        if (!("erro" in dados)) {
            
            var rua = dados.logradouro + "";
            var bairro = dados.bairro + "";
            var cidade = dados.localidade + "";
            var estado = dados.uf + "";

            $('[name = "txtRua"]').val(rua.toUpperCase());
            $('[name = "txtBairro"]').val(bairro.toUpperCase());
            $('[name = "txtCidade"]').val(cidade.toUpperCase());
            $('[name = "txtEstado"]').val(estado.toUpperCase());
        } 
        else {
            cepInválido();
        }
    });
    
}

/**
 *
 * @desc Funções de validação
 *
**/

function cepInválido(){
    FLUIGC.message.alert({
        message: 'CEP não encontrado! Favor verificar se o CEP informado está correto!',
        title: 'CEP não encontrado',
        label: 'OK'
    }, function(result, el, ev){

    });
}