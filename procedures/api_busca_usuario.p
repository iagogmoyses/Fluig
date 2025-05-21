DEF TEMP-TABLE ttUsuario NO-UNDO
    FIELD codUsuario LIKE usuar_mestre.cod_usuario
    FIELD nome LIKE usuar_mestre.nom_usuario
    FIELD email LIKE usuar_mestre.cod_e_mail_local
    FIELD campoPesquisa AS CHAR.
    
PROCEDURE pi-busca-usuario:
    DEFINE input PARAMETER filtro as CHAR.
    define OUTPUT PARAMETEr TABLE FOR ttUsuario.
    
    DEFINE VARIABLE i-cont  AS INTEGER     NO-UNDO INITIAL 0.
    DEFINE VARIABLE i-limit AS INTEGER     NO-UNDO INITIAL 200.
    DEFINE VARIABLE l-exibe AS LOGICAL     NO-UNDO INITIAL YES.
    
    EMPTY TEMP-TABLE ttUsuario.
    
    FOR EACH usuar_mestre FIELDS (cod_usuario
                                  nom_usuario
                                  cod_e_mail_local) NO-LOCK WHERE
                                                    usuar_mestre.dat_fim_valid >= TODAY AND
                                                    usuar_mestre.cod_usuario BEGINS "f" AND
                                                    IF filtro <> "" THEN
                                                    (usuar_mestre.cod_usuario BEGINS filtro OR
                                                    usuar_mestre.nom_usuario BEGINS filtro OR
                                                    usuar_mestre.cod_e_mail_local BEGINS filtro) ELSE true:
    
    
    CREATE ttUsuario.
    
    ASSIGN              ttUsuario.codUsuario = usuar_mestre.cod_usuario
                        ttUsuario.nome = usuar_mestre.nom_usuario
                        ttUsuario.email = usuar_mestre.cod_e_mail_local
                        ttUsuario.campoPesquisa = usuar_mestre.cod_usuario + " - " + usuar_mestre.nom_usuario.
                        
                         ASSIGN i-cont = i-cont + 1.
         IF i-cont >= i-limit THEN LEAVE.
    
END.
END PROCEDURE.
