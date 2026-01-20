#!/bin/bash

# ==========================================
# PROJEKT SECURITY AUDIT (AI SMART HACK)
# ==========================================
# Scannt nach Sicherheitslücken im Code.

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starte Audit für: $(pwd)${NC}"
echo "-----------------------------------------------------"

# 1. PRÜFUNG: Ist .env im Git? (Todsünde!)
echo -e "\n${YELLOW}[1/3] Prüfe Git-Status von .env Dateien...${NC}"
if git ls-files .env* --error-unmatch &>/dev/null; then
    echo -e "${RED}ALARM: .env Dateien werden von Git getrackt!${NC}"
    echo "Lösung: Führe 'git rm --cached .env.local' aus und füge sie zur .gitignore hinzu."
else
    echo -e "${GREEN}OK: Keine .env Dateien im öffentlichen Git gefunden.${NC}"
fi

# 2. PRÜFUNG: Suche nach Hardcoded Keys im Code
# Wir suchen nach Mustern wie "sk-", "AIza" (Google), "Bearer", "ey..." (JWT)
# Wir schließen node_modules, .git und .next Ordner aus (da ist zu viel Rauschen)
echo -e "\n${YELLOW}[2/3] Scanne Source Code nach versehentlichen Keys...${NC}"

GREP_EXCLUDES="--exclude-dir={node_modules,.git,.next,build,dist}"
KEYWORDS="sk-[a-zA-Z0-9]{20,}|AIza[a-zA-Z0-9_\\-]{20,}|ghp_[a-zA-Z0-9]{20,}|supa_[a-zA-Z0-9]{20,}"

# Suche ausführen
grep -rE $GREP_EXCLUDES "$KEYWORDS" . > audit_results.txt

if [ -s audit_results.txt ]; then
    echo -e "${RED}WARNUNG: Potenzielle Schlüssel im Code gefunden!${NC}"
    echo "Schau dir sofort die Datei 'audit_results.txt' an."
    echo "Dort steht, in welcher Datei und Zeile der Schlüssel gefunden wurde."
    cat audit_results.txt
    rm audit_results.txt # Löschen nach Anzeige aus Sicherheit
else
    echo -e "${GREEN}OK: Keine offensichtlichen API-Keys im Quellcode gefunden.${NC}"
    rm audit_results.txt 2>/dev/null
fi

# 3. PRÜFUNG: Verdächtige Konfigurationsdateien
echo -e "\n${YELLOW}[3/3] Suche nach verwaisten Config-Dateien...${NC}"
# Dateien, die oft von Agenten oder Tests übrig bleiben
FOUND_JUNK=$(find . -maxdepth 2 -name "temp_*" -o -name "*backup*" -o -name "test_key*" -not -path "./node_modules*")

if [ -n "$FOUND_JUNK" ]; then
    echo -e "${RED}Möglichen Müll gefunden:${NC}"
    echo "$FOUND_JUNK"
else
    echo -e "${GREEN}OK: Keine offensichtlichen Temp-Dateien gefunden.${NC}"
fi

echo -e "\n-----------------------------------------------------"
echo "Audit abgeschlossen."
