$(document).ready(function(){
    //Suppression d'article
        $('.delete-article').on('click', (e) => {
            $target = $(e.target);
            const id = $target.attr('data-id');
            $.ajax({
                type: 'DELETE',
                url: '/articles/'+id,
                success: function(response){
                    alert('Deleting Article');
                    window.location.href='/';
                },
                error: (err) => {
                    console.error(err);
                }
            });
        });

    //Update des champs d'upload
        $(".custom-file-input").on("change", function() {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
          });


    //Profil
        //Recherche de numero siret
        $("#rechercherSiret").click(() => {
            let siret = $('#numSiret').val();
            $('#nomEntreprise').val(" ");
            $('#adresseEntreprise').val(" ");
            $('#numSiren').val("Numero siret invalide");
            $('#rechercherSiret').removeClass("btn-warning");
            $('#rechercherSiret').removeClass("btn-danger");
            $('#rechercherSiret').addClass("btn-warning");
            $('#formSubmit').attr("disabled", true);

            $.get("/api/" + siret, (data) => {
                console.log(data);

                if(data.header.statut == 200){
                    $('#numSiren').val(data.etablissement.siren);
                    $('#nomEntreprise').val(data.etablissement.uniteLegale.denominationUniteLegale);
                    $('#adresseEntreprise').val(data.etablissement.adresseEtablissement.numeroVoieEtablissement + " " + //Numéro voie
                                                data.etablissement.adresseEtablissement.typeVoieEtablissement + " " +  //Type voie
                                                data.etablissement.adresseEtablissement.libelleVoieEtablissement + ", " +
                                                data.etablissement.adresseEtablissement.codePostalEtablissement + ", " +
                                                data.etablissement.adresseEtablissement.libelleCommuneEtablissement); //Adresse
                    $('#rechercherSiret').removeClass("btn-warning");
                    $('#rechercherSiret').addClass("btn-success");
                    $('#formSubmit').attr("disabled", false);
                }else{
                    $('#rechercherSiret').removeClass("btn-warning");
                    $('#rechercherSiret').addClass("btn-danger");
                }
            });
        }); 


    //Mission
        //Ajout d'un missionnaire sur l'interface creer mission
        $("#addMissionnaire").click(() => {
            $('#addMissionnaire').removeClass("btn-danger");

            var count = $("#missionnaireList").children().length;
            if(count==0) $(".missionnaireBody").append('<div class="card-body missionnaireCardBody"><table class="table table-hover"><thead><tr><th>Nom</th><th>Prénom</th><th>Compagnie</th><th></th></tr></thead><tbody id="missionnaireList"></tbody></table></div>'); 
            
            let selected = $('#selecteurMissionnaire option:selected');

            console.log(selected.attr('disabled'))

            if(selected.attr('disabled') == null) {
                console.log(selected.attr('id'));
                console.log(selected);

                $("#missionnaireList").append("<tr id=" + selected.attr('id') + "> <th>"+selected.attr('prenom')+"</th> <th>"+selected.attr('nom')+"</th> <th>"+selected.attr('entreprise')+"</th> <th><button class='btn btn-danger mr-2 deleteMissionnaire' type='button'><div class='fas fa-minus'></div></button></th> </tr>");

                //$("#selecteurMissionnaire option:selected").prop('disabled', true);
            }else{
                $('#addMissionnaire').addClass("btn-danger");
            }

            
        });

        //Suppression d'une ligne
        $(document).on("click", '.deleteMissionnaire', function() {
            console.log(
                $(this).closest('tr').attr('id')
            );

            console.log($("selecteurMissionnaire").find( $(this).closest('tr').attr('id') ));

            $(this).closest('tr').remove();
            var count = $("#missionnaireList").children().length;
            if(count==0) $(".missionnaireCardBody").remove();
        });

        $('#btnMission').click(() => {
            console.log('Click');

            //Missionnaires
            var selected = $('#missionnaireList');
            let missionnaireList;

            selected.each(() => {
                missionnaireList = ($(selected).find('tr')).toArray();
                console.log(missionnaireList);
                
                // json.type = jQuery(children[0]).text();
                // json.title = jQuery(children[1]).text();
                // json.description = jQuery(children[2]).find('p').text();
                // json.price = jQuery(children[3]).find('span#price-brakes-set').text();
                //console.log(json);
            });

            console.log(missionnaireList.length);
            
            let missionnaires = [];
            for (i = 0; i < missionnaireList.length; i++) missionnaires.push(missionnaireList[i].id);

            console.log(missionnaires);

            $.post( "#", { 
                dateArrivee: $('#dateArrivee').val(),
                heureArrivee: $('#heureArrivee').val(),
                dateDepart: $('#dateDepart').val(),
                heureDepart: $('#heureDepart').val(),
                missionnaires: missionnaires,
                lieuInstallation: $('#emplacement').val(),
                alimElectrique: $('#puissanceNecessaire').val(),
                alimSecourue: $('#secouru').prop("checked")
            } );

        });


    //Collisage
        //Ajout d'une ligne
        $("#btnColis").click(() => {
            var count = $("#collisList").children().length;
            if(count==0) $(".collisBody").append('<div class="card-body collisCardBody"><table class="table table-hover"><thead><tr><th>Designation</th><th>Dimensions (cm)</th><th>Poids (Grammes)</th><th></th></tr></thead><tbody id="collisList"></tbody></table></div>'); 
            $("#collisList").append("<tr>   <th><input class='form-control' type='text' placeholder='Nom / Details'></input></th>   <th class='w-25'><div class='row no-gutter'><div class='col-md-4'><input class='form-control' type='text' placeholder='H'></div><div class='col-md-4'><input class='form-control' type='text' placeholder='L'></div><div class='col-md-4'><input class='form-control' type='text' placeholder='P'></div></div></th>    <th><input class='form-control' type='number' placeholder='Poids du colis en grammes'></input></th>    <th><button class='btn btn-danger mr-2 deleteColis' type='button'><div class='fas fa-minus'></div></button></th>   </tr>");
        });

        //Suppression d'une ligne
        $(document).on("click", ".deleteColis", function(){
            $(this).closest('tr').remove();
            var count = $("#collisList").children().length;
            if(count==0) $(".collisCardBody").remove();
        });

    //Equipement
        //Ajout d'une ligne
        $("#btnEquipement").click(() => {
            var count = $("#equipementList").children().length;
            if(count==0) $(".equipementBody").append('<div class="card-body equipementCardBody"><table class="table table-hover"><thead><tr><th>Designation</th><th>Dimensions (cm)</th><th>Poids (Grammes)</th><th></th></tr></thead><tbody id="equipementList"></tbody></table></div>'); 
            $("#equipementList").append("<tr>   <th><input class='form-control' type='text' placeholder='Nom / Details'></input></th>   <th class='w-25'><div class='row no-gutter'><div class='col-md-4'><input class='form-control' type='text' placeholder='H'></div><div class='col-md-4'><input class='form-control' type='text' placeholder='L'></div><div class='col-md-4'><input class='form-control' type='text' placeholder='P'></div></div></th>    <th><input class='form-control' type='number' placeholder='Poids du colis en grammes'></input></th>    <th><button class='btn btn-danger mr-2 deleteEquipement' type='button'><div class='fas fa-minus'></div></button></th>   </tr>");
        });

        //Suppression d'une ligne
        $(document).on("click", ".deleteEquipement", function(){
            $(this).closest('tr').remove();
            var count = $("#equipementList").children().length;
            if(count==0) $(".equipementCardBody").remove();
        });
});