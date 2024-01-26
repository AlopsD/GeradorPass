var continuar = false
var resulpass = ''


//used in the close button
function sair(){
    document.getElementById('popups').style.display="none"
}
//used to confirm
function confirma(){
    continuar = true
    document.getElementById('popups').style.display="none"
    gerar()
}

//general function where it receives output information from the functions below
function gerar(){
    const input_Tamanho = document.getElementById('inputTamanho').value

    const input_alfami = document.getElementById('Alfama')
    const input_alfama = document.getElementById('Alfami')
    const input_num = document.getElementById('Num')
    const input_simb = document.getElementById('Simb')
    var divPopup = document.getElementById('popups')
    var ativaGerador = false
    var msgAlert = ''

    
    
            const caracters = {
        alfama:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        alfami:'abcdefghijklmnopqrstuvwxyz',
        num:'1234567890',
        simb:'!@#$%*()?/<>ç'}


    //create a popup notification on the screen
    function alertHtml(numero){
        let alertId = numero
        switch (alertId) {
            case 1:
                divPopup.style.display = 'flex'
                divPopup.innerHTML = `<div class="resposta">
                <input type="button" value="X" class="fecharalerta" onclick="sair()" id="teste">
                <p class="aviso1">${msgAlert}</p>
                </div>`
                break;
            case 2:
                divPopup.style.display = 'flex'
                divPopup.innerHTML = `<div class="resposta">
                <input type="button" value="X" class="fecharalerta" onclick="sair()" id="teste">
                <p class="aviso2" id=>${msgAlert}</p>
                <input type="button" value="Sim" class="tamb" onclick="confirma()">
                </div>`
                break
            case 3:
                divPopup.style.display = 'flex'
                divPopup.innerHTML = `<div class="resposta">
                <input type="button" value="X" class="fecharalerta" onclick="sair()">
                <p class="aviso3">A Senha gerada é: </p>
                <input type="text" value="${msgAlert}" id="senhaGerada" class="passview">
                <input type="button" value="Copiar" class="tamb" onclick="Copiar()" id="cop">
            </div>`
                break
            default:
                break;
        }
    }



    //choose the types of characters that will be contained in the password
    function AdcCaracters(){

        let saidatexto = ''

        //let teste = true

        if(input_alfama.checked == true){
            saidatexto += caracters.alfama
        }
        if(input_alfami.checked == true){
            saidatexto += caracters.alfami
        }
        if(input_num.checked == true){
            saidatexto += caracters.num
        }
        if(input_simb.checked == true){
            saidatexto += caracters.simb
        }

        if (saidatexto == ''){
            msgAlert = 'Por favor marque pelo menos uma caixa de caracters'
            alertHtml(1)
        }
        else{
            return saidatexto
        }
    }

    //used to choose string size
    function TamanhoString(){

        if (input_Tamanho == '' | input_Tamanho < 4){
            msgAlert = 'Tamanho vazio ou o numero e menor que 4'
            alertHtml(1)
        }else if(input_Tamanho <= 7){
            if (continuar == true){
                ativaGerador = true
                return input_Tamanho
            }else{
            msgAlert = 'nao recomendamos senha menor que 8 deseja continuar ?'
            alertHtml(2)
            }
        }else if (input_Tamanho >= 76 ){
            msgAlert = 'por favor tente uma senha menor que 76'
            alertHtml(1)
        }else{
            ativaGerador = true
            return input_Tamanho
        }

    }
    // Generates characters to create passwords
    function GeradorDeTexto(tamanho, Caracter){
        //let Caracter = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

        let string_tamanho = Caracter.length
        let saida_texto = ''
        for(let c=0; c < tamanho; ){
            const addCaracters = Caracter.charAt(Math.floor(Math.random() * string_tamanho))

            if (saida_texto.indexOf(addCaracters) == -1){
                saida_texto += addCaracters
                c++
            }

        }
        return saida_texto
    }

    let entrada_cts = AdcCaracters()
    let entrada_tam = TamanhoString()
    let saidaResul = GeradorDeTexto(entrada_tam, entrada_cts)
    if(ativaGerador == true){
        msgAlert = saidaResul
        alertHtml(3)
        continuar = false
    }

}

//used to copy the text that appears in the popup
function Copiar(){
    let copiarpass = document.getElementById('senhaGerada')
    copiarpass.select()
    document.execCommand("copy")
    console.log(copiarpass)
    document.getElementById('cop').value = "Copiado"
}


