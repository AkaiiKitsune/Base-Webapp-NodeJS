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
            let selected = $('#selecteurMissionnaire option:selected');
            console.log(selected.attr('id'));

            $("#missionnaireList").append("<tr id=" + selected.attr('id') + "> <th>"+selected.attr('prenom')+"</th> <th>"+selected.attr('nom')+"</th> <th>"+selected.attr('entreprise')+"</th> <th><button class='btn btn-danger mr-2 deleteMissionnaire' type='button'><div class='fas fa-minus'></div></button></th> </tr>");
        });

        $("#missionnaireList").on('click', '.deleteMissionnaire', function () {
            $(this).closest('tr').remove();
        });
});
