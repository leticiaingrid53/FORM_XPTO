/**
 * @desc        Script padrão do Fluig para validação do formulário (validateForm.js)
 *              Esse evento é executado antes da gravação dos dados do formulário no banco de dados
 * @copyright   2024 Leticia Ingrid
 * @version     1.0.0
 * @author      Leticia Ingrid <leticiaingrid53@gmail.com>
 *
 */
function validateForm(form) {

    var errorMessage = ""; // Variável para armazenar as mensagens de erro
    
    if(form.getValue("txtCodigoFilial") == null || form.getValue("txtCodigoFilial") == "") {
        errorMessage += "O campo Código Filial deve ser preenchido. \n";
    }

    if(form.getValue("txtNomeFilial") == null || form.getValue("txtNomeFilial") == "") {
        errorMessage += "O campo Nome Filial deve ser preenchido. \n";
    }

    if(form.getValue("txtCEP") == null || form.getValue("txtCEP") == "") {
        errorMessage += "O campo CEP deve ser preenchido. \n";
    }

    if(form.getValue("txtEstado") == null || form.getValue("txtEstado") == "") {
        errorMessage += "O campo Estado deve ser preenchido. \n";
    }

    if(form.getValue("txtCidade") == null || form.getValue("txtCidade") == "") {
        errorMessage += "O campo Cidade deve ser preenchido. \n";
    }

    if(form.getValue("txtBairro") == null || form.getValue("txtBairro") == "") {
        errorMessage += "O campo Bairro deve ser preenchido. \n";
    }

    if(form.getValue("txtRua") == null || form.getValue("txtRua") == "") {
        errorMessage += "O campo Rua deve ser preenchido. \n";
    }

    if(form.getValue("txtNumero") == null || form.getValue("txtNumero") == "") {
        errorMessage += "O campo Número deve ser preenchido. \n";
    }

    if(form.getValue("txtResponsavelAlmoxarife") == null || form.getValue("txtResponsavelAlmoxarife") == "") {
        errorMessage += "O campo Responsável Almoxarife deve ser preenchido. \n";
    }
  
    // Se houver mensagens de erro, lançar exceção
    if(errorMessage !== "") {
        throw errorMessage;
    }

    //valida se já existe uma filial com o código informado
    var codigofilial = form.getValue("txtCodigoFilial");
    var cons = DatasetFactory.createConstraint("txtCodigoFilial", codigofilial,codigofilial, ConstraintType.MUST);
    var content = DatasetFactory.getDataset("CADASTRA_FILIAL",["txtCodigoFilial"],[cons], null);

    if(content.values.length > 0){
        throw ("Já existe uma filial com o código: " + codigofilial);
    }

}