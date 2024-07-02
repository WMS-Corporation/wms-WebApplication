#!/bin/sh
# sostituisci-env.sh

# Esempio di sostituzione di variabili d'ambiente
sed -i 's|VARIABILE_DI_AMBIENTE|'"$VARIABILE_DI_AMBIENTE"'|g' /wms-WebApplication/build/static/js/*.js

# Avvia l'applicazione
exec npm start