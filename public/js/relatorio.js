$(function () { 
    $('#send-form').on('submit', function (event) {
        event.preventDefault();
        var inputSensor = $('#inputSensor').val();
        var inputDisp = $('#inputDispositivo').val();
        var inputDataI = $('#inputDataI').val();
        var inputDataF = $('#inputDataF').val();

        $.ajax({
            url: "/getrelatorio",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({'id_Disp': inputDisp, 'id_Sensor': inputSensor,
                 'dataInicio': inputDataI, 'dataFinal': inputDataF}),
            success: function (response) {

                var headers = {
                    nameData: response[0].nome,
		    tipoDado: response[0].nome,
                    dataCaptura: "tempo da captura"
                };

                download(headers, response);
               
            }
        });
        
    });

    $('#inputDispositivo').change(function (e) { 
        e.preventDefault();
        var disp = $('#inputDispositivo').val();
        $.getJSON("getSensores/"+disp,
            function (dados/*, textStatus, jqXHR*/) {
                if (dados){ 
                    console.log("foiiii");   
                    var option = '<option>Selecione o sensor </option>';
                    //console.log("received:" + dados[0].nome);
                    $.each(dados, function(i, obj){
                        option += '<option value="'+obj.id_sensor+'">'+obj.nome+'</option>';
                    })
                     
                 }else{

                 }
                 $('#inputSensor').html(option).show(); 
              })
                
            }
        );
        
 });
 //------------------------------Criar array e passar para,,,,,,,,,,,,,,,,