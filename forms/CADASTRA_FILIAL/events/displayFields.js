/**
 *
 * @desc        Script padrão do Fluig para exibição do formulário (displayFields.js)
 *              Esse evento é disparado no momento em que os objetos do formulário são apresentados.
 * @version     1.0.0
 * @author      Leticia Ingrid <leticiaingrid53@gmail.com>
 *
 */

function displayFields(form,customHTML){

// envia a variável (string) para o HTML com o modo de edição do formulário
customHTML.append("<script type='text/javascript'>var modForm = '"+form.getFormMode()+"';</script>");

}