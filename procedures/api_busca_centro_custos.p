{utp/ut-glob.i}
DEFINE TEMP-TABLE ttCCusto NO-UNDO
    FIELD codCcusto     LIKE emscad.ccusto.cod_ccusto 
    FIELD descricao     LIKE emscad.ccusto.des_tit_ctbl
    FIELD dtIni         AS CHAR
    FIELD dtFim         AS CHAR
    FIELD campoPesquisa AS CHARACTER.

PROCEDURE pi-zoom-centro-custo:

    DEF INPUT  PARAMETER cFiltro   AS CHAR    NO-UNDO.
    DEF OUTPUT PARAMETER TABLE FOR ttCCusto.

        FOR EACH emscad.ccusto FIELDS( cod_ccusto 
                                       des_tit_ctbl
                                       dat_inic_valid
                                       dat_fim_valid) NO-LOCK:

            IF cFiltro <> "" THEN
            IF NOT emscad.ccusto.cod_ccusto MATCHES("*" + string(cFiltro) + "*") AND
               NOT emscad.ccusto.des_tit_ctbl MATCHES("*" + cFiltro + "*") THEN
                NEXT.


            CREATE ttCCusto.
            ASSIGN ttCCusto.codCcusto      = emscad.ccusto.cod_ccusto      
                   ttCCusto.descricao      = TRIM(emscad.ccusto.des_tit_ctbl)
                   ttCCusto.dtIni          = STRING(emscad.ccusto.dat_inic_valid)
                   ttCCusto.dtFim          = STRING(emscad.ccusto.dat_fim_valid)
                   ttCCusto.campoPesquisa  = TRIM(emscad.ccusto.cod_ccusto + ' - ' + TRIM(emscad.ccusto.des_tit_ctbl)).

        END.

END PROCEDURE.
