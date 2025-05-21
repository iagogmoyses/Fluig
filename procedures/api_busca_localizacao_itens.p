{utp/ut-glob.i}
DEFINE TEMP-TABLE ttLocalizacao NO-UNDO
    FIELD itemCod LIKE mgmov.saldo-estoq.it-codigo
    FIELD deposCod LIKE mgmov.saldo-estoq.cod-depos
    FIELD loteLoc LIKE mgmov.saldo-estoq.lote
    FIELD localizacao LIKE mgmov.saldo-estoq.cod-localiz
    FIELD dataValidade AS CHAR
    FIELD codEstab LIKE mgmov.saldo-estoq.cod-estabel
    FIELD quant LIKE mgmov.saldo-estoq.qtidade-atu.
    
PROCEDURE pi-zoom-loc.
    
    DEFINE INPUT PARAMETER codItem AS CHAR NO-UNDO.
    DEFINE OUTPUT PARAMETER TABLE FOR ttLocalizacao.
    
     EMPTY TEMP-TABLE ttLocalizacao.
    
     FIND FIRST ITEM NO-LOCK
    WHERE ITEM.it-codigo = codItem NO-ERROR.
    
    IF AVAIL ITEM THEN
    DO:
       
    FOR EACH mgmov.saldo-estoq FIELDS (it-codigo 
                                       cod-depos 
                                       lote
                                       cod-localiz
                                       dt-vali-lote
                                       cod-estabel
                                       qtidade-atu
                                       qt-alocada) NO-LOCK
        WHERE saldo-estoq.it-codigo = codItem AND cod-depos <> 'CQP' AND qtidade-atu <> 0:
        
        CREATE ttLocalizacao.
        ASSIGN
            ttLocalizacao.itemCod = saldo-estoq.it-codigo
            ttLocalizacao.deposCod = saldo-estoq.cod-depos
            ttLocalizacao.loteLoc = saldo-estoq.lote
            ttLocalizacao.localizacao = saldo-estoq.cod-localiz
            ttLocalizacao.dataValidade = STRING(saldo-estoq.dt-vali-lote, "99/99/9999")
            ttLocalizacao.codEstab = saldo-estoq.cod-estabel
            ttLocalizacao.quant = saldo-estoq.qtidade-atu - saldo-estoq.qt-alocada.
    END.
    END.
    END PROCEDURE.
