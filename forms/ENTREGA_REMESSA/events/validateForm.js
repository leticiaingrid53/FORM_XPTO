/**
 * @desc        Script padrão do Fluig para validação do formulário (validateForm.js)
 *              Esse evento é executado antes da gravação dos dados do formulário no banco de dados
 * @copyright   2024 Leticia Ingrid
 * @version     1.0.0
 * @author      Leticia Ingrid <leticiaingrid53@gmail.com>
 *
 */
function validateForm(form) {
    log.info('### uf-log | Início validateForm(WKNumProces: '+getValue('WKNumProces')+', WKNumState: '+getValue('WKNumState')+', WKNextState: '+getValue('WKNextState')+', modForm: '+form.getFormMode()+', WKUser: '+getValue('WKUser')+') ###');

    // var NumState = parseInt(getValue('WKNumState'));
    var WKNextState = parseInt(getValue('WKNextState'));
    
    if(WKNextState == 37){

        if(form.getValue("txtFilialOrigem") == null || form.getValue("txtFilialOrigem") == "") {
            throw "O campo Filial deve ser preenchido";
        }
        if(form.getValue("txtFilialDestino") == null || form.getValue("txtFilialDestino") == "") {
            throw "O campo Filial deve ser preenchido";
        }
    }


    log.info('### uf-log | Final validateForm(WKNumProces: '+getValue('WKNumProces')+', WKNumState: '+getValue('WKNumState')+', WKNextState: '+getValue('WKNextState')+', modForm: '+form.getFormMode()+', WKUser: '+getValue('WKUser')+') ###');
}