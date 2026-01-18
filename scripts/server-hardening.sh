#!/bin/bash
#===============================================================================
# AI Smart Hack - Server Hardening Script
# Führe dieses Skript auf dem VPS mit sudo aus: sudo bash server-hardening.sh
#===============================================================================

set -euo pipefail

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Root-Check
if [[ $EUID -ne 0 ]]; then
   log_error "Dieses Skript muss als root ausgeführt werden (sudo)"
   exit 1
fi

echo ""
echo "=============================================="
echo "  AI Smart Hack - Server Hardening"
echo "=============================================="
echo ""

#-------------------------------------------------------------------------------
# 1. UFW Firewall konfigurieren
#-------------------------------------------------------------------------------
log_info "Installiere und konfiguriere UFW Firewall..."

apt-get update -qq
apt-get install -y ufw

# Reset UFW auf Standardwerte
ufw --force reset

# Standard-Policies
ufw default deny incoming
ufw default allow outgoing

# Erlaube nur essentielle Ports
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# UFW aktivieren
ufw --force enable

log_info "UFW Firewall aktiviert. Status:"
ufw status verbose

#-------------------------------------------------------------------------------
# 2. Fail2Ban installieren und konfigurieren
#-------------------------------------------------------------------------------
log_info "Installiere und konfiguriere Fail2Ban..."

apt-get install -y fail2ban

# Fail2Ban SSH-Jail Konfiguration
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
# Ban-Dauer: 1 Stunde
bantime = 3600
# Zeitfenster für Fehlversuche: 10 Minuten
findtime = 600
# Anzahl Fehlversuche bis Ban
maxretry = 5
# Ignore localhost
ignoreip = 127.0.0.1/8 ::1

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400
EOF

# Fail2Ban neustarten
systemctl enable fail2ban
systemctl restart fail2ban

log_info "Fail2Ban aktiviert. Status:"
fail2ban-client status sshd || log_warn "SSH-Jail wird nach erstem Versuch aktiv"

#-------------------------------------------------------------------------------
# 3. SSH Hardening - Root-Login deaktivieren
#-------------------------------------------------------------------------------
log_info "Härte SSH-Konfiguration..."

# Backup der originalen Konfiguration
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup.$(date +%Y%m%d)

# Sichere SSH-Konfiguration
cat > /etc/ssh/sshd_config.d/99-hardening.conf << 'EOF'
# AI Smart Hack SSH Hardening
# Root-Login komplett deaktivieren
PermitRootLogin no

# Nur Key-basierte Authentifizierung
PasswordAuthentication no
PubkeyAuthentication yes

# Zusätzliche Sicherheit
PermitEmptyPasswords no
X11Forwarding no
MaxAuthTries 3
LoginGraceTime 60

# Nur Protokoll 2
Protocol 2
EOF

# SSH-Dienst neustarten
systemctl restart sshd

log_info "SSH gehärtet. Root-Login deaktiviert."

#-------------------------------------------------------------------------------
# 4. Abschlussbericht
#-------------------------------------------------------------------------------
echo ""
echo "=============================================="
echo "  HARDENING ABGESCHLOSSEN"
echo "=============================================="
echo ""
log_info "UFW Status:"
ufw status numbered
echo ""
log_info "Fail2Ban Status:"
fail2ban-client status
echo ""
log_warn "WICHTIG: Stelle sicher, dass du dich weiterhin mit deinem User-Account einloggen kannst!"
log_warn "Teste in einem NEUEN Terminal: ssh dein-user@server"
echo ""
