var tempCount = 0;

const globalPortConfig = () => {
    var protocol = document.getElementById("protocol").value;
    var port = document.getElementById("port").value;
    var config = "";
    var commands = "";
    switch (protocol) {
        case "tcp":
            config =
                `module(load="imtcp")<br/>input(type="imtcp" port="` + port + `")`;
            commands = `# semanage port -a -t syslogd_port_t -p ` + protocol + ` ` + port + `<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/` + protocol + `<br /># firewall-cmd --reload`;
            final = `<h6><u>Run below commands as root</u></h6>` + commands + `<br/><br/><h6><u>Please Add/uncomment below configuration</u></h6>` + config;
            break;
        case "udp":
            config =
                `module(load="imudp")<br />input(type="imudp" port="` + port + `")`;
            commands = `# semanage port -a -t syslogd_port_t -p ` + protocol + ` ` + port + `<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/` + protocol + `<br /># firewall-cmd --reload`;
            final = `<h6><u>Run below commands as root</u></h6>` + commands + `<br/><br/><h6><u>Please Add/uncomment below configuration</u></h6>` + config;
            break;
        case "any":
            config =
                `module(load="imtcp")<br />input(type="imtcp" port="` +
                port +
                `")<br />module(load="imudp")<br />input(type="imudp" port="` +
                port +
                `")`;
            commands = `# semanage port -a -t syslogd_port_t -p tcp ` + port + `<br /># semanage port -a -t syslogd_port_t -p udp ` + port + `<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/tcp<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/udp<br /># firewall-cmd --reload`;
            final = `<h6><u>Run below commands as root</u></h6>` + commands + `<br/><br/><h6><u>Please Add/uncomment below configuration</u></h6>` + config;
            break;
        default:
            final = `No configuration proposed`;
    }
    document.getElementById("configOutput").innerHTML = final;
};

const toggleTemplate = () => {
    var template = document.getElementById("template");
    if(template.style.display === "none") {
        template.style.display = "block";
        document.getElementById("btnTemplate").innerHTML = "Don't create template"
    }
    else {
        template.style.display = "none";
        document.getElementById("btnTemplate").innerHTML = "Create template"
    }
}

const initScript = () => {
    var template = document.getElementById("template");
    template.style.display = "none";
}

const addTemp = () => {
    console.log(this.tempCount);
    this.tempCount++;
}