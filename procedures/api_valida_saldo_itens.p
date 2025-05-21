/*Valida‡Æo de saldo de itens - Fluxo de Transferˆncia de Item
Desenvolvido por : Iago Gon‡alves Moys‚s
********************************************************************************
**************************************************************************/

{utp/ut-glob.i}
DEFINE TEMP-TABLE ttValidaSaldo NO-UNDO
    FIELD itemValida LIKE mgmov.saldo-estoq.it-codigo
    FIELD qtidade LIKE mgmov.saldo-estoq.qtidade-atu
    FIELD valida AS LOGICAL.
    
PROCEDURE pi-valida-saldo-item.

    DEFINE INPUT PARAMETER codItem AS CHAR NO-UNDO.  
    DEFINE INPUT PARAMETER quantidade AS DECIMAL NO-UNDO.
    DEFINE INPUT PARAMETER codDepos AS CHAR NO-UNDO.
    DEFINE INPUT PARAMETER lote AS CHAR NO-UNDO.
    DEFINE INPUT PARAMETER qtd AS DECIMAL NO-UNDO.
    DEFINE INPUT PARAMETER localizacao AS CHAR NO-UNDO.
    DEFINE OUTPUT PARAMETER TABLE FOR ttValidaSaldo.
    
    EMPTY TEMP-TABLE ttValidaSaldo.

    FIND FIRST ITEM NO-LOCK
        WHERE ITEM.it-codigo = codItem NO-ERROR.

    IF AVAIL ITEM THEN
    DO:
    
    FIND FIRST saldo-estoq NO-LOCK
        WHERE saldo-estoq.cod-depos = codDepos AND saldo-estoq.lote = lote AND saldo-estoq.cod-localiz = localizacao AND (saldo-estoq.qtidade-atu - saldo-estoq.qt-alocada) = qtd NO-ERROR.
        
    IF AVAIL saldo-estoq THEN
    DO:
    
        FOR EACH mgmov.saldo-estoq NO-LOCK
            WHERE saldo-estoq.it-codigo = codItem AND saldo-estoq.cod-depos = codDepos AND saldo-estoq.lote = lote AND saldo-estoq.cod-localiz = localizacao AND (saldo-estoq.qtidade-atu - saldo-estoq.qt-alocada) = qtd AND qtd <> 0:
            CREATE ttValidaSaldo.
            ASSIGN
                ttValidaSaldo.itemValida = saldo-estoq.it-codigo
                ttValidaSaldo.qtidade = (saldo-estoq.qtidade-atu - saldo-estoq.qt-alocada).
        END.
        END.

        /* Validar quantidade */
        IF ttValidaSaldo.qtidade >= quantidade THEN
            ttValidaSaldo.valida = TRUE. /* Saldo suficiente */
        ELSE
            ttValidaSaldo.valida = FALSE. /* Saldo insuficiente */
    END.

    ELSE
    DO:
        CREATE ttValidaSaldo.
        ASSIGN
            ttValidaSaldo.itemValida = codItem
            ttValidaSaldo.qtidade = 0
            ttValidaSaldo.valida = FALSE. /* Saldo insuficiente, item nÆo encontrado */
    END.
 
END PROCEDURE.
