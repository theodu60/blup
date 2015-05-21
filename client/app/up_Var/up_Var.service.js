'use strict';

angular.module('fdjApp')
.factory('upVar', function () {
    // Service logic

    // Public API here
    return {
        prestation: {
            prestataire : {
                Code_Prestataire: 0,
                Prestataire_Libel: "Global"
            },
            media : {
                Code_Media: 0,
                Media_Libel: "Global"
            }
        },
        periode: {
            annee : {
                Code_Annee: 1500,
            },
            mois : {
                Code_Mois: 1503,
            }
        },
        prestataire: {
            premier : {
                Code_Prestataire: 0,
                Prestataire_Libel: ''
            },
            deuxieme : {
                Code_Prestataire: 0,
                Prestataire_Libel: ''
            },
            res : {
                Code_Prestataire: 0,
                Prestataire_Libel: ''                
            } 
        },
        segmentation: {
            segment : {
                Code_Segment: 0,
                Segment_Libel: ''  
            },
            sous_segment : {
                Code_Sous_Seg: 0,
                Sous_Seg_Libel: ''  
            }
        },
        checkbox : {
            checkedbox : [],
            disable: []
        },
        question : {
            Code_Question : 3
        },
        login : {
            email : null,
            mdp : null,
            local : null
        },
        onglet : {
            comparaison : true,
            evolution : false,
            view_value : true
        }
    };
});

