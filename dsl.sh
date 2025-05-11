#!/bin/sh

if [ ! -e /sys/class/net/dsl0 ]; then
    echo "Scripti doğru cihazda calistirdiginizdan emin olunuz. by @frudotz"
    exit 1
fi

mac=$(cat /sys/class/net/dsl0/address)

uci add network device
uci set network.@device[-1].type='8021q'
uci set network.@device[-1].ifname='dsl0'
uci set network.@device[-1].vid='35'
uci set network.@device[-1].name='dsl0.35'
uci set network.@device[-1].macaddr="$mac"
uci set network.@device[-1].mtu='1500'

uci add_list network.@device[0].ports='dsl0.35'

uci set network.wan.device='dsl0.35'
uci set network.wan.auto='0'

uci set network.lan.ipaddr='192.168.1.1'
uci set network.lan.gateway='192.168.1.2'
uci set dhcp.lan.ignore='1'

uci commit network
uci commit dhcp

/etc/init.d/network restart
/etc/init.d/dnsmasq restart

echo "DSL cihazinizin kurulumu basariyla tamamlanmistir. by @frudotz"
