#!/bin/sh

BASE_URL="https://frudotz.com"
LOG_FILE="/tmp/setup-frudotz.log"
DEBUG=true

log() {
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    if [ "$DEBUG" = true ]; then
        echo "[$TIMESTAMP] $1"
    fi
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE"
}

fatal() {
    log "HATA: $1"
    exit 1
}

run_script() {
    chmod +x "$1"
    log "Calistiriliyor: $1"
    sh "$1"
}

log ""
log "OpenWRT Kopru Modu Hizli Kurulum Sihirbazi - @frudotz"
log "------------------------------------------------------"

# DSL cihaz kontrolu
if [ -e /sys/class/net/dsl0 ]; then
    log "DSL cihaz algilandi. DSL yapilandirmasi uygulanacak."
    SCRIPT_NAME="dsl.sh"
else
    log "Router cihaz algilandi. Router yapilandirmasi uygulanacak."
    SCRIPT_NAME="router.sh"
fi

TARGET="/tmp/$SCRIPT_NAME"
log "$SCRIPT_NAME dosyasi indiriliyor..."

wget -q "$BASE_URL/$SCRIPT_NAME" -O "$TARGET"
if [ $? -ne 0 ]; then
    fatal "$SCRIPT_NAME dosyasi indirilemedi. Lutfen internet baglantinizi kontrol edin."
    log "Destege ihtiyaciniz varsa Discord/Telegram - @frudotz"
fi

log "$SCRIPT_NAME basariyla indirildi."

chmod -R 0777 "$TARGET"
run_script "$TARGET"

log "Kurulum tamamlandi. Destek ve iletisim icin Discord/Telegram - @frudotz"
log "Birkac dakika icinde erisiminiz gelmezse cihazinizi yeniden baslatin."
log "------------------------------------------------------"
