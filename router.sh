#!/bin/sh

if [ -e /sys/class/net/dsl0 ]; then
    echo "Scripti doğru cihazda calistirdiginizdan emin olunuz. by @frudotz"
    exit 1
fi

uci add_list network.@device[0].ports='wan'

uci del network.lan.ipaddr
uci add_list network.lan.ipaddr='192.168.1.2/24'
uci del dhcp.lan.ignore

uci set network.wan.proto='pppoe'
uci set network.wan.device='br-lan'

uci commit network
uci commit dhcp

/etc/init.d/network restart
/etc/init.d/dnsmasq restart

echo "Router cihazinizin kurulumu basariyla tamamlanmistir. by @frudotz"